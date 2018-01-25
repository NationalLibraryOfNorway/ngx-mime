import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSliderChange } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { MimeViewerIntl } from './../../../core/intl/viewer-intl';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
import { PageService } from './../../../core/page-service/page-service';
import { SearchResult } from './../../../core/models/search-result';
import { PageDialogService } from '../../../page-dialog/page-dialog.service';

@Component({
  selector: 'mime-page-navigator',
  templateUrl: './page-navigator.component.html',
  styleUrls: ['./page-navigator.component.scss']
})
export class PageNavigatorComponent implements OnInit, OnDestroy {
  @Input() public searchResult: SearchResult;
  public numberOfTiles: number;
  public currentTiles: string;
  public numberOfPages: number;
  public currentPage: number;
  public isFirstPage: boolean;
  public isLastPage: boolean;
  private currentSliderPage = -1;
  private destroyed: Subject<void> = new Subject();

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private viewerService: ViewerService,
    private pageService: PageService,
    private pageDialogService: PageDialogService
  ) { }

  ngOnInit() {
    this.pageService
      .onPageChange
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe((currentPage: number) => {
        if (this.currentSliderPage !== -1 && this.currentSliderPage === currentPage) {
          this.currentSliderPage = -1;
        } else if (this.currentSliderPage === -1) {
          this.currentPage = currentPage;
          this.currentTiles = this.pageService.getTilesStringFromPageIndex(this.currentPage);
        }
        this.isFirstPage = this.isOnFirstPage(currentPage);
        this.isLastPage = this.isOnLastPage(currentPage);
        this.changeDetectorRef.detectChanges();
      });

    this.pageService
      .onNumberOfPagesChange
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe((numberOfPages: number) => {
        this.numberOfPages = numberOfPages;
        this.numberOfTiles = this.pageService.numberOfTiles;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  public goToPreviousPage(): void {
    this.viewerService.goToPreviousPage();
  }

  public goToNextPage(): void {
    this.viewerService.goToNextPage();
  }

  public onSliderChange(change: MatSliderChange): void {
    this.currentSliderPage = change.value;
    this.currentPage = change.value;
    this.currentTiles = this.pageService.getTilesStringFromPageIndex(this.currentPage);
    this.viewerService.goToPage(change.value, false);
    this.changeDetectorRef.detectChanges();
  }

  openPageDialog(): void {
    this.pageDialogService.toggle();
  }

  private isOnFirstPage(currentPage: number): boolean {
    return currentPage === 0;
  }

  private isOnLastPage(currentPage: number): boolean {
    return currentPage === (this.numberOfPages - 1);
  }

}
