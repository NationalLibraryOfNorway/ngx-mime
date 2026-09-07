import { Injectable, inject } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import {
  ContentSearchDialogConfigStrategy,
  DesktopContentSearchDialogConfigStrategy,
  MobileContentSearchDialogConfigStrategy,
} from './content-search-dialog-config-strategy';

@Injectable()
export class ContentSearchDialogConfigStrategyFactory {
  private readonly viewerLayoutService = inject(ViewerLayoutService);
  private readonly mimeDomHelper = inject(MimeDomHelper);

  public create(): ContentSearchDialogConfigStrategy {
    return this.viewerLayoutService.isHandsetOrTabletInPortrait()
      ? new MobileContentSearchDialogConfigStrategy()
      : new DesktopContentSearchDialogConfigStrategy(this.mimeDomHelper);
  }
}
