import { Service } from '../models/manifest';
import { StaticImageTileSourceStrategy } from './static-image-tile-source-strategy';

describe('StaticImageTileSourceStrategy ', () => {
  let strategy: StaticImageTileSourceStrategy;

  beforeEach(() => {
    strategy = new StaticImageTileSourceStrategy();
  });

  it('should return a url', () => {
    const resource = new Service({});
    resource['@id'] = 'testId';

    const res = strategy.getTileSource(resource);

    expect(res.url).toBe('testId');
  });
});
