import { ElementRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MimeDomHelper } from '../core/mime-dom-helper';
export interface ViewDialogConfigStrategy {
    getConfig(elementRef?: ElementRef | null): MatDialogConfig;
}
export declare class MobileViewDialogConfigStrategy implements ViewDialogConfigStrategy {
    getConfig(elementRef: ElementRef): MatDialogConfig;
}
export declare class DesktopViewDialogConfigStrategy implements ViewDialogConfigStrategy {
    static readonly dialogWidth = 250;
    static readonly paddingRight = 20;
    private mimeDomHelper;
    constructor(mimeDomHelper: MimeDomHelper);
    getConfig(el: ElementRef): MatDialogConfig;
    private getPosition;
}
//# sourceMappingURL=view-dialog-config-strategy.d.ts.map