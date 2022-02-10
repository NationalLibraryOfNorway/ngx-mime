import { Injectable } from '@angular/core';
import { ManifestMenuItem } from './../../models/manifest-menu-item.model';

@Injectable()
export class ManifestService {
  static readonly manifests: ManifestMenuItem[] = [
    {
      label: 'LTR',
      uri: 'assets/fixtures/presentation/2/simple-ltr-manifest.json',
      iiifVersion: 2,
    },
    {
      label: 'RTL',
      uri: 'assets/fixtures/presentation/2/simple-rtl-manifest.json',
      iiifVersion: 2,
    },
    {
      label: 'Minimum',
      uri: 'assets/fixtures/presentation/2/minimum-manifest.json',
      iiifVersion: 2,
    },
    {
      label: 'Searchable',
      uri: 'assets/fixtures/presentation/2/searchable-manifest.json',
      iiifVersion: 2,
    },
    {
      label: 'License',
      uri: 'assets/fixtures/presentation/2/license-manifest.json',
      iiifVersion: 2,
    },
    {
      label: 'Attribution',
      uri: 'assets/fixtures/presentation/2/attribution-manifest.json',
      iiifVersion: 2,
    },
    {
      label: 'Landscape',
      uri: 'assets/fixtures/presentation/2/landscape-manifest.json',
      iiifVersion: 2,
    },
    {
      label: 'Different sizes',
      uri: 'assets/fixtures/presentation/2/different-size-manifest.json',
      iiifVersion: 2,
    },
    {
      label: 'Recognized text',
      uri: 'assets/fixtures/presentation/2/recognized-text-manifest.json',
      iiifVersion: 2,
    },
    {
      label: 'Static image',
      uri: 'assets/fixtures/presentation/2/static-image-manifest.json',
      iiifVersion: 2,
    },
    {
      label: 'LTR',
      uri: 'assets/fixtures/presentation/3/simple-ltr-manifest.json',
      iiifVersion: 3,
    },
    {
      label: 'RTL',
      uri: 'assets/fixtures/presentation/3/simple-rtl-manifest.json',
      iiifVersion: 3,
    },
    {
      label: 'Minimum',
      uri: 'assets/fixtures/presentation/3/minimum-manifest.json',
      iiifVersion: 3,
    },
    {
      label: 'Searchable',
      uri: 'assets/fixtures/presentation/3/searchable-manifest.json',
      iiifVersion: 3,
    },
    {
      label: 'License',
      uri: 'assets/fixtures/presentation/3/license-manifest.json',
      iiifVersion: 3,
    },
    {
      label: 'Attribution',
      uri: 'assets/fixtures/presentation/3/attribution-manifest.json',
      iiifVersion: 3,
    },
    {
      label: 'Landscape',
      uri: 'assets/fixtures/presentation/3/landscape-manifest.json',
      iiifVersion: 3,
    },
    {
      label: 'Different sizes',
      uri: 'assets/fixtures/presentation/3/different-size-manifest.json',
      iiifVersion: 3,
    },
    {
      label: 'Recognized text',
      uri: 'assets/fixtures/presentation/3/recognized-text-manifest.json',
      iiifVersion: 3,
    },
    {
      label: 'Static image',
      uri: 'assets/fixtures/presentation/3/static-image-manifest.json',
      iiifVersion: 3,
    },
  ];

  constructor() {}

  getManifests(iiifVersion: number = 3): ManifestMenuItem[] {
    return ManifestService.manifests.filter(
      (m) => m.iiifVersion === iiifVersion
    );
  }
}
