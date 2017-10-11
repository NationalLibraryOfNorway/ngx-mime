import { inject, TestBed } from '@angular/core/testing';

import { ViewerService } from './viewer.service';
import { ClickService } from '../click-service/click.service';
import { PageService } from './../page-service/page-service';
import { ModeService } from './../mode-service/mode.service';
import { MimeResizeService } from '../mime-resize-service/mime-resize.service';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';

describe('ViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ViewerService,
        ClickService,
        PageService,
        ModeService,
        MimeResizeService,
        ViewerLayoutService
      ]
    });
  });

  it('should be created', inject([ViewerService], (viewerService: ViewerService) => {
    expect(viewerService).toBeTruthy();
  }));
});
