import { TestBed, inject } from '@angular/core/testing';

import { FullscreenService } from './fullscreen.service';

describe('FullscreenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FullscreenService]
    });
  });

  it(
    'should be created',
    inject([FullscreenService], (service: FullscreenService) => {
      expect(service).toBeTruthy();
    })
  );
});
