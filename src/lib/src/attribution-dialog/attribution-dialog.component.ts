import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
  ElementRef,
  HostListener,
  AfterViewChecked
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { Manifest } from '../core/models/manifest';

@Component({
  templateUrl: './attribution-dialog.component.html',
  styleUrls: ['./attribution-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributionDialogComponent implements OnInit, OnDestroy, AfterViewChecked {
  public manifest: Manifest;
  private destroyed: Subject<void> = new Subject();

  constructor(
    public intl: MimeViewerIntl,
    private el: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private iiifManifestService: IiifManifestService,
    private attributionDialogResizeService: AttributionDialogResizeService
  ) {
    attributionDialogResizeService.el = el;
  }

  ngOnInit() {
    this.iiifManifestService.currentManifest.pipe(takeUntil(this.destroyed)).subscribe((manifest: Manifest) => {
      this.manifest = manifest;
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.attributionDialogResizeService.markForCheck();
  }

  ngAfterViewChecked() {
    this.attributionDialogResizeService.markForCheck();
  }
}
