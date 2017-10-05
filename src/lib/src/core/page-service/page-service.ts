import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PageService {
  
  private _numberOfPages: number;
  private _currentPage: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {}

  reset() {
    this._currentPage.next(0);
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
      return this.numberOfPages;
    } else {
      return pageIndex;
    }
  }

}
