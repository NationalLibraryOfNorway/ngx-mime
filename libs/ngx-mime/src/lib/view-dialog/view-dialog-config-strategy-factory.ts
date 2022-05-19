import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import {
  DesktopViewDialogConfigStrategy,
  MobileViewDialogConfigStrategy,
  ViewDialogConfigStrategy,
} from './view-dialog-config-strategy';

@Injectable({
  providedIn: 'root',
})
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
