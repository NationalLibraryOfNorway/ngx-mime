import { MediaObserver } from '@angular/flex-layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { HelpDialogConfigStrategy } from './help-dialog-config-strategy';
export declare class HelpDialogConfigStrategyFactory {
    private mediaObserver;
    private mimeDomHelper;
    constructor(mediaObserver: MediaObserver, mimeDomHelper: MimeDomHelper);
    create(): HelpDialogConfigStrategy;
}
