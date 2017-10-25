import * as d3 from 'd3';
import { ViewerOptions } from '../models/viewer-options';
import { Point } from '../models/point';
import { Rect } from '../models/rect';

export class PageMask {

  viewer: any;
  pageBounds: Rect;

  leftMask: any;
  rightMask: any;

  disableResize = false;
  center: Point;

  constructor(viewer: any) {
    this.viewer = viewer;
  }

  public initialise(pageBounds: Rect, visible: boolean): void {
    this.pageBounds = pageBounds;

    this.addCanvasMask();

    this.setCenter();
    this.resize();

    if (visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  public changePage(pageBounds: Rect) {
    this.pageBounds = pageBounds;
    this.resize();
  }

  public show(): void {
    this.addHandlers();
    if (!this.leftMask || !this.rightMask) {
      return;
    }
    this.setCenter();
    this.resize();
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
    this.viewer.addHandler('resize', this.resizeHandler);
    this.viewer.addHandler('canvas-pinch', this.canvasPinchHandler);
    this.viewer.addHandler('canvas-drag', this.canvasDragHandler);
    this.viewer.addHandler('canvas-drag-end', this.canvasDragEndHandler);
  }

  private removeHandlers() {
    this.viewer.removeHandler('animation', this.animationHandler);
    this.viewer.removeHandler('resize', this.resizeHandler);
    this.viewer.removeHandler('canvas-pinch', this.canvasPinchHandler);
    this.viewer.removeHandler('canvas-drag', this.canvasDragHandler);
    this.viewer.removeHandler('canvas-drag-end', this.canvasDragEndHandler);
  }

  private animationHandler = () => {
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
    this.center = new OpenSeadragon.Point(this.viewer.viewport._containerInnerSize.x / 2, this.viewer.viewport._containerInnerSize.y / 2);
  }

  private resize(): void {
    if (this.disableResize || !this.leftMask || !this.rightMask) {
      return;
    }

    const zoom = this.viewer.viewport.getZoom(true);
    const scale = this.viewer.viewport._containerInnerSize.x * zoom;


    const imgBounds = new OpenSeadragon.Rect(this.pageBounds.x, this.pageBounds.y, this.pageBounds.width, this.pageBounds.height);
    const topLeft = this.viewer.viewport.viewportToViewerElementCoordinates(imgBounds.getTopLeft());
    const topRight = this.viewer.viewport.viewportToViewerElementCoordinates(imgBounds.getTopRight());
    let rightWidth = this.viewer.viewport._containerInnerSize.x - topRight.x;
    const rightX = this.viewer.viewport._containerInnerSize.x - rightWidth;
    let leftWidth = topLeft.x;
    const leftX = 0;

    if (leftWidth < 0) { leftWidth = 0; }
    if (rightWidth < 0) { rightWidth = 0; }

    this.leftMask.attr('width', leftWidth).attr('x', leftX);
    this.rightMask.attr('width', rightWidth).attr('x', Math.round(rightX));
  }

  private getViewportBounds(): Rect {
    return this.viewer.viewport.getBounds();
  }

}
