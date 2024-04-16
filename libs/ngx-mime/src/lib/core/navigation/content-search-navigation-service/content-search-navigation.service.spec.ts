import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Spy, provideAutoSpy } from 'jest-auto-spies';
import { IiifContentSearchServiceStub } from '../../../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from '../../../test/iiif-manifest-service-stub';
import { testManifest } from '../../../test/testManifest';
import { CanvasService } from '../../canvas-service/canvas-service';
import { IiifContentSearchService } from '../../iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../iiif-manifest-service/iiif-manifest-service';
import { Hit } from '../../models/hit';
import { SearchResult } from '../../models/search-result';
import { ContentSearchNavigationService } from './content-search-navigation.service';

describe('ContentSearchNavigationService', () => {
  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;
  let iiifManifestServiceStub: IiifManifestServiceStub;
  let contentSearchNavigationService: ContentSearchNavigationService;
  let canvasServiceSpy: Spy<CanvasService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [
        ContentSearchNavigationService,
        provideAutoSpy(CanvasService),
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        {
          provide: IiifContentSearchService,
          useClass: IiifContentSearchServiceStub,
        },
      ],
    });
  });

  beforeEach(() => {
    iiifContentSearchServiceStub = TestBed.inject<any>(
      IiifContentSearchService,
    );
    iiifManifestServiceStub = TestBed.inject<any>(IiifManifestService);
    iiifManifestServiceStub._currentManifest.next(testManifest);
    iiifContentSearchServiceStub._currentSearchResult.next(
      createSearchResult(),
    );
    canvasServiceSpy = <any>TestBed.inject(CanvasService);
    contentSearchNavigationService = TestBed.inject(
      ContentSearchNavigationService,
    );
    canvasServiceSpy.findCanvasGroupByCanvasIndex.mockReturnValue(1);
  });

  it('should create', () => {
    expect(contentSearchNavigationService).toBeTruthy();
  });

  it('should go to next hit', waitForAsync(() => {
    canvasServiceSpy.getCanvasesPerCanvasGroup.mockReturnValue([6]);
    contentSearchNavigationService.update(6);

    contentSearchNavigationService.currentHitCounter.subscribe((hitId) => {
      expect(hitId).toBe(6);
    });

    contentSearchNavigationService.goToNextHit();
  }));

  it('should go to previous hit', waitForAsync(() => {
    canvasServiceSpy.getCanvasesPerCanvasGroup.mockReturnValue([6]);
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
    canvasServiceSpy.getCanvasesPerCanvasGroup.mockReturnValue([1]);

    contentSearchNavigationService.currentHitCounter.subscribe((hit) => {
      expect(hit).toBe(0);
    });

    contentSearchNavigationService.update(1);
  }));

  it('should return 5 if canvasIndex is between 5th and 6th hit', waitForAsync(() => {
    canvasServiceSpy.getCanvasesPerCanvasGroup.mockReturnValue([6]);

    contentSearchNavigationService.currentHitCounter.subscribe((hit) => {
      expect(hit).toBe(5);
    });

    contentSearchNavigationService.update(6);
  }));

  it('should return 6 if canvasIndex is after last', waitForAsync(() => {
    canvasServiceSpy.getCanvasesPerCanvasGroup.mockReturnValue([10]);

    contentSearchNavigationService.currentHitCounter.subscribe((hit) => {
      expect(hit).toBe(6);
    });

    contentSearchNavigationService.update(10);
  }));

  it('should call update function when searchresult changes', () => {
    jest.spyOn(contentSearchNavigationService, 'update');
    const updatedSearchResult = createSearchResult();
    updatedSearchResult.add(new Hit({ id: 7, index: 20 }));

    iiifContentSearchServiceStub._currentSearchResult.next(updatedSearchResult);

    expect(contentSearchNavigationService.update).toHaveBeenCalledTimes(1);
  });

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
