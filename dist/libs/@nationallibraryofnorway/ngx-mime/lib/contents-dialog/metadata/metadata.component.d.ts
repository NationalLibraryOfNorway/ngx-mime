import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../../core/intl';
import { Manifest } from './../../core/models/manifest';
import * as i0 from "@angular/core";
export declare class MetadataComponent implements OnInit, OnDestroy {
    intl: MimeViewerIntl;
    private changeDetectorRef;
    private iiifManifestService;
    manifest: Manifest | null;
    private subscriptions;
    constructor(intl: MimeViewerIntl, changeDetectorRef: ChangeDetectorRef, iiifManifestService: IiifManifestService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MetadataComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MetadataComponent, "mime-metadata", never, {}, {}, never, never>;
}
