import { Service } from '../models/manifest';
import { IiifTileSourceStrategy } from './iiif-tile-source-strategy';

describe('IiifTileSourceStrategy ', () => {
  let strategy: IiifTileSourceStrategy;

  beforeEach(() => {
    strategy = new IiifTileSourceStrategy();
  });

  it('should return a IIIF Image Api Service', () => {
    const resource = new Service({
      service: new Service({
        service: new Service({
          id: 'testId'
        })
      })
    });

    const res = strategy.getTileSource(resource);

    expect(res.service.id).toBe('testId');
  });

  it('should return a complete IIIF Image Api Service uri', () => {
    const service = new Service();
    service['@id'] =
      'https://http://example.com/eb7d1d9c4b553001549d32573658c844/annotation/URN:NBN:no-nb_digibok_2009061611001_C1';
    const resource = new Service({
      service: service
    });
    const res = strategy.getTileSource(resource);

    expect(res).toBe(
      'https://http://example.com/eb7d1d9c4b553001549d32573658c844/annotation/URN:NBN:no-nb_digibok_2009061611001_C1/info.json'
    );
  });
});
