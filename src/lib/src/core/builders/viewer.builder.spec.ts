import { Options } from '../models/options';
import { testManifest } from '../../test/testManifest';
import { ManifestBuilder } from './manifest.builder';
import { ViewerBuilder } from './viewer.builder';

describe('ViewerBuidler', () => {

  it('should build viewer', () => {
    pending('Dont know how to test');
    const options = new Options();
    const manifest = new ManifestBuilder(testManifest).build();
    const viewer = new ViewerBuilder()
      .withOptions(options)
      .withTiles(manifest.tileSource)
      .create();

    expect(viewer).not.toBeNull();
  });
});
