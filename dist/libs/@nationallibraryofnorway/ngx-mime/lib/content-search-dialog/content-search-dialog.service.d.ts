import { ElementRef, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';
import * as i0 from "@angular/core";
export declare class ContentSearchDialogService {
    private readonly dialog;
    private readonly contentSearchDialogConfigStrategyFactory;
    private readonly mimeResizeService;
    private _el;
    private _viewContainerRef;
    private dialogRef?;
    private subscriptions;
    constructor(dialog: MatDialog, contentSearchDialogConfigStrategyFactory: ContentSearchDialogConfigStrategyFactory, mimeResizeService: MimeResizeService);
    initialize(): void;
    destroy(): void;
    set el(el: ElementRef);
    set viewContainerRef(viewContainerRef: ViewContainerRef);
    open(): void;
    close(): void;
    toggle(): void;
    isOpen(): boolean;
    private getDialogConfig;
    private unsubscribe;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContentSearchDialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ContentSearchDialogService>;
}
