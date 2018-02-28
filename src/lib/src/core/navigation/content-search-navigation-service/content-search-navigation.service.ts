import { Injectable } from '@angular/core';

import { CanvasService } from '../../canvas-service/canvas-service';
import { IiifContentSearchService } from '../../iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from '../../models/search-result';
import { Hit } from '../../models/hit';

@Injectable()
export class ContentSearchNavigationService {
  private currentIndex = 0;
  private isHitOnActivePage = false;
  private isFirstHitPage = false;
  private isLastHitPage = false;
  private currentCanvasIndices = [-1];
  private searchResult: SearchResult;

  constructor(private pageService: CanvasService, private iiifContentSearchService: IiifContentSearchService) {
    this.iiifContentSearchService.onChange.subscribe((result: SearchResult) => {
      this.searchResult = result;
    });
  }

  update(pageIndex: number) {
    this.currentCanvasIndices = this.pageService.getCanvasesPerCanvasGroup(pageIndex);
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
    if (!this.isLastHitPage) {
      let nextHit: Hit;
      if (this.currentIndex === -1) {
        nextHit = this.searchResult.get(0);
      } else {
        const current = this.searchResult.get(this.currentIndex);
        const page = this.pageService.findCanvasGroupByCanvasIndex(current.index);
        const tiles = this.pageService.getCanvasesPerCanvasGroup(page);
        const lastPageIndex = this.getLastPageIndex(tiles);
        nextHit = this.searchResult.hits.find(h => h.index > lastPageIndex);
      }
      if (nextHit) {
        this.goToCanvasIndex(nextHit);
      }
    }
  }

  public goToPreviousHitPage() {
    const previousIndex = this.isHitOnActivePage ? this.currentIndex - 1 : this.currentIndex;
    const previousHit = this.findFirstHitOnPage(previousIndex);
    this.goToCanvasIndex(previousHit);
  }

  private goToCanvasIndex(hit: Hit): void {
    this.currentIndex = this.findCurrentHitIndex([hit.index]);
    this.iiifContentSearchService.selected(hit);
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

  private findFirstHitOnPage(previousIndex: number): Hit {
    let previousHit = this.searchResult.get(previousIndex);
    const page = this.pageService.findCanvasGroupByCanvasIndex(previousHit.index);
    const tiles = this.pageService.getCanvasesPerCanvasGroup(page);
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
