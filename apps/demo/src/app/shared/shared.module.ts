import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';
import { DemoMaterialModule } from './demoMaterialModule';

@NgModule({
  imports: [CommonModule, FormsModule, DemoMaterialModule, MimeModule],
  declarations: [],
  exports: [CommonModule, FormsModule, DemoMaterialModule, MimeModule],
})
export class SharedModule {}
