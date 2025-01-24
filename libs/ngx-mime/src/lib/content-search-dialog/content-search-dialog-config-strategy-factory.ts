import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import {
  ContentSearchDialogConfigStrategy,
  DesktopContentSearchDialogConfigStrategy,
  MobileContentSearchDialogConfigStrategy,
} from './content-search-dialog-config-strategy';

@Injectable()
export class ContentSearchDialogConfigStrategyFactory {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private mimeDomHelper: MimeDomHelper,
  ) {}

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
