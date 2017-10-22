import { Manifest } from '../models/manifest';

export class ManifestUtils {
  static isManifestPaged(manifest: Manifest): boolean {
    return manifest && manifest.sequences && manifest.sequences[0].viewingHint === 'paged';
  }
}
