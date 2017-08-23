import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { AttributionDialogComponent } from './attribution-dialog.component';
import { AttributionDialogService } from './attribution-dialog.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AttributionDialogComponent
  ],
  providers: [
    AttributionDialogService
  ],
  entryComponents: [
    AttributionDialogComponent
  ],
})
export class AttributionDialogModule { }
