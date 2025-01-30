import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import {
  DesktopInformationDialogConfigStrategy,
  InformationDialogConfigStrategy,
  MobileInformationDialogConfigStrategy,
} from './information-dialog-config-strategy';

@Injectable()
export class InformationDialogConfigStrategyFactory {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private mimeDomHelper: MimeDomHelper,
  ) {}

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
