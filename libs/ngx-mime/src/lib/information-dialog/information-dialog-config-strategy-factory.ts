import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MimeDomHelper } from '../core/mime-dom-helper';
import {
  DesktopInformationDialogConfigStrategy,
  InformationDialogConfigStrategy,
  MobileInformationDialogConfigStrategy,
} from './information-dialog-config-strategy';

@Injectable()
export class InformationDialogConfigStrategyFactory {
  constructor(
    private mediaObserver: MediaObserver,
    private mimeDomHelper: MimeDomHelper
  ) {}

  public create(): InformationDialogConfigStrategy {
    return this.mediaObserver.isActive('lt-md')
      ? new MobileInformationDialogConfigStrategy()
      : new DesktopInformationDialogConfigStrategy(this.mimeDomHelper);
  }
}
