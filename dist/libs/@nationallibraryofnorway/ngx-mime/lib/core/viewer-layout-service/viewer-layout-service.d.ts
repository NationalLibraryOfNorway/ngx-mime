import { MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { ViewerLayout } from '../models/viewer-layout';
export declare class ViewerLayoutService {
    private mediaObserver;
    private mimeConfig;
    private _layout;
    private subject;
    constructor(mediaObserver: MediaObserver);
    init(isPagedManifest?: boolean): void;
    get onChange(): Observable<ViewerLayout>;
    get layout(): ViewerLayout;
    setLayout(viewerLayout: ViewerLayout): void;
    toggle(): void;
    private change;
    private isMobile;
}
