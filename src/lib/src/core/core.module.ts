import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MimeViewerIntl } from './viewer-intl';
import { IiifManifestService } from './iiif-manifest-service/iiif-manifest-service';
import { ClickService } from '../core/click/click.service';
import { PageService } from '../core/page-service/page-service';
import { MimeResizeService } from './mime-resize-service/mime-resize.service';
import { ViewerService } from './viewer-service/viewer.service';
import { ModeService } from './mode-service/mode.service';

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [
    MimeViewerIntl,
    IiifManifestService,
    ClickService,
    PageService,
    MimeResizeService,
    ViewerService,
    ModeService
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
