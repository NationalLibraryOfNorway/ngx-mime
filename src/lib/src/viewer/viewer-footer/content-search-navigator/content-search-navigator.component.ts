import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { SearchResult } from './../../../core/models/search-result';
import { Hit } from './../../../core/models/search-result';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
import { IiifContentSearchService } from './../../../core/iiif-content-search-service/iiif-content-search.service';
import { MimeViewerIntl } from './../../../core/viewer-intl';

@Component({
  selector: 'mime-content-search-navigator',
  templateUrl: './content-search-navigator.component.html',
  styleUrls: ['./content-search-navigator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentSearchNavigatorComponent implements OnInit {
  @Input() searchResult: SearchResult;
  public currentHitIndex: number;
  public isHitOnActivePage = false;
  public isFirstHitPage = false;
  public isLastHitPage = false;
  private subscriptions: Array<Subscription> = [];
  public currentIndex = 0;
  private canvasIndexes: number[];
  private currentCanvasIndex = -1;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public intl: MimeViewerIntl,
    private viewerService: ViewerService,
    private iiifContentSearchService: IiifContentSearchService) { }

  ngOnInit() {
    this.subscriptions.push(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));

    this.subscriptions.push(this.viewerService
      .onPageChange
      .subscribe((canvasIndex) => {
        this.currentCanvasIndex = canvasIndex;
        this.currentIndex = this.findCurrentHitIndex(canvasIndex);
        this.isHitOnActivePage = this.searchResult.get(this.currentIndex).index === canvasIndex;
        this.isFirstHitPage = this.currentIndex <= 0;

        const lastCanvasIndex = this.searchResult.get(this.searchResult.size() - 1).index;
        const currentHit = this.searchResult.get(this.currentIndex);
        this.isLastHitPage = currentHit.index === lastCanvasIndex;
        this.changeDetectorRef.detectChanges();
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  clear(): void {
    this.iiifContentSearchService.destroy();
  }

  findCurrentHitIndex(canvasIndex: number): number {
    for (let i = 0; i < this.searchResult.size(); i++) {
      const hit = this.searchResult.get(i);
      if (hit.index === canvasIndex) {
        return i;
      }
      if (hit.index >= canvasIndex) {
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

  goToPreviousHitPage() {
    let hit: Hit;
    if (this.isHitOnActivePage) {
      hit = this.searchResult.get(this.currentIndex - 1);
    } else {
      hit = this.searchResult.get(this.currentIndex);
    }
    this.currentIndex = this.findCurrentHitIndex(hit.index);
    this.viewerService.goToPage(hit.index);
  }

  goToNextHitPage() {
    let hit: Hit;
    if (this.currentIndex === -1) {
      hit = this.searchResult.get(0);
    } else {
      const current = this.searchResult.get(this.currentIndex);
      hit = this.searchResult.hits.find(h => h.index > current.index);
    }
    this.currentIndex = this.findCurrentHitIndex(hit.index);
    this.viewerService.goToPage(hit.index);
  }

}
