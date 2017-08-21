import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { ContentsDialogModule } from './contents-dialog/contents-dialog.module';
import { MimeViewerIntl } from './viewer/viewer-intl';
import { ViewerComponent } from './viewer/viewer.component';
import { ViewerHeaderComponent } from './viewer/viewer-header/viewer-header.component';
import { IiifManifestService } from './core/iiif-manifest-service/iiif-manifest-service';

import './rxjs-extension';
import 'openseadragon';

@NgModule({
  declarations: [
    ViewerComponent,
    ViewerHeaderComponent,
  ],
  imports: [
    SharedModule,
    ContentsDialogModule,
    HttpClientModule
  ],
  exports: [
    ViewerComponent
  ],
  providers: [
    MimeViewerIntl,
    IiifManifestService,
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
