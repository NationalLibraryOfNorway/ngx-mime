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
  MdProgressSpinnerModule,
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
    MdProgressSpinnerModule,
    MdInputModule,
    MdProgressBarModule,
    MdCardModule
  ],
})
export class MimeMaterialModule { }
