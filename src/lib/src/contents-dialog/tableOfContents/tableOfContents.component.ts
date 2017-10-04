import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { Manifest } from '../../core/models/manifest';

@Component({
  selector: 'mime-toc',
  templateUrl: './tableOfContents.component.html',
  styleUrls: ['./tableOfContents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TOCComponent implements OnInit, OnDestroy {
  public manifest: Manifest;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private iiifManifestService: IiifManifestService) { }

  ngOnInit() {
    this.subscriptions.push(this.iiifManifestService.currentManifest
      .subscribe((manifest: Manifest) => {
        this.manifest = manifest;
        console.log(this.manifest.structures);
        this.changeDetectorRef.markForCheck();
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
