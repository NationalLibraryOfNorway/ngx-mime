import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import {
  DesktopInformationDialogConfigStrategy,
  InformationDialogConfigStrategy,
  MobileInformationDialogConfigStrategy,
} from './information-dialog-config-strategy';

@Injectable()
export class InformationDialogConfigStrategyFactory {
  constructor(private mediaObserver: MediaObserver) {}

  public create(): InformationDialogConfigStrategy {
    return this.mediaObserver.isActive('lt-md')
      ? new MobileInformationDialogConfigStrategy()
      : new DesktopInformationDialogConfigStrategy();
  }
}
