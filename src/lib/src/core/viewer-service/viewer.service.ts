import { BehaviorSubject, Subject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable, NgZone, OnInit } from '@angular/core';

import { Utils } from '../../core/utils';
import { TileRects } from './../models/tile-rects';
import { ViewerOptions } from '../models/viewer-options';
import { ModeService } from '../../core/mode-service/mode.service';
import { Dimensions } from '../models/dimensions';
import { Manifest, Service } from '../models/manifest';
import { Options } from '../models/options';
import { PageService } from '../page-service/page-service';
import { ViewerMode } from '../models/viewer-mode';
import { SwipeUtils } from './swipe-utils';
import { PageMask } from './page-mask';
import { CalculateNextPageFactory } from './calculate-next-page-factory';
import { Point } from './../models/point';
import { ClickService } from '../click-service/click.service';
import { SearchResult } from './../models/search-result';
import { Rect } from './../models/rect';
import { SwipeDragEndCounter } from './swipe-drag-end-counter';
import { Direction } from '../models/direction';
import { Side } from '../models/side';
import { Bounds } from '../models/bounds';
import { ZoomUtils } from './zoom-utils';
import { ViewerLayout } from '../models/viewer-layout';
import { CalculatePagePositionFactory } from '../page-position/calculate-page-position-factory';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { PinchStatus } from '../models/pinchStatus';
import { MimeViewerConfig } from '../mime-viewer-config';

import '../ext/svg-overlay';
import '../../rxjs-extension';
import * as d3 from 'd3';

declare const OpenSeadragon: any;

@Injectable()
export class ViewerService {

  private viewer: any;
  private svgOverlay: any;
  private svgNode: any;
  private options: Options;

  private overlays: Array<SVGRectElement>;
  private tileSources: Array<Service>;
  private subscriptions: Array<Subscription> = [];

  public isCanvasPressed: Subject<boolean> = new BehaviorSubject<boolean>(false);

  private currentCenter: Subject<Point> = new Subject();
  private currentPageIndex: BehaviorSubject<number> = new BehaviorSubject(0);
  private osdIsReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private swipeDragEndCounter = new SwipeDragEndCounter();
  private pageMask: PageMask;
  private pinchStatus = new PinchStatus();
  private dragStartPosition: any;
  private tileRects = new TileRects();
  private manifest: Manifest;

  private viewerLayout: ViewerLayout = new MimeViewerConfig().initViewerLayout;

  constructor(
    private zone: NgZone,
    private clickService: ClickService,
    private pageService: PageService,
    private modeService: ModeService,
    private viewerLayoutService: ViewerLayoutService
  ) { }


  //#region getters / setters

  get onCenterChange(): Observable<Point> {
    return this.currentCenter.asObservable();
  }

  get onPageChange(): Observable<number> {
    return this.currentPageIndex.asObservable().distinctUntilChanged();
  }

  get onOsdReadyChange(): Observable<boolean> {
    return this.osdIsReady.asObservable().distinctUntilChanged();
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
    return this.shortenDecimals(this.viewer.viewport.getZoom(true), 5);
  }

  public getMinZoom(): number {
    return this.shortenDecimals(this.viewer.viewport.getMinZoom(), 5);
  }

  public getMaxZoom(): number {
    return this.shortenDecimals(this.viewer.viewport.getMaxZoom(), 5);
  }

  public zoomTo(level: number, position?: Point): void {
    this.viewer.viewport.zoomTo(level, position);
  }

  public zoomBy(zoomFactor: number, position?: Point): void {
    this.viewer.viewport.zoomBy(zoomFactor, position);
  }

  private getViewportBounds(): Bounds {
    return this.viewer.viewport.getBounds();
  }

  private getPageBounds(pageIndex: number): Bounds {
    if (this.pageService.isWithinBounds(pageIndex)) {
      return this.createRectangle(this.overlays[this.pageService.currentPage]);
    }
  }

  //#endregion getters / setters

  public home(): void {
    if (!this.osdIsReady.getValue()) {
      return;
    }

    const viewportCenter = this.getViewportCenter();
    const currentPageIndex = this.tileRects.findClosestIndex(viewportCenter);

    this.goToPage(currentPageIndex, false);
    this.goToHomeZoom();
  }

