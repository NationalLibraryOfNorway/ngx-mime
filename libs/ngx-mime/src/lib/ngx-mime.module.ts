import { NgModule } from '@angular/core';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  imports: [ViewerComponent],
  exports: [ViewerComponent],
})
export class MimeModule {}
