import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class FullscreenService {
    private changeSubject;
    constructor();
    get onChange(): Observable<boolean>;
    isEnabled(): boolean;
    isFullscreen(): boolean;
    toggle(el: HTMLElement): void;
    onchange(): void;
    private openFullscreen;
    private closeFullscreen;
    static ɵfac: i0.ɵɵFactoryDeclaration<FullscreenService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FullscreenService>;
}
