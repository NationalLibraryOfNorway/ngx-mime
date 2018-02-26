import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MimeMaterialModule } from './mime-material.module';
import { SpinnerService } from '../core/spinner-service/spinner.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, MimeMaterialModule],
  exports: [CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, MimeMaterialModule],
  providers: [SpinnerService]
})
export class SharedModule {}
