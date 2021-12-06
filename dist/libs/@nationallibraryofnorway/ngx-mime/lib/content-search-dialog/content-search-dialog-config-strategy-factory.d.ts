import { MediaObserver } from '@angular/flex-layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { ContentSearchDialogConfigStrategy } from './content-search-dialog-config-strategy';
import * as i0 from "@angular/core";
export declare class ContentSearchDialogConfigStrategyFactory {
    private mediaObserver;
    private mimeDomHelper;
    constructor(mediaObserver: MediaObserver, mimeDomHelper: MimeDomHelper);
    create(): ContentSearchDialogConfigStrategy;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContentSearchDialogConfigStrategyFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ContentSearchDialogConfigStrategyFactory>;
}
