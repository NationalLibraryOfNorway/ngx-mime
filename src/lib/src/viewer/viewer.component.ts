import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
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

  constructor(private iiifService: IiifService) { }

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
            this.viewer = new OpenSeadragon.Viewer(Object.assign({}, new Options(manifest.tileSource)));
          })
      );
    }
  }

  addEvents(): void {

  }

  addPinchEvent(): void {

  }
}
