import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import * as OpenSeadragon from 'openseadragon';
import { Viewer } from 'openseadragon';
import { Observable } from 'rxjs';
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
  readonly canvasGroupCount: Signal<number>;
  readonly canvasGroupIndex: Signal<number>;
  readonly canvasCount: Signal<number>;
  readonly isFirstCanvasGroup: Signal<boolean>;
  readonly isLastCanvasGroup: Signal<boolean>;
  readonly onCanvasGroupIndexChange: Observable<number>;
  protected readonly canvasGroupCountState = signal(0);
  protected readonly canvasGroupIndexState = signal(0);
  protected readonly canvasCountState = signal(0);
  protected canvasGroups: CanvasGroups = new CanvasGroups();
  private readonly viewerLayoutService = inject(ViewerLayoutService);
  private config = new MimeViewerConfig();
  private tileSources: any[] = [];
  private viewer: Viewer | undefined = undefined;
  private rotation = 0;
  private viewingDirection = ViewingDirection.LTR;
  private svgNode: any;
  private _overlays: SVGRectElement[] = [];

  constructor() {
    this.canvasGroupCount = this.canvasGroupCountState.asReadonly();
    this.canvasGroupIndex = this.canvasGroupIndexState.asReadonly();
    this.canvasCount = this.canvasCountState.asReadonly();
    this.isFirstCanvasGroup = computed(() => this.canvasGroupIndex() === 0);
    this.isLastCanvasGroup = computed(
      () => this.canvasGroupIndex() === this.canvasGroupCount() - 1,
    );
    this.onCanvasGroupIndexChange = toObservable(this.canvasGroupIndex);
  }

  get overlays(): ReadonlyArray<SVGRectElement> {
    return this._overlays;
  }

  get currentCanvasIndex(): number {
    const canvases =
      this.canvasGroups.canvasesPerCanvasGroup[this.currentCanvasGroupIndex];

    return canvases && canvases.length >= 1 ? canvases[0] : 0;
  }

  get currentCanvasGroupIndex(): number {
    return this.canvasGroupIndex();
  }

  set currentCanvasGroupIndex(currentCanvasGroupIndex: number) {
    if (!this.isWithinBounds(currentCanvasGroupIndex)) {
      return;
    }
    this.canvasGroupIndexState.set(currentCanvasGroupIndex);
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
    this.createAndAppendCanvasGroups();
  }

  isWithinBounds(canvasGroupIndex: number): boolean {
    return (
      canvasGroupIndex > -1 && canvasGroupIndex <= this.canvasGroupCount() - 1
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
    } else if (canvasGroupsIndex >= this.canvasGroupCount() - 1) {
      return this.canvasGroupCount() - 1;
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
      !this.canvasGroups.canvasGroups ||
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
    return !this.canvasGroups.canvasGroups
      ? [0]
      : this.canvasGroups.canvasesPerCanvasGroup[canvasIndex];
  }

  getCanvasRect(canvasIndex: number): Rect {
    return this.canvasGroups.tileSourceAndRects[canvasIndex].rect;
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
    this.canvasCountState.set(0);
    this.canvasGroupCountState.set(0);
    this.canvasGroupIndexState.set(0);
    this.canvasGroups = new CanvasGroups();
  }

  private createTile(tile: TileSourceAndRect): void {
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

    const tileSourcesStrategy = TileSourceStrategyFactory.create(
      tile.tileSource,
    );
    const tileSource = tileSourcesStrategy.getTileSource(tile.tileSource);
    this.viewer?.addTiledImage({
      tileSource: tileSource,
      fitBounds: bounds,
      degrees: this.rotation,
    });
  }

  private createAndAppendCanvasGroups(): void {
    let index = 0;
    this.canvasGroups.canvasGroups.forEach((canvasGroup) => {
      const group: any = this.appendPageGroup();
      canvasGroup.tileSourceAndRects.forEach((tileSourceAndRect) => {
        this.createTile(tileSourceAndRect);
        this.createOverlay(group, tileSourceAndRect, index);
        index++;
      });
    });
  }

  private appendPageGroup(): any {
    return this.svgNode.append('g').attr('class', 'page-group');
  }

  private createOverlay(group: any, tile: TileSourceAndRect, i: number): void {
    const position = tile.rect;
    const currentOverlay = this.createRectangle(group, position);

    // Make custom borders if current layout is two-paged
    if (this.viewerLayoutService.layout === ViewerLayout.TWO_PAGE) {
      this.applyCustomBorders(i, position, currentOverlay);
    }

    const currentOverlayNode: SVGRectElement = currentOverlay.node();
    this._overlays[i] = currentOverlayNode;
  }

  private createCanvasGroups(): void {
    this.canvasCountState.set(this.tileSources.length);
    const canvasGroupStrategy = CanvasGroupStrategyFactory.create(
      this.viewerLayoutService.layout,
      this.config,
      this.viewingDirection,
      this.rotation,
    );
    this.canvasGroups = canvasGroupStrategy.addAll(this.tileSources);
    this.canvasGroupCountState.set(this.canvasGroups.length());
  }

  private applyCustomBorders(
    i: number,
    position: any,
    currentOverlay: any,
  ): void {
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

  private createRectangle(group: any, position: Rect): any {
    return group
      .append('rect')
      .attr('x', position.x)
      .attr('y', position.y)
      .attr('width', position.width)
      .attr('height', position.height)
      .attr('class', 'tile');
  }
}
