import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Dimensions } from './../../core/models/dimensions';
import { MimeResizeService } from './../../core/mime-resize-service/mime-resize.service';
import { MimeViewerIntl } from './../../core/viewer-intl';
import { ViewerService } from './../../core/viewer-service/viewer.service';
import { PageService } from './../../core/page-service/page-service';

@Component({
  selector: 'mime-osd-toolbar',
  templateUrl: './osd-toolbar.component.html',
  styleUrls: ['./osd-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OsdToolbarComponent implements OnInit, OnDestroy {
  public osdToolbarStyle = {};
  public numberOfPages: number;
  public isFirstPage: boolean;
  public isLastPage: boolean;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private mimeService: MimeResizeService,
    private viewerService: ViewerService,
    private pageService: PageService) { }

  ngOnInit() {
    this.mimeService.onResize.subscribe((dimensions: Dimensions) => {
      this.osdToolbarStyle = {
        'top': (dimensions.top + 110) + 'px'
      };
      this.changeDetectorRef.detectChanges();
    });

    this.subscriptions.push(this.viewerService
      .onPageChange
      .subscribe((currentPage: number) => {
      this.numberOfPages = this.pageService.numberOfPages;
      this.isFirstPage = this.isOnFirstPage(currentPage);
      this.isLastPage = this.isOnLastPage(currentPage);
      this.changeDetectorRef.detectChanges();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public goToPreviousPage(): void {
    this.viewerService.goToPreviousPage();
  }

  public goToNextPage(): void {
    this.viewerService.goToNextPage();
  }

  private isOnFirstPage(currentPage: number): boolean {
    return currentPage === 0;
  }

  private isOnLastPage(currentPage: number): boolean {
    return currentPage === (this.numberOfPages - 1);
  }

}
