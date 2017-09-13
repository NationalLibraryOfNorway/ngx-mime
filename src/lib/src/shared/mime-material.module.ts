import { NgModule } from '@angular/core';
import {
  MdToolbarModule,
  MdButtonModule,
  MdIconModule,
  MdTooltipModule,
  MdDialogModule,
  MdTabsModule,
  MdListModule,
  MdSliderModule,
  MdInputModule,
  MdProgressBarModule,
  MdCardModule
} from '@angular/material';

@NgModule({
  exports: [
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdTooltipModule,
    MdDialogModule,
    MdTabsModule,
    MdListModule,
    MdSliderModule,
    MdInputModule,
    MdProgressBarModule,
    MdCardModule
  ],
})
export class MimeMaterialModule { }
