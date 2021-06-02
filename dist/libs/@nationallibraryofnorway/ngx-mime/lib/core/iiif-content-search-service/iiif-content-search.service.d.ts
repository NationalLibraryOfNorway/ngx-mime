import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Hit } from './../models/hit';
import { Manifest } from './../models/manifest';
import { SearchResult } from './../models/search-result';
export declare class IiifContentSearchService {
    private http;
    protected _currentSearchResult: Subject<SearchResult>;
    protected _searching: BehaviorSubject<boolean>;
    protected _currentQ: BehaviorSubject<string>;
    protected _selected: BehaviorSubject<Hit>;
    constructor(http: HttpClient);
    destroy(): void;
    get onQChange(): Observable<string>;
    get onChange(): Observable<SearchResult>;
    get isSearching(): Observable<boolean>;
    get onSelected(): Observable<Hit | null>;
    search(manifest: Manifest, q: string): void;
    selected(hit: Hit): void;
    private extractData;
    private handleError;
}
