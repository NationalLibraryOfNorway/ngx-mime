import { NgModule } from '@angular/core';
import {
  MdToolbarModule,
  MdButtonModule,
  MdIconModule,
  MdTooltipModule
} from '@angular/material';

@NgModule({
  exports: [
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdTooltipModule
  ],
})
export class MimeMaterialModule { }
