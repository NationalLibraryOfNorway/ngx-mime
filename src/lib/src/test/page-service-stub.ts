import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged } from 'rxjs/operators';

import { PageService } from '../core/page-service/page-service';

export class PageServiceStub extends PageService {
  _currentNumberOfPages: BehaviorSubject<number> = new BehaviorSubject(10);
  _currentPage: BehaviorSubject<number> = new BehaviorSubject(0);
  public _numberOfPages: number;

  get onPageChange(): Observable<number> {
    return this._currentPage.asObservable().pipe(distinctUntilChanged());
  }

  get onNumberOfPagesChange(): Observable<number> {
    return this._currentNumberOfPages.asObservable().pipe(distinctUntilChanged());
  }

  get numberOfTiles(): number {
    return this._currentNumberOfPages.value;
  }

  getTilesStringFromPageIndex(index: number): string {
    return '' + index;
  }

  set numberOfPages(numberOfPages: number) {
    this._numberOfPages = numberOfPages;
  }

  get numberOfPages(): number {
    return this._numberOfPages;
  }

  public getZoom(): number {
    return 0;
  }

  setPageChange(index: number) {
    this._currentPage.next(index);
  }
}
