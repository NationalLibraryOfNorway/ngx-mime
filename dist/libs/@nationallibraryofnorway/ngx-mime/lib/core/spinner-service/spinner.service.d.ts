import { Observable } from 'rxjs';
export interface SpinnerState {
    show: boolean;
}
export declare class SpinnerService {
    private spinnerSubject;
    spinnerState: Observable<SpinnerState>;
    constructor();
    show(): void;
    hide(): void;
}
