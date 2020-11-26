import { Observable } from 'rxjs';
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
}
