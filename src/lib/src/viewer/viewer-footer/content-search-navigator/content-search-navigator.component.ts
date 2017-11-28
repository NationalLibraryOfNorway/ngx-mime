import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { SearchResult } from './../../../core/models/search-result';
import { Hit } from './../../../core/models/search-result';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
import { PageService } from './../../../core/page-service/page-service';
import { IiifContentSearchService } from './../../../core/iiif-content-search-service/iiif-content-search.service';
import { MimeViewerIntl } from './../../../core/intl/viewer-intl';

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
  private currentCanvasIndices = [-1];
  private destroyed: Subject<void> = new Subject();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public intl: MimeViewerIntl,
    private viewerService: ViewerService,
    private pageService: PageService,
    private iiifContentSearchService: IiifContentSearchService) { }

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
        this.currentCanvasIndices = this.pageService.getTileArrayFromPageIndex(pageIndex);
        this.currentIndex = this.findCurrentHitIndex(this.currentCanvasIndices);
        this.isHitOnActivePage = this.currentCanvasIndices.indexOf(this.searchResult.get(this.currentIndex).index) >= 0;
        this.isFirstHitPage = this.currentIndex <= 0;

        const lastCanvasIndex = this.searchResult.get(this.searchResult.size() - 1).index;
        const currentHit = this.searchResult.get(this.currentIndex);
        this.isLastHitPage = currentHit.index === lastCanvasIndex;
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
    const previousIndex = this.isHitOnActivePage ? this.currentIndex - 1 : this.currentIndex;
    let previousHit = this.findFirstHitOnPage(previousIndex)
    this.currentIndex = this.findCurrentHitIndex([previousHit.index]);
    this.iiifContentSearchService.selected(previousHit);
  }

  goToNextHitPage() {
    let nextHit: Hit;
    if (this.currentIndex === -1) {
      nextHit = this.searchResult.get(0);
    } else {
      const current = this.searchResult.get(this.currentIndex);
      nextHit = this.searchResult.hits.find(h => h.index > current.index);
    }

    this.currentIndex = this.findCurrentHitIndex([nextHit.index]);
    this.iiifContentSearchService.selected(nextHit);
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

}
