import { TestBed, inject } from '@angular/core/testing';

import { SharedModule } from '../shared/shared.module';
import { AttributionDialogService } from './attribution-dialog.service';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';

describe('AttributionDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [AttributionDialogService, MimeResizeService, MimeDomHelper, FullscreenService, AttributionDialogResizeService]
    });
  });

  it(
    'should be created',
    inject([AttributionDialogService], (service: AttributionDialogService) => {
      expect(service).toBeTruthy();
    })
  );
});
