import { Manifest } from '../models/manifest';
import { ManifestUtils } from './iiif-manifest-utils';

describe('ViewerHeaderComponent', () => {
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
    const result = ManifestUtils.hasAltoXml(manifest);

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

    const result = ManifestUtils.hasAltoXml(manifest);

    expect(result).toBeFalsy();
  });
});
