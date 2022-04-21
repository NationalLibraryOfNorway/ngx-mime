import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { injectedStub } from '../../../../testing/injected-stub';
import { IiifContentSearchServiceStub } from '../../../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from '../../../test/iiif-manifest-service-stub';
import { testManifest } from '../../../test/testManifest';
import { ViewerServiceStub } from '../../../test/viewer-service-stub';
import { CanvasService } from '../../canvas-service/canvas-service';
import { IiifContentSearchService } from '../../iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../intl';
import { Hit } from '../../models/hit';
import { Rect } from '../../models/rect';
import { SearchResult } from '../../models/search-result';
import { ViewerLayout } from '../../models/viewer-layout';
import { ViewerService } from '../../viewer-service/viewer.service';
import { ContentSearchNavigationService } from './content-search-navigation.service';

describe('ContentSearchNavigationService', () => {
  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;
  let iiifManifestServiceStub: IiifManifestServiceStub;
  let contentSearchNavigationService: ContentSearchNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [
        ContentSearchNavigationService,
        MimeViewerIntl,
        CanvasService,
        { provide: ViewerService, useClass: ViewerServiceStub },
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        {
          provide: IiifContentSearchService,
          useClass: IiifContentSearchServiceStub,
        },
      ],
    });
  });

  beforeEach(() => {
    iiifContentSearchServiceStub = injectedStub(IiifContentSearchService);
    iiifManifestServiceStub = injectedStub(IiifManifestService);
    iiifManifestServiceStub._currentManifest.next(testManifest);
    iiifContentSearchServiceStub._currentSearchResult.next(
      createSearchResult()
    );
    const canvasService = TestBed.inject(CanvasService);
    canvasService.addAll(createCanvasGroups(), ViewerLayout.ONE_PAGE);
    contentSearchNavigationService = TestBed.inject(
      ContentSearchNavigationService
    );
  });

  it('should create', () => {
    expect(contentSearchNavigationService).toBeTruthy();
  });

  it('should go to next hit', waitForAsync(() => {
    contentSearchNavigationService.update(6);

    contentSearchNavigationService.currentHitCounter.subscribe((hitId) => {
      expect(hitId).toBe(6);
    });

    contentSearchNavigationService.goToNextHit();
  }));

  it('should go to previous hit', waitForAsync(() => {
    contentSearchNavigationService.update(6);

    contentSearchNavigationService.currentHitCounter.subscribe((index) => {
      expect(index).toBe(5);
    });

    contentSearchNavigationService.goToPreviousHit();
  }));

  it('should return -1 if canvasIndex is before first hit', waitForAsync(() => {
    contentSearchNavigationService.currentHitCounter.subscribe((hit) => {
      expect(hit).toBe(-1);
    });

    contentSearchNavigationService.update(0);
  }));

  it('should return 0 if canvasIndex is on first hit', waitForAsync(() => {
    contentSearchNavigationService.currentHitCounter.subscribe((hit) => {
      expect(hit).toBe(0);
    });

    contentSearchNavigationService.update(1);
  }));

  it('should return 5 if canvasIndex is between 5th and 6th hit', waitForAsync(() => {
    contentSearchNavigationService.currentHitCounter.subscribe((hit) => {
      expect(hit).toBe(5);
    });

    contentSearchNavigationService.update(6);
  }));

  it('should return 6 if canvasIndex is after last', waitForAsync(() => {
    contentSearchNavigationService.currentHitCounter.subscribe((hit) => {
      expect(hit).toBe(6);
    });

    contentSearchNavigationService.update(10);
  }));

  function createCanvasGroups(): Rect[] {
    const canvasGroups: Rect[] = [];
    for (let i = 0; i < 100; i++) {
      canvasGroups.push(new Rect());
    }
    return canvasGroups;
  }

  function createSearchResult(): SearchResult {
    return new SearchResult({
      hits: [
        new Hit({ id: 0, index: 1 }),
        new Hit({ id: 1, index: 2 }),
        new Hit({ id: 2, index: 2 }),
        new Hit({ id: 3, index: 3 }),
        new Hit({ id: 4, index: 4 }),
        new Hit({ id: 5, index: 5 }),
        new Hit({ id: 6, index: 8 }),
      ],
    });
  }
});
