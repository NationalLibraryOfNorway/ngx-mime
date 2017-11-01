import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { SearchResult, Hit } from './../core/models/search-result';

export class IiifContentSearchServiceStub {
  public _currentSearchResult: Subject<SearchResult> = new BehaviorSubject<SearchResult>(new SearchResult({}));
  public _searching: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public _currentQ: Subject<string> = new BehaviorSubject<string>(null);
  protected _selected: Subject<Hit> = new Subject<null>();

  get onQChange(): Observable<string> {
    return this._currentQ.asObservable().distinctUntilChanged();
  }

  get onChange(): Observable<SearchResult> {
    return this._currentSearchResult.asObservable();
  }

  get isSearching(): Observable<boolean> {
    return this._searching.asObservable();
  }

  get onSelected(): Observable<Hit> {
    return this._selected.asObservable();
  }

  public selected(hit: Hit) {
    this._selected.next(hit);
  }

  destroy() {
  }

}
