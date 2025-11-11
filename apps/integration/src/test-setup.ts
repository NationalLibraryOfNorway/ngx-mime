import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone/index';

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});
