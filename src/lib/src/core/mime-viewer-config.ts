export class MimeViewerConfig {
  public attributionDialogEnabled? = true;

  constructor(fields?: {
    attributionDialogEnabled?: boolean;
  }) {
    if (fields) {
      this.attributionDialogEnabled = fields.attributionDialogEnabled || true;
    }
  }
}
