import { Component, Input, OnInit } from '@angular/core';
import { IiifService } from '../core/iiif-service/iiif-service';
import { UrlBuilder } from '../core/builders/url-builder';
import { Manifest } from '../core/models/manifest';
import { Options } from '../core/models/options';
import { ViewerService } from '../core/viewer-service/viewer.service';

@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  @Input() options: Options;
  constructor(
    private iiifService: IiifService,
    private viewerService: ViewerService
  ) { }

  ngOnInit(): void {
    if (!this.options) {
      this.options = new Options();
    }
    const sesamId = '02810a70549a53e15b317842601ba37c';
    this.iiifService.getManifest(UrlBuilder.getManifestUrl(sesamId))
      .subscribe((manifest: Manifest) => {
      this.options.tileSources = manifest.tileSource;
      this.viewerService.setOptions(this.options);
      this.viewerService.open();
      });
  }
}
