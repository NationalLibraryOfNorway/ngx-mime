import { TestBed, inject } from '@angular/core/testing';

import { MimeResizeService } from './mime-resize.service';
import { MimeDomHelper } from '../mime-dom-helper';
import { FullscreenService } from '../fullscreen-service/fullscreen.service';

describe('MimeResizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MimeResizeService,
        MimeDomHelper,
        FullscreenService
      ]
    });
  });

  it('should be created', inject([MimeResizeService], (service: MimeResizeService) => {
    expect(service).toBeTruthy();
  }));
});
