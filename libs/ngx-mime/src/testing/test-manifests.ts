import {
  Canvas,
  Manifest,
  Sequence,
  Service,
} from '../lib/core/models/manifest';
import { ViewingDirection } from '../lib/core/models/viewing-direction';

export class TestManifests {
  public static aEmpty(): Manifest {
    return new Manifest();
  }

  public static aDefault(): Manifest {
    return new Manifest({
      label: 'Testlabel',
      viewingDirection: ViewingDirection.LTR,
      sequences: [
        new Sequence({
          viewingHint: 'paged',
        }),
      ],
    });
  }

  public static withContentSearchService(): Manifest {
    return { ...new Manifest(), service: { ...new Service(), id: 'dummyUrl' } };
  }

  public static withDigitalTextContent(): Manifest {
    return {
      ...new Manifest(),
      sequences: [
        new Sequence({
          canvases: [
            new Canvas({
              altoUrl: 'fakeUrl',
            }),
          ],
        }),
      ],
    };
  }
}
