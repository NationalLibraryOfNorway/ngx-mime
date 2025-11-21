import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl';
import { Manifest } from '../../core/models/manifest';

@Component({
  selector: 'mime-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataComponent implements OnInit, OnDestroy {
  intl = inject(MimeViewerIntl);
  manifest: Manifest | null = null;
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          this.manifest = manifest;
          this.changeDetectorRef.markForCheck();
        },
      ),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
