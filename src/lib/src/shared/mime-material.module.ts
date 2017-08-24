import { NgModule } from '@angular/core';
import {
  MdToolbarModule,
  MdButtonModule,
  MdIconModule,
  MdTooltipModule,
  MdDialogModule,
  MdTabsModule,
  MdListModule
} from '@angular/material';

@NgModule({
  exports: [
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdTooltipModule,
    MdDialogModule,
    MdTabsModule,
    MdListModule
  ],
})
export class MimeMaterialModule { }
