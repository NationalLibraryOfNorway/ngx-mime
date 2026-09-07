import { inject, Injectable } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import {
  DesktopViewDialogConfigStrategy,
  MobileViewDialogConfigStrategy,
  ViewDialogConfigStrategy,
} from './view-dialog-config-strategy';

@Injectable()
export class ViewDialogConfigStrategyFactory {
  private readonly viewerLayoutService = inject(ViewerLayoutService);
  private readonly mimeDomHelper = inject(MimeDomHelper);

  public create(): ViewDialogConfigStrategy {
    return this.viewerLayoutService.isHandsetOrTabletInPortrait()
      ? new MobileViewDialogConfigStrategy()
      : new DesktopViewDialogConfigStrategy(this.mimeDomHelper);
  }
}
