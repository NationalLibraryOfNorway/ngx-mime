import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MimeViewerConfig } from '../mime-viewer-config';
import { Hit } from './../models/hit';
import { Manifest } from './../models/manifest';
import { SearchResult } from './../models/search-result';
import * as i0 from "@angular/core";
export declare class IiifContentSearchService {
    private http;
    protected _currentSearchResult: Subject<SearchResult>;
    protected _searching: BehaviorSubject<boolean>;
    protected _currentQ: BehaviorSubject<string>;
    protected _selected: BehaviorSubject<Hit | null>;
    private config;
    constructor(http: HttpClient);
    destroy(): void;
    get onQChange(): Observable<string>;
    get onChange(): Observable<SearchResult>;
    get isSearching(): Observable<boolean>;
    get onSelected(): Observable<Hit | null>;
    search(manifest: Manifest, q: string): void;
    selected(hit: Hit): void;
    setConfig(config: MimeViewerConfig): void;
    private extractData;
    private handleError;
    static ɵfac: i0.ɵɵFactoryDeclaration<IiifContentSearchService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IiifContentSearchService>;
}
