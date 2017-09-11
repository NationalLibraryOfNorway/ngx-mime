import { NgModule } from '@angular/core';
import {
  MdToolbarModule,
  MdSliderModule,
  MdButtonModule,
  MdIconModule,
  MdTooltipModule
} from '@angular/material';

@NgModule({
  exports: [
    MdToolbarModule,
    MdSliderModule,
    MdButtonModule,
    MdIconModule,
    MdTooltipModule
  ],
})
export class MimeMaterialModule { }
