import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import {
  ViewDialogConfigStrategy,
  DesktopViewDialogConfigStrategy,
  MobileViewDialogConfigStrategy,
} from './view-dialog-config-strategy';

@Injectable()
export class ViewDialogConfigStrategyFactory {
  constructor(
    private mediaObserver: MediaObserver,
    private mimeDomHelper: MimeDomHelper
  ) {}

  public create(): ViewDialogConfigStrategy {
    return this.mediaObserver.isActive('lt-md')
      ? new MobileViewDialogConfigStrategy()
      : new DesktopViewDialogConfigStrategy(this.mimeDomHelper);
  }
}
