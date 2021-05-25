import * as d3 from 'd3';
import * as OpenSeadragon from 'openseadragon';
import { Subscription } from 'rxjs';
import { Point } from '../models/point';
import { Rect } from '../models/rect';
import { ViewerOptions } from '../models/viewer-options';
import { StyleService } from '../style-service/style.service';

export class CanvasGroupMask {
  viewer: any;
  canvasGroupRect = new Rect();

  leftMask: any;
  rightMask: any;

  disableResize = false;
  center!: Point;

  backgroundColor!: string;
  private subscriptions!: Subscription;

  constructor(viewer: any, private styleService: StyleService) {
    this.viewer = viewer;
  }

  public initialize(pageBounds: Rect, visible: boolean): void {
    this.subscriptions = new Subscription();

    this.subscriptions.add(
      this.styleService.onChange.subscribe((c) => {
        this.backgroundColor = c;
        if (this.leftMask) {
          this.leftMask.style('fill', this.backgroundColor);
        }
        if (this.rightMask) {
          this.rightMask.style('fill', this.backgroundColor);
        }
      })
    );

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

  public destroy() {
    this.unsubscribe();
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
    this.viewer.addHandler('canvas-drag', this.canvasGroupDragHandler);
    this.viewer.addHandler('canvas-drag-end', this.canvasGroupDragEndHandler);
  }

  private removeHandlers() {
    this.viewer.removeHandler('animation', this.animationHandler);
    this.viewer.removeHandler('resize', this.resizeHandler);
    this.viewer.removeHandler('canvas-pinch', this.canvasGroupPinchHandler);
    this.viewer.removeHandler('canvas-drag', this.canvasGroupDragHandler);
    this.viewer.removeHandler(
      'canvas-drag-end',
      this.canvasGroupDragEndHandler
    );
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

  private canvasGroupDragHandler = (e: any) => {
    if ((e.delta.x || e.delta.y) && e.speed > 0 && e.direction !== 0) {
      this.disableResize = true;
    }
  };

  private canvasGroupDragEndHandler = () => {
    this.disableResize = false;
    this.resize();
  };

  private addCanvasGroupMask() {
    const overlays = d3.select(this.viewer.svgOverlay().node().parentNode);

    const mask = overlays.append('g').attr('id', 'page-mask');

    this.leftMask = mask
      .append('rect')
      .attr('id', 'mime-left-page-mask')
      .attr('height', '100%')
      .attr('y', 0)
      .style('fill', this.backgroundColor);

    this.rightMask = mask
      .append('rect')
      .attr('id', 'mime-right-page-mask')
      .attr('height', '100%')
      .attr('y', 0)
      .style('fill', this.backgroundColor);
  }

  private setCenter(): void {
    this.center = new OpenSeadragon.Point(
      this.viewer.viewport._containerInnerSize.x / 2,
      this.viewer.viewport._containerInnerSize.y / 2
    );
  }

  private resize(): void {
    if (this.disableResize || !this.leftMask || !this.rightMask) {
      return;
    }

    const leftMaskRect = this.getLeftMaskRect();
    const rightMaskRect = this.getRightMaskRect();
    this.leftMask.attr('width', leftMaskRect.width).attr('x', leftMaskRect.x);
    this.rightMask
      .attr('width', rightMaskRect.width)
      .attr('x', Math.round(rightMaskRect.x));
  }

  private getLeftMaskRect(): Rect {
    const imgBounds = new OpenSeadragon.Rect(
      this.canvasGroupRect.x,
      this.canvasGroupRect.y,
      this.canvasGroupRect.width,
      this.canvasGroupRect.height
    );
    const topLeft = this.viewer.viewport.viewportToViewerElementCoordinates(
      imgBounds.getTopLeft()
    );
    let width = topLeft.x - ViewerOptions.overlays.canvasGroupMarginInPageView;

    if (width < 0) {
      width = 0;
    }

    return new Rect({
      x: 0,
      width: width,
    });
  }

  private getRightMaskRect(): Rect {
    const imgBounds = new OpenSeadragon.Rect(
      this.canvasGroupRect.x,
      this.canvasGroupRect.y,
      this.canvasGroupRect.width,
      this.canvasGroupRect.height
    );
    const topRight = this.viewer.viewport.viewportToViewerElementCoordinates(
      imgBounds.getTopRight()
    );
    let width = this.viewer.viewport._containerInnerSize.x - topRight.x;
    const x =
      this.viewer.viewport._containerInnerSize.x -
      width +
      ViewerOptions.overlays.canvasGroupMarginInPageView;

    if (width < 0) {
      width = 0;
    }

    return new Rect({
      x: x,
      width: width,
    });
  }

  private unsubscribe() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
