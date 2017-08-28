import { inject, TestBed } from '@angular/core/testing';
import { ViewerService } from './viewer.service';
import { PageService } from './../page-service/page-service';
import { ModeService } from './../mode-service/mode.service';
import { ClickService } from '../../core/click/click.service';

import 'openseadragon';
import 'd3';

describe('ViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ViewerService,
        PageService,
        ModeService,
        ClickService
      ]
    });
  });

  it('should be created', inject([ViewerService], (viewerService: ViewerService) => {
    expect(viewerService).toBeTruthy();
  }));
});
