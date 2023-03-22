import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { InformationDialogService } from './information-dialog.service';
import { InformationDialogConfigStrategyFactory } from './information-dialog-config-strategy-factory.service';
import { InformationDialogComponent } from './information-dialog.component';
import { MetadataComponent } from './metadata/metadata.component';
import { TocComponent } from './table-of-contents/table-of-contents.component';

@NgModule({
  imports: [SharedModule],
  declarations: [InformationDialogComponent, MetadataComponent, TocComponent],
  providers: [InformationDialogService, InformationDialogConfigStrategyFactory],
})
export class InformationDialogModule {}
