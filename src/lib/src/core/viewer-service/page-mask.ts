import * as d3 from 'd3';
import { ViewerOptions } from '../models/viewer-options';

export class PageMask {
  viewer: any;
  pageBounds: any;

  root: any;
  cover: any;
  transparentWindow: any;

  disableResize = false;
  center: any;

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

  public initialise(pageBounds: any): void {
    this.pageBounds = pageBounds;

    this.root = d3.select(this.viewer.canvas).append('svg')
      .attr('position', 'absolute')
      .attr('left', '0')
      .attr('top', '0')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('z-index', '150')
      .attr('class', 'pagemask')
      .attr('mask', 'url(#mask1)');

    this.cover = this.root.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('x', 0)
      .attr('y', 0)
      .style('fill', ViewerOptions.colors.canvasBackgroundColor)
      .style('fill-opacity', '1');

    const mask = this.root.append('mask')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('x', 0)
      .attr('y', 0)
      .attr('id', 'mask1');

    mask.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('x', 0)
      .attr('y', 0)
      .style('fill', '#ffffff');

    this.transparentWindow = mask.append('rect')
      .attr('height', '100%')
      .attr('y', 0)
      .style('fill', '#000000');

    this.setCenter();
    this.resize();

    d3.select(this.viewer.canvas).select('canvas').style('background-color', ViewerOptions.colors.canvasBackgroundColor);
    d3.select(this.viewer.container.parentNode).transition().duration(ViewerOptions.transitions.OSDAnimationTime).style('opacity', '1');
  }

  public changePage(pageBounds: any): void {
    this.pageBounds = pageBounds;
    this.resize();
  }

  public show(): void {
    if (!this.cover) {
      return;
    }
    this.cover.style('fill-opacity', '1');
  }

  public hide(): void {
    if (!this.cover) {
      return;
    }
    this.cover.style('fill-opacity', '0');
  }

  private setCenter(): void {
    this.center = this.viewer.viewport.pixelFromPoint(this.viewer.viewport.getCenter(), true);
  }

  private resize(): void {

    if (!this.transparentWindow || this.disableResize) {
      return;
    }

    const zoom = this.viewer.viewport.getZoom(true);
    const scale = this.viewer.viewport._containerInnerSize.x * zoom;

    this.transparentWindow.attr('width', this.pageBounds.width.baseVal.value * scale)
      .attr('x', this.center.x - (this.pageBounds.width.baseVal.value * scale / 2));
  }
}
