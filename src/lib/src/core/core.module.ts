import { SpinnerService } from './spinner-service/spinner.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MimeViewerIntl } from './intl/viewer-intl';
import { IiifManifestService } from './iiif-manifest-service/iiif-manifest-service';
import { IiifContentSearchService } from './iiif-content-search-service/iiif-content-search.service';
import { PageService } from '../core/page-service/page-service';
import { MimeResizeService } from './mime-resize-service/mime-resize.service';
import { FullscreenService } from './fullscreen-service/fullscreen.service';
import { ViewerService } from './viewer-service/viewer.service';
import { ModeService } from './mode-service/mode.service';
import { ClickService } from './click-service/click.service';
import { ViewerLayoutService } from './viewer-layout-service/viewer-layout-service';

@NgModule({
  providers: [
    MimeViewerIntl,
    IiifManifestService,
    IiifContentSearchService,
    MimeResizeService,
    FullscreenService,
    ViewerService,
    ClickService,
    PageService,
    ModeService,
    SpinnerService,
    ViewerLayoutService
  ]
})
export class CoreModule { }
