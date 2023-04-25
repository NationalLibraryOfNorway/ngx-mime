import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl';
import { Manifest } from '../../core/models/manifest';
import { ViewerService } from '../../core/viewer-service/viewer.service';
import * as i0 from "@angular/core";
export declare class TocComponent implements OnInit, OnDestroy {
    intl: MimeViewerIntl;
    private changeDetectorRef;
    private iiifManifestService;
    private viewerService;
    private canvasService;
    canvasChanged: EventEmitter<number>;
    manifest: Manifest | null;
    currentCanvasGroupIndex: number;
    private subscriptions;
    constructor(intl: MimeViewerIntl, changeDetectorRef: ChangeDetectorRef, iiifManifestService: IiifManifestService, viewerService: ViewerService, canvasService: CanvasService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    goToCanvas(event: Event, canvasIndex: number | undefined): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TocComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TocComponent, "mime-toc", never, {}, { "canvasChanged": "canvasChanged"; }, never, never, false, never>;
}
