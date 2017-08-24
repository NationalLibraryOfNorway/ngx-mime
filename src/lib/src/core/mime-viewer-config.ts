export class MimeViewerConfig {
  public attributionDialogEnabled? = true;
  public attributionDialogHideTimeout? = -1;

  constructor(fields?: {
    attributionDialogEnabled?: boolean;
    attributionDialogHideTimeout?: number;
  }) {
    if (fields) {
      this.attributionDialogEnabled = fields.attributionDialogEnabled;
      this.attributionDialogHideTimeout = fields.attributionDialogHideTimeout || this.attributionDialogHideTimeout;
    }
  }
}
