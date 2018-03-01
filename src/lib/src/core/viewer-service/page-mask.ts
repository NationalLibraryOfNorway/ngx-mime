import * as d3 from 'd3';
import { ViewerOptions } from '../models/viewer-options';
import { Point } from '../models/point';
import { Rect } from '../models/rect';

declare const OpenSeadragon: any;
export class CanvasGroupMask {
  viewer: any;
  canvasGroupRect: Rect;

  leftMask: any;
  rightMask: any;

  disableResize = false;
  center: Point;

  constructor(viewer: any) {
    this.viewer = viewer;
  }

  public initialise(pageBounds: Rect, visible: boolean): void {
    this.canvasGroupRect = pageBounds;

    this.addCanvasGroupMask();

    this.setCenter();
    this.resize();

    if (visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  public changeCanvasGroup(pageBounds: Rect) {
    this.canvasGroupRect = pageBounds;
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
    this.viewer.addHandler('canvas-pinch', this.canvasGroupPinchHandler);
    this.viewer.addHandler('canvas-drag', this.canvasGreoupDragHandler);
    this.viewer.addHandler('canvas-drag-end', this.canvasGroupDragEndHandler);
  }

  private removeHandlers() {
    this.viewer.removeHandler('animation', this.animationHandler);
    this.viewer.removeHandler('resize', this.resizeHandler);
    this.viewer.removeHandler('canvas-pinch', this.canvasGroupPinchHandler);
    this.viewer.removeHandler('canvas-drag', this.canvasGreoupDragHandler);
    this.viewer.removeHandler('canvas-drag-end', this.canvasGroupDragEndHandler);
  }

  private animationHandler = () => {
    this.resize();
  };

  private resizeHandler = () => {
    this.setCenter();
    this.resize();
  };

  private canvasGroupPinchHandler = () => {
    this.disableResize = false;
  };

  private canvasGreoupDragHandler = (e: any) => {
    if ((e.delta.x || e.delta.y) && e.speed > 0 && e.direction !== 0) {
      this.disableResize = true;
    }
  };

  private canvasGroupDragEndHandler = () => {
    this.disableResize = false;
    this.resize();
  };

  private addCanvasGroupMask() {
    d3
      .select(this.viewer.canvas)
      .select('canvas')
      .style('background-color', ViewerOptions.colors.canvasGroupBackgroundColor);

    const overlays = d3.select(this.viewer.svgOverlay().node().parentNode);

    const mask = overlays.append('g').attr('id', 'page-mask');

    this.leftMask = mask
      .append('rect')
      .attr('id', 'mime-left-page-mask')
      .attr('height', '100%')
      .attr('y', 0)
      .style('fill', ViewerOptions.colors.canvasGroupBackgroundColor);

    this.rightMask = mask
      .append('rect')
      .attr('id', 'mime-right-page-mask')
      .attr('height', '100%')
      .attr('y', 0)
      .style('fill', ViewerOptions.colors.canvasGroupBackgroundColor);
  }

  private setCenter(): void {
    this.center = new OpenSeadragon.Point(this.viewer.viewport._containerInnerSize.x / 2, this.viewer.viewport._containerInnerSize.y / 2);
  }

  private resize(): void {
    if (this.disableResize || !this.leftMask || !this.rightMask) {
      return;
    }

    const leftMaskRect = this.getLeftMaskRect();
    const rightMaskRect = this.getRightMaskRect();
    this.leftMask.attr('width', leftMaskRect.width).attr('x', leftMaskRect.x);
    this.rightMask.attr('width', rightMaskRect.width).attr('x', Math.round(rightMaskRect.x));
  }

  private getLeftMaskRect(): Rect {
    const imgBounds = new OpenSeadragon.Rect(
      this.canvasGroupRect.x,
      this.canvasGroupRect.y,
      this.canvasGroupRect.width,
      this.canvasGroupRect.height
    );
    const topLeft = this.viewer.viewport.viewportToViewerElementCoordinates(imgBounds.getTopLeft());
    let width = topLeft.x - ViewerOptions.overlays.canvasGroupMarginPageView;

    if (width < 0) {
      width = 0;
    }

    return new Rect({
      x: 0,
      width: width
    });
  }

  private getRightMaskRect(): Rect {
    const imgBounds = new OpenSeadragon.Rect(
      this.canvasGroupRect.x,
      this.canvasGroupRect.y,
      this.canvasGroupRect.width,
      this.canvasGroupRect.height
    );
    const topRight = this.viewer.viewport.viewportToViewerElementCoordinates(imgBounds.getTopRight());
    let width = this.viewer.viewport._containerInnerSize.x - topRight.x;
    const x = this.viewer.viewport._containerInnerSize.x - width + ViewerOptions.overlays.canvasGroupMarginPageView;

    if (width < 0) {
      width = 0;
    }

    return new Rect({
      x: x,
      width: width
    });
  }
}
