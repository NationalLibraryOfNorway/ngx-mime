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
  MdInputModule
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
    MdInputModule
  ],
})
export class MimeMaterialModule { }
