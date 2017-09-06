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
  private isCanvasPressed = false;

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
        this.options = new Options(this.modeService.mode, manifest.tileSource);
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

  getIsCanvasPressed(): boolean {
    return this.isCanvasPressed;
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
    this.addSingleClickEvents();
    this.clickService.addDoubleClickHandler(this.dblClickHandler);
    this.viewer.addHandler('animation-finish', this.animationsEndCallback);
    this.viewer.addHandler('canvas-click', this.clickService.click);
    this.viewer.addHandler('canvas-double-click', (e: any) => e.preventDefaultAction = true);
    this.viewer.addHandler('canvas-press', () => this.isCanvasPressed = true);
    this.viewer.addHandler('canvas-release', () => this.isCanvasPressed = false);
    this.viewer.addHandler('canvas-scroll', this.scrollToggleMode);
    this.viewer.addHandler('canvas-pinch', this.pinchToggleMode);
  }

  /**
   * Overrides for default OSD-functions
   */
  addOverrides(): void {
    // Overrides default goHome, raised when clicking home-button
    this.viewer.viewport.goHome = () => {
      this.viewer.raiseEvent('home');
      this.zoomHome();
    };
  }

  /**
   * Toggles between page/dashboard-mode
   * @param mode ViewerMode
   */
  toggleMode(mode: ViewerMode) {
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
    this.viewer.panVertical = true;

    setTimeout(() => {
      this.viewer.gestureSettingsTouch.pinchToZoom = true;
      this.viewer.gestureSettingsMouse.scrollToZoom = true;
    }, OptionsTransitions.TIME_IN_MILLIS);
  }

  /**
   * Scroll-toggle-handler
   * Scroll-up dashboard-mode: Toggle page-mode
   * Scroll-down page-mode: Toggle dashboard-mode if page is at min-zoom
   */
  scrollToggleMode = (e: any) => {
    let event = e.originalEvent;
    let delta = (event.wheelDelta) ? event.wheelDelta : -event.deltaY;
    // Scrolling down
    if (delta < 0) {
      if (this.modeService.mode === ViewerMode.PAGE && this.pageIsAtMinZoom()) {
        this.modeService.toggleMode();
        this.zoomTo(this.getHomeZoom());
      }
      // Scrolling up
    } else if (delta > 0) {
      if (this.modeService.mode === ViewerMode.DASHBOARD) {
        this.modeService.toggleMode();
        this.fitBounds(this.overlays[this.pageService.currentPage]);
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
        this.modeService.toggleMode();
        this.fitBounds(this.overlays[this.pageService.currentPage]);
      }
      // Pinch In
    } else if (this.modeService.mode === ViewerMode.PAGE && this.pageIsAtMinZoom()) {
      this.modeService.toggleMode();
      this.zoomTo(this.getHomeZoom());
    }
  }

  /**
   * Adds single-click-handler
   * Single-click toggles between page/dashboard-mode if a page is hit
   */
  addSingleClickEvents(): void {
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

  /**
   * Checks if hit element is a <rect>-element
   * @param target
   */
  isPageHit(target: HTMLElement): boolean {
    return target.nodeName === 'rect';
  }


  /**
   * Double-click-handler
   * Double-click dashboard-mode should go to page-mode
   * Double-click page-mode should
   *    - Zoom in if page is fitted vertically
   *    - Fit vertically if page is already zoomed in
   */
  dblClickHandler = (event: any) => {
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
  }

  animationsEndCallback = () => {
    this.setisCurrentPageFittedVertically();
  }

  /**
   * Checks whether current page's overlay has a larger height than the SVG parent-node
   * If the heights are equal, then this page is fitted vertically in the viewer
   * (Note that this function is called after animation is ended for correct calculation)
   */
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

  // TODO: This should return items in world, not tilesources-array
  public getPageCount(): number {
    if (this.tileSources) {
      return this.tileSources.length;
    }
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

    this.tileSources.forEach((tile, i) => {
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

      let currentOverlay: HTMLElement = this.svgNode.node().children[i];
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
   * Fits viewport bounds to page
   * @param page index of page
   */
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
      this.viewer.viewport.fitBounds(pageBounds);
    }
  }

  /**
   * Returns an OpenSeadragon.Rectangle instance of this overlay
   * @param overlay
   */
  createRectangel(overlay: any): any {
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
}
