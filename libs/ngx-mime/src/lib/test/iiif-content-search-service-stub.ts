import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MimeViewerConfig } from '../..';
import { Hit } from './../core/models/hit';
import { SearchResult } from './../core/models/search-result';

export class IiifContentSearchServiceStub {
  public _currentSearchResult: Subject<SearchResult> =
    new BehaviorSubject<SearchResult>(new SearchResult({}));
  public _searching = new BehaviorSubject<boolean>(false);
  public _currentQ = new BehaviorSubject<string>('');
  protected _selected = new BehaviorSubject<Hit | null>(null);
  private config!: MimeViewerConfig;

  get onQChange(): Observable<string> {
    return this._currentQ.asObservable().pipe(distinctUntilChanged());
  }

  get onChange(): Observable<SearchResult> {
    return this._currentSearchResult.asObservable();
  }

  get isSearching(): Observable<boolean> {
    return this._searching.asObservable();
  }

  get onSelected(): Observable<Hit | null> {
    return this._selected.asObservable();
  }

  public selected(hit: Hit) {
    this._selected.next(hit);
  }

  public setConfig(config: MimeViewerConfig) {
    this.config = config;
  }

  destroy() {}
}
