import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { AttributionDialogComponent } from './attribution-dialog.component';
import { AttributionDialogService } from './attribution-dialog.service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AttributionDialogComponent
  ],
  providers: [
    AttributionDialogService,
    AttributionDialogResizeService
  ],
  entryComponents: [
    AttributionDialogComponent
  ],
})
export class AttributionDialogModule { }
