import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { SearchResult } from '../../../core/models/search-result';
import { MimeViewerIntl } from '../../../core/intl/viewer-intl';
import {
  ContentSearchNavigationService
} from '../../../core/navigation/content-search-navigation-service/content-search-navigation.service';
import { IiifContentSearchService } from '../../../core/iiif-content-search-service/iiif-content-search.service';
import { PageService } from '../../../core/page-service/page-service';

@Component({
  selector: 'mime-content-search-navigator',
  templateUrl: './content-search-navigator.component.html',
  styleUrls: ['./content-search-navigator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentSearchNavigatorComponent implements OnInit {
  @Input() searchResult: SearchResult;
  public isHitOnActivePage = false;
  public isFirstHitPage = false;
  public isLastHitPage = false;
  public currentIndex = 0;
  private destroyed: Subject<void> = new Subject();

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private pageService: PageService,
    private iiifContentSearchService: IiifContentSearchService,
    private contentSearchNavigationService: ContentSearchNavigationService) { }

  ngOnInit() {
    this.intl
      .changes
      .pipe(
      takeUntil(this.destroyed)
      )
      .subscribe(() => this.changeDetectorRef.markForCheck());

    this.pageService
      .onPageChange
      .pipe(
      takeUntil(this.destroyed)
      )
      .subscribe((pageIndex) => {
        this.contentSearchNavigationService.update(pageIndex);
        this.currentIndex = this.contentSearchNavigationService.getCurrentIndex();
        this.isHitOnActivePage = this.contentSearchNavigationService.getHitOnActivePage();
        this.isFirstHitPage = this.contentSearchNavigationService.getFirstHitPage();
        this.isLastHitPage = this.contentSearchNavigationService.getLastHitPage();
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  clear(): void {
    this.iiifContentSearchService.destroy();
  }

  goToPreviousHitPage() {
    this.contentSearchNavigationService.goToPreviousHitPage();
  }

  goToNextHitPage() {
    this.contentSearchNavigationService.goToNextHitPage();
  }
}
