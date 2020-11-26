import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SearchResult } from './../models/search-result';
import { Hit } from './../models/hit';
import { Manifest } from './../models/manifest';
export declare class IiifContentSearchService {
    private http;
    protected _currentSearchResult: Subject<SearchResult>;
    protected _searching: Subject<boolean>;
    protected _currentQ: Subject<string>;
    protected _selected: Subject<Hit>;
    constructor(http: HttpClient);
    destroy(): void;
    get onQChange(): Observable<string>;
    get onChange(): Observable<SearchResult>;
    get isSearching(): Observable<boolean>;
    get onSelected(): Observable<Hit>;
    search(manifest: Manifest, q: string): void;
    selected(hit: Hit): void;
    private extractData;
    private handleError;
}
