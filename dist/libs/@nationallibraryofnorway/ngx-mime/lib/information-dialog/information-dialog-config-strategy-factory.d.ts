import { MediaObserver } from '@angular/flex-layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { InformationDialogConfigStrategy } from './information-dialog-config-strategy';
import * as i0 from "@angular/core";
export declare class InformationDialogConfigStrategyFactory {
    private mediaObserver;
    private mimeDomHelper;
    constructor(mediaObserver: MediaObserver, mimeDomHelper: MimeDomHelper);
    create(): InformationDialogConfigStrategy;
    static ɵfac: i0.ɵɵFactoryDeclaration<InformationDialogConfigStrategyFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<InformationDialogConfigStrategyFactory>;
}
