import { Manifest } from '../models/manifest';
import { ManifestUtils } from './iiif-manifest-utils';

fdescribe('ManifestUtils', () => {
  fit('should return true if manifest has url to recognized text content defined', () => {
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
    const result = ManifestUtils.hasRecognizedTextContent(manifest);

    expect(result).toBeTruthy();
  });

  it('should return false if manifest is missing url to recognized text content ', () => {
    const manifest = new Manifest({
      sequences: [
        {
          canvases: [{}],
        },
      ],
    });

    const result = ManifestUtils.hasRecognizedTextContent(manifest);

    expect(result).toBeFalsy();
  });
});
