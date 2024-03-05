import { Injectable } from '@angular/core';
import * as OpenSeadragon from 'openseadragon';
import { Viewer } from 'openseadragon';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MimeViewerConfig } from '../mime-viewer-config';
import { Resource } from '../models/manifest';
import { ViewerLayout } from '../models/viewer-layout';
import { ViewingDirection } from '../models/viewing-direction';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { TileSourceStrategyFactory } from '../viewer-service/tile-source-strategy-factory';
import { CanvasGroups } from './../models/canvas-groups';
import { Point } from './../models/point';
import { Rect } from './../models/rect';
import { CanvasGroupStrategyFactory } from './canvas-groups-strategy.factory';
import { TileSourceAndRect } from './tile-source-and-rect.model';

@Injectable()
export class CanvasService {
  protected _currentNumberOfCanvasGroups: BehaviorSubject<number> =
    new BehaviorSubject(0);
  protected _currentCanvasGroupIndex: BehaviorSubject<number> =
    new BehaviorSubject(0);

  protected canvasGroups: CanvasGroups = new CanvasGroups();
  protected _numberOfCanvases = 0;

  private config = new MimeViewerConfig();
  private tileSources: any[] = [];
  private viewer: Viewer | undefined = undefined;
  private rotation = 0;
  private viewingDirection = ViewingDirection.LTR;
  private svgNode: any;
  private _overlays: SVGRectElement[] = [];

  constructor(private viewerLayoutService: ViewerLayoutService) {}

  get overlays(): ReadonlyArray<SVGRectElement> {
    return this._overlays;
  }

  get onCanvasGroupIndexChange(): Observable<number> {
    return this._currentCanvasGroupIndex
      .asObservable()
      .pipe(distinctUntilChanged());
  }

  get onNumberOfCanvasGroupsChange(): Observable<number> {
    return this._currentNumberOfCanvasGroups
      .asObservable()
      .pipe(distinctUntilChanged());
  }

  set currentCanvasGroupIndex(currentCanvasGroupIndex: number) {
    if (!this.isWithinBounds(currentCanvasGroupIndex)) {
      return;
    }
    this._currentCanvasGroupIndex.next(currentCanvasGroupIndex);
  }

  get currentCanvasGroupIndex(): number {
    return this._currentCanvasGroupIndex.value;
  }

  get numberOfCanvases(): number {
    return this._numberOfCanvases;
  }

  set numberOfCanvases(numberOfCanvases: number) {
    this._numberOfCanvases = numberOfCanvases;
  }

  get numberOfCanvasGroups(): number {
    return this.canvasGroups.length();
  }

  get currentCanvasIndex(): number {
    const canvases =
      this.canvasGroups.canvasesPerCanvasGroup[this.currentCanvasGroupIndex];
    return canvases && canvases.length >= 1 ? canvases[0] : 0;
  }

  setViewer(viewer: any): void {
    this.viewer = viewer;
  }

  setConfig(config: MimeViewerConfig): void {
    this.config = config;
  }

  setSvgNode(svgNode: any): void {
    this.svgNode = svgNode;
  }

  setRotation(rotation: number): void {
    this.rotation = rotation;
  }

  setViewingDirection(viewingDirection: ViewingDirection): void {
    this.viewingDirection = viewingDirection;
  }

  addTileSources(tileSources: Resource[]): void {
    this.tileSources = tileSources;
  }

  updateViewer(): void {
    this.createCanvasGroups();
    let index = 0;
    this.canvasGroups.canvasGroupRects.forEach((canvasGroup) => {
      canvasGroup.canvases.forEach((canvas) => {
        this.createTile(canvas, index);
        this.createOverlay(canvas, index);
        index++;
      });
    });
  }

  isWithinBounds(canvasGroupIndex: number): boolean {
    return (
      canvasGroupIndex > -1 && canvasGroupIndex <= this.numberOfCanvasGroups - 1
    );
  }

  isCurrentCanvasGroupValid(): boolean {
    return this.isWithinBounds(this.currentCanvasGroupIndex);
  }

  // Returns -1 if next canvas index is out of bounds
  getNextCanvasGroupIndex(): number {
    if (!this.isWithinBounds(this.currentCanvasGroupIndex + 1)) {
      return -1;
    }
    this.currentCanvasGroupIndex++;
    return this.currentCanvasGroupIndex;
  }

  // Returns -1 if previous canvas index is out of bounds
  getPrevCanvasGroupIndex(): number {
    if (!this.isWithinBounds(this.currentCanvasGroupIndex - 1)) {
      return -1;
    }
    this.currentCanvasGroupIndex--;
    return this.currentCanvasGroupIndex;
  }

  constrainToRange(canvasGroupsIndex: number): number {
    if (canvasGroupsIndex < 0) {
      return 0;
    } else if (canvasGroupsIndex >= this.numberOfCanvasGroups - 1) {
      return this.numberOfCanvasGroups - 1;
    } else {
      return canvasGroupsIndex;
    }
  }

