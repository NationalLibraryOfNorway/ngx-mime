import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewerRoutingModule } from './viewer-routing.module';
import { ViewerComponent } from './viewer.component';

@NgModule({
  exports: [ViewerComponent],
  imports: [CommonModule, ViewerRoutingModule, ViewerComponent],
})
export class ViewerModule {}
