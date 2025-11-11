import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import {
  distinctUntilChanged,
  finalize,
  switchMap,
  take,
} from 'rxjs/operators';
import { SearchResultBuilder } from '../builders/iiif/search-result.builder';
import { MimeViewerConfig } from '../mime-viewer-config';
import { Hit } from './../models/hit';
import { IiifSearchResult } from './../models/iiif-search-result';
import { Manifest } from './../models/manifest';
import { SearchResult } from './../models/search-result';

@Injectable({providedIn: 'root'})
export class IiifContentSearchService {
  protected _currentSearchResult: Subject<SearchResult> =
    new BehaviorSubject<SearchResult>(new SearchResult({}));
  protected _searching = new BehaviorSubject<boolean>(false);
  protected _currentQ = new BehaviorSubject<string>('');
  protected _selected = new BehaviorSubject<Hit | null>(null);
  private readonly http = inject(HttpClient);
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

  destroy() {
    this._currentSearchResult.next(new SearchResult({}));
    this._searching.next(false);
    this._currentQ.next('');
    this._selected.next(null);
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
      .pipe(
        finalize(() => this._searching.next(false)),
        take(1),
        switchMap((res: IiifSearchResult) => {
          return of(this.extractData(q, manifest, res));
        }),
      )
      .subscribe(
        (res: SearchResult) => this._currentSearchResult.next(res),
        (err: HttpErrorResponse) => this.handleError,
      );
  }

  public selected(hit: Hit) {
    this._selected.next(hit);
  }

  public setConfig(config: MimeViewerConfig) {
    this.config = config;
  }

  private extractData(
    q: string,
    manifest: Manifest,
    iiifSearchResult: IiifSearchResult,
  ): SearchResult {
    return new SearchResultBuilder(
      q,
      manifest,
      iiifSearchResult,
      this.config,
    ).build();
  }

  private handleError(err: HttpErrorResponse | any) {
    let errMsg: string;
    if (err.error instanceof Error) {
      errMsg = err.error.message;
    } else {
      errMsg = err.error;
    }
    return throwError(errMsg);
  }
}
