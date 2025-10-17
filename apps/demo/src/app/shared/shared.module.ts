import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';

@NgModule({
  imports: [CommonModule, FormsModule, MimeModule],
  declarations: [],
  exports: [CommonModule, FormsModule, MimeModule],
})
export class SharedModule {}
