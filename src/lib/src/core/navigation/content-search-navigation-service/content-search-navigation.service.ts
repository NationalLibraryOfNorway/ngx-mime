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
  private currentIndex = 0;
  private isHitOnActivePage = false;
  private isFirstHitPage = false;
  private isLastHitPage = false;
  private currentCanvasIndices = [-1];
  private searchResult: SearchResult;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private viewerService: ViewerService,
    private pageService: PageService,
    private iiifContentSearchService: IiifContentSearchService
  ) {
    this.init();
  }

  init() {
    this.subscriptions.push(
      this.iiifContentSearchService.onChange.subscribe((result: SearchResult) => {
        this.searchResult = result;
      })
    );
  }

  update(pageIndex: number) {
    this.currentCanvasIndices = this.pageService.getTileArrayFromPageIndex(pageIndex);
    this.currentIndex = this.findCurrentHitIndex(this.currentCanvasIndices);
    this.isHitOnActivePage = this.findHitOnActivePage();
    this.isFirstHitPage = this.findFirstHitPage();
    this.isLastHitPage = this.findLastHitPage();
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
    let nextCanvasIndex: number;
    if (this.currentIndex === -1) {
      nextCanvasIndex = this.searchResult.get(0).index;
    } else {
      const current = this.searchResult.get(this.currentIndex);
      nextCanvasIndex = this.searchResult.hits.find(h => h.index > current.index).index;
    }
    this.goToCanvasIndex(nextCanvasIndex);
  }

  public goToPreviousHitPage() {
    const previousIndex = this.isHitOnActivePage ? this.currentIndex - 1 : this.currentIndex;
    const previousCanvasIndex = this.searchResult.get(previousIndex).index;
    this.currentIndex = previousCanvasIndex;
    this.goToCanvasIndex(previousCanvasIndex);
  }

  private goToCanvasIndex(canvasIndex: number): void {
    this.currentIndex = this.findCurrentHitIndex([canvasIndex]);
    this.viewerService.goToTile(canvasIndex, false);
  }

  private findFirstHitPage() {
    return this.currentIndex <= 0;
  }

  private findLastHitPage() {
    const lastCanvasIndex = this.searchResult.get(this.searchResult.size() - 1).index;
    const currentHit = this.searchResult.get(this.currentIndex);
    return currentHit.index === lastCanvasIndex;
  }

  private findHitOnActivePage() {
    return this.currentCanvasIndices.indexOf(this.searchResult.get(this.currentIndex).index) >= 0;
  }

  private findCurrentHitIndex(canvasIndices: number[]): number {
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

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
