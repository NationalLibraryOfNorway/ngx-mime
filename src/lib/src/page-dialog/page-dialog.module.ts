import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { PageDialogComponent } from './page-dialog.component';
import { PageDialogService } from './page-dialog.service';
import { MimeDomHelper } from '../core/mime-dom-helper';

@NgModule({
  imports: [SharedModule],
  declarations: [PageDialogComponent],
  providers: [PageDialogService],
  entryComponents: [PageDialogComponent]
})
export class PageDialogModule {}
