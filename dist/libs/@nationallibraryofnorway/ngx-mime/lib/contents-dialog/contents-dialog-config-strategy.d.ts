import { ElementRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MimeDomHelper } from './../core/mime-dom-helper';
export interface ContentsDialogConfigStrategy {
    getConfig(elementRef?: ElementRef): MatDialogConfig;
}
export declare class MobileContentsDialogConfigStrategy implements ContentsDialogConfigStrategy {
    getConfig(elementRef: ElementRef): MatDialogConfig;
}
export declare class DesktopContentsDialogConfigStrategy implements ContentsDialogConfigStrategy {
    static readonly dialogWidth = 350;
    static readonly paddingRight = 20;
    private mimeDomHelper;
    constructor(mimeDomHelper: MimeDomHelper);
    getConfig(el: ElementRef): MatDialogConfig;
    private getPosition;
}
