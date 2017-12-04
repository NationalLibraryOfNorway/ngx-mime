export class ViewerState {
  public isContentsDialogOpen = false;
  public isContentSearchDialogOpen = false;

  constructor(
    fields?: {
      isContentsDialogOpen?: boolean;
      isContentSearchDialogOpen?: boolean;
    }
  ) {
    if (fields) {
      this.isContentsDialogOpen = fields.isContentsDialogOpen !== undefined ?
        fields.isContentsDialogOpen : this.isContentsDialogOpen;
      this.isContentSearchDialogOpen = fields.isContentSearchDialogOpen !== undefined ?
        fields.isContentSearchDialogOpen : this.isContentSearchDialogOpen;
    }
  }

}
