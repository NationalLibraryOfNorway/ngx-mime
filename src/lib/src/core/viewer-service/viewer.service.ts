import { Injectable, NgZone, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { sample } from 'rxjs/operators/sample';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { interval } from 'rxjs/observable/interval';
import * as d3 from 'd3';

import { Utils } from '../../core/utils';
import { ViewerOptions } from '../models/viewer-options';
import { ModeService } from '../../core/mode-service/mode.service';
import { ModeChanges } from '../models/modeChanges';
import { Dimensions } from '../models/dimensions';
import { Manifest, Service } from '../models/manifest';
import { Options } from '../models/options';
import { CanvasService } from '../canvas-service/canvas-service';
import { ViewerMode } from '../models/viewer-mode';
import { SwipeUtils } from './swipe-utils';
import { CanvasGroupMask } from './canvas-group-mask';
import { CalculateNextCanvasGroupFactory } from './calculate-next-canvas-group-factory';
import { Point } from './../models/point';
import { ClickService } from '../click-service/click.service';
import { SearchResult } from './../models/search-result';
import { Rect } from './../models/rect';
import { SwipeDragEndCounter } from './swipe-drag-end-counter';
import { Direction } from '../models/direction';
import { Side } from '../models/side';
import { ZoomUtils } from './zoom-utils';
import { ViewerLayout } from '../models/viewer-layout';
import { CalculateCanvasGroupPositionFactory } from '../canvas-group-position/calculate-canvas-group-position-factory';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { PinchStatus } from '../models/pinchStatus';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ManifestUtils } from '../iiif-manifest-service/iiif-manifest-utils';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { Hit } from './../models/hit';
import '../ext/svg-overlay';

declare const OpenSeadragon: any;

@Injectable()
export class ViewerService {
  private viewer: any;
  private svgOverlay: any;
  private svgNode: any;
  private config: MimeViewerConfig;

  private overlays: Array<SVGRectElement>;
  private tileSources: Array<Service>;
  private subscriptions: Array<Subscription> = [];
  private destroyed: Subject<void> = new Subject();

  public isCanvasPressed: Subject<boolean> = new BehaviorSubject<boolean>(false);

  private currentCenter: Subject<Point> = new Subject();
  private currentCanvasIndex: BehaviorSubject<number> = new BehaviorSubject(0);
  private currentHit: BehaviorSubject<Hit> = new BehaviorSubject(null);
  private osdIsReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private swipeDragEndCounter = new SwipeDragEndCounter();
  private canvasGroupMask: CanvasGroupMask;
  private pinchStatus = new PinchStatus();
  private dragStartPosition: any;
  private manifest: Manifest;
  private isManifestPaged: boolean;
  private defaultKeyDownHandler: any;

  public currentSearch: SearchResult;

  constructor(
    private zone: NgZone,
    private clickService: ClickService,
    private canvasService: CanvasService,
    private modeService: ModeService,
    private viewerLayoutService: ViewerLayoutService,
    private iiifContentSearchService: IiifContentSearchService
  ) {}

  get onCenterChange(): Observable<Point> {
    return this.currentCenter.asObservable();
  }

  get onCanvasGroupIndexChange(): Observable<number> {
    return this.currentCanvasIndex.asObservable().pipe(distinctUntilChanged());
  }

  get onHitChange(): Observable<Hit> {
    return this.currentHit.asObservable().pipe(distinctUntilChanged());
  }

  get onOsdReadyChange(): Observable<boolean> {
    return this.osdIsReady.asObservable().pipe(distinctUntilChanged());
  }

  public getViewer(): any {
    return this.viewer;
  }

  public getTilesources(): Service[] {
    return this.tileSources;
  }

  public getOverlays(): SVGRectElement[] {
    return this.overlays;
  }

  public getZoom(): number {
    return Utils.shortenDecimals(this.viewer.viewport.getZoom(true), 5);
  }

  public getMinZoom(): number {
    return Utils.shortenDecimals(this.viewer.viewport.getMinZoom(), 5);
  }

