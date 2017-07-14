import { ManifestService } from './../core/manifest-service/manifest.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})

export class ViewerComponent implements OnInit, OnDestroy {
  public manifestUri: string;
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
