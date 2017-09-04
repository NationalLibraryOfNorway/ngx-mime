import { NgModule} from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ContentsDialogModule } from './contents-dialog/contents-dialog.module';
import { AttributionDialogModule } from './attribution-dialog/attribution-dialog.module';
import { ViewerComponent } from './viewer/viewer.component';
import { ViewerHeaderComponent } from './viewer/viewer-header/viewer-header.component';
import { OsdToolbarComponent } from './viewer/osd-toolbar/osd-toolbar.component';

import './rxjs-extension';
import 'openseadragon';

@NgModule({
  declarations: [
    ViewerComponent,
    ViewerHeaderComponent,
    OsdToolbarComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    ContentsDialogModule,
    AttributionDialogModule
  ],
  exports: [
    ViewerComponent
  ]
})
export class MimeModule { }
