import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Dimensions } from '../core/models/dimensions';
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
  public selectedIndex = 0;
  private mimeHeight = 0;
  private destroyed: Subject<void> = new Subject();

  constructor(
    public intl: MimeViewerIntl,
    public mediaObserver: MediaObserver,
    private dialogRef: MatDialogRef<ContentsDialogComponent>,
    private el: ElementRef,
    private mimeDomHelper: MimeDomHelper,
    private changeDetectorRef: ChangeDetectorRef,
    private iiifManifestService: IiifManifestService,
    mimeResizeService: MimeResizeService
  ) {
    mimeResizeService.onResize
      .pipe(takeUntil(this.destroyed))
      .subscribe((dimensions: Dimensions) => {
        this.mimeHeight = dimensions.height;
        this.resizeTabHeight();
      });
  }

  ngOnInit() {
    this.iiifManifestService.currentManifest
      .pipe(takeUntil(this.destroyed))
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

  onCanvasChanged() {
    if (this.mediaObserver.isActive('lt-md')) {
      this.dialogRef.close();
    }
  }

  private resizeTabHeight(): void {
    let height = this.mimeHeight;

    if (this.mediaObserver.isActive('lt-md')) {
      height -= 104;
      this.tabHeight = {
        maxHeight: window.innerHeight - 128 + 'px'
      };
    } else {
      height -= 300;
      this.tabHeight = {
        maxHeight: height + 'px'
      };
    }
  }
}
