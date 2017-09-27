
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
import { CalculateNextPageFactory } from './calculate-next-page-factory';
import { Point } from './../models/point';
import { ClickService } from '../click-service/click.service';
import { SearchResult } from './../models/search-result';
import { Rect } from './../models/rect';
import { SwipeDragEndCounter } from './swipe-drag-end-counter';


import '../ext/svg-overlay';
import '../../rxjs-extension';
import * as d3 from 'd3';

declare const OpenSeadragon: any;

@Injectable()
export class ViewerService implements OnInit {

  private viewer: any;
  private svgNode: any;
  private options: Options;

  private overlays: Array<SVGRectElement>;
  private tileSources: Array<Service>;
  private subscriptions: Array<Subscription> = [];

  public isCanvasPressed: Subject<boolean> = new Subject<boolean>();
  private swipeDragEndCounter = new SwipeDragEndCounter();
  private currentCenter: ReplaySubject<Point> = new ReplaySubject();
  private currentPageIndex: ReplaySubject<number> = new ReplaySubject();
  private dragStartPosition: any;
  private tileRects = new TileRects();

  constructor(
    private zone: NgZone,
    private clickService: ClickService,
    private pageService: PageService,
    private modeService: ModeService) { }

  ngOnInit(): void { }

  get onCenterChange(): Observable<Point> {
    return this.currentCenter.asObservable();
  }

  get onPageChange(): Observable<number> {
    return this.currentPageIndex.asObservable().distinctUntilChanged();
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

  public home(): void {
    const viewportCenter = this.getViewportCenter();
    const currentPageIndex = this.tileRects.findClosestIndex(viewportCenter);

    this.goToPage(currentPageIndex);
    this.goToHomeZoom();
    this.modeService.mode = ViewerMode.PAGE;
  }

  public goToPreviousPage(): void {
    const viewportCenter = this.getViewportCenter();
    const currentPageIndex = this.tileRects.findClosestIndex(viewportCenter);

    const calculateNextPageStrategy = CalculateNextPageFactory.create(null);
    const newPageIndex = calculateNextPageStrategy.calculateNextPage({
      direction: 'previous',
      currentPageIndex: currentPageIndex,
    });
    this.goToPage(newPageIndex);
  }

  public goToNextPage(): void {
    const viewportCenter = this.getViewportCenter();
    const currentPageIndex = this.tileRects.findClosestIndex(viewportCenter);

    const calculateNextPageStrategy = CalculateNextPageFactory.create(null);
    const newPageIndex = calculateNextPageStrategy.calculateNextPage({
      direction: 'next',
      currentPageIndex: currentPageIndex,
    });
    this.goToPage(newPageIndex);
  }

  public goToPage(pageIndex: number): void {
    if (!this.pageService.isWithinBounds(pageIndex)) {
      return;
    }

    this.pageService.currentPage = pageIndex;
    const newPageCenter = this.tileRects.get(pageIndex);
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      this.swipeDragEndCounter.reset();
      this.goToHomeZoom();
      setTimeout(() => {
        this.panTo(newPageCenter.centerX, newPageCenter.centerY);
        this.modeService.mode = ViewerMode.PAGE;
      }, ViewerOptions.transitions.OSDAnimationTime);
    } else {
      this.panTo(newPageCenter.centerX, newPageCenter.centerY);
    }
  }


