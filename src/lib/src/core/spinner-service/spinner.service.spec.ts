import { SpinnerService } from './spinner.service';
import { TestBed, inject } from '@angular/core/testing';

describe('SpinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerService]
    });
  });

  it('should be created', inject([SpinnerService], (service: SpinnerService) => {
    expect(service).toBeTruthy();
  }));
});
