import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, of, throwError } from 'rxjs';
import { finalize, switchMap, take } from 'rxjs/operators';
import { SearchResultBuilder } from '../builders/iiif/search-result.builder';
import { MimeViewerConfig } from '../mime-viewer-config';
import { Hit } from './../models/hit';
import { IiifSearchResult } from './../models/iiif-search-result';
import { Manifest } from './../models/manifest';
import { SearchResult } from './../models/search-result';

@Injectable()
export class IiifContentSearchService {
  readonly query: Signal<string>;
  readonly searchResult: Signal<SearchResult>;
  readonly searching: Signal<boolean>;
  readonly selectedHit: Signal<Hit | null>;
  readonly onChange: Observable<SearchResult>;
  readonly onSelected: Observable<Hit | null>;
  private readonly http = inject(HttpClient);
  private readonly queryState = signal('');
  private readonly searchResultState = signal(new SearchResult({}));
  private readonly searchingState = signal(false);
  private readonly selectedHitState = signal<Hit | null>(null);
  private config!: MimeViewerConfig;

  constructor() {
    this.query = this.queryState.asReadonly();
    this.searchResult = this.searchResultState.asReadonly();
    this.searching = this.searchingState.asReadonly();
    this.selectedHit = this.selectedHitState.asReadonly();
    this.onChange = toObservable(this.searchResult);
    this.onSelected = toObservable(this.selectedHit);
  }

  destroy() {
    this.searchResultState.set(new SearchResult({}));
    this.searchingState.set(false);
    this.queryState.set('');
    this.selectedHitState.set(null);
  }

  public search(manifest: Manifest, q: string): void {
    this.queryState.set(q);
    this.selectedHitState.set(null);

    if (q.length === 0) {
      this.searchResultState.set(new SearchResult());

      return;
    }
    if (!manifest.service || manifest.service === null) {
      return;
    }
    this.searchingState.set(true);
    this.http
      .get(`${manifest.service.id}?q=${q}`)
      .pipe(
        finalize(() => this.searchingState.set(false)),
        take(1),
        switchMap((res: IiifSearchResult) => {
          return of(this.extractData(q, manifest, res));
        }),
      )
      .subscribe(
        (res: SearchResult) => this.searchResultState.set(res),
        (err: HttpErrorResponse) => this.handleError(err),
      );
  }

  public selected(hit: Hit) {
    this.selectedHitState.set(hit);
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
