import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import {
  DesktopHelpDialogConfigStrategy,
  HelpDialogConfigStrategy,
  MobileHelpDialogConfigStrategy,
} from './help-dialog-config-strategy';

@Injectable({ providedIn: 'root' })
export class HelpDialogConfigStrategyFactory {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly mimeDomHelper = inject(MimeDomHelper);

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
