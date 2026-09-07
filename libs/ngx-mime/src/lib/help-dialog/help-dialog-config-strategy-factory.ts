import { inject, Injectable } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import {
  DesktopHelpDialogConfigStrategy,
  HelpDialogConfigStrategy,
  MobileHelpDialogConfigStrategy,
} from './help-dialog-config-strategy';

@Injectable()
export class HelpDialogConfigStrategyFactory {
  private readonly viewerLayoutService = inject(ViewerLayoutService);
  private readonly mimeDomHelper = inject(MimeDomHelper);

  public create(): HelpDialogConfigStrategy {
    return this.viewerLayoutService.isHandsetOrTabletInPortrait()
      ? new MobileHelpDialogConfigStrategy()
      : new DesktopHelpDialogConfigStrategy(this.mimeDomHelper);
  }
}
