import { Component, OnDestroy } from '@angular/core';
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
  providers: [],
})
export class ViewerComponent implements OnDestroy {
  manifestUris: string[] = [];
  viewerHeight = 100;
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
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private manifestService: ManifestService
  ) {
    this.subscriptions.add(
      this.route.queryParamMap.subscribe((params) => {
        this.iiifVersion = params.get('v') || this.iiifVersion;
        this.manifestUris = params.getAll('manifestUri');
        this.viewerHeight = 100 / this.manifestUris.length;
        if (this.manifestUris.length === 0) {
          this.router.navigate(['demo'], {
            queryParams: {
              v: this.iiifVersion,
              manifestUri: this.manifestService.getManifests(
                this.iiifVersion
              )[0].uri,
            },
          });
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
