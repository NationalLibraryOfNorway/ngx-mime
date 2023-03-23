import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Manifest } from './../core/models/manifest';
import * as i0 from "@angular/core";
export declare class ContentsDialogComponent implements OnInit, OnDestroy {
    intl: MimeViewerIntl;
    mediaObserver: MediaObserver;
    private cdr;
    private dialogRef;
    private changeDetectorRef;
    private iiifManifestService;
    manifest: Manifest | null;
    tabHeight: {};
    showToc: boolean;
    selectedIndex: number;
    private mimeHeight;
    private subscriptions;
    constructor(intl: MimeViewerIntl, mediaObserver: MediaObserver, cdr: ChangeDetectorRef, dialogRef: MatDialogRef<ContentsDialogComponent>, changeDetectorRef: ChangeDetectorRef, iiifManifestService: IiifManifestService, mimeResizeService: MimeResizeService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onCanvasChanged(): void;
    private resizeTabHeight;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContentsDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ContentsDialogComponent, "mime-contents", never, {}, {}, never, never, false, never>;
}
