import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { CanvasService } from '../../../core/canvas-service/canvas-service';
import { IiifContentSearchService } from '../../../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../../core/intl/viewer-intl';
import { SearchResult } from '../../../core/models/search-result';
import { ContentSearchNavigationService } from '../../../core/navigation/content-search-navigation-service/content-search-navigation.service';
export declare class ContentSearchNavigatorComponent implements OnInit, OnDestroy {
    intl: MimeViewerIntl;
    private changeDetectorRef;
    private canvasService;
    private iiifContentSearchService;
    private contentSearchNavigationService;
    private iiifManifestService;
    searchResult: SearchResult;
    isHitOnActiveCanvasGroup: boolean;
    isFirstCanvasGroupHit: boolean;
    isLastCanvasGroupHit: boolean;
    currentIndex: number;
    invert: boolean;
    private subscriptions;
    constructor(intl: MimeViewerIntl, changeDetectorRef: ChangeDetectorRef, canvasService: CanvasService, iiifContentSearchService: IiifContentSearchService, contentSearchNavigationService: ContentSearchNavigationService, iiifManifestService: IiifManifestService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    clear(): void;
    goToPreviousCanvasGroupHit(): void;
    goToNextCanvasGroupHit(): void;
}
