export class HelpDialogState {
  public isOpen = false;

  constructor(fields?: { isOpen?: boolean }) {
    if (fields) {
      this.isOpen = fields.isOpen !== undefined ? fields.isOpen : this.isOpen;
    }
  }
}