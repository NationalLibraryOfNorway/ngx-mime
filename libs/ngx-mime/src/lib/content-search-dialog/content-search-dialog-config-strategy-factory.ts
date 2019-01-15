import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import {
  ContentSearchDialogConfigStrategy,
  DesktopContentSearchDialogConfigStrategy,
  MobileContentSearchDialogConfigStrategy
} from './content-search-dialog-config-strategy';

@Injectable()
export class ContentSearchDialogConfigStrategyFactory {
  constructor(
    private mediaObserver: MediaObserver,
    private mimeDomHelper: MimeDomHelper
  ) {}

  public create(): ContentSearchDialogConfigStrategy {
    return this.mediaObserver.isActive('lt-md')
      ? new MobileContentSearchDialogConfigStrategy()
      : new DesktopContentSearchDialogConfigStrategy(this.mimeDomHelper);
  }
}
