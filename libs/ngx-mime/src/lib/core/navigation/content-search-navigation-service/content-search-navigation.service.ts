import { Injectable } from '@angular/core';

import { CanvasService } from '../../canvas-service/canvas-service';
import { IiifContentSearchService } from '../../iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from '../../models/search-result';
import { Hit } from '../../models/hit';
import { Subscription } from 'rxjs';

@Injectable()
export class ContentSearchNavigationService {
  private currentIndex = 0;
  private isHitOnActiveCanvasGroup = false;
  private _isFirstHitOnCanvasGroup = false;
  private _isLastHitOnCanvasGroup = false;
  private canvasesPerCanvasGroup = [-1];
  private searchResult: SearchResult | null = null;
  private subscriptions!: Subscription;

  constructor(
    private canvasService: CanvasService,
    private iiifContentSearchService: IiifContentSearchService
  ) {
    this.initialize();
  }

  initialize() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.iiifContentSearchService.onChange.subscribe(
        (result: SearchResult) => {
          this.searchResult = result;
        }
      )
    );
  }

  destroy() {
    this.subscriptions.unsubscribe();
  }

  update(canvasGroupIndex: number) {
    this.canvasesPerCanvasGroup = this.canvasService.getCanvasesPerCanvasGroup(
      canvasGroupIndex
    );
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
    if (this.searchResult && !this._isLastHitOnCanvasGroup) {
      let nextHit: Hit | undefined;
      if (this.currentIndex === -1) {
        nextHit = this.searchResult.get(0);
      } else {
        const current = this.searchResult.get(this.currentIndex);
        const canvasGroup = this.canvasService.findCanvasGroupByCanvasIndex(
          current.index
        );
        const canvasesPerCanvasGroup = this.canvasService.getCanvasesPerCanvasGroup(
          canvasGroup
        );
        const lastCanvasGroupIndex = this.getLastCanvasGroupIndex(
          canvasesPerCanvasGroup
        );
        nextHit = this.searchResult.hits.find(
          (h) => h.index > lastCanvasGroupIndex
        );
      }
      if (nextHit) {
        this.goToCanvasIndex(nextHit);
      }
    }
  }

  goToPreviousCanvasGroupHit() {
    const previousIndex = this.isHitOnActiveCanvasGroup
      ? this.currentIndex - 1
      : this.currentIndex;
    const previousHit = this.findFirstHitOnCanvasGroup(previousIndex);
    if (previousHit) {
      this.goToCanvasIndex(previousHit);
    }
  }

  private goToCanvasIndex(hit: Hit): void {
    this.currentIndex = this.findCurrentHitIndex([hit.index]);
    this.iiifContentSearchService.selected(hit);
  }

  private findLastHitOnCanvasGroup(): boolean {
    if (!this.searchResult) {
      return false;
    }
    const lastCanvasIndex = this.searchResult.get(this.searchResult.size() - 1)
      .index;
    const currentHit = this.searchResult.get(this.currentIndex);
    return currentHit.index === lastCanvasIndex;
  }

  private findFirstHitOnCanvasGroup(previousIndex: number): Hit | undefined {
    if (!this.searchResult) {
      return;
    }
    let previousHit: Hit | undefined = this.searchResult.get(previousIndex);
    const canvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(
      previousHit.index
    );
    const canvasesPerCanvasGroup = this.canvasService.getCanvasesPerCanvasGroup(
      canvasGroupIndex
    );
    const leftCanvas = canvasesPerCanvasGroup[0];
    const leftCanvasHit = this.searchResult.hits.find(
      (h) => h.index === leftCanvas
    );
    if (leftCanvasHit) {
      previousHit = leftCanvasHit;
    } else if (canvasesPerCanvasGroup.length === 2) {
      const rightCanvas = canvasesPerCanvasGroup[1];
      previousHit = this.searchResult.hits.find((h) => h.index === rightCanvas);
    }
    return previousHit;
  }

  private findHitOnActiveCanvasGroup(): boolean {
    if (!this.searchResult) {
      return false;
    }
    return (
      this.canvasesPerCanvasGroup.indexOf(
        this.searchResult.get(this.currentIndex).index
      ) >= 0
    );
  }

  private findCurrentHitIndex(canvasGroupIndexes: number[]): number {
    if (!this.searchResult) {
      return -1;
    }

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
          return this.searchResult.hits.findIndex(
            (sr) => sr.index === phit.index
          );
        }
      }
    }
    return this.searchResult.size() - 1;
  }

  private isFirstHitOnCanvasGroup() {
    return this.currentIndex <= 0;
  }

  private getLastCanvasGroupIndex(canvasesPerCanvasGroup: number[]) {
    return canvasesPerCanvasGroup.length === 1
      ? canvasesPerCanvasGroup[0]
      : canvasesPerCanvasGroup[1];
  }
}
