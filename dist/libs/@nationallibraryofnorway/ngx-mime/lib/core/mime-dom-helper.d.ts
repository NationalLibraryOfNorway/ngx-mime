import { FullscreenService } from './fullscreen-service/fullscreen.service';
import { Dimensions } from './models/dimensions';
import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class MimeDomHelper {
    private fullscreen;
    constructor(fullscreen: FullscreenService);
    getBoundingClientRect(el: ElementRef): Dimensions;
    isDocumentInFullScreenMode(): boolean;
    toggleFullscreen(): void;
    setFocusOnViewer(): void;
    private createFullscreenDimensions;
    private createDimensions;
    private getFullscreenWidth;
    private getFullscreenHeight;
    static ɵfac: i0.ɵɵFactoryDeclaration<MimeDomHelper, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MimeDomHelper>;
}
