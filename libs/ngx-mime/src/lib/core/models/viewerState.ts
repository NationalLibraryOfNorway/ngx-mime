import { ContentDialogState } from './content-dialog-state';
import { ContentsSearchDialogState } from './contents-search-dialog-state';
import { HelpDialogState } from './help-dialog-state';
import { ViewDialogState } from './view-dialog-state';

export class ViewerState {
  public viewDialogState = new ViewDialogState();
  public contentDialogState = new ContentDialogState();
  public contentsSearchDialogState = new ContentsSearchDialogState();
  public helpDialogState = new HelpDialogState();

  constructor(fields?: {
    viewDialogState?: ViewDialogState;
    contentDialogState?: ContentDialogState;
    contentsSearchDialogState?: ContentsSearchDialogState;
    helpDialogState?: HelpDialogState;
  }) {
    if (fields) {
      this.viewDialogState = fields.viewDialogState
        ? fields.viewDialogState
        : this.viewDialogState;
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
