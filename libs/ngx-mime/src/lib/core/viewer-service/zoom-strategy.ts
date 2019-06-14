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

    const homeZoomFactor = this.getHomeZoomFactor();
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
      ) * homeZoomFactor
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
      : 1;
  }

  private getDashboardZoomHomeFactor2() {
    console.log('*******************************************************************************************');
    // console.log(this.viewer, this.viewer.viewport, this.viewer.world, this.viewer.source, this.viewer.canvas);
    console.log(this.viewer, this.getTiledImage());

    const minFactor = 0.66;
    const maxFactor = 0.95;
    let factor = maxFactor;
    let scaleFactorIndex = 0;
    let contentWidth = this.getContentWidth(scaleFactorIndex, 1);
    console.log('containerWidth', this.getContainerWidth());
    console.log('tileWidth', this.getTileWidth(scaleFactorIndex));
    console.log('contentWidth', contentWidth);
    // factor = 1 - (this.getContainerWidth() / contentWidth);

    while (contentWidth > this.getContainerWidth()) {
      factor = factor - 0.01;
      contentWidth = this.getContentWidth(scaleFactorIndex, factor);
      const newTileWidth = this.getTileWidth(scaleFactorIndex) * factor;
      const nextTileSizeWidth = this.getTileWidth(scaleFactorIndex + 1);
      console.log('Width of tile is too large', {contentWidth, newTileWidth, nextTileSizeWidth, factor});
      if (nextTileSizeWidth > newTileWidth) {
        factor = maxFactor;
        scaleFactorIndex++;
        console.log(`Changing to scaleFactor ${this.getScaleFactor(scaleFactorIndex)}  and factor ${factor} after finding ${newTileWidth}`);
      }
    }

    console.log('Optimized contentWidth', contentWidth);
    console.log('factor', factor);
    return factor;
  }

  private getContainerWidth(): number {
    return this.viewer.viewport.containerSize.x;
  }

  private getTiledImage() {
    return this.viewer.world.getItemAt(this.canvasService.currentCanvasIndex);
  }

  private getTileWidth(scaleFactorIndex: number): number {
    return this.getTiledImage().source.width / this.getScaleFactor(scaleFactorIndex);
  }
  
  private getScaleFactor(index: number): number {
    return this.getTiledImage().source.scale_factors[index];
  }

  private getPercentageOfTileWidth(scaleFactorIndex, percentage): number {
    return (this.getTileWidth(scaleFactorIndex) * percentage) / 100;
  }

  private getMargin(): number {
    return 75;
  }

  private getContentWidth(scaleFactorIndex: number, factor): number {
    const tileWidth = this.getTileWidth(scaleFactorIndex) * 2;
    const partialTileWidth = this.getPercentageOfTileWidth(scaleFactorIndex, 33) * 2;
    const margins = this.getMargin() * 2;

    return (tileWidth * factor) + (partialTileWidth * factor) + margins;
  }

  private getTargetSizesIndex(): number {
    const index = this.viewer.source.sizes.findIndex(size => size.width < this.getContainerWidth());
    if (index > 0) {
      return index - 1;
    }
    return index;
  }

  private getDashboardZoomHomeFactor() {
    return this.viewerLayoutService.layout === ViewerLayout.ONE_PAGE ? 0.85 : this.getDashboardZoomHomeFactor2();
    // return this.viewerLayoutService.layout === ViewerLayout.ONE_PAGE ? 0.85 : 0.66;
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
