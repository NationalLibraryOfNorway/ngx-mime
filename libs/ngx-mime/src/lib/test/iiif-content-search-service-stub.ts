import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { SearchResult } from './../core/models/search-result';
import { Hit } from './../core/models/hit';

export class IiifContentSearchServiceStub {
  public _currentSearchResult: Subject<SearchResult> = new BehaviorSubject<
    SearchResult
  >(new SearchResult({}));
  public _searching: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public _currentQ: Subject<string> = new BehaviorSubject<string>(null);
  protected _selected: Subject<Hit> = new Subject<null>();

  get onQChange(): Observable<string> {
    return this._currentQ.asObservable().pipe(distinctUntilChanged());
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

  destroy() {}
}
