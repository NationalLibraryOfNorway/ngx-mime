import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { IiifContentSearchService } from './../../core/iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from './../../core/models/search-result';
import * as i0 from "@angular/core";
export declare class ViewerFooterComponent implements OnInit, OnDestroy {
    private breakpointObserver;
    private changeDetectorRef;
    private iiifContentSearchService;
    mimeFooterBefore: ViewContainerRef;
    mimeFooterAfter: ViewContainerRef;
    state: string;
    showNavigationToolbar: boolean;
    searchResult: SearchResult;
    showPageNavigator: boolean;
    showContentSearchNavigator: boolean;
    private subscriptions;
    constructor(breakpointObserver: BreakpointObserver, changeDetectorRef: ChangeDetectorRef, iiifContentSearchService: IiifContentSearchService);
    get footerState(): string;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private setupContentSearchObserver;
    private setupBreakpointObserver;
    private updateShowPageNavigator;
    private isHandsetPortrait;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewerFooterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ViewerFooterComponent, "mime-viewer-footer", never, {}, {}, never, never, false, never>;
}
