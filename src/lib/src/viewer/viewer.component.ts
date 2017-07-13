import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IiifService } from '../core/iiif-service/iiif-service';
import { Manifest } from '../core/models/manifest';
import { Options } from '../core/models/options';
import { ViewerBuilder } from '../core/builders/viewer.builder';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnDestroy {
  @Input() manifestUri: string;
  @Input() options: Options;
  private subscriptions: Array<Subscription> = [];

  constructor(private iiifService: IiifService) { }

  ngOnInit(): void {
    if (!this.options) {
      this.options = new Options();
    }

    if (this.manifestUri) {
      this.subscriptions.push(
        this.iiifService.getManifest(this.manifestUri)
          .subscribe((manifest: Manifest) => {
            new ViewerBuilder()
              .withOptions(this.options)
              .withTiles(manifest.tileSource)
              .create();
          })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
