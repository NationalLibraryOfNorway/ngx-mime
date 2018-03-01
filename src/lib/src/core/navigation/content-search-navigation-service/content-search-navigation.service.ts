import { Injectable } from '@angular/core';

import { CanvasService } from '../../canvas-service/canvas-service';
import { IiifContentSearchService } from '../../iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from '../../models/search-result';
import { Hit } from '../../models/hit';

@Injectable()
export class ContentSearchNavigationService {
  private currentIndex = 0;
  private isHitOnActiveCanvasGroup = false;
  private _isFirstHitOnCanvasGroup = false;
  private _isLastHitOnCanvasGroup = false;
  private canvasesPerCanvasGroup = [-1];
  private searchResult: SearchResult;

  constructor(private canvasService: CanvasService, private iiifContentSearchService: IiifContentSearchService) {
    this.iiifContentSearchService.onChange.subscribe((result: SearchResult) => {
      this.searchResult = result;
    });
  }

  update(pageIndex: number) {
    this.canvasesPerCanvasGroup = this.canvasService.getCanvasesPerCanvasGroup(pageIndex);
    this.currentIndex = this.findCurrentHitIndex(this.canvasesPerCanvasGroup);
    this.isHitOnActiveCanvasGroup = this.findHitOnActiveCanvasGroup();
    this._isFirstHitOnCanvasGroup = this.isFirstHitOnCanvasGroup();
    this._isLastHitOnCanvasGroup = this.findLastHitOnCanvasGroup();
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }

  getHitOnActiveCanvasGroup(): boolean {
    return this.isHitOnActiveCanvasGroup;
  }

  getFirstHitCanvasGroup(): boolean {
    return this._isFirstHitOnCanvasGroup;
  }

  getLastHitCanvasGroup(): boolean {
    return this._isLastHitOnCanvasGroup;
  }

  goToNextCanvasGroupHit() {
    if (!this._isLastHitOnCanvasGroup) {
      let nextHit: Hit;
      if (this.currentIndex === -1) {
        nextHit = this.searchResult.get(0);
      } else {
        const current = this.searchResult.get(this.currentIndex);
        const canvasGroup = this.canvasService.findCanvasGroupByCanvasIndex(current.index);
        const canvasesPerCanvasGroup = this.canvasService.getCanvasesPerCanvasGroup(canvasGroup);
        const lastCanvasGroupIndex = this.getLastCanvasGroupIndex(canvasesPerCanvasGroup);
        nextHit = this.searchResult.hits.find(h => h.index > lastCanvasGroupIndex);
      }
      if (nextHit) {
        this.goToCanvasIndex(nextHit);
      }
    }
  }

  goToPreviousCanvasGroupHit() {
    const previousIndex = this.isHitOnActiveCanvasGroup ? this.currentIndex - 1 : this.currentIndex;
    const previousHit = this.findFirstHitOnCanvasGroup(previousIndex);
    this.goToCanvasIndex(previousHit);
  }

  private goToCanvasIndex(hit: Hit): void {
    this.currentIndex = this.findCurrentHitIndex([hit.index]);
    this.iiifContentSearchService.selected(hit);
  }

  private findLastHitOnCanvasGroup() {
    const lastCanvasIndex = this.searchResult.get(this.searchResult.size() - 1).index;
    const currentHit = this.searchResult.get(this.currentIndex);
    return currentHit.index === lastCanvasIndex;
  }

  private findFirstHitOnCanvasGroup(previousIndex: number): Hit {
    let previousHit = this.searchResult.get(previousIndex);
    const page = this.canvasService.findCanvasGroupByCanvasIndex(previousHit.index);
    const tiles = this.canvasService.getCanvasesPerCanvasGroup(page);
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

  private findHitOnActiveCanvasGroup() {
    return this.canvasesPerCanvasGroup.indexOf(this.searchResult.get(this.currentIndex).index) >= 0;
  }

  private findCurrentHitIndex(canvasGroupIndexes: number[]): number {
    for (let i = 0; i < this.searchResult.size(); i++) {
      const hit = this.searchResult.get(i);
      if (canvasGroupIndexes.indexOf(hit.index) >= 0) {
        return i;
      }
      if (hit.index >= canvasGroupIndexes[canvasGroupIndexes.length - 1]) {
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

  private isFirstHitOnCanvasGroup() {
    return this.currentIndex <= 0;
  }

  private getLastCanvasGroupIndex(canvasesPerCanvasGroup: number[]) {
    return canvasesPerCanvasGroup.length === 1 ? canvasesPerCanvasGroup[0] : canvasesPerCanvasGroup[1];
  }
}
