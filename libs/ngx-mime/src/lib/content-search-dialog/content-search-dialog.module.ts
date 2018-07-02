import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { ContentSearchDialogService } from './content-search-dialog.service';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';
import { ContentSearchDialogComponent } from './content-search-dialog.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ContentSearchDialogComponent],
  providers: [
    ContentSearchDialogService,
    ContentSearchDialogConfigStrategyFactory
  ],
  entryComponents: [ContentSearchDialogComponent]
})
export class ContentSearchDialogModule {}
