import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
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
  private currentCanvasIndices = [-1];
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
    // const previousHit = this.findFirstHitOnPage(previousIndex)
    this.contentSearchNavigationService.goToPreviousHitPage();
  }

  goToNextHitPage() {
    // let nextHit: Hit;
    // if (this.currentIndex === -1) {
    //   nextHit = this.searchResult.get(0);
    // } else {
    //   const current = this.searchResult.get(this.currentIndex);
    //   const page = this.pageService.findPageByTileIndex(current.index);
    //   const tiles = this.pageService.getTileArrayFromPageIndex(page);
    //   const lastPageIndex = this.getLastPageIndex(tiles);
    //   nextHit = this.searchResult.hits.find(h => h.index > lastPageIndex);
    // }
    //
    // if (nextHit) {
    //   this.currentIndex = this.findCurrentHitIndex([nextHit.index]);
    //   this.iiifContentSearchService.selected(nextHit);
    // }
    this.contentSearchNavigationService.goToNextHitPage();
  }

  findCurrentHitIndex(canvasIndices: number[]): number {
    for (let i = 0; i < this.searchResult.size(); i++) {
      const hit = this.searchResult.get(i);
      if (canvasIndices.indexOf(hit.index) >= 0) {
        return i;
      }
      if (hit.index >= canvasIndices[canvasIndices.length - 1]) {
        if (i === 0) {
          return -1;
        } else {
          const phit = this.searchResult.get(i - 1);
          return this.searchResult.hits.findIndex(sr => sr.index === phit.index);
        }
      }
    }
    return this.searchResult.size() - 1;
  }

  private findFirstHitOnPage(previousIndex: number): Hit {
    let previousHit = this.searchResult.get(previousIndex);
    const page = this.pageService.findPageByTileIndex(previousHit.index);
    const tiles = this.pageService.getTileArrayFromPageIndex(page);
    const leftPage = tiles[0];
    const leftPageHit = this.searchResult.hits.find(h => h.index === leftPage);
    if (leftPageHit) {
      previousHit = leftPageHit;
    } else if (tiles.length === 2) {
      const rightPage = tiles[1];
      previousHit = this.searchResult.hits.find(h => h.index === rightPage);
    }
    return previousHit;
  }

  private getLastPageIndex(tiles: number[]) {
    return tiles.length === 1 ? tiles[0] : tiles[1];
  }

}
