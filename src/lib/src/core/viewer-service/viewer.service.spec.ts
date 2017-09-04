import { inject, TestBed } from '@angular/core/testing';

import { ViewerService } from './viewer.service';
<<<<<<< HEAD
import { PageService } from './../page-service/page-service';
import { ModeService } from './../mode-service/mode.service';
import { ClickService } from '../../core/click/click.service';

import 'openseadragon';
import 'd3';
=======
import { ClickService } from '../click/click.service';
>>>>>>> master

describe('ViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ViewerService,
<<<<<<< HEAD
        PageService,
        ModeService,
=======
>>>>>>> master
        ClickService
      ]
    });
  });

  it('should be created', inject([ViewerService], (viewerService: ViewerService) => {
    expect(viewerService).toBeTruthy();
  }));
});
