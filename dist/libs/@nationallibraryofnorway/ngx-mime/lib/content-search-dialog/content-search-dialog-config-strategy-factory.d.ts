import { MediaObserver } from '@angular/flex-layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { ContentSearchDialogConfigStrategy } from './content-search-dialog-config-strategy';
export declare class ContentSearchDialogConfigStrategyFactory {
    private mediaObserver;
    private mimeDomHelper;
    constructor(mediaObserver: MediaObserver, mimeDomHelper: MimeDomHelper);
    create(): ContentSearchDialogConfigStrategy;
}
