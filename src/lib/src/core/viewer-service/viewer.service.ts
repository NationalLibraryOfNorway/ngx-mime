import { Injectable, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ClickService } from '../../core/click/click.service';
import { ModeService } from '../../core/mode-service/mode.service';
import { Manifest } from '../models/manifest';
import { Options } from '../models/options';
import { PageService } from '../page-service/page-service';
import { ViewerMode } from '../models/viewer-mode';
import '../ext/svg-overlay';
import * as d3 from 'd3';

declare const OpenSeadragon: any;

@Injectable()
export class ViewerService {
  private readonly ZOOMFACTOR = 0.02;
  private viewer: any;
  private options: Options;
  // References to clickable overlays
  private overlays: Array<HTMLElement>;
  private tileSources: any[];
  private subscriptions: Array<Subscription> = [];

  constructor(
    private zone: NgZone,
    private clickService: ClickService,
    private pageService: PageService,
    private modeService: ModeService) {}

  setUpViewer(manifest: Manifest) {
    if (manifest.tileSource) {
      this.options = new Options(this.modeService.mode, manifest.tileSource)
      this.tileSources = manifest.tileSource;
      this.zone.runOutsideAngular(() => {
        this.viewer = new OpenSeadragon.Viewer(Object.assign({}, this.options));
      });

      this.modeService.onChange.subscribe((mode: ViewerMode) => {
        this.toggleMode(mode);
      });

      this.addToWindow();
      this.addEvents();
    }
  }

  getViewer() {
    return this.viewer;
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
    this.addPinchEvents();
    this.addClickEvents();
  }

  addOpenEvents(): void {
    this.viewer.addHandler('open', (data: any) => {
      this.pageService.currentPage = 0;
      this.createOverlays();
      this.fitBoundsToStart();
    });
  }

  addClickEvents(): void {
    this.clickService.reset();

    this.clickService.addSingleClickHandler((event: any) => {
      let target: HTMLElement = event.originalEvent.target;

      if (target.nodeName === 'rect') {
        let requestedPage = this.overlays.indexOf(target);
        if (requestedPage >= 0) {

          this.pageService.currentPage = requestedPage;
          this.modeService.toggleMode();
          this.fitBounds(target);
        }
      }
    });

    this.clickService.addDoubleClickHandler((event) => {
    });

    this.viewer.addHandler('canvas-click', this.clickService.click);

    this.viewer.addHandler('canvas-double-click', (event: any) => {
      if (this.modeService.mode === ViewerMode.DASHBOARD) {
        event.preventDefaultAction = true;
      }
    });
  }

  addPinchEvents(): void {
    let previousDistance = 0;
    let zoomTo = this.getZoom();
    this.viewer.addHandler('canvas-pinch', (data: any) => {
      if (data.lastDistance > previousDistance) { // Pinch Out
        zoomTo = this.getZoom() + this.ZOOMFACTOR;
      } else { // Pinch In
        zoomTo = this.getZoom() - this.ZOOMFACTOR;
        if (zoomTo < this.getHomeZoom()) {
          zoomTo = this.getHomeZoom();
        }
      }
      this.zoomTo(zoomTo);
      previousDistance = data.lastDistance;
    });

    this.viewer.addHandler('canvas-release', (data: any) => {
      previousDistance = 0;
    });
  }

  public getZoom(): number {
    return this.viewer.viewport.getZoom();
  }

  public getHomeZoom(): number {
    return this.viewer.viewport.getHomeZoom();
  }

  public getMinZoom(): number {
    return this.viewer.viewport.getMinZoom();
  }

  public getMaxZoom(): number {
    return this.viewer.viewport.getMaxZoom();
  }

  public zoomHome(): void {
    this.zoomTo(this.getHomeZoom());
  }

  public zoomTo(level: number): void {
    this.viewer.viewport.zoomTo(level);
  }

  public getPageCount() {
    if(this.tileSources) {
      return this.tileSources.length;
    }
  }

  toggleMode(mode: ViewerMode) {
    if (mode === ViewerMode.DASHBOARD) {
      this.setDashboardConstraints();
    } else if (mode === ViewerMode.PAGE) {
      this.setPageConstraints();
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

  setDashboardConstraints(): void {
    this.viewer.panVertical = false;
  }

  setPageConstraints(): void {
    this.viewer.panVertical = true;
  }

}
