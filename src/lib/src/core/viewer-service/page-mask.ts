import * as d3 from 'd3';

export class PageMask {
  _viewer: any;

  _root: any;
  _window: any;


  constructor(
    viewer: any
  ) {
    this._viewer = viewer;
  }

  public initialise(pageBounds: any): void {
    this._root = d3.select(this._viewer.canvas).append('svg')
      .attr('position', 'absolute')
      .attr('left', '0')
      .attr('top', '0')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('z-index', '150')
      .attr('class', 'pagemask')
      .attr('mask', 'url(#mask1)');

    this._root.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('x', 0)
      .attr('y', 0)
      .style('fill', '#12789A')
      .style('fill-opacity', '0.5');

    const mask = this._root.append('mask')
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

    this._window = mask.append('rect')
      .attr('width', pageBounds.width.baseVal.value)
      .attr('height', pageBounds.height.baseVal.value)
      .attr('x', pageBounds.x.baseVal.value)
      .attr('y', pageBounds.y.baseVal.value)
      .style('fill', '#000000');

    this.resize();
  }

  public changeZoom(zoom: number) {
    this.resize(zoom);
  }

  public changePage(pageBounds: any) {
    this._window.attr('width', pageBounds.width.baseVal.value)
      .attr('height', pageBounds.height.baseVal.value)
      .attr('x', pageBounds.x.baseVal.value)
      .attr('y', pageBounds.y.baseVal.value);

    this.resize();
  }

  private resize(zoom?: number) {
    if (!this._window) {
      return;
    }

    let p = this._viewer.viewport.pixelFromPoint(new OpenSeadragon.Point(0, 0), true);
    zoom = zoom ? zoom : this._viewer.viewport.getZoom(true);
    let scale = this._viewer.viewport._containerInnerSize.x * zoom;
    
    this._window.attr('transform',
      'translate(' + p.x + ',' + p.y + ') scale(' + scale + ')');
    
  }
}
