import { Subject } from 'rxjs/Rx';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ObservableMedia } from '@angular/flex-layout';

import { SharedModule } from './../../shared/shared.module';
import { ViewerFooterComponent } from './viewer-footer.component';
import { MimeViewerIntl } from './../../core/viewer-intl';
import { PageService } from './../../core/page-service/page-service';
import { ViewerService } from './../../core/viewer-service/viewer.service';
import { Observable } from 'rxjs/Observable';

describe('ViewerFooterComponent', () => {
  let cmp: ViewerFooterComponent;
  let fixture: ComponentFixture<ViewerFooterComponent>;
  let spy: any;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [NoopAnimationsModule, SharedModule],
        declarations: [ViewerFooterComponent],
        providers: [
          MimeViewerIntl,
          { provide: ViewerService, useClass: ViewerServiceMock },
          { provide: PageService, useClass: PageServiceMock }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerFooterComponent);
    cmp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(cmp).toBeTruthy();
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

  it('should start in visible mode', async(() => {
    expect(cmp.state).toBe('show');
    expectFooterToShow(fixture.debugElement.nativeElement);
  }));

  it('should not be visible when state is changed to \'hide\'', async(() => {
    // Check initial style to make sure we later see an actual change
    expectFooterToShow(fixture.debugElement.nativeElement);

    cmp.state = 'hide';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expectFooterToBeHidden(fixture.debugElement.nativeElement);
    });
  }));

  it('should be visible when state is changed to \'show\'', async(() => {
    cmp.state = 'hide';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expectFooterToBeHidden(fixture.debugElement.nativeElement);

      cmp.state = 'show';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expectFooterToShow(fixture.debugElement.nativeElement);
      });

    });

  }));

  it('should enable both navigation buttons when viewer is on second page',
    inject([ViewerService], (viewerService: ViewerServiceMock) => {

      viewerService.pageChanged.next(1);
      fixture.detectChanges();

      const previousButton = fixture.debugElement.query(By.css('#footerNavigateBeforeButton'));
      expect(previousButton.nativeElement.disabled).toBeFalsy();
      const nextButton = fixture.debugElement.query(By.css('#footerNavigateNextButton'));
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

});

function expectFooterToShow(element: any) {
  expect(element.style.display).toBe('block');
  expect(element.style.opacity).toBe('1');
  expect(element.style.transform).toBe('translate(0px, 0px)');
}

function expectFooterToBeHidden(element: any) {
  expect(element.style.display).toBe('none');
  expect(element.style.opacity).toBe('0');
  expect(element.style.transform).toBe('translate(0px, 100%)');
}

class ViewerServiceMock {
  pageChanged = new Subject<number>();
  get onPageChange(): Observable<number> {
    return this.pageChanged.asObservable();
  }
}

class PageServiceMock {
  public _numberOfPages: number;

  set numberOfPages(numberOfPages: number) {
    this._numberOfPages = numberOfPages;
  }

  get numberOfPages(): number {
    return this._numberOfPages;
  }

}
