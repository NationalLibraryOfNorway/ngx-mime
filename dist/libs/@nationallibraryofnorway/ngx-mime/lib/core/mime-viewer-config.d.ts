import { RecognizedTextMode, ViewerMode } from './models';
import { ViewerLayout } from './models/viewer-layout';
export declare class MimeViewerConfig {
    attributionDialogEnabled?: boolean | undefined;
    attributionDialogHideTimeout?: number | undefined;
    navigationControlEnabled?: boolean | undefined;
    initViewerMode: ViewerMode;
    initViewerLayout: ViewerLayout;
    withCredentials: boolean;
    loadTilesWithAjax: boolean;
    crossOriginPolicy: 'Anonymous' | 'use-credentials' | false | undefined;
    ajaxHeaders: any;
    preserveZoomOnCanvasGroupChange: boolean;
    startOnTopOnCanvasGroupChange: boolean;
    isDropEnabled: boolean;
    initRecognizedTextContentMode: RecognizedTextMode;
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
        initRecognizedTextContentMode?: RecognizedTextMode;
        ignorePhysicalScale?: boolean;
    });
}
//# sourceMappingURL=mime-viewer-config.d.ts.map