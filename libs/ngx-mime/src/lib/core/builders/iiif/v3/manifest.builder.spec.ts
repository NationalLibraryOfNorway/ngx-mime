import { testManifest } from '../../../../test/testManifestV3';
import { Canvas, Images, Manifest, Sequence } from '../../../models/manifest';
import { ManifestBuilder } from './manifest.builder';

fdescribe('ManifestBuilder', () => {
  let manifest!: Manifest;

  beforeEach(() => {
    manifest = new ManifestBuilder(testManifest).build();
  });

  it('should build manifest', () => {
    expect(manifest).not.toBeNull();
  });

  it('should test manifest content after build', () => {
    expect(manifest.type).toBe('Manifest');
    expect(manifest.id).toBe(
      'https://api.nb.no/catalog/v3/iiif/0266d0da8f0d064a7725048aacf19872/manifest'
    );
    expect(manifest.label).toBe('Fjellkongen Ludvig "Ludden"');
    expect(manifest.metadata?.length).toBe(15);
    expect(manifest.license).toBe('https://www.nb.no/lisens/stromming');
    expect(manifest.service?.id).toBe(
      'http://example.org/services/identifier/search'
    );
  });

  it('should test manifest sequence after build', () => {
    expect(manifest.sequences?.length).toBe(1);
    manifest.sequences?.forEach((sequence: Sequence) => {
      expect(sequence.id).toBe(
        'https://api.nb.no/catalog/v3/iiif/0266d0da8f0d064a7725048aacf19872/manifest'
      );
    });
  });

  it('should test manifest canvas after build', () => {
    manifest.sequences?.forEach((sequence: Sequence) => {
      expect(sequence.canvases?.length).toBe(1);
      sequence.canvases?.forEach((canvas: Canvas) => {
        expect(canvas.type).toBe('Canvas');
      });
    });
    if (manifest.sequences && manifest.sequences.length > 0) {
      const firstSequence = manifest.sequences[0];
      if (firstSequence.canvases && firstSequence.canvases.length > 0) {
        const firstCanvas = firstSequence.canvases[0];
        expect(firstCanvas.altoUrl).toBeDefined(
          'First canvas should have altoUrl'
        );
      }
    }
  });

  it('should test manifest image after build', () => {
    manifest.sequences?.forEach((sequence: Sequence) => {
      sequence.canvases?.forEach((canvas: Canvas) => {
        canvas.images?.forEach((image: Images) => {
          expect(image.id).toBeDefined('Image should have id');
          expect(image.type).toBe('Annotation');
          expect(image.motivation).toBe('painting');
        });
      });
    });
  });

  it('should have logo after build', () => {
    expect(manifest.logo).toBe('https://example.org/images/logo.png');
  });
});
