import { ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { ContentsDialogConfigStrategyFactory } from './contents-dialog-config-strategy-factory';
import * as i0 from "@angular/core";
export declare class ContentsDialogService {
    private dialog;
    private contentsDialogConfigStrategyFactory;
    private mimeResizeService;
    private _el;
    private dialogRef?;
    private subscriptions;
    constructor(dialog: MatDialog, contentsDialogConfigStrategyFactory: ContentsDialogConfigStrategyFactory, mimeResizeService: MimeResizeService);
    initialize(): void;
    destroy(): void;
    set el(el: ElementRef);
    open(selectedIndex?: number): void;
    close(): void;
    toggle(): void;
    isOpen(): boolean;
    getSelectedIndex(): number;
    private getDialogConfig;
    private unsubscribe;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContentsDialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ContentsDialogService>;
}
