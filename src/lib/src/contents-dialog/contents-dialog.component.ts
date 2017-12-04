import { Component, OnInit, HostListener, ElementRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { Dimensions } from '../core/models/dimensions';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { Manifest } from './../core/models/manifest';

@Component({
  selector: 'mime-contents',
  templateUrl: './contents-dialog.component.html',
  styleUrls: ['./contents-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentsDialogComponent implements OnInit, OnDestroy {
  public manifest: Manifest;
  public tabHeight = {};
  public showToc = false;
  private mimeHeight = 0;
  private destroyed: Subject<void> = new Subject();

  constructor(
    public intl: MimeViewerIntl,
    public media: ObservableMedia,
    private mimeResizeService: MimeResizeService,
    private el: ElementRef,
    private mimeDomHelper: MimeDomHelper,
    private changeDetectorRef: ChangeDetectorRef,
    private iiifManifestService: IiifManifestService) {
      mimeResizeService
        .onResize
        .pipe(
          takeUntil(this.destroyed)
        ).subscribe((dimensions: Dimensions) => {
          this.mimeHeight = dimensions.height;
          this.resizeTabHeight();
        });
  }

  ngOnInit() {
    this.iiifManifestService
      .currentManifest
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe((manifest: Manifest) => {
        this.manifest = manifest;
        this.showToc = this.manifest && this.manifest.structures.length > 0;
        this.changeDetectorRef.detectChanges();
      });

    this.resizeTabHeight();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizeTabHeight();
  }

  private resizeTabHeight(): void {
    const dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
    let height = this.mimeHeight;

    if (this.media.isActive('lt-md')) {
      height -= 104;
      this.tabHeight = {
        'maxHeight': window.innerHeight - 128 + 'px'
      };
    } else {
      height -= 208;
      this.tabHeight = {
        'maxHeight': height + 'px'
      };
    }
  }
}
