import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import {
  DesktopHelpDialogConfigStrategy,
  HelpDialogConfigStrategy,
  MobileHelpDialogConfigStrategy,
} from './help-dialog-config-strategy';

@Injectable()
export class HelpDialogConfigStrategyFactory {
  private breakpointObserver = inject(BreakpointObserver);
  private mimeDomHelper = inject(MimeDomHelper);

  public create(): HelpDialogConfigStrategy {
    const isHandsetOrTabletInPortrait = this.breakpointObserver.isMatched([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait,
    ]);

    return isHandsetOrTabletInPortrait
      ? new MobileHelpDialogConfigStrategy()
      : new DesktopHelpDialogConfigStrategy(this.mimeDomHelper);
  }
}
