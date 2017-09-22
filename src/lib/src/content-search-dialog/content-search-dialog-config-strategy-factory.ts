import { Injectable } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

import {
  ContentSearchDialogConfigStrategy,
  MobileContentSearchDialogConfigStrategy,
  DesktopContentSearchDialogConfigStrategy
} from './content-search-dialog-config-strategy';

@Injectable()
export class ContentSearchDialogConfigStrategyFactory {

  constructor(private media: ObservableMedia) { }

  public create(): ContentSearchDialogConfigStrategy {
    return this.media.isActive('lt-md') ? new MobileContentSearchDialogConfigStrategy() : new DesktopContentSearchDialogConfigStrategy();
  }
}
