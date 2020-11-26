import { MatDialog } from '@angular/material/dialog';
export declare class CanvasGroupDialogService {
    private dialog;
    private isCanvasGroupDialogOpen;
    private dialogRef;
    private destroyed;
    constructor(dialog: MatDialog);
    initialize(): void;
    destroy(): void;
    open(timeout?: number): void;
    close(): void;
    toggle(): void;
    private getDialogConfig;
}
