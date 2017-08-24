import { Injectable } from '@angular/core';

@Injectable()
export class PageService {

  private _currentPage: number;
  private _numberOfPages: number;

  constructor() {
  }

  set currentPage(currentPage: number) {
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

  // Returns -1 if next page is out of bounds
  getNextPage(): number {
    if (this.currentPage + 1 > this.numberOfPages - 1) {
      return -1;
    }
    this.currentPage++;
    return this.currentPage;
  }

  // Returns -1 if previous page is out of bounds
  getPrevPage(): number {
    if (this.currentPage === 0) {
      return -1;
    }
    this.currentPage--;
    return this.currentPage;
  }

}
