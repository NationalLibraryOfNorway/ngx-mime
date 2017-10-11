import { TestBed, inject } from '@angular/core/testing';
import { ViewerLayoutService } from './viewer-layout-service';


describe('ViewerLayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewerLayoutService]
    });
  });

  it('should be created', inject([ViewerLayoutService], (service: ViewerLayoutService) => {
    expect(service).toBeTruthy();
  }));
});
