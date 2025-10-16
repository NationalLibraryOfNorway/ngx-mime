import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import 'jest-webgl-canvas-mock';

import OpenSeadragon from 'openseadragon';

global.OpenSeadragon = OpenSeadragon;

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});
