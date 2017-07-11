import { Component, Input, OnInit } from '@angular/core';
import { IiifService } from '../core/iiif-service/iiif-service';
import { UrlBuilder } from '../core/builders/url.builder';
import { Manifest } from '../core/models/manifest';
import { Options } from '../core/models/options';
import { ViewerBuilder } from '../core/builders/viewer.builder';

@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  @Input() id: string;
  @Input() options: Options;

  constructor(private iiifService: IiifService) { }

  ngOnInit(): void {
    if (!this.options) {
      this.options = new Options();
    }

    if (this.id) {
      this.iiifService.getManifest(UrlBuilder.getManifestUrl(this.id))
        .subscribe((manifest: Manifest) => {
          new ViewerBuilder()
            .withOptions(this.options)
            .withTiles(manifest.tileSource)
            .create();
        });
    }
  }
}
