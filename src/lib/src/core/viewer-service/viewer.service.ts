import { OptionsTransitions } from '../models/options-transitions';
import { OptionsOverlays } from '../models/options-overlays';
import { Injectable, NgZone, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ModeService } from '../../core/mode-service/mode.service';
import { Manifest } from '../models/manifest';
import { Options } from '../models/options';
import { PageService } from '../page-service/page-service';
import { ViewerMode } from '../models/viewer-mode';
import { ClickService } from '../click/click.service';
import '../ext/svg-overlay';
import * as d3 from 'd3';

declare const OpenSeadragon: any;

@Injectable()
export class ViewerService implements OnInit {

  private viewer: any;
  private options: Options;

  private overlays: Array<HTMLElement>;
  private svgNode: any;
  private tileSources: any[];

  private subscriptions: Array<Subscription> = [];

  private isCurrentPageFittedVertically = false;

  //TODO: Refactor to use Page Service instead
  private currentPage = 0;

  constructor(
    private zone: NgZone,
    private clickService: ClickService,
    private pageService: PageService,
    private modeService: ModeService) { }

  ngOnInit(): void { }

  setUpViewer(manifest: Manifest) {
    if (manifest.tileSource) {
      this.tileSources = manifest.tileSource;
      this.zone.runOutsideAngular(() => {
        this.clearOpenSeadragonTooltips();
        this.options = new Options(this.modeService.mode, manifest.tileSource)
        this.viewer = new OpenSeadragon.Viewer(Object.assign({}, this.options));
      });

      this.subscriptions.push(this.modeService.onChange.subscribe((mode: ViewerMode) => {
        this.toggleMode(mode);
      }));

      this.addToWindow();
      this.addEvents();
      this.createOverlays();
      this.fitBoundsToStart();
    }
  }

  getViewer() {
    return this.viewer;
  }

  getTilesources() {
    return this.tileSources;
  }

  getOverlays() {
    return this.overlays;
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
    this.addOpenEvents();
    this.addClickEvents();
    this.addPinchEvents();
    this.addAnimationEvents();
    this.addDragEvents();
  }

  addOpenEvents(): void {
    this.viewer.addHandler('open', (data: any) => {
    });
  }

  addAnimationEvents(): void {
    this.viewer.addHandler('animation-finish', this.animationsEndCallback);
  }

  addDragEvents(): void {
    //Event handler to update and center current page
    //TODO: Don't center page if zoomed in
    this.viewer.addHandler('canvas-drag-end', (event: any) => {
      this.updateCurrentPage();
      this.panToPage(this.currentPage);
    });
  }

  toggleMode(mode: ViewerMode) {
    if (mode === ViewerMode.DASHBOARD) {
      this.positionTilesInDashboardView(this.pageService.currentPage);
      this.setDashboardSettings();
      this.viewer.gestureSettingsTouch.pinchToZoom = false;
    } else if (mode === ViewerMode.PAGE) {
      this.positionTilesInSinglePageView(this.pageService.currentPage);
      this.setPageSettings();
      setTimeout(() => {
        this.viewer.gestureSettingsTouch.pinchToZoom = true;
      }, 300);
    }
  }

  setDashboardSettings(): void {
    this.viewer.panVertical = false;
  }

  setPageSettings(): void {
    // TODO: Allow panning when zoomed in on Page View
    //this.viewer.panVertical = true;
  }

  addClickEvents(): void {
    this.addSingleClickEvents();
    this.addDblClickEvents();
    this.viewer.addHandler('canvas-click', this.clickService.click);
    this.viewer.addHandler('canvas-double-click', (event: any) => {
      event.preventDefaultAction = true;
    });
  }

  addSingleClickEvents(): void {
    this.clickService.reset();
    this.clickService.addSingleClickHandler((event: any) => {
      let target: HTMLElement = event.originalEvent.target;
      let requestedPage = this.getOverlayIndexFromClickEvent(target);
      if (this.isPageHit(target)) {
        this.pageService.currentPage = requestedPage;
        this.modeService.toggleMode();
        this.fitBounds(target);
      }
    });
  }

