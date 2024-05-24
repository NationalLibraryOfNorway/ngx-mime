import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Spy, provideAutoSpy } from 'jest-auto-spies';
import { testManifest } from '../../../test/testManifest';
import { CanvasService } from '../../canvas-service/canvas-service';
import { IiifContentSearchService } from '../../iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../iiif-manifest-service/iiif-manifest-service';
import { Hit } from '../../models/hit';
import { SearchResult } from '../../models/search-result';
import { ContentSearchNavigationService } from './content-search-navigation.service';

describe('ContentSearchNavigationService', () => {
  let contentSearchNavigationService: ContentSearchNavigationService;
  let canvasServiceSpy: Spy<CanvasService>;
  let iiifContentSearchServiceSpy: Spy<IiifContentSearchService>;
  let iiifManifestServiceSpy: Spy<IiifManifestService>;
  let defaultSearchResult = createSearchResult();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [
        ContentSearchNavigationService,
        provideAutoSpy(CanvasService),
        provideAutoSpy(IiifManifestService, {
          observablePropsToSpyOn: ['currentManifest'],
        }),
        provideAutoSpy(IiifContentSearchService, {
          observablePropsToSpyOn: ['onChange'],
        }),
      ],
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    iiifManifestServiceSpy = TestBed.inject(
      IiifManifestService,
    ) as Spy<IiifManifestService>;
    iiifManifestServiceSpy.currentManifest.nextWith(testManifest);
    iiifContentSearchServiceSpy = TestBed.inject<any>(IiifContentSearchService);
    iiifContentSearchServiceSpy.onChange.nextWith(defaultSearchResult);
    canvasServiceSpy = <any>TestBed.inject(CanvasService);
    contentSearchNavigationService = TestBed.inject(
      ContentSearchNavigationService,
    );
    canvasServiceSpy.findCanvasGroupByCanvasIndex.mockReturnValue(1);
    canvasServiceSpy.getCanvasesPerCanvasGroup.mockReturnValue([1, 2]);
    contentSearchNavigationService.update(0);
  });

  it('should create', () => {
    expect(contentSearchNavigationService).toBeTruthy();
  });

  it('should return -1 if canvasIndex is before first hit', waitForAsync(() => {
    contentSearchNavigationService.currentHitCounter.subscribe((hit) => {
      expect(hit).toBe(-1);
    });

    canvasServiceSpy.getCanvasesPerCanvasGroup.mockReturnValue([0]);
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

    iiifContentSearchServiceSpy.onChange.nextWith(updatedSearchResult);

    expect(contentSearchNavigationService.update).toHaveBeenCalledTimes(1);
  });

  it('should navigate backwards through all search hits when goToPreviousHit is called', async () => {
    canvasServiceSpy.getCanvasesPerCanvasGroup.mockReturnValue([10]);
    contentSearchNavigationService.update(10);
    const reverseSearchResult = [...defaultSearchResult.hits].reverse();

    reverseSearchResult.forEach((searchHit) => {
      contentSearchNavigationService.goToPreviousHit();
      canvasServiceSpy.getCanvasesPerCanvasGroup.mockReturnValue([
        searchHit.index,
      ]);
    });

    const selectedIndexes = iiifContentSearchServiceSpy.selected.mock.calls.map(
      (call) => call[0].index,
    );
    const expectedIndexes = [...defaultSearchResult.hits]
      .map((searchHit) => searchHit.index)
      .reverse();
    expect(selectedIndexes).toEqual(expectedIndexes);
  });

  it('should navigate through all search hits when goToNextHit is called', async () => {
    defaultSearchResult.hits.forEach((searchHit) => {
      contentSearchNavigationService.goToNextHit();
      canvasServiceSpy.getCanvasesPerCanvasGroup.mockReturnValue([
        searchHit.index,
      ]);
    });

    const selectedIndexes = iiifContentSearchServiceSpy.selected.mock.calls.map(
      (call) => call[0].index,
    );
    const expectedIndexes = defaultSearchResult.hits.map(
      (searchHit) => searchHit.index,
    );
    expect(selectedIndexes).toEqual(expectedIndexes);
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
