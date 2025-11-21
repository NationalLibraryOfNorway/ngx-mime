import { Subject } from 'rxjs';
import * as i0 from '@angular/core';
import { EnvironmentProviders, OnInit, OnDestroy, OnChanges, EventEmitter, ViewContainerRef, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

declare enum Locales {
    ENGLISH = "en",
    NORWEGIAN = "nb",
    LITHUANIAN = "lt"
}

declare class HelpIntl {
    helpLabel: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    line6: string;
    line7: string;
    line8: string;
    line9: string;
    line10: string;
    line11: string;
    line12: string;
}

declare class MimeViewerIntl {
    changes: Subject<void>;
    help: HelpIntl;
    closeLabel: string;
    attributionLabel: string;
    attributonCloseAriaLabel: string;
    helpCloseAriaLabel: string;
    informationLabel: string;
    layoutMenuLabel: string;
    pageLayoutLabel: string;
    singlePageViewLabel: string;
    twoPageViewLabel: string;
    digitalTextLabel: string;
    recognizedTextContentCloseLabel: string;
    recognizedTextContentInSplitViewLabel: string;
    showRecognizedTextContentLabel: string;
    metadataLabel: string;
    licenseLabel: string;
    tocLabel: string;
    fullScreenLabel: string;
    exitFullScreenLabel: string;
    openOsdControlPanelLabel: string;
    closeOsdControlPanelLabel: string;
    zoomInLabel: string;
    zoomOutLabel: string;
    resetZoomLabel: string;
    previousPageLabel: string;
    nextPageLabel: string;
    rotateCwLabel: string;
    searchLabel: string;
    clearSearchLabel: string;
    previousHitLabel: string;
    nextHitLabel: string;
    goToPageLabel: string;
    currentPageLabel: string;
    enterPageNumber: string;
    dropDisabled: string;
    loading: string;
    rotationIsNotSupported: string;
    somethingHasGoneWrongLabel: string;
    manifestUriMissingLabel: string;
    manifestNotValidLabel: string;
    pageDoesNotExists: string;
    textContentErrorLabel: string;
    noResultsFoundLabel: (q: string) => string;
    resultsFoundLabel: (numberOfHits: number, q: string) => string;
    currentHitLabel: (currentHit: number, numberOfHits: number) => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MimeViewerIntl, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MimeViewerIntl>;
}

declare class HelpIntlLt extends HelpIntl {
    helpLabel: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    line6: string;
    line7: string;
    line8: string;
    line9: string;
    line10: string;
    line11: string;
    line12: string;
}

declare class MimeViewerIntlLt extends MimeViewerIntl {
    help: HelpIntlLt;
    closeLabel: string;
    attributionLabel: string;
    attributonCloseAriaLabel: string;
    helpCloseAriaLabel: string;
    informationLabel: string;
    layoutMenuLabel: string;
    pageLayoutLabel: string;
    singlePageViewLabel: string;
    twoPageViewLabel: string;
    digitalTextLabel: string;
    recognizedTextContentCloseLabel: string;
    recognizedTextContentInSplitViewLabel: string;
    showRecognizedTextContentLabel: string;
    metadataLabel: string;
    licenseLabel: string;
    tocLabel: string;
    fullScreenLabel: string;
    exitFullScreenLabel: string;
    openOsdControlPanelLabel: string;
    closeOsdControlPanelLabel: string;
    zoomInLabel: string;
    zoomOutLabel: string;
    resetZoomLabel: string;
    previousPageLabel: string;
    nextPageLabel: string;
    rotateCwLabel: string;
    searchLabel: string;
    clearSearchLabel: string;
    previousHitLabel: string;
    nextHitLabel: string;
    goToPageLabel: string;
    currentPageLabel: string;
    enterPageNumber: string;
    dropDisabled: string;
    loading: string;
    rotationIsNotSupported: string;
    somethingHasGoneWrongLabel: string;
    manifestUriMissingLabel: string;
    manifestNotValidLabel: string;
    pageDoesNotExists: string;
    textContentErrorLabel: string;
    noResultsFoundLabel: (q: string) => string;
    resultsFoundLabel: (numberOfHits: number, q: string) => string;
    currentHitLabel: (currentHit: number, numberOfHits: number) => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MimeViewerIntlLt, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MimeViewerIntlLt>;
}

declare class HelpIntlNoNb extends HelpIntl {
    helpLabel: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    line6: string;
    line7: string;
    line8: string;
    line9: string;
    line10: string;
    line11: string;
    line12: string;
}

declare class MimeViewerIntlNoNb extends MimeViewerIntl {
    help: HelpIntlNoNb;
    closeLabel: string;
    attributionLabel: string;
    attributonCloseAriaLabel: string;
    helpCloseAriaLabel: string;
    informationLabel: string;
    layoutMenuLabel: string;
    pageLayoutLabel: string;
    singlePageViewLabel: string;
    digitalTextLabel: string;
    twoPageViewLabel: string;
    recognizedTextContentCloseLabel: string;
    recognizedTextContentInSplitViewLabel: string;
    showRecognizedTextContentLabel: string;
    metadataLabel: string;
    licenseLabel: string;
    tocLabel: string;
    fullScreenLabel: string;
    exitFullScreenLabel: string;
    openOsdControlPanelLabel: string;
    closeOsdControlPanelLabel: string;
    zoomInLabel: string;
    zoomOutLabel: string;
    resetZoomLabel: string;
    previousPageLabel: string;
    nextPageLabel: string;
    rotateCwLabel: string;
    searchLabel: string;
    clearSearchLabel: string;
    previousHitLabel: string;
    nextHitLabel: string;
    goToPageLabel: string;
    currentPageLabel: string;
    enterPageNumber: string;
    dropDisabled: string;
    loading: string;
    rotationIsNotSupported: string;
    somethingHasGoneWrongLabel: string;
    manifestUriMissingLabel: string;
    manifestNotValidLabel: string;
    pageDoesNotExists: string;
    textContentErrorLabel: string;
    noResultsFoundLabel: (q: string) => string;
    resultsFoundLabel: (numberOfHits: number, q: string) => string;
    currentHitLabel: (currentHit: number, numberOfHits: number) => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MimeViewerIntlNoNb, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MimeViewerIntlNoNb>;
}

declare const provideMimeViewerIntl: (options?: {
    locale?: Locales;
}) => EnvironmentProviders;

declare enum ViewerMode {
    DASHBOARD = 0,
    PAGE = 1,
    PAGE_ZOOMED = 2,
    NAVIGATOR = 3
}

declare enum RecognizedTextMode {
    NONE = "NONE",
    ONLY = "ONLY",
    SPLIT = "SPLIT"
}

declare enum ViewerLayout {
    ONE_PAGE = 0,
    TWO_PAGE = 1
}

declare class MimeViewerConfig {
    attributionDialogEnabled?: boolean | undefined;
    attributionDialogHideTimeout?: number | undefined;
    navigationControlEnabled?: boolean | undefined;
    initViewerMode: ViewerMode;
    initViewerLayout: ViewerLayout;
    withCredentials: boolean;
    loadTilesWithAjax: boolean;
    crossOriginPolicy: 'Anonymous' | 'use-credentials' | false | undefined;
    ajaxHeaders: any;
    preserveZoomOnCanvasGroupChange: boolean;
    startOnTopOnCanvasGroupChange: boolean;
    isDropEnabled: boolean;
    initRecognizedTextContentMode: RecognizedTextMode;
    ignorePhysicalScale: boolean;
    constructor(fields?: {
        attributionDialogEnabled?: boolean;
        attributionDialogHideTimeout?: number;
        navigationControlEnabled?: boolean;
        initViewerMode?: ViewerMode;
        initViewerLayout?: ViewerLayout;
        withCredentials?: boolean;
        loadTilesWithAjax?: boolean;
        crossOriginPolicy?: 'Anonymous' | 'use-credentials' | false | undefined;
        ajaxHeaders?: any;
        preserveZoomOnCanvasGroupChange?: boolean;
        startOnTopOnCanvasGroupChange?: boolean;
        isDropEnabled?: boolean;
        initRecognizedTextContentMode?: RecognizedTextMode;
        ignorePhysicalScale?: boolean;
    });
}

declare enum ViewingDirection {
    LTR = "ltr",
    RTL = "rtl"
}

declare class Manifest {
    context?: string;
    type?: string;
    id?: string;
    viewingDirection: ViewingDirection;
    label: string;
    metadata?: Metadata[];
    license?: string;
    logo?: string;
    attribution?: string;
    service?: Service;
    sequences?: Sequence[];
    structures?: Structure[];
    tileSource?: Resource[];
    viewingHint?: string;
    constructor(fields?: {
        context?: string;
        type?: string;
        id?: string;
        viewingDirection?: ViewingDirection;
        label?: string;
        metadata?: Metadata[];
        license?: string;
        logo?: string;
        attribution?: string;
        service?: Service;
        sequences?: Sequence[];
        structures?: Structure[];
        tileSource?: Resource[];
        viewingHint?: string;
    });
}
declare class Metadata {
    label: string;
    value: string | number;
    constructor(label: string, value: string | number);
}
declare class Sequence {
    id?: string;
    type?: string;
    label?: string;
    viewingHint?: string;
    canvases?: Canvas[];
    constructor(fields?: {
        id?: string;
        type?: string;
        label?: string;
        viewingHint?: string;
        canvases?: Canvas[];
    });
}
declare class Canvas {
    id?: string;
    type?: string;
    label?: string;
    thumbnail?: string;
    height?: number;
    width?: number;
    images?: Images[];
    altoUrl?: string;
    constructor(fields?: {
        id?: string;
        type?: string;
        label?: string;
        thumbnail?: string;
        height?: number;
        width?: number;
        images?: Images[];
        altoUrl?: string;
    });
}
declare class Images {
    id?: string;
    type?: string;
    motivation?: string;
    resource?: Resource;
    on?: string;
    constructor(fields?: {
        id?: string;
        type?: string;
        motivation?: string;
        resource?: Resource;
        on?: string;
    });
}
declare class Resource {
    id: string;
    type?: string;
    format?: string;
    service?: Service;
    height: number;
    width: number;
    tileOverlap: number;
    constructor(fields?: {
        id: string;
        type?: string;
        format?: string;
        service?: Service;
        height?: number;
        width?: number;
        tileOverlap?: number;
    });
}
declare class Service {
    context?: string;
    id?: string;
    protocol?: string;
    width: number;
    height: number;
    sizes?: Size[];
    tiles?: Tile[];
    profile?: string;
    physicalScale?: number;
    physicalUnits?: string;
    service?: Service;
    constructor(fields?: {
        context?: string;
        id?: string;
        protocol?: string;
        width?: number;
        height?: number;
        sizes?: Size[];
        tiles?: Tile[];
        profile?: string;
        physicalScale?: number;
        physicalUnits?: string;
        service?: Service;
    });
}
declare class Size {
    width: number;
    height: number;
    constructor(width: number, height: number);
}
declare class Tile {
    width?: number;
    scaleFactors?: number[];
    constructor(fields?: {
        width?: number;
        scaleFactors?: number[];
    });
}
declare class Structure {
    id?: string;
    type: string;
    label?: string;
    canvases: string[];
    canvasIndex: number;
    constructor(fields?: {
        id?: string;
        type?: string;
        label?: string;
        canvases?: string[];
        canvasIndex: number;
    });
}

declare class ViewerComponent implements OnInit, OnDestroy, OnChanges {
    manifestUri: string | null;
    q: string;
    canvasIndex: number;
    config: MimeViewerConfig;
    tabIndex: number;
    viewerModeChanged: EventEmitter<ViewerMode>;
    canvasChanged: EventEmitter<number>;
    qChanged: EventEmitter<string>;
    manifestChanged: EventEmitter<Manifest>;
    recognizedTextContentModeChanged: EventEmitter<RecognizedTextMode>;
    private readonly header;
    private readonly footer;
    snackBar: MatSnackBar;
    intl: MimeViewerIntl;
    recognizedTextMode: typeof RecognizedTextMode;
    id: string;
    openseadragonId: string;
    recognizedTextContentMode: RecognizedTextMode;
    showHeaderAndFooterState: boolean;
    osdToolbarState: boolean;
    errorMessage: string | null;
    private readonly iiifManifestService;
    private readonly viewDialogService;
    private readonly informationDialogService;
    private readonly attributionDialogService;
    private readonly contentSearchDialogService;
    private readonly helpDialogService;
    private readonly viewerService;
    private readonly resizeService;
    private readonly changeDetectorRef;
    private readonly modeService;
    private readonly iiifContentSearchService;
    private readonly accessKeysHandlerService;
    private readonly canvasService;
    private readonly viewerLayoutService;
    private readonly styleService;
    private readonly altoService;
    private readonly canvasGroupDialogService;
    private readonly el;
    private readonly viewContainerRef;
    private readonly zone;
    private readonly platform;
    private readonly subscriptions;
    private isCanvasPressed;
    private currentManifest;
    private viewerLayout;
    private viewerState;
    constructor();
    get mimeHeaderBeforeRef(): ViewContainerRef;
    get mimeHeaderAfterRef(): ViewContainerRef;
    get mimeFooterBeforeRef(): ViewContainerRef;
    get mimeFooterAfterRef(): ViewContainerRef;
    handleKeys(event: KeyboardEvent): void;
    onDrop(event: any): void;
    onDragOver(event: any): void;
    onDragLeave(event: any): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    toggleToolbarsState(mode: ViewerMode): void;
    goToHomeZoom(): void;
    setClasses(): {
        'mode-page': boolean;
        'mode-page-zoomed': boolean;
        'mode-dashboard': boolean;
        'layout-one-page': boolean;
        'layout-two-page': boolean;
        'canvas-pressed': boolean;
        'broken-mix-blend-mode': boolean;
    };
    private loadManifest;
    private initialize;
    private cleanup;
    private resetCurrentManifest;
    private resetErrorMessage;
    private hasMixBlendModeSupport;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ViewerComponent, "mime-viewer", never, { "manifestUri": { "alias": "manifestUri"; "required": false; }; "q": { "alias": "q"; "required": false; }; "canvasIndex": { "alias": "canvasIndex"; "required": false; }; "config": { "alias": "config"; "required": false; }; "tabIndex": { "alias": "tabIndex"; "required": false; }; }, { "viewerModeChanged": "viewerModeChanged"; "canvasChanged": "canvasChanged"; "qChanged": "qChanged"; "manifestChanged": "manifestChanged"; "recognizedTextContentModeChanged": "recognizedTextContentModeChanged"; }, never, never, true, never>;
}

declare class MimeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MimeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MimeModule, never, [typeof ViewerComponent], [typeof ViewerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MimeModule>;
}

export { Locales, Manifest as MimeManifest, MimeModule, ViewerComponent as MimeViewerComponent, MimeViewerConfig, MimeViewerIntl, MimeViewerIntlLt, MimeViewerIntlNoNb, ViewerMode as MimeViewerMode, RecognizedTextMode, provideMimeViewerIntl };
