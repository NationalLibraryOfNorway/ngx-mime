import { BreakpointObserver } from '@angular/cdk/layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { InformationDialogConfigStrategy } from './information-dialog-config-strategy';
import * as i0 from "@angular/core";
export declare class InformationDialogConfigStrategyFactory {
    private breakpointObserver;
    private mimeDomHelper;
    constructor(breakpointObserver: BreakpointObserver, mimeDomHelper: MimeDomHelper);
    create(): InformationDialogConfigStrategy;
    static ɵfac: i0.ɵɵFactoryDeclaration<InformationDialogConfigStrategyFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<InformationDialogConfigStrategyFactory>;
}
