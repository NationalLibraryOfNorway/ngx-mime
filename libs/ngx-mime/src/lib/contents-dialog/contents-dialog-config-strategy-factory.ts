import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import {
  ContentsDialogConfigStrategy,
  DesktopContentsDialogConfigStrategy,
  MobileContentsDialogConfigStrategy
} from './contents-dialog-config-strategy';

@Injectable()
export class ContentsDialogConfigStrategyFactory {
  constructor(
    private mediaObserver: MediaObserver,
    private mimeDomHelper: MimeDomHelper
  ) {}

  public create(): ContentsDialogConfigStrategy {
    return this.mediaObserver.isActive('lt-md')
      ? new MobileContentsDialogConfigStrategy()
      : new DesktopContentsDialogConfigStrategy(this.mimeDomHelper);
  }
}
