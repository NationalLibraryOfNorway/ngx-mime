import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MimeMaterialModule } from './mime-material.module';
import { ViewerComponent } from './viewer/viewer.component';
import { CustomHttp } from './core/custom-http';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { IiifService } from './core/iiif-service/iiif-service';
import { Options } from './core/models/options';
import { ViewerBuilder } from './core/builders/viewer.builder';

export function httpFactory(backend: XHRBackend, options: RequestOptions) {
  return new CustomHttp(backend, options);
}

@NgModule({
  declarations: [
    ViewerComponent
  ],
  imports: [
    FlexLayoutModule,
    MimeMaterialModule,
    HttpModule
  ],
  exports: [
    FlexLayoutModule,
    MimeMaterialModule,
    ViewerComponent
  ],
  providers: [
    IiifService,
    ViewerBuilder,
    Options,
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] }
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
