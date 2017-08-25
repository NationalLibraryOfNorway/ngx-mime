import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MimeViewerIntl } from './viewer-intl';
import { IiifManifestService } from './iiif-manifest-service/iiif-manifest-service';
import { MimeResizeService } from './mime-resize-service/mime-resize.service';

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [
    MimeViewerIntl,
    IiifManifestService,
    MimeResizeService
  ]
})
export class CoreModule {

  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
