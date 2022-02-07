import * as d3 from 'd3';
import * as OpenSeadragon from 'openseadragon';
import { CanvasService } from '../canvas-service/canvas-service';
import { ModeService } from '../mode-service/mode.service';
import { Dimensions } from '../models/dimensions';
import { Direction } from '../models/direction';
import { Point } from '../models/point';
import { ViewerLayout } from '../models/viewer-layout';
import { ViewerMode } from '../models/viewer-mode';
import { ViewerOptions } from '../models/viewer-options';
import { Utils } from '../utils';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { ZoomUtils } from './zoom-utils';

export interface CanvasGroup {
  canvasGroupIndex: number;
  canvasGroupEndHitCountReached?: boolean;
  direction: Direction;
  immediately: boolean;
}

export interface Strategy {
  setMinZoom(mode: ViewerMode): void;
  getMinZoom(): number;
  getMaxZoom(): number;
  getZoom(): number;
  goToHomeZoom(): void;
  zoomTo(level: number, position?: Point): void;
  zoomIn(zoomFactor?: number, position?: Point): void;
  zoomOut(zoomFactor?: number, position?: Point): void;
}

export class ZoomStrategy {
  constructor(
    protected viewer: any,
    protected canvasService: CanvasService,
    protected modeService: ModeService,
    protected viewerLayoutService: ViewerLayoutService
  ) {}

  setMinZoom(mode: ViewerMode): void {
    this.viewer.viewport.minZoomLevel = this.getHomeZoomLevel(mode);
  }

  getMinZoom(): number {
    return Utils.shortenDecimals(this.viewer.viewport.getMinZoom(), 5);
  }

  getMaxZoom(): number {
    return Utils.shortenDecimals(this.viewer.viewport.getMaxZoom(), 5);
  }

  getZoom(): number {
    return Utils.shortenDecimals(this.viewer.viewport.getZoom(true), 5);
  }

  goToHomeZoom(): void {
    this.zoomTo(this.getHomeZoomLevel(this.modeService.mode));
    if (this.modeService.isPageZoomed()) {
      this.modeService.mode = ViewerMode.PAGE;
    }
  }

  zoomTo(level: number, position?: Point): void {
    this.viewer.viewport.zoomTo(level, position);
  }

  private getHomeZoomLevel(mode: ViewerMode): number {
    if (!this.viewer || !this.canvasService) {
      return 1;
    }

    let currentCanvasHeight: number;
    let currentCanvasWidth: number;
    let viewportBounds: any;

    const currentCanvasGroupRect =
      this.canvasService.getCurrentCanvasGroupRect();
    currentCanvasHeight = currentCanvasGroupRect.height;
    currentCanvasWidth = currentCanvasGroupRect.width;
    viewportBounds =
      mode === ViewerMode.DASHBOARD
        ? this.getDashboardViewportBounds()
        : this.viewer.viewport.getBounds();

    return this.getFittedZoomLevel(
      viewportBounds,
      currentCanvasHeight,
      currentCanvasWidth
    );
  }

  zoomIn(zoomFactor?: number, position?: Point): void {
    if (!zoomFactor) {
      zoomFactor = ViewerOptions.zoom.zoomFactor;
    }

    if (position) {
      position = this.viewer.viewport.pointFromPixel(position);
      if (position) {
        position = ZoomUtils.constrainPositionToCanvasGroup(
          position,
          this.canvasService.getCurrentCanvasGroupRect()
        );
      }
    }

    if (this.modeService.mode !== ViewerMode.PAGE_ZOOMED) {
      this.modeService.mode = ViewerMode.PAGE_ZOOMED;
    }

    this.zoomBy(zoomFactor, position);
  }

  zoomOut(zoomFactor?: number, position?: Point): void {
    if (!zoomFactor) {
      zoomFactor = Math.pow(ViewerOptions.zoom.zoomFactor, -1);
    }

    if (position) {
      position = this.viewer.viewport.pointFromPixel(position);
      if (position) {
        position = ZoomUtils.constrainPositionToCanvasGroup(
          position,
          this.canvasService.getCurrentCanvasGroupRect()
        );
      }
    }

    if (this.isViewportLargerThanCanvasGroup()) {
      this.modeService.mode = ViewerMode.PAGE;
    } else {
      this.zoomBy(zoomFactor, position);
    }
  }

  private getDashboardViewportBounds(): any {
    if (!this.viewer) {
      return;
    }

    const homeZoomFactor = this.getHomeZoomFactor();
    const maxViewportDimensions = new Dimensions(
      d3
        .select(this.viewer.container.parentNode.parentNode)
        .node()
        .getBoundingClientRect()
    );
    const viewportHeight =
      maxViewportDimensions.height -
      ViewerOptions.padding.header -
      ViewerOptions.padding.footer;
    const viewportWidth = maxViewportDimensions.width * homeZoomFactor;

    const viewportSizeInViewportCoordinates = this.viewer.viewport.deltaPointsFromPixels(
      new OpenSeadragon.Point(viewportWidth, viewportHeight)
    );

    return new OpenSeadragon.Rect(
      0,
      0,
      viewportSizeInViewportCoordinates.x,
      viewportSizeInViewportCoordinates.y
    );
  }

  private getFittedZoomLevel(
    viewportBounds: any,
    canvasGroupHeight: number,
    canvasGroupWidth: number
  ) {
    const currentZoom: number = this.viewer.viewport.getZoom();
    const resizeRatio: number = viewportBounds.height / canvasGroupHeight;

    if (resizeRatio * canvasGroupWidth <= viewportBounds.width) {
      return Utils.shortenDecimals(resizeRatio * currentZoom, 5);
    } else {
      // Canvas group at full height is wider than viewport.  Return fit by width instead.
      return Utils.shortenDecimals(
        (viewportBounds.width / canvasGroupWidth) * currentZoom,
        5
      );
    }
  }

  private zoomBy(zoomFactor: number, position?: Point): void {
    const currentZoom = this.viewer.viewport.getZoom(false);
    zoomFactor = ZoomUtils.constraintZoomFactor(
      zoomFactor,
      currentZoom,
      this.getMaxZoom()
    );
    this.viewer.viewport.zoomBy(zoomFactor, position);
  }

  private isViewportLargerThanCanvasGroup(): boolean {
    const canvasGroupRec = this.canvasService.getCurrentCanvasGroupRect();
    const viewportBounds = this.viewer.viewport.getBounds();
    const pbWidth = Math.round(canvasGroupRec.width);
    const pbHeight = Math.round(canvasGroupRec.height);
    const vpWidth = Math.round(viewportBounds.width);
    const vpHeight = Math.round(viewportBounds.height);
    return vpHeight >= pbHeight || vpWidth >= pbWidth;
  }

  private getHomeZoomFactor() {
    return this.modeService.mode === ViewerMode.DASHBOARD
      ? this.getDashboardZoomHomeFactor()
      : 1;
  }

  private getDashboardZoomHomeFactor() {
    return this.viewerLayoutService.layout === ViewerLayout.ONE_PAGE
      ? 0.85
      : 0.66;
  }
}

export class DefaultZoomStrategy extends ZoomStrategy implements Strategy {
  constructor(
    viewer: any,
    canvasService: CanvasService,
    modeService: ModeService,
    viewerLayoutService: ViewerLayoutService
  ) {
    super(viewer, canvasService, modeService, viewerLayoutService);
  }
}
