import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SearchResult } from '../../../core/models/search-result';
import { MimeViewerIntl } from '../../../core/intl/viewer-intl';
import {
  ContentSearchNavigationService
} from '../../../core/navigation/content-search-navigation-service/content-search-navigation.service';

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
  private subscriptions: Array<Subscription> = [];
  public currentIndex = 0;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public intl: MimeViewerIntl,
    private contentSearchNavigationService: ContentSearchNavigationService) { }

  ngOnInit() {
    this.subscriptions.push(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));

    this.subscriptions.push(
      this.contentSearchNavigationService.onCurrentIndexChange.subscribe((currentIndex: number) => {
        console.log('onCurrentIndexChange');
        this.currentIndex = currentIndex;
        this.isHitOnActivePage = this.contentSearchNavigationService.getHitOnActivePage();
        this.isFirstHitPage = this.contentSearchNavigationService.getFirstHitPage();
        this.isLastHitPage = this.contentSearchNavigationService.getLastHitPage();
        console.log(this.isHitOnActivePage + ' :: ' + this.isFirstHitPage + ' :: ' + this.isLastHitPage);
        this.changeDetectorRef.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  // clear(): void {
  //   this.iiifContentSearchService.destroy();
  // }

  goToPreviousHitPage() {
    this.contentSearchNavigationService.goToPreviousHitPage();
  }

  goToNextHitPage() {
    this.contentSearchNavigationService.goToNextHitPage();
  }
}
