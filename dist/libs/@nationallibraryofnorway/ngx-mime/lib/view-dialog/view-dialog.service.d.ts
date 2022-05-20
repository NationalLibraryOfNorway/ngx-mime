import { ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { ViewDialogConfigStrategyFactory } from './view-dialog-config-strategy-factory';
import * as i0 from "@angular/core";
export declare class ViewDialogService {
    private dialog;
    private viewDialogConfigStrategyFactory;
    private mimeResizeService;
    private _el;
    private dialogRef?;
    private subscriptions;
    constructor(dialog: MatDialog, viewDialogConfigStrategyFactory: ViewDialogConfigStrategyFactory, mimeResizeService: MimeResizeService);
    initialize(): void;
    destroy(): void;
    set el(el: ElementRef);
    open(): void;
    close(): void;
    toggle(): void;
    isOpen(): boolean;
    private getDialogConfig;
    private unsubscribe;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewDialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ViewDialogService>;
}
