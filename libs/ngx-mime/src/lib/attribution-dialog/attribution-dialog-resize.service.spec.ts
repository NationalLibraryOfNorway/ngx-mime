import { inject, TestBed } from '@angular/core/testing';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';

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
