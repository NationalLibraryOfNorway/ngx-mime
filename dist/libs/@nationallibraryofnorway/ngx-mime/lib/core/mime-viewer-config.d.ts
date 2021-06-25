import { ViewerLayout } from './models/viewer-layout';
import { ViewerMode } from './models/viewer-mode';
export declare class MimeViewerConfig {
    attributionDialogEnabled?: boolean;
    attributionDialogHideTimeout?: number;
    navigationControlEnabled?: boolean;
    initViewerMode: ViewerMode;
    initViewerLayout: ViewerLayout;
    withCredentials: boolean;
    loadTilesWithAjax: boolean;
    crossOriginPolicy: string | boolean;
    ajaxHeaders: any;
    preserveZoomOnCanvasGroupChange: boolean;
    startOnTopOnCanvasGroupChange: boolean;
    isDropEnabled: boolean;
    constructor(fields?: {
        attributionDialogEnabled?: boolean;
        attributionDialogHideTimeout?: number;
        navigationControlEnabled?: boolean;
        initViewerMode?: ViewerMode;
        initViewerLayout?: ViewerLayout;
        withCredentials?: boolean;
        loadTilesWithAjax?: boolean;
        crossOriginPolicy?: string | boolean;
        ajaxHeaders?: any;
        preserveZoomOnCanvasGroupChange?: boolean;
        startOnTopOnCanvasGroupChange?: boolean;
        isDropEnabled?: boolean;
    });
}
