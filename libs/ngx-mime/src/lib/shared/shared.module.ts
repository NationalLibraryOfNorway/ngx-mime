import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MimeMaterialModule } from './mime-material.module';

@NgModule({
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MimeMaterialModule],
})
export class SharedModule {}
