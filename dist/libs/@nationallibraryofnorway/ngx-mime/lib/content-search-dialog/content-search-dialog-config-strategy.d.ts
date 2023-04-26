import { ElementRef, ViewContainerRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MimeDomHelper } from './../core/mime-dom-helper';
export interface ContentSearchDialogConfigStrategy {
    getConfig(elementRef: ElementRef | null, viewContainerRef: ViewContainerRef): MatDialogConfig;
}
export declare class MobileContentSearchDialogConfigStrategy implements ContentSearchDialogConfigStrategy {
    getConfig(elementRef: ElementRef, viewContainerRef: ViewContainerRef): MatDialogConfig;
}
export declare class DesktopContentSearchDialogConfigStrategy implements ContentSearchDialogConfigStrategy {
    static readonly dialogWidth = 350;
    static readonly paddingRight = 20;
    private mimeDomHelper;
    constructor(mimeDomHelper: MimeDomHelper);
    getConfig(el: ElementRef, viewContainerRef: ViewContainerRef): MatDialogConfig;
    private getPosition;
}
