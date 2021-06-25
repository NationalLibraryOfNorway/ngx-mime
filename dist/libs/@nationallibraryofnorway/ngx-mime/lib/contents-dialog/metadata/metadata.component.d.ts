import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../../core/intl/viewer-intl';
import { Manifest } from './../../core/models/manifest';
export declare class MetadataComponent implements OnInit, OnDestroy {
    intl: MimeViewerIntl;
    private changeDetectorRef;
    private iiifManifestService;
    manifest: Manifest | null;
    private subscriptions;
    constructor(intl: MimeViewerIntl, changeDetectorRef: ChangeDetectorRef, iiifManifestService: IiifManifestService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
