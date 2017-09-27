import * as d3 from 'd3';

export class PageMask {
  _viewer: any;
  _pageBounds: any;

  _root: any;
  _cover: any;
  _transparentWindow: any;

  _disableResize = false;
  _center: any;


  constructor(
    viewer: any
  ) {
    let self = this;

    this._viewer = viewer;

    this._viewer.addHandler('animation', function () {
      self.resize();
    });

    this._viewer.addHandler('animation', function () {
      self.resize();
    });

    this._viewer.addHandler('resize', function () {
      self.resize();
    });

    this._viewer.addHandler('canvas-drag', function () {
      self._disableResize = true;
    });

    this._viewer.addHandler('canvas-drag-end', function () {
        self._disableResize = false;
        self.resize();
    });
  }

  public initialise(pageBounds: any): void {
    this._pageBounds = pageBounds;
    this._center = this._viewer.viewport.pixelFromPoint(new OpenSeadragon.Point(0, 0), true);
    
    this._root = d3.select(this._viewer.canvas).append('svg')
      .attr('position', 'absolute')
      .attr('left', '0')
      .attr('top', '0')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('z-index', '150')
      .attr('class', 'pagemask')
      .attr('mask', 'url(#mask1)');

    this._cover = this._root.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('x', 0)
      .attr('y', 0)
      .style('fill', '#ffffff')
      .style('fill-opacity', '1');

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

    this._transparentWindow = mask.append('rect')
      .attr('height', '100%')
      .attr('y', 0)
      .style('fill', '#000000');

    this.resize();
  }

  public changePage(pageBounds: any) {
    this._pageBounds = pageBounds;
    this.resize();
  }

  public show() {
    this._cover.style('fill-opacity', '1');
  }

  public hide() {
    this._cover.style('fill-opacity', '0');
  }

  private resize() {
    if (!this._transparentWindow || this._disableResize) {
      return;
    }
    
    let zoom = this._viewer.viewport.getZoom(true);
    let scale = this._viewer.viewport._containerInnerSize.x * zoom;

    this._transparentWindow.attr('width', this._pageBounds.width.baseVal.value * scale)
      .attr('x', this._center.x - (this._pageBounds.width.baseVal.value * scale / 2));
  }
}
