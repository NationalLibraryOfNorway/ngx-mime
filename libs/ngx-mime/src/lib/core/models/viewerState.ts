import { ContentDialogState } from './content-dialog-state';
import { ContentsSearchDialogState } from './contents-search-dialog-state';
import { HelpDialogState } from "./help-dialog-state";

export class ViewerState {
  public contentDialogState = new ContentDialogState();
  public contentsSearchDialogState = new ContentsSearchDialogState();
  public helpDialogState = new HelpDialogState();

  constructor(fields?: {
    contentDialogState?: ContentDialogState;
    contentsSearchDialogState?: ContentsSearchDialogState;
    helpDialogState?: HelpDialogState;
  }) {
    if (fields) {
      this.contentDialogState = fields.contentDialogState
        ? fields.contentDialogState
        : this.contentDialogState;
      this.contentsSearchDialogState = fields.contentsSearchDialogState
        ? fields.contentsSearchDialogState
        : this.contentsSearchDialogState;
      this.helpDialogState = fields.helpDialogState
        ? fields.helpDialogState
        : this.helpDialogState;
    }
  }
}
