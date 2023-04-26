import { ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as i0 from "@angular/core";
export declare class CanvasGroupDialogService {
    private dialog;
    private dialogRef?;
    private _viewContainerRef;
    constructor(dialog: MatDialog);
    set viewContainerRef(viewContainerRef: ViewContainerRef);
    initialize(): void;
    destroy(): void;
    open(): void;
    close(): void;
    toggle(): void;
    isOpen(): boolean;
    private getDialogConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<CanvasGroupDialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CanvasGroupDialogService>;
}
