import { NgModule } from '@angular/core';

import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [ViewerComponent],
  exports: [ViewerComponent]
})
export class MimeModule { }
