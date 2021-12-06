import { MediaObserver } from '@angular/flex-layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { ContentsDialogConfigStrategy } from './contents-dialog-config-strategy';
import * as i0 from "@angular/core";
export declare class ContentsDialogConfigStrategyFactory {
    private mediaObserver;
    private mimeDomHelper;
    constructor(mediaObserver: MediaObserver, mimeDomHelper: MimeDomHelper);
    create(): ContentsDialogConfigStrategy;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContentsDialogConfigStrategyFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ContentsDialogConfigStrategyFactory>;
}
