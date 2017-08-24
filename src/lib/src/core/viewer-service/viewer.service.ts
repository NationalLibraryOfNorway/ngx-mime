import { Injectable, NgZone, OnInit } from '@angular/core';
import { Manifest } from '../models/manifest';
import { Options } from '../models/options';

declare const OpenSeadragon: any;
@Injectable()
export class ViewerService implements OnInit {
  private viewer: any;

  constructor(private zone: NgZone) {
  }

  ngOnInit(): void {
  }

  setup(manifest: Manifest) {
    if (manifest.tileSource) {
      this.zone.runOutsideAngular(() => {
        this.viewer = new OpenSeadragon.Viewer(Object.assign({}, new Options(manifest.tileSource)));
      });
      this.addToWindow();
      this.addEvents();
    }
  }

  addToWindow() {
    window.openSeadragonViewer = this.viewer;
  }

  destroy() {
    if (this.viewer != null && this.viewer.isOpen()) {
      this.viewer.destroy();
    }
  }

  addEvents(): void {
    this.addPinchEvents();
  }

  addPinchEvents(): void {
    let previousDistance = 0;
    this.viewer.addHandler('canvas-pinch', (data: any) => {
      if (data.lastDistance > previousDistance) {
        this.viewer.viewport.zoomTo((this.viewer.viewport.getZoom() + 0.02));
      } else {
        this.viewer.viewport.zoomTo((this.viewer.viewport.getZoom() - 0.02));
      }
      previousDistance = data.lastDistance;
    });

    this.viewer.addHandler('canvas-release', (data: any) => {
      previousDistance = 0;
    });
  }
}
