import { HttpClient, HttpHandler } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { ClickService } from '../click-service/click.service';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { MimeResizeService } from '../mime-resize-service/mime-resize.service';
import { Hit } from '../models/hit';
import { SearchResult } from '../models/search-result';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { CanvasService } from './../canvas-service/canvas-service';
import { ModeService } from './../mode-service/mode.service';
import { ViewerService } from './viewer.service';

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
        MediaObserver
      ]
    });
  });

  it('should be created', inject(
    [ViewerService],
    (viewerService: ViewerService) => {
      expect(viewerService).toBeTruthy();
    }
  ));

  it('should keep state of currentSearch on destroy when layoutSwitch = true', inject(
    [ViewerService],
    (viewerService: ViewerService) => {
      viewerService.currentSearch = new SearchResult({
        q: 'Donald Duck',
        hits: new Array<Hit>()
      });
      viewerService.destroy(true);
      expect(viewerService.currentSearch).not.toBeNull();
      expect(viewerService.currentSearch.q).toEqual('Donald Duck');
    }
  ));

  it('should set currentSearch to null on destroy', inject(
    [ViewerService],
    (viewerService: ViewerService) => {
      viewerService.currentSearch = new SearchResult({
        q: 'Donald Duck',
        hits: new Array<Hit>()
      });
      viewerService.destroy();
      expect(viewerService.currentSearch).toBeNull();
    }
  ));
  it('should keep state of rotation on destroy when layoutSwitch = true', inject(
    [ViewerService],
    (viewerService: ViewerService) => {
      viewerService.rotate();
      viewerService.destroy(true);
      expect(viewerService.rotation).toEqual(90);
    }
  ));

  it('should set rotation to 0 on destroy', inject(
    [ViewerService],
    (viewerService: ViewerService) => {
      viewerService.rotate();
      viewerService.destroy();
      expect(viewerService.rotation).toEqual(0);
    }
  ));
});
