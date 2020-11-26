import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { Manifest } from '../../core/models/manifest';
import { ViewerService } from '../../core/viewer-service/viewer.service';
export declare class TocComponent implements OnInit, OnDestroy {
    intl: MimeViewerIntl;
    private changeDetectorRef;
    private iiifManifestService;
    private viewerService;
    private canvasService;
    canvasChanged: EventEmitter<number>;
    manifest: Manifest;
    currentCanvasGroupIndex: number;
    private destroyed;
    constructor(intl: MimeViewerIntl, changeDetectorRef: ChangeDetectorRef, iiifManifestService: IiifManifestService, viewerService: ViewerService, canvasService: CanvasService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    goToCanvas(event: Event, canvasIndex: number): void;
}
