import { Observable } from 'rxjs';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ModeChanges, ViewerMode } from '../models';
import * as i0 from "@angular/core";
export declare class ModeService {
    private config;
    private _mode;
    private toggleModeSubject;
    private modeChanges;
    constructor();
    get onChange(): Observable<ModeChanges>;
    set mode(mode: ViewerMode);
    get mode(): ViewerMode;
    initialize(): void;
    destroy(): void;
    setConfig(config: MimeViewerConfig): void;
    toggleMode(): void;
    isPageZoomed(): boolean;
    private change;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ModeService>;
}
//# sourceMappingURL=mode.service.d.ts.map