import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ContentSearchDialogModule } from '../../content-search-dialog/content-search-dialog.module';
import { ContentsDialogModule } from '../../contents-dialog/contents-dialog.module';
import { AltoService } from '../../core/alto-service/alto.service';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { ClickService } from '../../core/click-service/click.service';
import { FullscreenService } from '../../core/fullscreen-service/fullscreen.service';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { MimeDomHelper } from '../../core/mime-dom-helper';
import { MimeResizeService } from '../../core/mime-resize-service/mime-resize.service';
import { ModeService } from '../../core/mode-service/mode.service';
import { ViewerLayoutService } from '../../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../../core/viewer-service/viewer.service';
import { HelpDialogModule } from '../../help-dialog/help-dialog.module';
import { SharedModule } from '../../shared/shared.module';
import { AltoServiceStub } from '../../test/alto-service-stub';
import { FullscreenServiceStub } from '../../test/fullscreen-service-stub';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../../core/intl/viewer-intl';
import { IconComponent } from './icon/icon.component';
import { ViewerHeaderComponent } from './viewer-header.component';

@NgModule({
  imports: [
    NoopAnimationsModule,
    SharedModule,
    ContentsDialogModule,
    HttpClientModule,
    MatButtonToggleModule,
    ContentSearchDialogModule,
    HelpDialogModule,
  ],
  declarations: [ViewerHeaderComponent, IconComponent],
  exports: [ViewerHeaderComponent],
  providers: [
    MimeViewerIntl,
    IiifManifestService,
    MimeResizeService,
    ViewerService,
    ClickService,
    CanvasService,
    ModeService,
    MimeDomHelper,
    ViewerLayoutService,
    IiifContentSearchService,
    { provide: FullscreenService, useClass: FullscreenServiceStub },
    { provide: IiifManifestService, useClass: IiifManifestServiceStub },
    { provide: AltoService, useClass: AltoServiceStub },
  ],
})
export class ViewerHeaderTestModule {}
