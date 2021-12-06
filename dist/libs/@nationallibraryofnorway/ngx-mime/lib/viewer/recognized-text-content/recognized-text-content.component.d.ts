import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { AltoService } from '../../core/alto-service/alto.service';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import * as i0 from "@angular/core";
export declare class RecognizedTextContentComponent implements OnInit, OnDestroy {
    intl: MimeViewerIntl;
    private cdr;
    private canvasService;
    private altoService;
    private iiifManifestService;
    recognizedTextContentContainer: ElementRef;
    firstCanvasRecognizedTextContent: SafeHtml | undefined;
    secondCanvasRecognizedTextContent: SafeHtml | undefined;
    isLoading: boolean;
    error: string | undefined;
    private subscriptions;
    constructor(intl: MimeViewerIntl, cdr: ChangeDetectorRef, canvasService: CanvasService, altoService: AltoService, iiifManifestService: IiifManifestService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private clearRecognizedText;
    private scrollToTop;
    private updateRecognizedText;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecognizedTextContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecognizedTextContentComponent, "mime-recognized-text-content", never, {}, {}, never, never>;
}