  public goToPreviousPage(): void {
    const viewportCenter = this.getViewportCenter();
    const currentPageIndex = this.tileRects.findClosestIndex(viewportCenter);

    const calculateNextPageStrategy = CalculateNextPageFactory.create(null);
    const newPageIndex = calculateNextPageStrategy.calculateNextPage({
      direction: Direction.PREVIOUS,
      currentPageIndex: currentPageIndex,
      currentPageCenter: this.currentPageIndex.getValue()
    });
    this.goToPage(newPageIndex, false);
  }

  public goToNextPage(): void {
    const viewportCenter = this.getViewportCenter();
    const currentPageIndex = this.tileRects.findClosestIndex(viewportCenter);

    const calculateNextPageStrategy = CalculateNextPageFactory.create(null);
    const newPageIndex = calculateNextPageStrategy.calculateNextPage({
      direction: Direction.NEXT,
      currentPageIndex: currentPageIndex,
      currentPageCenter: this.currentPageIndex.getValue()
    });
    this.goToPage(newPageIndex, false);
  }

  public goToPage(pageIndex: number, immediately: boolean): void {
    const oldIndex = this.pageService.currentPage;
    pageIndex = this.pageService.constrainToRange(pageIndex);
    this.pageService.currentPage = pageIndex;
    const newPageCenter = this.tileRects.get(pageIndex);
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      const oldPageCenter = this.tileRects.get(oldIndex);
      this.panTo(oldPageCenter.centerX, oldPageCenter.centerY, immediately);
      this.goToHomeZoom();
      setTimeout(() => {
        this.panTo(newPageCenter.centerX, newPageCenter.centerY, immediately);
        this.modeService.mode = ViewerMode.PAGE;
      }, ViewerOptions.transitions.OSDAnimationTime);
    } else {
      this.panTo(newPageCenter.centerX, newPageCenter.centerY, immediately);
    }
  }


  public highlight(searchResult: SearchResult): void {
    this.clearHightlight();
    if (this.viewer) {
      for (const hit of searchResult.hits) {
        for (let rect of hit.rects) {
          const tileRect = this.tileRects.get(hit.index);
          const x = tileRect.x + rect.x;
          const y = tileRect.y + rect.y;
          const width = rect.width;
          const height = rect.height;
          let currentOverlay: SVGRectElement = this.svgNode.append('rect')
            .attr('x', x)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'hit');
        }
      };
    }
  }

  public clearHightlight(): void {
    if (this.svgNode) {
      this.svgNode.selectAll('.hit').remove();
    }
  }


  setUpViewer(manifest: Manifest) {
    if (!manifest || !manifest.tileSource) {
      return;
    }

    this.tileSources = manifest.tileSource;
    this.zone.runOutsideAngular(() => {

      this.clearOpenSeadragonTooltips();
      this.manifest = manifest;
      this.options = new Options();
      this.viewer = new OpenSeadragon.Viewer(Object.assign({}, this.options));
      this.pageService.reset();
      this.pageService.numberOfPages = this.tileSources.length;
      this.pageMask = new PageMask(this.viewer);
    });

    this.addToWindow();
    this.setupOverlays();
    this.createOverlays();
    this.addEvents();
    this.addSubscriptions();
  }


  addSubscriptions(): void {
    this.subscriptions.push(this.modeService.onChange.subscribe((mode: ViewerMode) => {
      this.modeChanged(mode);
    }));

    this.zone.runOutsideAngular(() => {
      this.subscriptions.push(this.onCenterChange.sample(Observable.interval(500)).subscribe((center: Point) => {
        this.calculateCurrentPage(center);
        if (center && center !== null) {
          this.osdIsReady.next(true);
        }
      }));
    });

    this.subscriptions.push(
      this.pageService.onPageChange.subscribe((pageIndex: number) => {
        if (pageIndex !== -1) {
          this.pageMask.changePage(this.overlays[pageIndex]);
          if (this.modeService.mode === ViewerMode.PAGE) {
            this.goToHomeZoom();
          }
        }
      })
    );

    this.subscriptions.push(
      this.onOsdReadyChange.subscribe((state: boolean) => {
        if (state) {
          this.initialPageLoaded();
          this.currentCenter.next(this.viewer.viewport.getCenter(true));
        }
      })
    );

    this.subscriptions.push(
      this.viewerLayoutService.viewerLayoutState.subscribe((state: ViewerLayout) => {
        if (this.viewerLayout !== state && this.osdIsReady.getValue()) {
          const savedPage = this.pageService.currentPage;
          this.viewerLayout = state;
          this.destroy();
          this.setUpViewer(this.manifest);
          this.goToPage(savedPage, false);
        }
      })
    );
  }

  addToWindow() {
    window.openSeadragonViewer = this.viewer;
  }

  setupOverlays(): void {
    this.svgOverlay = this.viewer.svgOverlay();
    this.svgNode = d3.select(this.svgOverlay.node());
  }

  destroy() {
    this.osdIsReady.next(false);
    this.currentCenter.next(null);
    if (this.viewer != null && this.viewer.isOpen()) {
      if (this.viewer.container != null) {
        d3.select(this.viewer.container.parentNode).style('opacity', '0');
      }
      this.viewer.destroy();
    }
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.overlays = null;
    this.tileRects = new TileRects();
  }

  addEvents(): void {
    this.clickService.reset();
    this.clickService.addSingleClickHandler(this.singleClickHandler);
    this.clickService.addDoubleClickHandler(this.dblClickHandler);
    this.viewer.addHandler('animation-finish', () => {
      this.currentCenter.next(this.viewer.viewport.getCenter(true));
    });
    this.viewer.addHandler('canvas-click', this.clickService.click);
    this.viewer.addHandler('canvas-double-click', (e: any) => e.preventDefaultAction = true);
    this.viewer.addHandler('canvas-press', (e: any) => {
      this.pinchStatus.active = false;
      this.dragStartPosition = e.position;
      this.isCanvasPressed.next(true);
    });
    this.viewer.addHandler('canvas-release', () => this.isCanvasPressed.next(false));
    this.viewer.addHandler('canvas-scroll', this.scrollHandler);
    this.viewer.addHandler('canvas-pinch', this.pinchHandler);

    this.viewer.addHandler('canvas-drag', (e: any) => this.dragHandler(e));
    this.viewer.addHandler('canvas-drag-end', (e: any) => this.swipeToPage(e));

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
      position = ZoomUtils.constrainPositionToPage(position, this.getPageBounds(this.pageService.currentPage));

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
      position = ZoomUtils.constrainPositionToPage(position, this.getPageBounds(this.pageService.currentPage));
    }

    if (this.isViewportLargerThanPage()) {
      this.modeService.mode = ViewerMode.PAGE;
    } else {
      this.zoomBy(zoomFactor, position);
    }
  }

  /**
   * Callback for mode-change
   * @param mode ViewerMode
   */
  modeChanged(mode: ViewerMode): void {
    if (mode === ViewerMode.DASHBOARD) {
      this.swipeDragEndCounter.reset();
      this.viewer.panVertical = false;
      this.toggleToDashboard();
    } else if (mode === ViewerMode.PAGE) {
      this.swipeDragEndCounter.reset();
      this.viewer.panVertical = false;
      this.toggleToPage();
    } else if (mode === ViewerMode.PAGE_ZOOMED) {
      this.viewer.panVertical = true;
    }
  }

  /**
   * Switches to DASHBOARD-mode, repositions pages and removes max-width on viewer
   */
  private toggleToDashboard(): void {
    if (!this.pageService.isCurrentPageValid()) {
      return;
    }
    this.goToPage(this.pageService.currentPage, false);
    this.pageMask.hide();

    this.goToHomeZoom();
    this.viewer.viewport.minZoomLevel = this.getHomeZoomLevel(ViewerMode.DASHBOARD);
  }

  /**
   * Switches to PAGE-mode, centers currentPage and repositions pages other pages
   */
  private toggleToPage(): void {
    if (!this.pageService.isCurrentPageValid()) {
      return;
    }
    this.goToPage(this.pageService.currentPage, false);
    this.pageMask.show();

    this.goToHomeZoom();
    this.viewer.viewport.minZoomLevel = this.getHomeZoomLevel(ViewerMode.DASHBOARD);
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
  }

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
  }

  /**
   *
   * @param {Point} point to zoom to. If not set, the viewer will zoom to center
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
   * @param {any} event from pinch gesture
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
   * @param {any} event from pinch gesture
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
    const requestedPage = this.getOverlayIndexFromClickEvent(target);
    if (requestedPage) {
      this.pageService.currentPage = requestedPage;
    }
    this.modeService.toggleMode();
  }

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
      const requestedPage: number = this.getOverlayIndexFromClickEvent(target);
      if (requestedPage >= 0) {
        this.pageService.currentPage = requestedPage;
      }
    }
  }

  isViewportLargerThanPage(): boolean {
    const pageBounds = this.getPageBounds(this.pageService.currentPage);
    const viewportBounds = this.viewer.viewport.getBounds();
    const pbWidth = Math.round(pageBounds.width);
    const pbHeight = Math.round(pageBounds.height);
    const vpWidth = Math.round(viewportBounds.width);
    const vpHeight = Math.round(viewportBounds.height);
    return (vpHeight >= pbHeight || vpWidth >= pbWidth);
  }

  /**
   * Checks if hit element is a <rect>-element
   * @param {HTMLElement} target
   */
  isPageHit(target: HTMLElement): boolean {
    return target instanceof SVGRectElement;
  }

  /**
   * Iterates tilesources and adds them to viewer
   * Creates svg clickable overlays for each tile
   */
  createOverlays(): void {
    this.overlays = [];
    const calculatePagePositionStrategy = CalculatePagePositionFactory.create(this.viewerLayout, this.viewerLayoutService.paged);

    this.tileSources.forEach((tile, i) => {

      const position = calculatePagePositionStrategy.calculatePagePosition({
        pageIndex: i,
        pageSource: tile,
        previousPagePosition: this.tileRects.get(i - 1)
      });

      this.tileRects.add(position);

      this.zone.runOutsideAngular(() => {
        this.viewer.addTiledImage({
          index: i,
          tileSource: tile,
          height: position.height,
          x: position.x,
          y: position.y
        });
      });

      // Style overlay to match tile
      this.svgNode.append('rect')
        .attr('x', position.x)
        .attr('y', position.y)
        .attr('width', position.width)
        .attr('height', position.height)
        .attr('class', 'tile');

      const currentOverlay: SVGRectElement = this.svgNode.node().childNodes[i];
      this.overlays.push(currentOverlay);
    });
  }

  /**
   * Sets viewer size and opacity once the first page has fully loaded
   */
  initialPageLoaded = (): void => {
    this.goToPage(this.pageService.currentPage, true);
    this.pageMask.initialise(this.overlays[this.pageService.currentPage]);
    d3.select(this.viewer.container.parentNode).transition().duration(ViewerOptions.transitions.OSDAnimationTime).style('opacity', '1');
  }

  /**
   * Returns an OpenSeadragon.Rectangle instance of an overlay
   * @param {SVGRectElement} overlay
   */
  createRectangle(overlay: SVGRectElement): any {
    return new OpenSeadragon.Rect(
      overlay.x.baseVal.value,
      overlay.y.baseVal.value,
      overlay.width.baseVal.value,
      overlay.height.baseVal.value
    );
  }

  /**
   * Returns overlay-index for click-event if hit
   * @param target hit <rect>
   */
  getOverlayIndexFromClickEvent(target: any) {
    if (this.isPageHit(target)) {
      const requestedPage: number = this.overlays.indexOf(target);
      if (requestedPage >= 0) {
        return requestedPage;
      }
    }
    return -1;
  }


  private clearOpenSeadragonTooltips() {
    OpenSeadragon.setString('Tooltips.Home', '');
    OpenSeadragon.setString('Tooltips.ZoomOut', '');
    OpenSeadragon.setString('Tooltips.ZoomIn', '');
    OpenSeadragon.setString('Tooltips.NextPage', '');
    OpenSeadragon.setString('Tooltips.ZoomIn', '');
    OpenSeadragon.setString('Tooltips.FullPage', '');
  }

  private shortenDecimals(zoom: any, precision: number): number {
    const short = Number(zoom).toPrecision(precision);
    return Number(short);
  }

  private calculateCurrentPage(center: Point) {
    if (center) {
      let currentPageIndex = this.tileRects.findClosestIndex(center);
      this.currentPageIndex.next(currentPageIndex);
    }
  }

  private getViewportCenter(): Point {
    return this.viewer.viewport.getCenter(true);
  }



  private dragHandler = (e: any) => {
    this.viewer.panHorizontal = true;
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      const dragEndPosision: Point = e.position;
      const pageBounds: Bounds = this.getPageBounds(this.pageService.currentPage);
      const vpBounds: Bounds = this.getViewportBounds();
      const pannedPastSide: Side = SwipeUtils.getSideIfPanningPastEndOfPage(pageBounds, vpBounds);
      const direction: number = e.direction;
      if (
        (pannedPastSide === Side.LEFT && SwipeUtils.isDirectionInRightSemicircle(direction)) ||
        (pannedPastSide === Side.RIGHT && SwipeUtils.isDirectionInLeftSemicircle(direction))
      ) {
        this.viewer.panHorizontal = false;
      }
    }
  }

  private swipeToPage(e: any) {
    // Don't swipe on pinch actions
    if (this.pinchStatus.active) {
      return;
    }

    const speed: number = e.speed;
    const dragEndPosision = e.position;

    const isPageZoomed = this.modeService.mode === ViewerMode.PAGE_ZOOMED;

    const pageBounds: Bounds = this.getPageBounds(this.pageService.currentPage);
    const viewportBounds: Bounds = this.getViewportBounds();

    const direction: Direction = SwipeUtils.getSwipeDirection(this.dragStartPosition, dragEndPosision, isPageZoomed);
    const viewportCenter: Point = this.getViewportCenter();

    const currentPageIndex: number = this.pageService.currentPage;
    const calculateNextPageStrategy = CalculateNextPageFactory.create(this.modeService.mode);

    let pannedPastSide: Side, pageEndHitCountReached: boolean;
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      pannedPastSide = SwipeUtils.getSideIfPanningPastEndOfPage(pageBounds, viewportBounds);
      this.swipeDragEndCounter.addHit(pannedPastSide, direction);
      pageEndHitCountReached = this.swipeDragEndCounter.hitCountReached();
    }

    const newPageIndex = calculateNextPageStrategy.calculateNextPage({
      currentPageCenter: this.currentPageIndex.getValue(),
      speed: speed,
      direction: direction,
      currentPageIndex: currentPageIndex,
      pageEndHitCountReached: pageEndHitCountReached
    });
    if (
      this.modeService.mode === ViewerMode.DASHBOARD ||
      this.modeService.mode === ViewerMode.PAGE ||
      pageEndHitCountReached && direction
    ) {
      this.goToPage(newPageIndex, false);
    }

  }

  private panTo(x: number, y: number, immediately: boolean): void {
    this.viewer.viewport.panTo({
      x: x,
      y: y
    }, immediately);
  }

  private goToHomeZoom(): void {
    this.zoomTo(this.getHomeZoomLevel(this.modeService.mode));
  }

  private getHomeZoomLevel(mode: ViewerMode): number {
    if (!this.viewer || !this.tileRects) {
      return;
    }

    let pageHeight: number;
    let pageWidth: number;
    let viewportBounds: any;

    if (mode === ViewerMode.DASHBOARD) {
      pageHeight = this.tileRects.getMaxHeight();
      pageWidth = this.tileRects.getMaxWidth();
      viewportBounds = this.getDashboardViewportBounds();
    } else {
      const currentPageBounds = this.tileRects.get(this.pageService.currentPage);
      pageHeight = currentPageBounds.height;
      pageWidth = currentPageBounds.width;
      viewportBounds = this.viewer.viewport.getBounds();
    }

    return this.getFittedZoomLevel(viewportBounds, pageHeight, pageWidth);
  }

  private getFittedZoomLevel(viewportBounds: any, pageHeight: number, pageWidth: number) {
    const currentZoom: number = this.viewer.viewport.getZoom();
    const resizeRatio: number = viewportBounds.height / pageHeight;

    if (resizeRatio * pageWidth <= viewportBounds.width) {
      return this.shortenDecimals(resizeRatio * currentZoom, 5);
    } else {
      // Page at full height is wider than viewport.  Return fit by width instead.
      return this.shortenDecimals(viewportBounds.width / pageWidth * currentZoom, 5);
    }
  }

  private getDashboardViewportBounds(): any {
    if (!this.viewer) {
      return;
    }

    const maxViewportDimensions = new Dimensions(d3.select(this.viewer.container.parentNode.parentNode).node().getBoundingClientRect());
    const viewportHeight = maxViewportDimensions.height - ViewerOptions.padding.header - ViewerOptions.padding.footer;
    const viewportWidth = maxViewportDimensions.width;

    const viewportSizeInViewportCoordinates =
      this.viewer.viewport.deltaPointsFromPixels(
        new OpenSeadragon.Point(viewportWidth, viewportHeight)
      );

    return new OpenSeadragon.Rect(0, 0, viewportSizeInViewportCoordinates.x, viewportSizeInViewportCoordinates.y);
  }

}
