import { inject, TestBed } from '@angular/core/testing';
import { provideAutoSpy } from 'jasmine-auto-spies';
import { MimeResizeService } from './mime-resize.service';

describe('MimeResizeService', () => {
  let service: MimeResizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAutoSpy(MimeResizeService)],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(MimeResizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
