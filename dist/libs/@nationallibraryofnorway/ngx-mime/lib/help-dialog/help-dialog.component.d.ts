import { OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
export declare class HelpDialogComponent implements OnInit, OnDestroy {
    mediaObserver: MediaObserver;
    intl: MimeViewerIntl;
    private mimeResizeService;
    tabHeight: {};
    private mimeHeight;
    private subscriptions;
    constructor(mediaObserver: MediaObserver, intl: MimeViewerIntl, mimeResizeService: MimeResizeService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private resizeTabHeight;
}
