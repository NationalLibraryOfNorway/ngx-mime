import { ManifestBuilder } from './manifest.builder';
import { testManifest } from '../../test/testManifest';

describe('ManifestBuidler', () => {

  it('should build manifest', () => {
    let result = new ManifestBuilder(testManifest).build();

    expect(result).not.toBeNull();
  });
});
