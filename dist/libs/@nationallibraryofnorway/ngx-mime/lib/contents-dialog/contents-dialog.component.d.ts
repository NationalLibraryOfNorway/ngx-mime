import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Manifest } from './../core/models/manifest';
export declare class ContentsDialogComponent implements OnInit, OnDestroy {
    intl: MimeViewerIntl;
    mediaObserver: MediaObserver;
    private dialogRef;
    private el;
    private mimeDomHelper;
    private changeDetectorRef;
    private iiifManifestService;
    manifest: Manifest | null;
    tabHeight: {};
    showToc: boolean;
    selectedIndex: number;
    private mimeHeight;
    private subscriptions;
    constructor(intl: MimeViewerIntl, mediaObserver: MediaObserver, dialogRef: MatDialogRef<ContentsDialogComponent>, el: ElementRef, mimeDomHelper: MimeDomHelper, changeDetectorRef: ChangeDetectorRef, iiifManifestService: IiifManifestService, mimeResizeService: MimeResizeService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onResize(event: any): void;
    onCanvasChanged(): void;
    private resizeTabHeight;
}
