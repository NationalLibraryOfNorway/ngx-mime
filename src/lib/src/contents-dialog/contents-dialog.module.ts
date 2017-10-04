import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { ContentsDialogService } from './contents-dialog.service';
import { ContentsDialogConfigStrategyFactory } from './contents-dialog-config-strategy-factory';
import { ContentsDialogComponent } from './contents-dialog.component';
import { MetadataComponent } from './metadata/metadata.component';
import { TOCComponent } from './tableOfContents/tableOfContents.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ContentsDialogComponent,
    MetadataComponent,
    TOCComponent
  ],
  providers: [
    ContentsDialogService,
    ContentsDialogConfigStrategyFactory
  ],
  entryComponents: [
    ContentsDialogComponent
  ],
})
export class ContentsDialogModule { }
