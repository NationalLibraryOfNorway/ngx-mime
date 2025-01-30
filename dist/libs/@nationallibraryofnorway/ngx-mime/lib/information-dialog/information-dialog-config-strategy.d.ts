import { ElementRef, ViewContainerRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MimeDomHelper } from '../core/mime-dom-helper';
export interface InformationDialogConfigStrategy {
    getConfig(elementRef: ElementRef, viewContainerRef: ViewContainerRef): MatDialogConfig;
}
export declare class MobileInformationDialogConfigStrategy implements InformationDialogConfigStrategy {
    getConfig(elementRef: ElementRef, viewContainerRef: ViewContainerRef): MatDialogConfig;
}
export declare class DesktopInformationDialogConfigStrategy implements InformationDialogConfigStrategy {
    static readonly dialogWidth = 350;
    static readonly paddingRight = 16;
    private mimeDomHelper;
    constructor(mimeDomHelper: MimeDomHelper);
    getConfig(el: ElementRef, viewContainerRef: ViewContainerRef): MatDialogConfig;
    private getPosition;
}