  public getMaxZoom(): number {
    return Utils.shortenDecimals(this.viewer.viewport.getMaxZoom(), 5);
  }

  public zoomTo(level: number, position?: Point): void {
    this.viewer.viewport.zoomTo(level, position);
  }

  public zoomBy(zoomFactor: number, position?: Point): void {
    const currentZoom = this.viewer.viewport.getZoom(false);
    zoomFactor = ZoomUtils.constraintZoomFactor(zoomFactor, currentZoom, this.getMaxZoom());
    this.viewer.viewport.zoomBy(zoomFactor, position);
  }

  public home(): void {
    if (!this.osdIsReady.getValue()) {
      return;
    }
    this.setMinZoom(this.modeService.mode);
    this.goToCanvasGroup(this.canvasService.currentCanvasGroupIndex, false);
    this.goToHomeZoom();
  }

  public goToPreviousCanvasGroup(): void {
    const viewportCenter = this.getViewportCenter();
    const currentCanvasGroupIndex = this.canvasService.findClosestCanvasGroupIndex(viewportCenter);

    const calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(null);
    const newCanvasGroupIndex = calculateNextCanvasGroupStrategy.calculateNextCanvasGroup({
      direction: Direction.PREVIOUS,
      currentCanvasGroupIndex: currentCanvasGroupIndex,
      currentCanvasGroupCenter: this.currentCanvasIndex.getValue()
    });
    this.goToCanvasGroup(newCanvasGroupIndex, false);
  }

  public goToNextCanvasGroup(): void {
    const viewportCenter = this.getViewportCenter();
    const currentCanvasGroupIndex = this.canvasService.findClosestCanvasGroupIndex(viewportCenter);

    const calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(null);
    const newCanvasGroupIndex = calculateNextCanvasGroupStrategy.calculateNextCanvasGroup({
      direction: Direction.NEXT,
      currentCanvasGroupIndex: currentCanvasGroupIndex,
      currentCanvasGroupCenter: this.currentCanvasIndex.getValue()
    });
    this.goToCanvasGroup(newCanvasGroupIndex, false);
  }

