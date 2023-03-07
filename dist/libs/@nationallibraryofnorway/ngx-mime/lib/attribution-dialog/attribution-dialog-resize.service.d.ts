import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MimeDomHelper } from './../core/mime-dom-helper';
import { Dimensions } from './../core/models/dimensions';
import * as i0 from "@angular/core";
export declare class AttributionDialogResizeService {
    private mimeDomHelper;
    private _el;
    private resizeSubject;
    private dimensions;
    constructor(mimeDomHelper: MimeDomHelper);
    set el(el: ElementRef | null);
    get el(): ElementRef | null;
    get onResize(): Observable<Dimensions>;
    markForCheck(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AttributionDialogResizeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AttributionDialogResizeService>;
}
//# sourceMappingURL=attribution-dialog-resize.service.d.ts.map