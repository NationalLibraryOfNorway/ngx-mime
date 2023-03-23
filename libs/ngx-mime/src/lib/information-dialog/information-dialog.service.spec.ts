import { inject, TestBed } from '@angular/core/testing';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { SharedModule } from '../shared/shared.module';
import { InformationDialogConfigStrategyFactory } from './information-dialog-config-strategy-factory';
import { InformationDialogService } from './information-dialog.service';

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
