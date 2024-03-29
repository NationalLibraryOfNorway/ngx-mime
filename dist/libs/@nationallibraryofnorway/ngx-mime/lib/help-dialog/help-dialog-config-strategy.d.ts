import { ElementRef, ViewContainerRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MimeDomHelper } from '../core/mime-dom-helper';
export interface HelpDialogConfigStrategy {
    getConfig(elementRef: ElementRef, viewContainerRef: ViewContainerRef): MatDialogConfig;
}
export declare class MobileHelpDialogConfigStrategy implements HelpDialogConfigStrategy {
    getConfig(elementRef: ElementRef, viewContainerRef: ViewContainerRef): MatDialogConfig;
}
export declare class DesktopHelpDialogConfigStrategy implements HelpDialogConfigStrategy {
    static readonly dialogWidth = 350;
    static readonly paddingRight = 20;
    private mimeDomHelper;
    constructor(mimeDomHelper: MimeDomHelper);
    getConfig(el: ElementRef, viewContainerRef: ViewContainerRef): MatDialogConfig;
    private getPosition;
}
