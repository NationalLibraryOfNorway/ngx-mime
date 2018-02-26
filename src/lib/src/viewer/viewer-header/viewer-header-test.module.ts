import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';
import { ContentsDialogModule } from '../../contents-dialog/contents-dialog.module';
import { ViewerHeaderComponent } from './viewer-header.component';
import { MimeViewerIntl } from './../../core/intl/viewer-intl';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeResizeService } from './../../core/mime-resize-service/mime-resize.service';

@NgModule({
  imports: [NoopAnimationsModule, SharedModule, ContentsDialogModule, HttpClientModule],
  declarations: [ViewerHeaderComponent],
  exports: [ViewerHeaderComponent],
  providers: [MimeViewerIntl, IiifManifestService, MimeResizeService]
})
export class ViewerHeaderTestModule {}
