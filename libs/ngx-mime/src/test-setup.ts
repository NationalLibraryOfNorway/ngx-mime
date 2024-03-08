// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment
globalThis.ngJest = {
  testEnvironmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
};
import 'jest-preset-angular/setup-jest';

import OpenSeadragon from 'openseadragon';

global.OpenSeadragon = OpenSeadragon;
window['SVGPathElement'] = {} as any;
