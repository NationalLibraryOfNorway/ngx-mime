import { MimeMaterialModule } from './mime-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

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
