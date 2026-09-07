import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { FullscreenService } from './fullscreen.service';

describe('FullscreenService', () => {
  let fullscreenDocument: any;
  let service: FullscreenService;

  beforeEach(() => {
    fullscreenDocument = {
      fullscreenEnabled: true,
      fullscreenElement: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    TestBed.configureTestingModule({
      providers: [
        FullscreenService,
        { provide: DOCUMENT, useValue: fullscreenDocument },
      ],
    });
    service = TestBed.inject(FullscreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the fullscreen signal when fullscreen changes', () => {
    const fullscreenChangeListener =
      fullscreenDocument.addEventListener.mock.calls[0][1];
    fullscreenDocument.fullscreenElement = {};

    fullscreenChangeListener();

    expect(service.isFullscreen()).toBe(true);
  });
});
