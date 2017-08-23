import { TestBed, inject } from '@angular/core/testing';

import { SharedModule } from './../shared/shared.module';
import { AttributionDialogService } from './attribution-dialog.service';
import { ResizeService } from './../core/resize-service/resize.service';

describe('AttributionDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      providers: [
        AttributionDialogService,
        ResizeService
      ]
    });
  });

  it('should be created', inject([AttributionDialogService], (service: AttributionDialogService) => {
    expect(service).toBeTruthy();
  }));
});
