import { Manifest, Service } from '../lib/core/models/manifest';

export class TestManifests {
  public static aEmpty(): Manifest {
    return new Manifest();
  }

  public static withContentSearchService(): Manifest {
    return { ...new Manifest(), service: { ...new Service(), id: 'dummyUrl' } };
  }
}
