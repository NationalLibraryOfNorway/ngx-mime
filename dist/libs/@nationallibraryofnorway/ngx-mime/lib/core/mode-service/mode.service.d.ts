import { Observable } from 'rxjs';
import { ModeChanges } from '../models/modeChanges';
import { ViewerMode } from '../models/viewer-mode';
import * as i0 from "@angular/core";
export declare class ModeService {
    private _initialMode;
    private _mode;
    private toggleModeSubject;
    private modeChanges;
    constructor();
    get onChange(): Observable<ModeChanges>;
    set mode(mode: ViewerMode);
    get mode(): ViewerMode;
    set initialMode(mode: ViewerMode);
    get initialMode(): ViewerMode;
    toggleMode(): void;
    isPageZoomed(): boolean;
    private change;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ModeService>;
}
