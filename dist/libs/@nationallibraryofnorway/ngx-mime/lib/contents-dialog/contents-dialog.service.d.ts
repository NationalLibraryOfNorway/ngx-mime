import { ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContentsDialogConfigStrategyFactory } from './contents-dialog-config-strategy-factory';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
export declare class ContentsDialogService {
    private dialog;
    private contentsDialogConfigStrategyFactory;
    private mimeResizeService;
    private _el;
    private isContentsDialogOpen;
    private dialogRef;
    private destroyed;
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
}
