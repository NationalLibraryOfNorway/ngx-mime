import { Injectable } from '@angular/core';
import { ManifestMenuItem } from './../../models/manifest-menu-item.model';

@Injectable()
export class ManifestService {
  static readonly manifests: ManifestMenuItem[] = [
    {
      label: 'LTR',
      uri: 'assets/fixtures/presentation/2/simple-ltr-manifest.json'
    },
    {
      label: 'RTL',
      uri: 'assets/fixtures/presentation/2/simple-rtl-manifest.json'
    },
    {
      label: 'Minimum',
      uri: 'assets/fixtures/presentation/2/minimum-manifest.json'
    },
    {
      label: 'Downloadable',
      uri: 'assets/fixtures/presentation/2/downloadble-manifest.json'
    },
    {
      label: 'Searchable',
      uri: 'assets/fixtures/presentation/2/searchable-manifest.json'
    },
    {
      label: 'License',
      uri: 'assets/fixtures/presentation/2/license-manifest.json'
    },
    {
      label: 'Attribution',
      uri: 'assets/fixtures/presentation/2/attribution-manifest.json'
    },
    {
      label: 'Landscape',
      uri: 'assets/fixtures/presentation/2/landscape-manifest.json'
    },
    {
      label: 'Different sizes',
      uri: 'assets/fixtures/presentation/2/different-size-manifest.json'
    },
    {
      label: 'Static image',
      uri: 'assets/fixtures/presentation/2/static-image-manifest.json'
    }
  ];

  constructor() {}

  getManifests(): ManifestMenuItem[] {
    return ManifestService.manifests;
  }
}
