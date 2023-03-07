import { MatDialog } from '@angular/material/dialog';
import * as i0 from "@angular/core";
export declare class CanvasGroupDialogService {
    private dialog;
    private dialogRef?;
    constructor(dialog: MatDialog);
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
//# sourceMappingURL=canvas-group-dialog.service.d.ts.map