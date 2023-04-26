import { ElementRef, ViewContainerRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MimeDomHelper } from '../core/mime-dom-helper';
export interface ViewDialogConfigStrategy {
    getConfig(elementRef: ElementRef | null, viewContainerRef: ViewContainerRef): MatDialogConfig;
}
export declare class MobileViewDialogConfigStrategy implements ViewDialogConfigStrategy {
    getConfig(elementRef: ElementRef, viewContainerRef: ViewContainerRef): MatDialogConfig;
}
export declare class DesktopViewDialogConfigStrategy implements ViewDialogConfigStrategy {
    static readonly dialogWidth = 250;
    static readonly paddingRight = 20;
    private mimeDomHelper;
    constructor(mimeDomHelper: MimeDomHelper);
    getConfig(el: ElementRef, viewContainerRef: ViewContainerRef): MatDialogConfig;
    private getPosition;
}
