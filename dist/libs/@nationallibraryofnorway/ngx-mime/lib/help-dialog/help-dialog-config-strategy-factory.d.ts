import { BreakpointObserver } from '@angular/cdk/layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { HelpDialogConfigStrategy } from './help-dialog-config-strategy';
import * as i0 from "@angular/core";
export declare class HelpDialogConfigStrategyFactory {
    private breakpointObserver;
    private mimeDomHelper;
    constructor(breakpointObserver: BreakpointObserver, mimeDomHelper: MimeDomHelper);
    create(): HelpDialogConfigStrategy;
    static ɵfac: i0.ɵɵFactoryDeclaration<HelpDialogConfigStrategyFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HelpDialogConfigStrategyFactory>;
}
