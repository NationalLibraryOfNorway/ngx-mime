import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../core/viewer-intl';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { Manifest } from './../core/models/manifest';
import {FullscreenService} from '../core/fullscreen-service/fullscreen.service';

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
    private attributionDialogResizeService: AttributionDialogResizeService,
    private fullscreenService: FullscreenService) {
    attributionDialogResizeService.el = el;
  }

  ngOnInit() {
    this.subscriptions.push(this.iiifManifestService.currentManifest
      .subscribe((manifest: Manifest) => {
        this.manifest = manifest;
        this.changeDetectorRef.markForCheck();
        this.attributionDialogResizeService.markForCheck();
      }));

    // this.subscriptions.push(
    //   this.fullscreenService.onChange.subscribe((value: boolean) => {
    //     console.log('AttributionDialogComponent - fullscreen changed');
    //     this.attributionDialogResizeService.markForCheck();
    //   })
    // );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   console.log('AttributionDialogComponent - onResize()');
  //   this.attributionDialogResizeService.markForCheck();
  // }

  // ngAfterViewChecked() {
  //   console.log('AttributionDialogComponent - ngAfterViewChecked()');
  //   this.attributionDialogResizeService.markForCheck();
  // }
}
