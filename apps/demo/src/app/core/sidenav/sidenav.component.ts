import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ManifestMenuItem } from './../../models/manifest-menu-item.model';
import { ManifestService } from './../manifest-service/manifest.service';

@Component({
  selector: 'demo-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() sidenav!: MatSidenav;
  iiifV = 3;
  manifests: ManifestMenuItem[];

  constructor(private manifestService: ManifestService) {
    this.manifests = this.manifestService.getManifests(this.iiifV);
  }

  selectIiifV(apiV: number) {
    this.iiifV = apiV;
    this.manifests = this.manifestService.getManifests(this.iiifV);
  }

  close() {
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }
}
