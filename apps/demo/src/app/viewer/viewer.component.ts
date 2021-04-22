import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MimeViewerConfig,
  MimeViewerMode,
} from '@nationallibraryofnorway/ngx-mime';
import { Subscription } from 'rxjs';
import { ManifestService } from './../core/manifest-service/manifest.service';

@Component({
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit, OnDestroy {
  public manifestUri: string;
  public config = new MimeViewerConfig({
    attributionDialogEnabled: true,
    attributionDialogHideTimeout: -1,
    navigationControlEnabled: true,
    preserveZoomOnCanvasGroupChange: true,
    startOnTopOnCanvasGroupChange: true,
    isDropEnabled: true,
    initViewerMode: MimeViewerMode.PAGE,
  });
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private manifestService: ManifestService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.route.queryParams.subscribe((params) => {
        this.manifestUri = params['manifestUri'];
        if (!this.manifestUri) {
          this.router.navigate(['demo'], {
            queryParams: {
              manifestUri: this.manifestService.getManifests()[0].uri,
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
