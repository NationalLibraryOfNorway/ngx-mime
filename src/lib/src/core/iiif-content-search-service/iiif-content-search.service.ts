import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { IiifSearchResult } from './../models/iiif-search-result';
import { SearchResultBuilder } from './../builders/search-result.builder';
import { SearchResult } from './../models/search-result';
import { Manifest } from './../models/manifest';

@Injectable()
export class IiifContentSearchService {
  protected _currentSearchResult: Subject<SearchResult> = new BehaviorSubject<SearchResult>(new SearchResult({}));
  protected _searching: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  destroy() {
    this._currentSearchResult.next(new SearchResult({}));
  }

  get onChange(): Observable<SearchResult> {
    return this._currentSearchResult.asObservable();
  }

  get isSearching(): Observable<boolean> {
    return this._searching.asObservable();
  }

  public search(manifest: Manifest, q: string): void {
    if (!q || q === null) {
      return;
    }
    if (!manifest.service || manifest.service === null) {
      return;
    }
    this._searching.next(true);
    this.http.get(`${manifest.service.id}?q=${q}`)
      .finally(() => this._searching.next(false))
      .subscribe(
      (res: IiifSearchResult) => this._currentSearchResult.next(this.extractData(q, manifest, res)),
      (err: HttpErrorResponse) => this.handleError
      );

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
