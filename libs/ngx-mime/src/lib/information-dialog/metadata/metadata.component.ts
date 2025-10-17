import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../../core/intl';
import { Manifest } from './../../core/models/manifest';

@Component({
  selector: 'mime-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class MetadataComponent implements OnInit, OnDestroy {
  intl = inject(MimeViewerIntl);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private iiifManifestService = inject(IiifManifestService);
  public manifest: Manifest | null = null;
  private subscriptions = new Subscription();

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
