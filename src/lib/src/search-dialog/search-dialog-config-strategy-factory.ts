import { Injectable } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

import {
  SearchDialogConfigStrategy,
  MobileSearchDialogConfigStrategy,
  DesktopSearchDialogConfigStrategy
} from './search-dialog-config-strategy';

@Injectable()
export class SearchDialogConfigStrategyFactory {

  constructor(private media: ObservableMedia) { }

  public create(): SearchDialogConfigStrategy {
    return this.media.isActive('lt-md') ? new MobileSearchDialogConfigStrategy() : new DesktopSearchDialogConfigStrategy();
  }
}
