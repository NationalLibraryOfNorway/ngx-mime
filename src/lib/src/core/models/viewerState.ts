import { ContentDialogState } from './content-dialog-state';
import { ContentsSearchDialogState } from './contents-search-dialog-state';

export class ViewerState {
  public contentDialogState = new ContentDialogState();
  public contentsSearchDialogState = new ContentsSearchDialogState();

  constructor(fields?: { contentDialogState?: ContentDialogState; contentsSearchDialogState?: ContentsSearchDialogState }) {
    if (fields) {
      this.contentDialogState = fields.contentDialogState ? fields.contentDialogState : this.contentDialogState;
      this.contentsSearchDialogState = fields.contentsSearchDialogState ? fields.contentsSearchDialogState : this.contentsSearchDialogState;
    }
  }
}
