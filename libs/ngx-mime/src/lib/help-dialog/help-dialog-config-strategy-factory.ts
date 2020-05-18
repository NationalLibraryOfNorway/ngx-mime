import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import {
  DesktopHelpDialogConfigStrategy,
  HelpDialogConfigStrategy,
  MobileHelpDialogConfigStrategy
} from './help-dialog-config-strategy';

@Injectable()
export class HelpDialogConfigStrategyFactory {
  constructor(
    private mediaObserver: MediaObserver,
    private mimeDomHelper: MimeDomHelper
  ) {}

  public create(): HelpDialogConfigStrategy {
    return this.mediaObserver.isActive('lt-md')
    ? new MobileHelpDialogConfigStrategy()
    : new DesktopHelpDialogConfigStrategy(this.mimeDomHelper);
  }
}
