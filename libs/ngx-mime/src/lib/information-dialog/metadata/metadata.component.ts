import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';

@Component({
  selector: 'mime-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataComponent {
  private readonly iiifManifestService = inject(IiifManifestService);

  readonly intl = inject(MimeViewerIntl).value;
  readonly manifest = this.iiifManifestService.manifest;
}
