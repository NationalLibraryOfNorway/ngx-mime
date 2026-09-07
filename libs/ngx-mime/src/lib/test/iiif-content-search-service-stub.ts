import { signal, Signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Manifest } from '../core/models/manifest';
import { Hit } from './../core/models/hit';
import { SearchResult } from './../core/models/search-result';

export class IiifContentSearchServiceStub {
  readonly query: Signal<string>;
  readonly searchResult: Signal<SearchResult>;
  readonly searching: Signal<boolean>;
  readonly selectedHit: Signal<Hit | null>;
  readonly onChange: Observable<SearchResult>;
  readonly onSelected: Observable<Hit | null>;
  private readonly querySignal = signal('');
  private readonly searchResultSignal = signal(new SearchResult({}));
  private readonly searchingSignal = signal(false);
  private readonly selectedHitSignal = signal<Hit | null>(null);
  private readonly searchResultState = new BehaviorSubject(
    this.searchResultSignal(),
  );
  private readonly selectedHitState = new BehaviorSubject(
    this.selectedHitSignal(),
  );

  constructor() {
    this.query = this.querySignal.asReadonly();
    this.searchResult = this.searchResultSignal.asReadonly();
    this.searching = this.searchingSignal.asReadonly();
    this.selectedHit = this.selectedHitSignal.asReadonly();
    this.onChange = this.searchResultState.asObservable();
    this.onSelected = this.selectedHitState.asObservable();
  }

  public selected(hit: Hit) {
    this.setSelected(hit);
  }

  public setConfig() {}

  destroy() {}

  search(_manifest: Manifest, query: string): void {
    this.setQuery(query);
  }

  setQuery(query: string): void {
    this.querySignal.set(query);
  }

  setSearchResult(searchResult: SearchResult): void {
    this.searchResultSignal.set(searchResult);
    this.searchResultState.next(searchResult);
  }

  setSelected(hit: Hit | null): void {
    this.selectedHitSignal.set(hit);
    this.selectedHitState.next(hit);
  }
}
