import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { ContentsDialogConfigStrategyFactory } from './contents-dialog-config-strategy-factory';
import { ContentsDialogComponent } from './contents-dialog.component';
import { ContentsDialogService } from './contents-dialog.service';
import { MetadataComponent } from './metadata/metadata.component';
import { TocComponent } from './table-of-contents/table-of-contents.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ContentsDialogComponent, MetadataComponent, TocComponent],
  providers: [ContentsDialogService, ContentsDialogConfigStrategyFactory],
})
export class ContentsDialogModule {}
