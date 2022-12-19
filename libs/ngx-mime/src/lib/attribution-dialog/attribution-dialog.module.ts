import { NgModule } from '@angular/core';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';

import { SharedModule } from '../shared/shared.module';
import { AttributionDialogComponent } from './attribution-dialog.component';

@NgModule({
  imports: [SharedModule],
})
export class AttributionDialogModule {}
