import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MimeDomHelper } from '../mime-dom-helper';
import { Dimensions } from '../models/dimensions';
export declare class MimeResizeService {
    private mimeDomHelper;
    private _el;
    private resizeSubject;
    private dimensions;
    constructor(mimeDomHelper: MimeDomHelper);
    set el(el: ElementRef);
    get el(): ElementRef;
    get onResize(): Observable<Dimensions>;
    markForCheck(): void;
}