  isPageHit(target: HTMLElement): boolean {
    return target.nodeName === 'rect';
  }


  addDblClickEvents(): void {
    this.clickService.addDoubleClickHandler((event) => {
      let target: HTMLElement = event.originalEvent.target;
      // Page is fitted vertically, so dbl-click zooms in
      if (this.isCurrentPageFittedVertically) {
        this.zoomTo(this.getZoom() * this.options.zoomPerClick);
      } else {
        let requestedPage = this.getOverlayIndexFromClickEvent(target);
        if (this.isPageHit) {
          this.modeService.mode = ViewerMode.PAGE;
          this.pageService.currentPage = requestedPage;
          this.fitBounds(target);
        }
      }
    });
  }

  animationsEndCallback = () => {
    this.setisCurrentPageFittedVertically();
  }

  setisCurrentPageFittedVertically(): void {
    let svgNodeHeight = Math.round(this.svgNode.node().parentNode.getBoundingClientRect().height);
    let currentOverlayHeight = Math.round(this.overlays[this.pageService.currentPage].getBoundingClientRect().height);
    this.isCurrentPageFittedVertically = svgNodeHeight === currentOverlayHeight;
  }

  pageIsAtMinZoom(): boolean {
    let svgNodeHeight = Math.round(this.svgNode.node().parentNode.getBoundingClientRect().height);
    let currentOverlayHeight = Math.round(this.overlays[this.pageService.currentPage].getBoundingClientRect().height);
    return svgNodeHeight >= currentOverlayHeight;
  }

  addPinchEvents(): void {
    this.viewer.addHandler('canvas-pinch', this.pinchHandlerDashboard);
  }

