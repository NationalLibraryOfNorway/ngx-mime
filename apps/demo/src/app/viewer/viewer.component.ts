import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MimeViewerConfig,
  MimeViewerMode,
  RecognizedTextMode,
} from '@nationallibraryofnorway/ngx-mime';
import { Subscription } from 'rxjs';
import { ManifestService } from './../core/manifest-service/manifest.service';

@Component({
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  standalone: false,
})
export class ViewerComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private manifestService = inject(ManifestService);
  manifestUris: string[] = [];
  config = new MimeViewerConfig({
    attributionDialogEnabled: true,
    attributionDialogHideTimeout: -1,
    navigationControlEnabled: true,
    preserveZoomOnCanvasGroupChange: true,
    startOnTopOnCanvasGroupChange: true,
    isDropEnabled: true,
    initViewerMode: MimeViewerMode.PAGE,
    initRecognizedTextContentMode: RecognizedTextMode.NONE,
  });
  private iiifVersion = '3';
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.queryParamMap.subscribe(this.handleQueryParamMap.bind(this)),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private handleQueryParamMap(params: any): void {
    const iiifVersionQueryParam = params.get('v');
    this.iiifVersion = iiifVersionQueryParam || this.iiifVersion;

    this.manifestUris = params.getAll('manifestUri');

    if (this.manifestUris.length === 0) {
      this.redirectToFirstManifest();
    }
  }

  private redirectToFirstManifest(): void {
    const firstManifestUri = this.manifestService.getManifests(
      this.iiifVersion,
    )[0].uri;
    this.router.navigate(['demo'], {
      queryParams: {
        v: this.iiifVersion,
        manifestUri: firstManifestUri,
      },
    });
  }
}
