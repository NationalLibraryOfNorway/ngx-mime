import { inject, Injectable } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import {
  DesktopInformationDialogConfigStrategy,
  InformationDialogConfigStrategy,
  MobileInformationDialogConfigStrategy,
} from './information-dialog-config-strategy';

@Injectable()
export class InformationDialogConfigStrategyFactory {
  private readonly viewerLayoutService = inject(ViewerLayoutService);
  private readonly mimeDomHelper = inject(MimeDomHelper);

  public create(): InformationDialogConfigStrategy {
    return this.viewerLayoutService.isHandsetOrTabletInPortrait()
      ? new MobileInformationDialogConfigStrategy()
      : new DesktopInformationDialogConfigStrategy(this.mimeDomHelper);
  }
}
