import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './../../../shared/shared.module';
import { ContentSearchNavigatorComponent } from './content-search-navigator.component';
import { Hit, SearchResult } from './../../../core/models/search-result';
import { MimeViewerIntl } from './../../../core/intl/viewer-intl';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
import { IiifContentSearchService } from './../../../core/iiif-content-search-service/iiif-content-search.service';
import { PageService } from './../../../core/page-service/page-service';
import { ContentSearchNavigationService }
  from '../../../core/navigation/content-search-navigation-service/content-search-navigation.service';
import { IiifContentSearchServiceStub } from '../../../test/iiif-content-search-service-stub';
import { ViewerServiceMock } from './../../../test/viewer-service-mock';
import { Rect } from '../../../core/models/rect';
import { ViewerLayout } from '../../../core/models/viewer-layout';

describe('ContentSearchNavigatorComponent', () => {
  let component: ContentSearchNavigatorComponent;
  let fixture: ComponentFixture<ContentSearchNavigatorComponent>;
  let iiifContentSearchService: IiifContentSearchServiceStub;
  let pageService: PageServiceMock;
  let contentSearchNavigationService: ContentSearchNavigationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [
        ContentSearchNavigatorComponent
      ],
      providers: [
        MimeViewerIntl,
        ContentSearchNavigationService,
        { provide: ViewerService, useClass: ViewerServiceMock },
        { provide: IiifContentSearchService, useClass: IiifContentSearchServiceStub },
        { provide: PageService, useClass: PageServiceMock }
      ]

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSearchNavigatorComponent);
    iiifContentSearchService = TestBed.get(IiifContentSearchService);
    contentSearchNavigationService = TestBed.get(ContentSearchNavigationService);
    pageService = TestBed.get(PageService);

    component = fixture.componentInstance;
    component.searchResult = createDefaultData();
    iiifContentSearchService._currentSearchResult.next(component.searchResult);
    pageService.addPages(createDefaultTileRects(102), ViewerLayout.TWO_PAGE, true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed',
    inject([MimeViewerIntl], (intl: MimeViewerIntl) => {
      const text = fixture.debugElement.query(By.css('#footerNavigateNextHitButton'));
      expect(text.nativeElement.getAttribute('aria-label')).toContain(`Next Hit`);

      intl.nextHitLabel = 'New test string';
      intl.changes.next();
      fixture.detectChanges();
      expect(text.nativeElement.getAttribute('aria-label')).toContain('New test string');
    })
  );

  describe('Two page display', () => {

    it('should go to first hit if current canvas is 4 and user presses previous hit button', () => {
      spyOn(contentSearchNavigationService, 'goToPreviousHitPage').and.callThrough();
      pageService.setPageChange(4);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const res = component.goToPreviousHitPage();
        expect(contentSearchNavigationService.goToPreviousHitPage).toHaveBeenCalledTimes(1);
        expect(contentSearchNavigationService.getCurrentIndex()).toEqual(0);
      });
    });

    it('should go to first hit if current canvas is 3 and user presses previous hit button', () => {
      spyOn(contentSearchNavigationService, 'goToPreviousHitPage').and.callThrough();
      pageService.setPageChange(3);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const res = component.goToPreviousHitPage();
        expect(contentSearchNavigationService.goToPreviousHitPage).toHaveBeenCalledTimes(1);
        expect(contentSearchNavigationService.getCurrentIndex()).toEqual(0);
      });
    });

    it('should go to first hit if current canvas is 0 and user presses next hit button', () => {
      spyOn(contentSearchNavigationService, 'goToNextHitPage').and.callThrough();
      pageService.setPageChange(0);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        component.goToNextHitPage();
        expect(contentSearchNavigationService.goToNextHitPage).toHaveBeenCalledTimes(1);
        expect(contentSearchNavigationService.getCurrentIndex()).toEqual(0);
      });
    });

    it('should disable previous button if on first hit', () => {
      pageService.setPageChange(2);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const button = fixture.debugElement.query(By.css('#footerNavigatePreviousHitButton'));
        expect(button.nativeElement.disabled).toBeTruthy();
      });
    });

    it('should disable next button if on last hit', () => {
      const last = createDefaultData().last();
      pageService.setPageChange(51);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const button = fixture.debugElement.query(By.css('#footerNavigateNextHitButton'));
        expect(button.nativeElement.disabled).toBeTruthy();
      });
    });

    it('should go to first hit on left page if user presses previous hit button', () => {
      spyOn(iiifContentSearchService, 'selected');

      component.searchResult = createLeftPageHit();
      iiifContentSearchService._currentSearchResult.next(component.searchResult);
      pageService.setPageChange(2);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        component.goToPreviousHitPage();
        expect(iiifContentSearchService.selected).toHaveBeenCalledWith(new Hit({ id: 1, index: 1 }));
      });
    });

    it('should go to first hit on right page if user presses previous hit button', () => {
      spyOn(iiifContentSearchService, 'selected');
      component.searchResult = createRightPageHit();
      iiifContentSearchService._currentSearchResult.next(component.searchResult);
      pageService.setPageChange(3);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        component.goToPreviousHitPage();
        expect(iiifContentSearchService.selected).toHaveBeenCalledWith(new Hit({ id: 1, index: 2 }));
      });
    });

    it('should skip going to right page when there is hits on both pages when user presses next hit button', () => {
      spyOn(iiifContentSearchService, 'selected');
      component.searchResult = createRightPageHit();
      iiifContentSearchService._currentSearchResult.next(component.searchResult);
      pageService.setPageChange(0);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        component.goToNextHitPage();
        expect(iiifContentSearchService.selected).toHaveBeenCalledWith(new Hit({ id: 1, index: 2 }));
        component.goToNextHitPage();
        expect(iiifContentSearchService.selected).toHaveBeenCalledWith(new Hit({ id: 3, index: 100 }));
      });
    });
  });

  describe('Single page display', () => {

    it('should go to first hit if user presses previous hit button', () => {
      spyOn(iiifContentSearchService, 'selected');
      component.searchResult = createSinglePageHit();
      iiifContentSearchService._currentSearchResult.next(component.searchResult);
      pageService.reset();
      pageService.addPages(createDefaultTileRects(102), ViewerLayout.ONE_PAGE, true);
      pageService.setPageChange(3);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        component.goToPreviousHitPage();
        expect(iiifContentSearchService.selected).toHaveBeenCalledWith(new Hit({ id: 1, index: 2 }));
      });
    });

    it('should go to next hit if user presses next hit button', () => {
      spyOn(iiifContentSearchService, 'selected');
      pageService.setPageChange(0);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        component.goToNextHitPage();
        expect(iiifContentSearchService.selected).toHaveBeenCalledWith(new Hit({ id: 1, index: 1 }));
        component.goToNextHitPage();
        expect(iiifContentSearchService.selected).toHaveBeenCalledWith(new Hit({ id: 2, index: 8 }));
      });
    });

  });

  function createDefaultTileRects(size: number): Rect[] {
    const tileRects: Rect[] = [];
    for (let i = 0; i < size; i++) {
      tileRects.push(new Rect());
    }
    return tileRects;
  }

  function createDefaultData() {
    const searchResult = new SearchResult();
    searchResult.add(new Hit({
      id: 1,
      index: 1
    }));
    searchResult.add(new Hit({
      id: 2,
      index: 8
    }));
    searchResult.add(new Hit({
      id: 3,
      index: 10
    }));
    searchResult.add(new Hit({
      id: 4,
      index: 20
    }));
    searchResult.add(new Hit({
      id: 5,
      index: 30
    }));
    searchResult.add(new Hit({
      id: 6,
      index: 40
    }));
    searchResult.add(new Hit({
      id: 7,
      index: 100
    }));
    return searchResult;
  }

  function createLeftPageHit() {
    const searchResult = new SearchResult();
    searchResult.add(new Hit({
      id: 1,
      index: 1
    }));
    searchResult.add(new Hit({
      id: 2,
      index: 1
    }));
    searchResult.add(new Hit({
      index: 2
    }));

    return searchResult;
  }

  function createRightPageHit() {
    const searchResult = new SearchResult();
    searchResult.add(new Hit({
      id: 1,
      index: 2
    }));
    searchResult.add(new Hit({
      id: 2,
      index: 2
    }));
    searchResult.add(new Hit({
      id: 3,
      index: 100
    }));

    return searchResult;
  }

  function createSinglePageHit() {
    const searchResult = new SearchResult();
    searchResult.add(new Hit({
      id: 1,
      index: 2
    }));
    searchResult.add(new Hit({
      id: 2,
      index: 2
    }));

    return searchResult;
  }

});

class PageServiceMock extends PageService {

  setPageChange(index: number) {
    this._currentPage.next(index);
  }

}
