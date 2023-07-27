import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Dimensions } from '../models/dimensions';
import { ViewerService } from '../viewer-service/viewer.service';
import * as i0 from "@angular/core";
export declare class MimeResizeService {
    private viewerService;
    private _el;
    private resizeSubject;
    private observer;
    constructor(viewerService: ViewerService);
    set el(el: ElementRef);
    get el(): ElementRef;
    get onResize(): Observable<Dimensions>;
    initialize(): void;
    destroy(): void;
    private isResizeObserverSupported;
    private initializeResizeObserver;
    private handleResizeEntry;
    static ɵfac: i0.ɵɵFactoryDeclaration<MimeResizeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MimeResizeService>;
}
