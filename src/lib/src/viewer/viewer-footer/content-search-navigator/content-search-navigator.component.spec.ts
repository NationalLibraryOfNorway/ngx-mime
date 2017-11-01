import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import {
  ContentSearchNavigationService
} from '../../../core/navigation/content-search-navigation-service/content-search-navigation.service';
import { IiifContentSearchServiceStub } from '../../../test/iiif-content-search-service-stub';
import { ViewerServiceMock } from './../../../test/viewer-service-mock';

describe('ContentSearchNavigatorComponent', () => {
  let component: ContentSearchNavigatorComponent;
  let fixture: ComponentFixture<ContentSearchNavigatorComponent>;
  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;

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
        { provide: PageService, useClass: PageServiceMock },
        { provide: IiifContentSearchService, useClass: IiifContentSearchServiceStub },
      ]

    }).compileComponents();
  }));

  beforeEach(() => {
    iiifContentSearchServiceStub = TestBed.get(IiifContentSearchService);
    fixture = TestBed.createComponent(ContentSearchNavigatorComponent);
    component = fixture.componentInstance;
    component.searchResult = createDefaultData();
    iiifContentSearchServiceStub._currentSearchResult.next(component.searchResult);
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

  it('should go to first hit if current canvas is 4 and user presses previous hit button',
    inject([ViewerService, PageService, ContentSearchNavigationService],
      (viewerService: ViewerServiceMock, pageService: PageServiceMock, csns: ContentSearchNavigationService) => {
      spyOn(csns, 'goToPreviousHitPage').and.callThrough();

      viewerService.setPageChange(4);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const res = component.goToPreviousHitPage();
        expect(csns.goToPreviousHitPage).toHaveBeenCalledTimes(1);
        expect(csns.getCurrentIndex()).toEqual(0);
      });
    }));

  it('should go to first hit if current canvas is 3 and user presses previous hit button',
    inject([ViewerService, PageService, ContentSearchNavigationService],
      (viewerService: ViewerServiceMock, pageService: PageServiceMock, csns: ContentSearchNavigationService) => {
      spyOn(csns, 'goToPreviousHitPage').and.callThrough();

      pageService.setPageChange(3);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const res = component.goToPreviousHitPage();
        expect(csns.goToPreviousHitPage).toHaveBeenCalledTimes(1);
        expect(csns.getCurrentIndex()).toEqual(0);
      });
    }));

  it('should go to first hit if current canvas is 0 and user presses next hit button',
    inject([ViewerService, PageService, ContentSearchNavigationService],
      (viewerService: ViewerServiceMock, pageService: PageServiceMock, csns: ContentSearchNavigationService) => {
      spyOn(csns, 'goToNextHitPage').and.callThrough();

      pageService.setPageChange(0);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const res = component.goToNextHitPage();
        expect(csns.goToNextHitPage).toHaveBeenCalledTimes(1);
        expect(csns.getCurrentIndex()).toEqual(0);
      });
    }));

  it('should disable previous button if on first hit',
    inject([ViewerService, PageService], (viewerService: ViewerServiceMock, pageService: PageServiceMock) => {
      pageService.setPageChange(2);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const button = fixture.debugElement.query(By.css('#footerNavigatePreviousHitButton'));
        expect(button.nativeElement.disabled).toBeTruthy();
      });
    }));

  it('should disable next button if on last hit',
    inject([ViewerService, PageService], (viewerService: ViewerServiceMock, pageService: PageServiceMock) => {
      pageService.setPageChange(8);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const button = fixture.debugElement.query(By.css('#footerNavigateNextHitButton'));
        expect(button.nativeElement.disabled).toBeTruthy();
      });
    }));

  function createDefaultData() {
    const searchResult = new SearchResult();
    searchResult.add(new Hit({
      index: 2
    }));
    searchResult.add(new Hit({
      index: 4
    }));
    searchResult.add(new Hit({
      index: 4
    }));
    searchResult.add(new Hit({
      index: 8
    }));

    return searchResult;
  }

});

class IiifContentSearchServiceMock {
  _onChange = new Subject<number>();
  get onChange(): Observable<number> {
    return this._onChange.asObservable();
  }

}

class PageServiceMock {

  pageChanged = new Subject<number>();
  get onPageChange(): Observable<number> {
    return this.pageChanged.asObservable();
  }

  setPageChange(index: number) {
    this.pageChanged.next(index);
  }

  getTileArrayFromPageIndex(index: number): number[] {
    return [index];
  }
}

