import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { PageRects } from './../models/page-rects';
import { ViewerLayout } from '../models/viewer-layout';
import { Point } from './../models/point';
import { Rect } from './../models/rect';


@Injectable()
export class PageService {

  private _numberOfPages: number;
  private _currentNumberOfPages: BehaviorSubject<number> = new BehaviorSubject(0);
  private _currentPage: BehaviorSubject<number> = new BehaviorSubject(0);

  private tileRects: Rect[];
  private pageRects: PageRects = new PageRects();
  private tileIndicesPerPage: number[][] = [];

  constructor() {}

  reset() {
    this._currentPage.next(0);
    this.pageRects = new PageRects();
    this.tileIndicesPerPage = [];
  }

  addPages(tileRects: Rect[], viewerLayout: ViewerLayout, paged: boolean) {
    this.tileRects = tileRects;
    if (viewerLayout === ViewerLayout.ONE_PAGE || !paged) {
      this.initialiseWithOneTilePerPage();
    } else {
      this.initialiseWithTwoTilesPerPage();
    }
    this._numberOfPages = this.pageRects.length();
    this._currentNumberOfPages.next(this._numberOfPages);
  }

  set currentPage(currentPage: number) {
    if (!this.isWithinBounds(currentPage)) {
      return;
    }
    this._currentPage.next(currentPage);
  }

  get currentPage(): number {
    return this._currentPage.value;
  }

  get onPageChange(): Observable<number> {
    return this._currentPage.asObservable().distinctUntilChanged();
  }

  get onNumberOfPagesChange(): Observable<number> {
    return this._currentNumberOfPages.asObservable().distinctUntilChanged();
  }

  get numberOfPages(): number {
    return this._numberOfPages;
  }

  get numberOfTiles(): number {
    if (!this.tileRects) {
      return 0;
    }

    return this.tileRects.length;
  }

  get currentTile(): number {
    return this.tileIndicesPerPage[this.currentPage][0];
  }

  isWithinBounds(page: number): boolean {
    return (page > -1) && (page <= this.numberOfPages - 1);
  }

  isCurrentPageValid(): boolean {
    return this.isWithinBounds(this.currentPage);
  }

  // Returns -1 if next page is out of bounds
  getNextPage(): number {
    if (!this.isWithinBounds(this.currentPage + 1)) {
      return -1;
    }
    this.currentPage++;
    return this.currentPage;
  }

  // Returns -1 if previous page is out of bounds
  getPrevPage(): number {
    if (!this.isWithinBounds(this.currentPage - 1)) {
      return -1;
    }
    this.currentPage--;
    return this.currentPage;
  }

  constrainToRange(pageIndex: number): number {
    if (pageIndex < 0) {
      return 0;
    } else if (pageIndex >= this.numberOfPages - 1) {
      return this.numberOfPages - 1;
    } else {
      return pageIndex;
    }
  }

  findClosestIndex(point: Point): number {
    return this.pageRects.findClosestIndex(point);
  }

  findPageByTileIndex(tileIndex: number): number {
    return this.tileIndicesPerPage.findIndex( function(tileIndicesForPage: number[]) {
      return tileIndicesForPage.indexOf(tileIndex) >= 0;
    });
  }

  getTilesStringFromPageIndex(index: number): string {
    if (!this.tileRects) {
      return '1';
    }

    if (this.tileIndicesPerPage.length === 0) {
      return '1';
    }

    const tileIndicesForPage = this.tileIndicesPerPage[index];
    let currentTiles = '' + (tileIndicesForPage[0] + 1);

    if (tileIndicesForPage.length > 1) {
      currentTiles = currentTiles + '-' + (tileIndicesForPage[tileIndicesForPage.length - 1] + 1);
    }

    return currentTiles;
  }

  getTileArrayFromPageIndex(index: number): number[] {
    if (!this.tileRects) {
      return [0];
    }

    return this.tileIndicesPerPage[index];
  }

  getTileRect(index: number): Rect {
    return this.tileRects[index];
  }

  getCurrentPageRect(): Rect {
    return this.getPageRect(this.currentPage);
  }

  getPageRect(index: number): Rect {
    return this.pageRects.get(index);
  }

  getMaxHeight(): number {
    return this.pageRects.getMaxHeight();
  }

  getMaxWidth(): number {
    return this.pageRects.getMaxWidth();
  }

  private initialiseWithOneTilePerPage() {
    this.pageRects.addRange(this.tileRects);
    for (let i = 0; i < this.tileRects.length; i++) {
      this.tileIndicesPerPage.push([i]);
    }
  }

  private initialiseWithTwoTilesPerPage() {

    // Single first page
    this.pageRects.add(this.tileRects[0]);
    this.tileIndicesPerPage.push([0]);

    for (let i = 1; i < this.tileRects.length; i = i + 2) {

      if ( i + 1 < this.tileRects.length ) {

        // Paired pages
        const thisRect = this.tileRects[i];
        const nextRect = this.tileRects[i + 1];
        const groupedRect = new Rect({
          x: thisRect.x,
          y: Math.min(thisRect.y, nextRect.y),
          height: Math.max(thisRect.height, nextRect.height),
          width: thisRect.width + nextRect.width
        });
        this.pageRects.add(groupedRect);
        this.tileIndicesPerPage.push([i, i + 1]);

      } else {

        // Single last page, if applicable
        this.pageRects.add(this.tileRects[i]);
        this.tileIndicesPerPage.push([i]);
      }
    }
  }

}