  pinchHandlerDashboard = (event: any) => {
    // Pinch Out
    if (event.distance > event.lastDistance) {
      if (this.modeService.mode === ViewerMode.DASHBOARD) {
        this.modeService.toggleMode();
        this.fitBounds(this.overlays[this.pageService.currentPage]);
      }
    // Pinch In
    } else if (this.modeService.mode === ViewerMode.PAGE && this.pageIsAtMinZoom()) {
        this.modeService.toggleMode();
        this.zoomTo(this.getHomeZoom());
    }
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

  public getPageCount(): number {
    if (this.tileSources) {
      return this.tileSources.length;
    }
  }

  // TODO move padding and calculations to config
  createOverlays(): void {
    this.overlays = [];
    let svgOverlay = this.viewer.svgOverlay();
    this.svgNode = d3.select(svgOverlay.node());

    let center = new OpenSeadragon.Point(0, 0);
    let currentX = center.x - (this.tileSources[0].width / 2);

    this.tileSources.forEach((tile, i) => {
      let currentY = center.y - tile.height / 2;
      this.viewer.addTiledImage({
        index: i,
        tileSource: tile,
        height: tile.height,
        x: currentX,
        y: currentY
      });

      this.svgNode.append('rect')
        .attr('x', currentX)
        .attr('y', currentY)
        .attr('width', tile.width)
        .attr('height', tile.height)
        .attr('class', 'tile');

      let currentOverlay: HTMLElement = this.svgNode.node().children[i];
      this.overlays.push(currentOverlay);

      currentX = currentX + tile.width + OptionsOverlays.TILES_MARGIN;
    });
  }


  fitBoundsToStart(): void {
    // Don't need to fit bounds if pages < 3
    if (this.overlays.length < 3) {
      return;
    }
    let firstpageDashboardBounds = this.viewer.viewport.getBounds();
    firstpageDashboardBounds.x = 0;
    this.viewer.viewport.fitBounds(firstpageDashboardBounds);
  }

  fitBoundsToPage(page: number): void {
    if (page < 0) {
      return;
    }
    let box = this.overlays[page];
    let pageBounds = this.createRectangel(box);
    this.viewer.viewport.fitBounds(pageBounds);

  }

  /**
   * Toggle viewport-bounds between page and dashboard
   * This function assumes ViewerMode is set before being called
   * @param currentOverlay
   */
  fitBounds(currentOverlay: any): void {
    if (this.modeService.mode === ViewerMode.DASHBOARD) {
      let dashboardBounds = this.viewer.viewport.getBounds();
      this.viewer.viewport.fitBounds(dashboardBounds);
      // Also need to zoom out to defaultZoomLevel for dashboard-view after bounds are fitted...
      this.viewer.viewport.zoomTo(this.options.defaultZoomLevel);
    } else if (this.modeService.mode === ViewerMode.PAGE) {
      let pageBounds = this.createRectangel(currentOverlay);
      //this.viewer.viewport.fitBounds(pageBounds);
    }
  }

  createRectangel(overlay: any): any {
    return new OpenSeadragon.Rect(
      overlay.x.baseVal.value,
      overlay.y.baseVal.value,
      overlay.width.baseVal.value,
      overlay.height.baseVal.value
    );
  }


  getOverlayIndexFromClickEvent(target: HTMLElement) {
    if (this.isPageHit(target)) {
      let requestedPage = this.overlays.indexOf(target);
      if (requestedPage >= 0) {
        return requestedPage;
      }
    }
    return -1;
  }

  public fitVertically(): void {
    this.viewer.viewport.fitVertically(false);
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
    //First centre the page
    this.panToPage(requestedPageIndex);
    
    let requestedPage = this.viewer.world.getItemAt(requestedPageIndex);
    if (!requestedPage) {
      return;
    }

    //Add left/right padding to OpenSeadragon to hide previous/next pages
    let requestedPageBounds = requestedPage.getBounds(true);
    let viewportBounds = this.viewer.viewport.getBounds(true);

    //TODO: Add logic for pages wider and shorter than the viewport
    //TODO: Refactor to own function
    //TODO: Adjust padding on page change
    //TODO: Adjust padding on window resize
    //TODO: Adjust padding on zoom
    //TODO: Add animation to padding/positioning for smoother transition
    let heightChangeRatio = viewportBounds.height / requestedPageBounds.height;
    let newPageWidth = heightChangeRatio * requestedPageBounds.width;
    let newPageLeft =  (viewportBounds.x + (viewportBounds.width / 2)) - (newPageWidth / 2);
    let requestedPageCoordinates = this.viewer.viewport.viewportToWindowCoordinates(new OpenSeadragon.Point(newPageLeft, 0));
    let viewerCoordinates = this.viewer.viewport.viewportToWindowCoordinates(new OpenSeadragon.Point(viewportBounds.x, 0));
    let paddingInPixels = requestedPageCoordinates.x - viewerCoordinates.x;

    let rootNode = d3.select(this.viewer.container.parentNode);
    rootNode.style('transition', 'padding 250ms linear');
    rootNode.style('padding', '0 ' + paddingInPixels + 'px');
    this.viewer.viewport.fitBounds(requestedPageBounds, false);

    //Update position of previous/next tiles
    this.positionPreviousTiles(requestedPageIndex, requestedPageBounds, 10);
    this.positionNextTiles(requestedPageIndex, requestedPageBounds, 10);
  }

  private positionTilesInDashboardView(requestedPageIndex: number): void{
    let requestedPage = this.viewer.world.getItemAt(requestedPageIndex);
    if (!requestedPage) {
      return;
    }

    let requestedPageBounds = requestedPage.getBounds(true);

    //TODO: Add padding for header/footer
    let rootNode = d3.select(this.viewer.container.parentNode);
    rootNode.style('padding', '0px');

    this.positionPreviousTiles(requestedPageIndex, requestedPageBounds, 100);
    this.positionNextTiles(requestedPageIndex, requestedPageBounds, 100);
  }

  //Recursive function to iterate through previous pages and position them to the left of the current page
  private positionPreviousTiles(currentTileIndex: number, currentTileBounds: any, margin: number): void {
    let previousTiledImage = this.viewer.world.getItemAt(currentTileIndex - 1);
    if (!previousTiledImage) {
      return;
    }

    //Position tiled image
    let previousTileBounds = previousTiledImage.getBounds(true);
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

    //Position tiled image
    let nextTileBounds = nextTiledImage.getBounds(true);
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
}
