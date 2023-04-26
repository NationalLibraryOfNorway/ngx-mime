import { ElementRef } from '@angular/core';
import { FullscreenService } from './fullscreen-service/fullscreen.service';
import { Dimensions } from './models/dimensions';
import { ViewerService } from './viewer-service/viewer.service';
import * as i0 from "@angular/core";
export declare class MimeDomHelper {
    private fullscreen;
    private viewerService;
    constructor(fullscreen: FullscreenService, viewerService: ViewerService);
    getBoundingClientRect(el: ElementRef): Dimensions;
    isDocumentInFullScreenMode(): boolean;
    toggleFullscreen(): void;
    setFocusOnViewer(): void;
    private getViewerElement;
    private createFullscreenDimensions;
    private createDimensions;
    private getFullscreenWidth;
    private getFullscreenHeight;
    static ɵfac: i0.ɵɵFactoryDeclaration<MimeDomHelper, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MimeDomHelper>;
}
