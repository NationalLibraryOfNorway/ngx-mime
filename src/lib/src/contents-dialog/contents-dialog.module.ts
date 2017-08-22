import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { ContentsDialogService } from './contents-dialog.service';
import { ContentsDialogComponent } from './contents-dialog.component';
import { MetadataComponent } from './metadata/metadata.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ContentsDialogComponent,
    MetadataComponent
  ],
  providers: [
    ContentsDialogService
  ],
  entryComponents: [
    ContentsDialogComponent
  ],
})
export class ContentsDialogModule { }
