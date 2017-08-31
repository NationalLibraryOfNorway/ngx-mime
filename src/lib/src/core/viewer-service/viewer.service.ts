import { Injectable, NgZone, OnInit } from '@angular/core';
import { Manifest } from '../models/manifest';
import { Options } from '../models/options';
import { ClickService } from '../click/click.service';

declare const OpenSeadragon: any;
@Injectable()
export class ViewerService implements OnInit {
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
        this.fitVertically();
      } else {
        this.zoomTo(this.getZoom() * this.options.zoomPerClick);
      }
    });

    this.viewer.addHandler('canvas-click', this.clickService.click);
    this.viewer.addHandler('canvas-double-click', this.clickService.click);
  }

  public getZoom(): number {
    return this.shortenDecimals(this.viewer.viewport.getZoom(true), 5);
  }

  public getHomeZoom(): number {
    return this.shortenDecimals(this.viewer.viewport.getHomeZoom(), 5);
  }

  public getMinZoom(): number {
    return this.shortenDecimals(this.viewer.viewport.getMinZoom(), 5);
  }

  public getMaxZoom(): number {
    return this.shortenDecimals(this.viewer.viewport.getMaxZoom(), 5);
  }

  public zoomHome(): void {
    this.viewer.viewport.goHome(false);
  }

  public zoomTo(level: number): void {
    this.viewer.viewport.zoomTo(level);
  }

  public fitVertically(): void {
    this.viewer.viewport.fitVertically(false);
  }

  private clearOpenSeadragonTooltips() {
    OpenSeadragon.setString('Tooltips.Home', '');
    OpenSeadragon.setString('Tooltips.ZoomOut', '');
    OpenSeadragon.setString('Tooltips.ZoomIn', '');
    OpenSeadragon.setString('Tooltips.NextPage', '');
    OpenSeadragon.setString('Tooltips.ZoomIn', '');
    OpenSeadragon.setString('Tooltips.FullPage', '');
  }

  private shortenDecimals(zoom: string, precision: number): number {
    const short = Number(zoom).toPrecision(precision);
    return Number(short);
  }
}
