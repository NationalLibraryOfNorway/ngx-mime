import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from '../core/viewer-intl';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { Manifest } from '../core/models/manifest';

@Component({
  selector: 'mime-attribution-dialog',
  templateUrl: './attribution-dialog.component.html',
  styleUrls: ['./attribution-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributionDialogComponent implements OnInit, OnDestroy {
  public manifest: Manifest;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public intl: MimeViewerIntl,
    private el: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private iiifManifestService: IiifManifestService,
    private attributionDialogResizeService: AttributionDialogResizeService) {
    attributionDialogResizeService.el = el;
  }

  ngOnInit() {
    this.subscriptions.push(this.iiifManifestService.currentManifest
      .subscribe((manifest: Manifest) => {
        this.manifest = manifest;
        this.changeDetectorRef.markForCheck();
      }));
  }

  ngAfterViewInit() {
    console.log('AttributionDialogComponent - ngAfterViewInit()');
    this.attributionDialogResizeService.markForCheck();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log('AttributionDialogComponent - onResize()');
    this.attributionDialogResizeService.markForCheck();
  }
}
