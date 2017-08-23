import { Injectable } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

import {
  ContentsDialogConfigStrategy,
  MobileContentsDialogConfigStrategy,
  DesktopContentsDialogConfigStrategy
} from './contents-dialog-config-strategy';

@Injectable()
export class ContentsDialogConfigStrategyFactory {

  constructor(private media: ObservableMedia) { }

  public create(): ContentsDialogConfigStrategy {
    return this.media.isActive('lt-md') ? new MobileContentsDialogConfigStrategy() : new DesktopContentsDialogConfigStrategy();
  }
}
