import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { ElementsModule } from './elements/elements.module';
import { ViewerRoutingModule } from './viewer-routing.module';
import { ViewerComponent } from './viewer.component';

@NgModule({
  declarations: [ViewerComponent],
  exports: [ViewerComponent],
  imports: [
    CommonModule,
    ViewerRoutingModule,
    ComponentsModule,
    ElementsModule,
  ],
})
export class ViewerModule {}
