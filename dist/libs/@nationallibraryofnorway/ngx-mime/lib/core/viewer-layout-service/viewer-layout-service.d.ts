import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerLayout } from '../models/viewer-layout';
import * as i0 from "@angular/core";
export declare class ViewerLayoutService {
    private breakpointObserver;
    private config;
    private _layout;
    private subject;
    constructor(breakpointObserver: BreakpointObserver);
    init(isPagedManifest?: boolean): void;
    get onChange(): Observable<ViewerLayout>;
    get layout(): ViewerLayout;
    setConfig(config: MimeViewerConfig): void;
    setLayout(viewerLayout: ViewerLayout): void;
    toggle(): void;
    private change;
    private isHandsetOrTabletInPortrait;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewerLayoutService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ViewerLayoutService>;
}
