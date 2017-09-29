import { Injectable } from '@angular/core';

@Injectable()
export class PageService {

  private _currentPage: number;
  private _numberOfPages: number;

  constructor() {
    this._currentPage = 0;
  }

  reset() {
    this._currentPage = 0;
  }

  set currentPage(currentPage: number) {
    if (!this.isWithinBounds(currentPage)) {
      return;
    }
    this._currentPage = currentPage;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set numberOfPages(numberOfPages: number) {
    this._numberOfPages = numberOfPages;
  }

  get numberOfPages(): number {
    return this._numberOfPages;
  }

  isWithinBounds(page: number): boolean {
    return (page > -1) && (page <= this.numberOfPages - 1);
  }

  isCurrentPageValid(): boolean {
    return this.isWithinBounds(this._currentPage);
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
      return this.numberOfPages;
    } else {
      return pageIndex;
    }
  }

}
