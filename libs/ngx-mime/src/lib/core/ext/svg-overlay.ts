declare const OpenSeadragon: any;

// OpenSeadragon SVG Overlay plugin 0.0.4

export function createSvgOverlay() {
  if (!OpenSeadragon) {
    console.error('[openseadragon-svg-overlay] requires OpenSeadragon');
    return;
  }

  const svgNS = 'http://www.w3.org/2000/svg';

  // ----------
  class Overlay {
    // ----------

    _viewer: any;
    _containerWidth: any;
    _containerHeight: any;
    _svg: any;
    _node: any;

    constructor(viewer: any) {
      const self = this;

      this._viewer = viewer;
      this._containerWidth = 0;
      this._containerHeight = 0;

      this._svg = document.createElementNS(svgNS, 'svg');
      this._svg.style.position = 'absolute';
      this._svg.style.left = 0;
      this._svg.style.top = 0;
      this._svg.style.width = '100%';
      this._svg.style.height = '100%';
      this._viewer.canvas.appendChild(this._svg);

      this._node = document.createElementNS(svgNS, 'g');
      this._svg.appendChild(this._node);

      this._viewer.addHandler('animation', function () {
        self.resize();
      });

      this._viewer.addHandler('open', function () {
        self.resize();
      });

      this._viewer.addHandler('rotate', function (evt: any) {
        self.resize();
      });

      this._viewer.addHandler('resize', function () {
        self.resize();
      });

      this.resize();
    }
    node() {
      return this._node;
    }

    // ----------
    resize() {
      if (this._containerWidth !== this._viewer.container.clientWidth) {
        this._containerWidth = this._viewer.container.clientWidth;
        this._svg.setAttribute('width', this._containerWidth);
      }

      if (this._containerHeight !== this._viewer.container.clientHeight) {
        this._containerHeight = this._viewer.container.clientHeight;
        this._svg.setAttribute('height', this._containerHeight);
      }

      const p = this._viewer.viewport.pixelFromPoint(
        new OpenSeadragon.Point(0, 0),
        true
      );
      const zoom = this._viewer.viewport.getZoom(true);
      const rotation = this._viewer.viewport.getRotation();
      // TODO: Expose an accessor for _containerInnerSize in the OSD API so we don't have to use the private variable.
      const scale = this._viewer.viewport._containerInnerSize.x * zoom;
      this._node.setAttribute(
        'transform',
        'translate(' +
          p.x +
          ',' +
          p.y +
          ') scale(' +
          scale +
          ') rotate(' +
          rotation +
          ')'
      );
    }

    // ----------
    onClick(node: any, handler: any) {
      // TODO: Fast click for mobile browsers

      new OpenSeadragon.MouseTracker({
        element: node,
        clickHandler: handler,
      }).setTracking(true);
    }
  }

  // ----------

  // ----------
  OpenSeadragon.Viewer.prototype.svgOverlay = function () {
    if (this._svgOverlayInfo) {
      return this._svgOverlayInfo;
    }

    this._svgOverlayInfo = new Overlay(this);
    return this._svgOverlayInfo;
  };
}
