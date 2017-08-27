import { Injectable, NgZone, OnInit } from '@angular/core';
import { Manifest } from '../models/manifest';
import { Options } from '../models/options';
import { ViewerMode } from './../../viewer/viewer-mode';

declare const OpenSeadragon: any;
@Injectable()
export class ViewerService implements OnInit {
  private readonly ZOOMFACTOR = 0.02;
  private viewer: any;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {}

  setUpViewer(mode: ViewerMode, manifest: Manifest) {
    if (manifest.tileSource) {
      this.zone.runOutsideAngular(() => {
        this.viewer = new OpenSeadragon.Viewer(Object.assign({}, new Options(mode, manifest.tileSource)));
      });
      this.addToWindow();
      this.addEvents();
    }
  }

  getViewer() {
    return this.viewer;
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
    let zoomTo = this.getZoom();
    this.viewer.addHandler('canvas-pinch', (data: any) => {
      if (data.lastDistance > previousDistance) { // Pinch Out
        zoomTo = this.getZoom() + this.ZOOMFACTOR;
      } else { // Pinch In
        zoomTo = this.getZoom() - this.ZOOMFACTOR;
        if (zoomTo < this.getHomeZoom()) {
          zoomTo = this.getHomeZoom();
        }
      }
      this.zoomTo(zoomTo);
      previousDistance = data.lastDistance;
    });

    this.viewer.addHandler('canvas-release', (data: any) => {
      previousDistance = 0;
    });
  }

  public getZoom(): number {
    return this.viewer.viewport.getZoom();
  }

  public getHomeZoom(): number {
    return this.viewer.viewport.getHomeZoom();
  }

  public getMinZoom(): number {
    return this.viewer.viewport.getMinZoom();
  }

  public getMaxZoom(): number {
    return this.viewer.viewport.getMaxZoom();
  }

  public zoomHome(): void {
    this.zoomTo(this.getHomeZoom());
  }

  public zoomTo(level: number): void {
    this.viewer.viewport.zoomTo(level);
  }
}
