import { MediaObserver } from '@angular/flex-layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { ViewDialogConfigStrategy } from './view-dialog-config-strategy';
import * as i0 from "@angular/core";
export declare class ViewDialogConfigStrategyFactory {
    private mediaObserver;
    private mimeDomHelper;
    constructor(mediaObserver: MediaObserver, mimeDomHelper: MimeDomHelper);
    create(): ViewDialogConfigStrategy;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewDialogConfigStrategyFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ViewDialogConfigStrategyFactory>;
}
