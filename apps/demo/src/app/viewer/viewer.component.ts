import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IiifManifestService,
  MimeViewerConfig,
  MimeViewerIntl,
  MimeViewerMode,
  RecognizedTextMode,
  SpinnerService,
} from '@nationallibraryofnorway/ngx-mime';
import { Subscription } from 'rxjs';
import { ManifestService } from './../core/manifest-service/manifest.service';

@Component({
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  providers: [],
})
export class ViewerComponent implements OnDestroy {
  public manifestUri = '';
  public config = new MimeViewerConfig({
    attributionDialogEnabled: true,
    attributionDialogHideTimeout: -1,
    navigationControlEnabled: true,
    preserveZoomOnCanvasGroupChange: true,
    startOnTopOnCanvasGroupChange: true,
    isDropEnabled: true,
    initViewerMode: MimeViewerMode.PAGE,
    initRecognizedTextContentMode: RecognizedTextMode.NONE,
  });
  private iiifVersion = 3;
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private manifestService: ManifestService
  ) {
    this.subscriptions.add(
      this.route.queryParams.subscribe((params) => {
        this.manifestUri = params['manifestUri'];
        this.iiifVersion = params['v'] || this.iiifVersion;
        if (!this.manifestUri) {
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
