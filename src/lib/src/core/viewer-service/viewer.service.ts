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
        this.clearOpenSeadragonTooltips();
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
    this.addDblClickEvents();
  }

  addDblClickEvents(): void {
    this.clickService.addDoubleClickHandler((event) => {
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

  private clearOpenSeadragonTooltips() {
    OpenSeadragon.setString('Tooltips.Home', '');
    OpenSeadragon.setString('Tooltips.ZoomOut', '');
    OpenSeadragon.setString('Tooltips.ZoomIn', '');
    OpenSeadragon.setString('Tooltips.NextPage', '');
    OpenSeadragon.setString('Tooltips.ZoomIn', '');
    OpenSeadragon.setString('Tooltips.FullPage', '');
  }
}
