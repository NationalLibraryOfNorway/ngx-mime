import { RecognizedTextMode } from './models/recognized-text-mode';
import { ViewerLayout } from './models/viewer-layout';
import { ViewerMode } from './models/viewer-mode';

export class MimeViewerConfig {
  public attributionDialogEnabled? = true;
  public attributionDialogHideTimeout? = -1;
  public navigationControlEnabled? = true;
  public initViewerMode = ViewerMode.PAGE;
  public initViewerLayout = ViewerLayout.TWO_PAGE;
  public withCredentials = false;
  public loadTilesWithAjax = false;
  public crossOriginPolicy:
    | 'Anonymous'
    | 'use-credentials'
    | false
    | undefined = false;
  public ajaxHeaders: any = null;
  public preserveZoomOnCanvasGroupChange = false;
  public startOnTopOnCanvasGroupChange = false;
  public isDropEnabled = false;
  public initRecognizedTextContentToggle = RecognizedTextMode.NONE;
  public ignorePhysicalScale = false;

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
    initRecognizedTextContentToggle?: RecognizedTextMode;
    ignorePhysicalScale?: boolean;
  }) {
    if (fields) {
      this.attributionDialogEnabled =
        fields.attributionDialogEnabled !== undefined
          ? fields.attributionDialogEnabled
          : this.attributionDialogEnabled;

      this.attributionDialogHideTimeout =
        fields.attributionDialogHideTimeout ||
        this.attributionDialogHideTimeout;

      this.navigationControlEnabled =
        fields.navigationControlEnabled !== undefined
          ? fields.navigationControlEnabled
          : this.navigationControlEnabled;

      this.initViewerMode =
        fields.initViewerMode !== undefined
          ? fields.initViewerMode
          : this.initViewerMode;

      this.initViewerLayout =
        fields.initViewerLayout !== undefined
          ? fields.initViewerLayout
          : this.initViewerLayout;

      this.withCredentials =
        fields.withCredentials !== undefined
          ? fields.withCredentials
          : this.withCredentials;

      this.loadTilesWithAjax =
        fields.loadTilesWithAjax !== undefined
          ? fields.loadTilesWithAjax
          : this.loadTilesWithAjax;

      this.crossOriginPolicy =
        fields.crossOriginPolicy !== undefined
          ? fields.crossOriginPolicy
          : this.crossOriginPolicy;

      this.ajaxHeaders =
        fields.ajaxHeaders !== undefined
          ? fields.ajaxHeaders
          : this.ajaxHeaders;

      this.preserveZoomOnCanvasGroupChange =
        fields.preserveZoomOnCanvasGroupChange !== undefined
          ? fields.preserveZoomOnCanvasGroupChange
          : this.preserveZoomOnCanvasGroupChange;

      this.startOnTopOnCanvasGroupChange =
        fields.startOnTopOnCanvasGroupChange !== undefined
          ? fields.startOnTopOnCanvasGroupChange
          : this.startOnTopOnCanvasGroupChange;

      this.isDropEnabled =
        fields.isDropEnabled !== undefined
          ? fields.isDropEnabled
          : this.isDropEnabled;

      this.initRecognizedTextContentToggle =
        fields.initRecognizedTextContentToggle !== undefined
          ? fields.initRecognizedTextContentToggle
          : this.initRecognizedTextContentToggle;

      this.ignorePhysicalScale =
        fields.ignorePhysicalScale !== undefined
          ? fields.ignorePhysicalScale
          : this.ignorePhysicalScale;
    }
  }
}
