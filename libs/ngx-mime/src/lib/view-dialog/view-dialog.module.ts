import { NgModule } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { SharedModule } from '../shared/shared.module';
import { IconComponent } from './icon/icon.component';
import { ViewDialogConfigStrategyFactory } from './view-dialog-config-strategy-factory';
import { ViewDialogComponent } from './view-dialog.component';
import { ViewDialogService } from './view-dialog.service';

@NgModule({
  imports: [SharedModule],
  declarations: [ViewDialogComponent, IconComponent],
  providers: [
    ViewDialogService,
    ViewDialogConfigStrategyFactory,
    MimeDomHelper,
  ],
})
export class ViewDialogModule {}
