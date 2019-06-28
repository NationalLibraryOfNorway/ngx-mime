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
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      this.modeService.mode = ViewerMode.PAGE;
    }
  }

  zoomTo(level: number, position?: Point): void {
    this.viewer.viewport.zoomTo(level, position);
  }

  private getHomeZoomLevel(mode: ViewerMode): number {
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

    return (
      this.getFittedZoomLevel(
        viewportBounds,
        canvasGroupHeight,
        canvasGroupWidth
      ) * this.getHomeZoomFactor()
    );
  }

  zoomIn(zoomFactor?: number, position?: Point): void {
    if (typeof zoomFactor === 'undefined') {
      zoomFactor = ViewerOptions.zoom.zoomFactor;
    }

    if (typeof position !== 'undefined') {
      position = this.viewer.viewport.pointFromPixel(position);
      position = ZoomUtils.constrainPositionToCanvasGroup(
        position,
        this.canvasService.getCurrentCanvasGroupRect()
      );
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
      position = ZoomUtils.constrainPositionToCanvasGroup(
        position,
        this.canvasService.getCurrentCanvasGroupRect()
      );
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
    const viewportWidth = maxViewportDimensions.width;

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
      : this.getMaxZoomFactor();
  }

  private getDashboardZoomHomeFactor() {
    if (this.getContainerWidth() >= this.getContentWidth()) {
      return this.getMaxZoomFactor();
    }

    const factor = this.getContainerWidth() / this.getContentWidth();

    if (factor < this.getMinZoomFactor()) {
      return this.getMinZoomFactor();
    }

    if (factor > this.getMaxZoomFactor()) {
      return this.getMaxZoomFactor();
    }

    return factor;
  }

  private getMinZoomFactor(): number {
    return ViewerOptions.zoom.minZoomFactor;
  }

  private getMaxZoomFactor(): number {
    return ViewerOptions.zoom.maxZoomFactor;
  }

  private getContainerWidth(): number {
    if (this.hasContainerSize()) {
      return this.viewer.viewport.containerSize.x;
    }
  }

  private hasContainerSize(): boolean {
    return this.hasViewport() && this.viewer.viewport.containerSize;
  }

  private hasViewport(): boolean {
    return this.viewer && this.viewer.viewport;
  }

  private getImgBounds(): OpenSeadragon.Rect {
    const canvasGroupRect = this.canvasService.getCurrentCanvasGroupRect();
    if (canvasGroupRect) {
      return new OpenSeadragon.Rect(canvasGroupRect.x, canvasGroupRect.y, canvasGroupRect.width, canvasGroupRect.height);
    }
    return null;
  }

  private getTileWidth(): number {
    const bounds: OpenSeadragon.Rect = this.getImgBounds();
    if (this.hasViewport() && bounds) {
      const topLeft = this.viewer.viewport.viewportToViewerElementCoordinates(bounds.getTopLeft());
      const topRight = this.viewer.viewport.viewportToViewerElementCoordinates(bounds.getTopRight());
      const divider = ViewerLayout.TWO_PAGE ? 2 : 1;
      if (topLeft && topLeft) {
        return (topRight.x - topLeft.x) / divider;
      }
    }
  }

  private getPercentageOfTileWidth(percentage): number {
    return (this.getTileWidth() * percentage) / 100;
  }

  private getContentWidth(): number {
    const multiplier = ViewerLayout.TWO_PAGE ? 2 : 1;
    const tilesWidth = this.getTileWidth() + this.getPercentageOfTileWidth(33);
    return (tilesWidth * multiplier) + ViewerOptions.overlays.canvasGroupMarginInDashboardView;
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
