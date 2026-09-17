import { Resource, Service } from '../models/manifest';
import { IiifV3TileSourceStrategy } from './iiif-v3-tile-source-strategy';

describe('IiifV3TileSourceStrategy', () => {
  let strategy: IiifV3TileSourceStrategy;

  beforeEach(() => {
    strategy = new IiifV3TileSourceStrategy();
  });

  it('should return the embedded IIIF Image API service', () => {
    const resource = new Resource({
      id: 'image',
      service: new Service({
        id: 'https://example.com/image',
        type: 'ImageService2',
        width: 1000,
        height: 1500,
      }),
    });

    const res = strategy.getTileSource(resource);

    expect(res).toMatchObject({
      '@context': 'http://iiif.io/api/image/2/context.json',
      id: 'https://example.com/image',
      protocol: 'http://iiif.io/api/image',
      width: 1000,
      height: 1500,
    });
  });
});
