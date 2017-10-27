import { Injectable, OnDestroy } from '@angular/core';
import { ViewerService } from '../../viewer-service/viewer.service';
import { PageService } from '../../page-service/page-service';
import { Subscription } from 'rxjs/Subscription';
import { IiifContentSearchService } from '../../iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from '../../models/search-result';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContentSearchNavigationService implements OnDestroy {
  protected _currentHitIndex: Subject<number> = new BehaviorSubject(0);
  private currentIndex = 0;
  private isHitOnActivePage = false;
  private isFirstHitPage = false;
  private isLastHitPage = false;
  private currentCanvasIndices = [-1];
  private searchResult: SearchResult;
  private subscriptions: Array<Subscription> = [];
  private pageIndex = 0;

  constructor(
    private viewerService: ViewerService,
    private pageService: PageService,
    private iiifContentSearchService: IiifContentSearchService
  ) {
    console.log('ContentSearchNavigationService - constructor');
    this.init();
  }

  init() {
    console.log('ContentSearchNavigationService - init()');
    this.subscriptions.push(
      this.iiifContentSearchService.onChange.subscribe((result: SearchResult) => {
        console.log('Content search result update');
        this.searchResult = result;
        this.currentCanvasIndices = this.pageService.getTileArrayFromPageIndex(this.pageIndex);
        this.currentIndex = this.findCurrentHitIndex(this.currentCanvasIndices);
        console.log('CurrentIndex: ' + this.currentIndex);
        this.isHitOnActivePage = this.currentCanvasIndices.indexOf(this.searchResult.get(this.currentIndex).index) >= 0;
        this.isFirstHitPage = this.currentIndex <= 0;

        const lastCanvasIndex = this.searchResult.get(this.searchResult.size() - 1).index;
        const currentHit = this.searchResult.get(this.currentIndex);
        this.isLastHitPage = currentHit.index === lastCanvasIndex;

        console.log(this.isHitOnActivePage + ' :: ' + this.isFirstHitPage + ' :: ' + this.isLastHitPage);
        this._currentHitIndex.next(this.currentIndex);
      })
    );

    this.subscriptions.push(
      this.pageService.onPageChange.subscribe((pageIndex: number) => {
        console.log('onPageChange');
        this.pageIndex = pageIndex;
        this.currentCanvasIndices = this.pageService.getTileArrayFromPageIndex(this.pageIndex);
        this.currentIndex = this.findCurrentHitIndex(this.currentCanvasIndices);
        this.isHitOnActivePage = this.currentCanvasIndices.indexOf(this.searchResult.get(this.currentIndex).index) >= 0;
        this.isFirstHitPage = this.currentIndex <= 0;

        const lastCanvasIndex = this.searchResult.get(this.searchResult.size() - 1).index;
        const currentHit = this.searchResult.get(this.currentIndex);
        this.isLastHitPage = currentHit.index === lastCanvasIndex;

        this._currentHitIndex.next(this.currentIndex);
      })
    );
  }

  private reset() {
    this.currentIndex = 0;
    this.isHitOnActivePage = false;
    this.isFirstHitPage = false;
    this.isLastHitPage = false;
    this.currentCanvasIndices = [-1];
  }

  get onCurrentIndexChange(): Observable<number> {
    return this._currentHitIndex.asObservable();
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }

  getHitOnActivePage(): boolean {
    return this.isHitOnActivePage;
  }

  getFirstHitPage(): boolean {
    return this.isFirstHitPage;
  }

  getLastHitPage(): boolean {
    return this.isLastHitPage;
  }

  public goToNextHitPage() {
    console.log('goToNextHitPage');
    let nextCanvasIndex: number;
    if (this.currentIndex === -1) {
      nextCanvasIndex = this.searchResult.get(0).index;
    } else {
      const current = this.searchResult.get(this.currentIndex);
      nextCanvasIndex = this.searchResult.hits.find(h => h.index > current.index).index;
    }
    this.currentIndex = this.findCurrentHitIndex([nextCanvasIndex]);
    this.goToCanvasIndex(nextCanvasIndex);
  }

  public goToPreviousHitPage() {
    console.log('goToPreviousHitPage');
    const previousIndex = this.isHitOnActivePage ? this.currentIndex - 1 : this.currentIndex;
    const previousCanvasIndex = this.searchResult.get(previousIndex).index;
    this.currentIndex = this.findCurrentHitIndex([previousCanvasIndex]);
    this.goToCanvasIndex(previousCanvasIndex);
  }

  private goToCanvasIndex(canvasIndex: number): void {
    this.viewerService.goToTile(canvasIndex, false);
  }

  private findCurrentHitIndex(canvasIndices: number[]): number {
    for (let i = 0; i < this.searchResult.size(); i++) {
      const hit = this.searchResult.get(i);
      console.log('hitIndex: ' + hit.index);
      if (canvasIndices.indexOf(hit.index) >= 0) {
        console.log('1');
        return i;
      }
      if (hit.index >= canvasIndices[canvasIndices.length - 1]) {
        if (i === 0) {
          console.log('2');
          return -1;
        } else {
          console.log('3');
          const phit = this.searchResult.get(i - 1);
          return this.searchResult.hits.findIndex(sr => sr.index === phit.index);
        }
      }
    }
    console.log('4');
    return this.searchResult.size() - 1;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
