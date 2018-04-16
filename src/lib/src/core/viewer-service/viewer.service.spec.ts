import { HttpClient, HttpHandler } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { ObservableMedia } from '@angular/flex-layout';

import { ViewerService } from './viewer.service';
import { ClickService } from '../click-service/click.service';
import { CanvasService } from './../canvas-service/canvas-service';
import { ModeService } from './../mode-service/mode.service';
import { MimeResizeService } from '../mime-resize-service/mime-resize.service';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { SearchResult } from '../models/search-result';
import { Hit } from '../models/hit';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';

describe('ViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ViewerService,
        ClickService,
        CanvasService,
        ModeService,
        MimeResizeService,
        ViewerLayoutService,
        IiifContentSearchService,
        HttpClient,
        HttpHandler,
        ObservableMedia
      ]
    });
  });

  it(
    'should be created',
    inject([ViewerService], (viewerService: ViewerService) => {
      expect(viewerService).toBeTruthy();
    })
  );

  it(
    'should keep state of currentSearch on destroy when layoutSwitch = true',
    inject([ViewerService], (viewerService: ViewerService) => {
      viewerService.currentSearch = new SearchResult({ q: 'Donald Duck', hits: new Array<Hit>() });
      viewerService.destroy(true);
      expect(viewerService.currentSearch).not.toBeNull();
      expect(viewerService.currentSearch.q).toEqual('Donald Duck');
    })
  );

  it(
    'should set currentSearch to null on destroy',
    inject([ViewerService], (viewerService: ViewerService) => {
      viewerService.currentSearch = new SearchResult({ q: 'Donald Duck', hits: new Array<Hit>() });
      viewerService.destroy();
      expect(viewerService.currentSearch).toBeNull();
    })
  );
});
