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
  }

  addOpenEvents(): void {
    // Overrides default goHome
    this.viewer.viewport.goHome = () => {
      this.viewer.raiseEvent('home');
      this.zoomHome();
    };
    this.viewer.addHandler('open', (data: any) => {
    });
  }

  addAnimationEvents(): void {
    this.viewer.addHandler('animation-finish', this.animationsEndCallback);
  }

  toggleMode(mode: ViewerMode) {
    if (mode === ViewerMode.DASHBOARD) {
      this.setDashboardSettings();
      this.viewer.gestureSettingsTouch.pinchToZoom = false;
    } else if (mode === ViewerMode.PAGE) {
      this.setPageSettings();
      setTimeout(() => {
        this.viewer.gestureSettingsTouch.pinchToZoom = true;
      }, OptionsTransitions.TIME_IN_MILLIS);
    }
  }

  setDashboardSettings(): void {
    this.viewer.panVertical = false;
  }

  setPageSettings(): void {
    this.viewer.panVertical = true;
  }

  addClickEvents(): void {
    this.addSingleClickEvents();
    this.addDblClickEvents();
    this.viewer.addHandler('canvas-click', this.clickService.click);
    this.viewer.addHandler('canvas-double-click', (e: any) => e.preventDefaultAction = true);
    this.viewer.addHandler('canvas-press', () => this.isCanvasPressed = true);
    this.viewer.addHandler('canvas-release', () => this.isCanvasPressed = false);
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

  getIsCanvasPressed(): boolean {
    return this.isCanvasPressed;
  }

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
      this.viewer.viewport.fitBounds(pageBounds);
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
}
