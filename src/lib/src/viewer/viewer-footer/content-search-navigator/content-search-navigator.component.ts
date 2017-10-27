import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

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
  private subscriptions: Array<Subscription> = [];

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private pageService: PageService,
    private iiifContentSearchService: IiifContentSearchService,
    private contentSearchNavigationService: ContentSearchNavigationService) { }

  ngOnInit() {
    this.subscriptions.push(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));

    this.subscriptions.push(
      this.pageService.onPageChange.subscribe((pageIndex: number) => {
        this.contentSearchNavigationService.update(pageIndex);
        this.currentIndex = this.contentSearchNavigationService.getCurrentIndex();
        this.isHitOnActivePage = this.contentSearchNavigationService.getHitOnActivePage();
        this.isFirstHitPage = this.contentSearchNavigationService.getFirstHitPage();
        this.isLastHitPage = this.contentSearchNavigationService.getLastHitPage();
        this.changeDetectorRef.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
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
