import { Injectable } from '@angular/core';

import { ManifestMenuItem } from './../../models/manifest-menu-item.model';

@Injectable()
export class ManifestService {

  static readonly manifests: ManifestMenuItem[] = [
    {
      label: 'LTR',
      uri: 'http://localhost:3000/assets/fixtures/presentation/2/simple-ltr-manifest.json'
    },
    {
      label: 'RTL',
      uri: 'http://localhost:3000/assets/fixtures/presentation/2/simple-rtl-manifest.json'
    },
    {
      label: 'Minimum',
      uri: 'http://localhost:3000/assets/fixtures/presentation/2/minimum-manifest.json'
    },
    {
      label: 'Downloadable',
      uri: 'http://localhost:3000/assets/fixtures/presentation/2/downloadble-manifest.json'
    },
    {
      label: 'Searchable',
      uri: 'http://localhost:3000/assets/fixtures/presentation/2/searchable-manifest.json'
    },
    {
      label: 'License',
      uri: 'http://localhost:3000/assets/fixtures/presentation/2/license-manifest.json'
    },
    {
      label: 'Attribution',
      uri: 'http://localhost:3000/assets/fixtures/presentation/2/attribution-manifest.json'
    }
  ];

  constructor() { }

  getManifests(): ManifestMenuItem[] {
    return ManifestService.manifests;
  }
}
