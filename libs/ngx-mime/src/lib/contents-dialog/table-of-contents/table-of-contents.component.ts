import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { Manifest } from '../../core/models/manifest';
import { ViewerService } from '../../core/viewer-service/viewer.service';
import { ContentsDialogComponent } from '../contents-dialog.component';

@Component({
  selector: 'mime-toc',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TocComponent implements OnInit, OnDestroy {
  public manifest: Manifest;
  public currentCanvasGroupIndex: number;
  private destroyed: Subject<void> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<ContentsDialogComponent>,
    public intl: MimeViewerIntl,
    public mediaObserver: MediaObserver,
    private changeDetectorRef: ChangeDetectorRef,
    private iiifManifestService: IiifManifestService,
    private viewerService: ViewerService,
    private canvasService: CanvasService
  ) {}

  ngOnInit() {
    this.iiifManifestService.currentManifest
      .pipe(takeUntil(this.destroyed))
      .subscribe((manifest: Manifest) => {
        this.manifest = manifest;
        this.currentCanvasGroupIndex = this.canvasService.currentCanvasGroupIndex;
        this.changeDetectorRef.detectChanges();
      });

    this.viewerService.onCanvasGroupIndexChange
      .pipe(takeUntil(this.destroyed))
      .subscribe((canvasGroupIndex: number) => {
        this.currentCanvasGroupIndex = canvasGroupIndex;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  goToCanvas(canvasIndex: number): void {
    this.viewerService.goToCanvas(canvasIndex, false);
    if (this.mediaObserver.isActive('lt-md')) {
      this.dialogRef.close();
    }
  }
}
