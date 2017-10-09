import { inject, TestBed } from '@angular/core/testing';

import { ViewerService } from './viewer.service';
import { ClickService } from '../click-service/click.service';
import { PageService } from './../page-service/page-service';
import { ModeService } from './../mode-service/mode.service';
import { MimeResizeService } from '../mime-resize-service/mime-resize.service';
import { SpinnerService } from '../spinner-service/spinner.service';

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
        SpinnerService]
    });
  });

  it('should be created', inject([ViewerService], (viewerService: ViewerService) => {
    expect(viewerService).toBeTruthy();
  }));
});
