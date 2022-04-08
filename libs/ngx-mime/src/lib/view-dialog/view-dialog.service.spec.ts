import { TestBed, inject } from '@angular/core/testing';

import { SharedModule } from '../shared/shared.module';
import { ViewDialogService } from './view-dialog.service';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';
import { ViewDialogConfigStrategyFactory } from './view-dialog-config-strategy-factory';

describe('ViewDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [
        ViewDialogService,
        MimeResizeService,
        MimeDomHelper,
        FullscreenService,
        ViewDialogConfigStrategyFactory,
      ],
    });
  });

  it('should be created', inject(
    [ViewDialogService],
    (service: ViewDialogService) => {
      expect(service).toBeTruthy();
    }
  ));
});
