import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [ViewerComponent],
  exports: [ViewerComponent],
  imports: [CommonModule, MimeModule]
})
export class ComponentsModule {}
