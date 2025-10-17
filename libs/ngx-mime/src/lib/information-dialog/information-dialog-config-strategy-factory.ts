import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import {
  DesktopInformationDialogConfigStrategy,
  InformationDialogConfigStrategy,
  MobileInformationDialogConfigStrategy,
} from './information-dialog-config-strategy';

@Injectable()
export class InformationDialogConfigStrategyFactory {
  private breakpointObserver = inject(BreakpointObserver);
  private mimeDomHelper = inject(MimeDomHelper);

  public create(): InformationDialogConfigStrategy {
    const isHandsetOrTabletInPortrait = this.breakpointObserver.isMatched([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait,
    ]);

    return isHandsetOrTabletInPortrait
      ? new MobileInformationDialogConfigStrategy()
      : new DesktopInformationDialogConfigStrategy(this.mimeDomHelper);
  }
}
