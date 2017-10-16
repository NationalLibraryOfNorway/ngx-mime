import { HttpClient, HttpHandler } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { ViewerService } from './viewer.service';
import { ClickService } from '../click-service/click.service';
import { PageService } from './../page-service/page-service';
import { ModeService } from './../mode-service/mode.service';
import { MimeResizeService } from '../mime-resize-service/mime-resize.service';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { Hit, SearchResult } from '../models/search-result';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';

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
        ViewerLayoutService,
        IiifContentSearchService,
        HttpClient,
        HttpHandler
      ]
    });
  });

  it('should be created', inject([ViewerService], (viewerService: ViewerService) => {
    expect(viewerService).toBeTruthy();
  }));

  it('should keep state of currentSearch on destroy when layoutSwitch = true',
    inject([ViewerService], (viewerService: ViewerService) => {
      viewerService.currentSearch = new SearchResult({ q: 'Donald Duck', hits: new Array<Hit>() });
      viewerService.destroy(true);
      expect(viewerService.currentSearch).not.toBeNull;
      expect(viewerService.currentSearch.q).toEqual('Donald Duck');
    }));

  it('should set currentSearch to null on destroy',
    inject([ViewerService], (viewerService: ViewerService) => {
      viewerService.currentSearch = new SearchResult({ q: 'Donald Duck', hits: new Array<Hit>() });
      viewerService.destroy();
      expect(viewerService.currentSearch).toBeNull;
    }));
});
