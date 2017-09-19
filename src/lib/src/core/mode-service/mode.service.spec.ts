import { ModeService } from './mode.service';
import { TestBed, inject } from '@angular/core/testing';


describe('ModeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModeService]
    });
  });

  it('should be created', inject([ModeService], (service: ModeService) => {
    expect(service).toBeTruthy();
  }));
});
