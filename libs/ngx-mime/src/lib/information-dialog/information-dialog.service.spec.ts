import { inject, TestBed } from '@angular/core/testing';

import { SharedModule } from '../shared/shared.module';
import { InformationDialogService } from './information-dialog.service';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { InformationDialogConfigStrategyFactory } from './information-dialog-config-strategy-factory.service';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';

describe('InformationDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [
        InformationDialogService,
        MimeResizeService,
        MimeDomHelper,
        FullscreenService,
        InformationDialogConfigStrategyFactory,
      ],
    });
  });

  it('should be created', inject(
    [InformationDialogService],
    (service: InformationDialogService) => {
      expect(service).toBeTruthy();
    }
  ));
});
