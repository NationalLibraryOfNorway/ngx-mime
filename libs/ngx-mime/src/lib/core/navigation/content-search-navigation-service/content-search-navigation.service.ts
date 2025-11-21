import { inject, Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { CanvasService } from '../../canvas-service/canvas-service';
import { IiifContentSearchService } from '../../iiif-content-search-service/iiif-content-search.service';
import { Hit } from '../../models/hit';
import { SearchResult } from '../../models/search-result';

@Injectable()
export class ContentSearchNavigationService {
  private readonly canvasService = inject(CanvasService);
  private readonly iiifContentSearchService = inject(IiifContentSearchService);
  private currentIndex = 0;
  private lastHitIndex = 0;
  private isHitOnActiveCanvasGroup = false;
  private currentHit: Hit | null = null;
  private canvasesPerCanvasGroup = [-1];
  private searchResult: SearchResult | null = null;
  private subscriptions!: Subscription;
  private readonly _currentHitCounter$: Subject<number> = new Subject<number>();

  constructor() {
    this.initialize();
  }

  get currentHitCounter(): Observable<number> {
    return this._currentHitCounter$.pipe(distinctUntilChanged());
  }

  initialize() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.iiifContentSearchService.onChange.subscribe(
        (result: SearchResult) => {
          this.searchResult = result;
          this.currentHit = null;
          this.update(this.canvasService.currentCanvasGroupIndex);
        },
      ),
    );
  }

  destroy() {
    this.subscriptions.unsubscribe();
  }

  update(canvasGroupIndex: number) {
    this.canvasesPerCanvasGroup =
      this.canvasService.getCanvasesPerCanvasGroup(canvasGroupIndex);
    this.currentIndex = this.findCurrentHitIndex(this.canvasesPerCanvasGroup);
    this.lastHitIndex = this.findLastHitIndex(this.canvasesPerCanvasGroup);
    this.isHitOnActiveCanvasGroup = this.findHitOnActiveCanvasGroup();
    this._currentHitCounter$.next(this.updateCurrentHitCounter());
  }

  getHitOnActiveCanvasGroup(): boolean {
    return this.isHitOnActiveCanvasGroup;
  }

  goToNextHit() {
    if (this.isCurrentHitOnCurrentCanvasGroup()) {
      this.goToNextCurrentCanvasHit();
    } else {
      this.goToNextCanvasHit();
    }
  }

  goToPreviousHit() {
    if (this.isCurrentHitOnCurrentCanvasGroup()) {
      this.goToPreviousCurrentCanvasHit();
    } else {
      this.goToPreviousCanvasHit();
    }
  }

  selected(hit: Hit): void {
    this.currentHit = hit;
    this._currentHitCounter$.next(this.currentHit.id);
    this.currentIndex = this.currentHit.index;
    this.iiifContentSearchService.selected(hit);
  }

  private updateCurrentHitCounter(): number {
    if (this.isCurrentHitOnCurrentCanvasGroup()) {
      if (this.currentHit) {
        return this.currentHit.id;
      }
    }
    if (this.isHitOnActiveCanvasGroup) {
      return this.currentIndex;
    } else {
      return this.lastHitIndex;
    }
  }

  private goToNextCurrentCanvasHit() {
    if (this.searchResult && this.currentHit) {
      const currentHitId = this.currentHit.id;
      if (currentHitId < this.searchResult.hits.length - 1) {
        this.selected(this.searchResult.hits[currentHitId + 1]);
      }
    }
  }

  private goToPreviousCurrentCanvasHit() {
    if (this.searchResult && this.currentHit) {
      const currentHitId = this.currentHit.id;
      if (currentHitId > 0) {
        this.selected(this.searchResult.hits[this.currentHit.id - 1]);
      }
    }
  }

  private goToNextCanvasHit() {
    if (this.searchResult) {
      let nextHit: Hit | undefined;
      if (this.currentIndex === -1) {
        nextHit = this.searchResult.get(0);
      } else {
        if (this.isHitOnActiveCanvasGroup) {
          nextHit = this.searchResult.hits.find(
            (hit) => hit.id === this.currentIndex,
          );
        } else {
          const current = this.searchResult.get(this.currentIndex);
          const canvasGroup = this.canvasService.findCanvasGroupByCanvasIndex(
            current.index,
          );
          const canvasesPerCanvasGroup =
            this.canvasService.getCanvasesPerCanvasGroup(canvasGroup);
          const lastCanvasGroupIndex = this.getLastCanvasGroupIndex(
            canvasesPerCanvasGroup,
          );
          nextHit = this.searchResult.hits.find(
            (h) => h.index > lastCanvasGroupIndex,
          );
        }
      }
      if (nextHit) {
        this.selected(nextHit);
      }
    }
  }

  private goToPreviousCanvasHit() {
    if (this.searchResult) {
      if (this.isHitOnActiveCanvasGroup) {
        this.selected(this.searchResult.hits[this.currentIndex]);
      } else {
        this.selected(this.searchResult.hits[this.lastHitIndex]);
      }
    }
  }

  private findHitOnActiveCanvasGroup(): boolean {
    if (!this.searchResult || this.currentIndex === -1) {
      return false;
    }
    return (
      this.canvasesPerCanvasGroup?.indexOf(
        this.searchResult.get(this.currentIndex).index,
      ) >= 0
    );
  }

  private findCurrentHitIndex(canvasGroupIndexes: number[]): number {
    if (!this.searchResult) {
      return -1;
    }

    if (canvasGroupIndexes) {
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
              (sr) => sr.index === phit.index,
            );
          }
        }
      }
    }
    return this.searchResult.size() - 1;
  }

  private findLastHitIndex(canvasGroupIndexes: number[]): number {
    if (!this.searchResult || !canvasGroupIndexes) {
      return -1;
    }
    const hits = this.searchResult.hits.filter(
      (hit) => hit.index < canvasGroupIndexes[0],
    );
    return hits.length > 0 ? hits[hits.length - 1].id : -1;
  }

  private getLastCanvasGroupIndex(canvasesPerCanvasGroup: number[]) {
    return canvasesPerCanvasGroup.length === 1
      ? canvasesPerCanvasGroup[0]
      : canvasesPerCanvasGroup[1];
  }

  private isCurrentHitOnCurrentCanvasGroup(): boolean {
    if (this.currentHit) {
      const canvasGroup = this.canvasService.findCanvasGroupByCanvasIndex(
        this.canvasService.currentCanvasIndex,
      );
      const canvasesPerCanvasGroup =
        this.canvasService.getCanvasesPerCanvasGroup(canvasGroup);
      return canvasesPerCanvasGroup.indexOf(this.currentHit.index) !== -1;
    } else {
      return false;
    }
  }
}
