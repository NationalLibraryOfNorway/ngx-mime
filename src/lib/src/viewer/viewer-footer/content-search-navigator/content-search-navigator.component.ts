import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

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
  private subscriptions: Array<Subscription> = [];
  public currentIndex = 0;
  private currentCanvasIndices = [-1];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public intl: MimeViewerIntl,
    private viewerService: ViewerService,
    private pageService: PageService,
    private iiifContentSearchService: IiifContentSearchService) { }

  ngOnInit() {
    this.subscriptions.push(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));

    this.subscriptions.push(this.pageService
      .onPageChange
      .subscribe((pageIndex) => {
        this.currentCanvasIndices = this.pageService.getTileArrayFromPageIndex(pageIndex);
        this.currentIndex = this.findCurrentHitIndex(this.currentCanvasIndices);
        this.isHitOnActivePage = this.currentCanvasIndices.indexOf(this.searchResult.get(this.currentIndex).index) >= 0;
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

  goToPreviousHitPage() {
    const previousIndex = this.isHitOnActivePage ? this.currentIndex - 1 : this.currentIndex;
    const previousCanvasIndex = this.searchResult.get(previousIndex).index;
    this.currentIndex = this.findCurrentHitIndex([previousCanvasIndex]);
    this.goToCanvasIndex(previousCanvasIndex);
  }

  goToNextHitPage() {
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

  private goToCanvasIndex(canvasIndex: number): void {
    this.viewerService.goToTile(canvasIndex, false);
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

}
