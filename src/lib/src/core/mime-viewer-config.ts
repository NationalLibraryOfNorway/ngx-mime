import { ViewerLayout } from './models/viewer-layout';
import { ViewerMode } from './models/viewer-mode';

export class MimeViewerConfig {
  public attributionDialogEnabled?= true;
  public attributionDialogHideTimeout?= -1;
  public navigationControlEnabled?= true;
  public initViewerMode?= ViewerMode.PAGE;
  public initViewerLayout?= ViewerLayout.ONE_PAGE;

  constructor(fields?: {
    attributionDialogEnabled?: boolean;
    attributionDialogHideTimeout?: number;
    navigationControlEnabled?: boolean;
    initViewerMode?: ViewerMode;
    initViewerLayout?: ViewerLayout;
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

      this.initViewerLayout =
        fields.initViewerLayout !== undefined ? fields.initViewerLayout : this.initViewerLayout;
    }
  }
}