  public goToCanvasGroup(canvasGroupIndex: number, immediately: boolean): void {
    const oldCanvasGroupIndex = this.canvasService.currentCanvasGroupIndex;
    canvasGroupIndex = this.canvasService.constrainToRange(canvasGroupIndex);
    this.canvasService.currentCanvasGroupIndex = canvasGroupIndex;
    const newCanvasGroupCenter = this.canvasService.getCanvasGroupRect(canvasGroupIndex);
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      const oldCanvasGroupCenter = this.canvasService.getCanvasGroupRect(oldCanvasGroupIndex);
      this.panTo(oldCanvasGroupCenter.centerX, oldCanvasGroupCenter.centerY, immediately);
      this.goToHomeZoom();
      setTimeout(() => {
        this.panTo(newCanvasGroupCenter.centerX, newCanvasGroupCenter.centerY, immediately);
        this.modeService.mode = ViewerMode.PAGE;
      }, ViewerOptions.transitions.OSDAnimationTime);
    } else {
      this.panTo(newCanvasGroupCenter.centerX, newCanvasGroupCenter.centerY, immediately);
    }
  }

  public goToCanvas(canvasIndex: number, immediately: boolean): void {
    const canvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(canvasIndex);
    this.goToCanvasGroup(canvasGroupIndex, immediately);
  }

  public highlight(searchResult: SearchResult): void {
    this.clearHightlight();
    if (this.viewer) {
      if (searchResult.q) {
        this.currentSearch = searchResult;
      }
      for (const hit of searchResult.hits) {
        for (const rect of hit.rects) {
          const canvasRect = this.canvasService.getCanvasRect(hit.index);
          const x = canvasRect.x + rect.x;
          const y = canvasRect.y + rect.y;
          const width = rect.width;
          const height = rect.height;
          const currentOverlay: SVGRectElement = this.svgNode
            .append('rect')
            .attr('mimeHitIndex', hit.id)
            .attr('x', x)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'hit');
        }
      }
    }
  }

  private highlightCurrentHit(hit: Hit) {
    this.svgNode.selectAll(`g > rect.selected`).attr('class', 'hit');
    this.svgNode.selectAll(`g > rect[mimeHitIndex='${hit.id}']`).attr('class', 'hit selected');
  }

  public clearHightlight(): void {
    if (this.svgNode) {
      this.svgNode.selectAll('.hit').remove();
      this.currentSearch = null;
    }
  }

  setUpViewer(manifest: Manifest, config: MimeViewerConfig) {
    this.config = config;
    if (manifest && manifest.tileSource) {
      this.tileSources = manifest.tileSource;
      this.zone.runOutsideAngular(() => {
        this.manifest = manifest;
        this.isManifestPaged = ManifestUtils.isManifestPaged(this.manifest);
        this.viewer = new OpenSeadragon.Viewer(Object.assign({}, this.getOptions()));
        /*
          This disables keyboard navigation in openseadragon.
          We use s for opening search dialog and OSD use the same key for panning.
          Issue: https://github.com/openseadragon/openseadragon/issues/794
         */
        this.defaultKeyDownHandler = this.viewer.innerTracker.keyDownHandler;
        this.disableKeyDownHandler();
        this.viewer.innerTracker.keyHandler = null;
        this.canvasService.reset();
        this.canvasGroupMask = new CanvasGroupMask(this.viewer);
      });

      this.addToWindow();
      this.setupOverlays();
      this.createOverlays();
      this.addEvents();
      this.addSubscriptions();
    }
  }

  addSubscriptions(): void {
    this.modeService.onChange.pipe(takeUntil(this.destroyed)).subscribe((mode: ModeChanges) => {
      this.modeChanged(mode);
    });

    this.zone.runOutsideAngular(() => {
      this.onCenterChange.pipe(takeUntil(this.destroyed), sample(interval(500))).subscribe((center: Point) => {
        this.calculateCurrentCanvasGroup(center);
        if (center && center !== null) {
          this.osdIsReady.next(true);
        }
      });
    });

    this.canvasService.onCanvasGroupIndexChange.pipe(takeUntil(this.destroyed)).subscribe((canvasGroupIndex: number) => {
      if (canvasGroupIndex !== -1) {
        this.canvasGroupMask.changeCanvasGroup(this.canvasService.getCanvasGroupRect(canvasGroupIndex));
        if (this.modeService.mode === ViewerMode.PAGE) {
          this.goToHomeZoom();
        }
      }
    });

    this.onOsdReadyChange.pipe(takeUntil(this.destroyed)).subscribe((state: boolean) => {
      if (state) {
        this.initialCanvasGroupLoaded();
        this.currentCenter.next(this.viewer.viewport.getCenter(true));
      }
    });

    this.viewerLayoutService.onChange.pipe(takeUntil(this.destroyed)).subscribe((state: ViewerLayout) => {
      if (this.osdIsReady.getValue()) {
        const currentCanvasIndex = this.canvasService.currentCanvasIndex;
        this.destroy(true);
        this.setUpViewer(this.manifest, this.config);
        this.goToCanvasGroup(this.canvasService.findCanvasGroupByCanvasIndex(currentCanvasIndex), false);
        // Recreate highlights if there is an active search going on
        if (this.currentSearch) {
          this.highlight(this.currentSearch);
        }
      }
    });

    this.iiifContentSearchService.onSelected.pipe(takeUntil(this.destroyed)).subscribe((hit: Hit) => {
      if (hit) {
        this.highlightCurrentHit(hit);
        this.goToCanvas(hit.index, false);
      }
    });
  }

  addToWindow() {
    window.openSeadragonViewer = this.viewer;
  }

  setupOverlays(): void {
    this.svgOverlay = this.viewer.svgOverlay();
    this.svgNode = d3.select(this.svgOverlay.node());
  }

  disableKeyDownHandler() {
    this.viewer.innerTracker.keyDownHandler = null;
  }

  resetKeyDownHandler() {
    this.viewer.innerTracker.keyDownHandler = this.defaultKeyDownHandler;
  }

  /**
   *
   * @param layoutSwitch true if switching between layouts
   * to keep current search-state
   */
  destroy(layoutSwitch?: boolean) {
    this.osdIsReady.next(false);
    this.currentCenter.next(null);
    if (this.viewer != null && this.viewer.isOpen()) {
      if (this.viewer.container != null) {
        d3.select(this.viewer.container.parentNode).style('opacity', '0');
      }
      this.viewer.destroy();
    }
    this.destroyed.next();
    this.overlays = null;
    this.canvasService.reset();
    // Keep search-state only if layout-switch
    if (!layoutSwitch) {
      this.currentSearch = null;
      this.iiifContentSearchService.destroy();
    }
  }

  addEvents(): void {
    this.clickService.reset();
    this.clickService.addSingleClickHandler(this.singleClickHandler);
    this.clickService.addDoubleClickHandler(this.dblClickHandler);
    this.viewer.addHandler('animation-finish', () => {
      this.currentCenter.next(this.viewer.viewport.getCenter(true));
    });
    this.viewer.addHandler('canvas-click', this.clickService.click);
    this.viewer.addHandler('canvas-double-click', (e: any) => (e.preventDefaultAction = true));
    this.viewer.addHandler('canvas-press', (e: any) => {
      this.pinchStatus.active = false;
      this.dragStartPosition = e.position;
      this.isCanvasPressed.next(true);
    });
    this.viewer.addHandler('canvas-release', () => this.isCanvasPressed.next(false));
    this.viewer.addHandler('canvas-scroll', this.scrollHandler);
    this.viewer.addHandler('canvas-pinch', this.pinchHandler);

    this.viewer.addHandler('canvas-drag', (e: any) => this.dragHandler(e));
    this.viewer.addHandler('canvas-drag-end', (e: any) => this.swipeToCanvasGroup(e));

    this.viewer.addHandler('animation', (e: any) => {
      this.currentCenter.next(this.viewer.viewport.getCenter(true));
    });
  }

  zoomIn(zoomFactor?: number, position?: Point): void {
    if (typeof zoomFactor === 'undefined') {
      zoomFactor = ViewerOptions.zoom.zoomFactor;
    }

    if (typeof position !== 'undefined') {
      position = this.viewer.viewport.pointFromPixel(position);
      position = ZoomUtils.constrainPositionToCanvasGroup(position, this.canvasService.getCurrentCanvasGroupRect());
    }

    if (this.modeService.mode !== ViewerMode.PAGE_ZOOMED) {
      this.modeService.mode = ViewerMode.PAGE_ZOOMED;
    }

    this.zoomBy(zoomFactor, position);
  }

  zoomOut(zoomFactor?: number, position?: Point): void {
    if (typeof zoomFactor === 'undefined') {
      zoomFactor = Math.pow(ViewerOptions.zoom.zoomFactor, -1);
    }

    if (typeof position !== 'undefined') {
      position = this.viewer.viewport.pointFromPixel(position);
      position = ZoomUtils.constrainPositionToCanvasGroup(position, this.canvasService.getCurrentCanvasGroupRect());
    }

    if (this.isViewportLargerThanCanvasGroup()) {
      this.modeService.mode = ViewerMode.PAGE;
    } else {
      this.zoomBy(zoomFactor, position);
    }
  }

  /**
   * Callback for mode-change
   * @param mode ViewerMode
   */
  modeChanged(mode: ModeChanges): void {
    if (mode.currentValue === ViewerMode.DASHBOARD) {
      this.swipeDragEndCounter.reset();
      this.viewer.panVertical = false;
      this.toggleToDashboard();
      this.disableKeyDownHandler();
    } else if (mode.currentValue === ViewerMode.PAGE) {
      this.swipeDragEndCounter.reset();
      this.viewer.panVertical = false;
      this.toggleToPage();
      this.disableKeyDownHandler();
    } else if (mode.currentValue === ViewerMode.PAGE_ZOOMED) {
      this.viewer.panVertical = true;
      this.resetKeyDownHandler();
    }
  }

  /**
   * Switches to DASHBOARD-mode, repositions canvas group and removes max-width on viewer
   */
  private toggleToDashboard(): void {
    if (!this.canvasService.isCurrentCanvasGroupValid()) {
      return;
    }
    this.goToCanvasGroup(this.canvasService.currentCanvasGroupIndex, false);
    this.canvasGroupMask.hide();

    this.setMinZoom(ViewerMode.DASHBOARD);
    this.goToHomeZoom();
  }

  /**
   * Switches to PAGE-mode, centers current canvas group and repositions other canvas groups
   */
  private toggleToPage(): void {
    if (!this.canvasService.isCurrentCanvasGroupValid()) {
      return;
    }
    this.goToCanvasGroup(this.canvasService.currentCanvasGroupIndex, false);
    this.canvasGroupMask.show();

    this.setMinZoom(ViewerMode.PAGE);
    this.goToHomeZoom();
  }

  /**
   * Scroll-handler
   */
  scrollHandler = (event: any) => {
    const zoomFactor = Math.pow(ViewerOptions.zoom.zoomFactor, event.scroll);
    // Scrolling up
    if (event.scroll > 0) {
      this.zoomInGesture(event.position, zoomFactor);
      // Scrolling down
    } else if (event.scroll < 0) {
      this.zoomOutGesture(event.position, zoomFactor);
    }
  };

  /**
   * Pinch-handler
   */
  pinchHandler = (event: any) => {
    this.pinchStatus.active = true;
    const zoomFactor = event.distance / event.lastDistance;
    // Pinch Out
    if (event.distance > event.lastDistance + ViewerOptions.zoom.pinchZoomThreshold) {
      this.zoomInPinchGesture(event, zoomFactor);
      // Pinch In
    } else if (event.distance + ViewerOptions.zoom.pinchZoomThreshold < event.lastDistance) {
      this.zoomOutPinchGesture(event, zoomFactor);
    }
  };

  /**
   *
   * @param point to zoom to. If not set, the viewer will zoom to center
   */
  zoomInGesture(position: Point, zoomFactor?: number): void {
    if (this.modeService.mode === ViewerMode.DASHBOARD) {
      this.modeService.mode = ViewerMode.PAGE;
    } else {
      if (position) {
        this.zoomIn(zoomFactor, position);
      } else {
        this.zoomIn();
      }
    }
  }

  zoomOutGesture(position: Point, zoomFactor?: number): void {
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      this.zoomOut(zoomFactor, position);
    } else if (this.modeService.mode === ViewerMode.PAGE) {
      this.modeService.mode = ViewerMode.DASHBOARD;
    }
  }

  /**
   * Process zoom in pinch gesture (pinch out)
   *
   * Toggle to page mode and Zoom in
   *
   * @param event from pinch gesture
   */
  zoomInPinchGesture(event: any, zoomFactor: number): void {
    if (this.modeService.mode === ViewerMode.DASHBOARD) {
      this.modeService.mode = ViewerMode.PAGE;
    } else {
      this.zoomIn(zoomFactor, this.dragStartPosition || event.center);
    }
  }

  /**
   * Process zoom out pinch gesture (pinch in)
   *
   * Zoom out and toggle to dashboard when all zoomed out.
   * Stop between zooming out and toggling to dashboard.
   *
   * @param event from pinch gesture
   */
  zoomOutPinchGesture(event: any, zoomFactor: number): void {
    const gestureId = event.gesturePoints[0].id;
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      this.pinchStatus.shouldStop = true;
      this.zoomOut(zoomFactor, event.center);
    } else if (this.modeService.mode === ViewerMode.PAGE) {
      if (!this.pinchStatus.shouldStop || gestureId === this.pinchStatus.previousGestureId + 2) {
        this.pinchStatus.shouldStop = false;
        this.modeService.toggleMode();
      }
      this.pinchStatus.previousGestureId = gestureId;
    }
  }

  /**
   * Single-click-handler
   * Single-click toggles between page/dashboard-mode if a page is hit
   */
  singleClickHandler = (event: any) => {
    const target = event.originalEvent.target;
    const tileIndex = this.getOverlayIndexFromClickEvent(target);
    const requestedCanvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(tileIndex);
    if (requestedCanvasGroupIndex) {
      this.canvasService.currentCanvasGroupIndex = requestedCanvasGroupIndex;
    }
    this.modeService.toggleMode();
  };

  /**
   * Double-click-handler
   * Double-click dashboard-mode should go to page-mode
   * Double-click page-mode should
   *    a) Zoom in if page is fitted vertically, or
   *    b) Fit vertically if page is already zoomed in
   */
  dblClickHandler = (event: any) => {
    const target = event.originalEvent.target;
    // Page is fitted vertically, so dbl-click zooms in
    if (this.modeService.mode === ViewerMode.PAGE) {
      this.modeService.mode = ViewerMode.PAGE_ZOOMED;
      this.zoomIn(ViewerOptions.zoom.dblClickZoomFactor, event.position);
    } else {
      this.modeService.mode = ViewerMode.PAGE;
      const canvasIndex: number = this.getOverlayIndexFromClickEvent(target);
      const requestedCanvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(canvasIndex);
      if (requestedCanvasGroupIndex >= 0) {
        this.canvasService.currentCanvasGroupIndex = requestedCanvasGroupIndex;
      }
    }
  };

  isViewportLargerThanCanvasGroup(): boolean {
    const canvasGroupRec = this.canvasService.getCurrentCanvasGroupRect();
    const viewportBounds = this.viewer.viewport.getBounds();
    const pbWidth = Math.round(canvasGroupRec.width);
    const pbHeight = Math.round(canvasGroupRec.height);
    const vpWidth = Math.round(viewportBounds.width);
    const vpHeight = Math.round(viewportBounds.height);
    return vpHeight >= pbHeight || vpWidth >= pbWidth;
  }

  /**
   * Checks if hit element is a <rect>-element
   * @param target
   */
  isCanvasGroupHit(target: HTMLElement): boolean {
    return target instanceof SVGRectElement;
  }

  /**
   * Iterates tilesources and adds them to viewer
   * Creates svg clickable overlays for each tile
   */
  createOverlays(): void {
    this.overlays = [];
    const canvasRects: Rect[] = [];
    const calculateCanvasGroupPositionStrategy = CalculateCanvasGroupPositionFactory.create(
      this.viewerLayoutService.layout,
      this.isManifestPaged
    );

    const isTwoPageView: boolean = this.viewerLayoutService.layout === ViewerLayout.TWO_PAGE;
    let group: any = this.svgNode.append('g').attr('class', 'page-group');

    this.tileSources.forEach((tile, i) => {
      const position = calculateCanvasGroupPositionStrategy.calculateCanvasGroupPosition({
        canvasGroupIndex: i,
        canvasSource: tile,
        previousCanvasGroupPosition: canvasRects[i - 1]
      });

      canvasRects.push(position);

      this.zone.runOutsideAngular(() => {
        this.viewer.addTiledImage({
          index: i,
          tileSource: tile,
          height: position.height,
          x: position.x,
          y: position.y
        });
      });

      if (isTwoPageView && i % 2 !== 0) {
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
      if (isTwoPageView) {
        if (i % 2 === 0 && i !== 0) {
          const noLeftStrokeStyle = Number(position.width * 2 + position.height) + ', ' + position.width * 2;
          currentOverlay.style('stroke-dasharray', noLeftStrokeStyle);
        } else if (i % 2 !== 0 && i !== 0) {
          const noRightStrokeStyle = position.width + ', ' + position.height + ', ' + Number(position.width * 2 + position.height);
          currentOverlay.style('stroke-dasharray', noRightStrokeStyle);
        }
      }

      const currentOverlayNode: SVGRectElement = currentOverlay.node();
      this.overlays.push(currentOverlayNode);
    });

    const layout =
      this.viewerLayoutService.layout === ViewerLayout.ONE_PAGE || !this.isManifestPaged ? ViewerLayout.ONE_PAGE : ViewerLayout.TWO_PAGE;
    this.canvasService.addAll(canvasRects, layout);
  }

  /**
   * Sets viewer size and opacity once the first canvas group has fully loaded
   */
  private initialCanvasGroupLoaded(): void {
    this.home();
    this.canvasGroupMask.initialise(this.canvasService.getCurrentCanvasGroupRect(), this.modeService.mode !== ViewerMode.DASHBOARD);
    d3
      .select(this.viewer.container.parentNode)
      .transition()
      .duration(ViewerOptions.transitions.OSDAnimationTime)
      .style('opacity', '1');
  }

  /**
   * Returns overlay-index for click-event if hit
   * @param target hit <rect>
   */
  getOverlayIndexFromClickEvent(target: any) {
    if (this.isCanvasGroupHit(target)) {
      const requestedCanvasGroup: number = this.overlays.indexOf(target);
      if (requestedCanvasGroup >= 0) {
        return requestedCanvasGroup;
      }
    }
    return -1;
  }

  public getHomeZoomLevel(mode: ViewerMode): number {
    if (!this.viewer || !this.canvasService) {
      return;
    }

    let canvasGroupHeight: number;
    let canvasGroupWidth: number;
    let viewportBounds: any;

    if (mode === ViewerMode.DASHBOARD) {
      canvasGroupHeight = this.canvasService.getMaxHeight();
      canvasGroupWidth = this.canvasService.getMaxWidth();
      viewportBounds = this.getDashboardViewportBounds();
    } else {
      const currentCanvasGroupRect = this.canvasService.getCurrentCanvasGroupRect();
      canvasGroupHeight = currentCanvasGroupRect.height;
      canvasGroupWidth = currentCanvasGroupRect.width;
      viewportBounds = this.viewer.viewport.getBounds();
    }

    return this.getFittedZoomLevel(viewportBounds, canvasGroupHeight, canvasGroupWidth);
  }

  private getOptions(): Options {
    const options = new Options();
    options.ajaxWithCredentials = this.config.withCredentials;
    options.loadTilesWithAjax = this.config.loadTilesWithAjax;
    options.crossOriginPolicy = this.config.crossOriginPolicy;
    options.ajaxHeaders = this.config.ajaxHeaders;
    return options;
  }

  private calculateCurrentCanvasGroup(center: Point) {
    if (center) {
      const currentCanvasGroupIndex = this.canvasService.findClosestCanvasGroupIndex(center);
      this.currentCanvasIndex.next(currentCanvasGroupIndex);
    }
  }

  private getViewportCenter(): Point {
    return this.viewer.viewport.getCenter(true);
  }

  private dragHandler = (e: any) => {
    this.viewer.panHorizontal = true;
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      const dragEndPosision: Point = e.position;
      const canvasGroupRect: Rect = this.canvasService.getCurrentCanvasGroupRect();
      const vpBounds: Rect = this.getViewportBounds();
      const pannedPastCanvasGroup: Side = SwipeUtils.getSideIfPanningPastEndOfCanvasGroup(canvasGroupRect, vpBounds);
      const direction: number = e.direction;
      if (
        (pannedPastCanvasGroup === Side.LEFT && SwipeUtils.isDirectionInRightSemicircle(direction)) ||
        (pannedPastCanvasGroup === Side.RIGHT && SwipeUtils.isDirectionInLeftSemicircle(direction))
      ) {
        this.viewer.panHorizontal = false;
      }
    }
  };

  private swipeToCanvasGroup(e: any) {
    // Don't swipe on pinch actions
    if (this.pinchStatus.active) {
      return;
    }

    const speed: number = e.speed;
    const dragEndPosision = e.position;

    const isCanvasGroupZoomed = this.modeService.mode === ViewerMode.PAGE_ZOOMED;

    const canvasGroupRect: Rect = this.canvasService.getCurrentCanvasGroupRect();
    const viewportBounds: Rect = this.getViewportBounds();

    const direction: Direction = SwipeUtils.getSwipeDirection(this.dragStartPosition, dragEndPosision, isCanvasGroupZoomed);
    const viewportCenter: Point = this.getViewportCenter();

    const currentCanvasGroupIndex: number = this.canvasService.currentCanvasGroupIndex;
    const calculateNextCanvasGroupStrategy = CalculateNextCanvasGroupFactory.create(this.modeService.mode);

    let pannedPastSide: Side, canvasGroupEndHitCountReached: boolean;
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      pannedPastSide = SwipeUtils.getSideIfPanningPastEndOfCanvasGroup(canvasGroupRect, viewportBounds);
      this.swipeDragEndCounter.addHit(pannedPastSide, direction);
      canvasGroupEndHitCountReached = this.swipeDragEndCounter.hitCountReached();
    }

    const newCanvasGroupIndex = calculateNextCanvasGroupStrategy.calculateNextCanvasGroup({
      currentCanvasGroupCenter: this.currentCanvasIndex.getValue(),
      speed: speed,
      direction: direction,
      currentCanvasGroupIndex: currentCanvasGroupIndex,
      canvasGroupEndHitCountReached: canvasGroupEndHitCountReached
    });
    if (
      this.modeService.mode === ViewerMode.DASHBOARD ||
      this.modeService.mode === ViewerMode.PAGE ||
      (canvasGroupEndHitCountReached && direction)
    ) {
      this.goToCanvasGroup(newCanvasGroupIndex, false);
    }
  }

  private panTo(x: number, y: number, immediately: boolean): void {
    this.viewer.viewport.panTo(
      {
        x: x,
        y: y
      },
      immediately
    );
  }

  private setMinZoom(mode: ViewerMode): void {
    this.viewer.viewport.minZoomLevel = this.getHomeZoomLevel(mode);
  }

  private goToHomeZoom(): void {
    this.zoomTo(this.getHomeZoomLevel(this.modeService.mode));
  }

  private getFittedZoomLevel(viewportBounds: any, canvasGroupHeight: number, canvasGroupWidth: number) {
    const currentZoom: number = this.viewer.viewport.getZoom();
    const resizeRatio: number = viewportBounds.height / canvasGroupHeight;

    if (resizeRatio * canvasGroupWidth <= viewportBounds.width) {
      return Utils.shortenDecimals(resizeRatio * currentZoom, 5);
    } else {
      // Canvas group at full height is wider than viewport.  Return fit by width instead.
      return Utils.shortenDecimals(viewportBounds.width / canvasGroupWidth * currentZoom, 5);
    }
  }

  private getDashboardViewportBounds(): any {
    if (!this.viewer) {
      return;
    }

    const maxViewportDimensions = new Dimensions(
      d3
        .select(this.viewer.container.parentNode.parentNode)
        .node()
        .getBoundingClientRect()
    );
    const viewportHeight = maxViewportDimensions.height - ViewerOptions.padding.header - ViewerOptions.padding.footer;
    const viewportWidth = maxViewportDimensions.width;

    const viewportSizeInViewportCoordinates = this.viewer.viewport.deltaPointsFromPixels(
      new OpenSeadragon.Point(viewportWidth, viewportHeight)
    );

    return new OpenSeadragon.Rect(0, 0, viewportSizeInViewportCoordinates.x, viewportSizeInViewportCoordinates.y);
  }

  private getViewportBounds(): Rect {
    return this.viewer.viewport.getBounds();
  }
}
