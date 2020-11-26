import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
export declare class StyleService {
    private zone;
    private currentRgbColor;
    private colorSubject;
    constructor(zone: NgZone);
    get onChange(): Observable<string>;
    init(): void;
    convertToRgba(rgbColor: string, opacity: number): string;
    private getComputedBackgroundColor;
    private getComputedStyle;
}
