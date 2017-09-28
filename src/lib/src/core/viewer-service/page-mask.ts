import * as d3 from 'd3';
import { ViewerOptions } from '../models/viewer-options';
import { Point } from '../models/point';

export class PageMask {
  maskElementId = 'page-mask--mask-element';
  clipPathId = 'page-mask--clip-path';

  viewer: any;
  overlays: any;
  pageBounds: SVGRectElement;

  root: any;
  defs: any;
  canvasCover: any;
  visibleCanvasArea: any;
  visibleOverlayArea: any;

  disableResize = false;
  center: Point;

  constructor(viewer: any) {
    this.viewer = viewer;

    this.viewer.addHandler('animation', () => {
      this.resize();
    });

    this.viewer.addHandler('animation', () => {
      this.resize();
    });

    this.viewer.addHandler('resize', () => {
      this.setCenter();
      this.resize();
    });

    this.viewer.addHandler('canvas-drag', () => {
      this.disableResize = true;
    });

    this.viewer.addHandler('canvas-drag-end', () => {
      this.disableResize = false;
      this.resize();
    });
  }

  public initialise(pageBounds: SVGRectElement): void {
    this.pageBounds = pageBounds;

    this.addCanvasMask();
    this.addOverlayClipPath();

    this.setCenter();
    this.resize();

    d3.select(this.viewer.container.parentNode).transition().duration(ViewerOptions.transitions.OSDAnimationTime).style('opacity', '1');
  }

  public changePage(pageBounds: SVGRectElement) {
    this.pageBounds = pageBounds;
    this.resize();
  }

  public show(): void {
    if (!this.canvasCover) {
      return;
    }
    this.canvasCover.style('fill-opacity', '1');
    this.overlays.attr('clip-path', 'url(#' + this.clipPathId + ')');
  }

  public hide(): void {
    if (!this.canvasCover) {
      return;
    }
    this.canvasCover.style('fill-opacity', '0');
    this.overlays.attr('clip-path', '');
  }

  private addCanvasMask() {
    d3.select(this.viewer.canvas).select('canvas').style('background-color', ViewerOptions.colors.canvasBackgroundColor);

    this.root = d3.select(this.viewer.canvas).append('svg')
      .attr('position', 'absolute')
      .attr('left', '0')
      .attr('top', '0')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('id', 'page-mask')
      .attr('class', 'page-mask')
      .attr('mask', 'url(#' + this.maskElementId + ')');

    this.canvasCover = this.root.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('x', 0)
      .attr('y', 0)
      .style('fill', ViewerOptions.colors.canvasBackgroundColor)
      .style('fill-opacity', '1');

    this.defs = this.root.append('defs');

    const mask = this.defs.append('mask')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('x', 0)
      .attr('y', 0)
      .attr('id', this.maskElementId);

    mask.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('x', 0)
      .attr('y', 0)
      .style('fill', '#ffffff');

    this.visibleCanvasArea = mask.append('rect')
      .attr('height', '100%')
      .attr('y', 0)
      .style('fill', '#000000');
  }

  private addOverlayClipPath() {
    this.overlays = d3.select(this.viewer.svgOverlay().node().parentNode);
    this.overlays.attr('clip-path', 'url(#' + this.clipPathId + ')');

    const clipPath = this.defs.append('clipPath')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('x', 0)
      .attr('y', 0)
      .attr('id', this.clipPathId);

    this.visibleOverlayArea = clipPath.append('rect')
      .attr('height', '100%')
      .attr('y', 0);
  }

  private setCenter(): void {
    this.center = this.viewer.viewport.pixelFromPoint(this.viewer.viewport.getCenter(), true);
  }

  private resize(): void {
    if (this.disableResize || !this.visibleCanvasArea || !this.visibleOverlayArea) {
      return;
    }

    const zoom = this.viewer.viewport.getZoom(true);
    const scale = this.viewer.viewport._containerInnerSize.x * zoom;

    const width = this.pageBounds.width.baseVal.value * scale;
    const x = this.center.x - (this.pageBounds.width.baseVal.value * scale / 2);

    this.visibleCanvasArea.attr('width', width).attr('x', x);
    this.visibleOverlayArea.attr('width', width).attr('x', x);
  }
}
