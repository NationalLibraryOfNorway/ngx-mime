import { MimeMaterialModule } from './mime-material.module';
import { NgModule } from '@angular/core';

import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [ViewerComponent],
  imports: [MimeMaterialModule],
  exports: [ViewerComponent, MimeMaterialModule]
})
export class MimeModule { }
