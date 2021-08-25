import { testManifest } from '../../test/testManifest';
import { Canvas, Images, Manifest, Sequence } from '../models/manifest';
import { ManifestBuilder } from './manifest.builder';

describe('ManifestBuilder', () => {
  let manifest!: Manifest;

  beforeEach(() => {
    manifest = new ManifestBuilder(testManifest).build();
  });

  it('should build manifest', () => {
    expect(manifest).not.toBeNull();
  });

  it('should test manifest content after build', () => {
    expect(manifest.type).toBe('sc:Manifest');
    expect(manifest.id).toBe(
      'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/manifest'
    );
    expect(manifest.label).toBe('Fjellkongen Ludvig "Ludden"');
    expect(manifest.metadata?.length).toBe(10);
    expect(manifest.license).toBe('https://beta.nb.no/lisens/copyright');
    expect(manifest.service?.id).toBe(
      'http://example.org/services/identifier/search'
    );
  });

  it('should test manifest sequence after build', () => {
    expect(manifest.sequences?.length).toBe(1);
    manifest.sequences?.forEach((sequence: Sequence) => {
      expect(sequence.id).toBe(
        'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/sequence/normal'
      );
      expect(sequence.type).toBe('sc:Sequence');
    });
  });

  it('should test manifest canvas after build', () => {
    manifest.sequences?.forEach((sequence: Sequence) => {
      expect(sequence.canvases?.length).toBe(85);
      sequence.canvases?.forEach((canvas: Canvas) => {
        expect(canvas.type).toBe('sc:Canvas');
        expect(canvas.label).toBeDefined('Canvas should have label');
        expect(canvas.thumbnail).toBeDefined('Canvas should have thumbnail');
        expect(canvas.height).toBeDefined('Canvas should have height');
        expect(canvas.width).toBeDefined('Canvas should have width');
      });
    });
    if (manifest.sequences && manifest.sequences.length > 0) {
      const firstSequence = manifest.sequences[0];
      if (firstSequence.canvases && firstSequence.canvases.length > 0) {
        const firstCanvas = firstSequence.canvases[0];
        expect(firstCanvas.altoUrl).toBeDefined('First canvas should have altoUrl');
      }
    }
  });

  it('should test manifest image after build', () => {
    manifest.sequences?.forEach((sequence: Sequence) => {
      sequence.canvases?.forEach((canvas: Canvas) => {
        canvas.images?.forEach((image: Images) => {
          expect(image.id).toBeDefined('Image should have @id');
          expect(image.type).toBe('oa:Annotation');
          expect(image.motivation).toBe('sc:painting');
          expect(image.resource).toBeDefined('Image should have resource');
          expect(image.id).toContain(image.resource?.id);
          expect(image.resource?.height).toBeDefined(
            'Image should have height'
          );
          expect(image.resource?.width).toBeDefined('Image should have width');
          expect(image.resource?.service).toBeDefined(
            'image resource should have service'
          );
          const service = image.resource?.service;
          expect(service).toBeTruthy();
          expect(service?.context).toBe(
            'http://iiif.io/api/image/2/context.json'
          );
          expect(service?.id).toBe(
            'https://www.nb.no/services/image/resolver/' + image.resource?.id
          );
          expect(service?.service).toBeDefined(
            'Image service should have service'
          );
        });
      });
    });
  });

  it('should have logo after build', () => {
    expect(manifest.logo).toBe('http://example.com/dummylogo.jpg');
  });
});
