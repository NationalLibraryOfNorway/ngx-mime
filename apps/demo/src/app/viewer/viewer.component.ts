import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import {
  MimeModule,
  MimeViewerConfig,
  MimeViewerMode,
  RecognizedTextMode,
} from '@nationallibraryofnorway/ngx-mime';
import { ManifestService } from '../core/manifest-service/manifest.service';

@Component({
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  imports: [MimeModule],
})
export class ViewerComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly manifestService = inject(ManifestService);

  readonly queryParamMap = toSignal(this.activatedRoute.queryParamMap, {
    initialValue: convertToParamMap({}),
  });
  readonly iiifVersion = computed(() => this.queryParamMap().get('v') ?? '3');
  readonly manifestUris = computed(() =>
    this.queryParamMap().getAll('manifestUri'),
  );
  readonly config = new MimeViewerConfig({
    attributionDialogEnabled: true,
    attributionDialogHideTimeout: -1,
    navigationControlEnabled: true,
    preserveZoomOnCanvasGroupChange: true,
    startOnTopOnCanvasGroupChange: true,
    isDropEnabled: true,
    initViewerMode: MimeViewerMode.PAGE,
    initRecognizedTextContentMode: RecognizedTextMode.NONE,
  });

  constructor() {
    effect(() => {
      if (this.manifestUris().length === 0) {
        const iiifVersion = this.iiifVersion();

        this.redirectToFirstManifest(iiifVersion);
      }
    });
  }

  private redirectToFirstManifest(iiifVersion: string): void {
    const firstManifestUri =
      this.manifestService.getManifests(iiifVersion)[0].uri;
    this.router.navigate(['demo'], {
      queryParams: {
        v: iiifVersion,
        manifestUri: firstManifestUri,
      },
    });
  }
}
