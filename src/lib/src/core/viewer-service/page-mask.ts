import * as d3 from 'd3';
import { ViewerOptions } from '../models/viewer-options';
import { Point } from '../models/point';

declare const OpenSeadragon: any;
export class PageMask {

  viewer: any;
  pageBounds: SVGRectElement;

  leftMask: any;
  rightMask: any;

  disableResize = false;
  center: Point;
  private handlers: any[] = [];

  constructor(viewer: any) {
    this.viewer = viewer;
  }

  public initialise(pageBounds: SVGRectElement): void {
    this.pageBounds = pageBounds;

    this.addCanvasMask();

    this.setCenter();
    this.resize();
  }

  public changePage(pageBounds: SVGRectElement) {
    this.pageBounds = pageBounds;
    this.resize();
  }

  public show(): void {
    this.addHandlers();
    if (!this.leftMask || !this.rightMask) {
      return;
    }
    this.leftMask.attr('height', '100%');
    this.rightMask.attr('height', '100%');
  }

  public hide(): void {
    this.removeHandlers();
    if (!this.leftMask || !this.rightMask) {
      return;
    }
    this.leftMask.attr('height', '0');
    this.rightMask.attr('height', '0');
  }

  private addHandlers() {
    this.viewer.addHandler('animation', this.animationHandler);
    this.viewer.addHandler('animation-finish', this.animationFinishHandler);
    this.viewer.addHandler('resize', this.resizeHandler);
    this.viewer.addHandler('canvas-pinch', this.canvasPinchHandler);
    this.viewer.addHandler('canvas-drag', this.canvasDragHandler);
    this.viewer.addHandler('canvas-drag-end', this.canvasDragEndHandler);
  }

  private removeHandlers() {
    this.viewer.removeHandler('animation', this.animationHandler);
    this.viewer.removeHandler('animation-finish', this.animationFinishHandler);
    this.viewer.removeHandler('resize', this.resizeHandler);
    this.viewer.removeHandler('canvas-pinch', this.canvasPinchHandler);
    this.viewer.removeHandler('canvas-drag', this.canvasDragHandler);
    this.viewer.removeHandler('canvas-drag-end', this.canvasDragEndHandler);
  }

  private animationHandler = () => {
    this.resize();
  }

  private animationFinishHandler = () => {
    this.setCenter();
    this.resize();
  }

  private resizeHandler = () => {
    this.setCenter();
    this.resize();
  }

  private canvasPinchHandler = () => {
    this.disableResize = false;
  }

  private canvasDragHandler = (e: any) => {
    if ((e.delta.x || e.delta.y) && e.speed > 0 && e.direction !== 0) {
      this.disableResize = true;
    }
  }

  private canvasDragEndHandler = () => {
    this.disableResize = false;
    this.resize();
  }

  private addCanvasMask() {
    d3.select(this.viewer.canvas).select('canvas').style('background-color', ViewerOptions.colors.canvasBackgroundColor);

    const overlays = d3.select(this.viewer.svgOverlay().node().parentNode);

    const mask = overlays.append('g').attr('id', 'page-mask');

    this.leftMask = mask.append('rect')
      .attr('height', '100%')
      .attr('y', 0)
      .style('fill', ViewerOptions.colors.canvasBackgroundColor);

    this.rightMask = mask.append('rect')
      .attr('height', '100%')
      .attr('y', 0)
      .style('fill', ViewerOptions.colors.canvasBackgroundColor);
  }

  private setCenter(): void {
    this.center = this.viewer.viewport.pixelFromPoint(this.viewer.viewport.getCenter(), true);
  }

  private resize(): void {
    if (this.disableResize || !this.leftMask || !this.rightMask) {
      return;
    }

    const zoom = this.viewer.viewport.getZoom(true);
    const scale = this.viewer.viewport._containerInnerSize.x * zoom;

    let width = Math.round(this.center.x - (this.pageBounds.width.baseVal.value * scale / 2));
    if (width < 0) { width = 0; }

    this.leftMask.attr('width', width).attr('x', 0);
    this.rightMask.attr('width', width).attr('x', Math.round(this.center.x + (this.pageBounds.width.baseVal.value * scale / 2)));
  }
}
