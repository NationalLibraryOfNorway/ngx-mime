import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { SearchDialogService } from './search-dialog.service';
import { SearchDialogConfigStrategyFactory } from './search-dialog-config-strategy-factory';
import { SearchDialogComponent } from './search-dialog.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SearchDialogComponent
  ],
  providers: [
    SearchDialogService,
    SearchDialogConfigStrategyFactory
  ],
  entryComponents: [
    SearchDialogComponent
  ],
})
export class SearchDialogModule { }
