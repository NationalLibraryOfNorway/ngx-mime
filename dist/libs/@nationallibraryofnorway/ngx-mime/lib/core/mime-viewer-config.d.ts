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
    crossOriginPolicy: 'Anonymous' | 'use-credentials' | false | undefined;
    ajaxHeaders: any;
    preserveZoomOnCanvasGroupChange: boolean;
    startOnTopOnCanvasGroupChange: boolean;
    isDropEnabled: boolean;
    initRecognizedTextContentToggle: boolean;
    ignorePhysicalScale: boolean;
    constructor(fields?: {
        attributionDialogEnabled?: boolean;
        attributionDialogHideTimeout?: number;
        navigationControlEnabled?: boolean;
        initViewerMode?: ViewerMode;
        initViewerLayout?: ViewerLayout;
        withCredentials?: boolean;
        loadTilesWithAjax?: boolean;
        crossOriginPolicy?: 'Anonymous' | 'use-credentials' | false | undefined;
        ajaxHeaders?: any;
        preserveZoomOnCanvasGroupChange?: boolean;
        startOnTopOnCanvasGroupChange?: boolean;
        isDropEnabled?: boolean;
        initRecognizedTextContentToggle?: boolean;
        ignorePhysicalScale?: boolean;
    });
}
