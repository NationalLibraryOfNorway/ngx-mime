import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentsDialogComponent implements OnInit, OnDestroy {
  public manifest: Manifest | null = null;
  public tabHeight = {};
  public showToc = false;
  public selectedIndex = 0;
  private mimeHeight = 0;
  private subscriptions = new Subscription();

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
    this.subscriptions.add(
      mimeResizeService.onResize.subscribe((dimensions: Dimensions) => {
        this.mimeHeight = dimensions.height;
        this.resizeTabHeight();
      })
    );
  }

  ngOnInit() {
    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          this.manifest = manifest;
          this.showToc =
            this.manifest !== null &&
            this.manifest.structures !== undefined &&
            this.manifest.structures.length > 0;
          this.changeDetectorRef.detectChanges();
        }
      )
    );

    this.resizeTabHeight();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
    const dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
    let height = this.mimeHeight;

    if (this.mediaObserver.isActive('lt-md')) {
      height -= 104;
      this.tabHeight = {
        maxHeight: window.innerHeight - 128 + 'px',
      };
    } else {
      height -= 278;
      this.tabHeight = {
        maxHeight: height + 'px',
      };
    }
  }
}
