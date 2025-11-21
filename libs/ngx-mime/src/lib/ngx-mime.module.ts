import { NgModule } from '@angular/core';
import { MimeViewerIntl } from './core/intl';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  imports: [ViewerComponent],
  exports: [ViewerComponent],
  providers: [MimeViewerIntl],
})
export class MimeModule {}
