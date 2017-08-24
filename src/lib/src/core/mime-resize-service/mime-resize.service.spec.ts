import { TestBed, inject } from '@angular/core/testing';

import { MimeResizeService } from './mime-resize.service';

describe('MimeResizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MimeResizeService]
    });
  });

  it('should be created', inject([MimeResizeService], (service: MimeResizeService) => {
    expect(service).toBeTruthy();
  }));
});
