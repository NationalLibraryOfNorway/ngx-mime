import { Subject } from 'rxjs/Rx';
import { OptionsTransitions } from '../models/options-transitions';
import { OptionsOverlays } from '../models/options-overlays';
import { Injectable, NgZone, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ModeService } from '../../core/mode-service/mode.service';
import { Manifest, Service } from '../models/manifest';
import { Options } from '../models/options';
import { PageService } from '../page-service/page-service';
import { ViewerMode } from '../models/viewer-mode';
import { ClickService } from '../click/click.service';
import { MimeResizeService } from '../mime-resize-service/mime-resize.service';
import '../ext/svg-overlay';
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

  public isCurrentPageFittedViewport = false;
  public isCanvasPressed: Subject<boolean> = new Subject<boolean>();


  //TODO: Refactor to use Page Service instead
  private currentPage = 0;

  private horizontalPadding: number = 0;

  constructor(
    private zone: NgZone,
    private clickService: ClickService,
    private pageService: PageService,
    private modeService: ModeService,
    private mimeResizeService: MimeResizeService
  ) { }

  ngOnInit(): void { }

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

  public getHomeZoom(): number {
    return this.shortenDecimals(this.viewer.viewport.getHomeZoom(), 5);
  }

  public getMinZoom(): number {
    return this.shortenDecimals(this.viewer.viewport.getMinZoom(), 5);
  }

  public getMaxZoom(): number {
    return this.shortenDecimals(this.viewer.viewport.getMaxZoom(), 5);
  }

  public zoomHome(): void {
    this.zoomTo(this.getHomeZoom());
  }

  public zoomTo(level: number): void {
    this.viewer.viewport.zoomTo(level);
  }

  setUpViewer(manifest: Manifest) {
    if (manifest.tileSource) {
      this.tileSources = manifest.tileSource;
      this.zone.runOutsideAngular(() => {
        this.clearOpenSeadragonTooltips();
        this.options = new Options(manifest.tileSource);
        this.viewer = new OpenSeadragon.Viewer(Object.assign({}, this.options));
        this.pageService.reset();
        this.pageService.numberOfPages = this.tileSources.length;
      });

      this.subscriptions.push(this.modeService.onChange.subscribe((mode: ViewerMode) => {
        this.setSettings(mode);
      }));

      this.addToWindow();
      this.createOverlays();
      this.addEvents();

      //TODO: Add only in page mode?
      this.subscriptions.push(this.mimeResizeService.onResize.subscribe(() => {
        this.applicationResize();
      }));
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
  }

  addEvents(): void {
    this.addOverrides();
    this.clickService.reset();
    this.clickService.addSingleClickHandler(this.singleClickHandler);
    this.clickService.addDoubleClickHandler(this.dblClickHandler);
    this.viewer.addHandler('animation-finish', this.animationsEndCallback);
    this.viewer.addHandler('canvas-click', this.clickService.click);
    this.viewer.addHandler('canvas-double-click', (e: any) => e.preventDefaultAction = true);
    this.viewer.addHandler('canvas-press', () => this.isCanvasPressed.next(true));
    this.viewer.addHandler('canvas-release', () => this.isCanvasPressed.next(false));
    this.viewer.addHandler('canvas-scroll', this.scrollToggleMode);
    this.viewer.addHandler('canvas-pinch', this.pinchToggleMode);
    this.viewer.addHandler('canvas-drag-end', this.dragEndHandler);
  }

  dragEndHandler(): void {
    //TODO: Don't center page if zoomed in
    this.updateCurrentPage();
    this.panToPage(this.currentPage);
  }

  /**
   * Overrides for default OSD-functions
   */
  addOverrides(): void {
    // Raised when viewer loads first time
    this.viewer.viewport.goHome = () => {
      this.viewer.raiseEvent('home');
      this.modeService.initialMode === ViewerMode.DASHBOARD ? this.toggleToDashboard() : this.toggleToPage();
    };
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
    this.viewer.gestureSettingsTouch.pinchToZoom = false;
    this.viewer.gestureSettingsMouse.scrollToZoom = false;
  }

  /**
   * Set settings for page-mode
   */
  setPageSettings(): void {
    // TODO: Allow panning when zoomed in on Page View
    //this.viewer.panVertical = true;

    setTimeout(() => {
      this.viewer.gestureSettingsTouch.pinchToZoom = true;
      this.viewer.gestureSettingsMouse.scrollToZoom = true;
    }, 300);
  }

  /**
   * Switches to DASHBOARD-mode and fit bounds to dashboard home
   */
  toggleToDashboard(): void {
    this.modeService.mode = ViewerMode.DASHBOARD;
    this.positionTilesInDashboardView(this.pageService.currentPage);
    //this.zoomTo(this.getHomeZoom());
  }

  /**
   * Switches to PAGE-mode and fits bounds to current page
   */
  toggleToPage(): void {
    if (!this.pageService.isCurrentPageValid()) {
      return;
    }
    this.modeService.mode = ViewerMode.PAGE;
    this.positionTilesInSinglePageView(this.pageService.currentPage);
    //this.fitBounds(this.overlays[this.pageService.currentPage]);
  }

  /**
   * Scroll-toggle-handler
   * Scroll-up dashboard-mode: Toggle page-mode
   * Scroll-down page-mode: Toggle dashboard-mode if page is at min-zoom
   */
  scrollToggleMode = (e: any) => {
    let event = e.originalEvent;
    let delta = (event.wheelDelta) ? event.wheelDelta : -event.deltaY;

    // Scrolling up
    if (delta > 0) {
      if (this.modeService.mode === ViewerMode.DASHBOARD) {
        this.toggleToPage();
      }
      // Scrolling down
    } else if (delta < 0) {
      if (this.modeService.mode === ViewerMode.PAGE && this.pageIsAtMinZoom()) {
        this.toggleToDashboard();
      }
    }
  }

  /**
   * Pinch-toggle-handler
   * Pinch-out dashboard-mode: Toggles page-mode
   * Pinch-in page-mode: Toggles dashboard-mode if page is at min-zoom
   */
  pinchToggleMode = (event: any) => {

    // Pinch Out
    if (event.distance > event.lastDistance) {
      if (this.modeService.mode === ViewerMode.DASHBOARD) {
        this.toggleToPage();
      }
      // Pinch In
    } else {
      if (this.modeService.mode === ViewerMode.PAGE && this.pageIsAtMinZoom()) {
        this.toggleToDashboard();
      }
    }
  }

  /**
   * Adds single-click-handler
   * Single-click toggles between page/dashboard-mode if a page is hit
   */
  singleClickHandler = (event: any) => {
    let target = event.originalEvent.target;
    let requestedPage = this.getOverlayIndexFromClickEvent(target);
    if (this.isPageHit(target)) {
      this.pageService.currentPage = requestedPage;
      this.modeService.toggleMode();
      this.modeService.mode === ViewerMode.PAGE ? this.toggleToPage() : this.toggleToDashboard();
    }
  }

  /**
   * Double-click-handler
   * Double-click dashboard-mode should go to page-mode
   * Double-click page-mode should
   *    a) Zoom in if page is fitted vertically, or
   *    b) Fit vertically if page is already zoomed in
   */
  dblClickHandler = (event: any) => {
    let target = event.originalEvent.target;
    // Page is fitted vertically, so dbl-click zooms in
    if (this.isCurrentPageFittedViewport) {
      this.zoomTo(this.getZoom() * this.options.zoomPerClick);
    } else {
      let requestedPage = this.getOverlayIndexFromClickEvent(target);
      if (this.isPageHit(target)) {
        this.pageService.currentPage = requestedPage;
        this.toggleToPage();
      }
    }
  }

  /**
   * Called each time an animation ends
   */
  animationsEndCallback = () => {
    this.isCurrentPageFittedViewport = this.getIsCurrentPageFittedViewport();
  }

  /**
   * Checks whether current page's overlay bounds has a larger height than the viewport bounds
   * If the heights are equal, then this page is fitted vertically in the viewer
   * (Note that this function is called after animation is ended for correct calculation)
   */
  getIsCurrentPageFittedViewport(): boolean {
    const pageBounds = this.createRectangle(this.overlays[this.pageService.currentPage]);
    const viewportBounds = this.viewer.viewport.getBounds();

    return (Math.round(pageBounds.y) === Math.round(viewportBounds.y))
      || (Math.round(pageBounds.x) === Math.round(viewportBounds.x));
  }

  pageIsAtMinZoom(): boolean {
    const pageBounds = this.createRectangle(this.overlays[this.pageService.currentPage]);
    const viewportBounds = this.viewer.viewport.getBounds();

    return (Math.round(pageBounds.y) >= Math.round(viewportBounds.y))
      || (Math.round(pageBounds.x) >= Math.round(viewportBounds.x))

  }

  /**
   * Checks if hit element is a <rect>-element
   * @param target
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
    let svgOverlay = this.viewer.svgOverlay();
    this.svgNode = d3.select(svgOverlay.node());

    let center = new OpenSeadragon.Point(0, 0);
    let currentX = center.x - (this.tileSources[0].width / 2);
    let height = this.tileSources[0].height;


    this.tileSources.forEach((tile, i) => {

      //TODO: Logic for tiles wider and shorter than the viewport
      if (tile.height != height) {
        let heightChangeRatio = height / tile.height;
        tile.height = height;
        tile.width = heightChangeRatio * tile.width;
      }

      let currentY = center.y - tile.height / 2;
      this.viewer.addTiledImage({
        index: i,
        tileSource: tile,
        height: tile.height,
        x: currentX,
        y: currentY
      });

      // Style overlay to match tile
      this.svgNode.append('rect')
        .attr('x', currentX)
        .attr('y', currentY)
        .attr('width', tile.width)
        .attr('height', tile.height)
        .attr('class', 'tile');
      let currentOverlay: SVGRectElement = this.svgNode.node().childNodes[i];
      this.overlays.push(currentOverlay);
      currentX = currentX + tile.width + OptionsOverlays.TILES_MARGIN;
    });
  }

  /**
   * Fit bounds to first page
   */
  fitBoundsToStart(): void {
    // Don't need to fit bounds if pages < 3
    if (this.overlays.length < 3) {
      return;
    }
    let firstpageDashboardBounds = this.viewer.viewport.getBounds();
    firstpageDashboardBounds.x = 0;
    this.viewer.viewport.fitBounds(firstpageDashboardBounds);
  }

  /**
   * Fit viewport bounds to an overlay
   * @param overlay
   */
  fitBounds(overlay: SVGRectElement): void {
    //this.viewer.viewport.fitBounds(this.createRectangle(overlay));
  }

  /**
   * Returns an OpenSeadragon.Rectangle instance of an overlay
   * @param overlay
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
      let requestedPage = this.overlays.indexOf(target);
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

  private shortenDecimals(zoom: string, precision: number): number {
    const short = Number(zoom).toPrecision(precision);
    return Number(short);
  }

  private positionTilesInSinglePageView(requestedPageIndex: number): void {

    let requestedPage = this.viewer.world.getItemAt(requestedPageIndex);
    if (!requestedPage) {
      return;
    }

    //First centre the page
    //TODO: Refactor to own method
    let requestedPageBounds = requestedPage.getBounds(true);
    let viewport = this.viewer.viewport;
    let pageCenter = new OpenSeadragon.Point(requestedPageBounds.x + (requestedPageBounds.width / 2), requestedPageBounds.y + (requestedPageBounds.height / 2));
    viewport.panTo(pageCenter, false);

    //Zoom viewport to fit new top/bottom padding
    //TODO: Configurable padding
    let resizeRatio = this.getViewportHeightChangeRatio(viewport, 160, 0);
    this.animateZoom(viewport, resizeRatio, 200);

    //Add left/right padding to OpenSeadragon to hide previous/next pages
    //TODO: Add logic for pages wider and shorter than the viewport
    //TODO: Adjust padding on window resize
    //TODO: Adjust padding on zoom
    //TODO: Configurable padding for header/footer
    let rootNode = d3.select(this.viewer.container.parentNode);
    let newPageBounds = this.getResizedRectangle(this.getCenteredRectangle(requestedPageBounds, viewport.getCenter(true)), resizeRatio);
    this.padViewportContainerToFitTile(viewport, newPageBounds, rootNode);

    //TODO: Something better than a timeout function
    setTimeout(() => {
      //Update position of previous/next tiles
      //TODO: Configurable margin
      this.positionPreviousTiles(requestedPageIndex, requestedPageBounds, 20);
      this.positionNextTiles(requestedPageIndex, requestedPageBounds, 20);
    }, 500);

  }

  //TODO: Refactoring
  private animateZoom(viewport: any, resizeRatio: number, milliseconds: number): void {
    let iterations = 10;

    let currentZoom = viewport.getZoom();
    let zoomIncrement = (currentZoom * (resizeRatio - 1)) / iterations;
    let timeIncrement = milliseconds / iterations;

    this.incrementZoom(viewport, currentZoom, zoomIncrement, timeIncrement, 1, iterations);
  }

  //TODO: Refactoring
  private incrementZoom(viewport: any, currentZoom: number, zoomIncrement: number, timeIncrement: number, i: number, iterations: number) {
    if (i > iterations) {
      return;
    }
    i = i + 1;

    setTimeout(() => {

      let viewportZoom = viewport.getZoom();
      if (currentZoom != viewportZoom)
      {
        zoomIncrement = viewportZoom / currentZoom * zoomIncrement;
        currentZoom = viewportZoom;
      }
      currentZoom = currentZoom + zoomIncrement;
      viewport.zoomTo(currentZoom, null, false);

      this.incrementZoom(viewport, currentZoom, zoomIncrement, timeIncrement, i, iterations);
    }, timeIncrement);
  }

  private getViewportHeightChangeRatio(viewport: any, verticalPadding: number, newVerticalPadding: number): number {

    let paddingVector = new OpenSeadragon.Point(0, verticalPadding - newVerticalPadding);
    let paddingInViewportCoordinates = viewport.deltaPointsFromPixels(paddingVector);

    let height = viewport.getBounds(true).height;
    let newHeight = height + paddingInViewportCoordinates.y;
    let resizeRatio = newHeight / height;

    return resizeRatio;
  }

  private getResizedRectangle(rectangle: any, resizeRatio: number): any {
    return new OpenSeadragon.Rect(
      (rectangle.x + (rectangle.width / 2)) - ((rectangle.width * resizeRatio) / 2),
      (rectangle.y + (rectangle.height / 2)) - ((rectangle.height * resizeRatio) / 2),
      rectangle.width * resizeRatio,
      rectangle.height * resizeRatio
    );
  }

  private getCenteredRectangle(rectangle: any, viewportCenter: any): any {
    return new OpenSeadragon.Rect(
      viewportCenter.x - (rectangle.width / 2),
      viewportCenter.y - (rectangle.height / 2),
      rectangle.width,
      rectangle.height
    );
  }

  //TODO: Individual logic for top, bottom, left and right (current only supports equal left/right and 0 top/bottom)
  private padViewportContainerToFitTile(viewport: any, tileBounds: any, container: any): void {

    let viewportBounds = viewport.getBounds(true);
    let tileLeftCoordinates = viewport.viewportToWindowCoordinates(new OpenSeadragon.Point(tileBounds.x, 0));
    let viewerLeftCoordinates = viewport.viewportToWindowCoordinates(new OpenSeadragon.Point(viewportBounds.x, 0));
    let paddingInPixels = Math.round(tileLeftCoordinates.x - viewerLeftCoordinates.x);

    this.horizontalPadding = this.horizontalPadding + paddingInPixels;
    container.style('padding','0 ' + this.horizontalPadding + 'px');
  }

  private positionTilesInDashboardView(requestedPageIndex: number): void{
    let requestedPage = this.viewer.world.getItemAt(requestedPageIndex);
    if (!requestedPage) {
      return;
    }

    //Update position of previous/next tiles
    let requestedPageBounds = requestedPage.getBounds(true);
    this.positionPreviousTiles(requestedPageIndex, requestedPageBounds, OptionsOverlays.TILES_MARGIN);
    this.positionNextTiles(requestedPageIndex, requestedPageBounds, OptionsOverlays.TILES_MARGIN);

    //Zoom viewport to fit new top/bottom padding
    //TODO: Configurable padding
    let viewport = this.viewer.viewport;
    let resizeRatio = this.getViewportHeightChangeRatio(viewport, 0, 160);
    this.animateZoom(viewport, resizeRatio, 200);


    //TODO: Something better than a timeout function
    setTimeout(() => {
      //TODO: Configurable padding for header/footer
      let rootNode = d3.select(this.viewer.container.parentNode);
      rootNode.style('padding', '80px 0');
      this.horizontalPadding = 0;
    }, 500);

  }

  //Recursive function to iterate through previous pages and position them to the left of the current page
  private positionPreviousTiles(currentTileIndex: number, currentTileBounds: any, margin: number): void {
    let previousTiledImage = this.viewer.world.getItemAt(currentTileIndex - 1);
    if (!previousTiledImage) {
      return;
    }

    let previousTileBounds = previousTiledImage.getBounds(true);

    //Position tiled image
    previousTileBounds.x = currentTileBounds.x - previousTileBounds.width - margin;
    previousTileBounds.y = currentTileBounds.y;
    previousTiledImage.setPosition(new OpenSeadragon.Point(previousTileBounds.x, previousTileBounds.y), true);
    previousTiledImage.update();

    //Position overlay
    //TODO: Update x and y base values in this.overlays[]
    let previousOverlay = this.overlays[currentTileIndex - 1];
    let previousSvgNode = d3.select(previousOverlay);
    previousSvgNode.attr('x', previousTileBounds.x)
      .attr('y', previousTileBounds.y);

    //Call function for previous tile
    this.positionPreviousTiles(currentTileIndex - 1, previousTileBounds, margin);
  }

  //Recursive function to iterate through next pages and position them to the right of the current page
  private positionNextTiles(currentTileIndex: number, currentTileBounds: any, margin: number): void {
    let nextTiledImage = this.viewer.world.getItemAt(currentTileIndex + 1);
    if (!nextTiledImage) {
      return;
    }

    let nextTileBounds = nextTiledImage.getBounds(true);

    //Position tiled image
    nextTileBounds.x = currentTileBounds.x + currentTileBounds.width + margin;
    nextTileBounds.y = currentTileBounds.y;
    nextTiledImage.setPosition(new OpenSeadragon.Point(nextTileBounds.x, nextTileBounds.y), true);
    nextTiledImage.update();

    //Position overlay
    //TODO: Update x and y base values in this.overlays[]
    let nextOverlay = this.overlays[currentTileIndex + 1];
    let nextSvgNode = d3.select(nextOverlay);
    nextSvgNode.attr('x', nextTileBounds.x)
      .attr('y', nextTileBounds.y);

    //Call function for next tile
    this.positionNextTiles(currentTileIndex + 1, nextTileBounds, margin);
  }

  private panToPage(pageIndex: number): void {
    let page = this.viewer.world.getItemAt(pageIndex);
    let pageBounds = page.getBounds(true);

    let center = new OpenSeadragon.Point(pageBounds.x + (pageBounds.width / 2), pageBounds.y + (pageBounds.height / 2));
    this.viewer.viewport.panTo(center, false);

    if (this.modeService.mode === ViewerMode.PAGE) {
      //TODO: Something better than a timeout function
      setTimeout(() => {
        this.padViewportContainerToFitTile(this.viewer.viewport, pageBounds, d3.select(this.viewer.container.parentNode));
      }, 500);
    }
  }

  //TODO: Move this method to page service
  private updateCurrentPage(): void {
    let viewportBounds = this.viewer.viewport.getBounds();
    let centerX = viewportBounds.x + (viewportBounds.width / 2);

    //TODO: Is it faster to iterate through tiles, svg nodes or overlays[]?
    this.tileSources.some((tile, i) => {
      let tiledImage = this.viewer.world.getItemAt(i);
      if (!tiledImage) {
        return;
      }

      let tileBounds = tiledImage.getBounds(true);
      if (tileBounds.x + tileBounds.width > centerX) {

        if(tileBounds.x < centerX) {
          //Center point is within tile bounds
          this.currentPage = i;
        }
        else {
          //No use case before first page as OpenSeadragon prevents it by default

          //Centre point is between two tiles
          let previousTileBounds = this.viewer.world.getItemAt(i-1).getBounds();
          let marginLeft = previousTileBounds.x + previousTileBounds.width;
          let marginCentre = marginLeft + ((tileBounds.x - marginLeft) / 2 );

          if (centerX > marginCentre) {
            this.currentPage = i;
          }
          else {
            this.currentPage = i - 1;
          }
        }

        return true;
      }
      //No use case beyond last page as OpenSeadragon prevents it by default

    });
  }

  private applicationResize(): void {
    //TODO: Limit how often this runs
    if (this.modeService.mode === ViewerMode.PAGE) {
      //TODO: Something better than a timeout function
      //TODO: Error handling
      setTimeout(() => {
        let pageBounds = this.viewer.world.getItemAt(this.currentPage).getBounds();
        this.padViewportContainerToFitTile(this.viewer.viewport, pageBounds, d3.select(this.viewer.container.parentNode));
      }, 500);
    }
  }
}
