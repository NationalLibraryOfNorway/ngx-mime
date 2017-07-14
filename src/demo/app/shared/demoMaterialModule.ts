import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdIconModule,
  MdListModule,
  MdSidenavModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
@NgModule({
  imports: [
    MdButtonModule,
    MdIconModule,
    MdListModule,
    MdSidenavModule,
    MdToolbarModule,
    MdTooltipModule
  ],
  exports: [
    MdButtonModule,
    MdIconModule,
    MdListModule,
    MdSidenavModule,
    MdToolbarModule,
    MdTooltipModule
  ],
})
export class DemoMaterialModule { }
