import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';
import { DemoMaterialModule } from './demoMaterialModule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    DemoMaterialModule,
    MimeModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    DemoMaterialModule,
    MimeModule,
  ],
})
export class SharedModule {}
