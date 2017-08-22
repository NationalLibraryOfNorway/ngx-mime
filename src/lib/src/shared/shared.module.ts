import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MimeMaterialModule } from './mime-material.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MimeMaterialModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MimeMaterialModule
  ],
})
export class SharedModule { }
