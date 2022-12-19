import { NgModule } from '@angular/core';
import 'd3';
import 'openseadragon';
import { AttributionDialogComponent } from './attribution-dialog/attribution-dialog.component';
import { CanvasGroupDialogComponent } from './canvas-group-dialog/canvas-group-dialog.component';
import { ContentSearchDialogComponent } from './content-search-dialog/content-search-dialog.component';
import { ContentsDialogComponent } from './contents-dialog/contents-dialog.component';
import { MetadataComponent } from './contents-dialog/metadata/metadata.component';
import { TocComponent } from './contents-dialog/table-of-contents/table-of-contents.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
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

@NgModule({
  declarations: [
    ViewerComponent,
    ViewerHeaderComponent,
    ViewerFooterComponent,
    OsdToolbarComponent,
    ContentSearchNavigatorComponent,
    CanvasGroupNavigatorComponent,
    ViewerSpinnerComponent,
    RecognizedTextContentComponent,
    AttributionDialogComponent,
    HelpDialogComponent,
    ViewDialogComponent,
    IconComponent,
    CanvasGroupDialogComponent,
    ContentSearchDialogComponent,
    ContentsDialogComponent,
    MetadataComponent,
    TocComponent,
  ],
  imports: [SharedModule],
  exports: [ViewerComponent],
})
export class MimeModule {}
