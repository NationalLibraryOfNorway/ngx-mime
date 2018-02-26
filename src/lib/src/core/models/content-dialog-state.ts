export class ContentDialogState {
  public isOpen = false;
  public selectedIndex = 0;

  constructor(fields?: { isOpen?: boolean; selectedIndex?: number }) {
    if (fields) {
      this.isOpen = fields.isOpen !== undefined ? fields.isOpen : this.isOpen;
      this.selectedIndex = fields.selectedIndex !== undefined ? fields.selectedIndex : this.selectedIndex;
    }
  }
}
