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
  private readonly ZOOMFACTOR = 0.0002;
  private viewer: any;
  private options: Options;
  // References to clickable overlays
  private overlays: Array<HTMLElement>;
  private tileSources: any[];
  private subscriptions: Array<Subscription> = [];

  private previousTogglePinchDistance = 0;
  private zoomLevel = 0;

  constructor(
    private zone: NgZone,
    private clickService: ClickService,
    private pageService: PageService,
    private modeService: ModeService) { }

  ngOnInit(): void {}

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
      this.zoomLevel = this.getZoom();
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
  }

  addOpenEvents(): void {
    this.viewer.addHandler('open', (data: any) => {
      this.createOverlays();
      this.fitBoundsToStart();
    });
  }

  toggleMode(mode: ViewerMode) {
    if (mode === ViewerMode.DASHBOARD) {
      this.setDashboardSettings();
    } else if (mode === ViewerMode.PAGE) {
      this.setPageSettings();
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
    this.viewer.addHandler('canvas-double-click', (event: any) => {
        event.preventDefaultAction = true;
    });
  }

  addSingleClickEvents(): void {
    this.clickService.reset();
    this.clickService.addSingleClickHandler((event: any) => {
      let target: HTMLElement = event.originalEvent.target;
      if (target.nodeName === 'rect') {
        let requestedPage = this.getOverlayIndexFromClickEvent(target);
        if (requestedPage >= 0) {
          this.pageService.currentPage = requestedPage;
          this.modeService.toggleMode();
          this.fitBounds(target);
        }
      }
    });
  }

  addDblClickEvents(): void {
    this.clickService.addDoubleClickHandler((event) => {
      if (this.modeService.mode === ViewerMode.PAGE) {
        if (this.getZoom() > this.getHomeZoom()) {
          this.fitVertically();
        } else {
          this.zoomTo(this.getZoom() * this.options.zoomPerClick);
        }
      }
    });
  }

  addPinchEvents(): void {
    this.viewer.addHandler('canvas-pinch', this.pinchHandlerToggleMode);
    this.viewer.addHandler('canvas-release', (data: any) => {
      this.previousTogglePinchDistance = 0;
    });
  }

  pinchHandlerToggleMode = (event: any) => {
    // Pinch Out
    if (event.lastDistance > this.previousTogglePinchDistance) {
      if (this.modeService.mode === ViewerMode.DASHBOARD) {
          this.modeService.toggleMode();
          this.fitBounds(this.overlays[this.pageService.currentPage]);
      }
    // Pinch In
    } else {
      if (this.modeService.mode === ViewerMode.PAGE) {
        this.modeService.toggleMode();
        this.zoomTo(this.getHomeZoom())
      }
    }
    this.previousTogglePinchDistance = event.lastDistance;
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

  public getPageCount() {
    if (this.tileSources) {
      return this.tileSources.length;
    }
  }

  // Create SVG-overlays for each page
  createOverlays(): void {
    this.overlays = [];
    let svgOverlay = this.viewer.svgOverlay();
    let svgNode = d3.select(svgOverlay.node());
    this.tileSources.forEach((tile, i) => {
      let tiledImage = this.viewer.world.getItemAt(i);
      if (!tiledImage) { return; }

      let box = tiledImage.getBounds(true);

      svgNode.append('rect')
        .attr('x', box.x)
        .attr('y', box.y)
        .attr('width', box.width)
        .attr('height', box.height)
        .attr('class', 'tile');

      let currentOverlay: HTMLElement = svgNode.node().children[i];
      this.overlays.push(currentOverlay);
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

  // Toggle viewport-bounds between page and dashboard
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
    if (target.nodeName === 'rect') {
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
