import { Manifest, Sequence } from '../models/manifest';

export class ManifestUtils {
  static isManifestPaged(manifest: Manifest): boolean {
    return (
      ManifestUtils.isManifestViewingHintPaged(manifest) ||
      ManifestUtils.isSequenceViewingHintPaged(manifest)
    );
  }

  static isManifestViewingHintPaged(manifest: Manifest): boolean {
    return manifest && manifest.viewingHint === 'paged';
  }

  static isSequenceViewingHintPaged(manifest: Manifest): boolean {
    let firstSequence: Sequence | null = null;
    if (manifest && manifest.sequences && manifest.sequences.length > 0) {
      firstSequence = manifest.sequences[0];
    }
    return firstSequence ? firstSequence.viewingHint === 'paged' : false;
  }

  static hasAltoXml(manifest: Manifest): boolean {
    if (manifest.sequences && manifest.sequences.length > 0) {
      const firstSequence = manifest.sequences[0];
      if (firstSequence.canvases && firstSequence.canvases.length > 0) {
        return firstSequence.canvases.find((c: any) => c.altoUrl) !== undefined;
      }
    }
    return false;
  }
}
