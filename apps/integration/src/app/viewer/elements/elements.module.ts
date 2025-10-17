import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  imports: [ViewerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ViewerComponent],
})
export class ElementsModule {}
