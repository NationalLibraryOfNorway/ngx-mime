import { OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MimeViewerIntl } from './../../core/intl/viewer-intl';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { Manifest } from './../../core/models/manifest';
export declare class MetadataComponent implements OnInit, OnDestroy {
    intl: MimeViewerIntl;
    private changeDetectorRef;
    private iiifManifestService;
    manifest: Manifest;
    private destroyed;
    constructor(intl: MimeViewerIntl, changeDetectorRef: ChangeDetectorRef, iiifManifestService: IiifManifestService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
