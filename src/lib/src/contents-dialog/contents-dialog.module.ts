import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { ContentsDialogService } from './contents-dialog.service';
import { ContentsComponent } from './contents-dialog.component';
import { MetadataComponent } from './metadata/metadata.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    ContentsComponent,
    MetadataComponent
  ],
  declarations: [
    ContentsComponent,
    MetadataComponent
  ],
  providers: [
    ContentsDialogService
  ],
  entryComponents: [
    ContentsComponent
  ],
})
export class ContentsDialogModule { }
