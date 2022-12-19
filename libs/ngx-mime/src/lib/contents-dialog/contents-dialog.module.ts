import { NgModule } from '@angular/core';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';

import { SharedModule } from '../shared/shared.module';
import { ContentsDialogComponent } from './contents-dialog.component';
import { MetadataComponent } from './metadata/metadata.component';
import { TocComponent } from './table-of-contents/table-of-contents.component';

@NgModule({
  imports: [SharedModule],
  declarations: [],
  providers: [
  ],
})
export class ContentsDialogModule {}
