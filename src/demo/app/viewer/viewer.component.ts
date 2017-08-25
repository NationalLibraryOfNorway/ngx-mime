import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MimeViewerConfig } from 'ngx-mime';

import { ManifestService } from './../core/manifest-service/manifest.service';

@Component({
  selector: 'viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})

export class ViewerComponent implements OnInit, OnDestroy {
  public manifestUri: string;
  public config = new MimeViewerConfig({
    attributionDialogEnabled: true,
    attributionDialogHideTimeout: -1
  });
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private manifestService: ManifestService) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.manifestUri = params['manifestUri'];
        if (!this.manifestUri) {
          this.router.navigate(['demo'], {
            queryParams: {
              manifestUri: this.manifestService.getManifests()[0].uri
            }
          });
        }

      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
