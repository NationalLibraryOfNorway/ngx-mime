import { httpResource } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
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
  private readonly queryState = signal('');
  private readonly selectedHitState = signal<Hit | null>(null);
  private readonly searchRequestState = signal<
    { manifest: Manifest; query: string } | undefined
  >(undefined);
  private readonly searchResource = httpResource<SearchResult>(
    () => {
      const request = this.searchRequestState();
      const url = request?.manifest.service?.id;

      return request && url
        ? {
            url,
            params: { q: request.query },
          }
        : undefined;
    },
    {
      defaultValue: new SearchResult({}),
      parse: (response) => {
        const request = this.searchRequestState();

        return request
          ? this.extractData(
              request.query,
              request.manifest,
              response as IiifSearchResult,
            )
          : new SearchResult({});
      },
    },
  );
  private config!: MimeViewerConfig;

  constructor() {
    this.query = this.queryState.asReadonly();
    this.searchResult = this.searchResource.value;
    this.searching = this.searchResource.isLoading;
    this.selectedHit = this.selectedHitState.asReadonly();
    this.onChange = toObservable(this.searchResult);
    this.onSelected = toObservable(this.selectedHit);
  }

  destroy() {
    this.searchRequestState.set(undefined);
    this.searchResource.set(new SearchResult({}));
    this.queryState.set('');
    this.selectedHitState.set(null);
  }

  public search(manifest: Manifest, q: string): void {
    this.queryState.set(q);
    this.selectedHitState.set(null);
    this.searchResource.set(new SearchResult({}));

    if (q.length === 0 || !manifest.service?.id) {
      this.searchRequestState.set(undefined);
      return;
    }

    this.searchRequestState.set({ manifest, query: q });
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
}
