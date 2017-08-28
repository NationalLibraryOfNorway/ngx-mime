import { Injectable, NgZone, OnInit } from '@angular/core';
import { Manifest } from '../models/manifest';
import { Options } from '../models/options';
import { ClickService } from '../click/click.service';

declare const OpenSeadragon: any;
@Injectable()
export class ViewerService implements OnInit {
  private readonly ZOOMFACTOR = 0.02;
  private viewer: any;
  private options: Options;

  constructor(
    private zone: NgZone,
    private clickService: ClickService
  ) {}

  ngOnInit(): void {}

  setUpViewer(manifest: Manifest) {
    if (manifest.tileSource) {
      this.zone.runOutsideAngular(() => {
        this.options = new Options(manifest.tileSource);
        this.viewer = new OpenSeadragon.Viewer(Object.assign({}, this.options));
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
    this.addDblClickEvents();
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

  addDblClickEvents(): void {
    this.clickService.addDoubleClickHandler((event) => {
      console.log(this.getZoom() + ' > ' + this.getHomeZoom());
      if (this.getZoom() > this.getHomeZoom()) {
        this.zoomTo(this.getHomeZoom());
      } else {
        this.zoomTo(this.getZoom() * this.options.zoomPerClick);
      }
    });

    this.viewer.addHandler('canvas-click', this.clickService.click);
    this.viewer.addHandler('canvas-double-click', this.clickService.click);
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
