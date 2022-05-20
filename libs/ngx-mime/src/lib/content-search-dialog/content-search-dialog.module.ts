import { NgModule } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { SharedModule } from './../shared/shared.module';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';
import { ContentSearchDialogComponent } from './content-search-dialog.component';
import { ContentSearchDialogService } from './content-search-dialog.service';

@NgModule({
  imports: [SharedModule],
  declarations: [ContentSearchDialogComponent],
  providers: [
    ContentSearchDialogService,
    ContentSearchDialogConfigStrategyFactory,
    MimeDomHelper,
  ],
})
export class ContentSearchDialogModule {}
