import { MediaObserver } from '@angular/flex-layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { ContentsDialogConfigStrategy } from './contents-dialog-config-strategy';
export declare class ContentsDialogConfigStrategyFactory {
    private mediaObserver;
    private mimeDomHelper;
    constructor(mediaObserver: MediaObserver, mimeDomHelper: MimeDomHelper);
    create(): ContentsDialogConfigStrategy;
}
