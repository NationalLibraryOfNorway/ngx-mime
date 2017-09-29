
import { NgModule} from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ContentsDialogModule } from './contents-dialog/contents-dialog.module';
import { AttributionDialogModule } from './attribution-dialog/attribution-dialog.module';
import { ContentSearchDialogModule } from './content-search-dialog/content-search-dialog.module';
import { ViewerComponent } from './viewer/viewer.component';
import { ViewerHeaderComponent } from './viewer/viewer-header/viewer-header.component';
import { ViewerFooterComponent } from './viewer/viewer-footer/viewer-footer.component';
import { ViewerSpinnerComponent } from './viewer/viewer-spinner/viewer-spinner.component';
import { OsdToolbarComponent } from './viewer/osd-toolbar/osd-toolbar.component';

import './rxjs-extension';
import 'openseadragon';
import 'd3';

@NgModule({
  declarations: [
    ViewerComponent,
    ViewerHeaderComponent,
    ViewerFooterComponent,
    ViewerSpinnerComponent,
    OsdToolbarComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    ContentsDialogModule,
    AttributionDialogModule,
    ContentSearchDialogModule
  ],
  exports: [
    ViewerComponent
  ]
})
export class MimeModule { }
