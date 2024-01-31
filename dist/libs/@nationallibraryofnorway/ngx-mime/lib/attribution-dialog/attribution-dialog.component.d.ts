import { AfterViewChecked, AfterViewInit, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { Manifest } from '../core/models/manifest';
import { StyleService } from '../core/style-service/style.service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import * as i0 from "@angular/core";
export declare class AttributionDialogComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
    intl: MimeViewerIntl;
    private renderer;
    private iiifManifestService;
    private attributionDialogResizeService;
    private styleService;
    private accessKeysHandlerService;
    manifest: Manifest | null;
    private subscriptions;
    container: ElementRef;
    constructor(intl: MimeViewerIntl, renderer: Renderer2, iiifManifestService: IiifManifestService, attributionDialogResizeService: AttributionDialogResizeService, styleService: StyleService, accessKeysHandlerService: AccessKeysService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    handleKeys(event: KeyboardEvent): void;
    onResize(event: any): void;
    ngAfterViewChecked(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AttributionDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AttributionDialogComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
