import { UrlBuilder } from './url.builder';

describe('UrlBuidler', () => {

  it('should build manifest url', () => {
    let result = UrlBuilder.getManifestUrl('id1');

    expect(result).toBe('https://api.nb.no/catalog/v1/iiif/id1/manifest');
  });
});