  public highlight(searchResult: SearchResult): void {
    this.clearHightlight();
    if (this.viewer) {
      let svgOverlay = this.viewer.svgOverlay();
      this.svgNode = d3.select(svgOverlay.node());
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
    if (manifest.tileSource) {
      this.tileSources = manifest.tileSource;
      this.zone.runOutsideAngular(() => {
        this.clearOpenSeadragonTooltips();
        this.options = new Options();
        this.viewer = new OpenSeadragon.Viewer(Object.assign({}, this.options));
        this.pageService.reset();
        this.pageService.numberOfPages = this.tileSources.length;
      });

      this.subscriptions.push(this.modeService.onChange.subscribe((mode: ViewerMode) => {
        this.setSettings(mode);
      }));

      this.subscriptions.push(this.onCenterChange.throttle(val => Observable.interval(500)).subscribe((center: Point) => {
        this.calculateCurrentPage(center);
      }));

      this.addToWindow();
      this.createOverlays();
      this.addEvents();
    }
  }

  addToWindow() {
    window.openSeadragonViewer = this.viewer;
  }

  destroy() {
    if (this.viewer != null && this.viewer.isOpen()) {
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
    this.viewer.addHandler('canvas-click', this.clickService.click);
    this.viewer.addHandler('canvas-double-click', (e: any) => e.preventDefaultAction = true);
    this.viewer.addHandler('canvas-press', (e: any) => {
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


  zoomIn(dblClickZoom?: boolean): void {
    const zoomFactor = dblClickZoom ? ViewerOptions.zoom.dblClickZoomFactor : ViewerOptions.zoom.zoomFactor;
    if (this.modeService.mode !== ViewerMode.PAGE_ZOOMED) {
      this.modeService.mode = ViewerMode.PAGE_ZOOMED;
    }
    this.zoomTo(this.getZoom() + zoomFactor);
  }

  zoomOut(): void {
    if (this.isViewportLargerThanPage()) {
      this.toggleToPage();
    } else {
      this.zoomTo(this.getZoom() - ViewerOptions.zoom.zoomFactor);
    }
  }

  zoomInAtPoint(position: Point): void {
    position = this.viewer.viewport.pointFromPixel(position);
    if (this.modeService.mode !== ViewerMode.PAGE_ZOOMED) {
      this.modeService.mode = ViewerMode.PAGE_ZOOMED;
    }
    this.zoomTo(this.getZoom() + ViewerOptions.zoom.zoomFactor, position);
  }


  /**
   * Set settings for page/dashboard-mode
   * @param mode ViewerMode
   */
  setSettings(mode: ViewerMode) {
    if (mode === ViewerMode.DASHBOARD) {
      this.setDashboardSettings();
    } else if (mode === ViewerMode.PAGE) {
      this.setPageSettings();
    }
  }

  /**
   * Set settings for dashboard-mode
   */
  setDashboardSettings(): void {
    this.viewer.panVertical = false;
  }

  /**
   * Set settings for page-mode
   */
  setPageSettings(): void {
    this.viewer.panVertical = true;
  }

  /**
   * Switches to DASHBOARD-mode, repositions pages and removes max-width on viewer
   */
  toggleToDashboard(): void {
    if (!this.pageService.isCurrentPageValid()) {
      return;
    }
    this.modeService.mode = ViewerMode.DASHBOARD;
    this.fitBoundsInDashboardView();
  }

  /**
   * Switches to PAGE-mode, centers currentPage and repositions pages other pages
   */
  toggleToPage(): void {
    if (!this.pageService.isCurrentPageValid()) {
      return;
    }
    this.modeService.mode = ViewerMode.PAGE;
    this.fitBounds(this.overlays[this.pageService.currentPage]);
  }

  /**
   * Scroll-handler
   */
  scrollHandler = (e: any) => {
    const event = e.originalEvent;
    const delta = (event.wheelDelta) ? event.wheelDelta : -event.deltaY;
    // Scrolling up
    if (delta > 0) {
      this.zoomInGesture();
      // Scrolling down
    } else if (delta < 0) {
      this.zoomOutGesture();
    }
  }

  /**
   * Pinch-handler
  */
  pinchHandler = (e: any) => {
    // Pinch Out
    if (e.distance > e.lastDistance) {
      this.zoomInGesture(e.center);
      // Pinch In
    } else {
      this.zoomOutGesture();
    }
  }

  /**
   *
   * @param {Point} point to zoom to. If not set, the viewer will zoom to center
   */
  zoomInGesture(position?: Point): void {
    if (this.modeService.mode === ViewerMode.DASHBOARD) {
      this.toggleToPage();
    } else {
      if (position) {
        this.zoomInAtPoint(position);
      } else {
        this.zoomIn();
      }
    }
  }

  zoomOutGesture(): void {
    if (this.modeService.mode === ViewerMode.PAGE || this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      if (this.isViewportLargerThanPage()) {
        this.toggleToDashboard();
      } else {
        this.zoomOut();
      }
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
    this.modeService.mode === ViewerMode.PAGE ? this.toggleToPage() : this.toggleToDashboard();
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
      this.zoomIn(true);
    } else {
      this.modeService.mode = ViewerMode.PAGE;
      const requestedPage: number = this.getOverlayIndexFromClickEvent(target);
      if (requestedPage >= 0) {
        this.pageService.currentPage = requestedPage;
      }
      this.toggleToPage();
    }
  }

  isViewportLargerThanPage(): boolean {
    const pageBounds = this.createRectangle(this.overlays[this.pageService.currentPage]);
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
    const svgOverlay = this.viewer.svgOverlay();
    this.svgNode = d3.select(svgOverlay.node());

    let center = new OpenSeadragon.Point(0, 0);
    let currentX = center.x - (this.tileSources[0].width / 2);
    let height = this.tileSources[0].height;

    const initialPage = 0;

    this.tileSources.forEach((tile, i) => {

      if (tile.height !== height) {
        let heightChangeRatio = height / tile.height;
        tile.height = height;
        tile.width = Math.round(heightChangeRatio * tile.width);
      }

      let currentY = center.y - tile.height / 2;
      this.zone.runOutsideAngular(() => {
        this.viewer.addTiledImage({
          index: i,
          tileSource: tile,
          height: tile.height,
          x: currentX,
          y: currentY,
          success: i === initialPage ? (e: any) => {
            e.item.addOnceHandler('fully-loaded-change', () => { this.initialPageLoaded(); });
          } : ''
        });
      });

      // Style overlay to match tile
      this.svgNode.append('rect')
        .attr('x', currentX)
        .attr('y', currentY)
        .attr('width', tile.width)
        .attr('height', tile.height)
        .attr('class', 'tile');

      const currentOverlay: SVGRectElement = this.svgNode.node().childNodes[i];
      this.overlays.push(currentOverlay);

      this.tileRects.add(new Rect({
        x: currentX,
        y: currentY,
        width: tile.width,
        height: tile.height
      }));

      currentX = currentX + tile.width + ViewerOptions.overlays.pageMarginDashboardView;
    });
  }

  /**
   * Sets viewer size and opacity once the first page has fully loaded
   */
  initialPageLoaded = (): void => {
    d3.select(this.viewer.container.parentNode).transition().duration(ViewerOptions.transitions.OSDAnimationTime).style('opacity', '1');
  }

  /**
   * Fit viewport bounds to an overlay
   * @param {SVGRectElement} overlay
   */
  fitBounds(overlay: SVGRectElement): void {
    this.viewer.viewport.fitBounds(this.createRectangle(overlay));
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
    const currentPageIndex = this.tileRects.findClosestIndex(center);
    this.currentPageIndex.next(currentPageIndex);
  }

  private getViewportCenter(): Point {
    return this.viewer.viewport.getCenter(true);
  }

  private dragHandler = (e: any) => {
    this.viewer.panHorizontal = true;
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      const dragEndPosision = e.position;
      const pageBounds = this.createRectangle(this.overlays[this.pageService.currentPage]);
      const vpBounds = this.viewer.viewport.getBounds();
      const pannedPastSide = SwipeUtils.getSideIfPanningPastEndOfPage(pageBounds, vpBounds);
      const direction = SwipeUtils.getZoomedInSwipeDirection(
        this.dragStartPosition.x,
        dragEndPosision.x,
        this.dragStartPosition.y,
        dragEndPosision.y
      );
      if (
        (pannedPastSide === 'left' && direction === 'right') ||
        (pannedPastSide === 'right' && direction === 'left')
      ) {
        this.viewer.panHorizontal = false;
      }
    }
  }

  private swipeToPage(e: any) {

    const speed: number = e.speed;
    const dragEndPosision = e.position;

    const pageBounds = this.createRectangle(this.overlays[this.pageService.currentPage]);
    const viewportBounds = this.viewer.viewport.getBounds();

    const direction = SwipeUtils.getSwipeDirection(this.dragStartPosition.x, dragEndPosision.x);
    const viewportCenter = this.getViewportCenter();

    const currentPageIndex = this.pageService.currentPage;
    const isPanningPastCenter = SwipeUtils.isPanningPastCenter(pageBounds, viewportBounds);
    const calculateNextPageStrategy = CalculateNextPageFactory.create(this.modeService.mode);

    let pannedPastSide: string, pageEndHitCountReached: boolean;

    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      pannedPastSide = SwipeUtils.getSideIfPanningPastEndOfPage(pageBounds, viewportBounds);
      this.swipeDragEndCounter.addHit(pannedPastSide);
      pageEndHitCountReached = this.swipeDragEndCounter.hitCountReached();
    }

    const newPageIndex = calculateNextPageStrategy.calculateNextPage({
      isPastCenter: isPanningPastCenter,
      speed: speed,
      direction: direction,
      currentPageIndex: currentPageIndex,
      pageEndHitCountReached: pageEndHitCountReached
    });
    if (
      this.modeService.mode === ViewerMode.DASHBOARD ||
      this.modeService.mode === ViewerMode.PAGE ||
      pageEndHitCountReached
    ) {
      this.goToPage(newPageIndex);
    }

  }

  private panTo(x: number, y: number): void {
    this.viewer.viewport.panTo({
      x: x,
      y: y
    }, false);
  }



  private fitBoundsInDashboardView(): void {
    if (!this.viewer || !this.overlays) {
      return;
    }

    const container = d3.select(this.viewer.container.parentNode);

    const maxViewportDimensions = new Dimensions(d3.select(this.viewer.container.parentNode.parentNode).node().getBoundingClientRect());
    const viewportHeight = maxViewportDimensions.height - ViewerOptions.padding.header - ViewerOptions.padding.footer;
    const viewportWidth = maxViewportDimensions.width;

    const viewportSizeInViewportCoordinates =
      this.viewer.viewport.deltaPointsFromPixels(
        new OpenSeadragon.Point(viewportWidth, viewportHeight)
      );
    const viewportBounds = new OpenSeadragon.Rect(0, 0, viewportSizeInViewportCoordinates.x, viewportSizeInViewportCoordinates.y);

    this.goToHomeZoom(viewportBounds);
  }


  private goToHomeZoom(viewportBounds?: any): void {
    this.viewer.viewport.zoomTo(this.getHomeZoom(viewportBounds), false);
  }

  private getHomeZoom(viewportBounds?: any, pageBounds?: any): number {

    if (!viewportBounds) {
      viewportBounds = this.viewer.viewport.getBounds();
    }

    if (!pageBounds) {
      pageBounds = this.createRectangle(this.overlays[this.pageService.currentPage]);
    }

    const currentZoom: number = this.viewer.viewport.getZoom();
    const resizeRatio: number = viewportBounds.height / pageBounds.height;

    if (resizeRatio * pageBounds.width <= viewportBounds.width) {
      return this.shortenDecimals(resizeRatio * currentZoom, 5);
    } else {
      // Page at full height is wider than viewport.  Return fit by width instead.
      return this.shortenDecimals(viewportBounds.width / pageBounds.width * currentZoom, 5);
    }
  }

}
