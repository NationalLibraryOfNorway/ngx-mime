import { BreakpointObserver } from '@angular/cdk/layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { ContentSearchDialogConfigStrategy } from './content-search-dialog-config-strategy';
import * as i0 from "@angular/core";
export declare class ContentSearchDialogConfigStrategyFactory {
    private breakpointObserver;
    private mimeDomHelper;
    constructor(breakpointObserver: BreakpointObserver, mimeDomHelper: MimeDomHelper);
    create(): ContentSearchDialogConfigStrategy;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContentSearchDialogConfigStrategyFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ContentSearchDialogConfigStrategyFactory>;
}
