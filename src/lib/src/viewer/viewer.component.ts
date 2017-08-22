import { Component, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { IiifService } from '../core/iiif-service/iiif-service';
import { Manifest } from '../core/models/manifest';
import { Subscription } from 'rxjs/Subscription';
import { Options } from '../core/models/options';

declare const OpenSeadragon: any;
@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() manifestUri: string;
  public viewer: any;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private zone: NgZone,
    private iiifService: IiifService
  ) { }

  ngOnInit(): void {
    this.createViewer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['manifestUri']) {
      const manifestUriChanges: SimpleChange = changes['manifestUri'];
      if (!manifestUriChanges.isFirstChange() && manifestUriChanges.currentValue !== manifestUriChanges.firstChange) {
        this.manifestUri = manifestUriChanges.currentValue;
        this.createViewer();
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  createViewer() {
    if (this.manifestUri) {
      this.subscriptions.push(
        this.iiifService.getManifest(this.manifestUri)
          .subscribe((manifest: Manifest) => {
            if (this.viewer != null && this.viewer.isOpen()) {
              this.viewer.destroy();
            }
            this.zone.runOutsideAngular(() => {
              this.viewer = new OpenSeadragon.Viewer(Object.assign({}, new Options(manifest.tileSource)));
            });
            window.openSeadragonViewer = this.viewer;
            this.addEvents();
          })
      );
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
