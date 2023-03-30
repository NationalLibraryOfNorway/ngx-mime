import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { InformationDialogComponent } from './information-dialog.component';
import { MetadataComponent } from './metadata/metadata.component';
import { TocComponent } from './table-of-contents/table-of-contents.component';

@NgModule({
  imports: [SharedModule],
  declarations: [InformationDialogComponent, MetadataComponent, TocComponent],
})
export class InformationDialogModule {}
