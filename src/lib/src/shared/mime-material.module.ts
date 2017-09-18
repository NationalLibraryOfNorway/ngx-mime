import { NgModule } from '@angular/core';
import {
  MdToolbarModule,
  MdButtonModule,
  MdIconModule,
  MdTooltipModule,
  MdDialogModule,
  MdTabsModule,
  MdListModule,
  MdSliderModule
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
    MdSliderModule
  ],
})
export class MimeMaterialModule { }
