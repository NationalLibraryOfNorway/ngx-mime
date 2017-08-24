import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MimeViewerIntl } from './viewer-intl';
import { IiifManifestService } from './iiif-manifest-service/iiif-manifest-service';
import { ResizeService } from './resize-service/resize.service';
import { ClickService } from '../core/click/click.service';
import { PageService } from '../core/page-service/page-service';

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [
    MimeViewerIntl,
    IiifManifestService,
    ResizeService,
    ClickService,
    PageService,
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
