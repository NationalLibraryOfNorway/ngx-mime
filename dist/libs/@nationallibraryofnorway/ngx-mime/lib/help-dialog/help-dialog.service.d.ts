import { ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { HelpDialogConfigStrategyFactory } from './help-dialog-config-strategy-factory';
import * as i0 from "@angular/core";
export declare class HelpDialogService {
    private dialog;
    private helpDialogConfigStrategyFactory;
    private mimeResizeService;
    private _el;
    private isHelpDialogOpen;
    private dialogRef;
    private subscriptions;
    constructor(dialog: MatDialog, helpDialogConfigStrategyFactory: HelpDialogConfigStrategyFactory, mimeResizeService: MimeResizeService);
    initialize(): void;
    destroy(): void;
    set el(el: ElementRef);
    open(): void;
    close(): void;
    toggle(): void;
    isOpen(): boolean;
    private getDialogConfig;
    private unsubscribe;
    static ɵfac: i0.ɵɵFactoryDeclaration<HelpDialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HelpDialogService>;
}
