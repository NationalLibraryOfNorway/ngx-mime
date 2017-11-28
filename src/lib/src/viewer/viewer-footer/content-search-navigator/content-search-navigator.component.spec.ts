import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SharedModule } from './../../../shared/shared.module';
import { ContentSearchNavigatorComponent } from './content-search-navigator.component';
import { SearchResult } from './../../../core/models/search-result';
import { Hit } from './../../../core/models/search-result';
import { MimeViewerIntl } from './../../../core/intl/viewer-intl';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
import { IiifContentSearchService } from './../../../core/iiif-content-search-service/iiif-content-search.service';
import { PageService } from './../../../core/page-service/page-service';
import { ViewerServiceMock } from './../../../test/viewer-service-mock';
import { IiifContentSearchServiceStub } from './../../../test/iiif-content-search-service-stub';
import { Rect } from '../../../core/models/rect';
import { ViewerLayout } from '../../../core/models/viewer-layout';

describe('ContentSearchNavigatorComponent', () => {
  let component: ContentSearchNavigatorComponent;
  let fixture: ComponentFixture<ContentSearchNavigatorComponent>;
  let iiifContentSearchService: IiifContentSearchServiceStub;
  let pageService: PageServiceMock;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [
        ContentSearchNavigatorComponent
      ],
      providers: [
        MimeViewerIntl,
        { provide: ViewerService, useClass: ViewerServiceMock },
        { provide: IiifContentSearchService, useClass: IiifContentSearchServiceStub },
        { provide: PageService, useClass: PageServiceMock }
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSearchNavigatorComponent);
    component = fixture.componentInstance;
    component.searchResult = createDefaultData();

    iiifContentSearchService = TestBed.get(IiifContentSearchService);
    pageService = TestBed.get(PageService);
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

  it('should return -1 if canvasIndex is before first hit', () => {
    const res = component.findCurrentHitIndex([0]);
    expect(res).toBe(-1);
  });

  it('should return 0 if canvasIndex is on first hit', () => {
    const res = component.findCurrentHitIndex([1]);
    expect(res).toBe(0);
  });

  it('should return 0 if canvasIndex is between first and second hit', () => {
    const res = component.findCurrentHitIndex([3]);
    expect(res).toBe(0);
  });

  it('should return 1 if canvasIndex is between second and fourth hit', () => {
    const res = component.findCurrentHitIndex([8]);
    expect(res).toBe(1);
  });

  it('should return 6 if canvasIndex is after last', () => {
    const res = component.findCurrentHitIndex([110]);
    expect(res).toBe(6);
  });

  it('should go to first hit if user is between first and second hit and presses previous hit button', () => {
    spyOn(iiifContentSearchService, 'selected');
    pageService.setPageChange(2);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      component.goToPreviousHitPage();
      expect(iiifContentSearchService.selected).toHaveBeenCalledWith(new Hit({ id: 1, index: 1 }));
    });

  });

  it('should go to first hit if user is on second hit and presses previous hit button', () => {
    spyOn(iiifContentSearchService, 'selected');
    pageService.setPageChange(4);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      component.goToPreviousHitPage();
      expect(iiifContentSearchService.selected).toHaveBeenCalledWith(new Hit({ id: 1, index: 1 }));
    });

  });

  it('should go to first hit if user is before first hit and presses next hit button', () => {
    spyOn(iiifContentSearchService, 'selected');
    pageService.setPageChange(0);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      component.goToNextHitPage();
      expect(iiifContentSearchService.selected).toHaveBeenCalledWith(new Hit({ id: 1, index: 1 }));
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

    pageService.setPageChange(2);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      component.goToPreviousHitPage();
      expect(iiifContentSearchService.selected)
        .toHaveBeenCalledWith(new Hit({ id: 1, index: 1 }));
    });

  });

  fit('should go to first hit on right page if user presses previous hit button', () => {
    spyOn(iiifContentSearchService, 'selected');
    component.searchResult = createRightPageHit();
    pageService.setPageChange(3);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      component.goToPreviousHitPage();
      expect(iiifContentSearchService.selected).toHaveBeenCalledWith(new Hit({ id: 1, index: 2 }));
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

    return searchResult;
  }

});

class PageServiceMock extends PageService {

  setPageChange(index: number) {
    this._currentPage.next(index);
  }

}
