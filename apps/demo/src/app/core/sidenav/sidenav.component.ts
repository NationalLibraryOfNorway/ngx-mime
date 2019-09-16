import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ManifestMenuItem } from './../../models/manifest-menu-item.model';
import { ManifestService } from './../manifest-service/manifest.service';

@Component({
  selector: 'demo-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() sidenav: MatSidenav;

  manifests: ManifestMenuItem[];

  constructor(private manifestService: ManifestService) {}

  ngOnInit() {
    this.manifests = this.manifestService.getManifests();
  }

  close() {
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }
}
