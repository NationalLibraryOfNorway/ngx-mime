import { ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import * as i0 from "@angular/core";
export declare class AttributionDialogService {
    private dialog;
    private mimeResizeService;
    private attributionDialogResizeService;
    private mimeDomHelper;
    private dialogRef?;
    private _el;
    private attributionDialogHeight;
    private subscriptions;
    constructor(dialog: MatDialog, mimeResizeService: MimeResizeService, attributionDialogResizeService: AttributionDialogResizeService, mimeDomHelper: MimeDomHelper);
    initialize(): void;
    destroy(): void;
    set el(el: ElementRef);
    open(timeout?: number): void;
    close(): void;
    toggle(): void;
    isOpen(): boolean;
    private closeDialogAfter;
    private getDialogConfig;
    private getPosition;
    private unsubscribe;
    static ɵfac: i0.ɵɵFactoryDeclaration<AttributionDialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AttributionDialogService>;
}
//# sourceMappingURL=attribution-dialog.service.d.ts.map