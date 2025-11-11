import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import {
  DesktopInformationDialogConfigStrategy,
  InformationDialogConfigStrategy,
  MobileInformationDialogConfigStrategy,
} from './information-dialog-config-strategy';

@Injectable({ providedIn: 'root' })
export class InformationDialogConfigStrategyFactory {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly mimeDomHelper = inject(MimeDomHelper);

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
