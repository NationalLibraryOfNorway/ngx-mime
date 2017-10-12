import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { PageNavigatorComponent } from './page-navigator.component';
import { SharedModule } from './../../../shared/shared.module';
import { MimeViewerIntl } from './../../../core/intl/viewer-intl';
import { PageService } from './../../../core/page-service/page-service';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
import { IiifContentSearchService } from './../../../core/iiif-content-search-service/iiif-content-search.service';

describe('PageNavigatorComponent', () => {
  let component: PageNavigatorComponent;
  let fixture: ComponentFixture<PageNavigatorComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [PageNavigatorComponent],
      providers: [
        MimeViewerIntl,
        { provide: ViewerService, useClass: ViewerServiceMock },
        { provide: PageService, useClass: PageServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed',
    inject([MimeViewerIntl], (intl: MimeViewerIntl) => {
      const text = fixture.debugElement.query(By.css('#footerNavigateNextButton'));
      expect(text.nativeElement.getAttribute('aria-label')).toContain(`Next Page`);

      intl.nextPageLabel = 'New test string';
      intl.changes.next();
      fixture.detectChanges();
      expect(text.nativeElement.getAttribute('aria-label')).toContain('New test string');
    })
  );

  it('should enable both navigation buttons when viewer is on second page',
    inject([PageService], (pageService: PageServiceMock) => {
      pageService._currentPage.next(1);
      fixture.detectChanges();

      const previousButton = fixture.debugElement.query(By.css('#footerNavigateBeforeButton'));
      const nextButton = fixture.debugElement.query(By.css('#footerNavigateNextButton'));
      expect(previousButton.nativeElement.disabled).toBeFalsy();
      expect(nextButton.nativeElement.disabled).toBeFalsy();
    }));

  it('should disable previous button when viewer is on first page',
    inject([PageService], (pageService: PageServiceMock) => {
      pageService._currentPage.next(0);
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('#footerNavigateBeforeButton'));
      expect(button.nativeElement.disabled).toBeTruthy();
    }));

  it('should disable next button when viewer is on last page',
    inject([PageService], (pageService: PageServiceMock) => {
      pageService._currentNumberOfPages.next(10);

      pageService._currentPage.next(9);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const button = fixture.debugElement.query(By.css('#footerNavigateNextButton'));
        expect(button.nativeElement.disabled).toBeTruthy();
      });
    }));

  it('should display next page',
    inject([ViewerService, PageService], (viewerService: ViewerServiceMock, pageService: PageServiceMock) => {
      spy = spyOn(viewerService, 'goToNextPage');

      const button = fixture.debugElement.query(By.css('#footerNavigateNextButton'));
      button.nativeElement.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy.calls.count()).toEqual(1);
      });
    }));

  it('should display previous page',
    inject([ViewerService, PageService], (viewerService: ViewerServiceMock, pageService: PageServiceMock) => {
      spy = spyOn(component, 'goToPreviousPage');

      pageService._currentPage.next(9);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const button = fixture.debugElement.query(By.css('#footerNavigateBeforeButton'));
        button.nativeElement.click();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(spy.calls.count()).toEqual(1);
        });
      });
    }));
});

class ViewerServiceMock {
  public goToPreviousPage(): void { }

  public goToNextPage(): void { }

}

class PageServiceMock {
  _currentNumberOfPages: BehaviorSubject<number> = new BehaviorSubject(10);
  _currentPage: BehaviorSubject<number> = new BehaviorSubject(0);

  get onPageChange(): Observable<number> {
    return this._currentPage.asObservable().distinctUntilChanged();
  }

  get onNumberOfPagesChange(): Observable<number> {
    return this._currentNumberOfPages.asObservable().distinctUntilChanged();
  }

  get numberOfTiles(): number {
    return this._currentNumberOfPages.value;
  }

  getTilesStringFromPageIndex(index: number): string {
    return '' + index;
  }
}
