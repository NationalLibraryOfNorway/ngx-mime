import { NgModule } from '@angular/core';
import 'd3';
import 'openseadragon';
import { AttributionDialogComponent } from './attribution-dialog/attribution-dialog.component';
import { CanvasGroupDialogComponent } from './canvas-group-dialog/canvas-group-dialog.component';
import { ContentSearchDialogComponent } from './content-search-dialog/content-search-dialog.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { InformationDialogComponent } from './information-dialog/information-dialog.component';
import { MetadataComponent } from './information-dialog/metadata/metadata.component';
import { TocComponent } from './information-dialog/table-of-contents/table-of-contents.component';
import { SharedModule } from './shared/shared.module';
import { IconComponent } from './view-dialog/icon/icon.component';
import { ViewDialogComponent } from './view-dialog/view-dialog.component';
import { OsdToolbarComponent } from './viewer/osd-toolbar/osd-toolbar.component';
import { RecognizedTextContentComponent } from './viewer/recognized-text-content/recognized-text-content.component';
import { CanvasGroupNavigatorComponent } from './viewer/viewer-footer/canvas-group-navigator/canvas-group-navigator.component';
import { ContentSearchNavigatorComponent } from './viewer/viewer-footer/content-search-navigator/content-search-navigator.component';
import { ViewerFooterComponent } from './viewer/viewer-footer/viewer-footer.component';
import { ViewerHeaderComponent } from './viewer/viewer-header/viewer-header.component';
import { ViewerSpinnerComponent } from './viewer/viewer-spinner/viewer-spinner.component';
import { ViewerComponent } from './viewer/viewer.component';
import { MimeViewerIntl } from './core/intl';

@NgModule({
  imports: [
    SharedModule,
    AttributionDialogComponent,
    CanvasGroupDialogComponent,
    CanvasGroupNavigatorComponent,
    ContentSearchDialogComponent,
    ContentSearchNavigatorComponent,
    HelpDialogComponent,
    IconComponent,
    InformationDialogComponent,
    MetadataComponent,
    OsdToolbarComponent,
    RecognizedTextContentComponent,
    TocComponent,
    ViewDialogComponent,
    ViewerComponent,
    ViewerFooterComponent,
    ViewerHeaderComponent,
    ViewerSpinnerComponent,
  ],
  providers: [MimeViewerIntl],
  exports: [ViewerComponent],
})
export class MimeModule {}
