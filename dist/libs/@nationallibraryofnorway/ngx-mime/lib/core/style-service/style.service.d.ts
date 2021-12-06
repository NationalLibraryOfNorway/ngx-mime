import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class StyleService {
    private zone;
    private currentRgbColor;
    private colorSubject;
    private subscriptions;
    constructor(zone: NgZone);
    get onChange(): Observable<string>;
    initialize(): void;
    destroy(): void;
    convertToRgba(rgbColor: string, opacity: number): string;
    private getComputedBackgroundColor;
    private getComputedStyle;
    static ɵfac: i0.ɵɵFactoryDeclaration<StyleService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StyleService>;
}
