import { ViewerMode } from '../models/viewer-mode';

export class ModeChanges {
  public currentValue: ViewerMode;
  public previousValue: ViewerMode;

  constructor(fields?: { currentValue?: ViewerMode; previousValue?: ViewerMode }) {
    if (fields) {
      this.currentValue = fields.currentValue || this.currentValue;
      this.previousValue = fields.previousValue || this.previousValue;
    }
  }
}
