import { ManifestService } from './../manifest-service/manifest.service';
import { Component, OnInit } from '@angular/core';

import { ManifestMenuItem } from './../../models/manifest-menu-item.model';

@Component({
  selector: 'demo-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {

  manifests: ManifestMenuItem[];

  constructor(private manifestService: ManifestService) { }

  ngOnInit() {
    this.manifests = this.manifestService.getManifests();
  }
}
