import { NgModule } from '@angular/core';
import { ViewDialogModule } from '../view-dialog/view-dialog.module';
import { AccessKeysService } from './access-keys-handler-service/access-keys.service';
import { AltoService } from './alto-service/alto.service';
import { CanvasService } from './canvas-service/canvas-service';
import { ClickService } from './click-service/click.service';
import { FullscreenService } from './fullscreen-service/fullscreen.service';
import { HighlightService } from './highlight-service/highlight.service';
import { IiifContentSearchService } from './iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from './iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './intl/viewer-intl';
import { MimeResizeService } from './mime-resize-service/mime-resize.service';
import { ModeService } from './mode-service/mode.service';
import { ContentSearchNavigationService } from './navigation/content-search-navigation-service/content-search-navigation.service';
import { SpinnerService } from './spinner-service/spinner.service';
import { StyleService } from './style-service/style.service';
import { ViewerLayoutService } from './viewer-layout-service/viewer-layout-service';
import { ViewerService } from './viewer-service/viewer.service';

@NgModule({
  providers: [
  ],
})
export class CoreModule {}
