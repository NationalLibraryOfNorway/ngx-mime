import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';
import 'jest-webgl-canvas-mock';
import OpenSeadragon from 'openseadragon';

globalThis.OpenSeadragon = OpenSeadragon;

setupZonelessTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});
