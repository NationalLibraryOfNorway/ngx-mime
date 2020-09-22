import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ViewerComponent],
  exports: [ViewerComponent]
})
export class ElementsModule {}