  findClosestCanvasGroupIndex(point: Point): number {
    return this.canvasGroups.findClosestIndex(point);
  }

  findCanvasGroupByCanvasIndex(canvasIndex: number): number {
    return this.canvasGroups.canvasesPerCanvasGroup.findIndex(function (
      canvasForCanvasGroup: number[],
    ) {
      return canvasForCanvasGroup.indexOf(canvasIndex) >= 0;
    });
  }

  findCanvasByCanvasIndex(canvasIndex: number): number {
    return this.canvasGroups.canvasesPerCanvasGroup.length === 0
      ? -1
      : this.canvasGroups.canvasesPerCanvasGroup[canvasIndex][0];
  }

  getCanvasGroupLabel(canvasGroupIndex: number): string {
    if (
      !this.canvasGroups.canvasGroupRects ||
      this.canvasGroups.canvasesPerCanvasGroup.length === 0
    ) {
      return '1';
    }

    const canvasGroup =
      this.canvasGroups.canvasesPerCanvasGroup[canvasGroupIndex];
    let canvasGroupLabel = '' + (canvasGroup[0] + 1);

    if (canvasGroup.length > 1) {
      canvasGroupLabel =
        canvasGroupLabel + '-' + (canvasGroup[canvasGroup.length - 1] + 1);
    }

    return canvasGroupLabel;
  }

  getCanvasesPerCanvasGroup(canvasIndex: number): number[] {
    return !this.canvasGroups.canvasGroupRects
      ? [0]
      : this.canvasGroups.canvasesPerCanvasGroup[canvasIndex];
  }

  getCanvasRect(canvasIndex: number): Rect {
    return this.canvasGroups.canvasRects[canvasIndex].rect;
  }

  getCurrentCanvasGroupRect(): Rect {
    return this.getCanvasGroupRect(this.currentCanvasGroupIndex);
  }

  getCanvasGroupRect(canvasGroupIndex: number): Rect {
    return this.canvasGroups.get(canvasGroupIndex).rect;
  }

  reset() {
    this.viewer = undefined;
    this._overlays = [];
    this.numberOfCanvases = 0;
    this._currentCanvasGroupIndex.next(0);
    this.canvasGroups = new CanvasGroups();
  }

  private createTile(tile: TileSourceAndRect, i: number): void {
    const tileSource = tile.tileSource;
    const position = tile.rect;
    const rotated = this.rotation === 90 || this.rotation === 270;

    let bounds;

    /* Because image scaling is performed before rotation,
     * we must invert width & height and translate position so that tile rotation ends up correct
     */
    if (rotated) {
      bounds = new OpenSeadragon.Rect(
        position.x + (position.width - position.height) / 2,
        position.y - (position.width - position.height) / 2,
        position.height,
        position.width,
      );
    } else {
      bounds = new OpenSeadragon.Rect(
        position.x,
        position.y,
        position.width,
        position.height,
      );
    }

    this.viewer?.addTiledImage({
      index: i,
      tileSource:
        TileSourceStrategyFactory.create(tileSource).getTileSource(tileSource),
      fitBounds: bounds,
      degrees: this.rotation,
    });
  }

  private createOverlay(tile: TileSourceAndRect, i: number): void {
    const position = tile.rect;
    let group: any = this.svgNode.append('g').attr('class', 'page-group');

    if (
      this.viewerLayoutService.layout === ViewerLayout.TWO_PAGE &&
      i % 2 !== 0
    ) {
      group = this.svgNode.append('g').attr('class', 'page-group');
    }

    const currentOverlay = group
      .append('rect')
      .attr('x', position.x)
      .attr('y', position.y)
      .attr('width', position.width)
      .attr('height', position.height)
      .attr('class', 'tile');

    // Make custom borders if current layout is two-paged
    if (this.viewerLayoutService.layout === ViewerLayout.TWO_PAGE) {
      if (i % 2 === 0 && i !== 0) {
        const noLeftStrokeStyle =
          Number(position.width * 2 + position.height) +
          ', ' +
          position.width * 2;
        currentOverlay.style('stroke-dasharray', noLeftStrokeStyle);
      } else if (i % 2 !== 0 && i !== 0) {
        const noRightStrokeStyle =
          position.width +
          ', ' +
          position.height +
          ', ' +
          Number(position.width * 2 + position.height);
        currentOverlay.style('stroke-dasharray', noRightStrokeStyle);
      }
    }

    const currentOverlayNode: SVGRectElement = currentOverlay.node();
    this._overlays[i] = currentOverlayNode;
  }

  private createCanvasGroups(): void {
    this.numberOfCanvases = this.tileSources.length;
    const canvasGroupStrategy = CanvasGroupStrategyFactory.create(
      this.viewerLayoutService.layout,
      this.config,
      this.viewingDirection,
      this.rotation,
    );
    this.canvasGroups = canvasGroupStrategy.addAll(this.tileSources);
    this._currentNumberOfCanvasGroups.next(this.canvasGroups.length());
  }
}
