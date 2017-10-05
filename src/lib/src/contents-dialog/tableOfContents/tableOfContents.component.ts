import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { Canvas, Manifest, Structure } from '../../core/models/manifest';
import { ViewerService } from '../../core/viewer-service/viewer.service';
import { ContentsDialogComponent } from '../contents-dialog.component';
import { MdDialogRef } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';

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
    public dialogRef: MdDialogRef<ContentsDialogComponent>,
    public intl: MimeViewerIntl,
    public media: ObservableMedia,
    private changeDetectorRef: ChangeDetectorRef,
    private iiifManifestService: IiifManifestService,
    private viewerService: ViewerService) { }

  ngOnInit() {
    this.subscriptions.push(this.iiifManifestService.currentManifest
      .subscribe((manifest: Manifest) => {
        this.manifest = manifest;
        this.changeDetectorRef.markForCheck();
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  goToPage(page: number): void {
    this.viewerService.goToPage(page, false);
    if (this.media.isActive('lt-md')) {
      this.dialogRef.close();
    }
  }

}
