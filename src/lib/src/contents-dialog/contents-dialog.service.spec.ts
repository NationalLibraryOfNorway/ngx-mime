import { TestBed, inject } from '@angular/core/testing';

import { SharedModule } from '../shared/shared.module';
import { ContentsDialogService } from './contents-dialog.service';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { ContentsDialogConfigStrategyFactory } from './contents-dialog-config-strategy-factory';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';

describe('ContentsDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      providers: [
        ContentsDialogService,
        MimeResizeService,
        MimeDomHelper,
        FullscreenService,
        ContentsDialogConfigStrategyFactory
      ]
    });
  });

  it('should be created', inject([ContentsDialogService], (service: ContentsDialogService) => {
    expect(service).toBeTruthy();
  }));
});
