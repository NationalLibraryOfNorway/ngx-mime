import { ContentDialogState } from './content-dialog-state';
import { ContentsSearchDialogState } from './contents-search-dialog-state';
import { HelpDialogState } from './help-dialog-state';
export declare class ViewerState {
    contentDialogState: ContentDialogState;
    contentsSearchDialogState: ContentsSearchDialogState;
    helpDialogState: HelpDialogState;
    constructor(fields?: {
        contentDialogState?: ContentDialogState;
        contentsSearchDialogState?: ContentsSearchDialogState;
        helpDialogState?: HelpDialogState;
    });
}
