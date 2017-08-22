import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MimeMaterialModule } from './mime-material.module';
import { ViewerComponent } from './viewer/viewer.component';
import { IiifService } from './core/iiif-service/iiif-service';

import './rxjs-extension';
import 'openseadragon';

@NgModule({
  declarations: [
    ViewerComponent
  ],
  imports: [
    FlexLayoutModule,
    MimeMaterialModule,
    CommonModule
  ],
  exports: [
    FlexLayoutModule,
    MimeMaterialModule,
    ViewerComponent
  ],
  providers: [
    IiifService,
  ]
})
export class MimeModule {
  constructor(
    @Optional() @SkipSelf() parentModule: MimeModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
