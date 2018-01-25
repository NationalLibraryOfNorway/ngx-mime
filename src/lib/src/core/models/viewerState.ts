export class ViewerState {
  public contentDialogState = new ContentDialogState();
  public contentsSearchDialogState = new ContentsSearchDialogState();

  constructor(
    fields?: {
      contentDialogState?: ContentDialogState;
      contentsSearchDialogState?: ContentsSearchDialogState;
    }
  ) {
    if (fields) {
      this.contentDialogState = fields.contentDialogState ? fields.contentDialogState : this.contentDialogState;
      this.contentsSearchDialogState = fields.contentsSearchDialogState ? fields.contentsSearchDialogState : this.contentsSearchDialogState;
    }
  }

}

export class ContentDialogState {
  public isOpen = false;
  public selectedIndex = 0;

  constructor(
    fields?: {
      isOpen?: boolean;
      selectedIndex?: number;
    }
  ) {
    if (fields) {
      this.isOpen = fields.isOpen !== undefined ?
        fields.isOpen : this.isOpen;
      this.selectedIndex = fields.selectedIndex !== undefined ?
        fields.selectedIndex : this.selectedIndex;
    }
  }
}

export class ContentsSearchDialogState {
  public isOpen = false;

  constructor(
    fields?: {
      isOpen?: boolean;
    }
  ) {
    if (fields) {
      this.isOpen = fields.isOpen !== undefined ?
        fields.isOpen : this.isOpen;
    }
  }
}
