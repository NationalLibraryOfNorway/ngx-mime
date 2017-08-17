import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MimeMaterialModule } from './mime-material.module';
import { MimeViewerIntl } from './viewer/viewer-intl';
import { ViewerComponent } from './viewer/viewer.component';
import { ViewerHeaderComponent } from './viewer/viewer-header/viewer-header.component';
import { MetadataComponent } from './viewer/contents/metadata/metadata.component';
import { ContentsComponent } from './viewer/contents/contents.component';
import { IiifService } from './core/iiif-service/iiif-service';

import './rxjs-extension';
import 'openseadragon';

@NgModule({
  declarations: [
    ViewerComponent,
    ViewerHeaderComponent,
    ContentsComponent,
    MetadataComponent
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
    MimeViewerIntl,
    IiifService,
  ],
  entryComponents: [
    ContentsComponent
  ],
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
