import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  fakeAsync,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { injectedStub } from '../../../../testing/injected-stub';
import { IiifContentSearchServiceStub } from '../../../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from '../../../test/iiif-manifest-service-stub';
import { testManifest } from '../../../test/testManifest';
import { ViewerServiceStub } from '../../../test/viewer-service-stub';
import { CanvasService } from '../../canvas-service/canvas-service';
import { IiifContentSearchService } from '../../iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../intl/viewer-intl';
import { Hit } from '../../models/hit';
import { Rect } from '../../models/rect';
import { SearchResult } from '../../models/search-result';
import { ViewerLayout } from '../../models/viewer-layout';
import { ViewerService } from '../../viewer-service/viewer.service';
import { ContentSearchNavigationService } from './content-search-navigation.service';

describe('ContentSearchNavigationService', () => {
  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;
  let iiifManifestServiceStub: IiifManifestServiceStub;

  beforeEach(
    waitForAsync(() => {
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
    })
  );

  beforeEach(() => {
    iiifContentSearchServiceStub = injectedStub(IiifContentSearchService);
    iiifManifestServiceStub = injectedStub(IiifManifestService);
    iiifManifestServiceStub._currentManifest.next(testManifest);
    iiifContentSearchServiceStub._currentSearchResult.next(
      createSearchResult()
    );
    const canvasService = TestBed.inject(CanvasService);
    canvasService.addAll(createCanvasGroups(), ViewerLayout.ONE_PAGE);
  });

  it('should create', inject(
    [ContentSearchNavigationService],
    (service: ContentSearchNavigationService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should go to next index', inject(
    [ContentSearchNavigationService],
    fakeAsync((csns: ContentSearchNavigationService) => {
      csns.update(5);
      expect(csns.getCurrentIndex()).toBe(2);

      csns.goToNextCanvasGroupHit();
      expect(csns.getCurrentIndex()).toBe(3);
    })
  ));

  it('should go to previous index', inject(
    [ContentSearchNavigationService],
    fakeAsync((csns: ContentSearchNavigationService) => {
      csns.update(4);
      expect(csns.getCurrentIndex()).toBe(1);

      csns.goToPreviousCanvasGroupHit();
      expect(csns.getCurrentIndex()).toBe(0);
    })
  ));

  it('should return -1 if canvasIndex is before first hit', inject(
    [ContentSearchNavigationService],
    fakeAsync((csns: ContentSearchNavigationService) => {
      csns.update(1);
      expect(csns.getCurrentIndex()).toBe(-1);
    })
  ));

  it('should return 0 if canvasIndex is on first hit', inject(
    [ContentSearchNavigationService],
    fakeAsync((csns: ContentSearchNavigationService) => {
      csns.update(2);
      expect(csns.getCurrentIndex()).toBe(0);
    })
  ));

  it('should return 0 if canvasIndex is between first and second hit', inject(
    [ContentSearchNavigationService],
    fakeAsync((csns: ContentSearchNavigationService) => {
      csns.update(3);
      expect(csns.getCurrentIndex()).toBe(0);
    })
  ));

  it('should return 2 if canvasIndex is between second and fourth hit', inject(
    [ContentSearchNavigationService],
    fakeAsync((csns: ContentSearchNavigationService) => {
      csns.update(6);
      expect(csns.getCurrentIndex()).toBe(2);
    })
  ));

  it('should return 3 if canvasIndex is after last', inject(
    [ContentSearchNavigationService],
    fakeAsync((csns: ContentSearchNavigationService) => {
      csns.update(10);
      expect(csns.getCurrentIndex()).toBe(3);
    })
  ));

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
        new Hit({ index: 2 }),
        new Hit({ index: 4 }),
        new Hit({ index: 5 }),
        new Hit({ index: 8 }),
      ],
    });
  }
});
