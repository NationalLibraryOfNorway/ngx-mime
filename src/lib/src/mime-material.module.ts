import { NgModule } from '@angular/core';
import {
  MdToolbarModule,
  MdSliderModule,
  MdPaginatorModule,
  MdButtonModule,
  MdIconModule,
  MdTooltipModule
} from '@angular/material';

@NgModule({
  exports: [
    MdToolbarModule,
    MdSliderModule,
    MdPaginatorModule,
    MdButtonModule,
    MdIconModule,
    MdTooltipModule
  ],
})
export class MimeMaterialModule { }
