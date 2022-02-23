import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ManifestMenuItem } from './../../models/manifest-menu-item.model';
import { ManifestService } from './../manifest-service/manifest.service';

@Component({
  selector: 'demo-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() sidenav!: MatSidenav;
  iiifVersion = 3;
  manifests: ManifestMenuItem[];
  selectedManifest: string | undefined;

  constructor(
    private manifestService: ManifestService,
    private router: Router
  ) {
    this.manifests = this.manifestService.getManifests(this.iiifVersion);
  }

  selectIiifVersion(version: number) {
    this.iiifVersion = version;
    this.manifests = this.manifestService.getManifests(this.iiifVersion);
    if (this.selectedManifest) {
      const manifest = this.manifests.find(
        (m) => m.label === this.selectedManifest
      );
      if (manifest?.uri) {
        this.router.navigate(['demo'], {
          queryParams: { manifestUri: manifest.uri, v: manifest.iiifVersion },
        });
      }
    }
  }

  close(label?: string) {
    this.selectedManifest = label;
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }
}
