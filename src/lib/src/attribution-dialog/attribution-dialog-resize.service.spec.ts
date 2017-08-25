import { TestBed, inject } from '@angular/core/testing';

import { AttributionDialogResizeService } from './attribution-dialog-resize.service';

describe('AttributionDialogResizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttributionDialogResizeService]
    });
  });

  it('should be created', inject([AttributionDialogResizeService], (service: AttributionDialogResizeService) => {
    expect(service).toBeTruthy();
  }));
});
