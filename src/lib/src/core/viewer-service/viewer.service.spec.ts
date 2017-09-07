import { inject, TestBed } from '@angular/core/testing';

import { ViewerService } from './viewer.service';
import { ClickService } from '../click/click.service';
import { PageService } from './../page-service/page-service';
import { ModeService } from './../mode-service/mode.service';

describe('ViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ViewerService,
        ClickService,
        PageService,
        ModeService
      ]
    });
  });

  it('should be created', inject([ViewerService], (viewerService: ViewerService) => {
    expect(viewerService).toBeTruthy();
  }));
});
