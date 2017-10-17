import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { ManifestService } from './../manifest-service/manifest.service';
import { ManifestMenuItem } from './../../models/manifest-menu-item.model';

@Component({
  selector: 'demo-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {
  @Input() sidenav: MatSidenav;

  manifests: ManifestMenuItem[];

  constructor(private manifestService: ManifestService) { }

  ngOnInit() {
    this.manifests = this.manifestService.getManifests();
  }

  close() {
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }
}
