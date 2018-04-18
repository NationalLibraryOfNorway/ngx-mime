import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, finalize } from 'rxjs/operators';

import { IiifSearchResult } from './../models/iiif-search-result';
import { SearchResultBuilder } from './../builders/search-result.builder';
import { SearchResult } from './../models/search-result';
import { Hit } from './../models/hit';
import { Manifest } from './../models/manifest';

@Injectable()
export class IiifContentSearchService {
  protected _currentSearchResult: Subject<SearchResult> = new BehaviorSubject<SearchResult>(new SearchResult({}));
  protected _searching: Subject<boolean> = new BehaviorSubject<boolean>(false);
  protected _currentQ: Subject<string> = new Subject<string>();
  protected _selected: Subject<Hit> = new BehaviorSubject<Hit>(null);

  constructor(private http: HttpClient) {}

  destroy() {
    this._currentSearchResult.next(new SearchResult({}));
    this._selected.next(null);
  }

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

  public search(manifest: Manifest, q: string): void {
    this._currentQ.next(q);
    this._selected.next(null);
    if (q.length === 0) {
      this._currentSearchResult.next(new SearchResult());
      return;
    }
    if (!manifest.service || manifest.service === null) {
      return;
    }
    this._searching.next(true);
    this.http
      .get(`${manifest.service.id}?q=${q}`)
      .pipe(finalize(() => this._searching.next(false)))
      .subscribe(
        (res: IiifSearchResult) => this._currentSearchResult.next(this.extractData(q, manifest, res)),
        (err: HttpErrorResponse) => this.handleError
      );
  }

  public selected(hit: Hit) {
    this._selected.next(hit);
  }

  private extractData(q: string, manifest: Manifest, iiifSearchResult: IiifSearchResult): SearchResult {
    return new SearchResultBuilder(q, manifest, iiifSearchResult).build();
  }

  private handleError(err: HttpErrorResponse | any) {
    let errMsg: string;
    if (err.error instanceof Error) {
      errMsg = err.error.message;
    } else {
      errMsg = err.error;
    }
    return Observable.throw(errMsg);
  }
}
