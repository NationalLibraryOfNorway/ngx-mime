import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { CanvasGroupDialogComponent } from './canvas-group-dialog.component';
import { CanvasGroupDialogService } from './canvas-group-dialog.service';
import { MimeDomHelper } from '../core/mime-dom-helper';

@NgModule({
  imports: [SharedModule],
  declarations: [CanvasGroupDialogComponent],
  providers: [CanvasGroupDialogService],
  entryComponents: [CanvasGroupDialogComponent]
})
export class CanvasGroupDialogModule {}
