import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatDialogRef } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { Manifest } from '../../core/models/manifest';
import { ViewerService } from '../../core/viewer-service/viewer.service';
import { ContentsDialogComponent } from '../contents-dialog.component';
import { PageService } from '../../core/page-service/page-service';

@Component({
  selector: 'mime-toc',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TocComponent implements OnInit, OnDestroy {
  public manifest: Manifest;
  public currentPage: number;
  private destroyed: Subject<void> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<ContentsDialogComponent>,
    public intl: MimeViewerIntl,
    public media: ObservableMedia,
    private changeDetectorRef: ChangeDetectorRef,
    private iiifManifestService: IiifManifestService,
    private viewerService: ViewerService,
    private pageService: PageService) { }

  ngOnInit() {
    this.iiifManifestService
      .currentManifest
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe((manifest: Manifest) => {
        this.manifest = manifest;
        this.currentPage = this.pageService.currentPage;
        this.changeDetectorRef.detectChanges();
      });

    this.viewerService
      .onPageChange
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe((page: number) => {
        this.currentPage = page;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  goToPage(page: number): void {
    this.viewerService.goToTile(page, false);
    if (this.media.isActive('lt-md')) {
      this.dialogRef.close();
    }
  }

}
