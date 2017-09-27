import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SearchResult } from './../../../core/models/search-result';
import { Hit } from './../../../core/models/iiif-search-result';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
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
    private viewerService: ViewerService) { }

  ngOnInit() {
    this.subscriptions.push(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));

    this.subscriptions.push(this.viewerService
      .onPageChange
      .switchMap((canvasIndex: number, index: number) => {
        this.currentCanvasIndex = canvasIndex;
        this.currentIndex = this.findCurrentHitIndex(canvasIndex);
        this.isHitOnActivePage = this.searchResult.get(this.currentIndex).index === canvasIndex;
        this.isFirstHitPage = this.currentIndex <= 0;
  
        const lastCanvasIndex = this.searchResult.get(this.searchResult.size() - 1).index;
        const currentHit = this.searchResult.get(this.currentIndex);
        this.isLastHitPage = currentHit.index === lastCanvasIndex;
        this.changeDetectorRef.detectChanges();
        return Observable.of(canvasIndex);
      })
      .subscribe((canvasIndex: number) => {
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
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
          const prev = this.searchResult.hits.findIndex(sr => sr.index === phit.index);
          return prev;
        }
      }
    }
    return -1;
  }

  goToPreviousHitPage() {
    if (this.isHitOnActivePage) {
      const hit = this.searchResult.get(this.currentIndex - 1);
      this.viewerService.goToPage(hit.index);
    } else {
      const hit = this.searchResult.get(this.currentIndex);
      this.viewerService.goToPage(hit.index);
    }
    this.changeDetectorRef.detectChanges();
  }

  goToNextHitPage() {
    if (this.currentIndex === -1) {
      const first = this.searchResult.get(0);
      this.viewerService.goToPage(first.index);
    } else {
      const current = this.searchResult.get(this.currentIndex);
      const next = this.searchResult.hits.find(h => h.index > current.index);
      this.viewerService.goToPage(next.index);
    }
    this.changeDetectorRef.detectChanges();
  }

}
