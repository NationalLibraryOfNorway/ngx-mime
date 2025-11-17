import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import {
  DesktopViewDialogConfigStrategy,
  MobileViewDialogConfigStrategy,
  ViewDialogConfigStrategy,
} from './view-dialog-config-strategy';

@Injectable()
export class ViewDialogConfigStrategyFactory {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly mimeDomHelper = inject(MimeDomHelper);

  public create(): ViewDialogConfigStrategy {
    const isHandsetOrTabletInPortrait = this.breakpointObserver.isMatched([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait,
    ]);

    return isHandsetOrTabletInPortrait
      ? new MobileViewDialogConfigStrategy()
      : new DesktopViewDialogConfigStrategy(this.mimeDomHelper);
  }
}
