import { TestBed, inject } from '@angular/core/testing';

import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';

describe('AttributionDialogResizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AttributionDialogResizeService,
        MimeDomHelper,
        FullscreenService,
      ],
    });
  });

  it('should be created', inject(
    [AttributionDialogResizeService],
    (service: AttributionDialogResizeService) => {
      expect(service).toBeTruthy();
    }
  ));
});
