import { NgModule } from '@angular/core';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  exports: [ViewerComponent],
  imports: [MimeModule, ViewerComponent],
})
export class ComponentsModule {}
