import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { AltoService } from '../../core/alto-service/alto.service';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { HighlightService } from '../../core/highlight-service/highlight.service';
import { MimeViewerIntl } from '../../core/intl';
import * as i0 from "@angular/core";
export declare class RecognizedTextContentComponent implements OnInit, OnDestroy {
    intl: MimeViewerIntl;
    private cdr;
    private canvasService;
    private altoService;
    private iiifManifestService;
    private iiifContentSearchService;
    private highlightService;
    recognizedTextContentContainer: ElementRef;
    firstCanvasRecognizedTextContent: SafeHtml | undefined;
    secondCanvasRecognizedTextContent: SafeHtml | undefined;
    isLoading: boolean;
    error: string | undefined;
    selectedHit: number | undefined;
    private subscriptions;
    constructor(intl: MimeViewerIntl, cdr: ChangeDetectorRef, canvasService: CanvasService, altoService: AltoService, iiifManifestService: IiifManifestService, iiifContentSearchService: IiifContentSearchService, highlightService: HighlightService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private clearRecognizedText;
    private scrollToTop;
    private updateRecognizedText;
    updateCanvases(canvases: number[]): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecognizedTextContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecognizedTextContentComponent, "mime-recognized-text-content", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=recognized-text-content.component.d.ts.map