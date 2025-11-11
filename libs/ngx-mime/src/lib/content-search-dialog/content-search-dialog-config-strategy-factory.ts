import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import {
  ContentSearchDialogConfigStrategy,
  DesktopContentSearchDialogConfigStrategy,
  MobileContentSearchDialogConfigStrategy,
} from './content-search-dialog-config-strategy';

@Injectable({providedIn: 'root'})
export class ContentSearchDialogConfigStrategyFactory {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly mimeDomHelper = inject(MimeDomHelper);

  public create(): ContentSearchDialogConfigStrategy {
    const isHandsetOrTabletInPortrait = this.breakpointObserver.isMatched([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait,
    ]);

    return isHandsetOrTabletInPortrait
      ? new MobileContentSearchDialogConfigStrategy()
      : new DesktopContentSearchDialogConfigStrategy(this.mimeDomHelper);
  }
}
