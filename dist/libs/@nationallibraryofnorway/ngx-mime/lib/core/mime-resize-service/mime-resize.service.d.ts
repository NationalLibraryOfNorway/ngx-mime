import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Dimensions } from '../models/dimensions';
import * as i0 from "@angular/core";
export declare class MimeResizeService {
    private _el;
    private resizeSubject;
    private observer;
    set el(el: ElementRef);
    get el(): ElementRef;
    get onResize(): Observable<Dimensions>;
    initialize(): void;
    destroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MimeResizeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MimeResizeService>;
}
//# sourceMappingURL=mime-resize.service.d.ts.map