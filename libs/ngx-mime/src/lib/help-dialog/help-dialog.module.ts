import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HelpDialogComponent } from './help-dialog.component';
import { HelpDialogService } from './help-dialog.service';
import { HelpDialogConfigStrategyFactory } from './help-dialog-config-strategy-factory';

@NgModule({
  imports: [SharedModule],
  declarations: [HelpDialogComponent],
  providers: [
    HelpDialogService,
    HelpDialogConfigStrategyFactory
  ]
})
export class HelpDialogModule {}
