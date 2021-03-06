import { ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';
export declare class ContentSearchDialogService {
    private dialog;
    private contentSearchDialogConfigStrategyFactory;
    private mimeResizeService;
    private _el;
    private isContentSearchDialogOpen;
    private dialogRef;
    private subscriptions;
    constructor(dialog: MatDialog, contentSearchDialogConfigStrategyFactory: ContentSearchDialogConfigStrategyFactory, mimeResizeService: MimeResizeService);
    initialize(): void;
    destroy(): void;
    set el(el: ElementRef);
    open(): void;
    close(): void;
    toggle(): void;
    isOpen(): boolean;
    private getDialogConfig;
    private unsubscribe;
}
