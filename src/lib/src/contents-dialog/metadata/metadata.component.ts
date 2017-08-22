import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { Manifest } from './../../core/models/manifest';

@Component({
  selector: 'mime-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataComponent implements OnInit {
  public manifest: Manifest;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private iiifManifestService: IiifManifestService) { }

  ngOnInit() {
    this.iiifManifestService.currentManifest
      .subscribe((manifest: Manifest) => {
        this.manifest = manifest;
        this.changeDetectorRef.markForCheck();
      });

  }

}
