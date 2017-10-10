import * as d3 from 'd3';
import { ViewerOptions } from '../models/viewer-options';
import { Point } from '../models/point';

export class PageMask {

  viewer: any;
  pageBounds: SVGRectElement;

  leftMask: any;
  rightMask: any;

  disableResize = false;
  center: Point;

  constructor(viewer: any) {
    this.viewer = viewer;

    this.viewer.addHandler('animation', () => {
      this.resize();
    });

    this.viewer.addHandler('resize', () => {
      this.setCenter();
      this.resize();
    });

    this.viewer.addHandler('canvas-pinch', () => {
      this.disableResize = false;
    });

    this.viewer.addHandler('canvas-drag', (e: any) => {
      if ((e.delta.x || e.delta.y) && e.speed > 0 && e.direction !== 0) {
        this.disableResize = true;
      }
    });

    this.viewer.addHandler('canvas-drag-end', () => {
      this.disableResize = false;
      this.resize();
    });
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
    if (!this.leftMask || !this.rightMask) {
      return;
    }
    this.leftMask.attr('height', '100%');
    this.rightMask.attr('height', '100%');
  }

  public hide(): void {
    if (!this.leftMask || !this.rightMask) {
      return;
    }
    this.leftMask.attr('height', '0');
    this.rightMask.attr('height', '0');
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

    let width = Math.round(this.center.x - (this.pageBounds.width.baseVal.value * scale / 2));
    if (width < 0) { width = 0; }

    this.leftMask.attr('width', width).attr('x', 0);
    this.rightMask.attr('width', width).attr('x', Math.round(this.center.x + (this.pageBounds.width.baseVal.value * scale / 2)));
  }
}
