import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { PageNavigatorComponent } from './page-navigator.component';
import { SharedModule } from './../../../shared/shared.module';
import { MimeViewerIntl } from './../../../core/viewer-intl';
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

    intl.nextPage = 'New test string';
    intl.changes.next();
    fixture.detectChanges();
    expect(text.nativeElement.getAttribute('aria-label')).toContain('New test string');
  })
);

  it('should enable both navigation buttons when viewer is on second page',
    inject([ViewerService], (viewerService: ViewerServiceMock) => {

      viewerService.pageChanged.next(1);
      fixture.detectChanges();

      const previousButton = fixture.debugElement.query(By.css('#footerNavigateBeforeButton'));
      const nextButton = fixture.debugElement.query(By.css('#footerNavigateNextButton'));
      expect(previousButton.nativeElement.disabled).toBeFalsy();
      expect(nextButton.nativeElement.disabled).toBeFalsy();
    }));

  it('should disable previous button when viewer is on first page',
    inject([ViewerService], (viewerService: ViewerServiceMock) => {

      viewerService.pageChanged.next(0);
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('#footerNavigateBeforeButton'));
      expect(button.nativeElement.disabled).toBeTruthy();
    }));

  it('should disable next button when viewer is on last page',
    inject([ViewerService, PageService], (viewerService: ViewerServiceMock, pageService: PageService) => {
      spyOnProperty(pageService, 'numberOfPages', 'get').and.returnValue(10);

      viewerService.pageChanged.next(9);
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

      const button = fixture.debugElement.query(By.css('#footerNavigateBeforeButton'));
      button.nativeElement.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy.calls.count()).toEqual(1);
      });
    }));

});

class ViewerServiceMock {
  pageChanged = new Subject<number>();
  get onPageChange(): Observable<number> {
    return this.pageChanged.asObservable();
  }

  public goToPreviousPage(): void { }

  public goToNextPage(): void { }

}

class PageServiceMock {
  public _numberOfPages: number;

  get numberOfPages(): number {
    return this._numberOfPages;
  }

}
