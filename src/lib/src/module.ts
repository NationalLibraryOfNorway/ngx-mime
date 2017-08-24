import { ViewerHeaderComponent } from './viewer/viewer-header/viewer-header.component';
import { ViewerFooterComponent } from './viewer/viewer-footer/viewer-footer.component';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MimeMaterialModule } from './mime-material.module';
import { ViewerComponent } from './viewer/viewer.component';
import { MimeViewerIntl } from './viewer/viewer-intl';
import { IiifService } from './core/iiif-service/iiif-service';
import { ClickService } from './core/click/click.service';
import { PageService } from './core/page-service/page-service';

import './rxjs-extension';
import 'openseadragon';

@NgModule({
  declarations: [
    ViewerComponent,
    ViewerHeaderComponent,
    ViewerFooterComponent,
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    MimeMaterialModule,
    BrowserAnimationsModule
  ],
  exports: [
    FlexLayoutModule,
    MimeMaterialModule,
    ViewerComponent
  ],
  providers: [
    MimeViewerIntl,
    IiifService,
    ClickService,
    PageService
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
