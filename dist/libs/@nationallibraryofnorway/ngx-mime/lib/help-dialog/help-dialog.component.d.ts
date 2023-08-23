import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import * as i0 from "@angular/core";
export declare class HelpDialogComponent implements OnInit, OnDestroy {
    intl: MimeViewerIntl;
    private cdr;
    private mimeResizeService;
    private breakpointObserver;
    tabHeight: {};
    isHandsetOrTabletInPortrait: boolean;
    private mimeHeight;
    private subscriptions;
    constructor(intl: MimeViewerIntl, cdr: ChangeDetectorRef, mimeResizeService: MimeResizeService, breakpointObserver: BreakpointObserver);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private resizeTabHeight;
    static ɵfac: i0.ɵɵFactoryDeclaration<HelpDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HelpDialogComponent, "mime-help", never, {}, {}, never, never, false, never>;
}
