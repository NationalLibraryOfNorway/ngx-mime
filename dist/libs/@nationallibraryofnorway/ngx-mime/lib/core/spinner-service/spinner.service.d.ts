import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export interface SpinnerState {
    show: boolean;
}
export declare class SpinnerService {
    private spinnerSubject;
    spinnerState: Observable<SpinnerState>;
    constructor();
    show(): void;
    hide(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SpinnerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SpinnerService>;
}
