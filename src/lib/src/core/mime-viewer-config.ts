import { ViewerMode } from './models/viewer-mode';

export class MimeViewerConfig {
  public attributionDialogEnabled?= true;
  public attributionDialogHideTimeout?= -1;
  public navigationControlEnabled?= true;
  public initViewerMode?= ViewerMode.PAGE;
  public withCredentials?= false;
  public loadTilesWithAjax?= false;
  public crossOriginPolicy?: string | boolean = false;

  constructor(fields?: {
    attributionDialogEnabled?: boolean;
    attributionDialogHideTimeout?: number;
    navigationControlEnabled?: boolean;
    initViewerMode?: ViewerMode;
    withCredentials?: boolean;
    loadTilesWithAjax?: boolean;
    crossOriginPolicy?: string | boolean;
  }) {
    if (fields) {
      this.attributionDialogEnabled =
        fields.attributionDialogEnabled !== undefined ? fields.attributionDialogEnabled : this.attributionDialogEnabled;

      this.attributionDialogHideTimeout =
        fields.attributionDialogHideTimeout || this.attributionDialogHideTimeout;

      this.navigationControlEnabled =
        fields.navigationControlEnabled !== undefined ? fields.navigationControlEnabled : this.navigationControlEnabled;

      this.initViewerMode =
        fields.initViewerMode !== undefined ? fields.initViewerMode : this.initViewerMode;

      this.withCredentials =
        fields.withCredentials !== undefined ? fields.withCredentials : this.withCredentials;

      this.loadTilesWithAjax =
        fields.loadTilesWithAjax !== undefined ? fields.loadTilesWithAjax : this.loadTilesWithAjax;

      this.crossOriginPolicy =
        fields.crossOriginPolicy !== undefined ? fields.crossOriginPolicy : this.crossOriginPolicy;
    }
  }
}
