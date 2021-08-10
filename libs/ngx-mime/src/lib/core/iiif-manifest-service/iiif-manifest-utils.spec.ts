import { Manifest } from '../models/manifest';
import { ManifestUtils } from './iiif-manifest-utils';

describe('ManifestUtils', () => {
  it('should return true if manifest has alto url defined', () => {
    const manifest = new Manifest({
      sequences: [
        {
          canvases: [
            {
              altoUrl: 'fakeAltoUrl',
            },
          ],
        },
      ],
    });
    const result = ManifestUtils.hasAlto(manifest);

    expect(result).toBeTruthy();
  });

  it('should return false if manifest is missing alto url', () => {
    const manifest = new Manifest({
      sequences: [
        {
          canvases: [{}],
        },
      ],
    });

    const result = ManifestUtils.hasAlto(manifest);

    expect(result).toBeFalsy();
  });
});
