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
import { MimeViewerIntl } from './../../../core/viewer-intl';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
import { IiifContentSearchService } from './../../../core/iiif-content-search-service/iiif-content-search.service';

describe('ContentSearchNavigatorComponent', () => {
  let component: ContentSearchNavigatorComponent;
  let fixture: ComponentFixture<ContentSearchNavigatorComponent>;

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
        { provide: IiifContentSearchService, useClass: IiifContentSearchServiceMock },
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSearchNavigatorComponent);
    component = fixture.componentInstance;
    component.searchResult = createDefaultData();
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
    const res = component.findCurrentHitIndex(1);
    expect(res).toBe(-1);
  });

  it('should return 0 if canvasIndex is on first hit', () => {
    const res = component.findCurrentHitIndex(2);
    expect(res).toBe(0);
  });

  it('should return 0 if canvasIndex is between first and second hit', () => {
    const res = component.findCurrentHitIndex(3);
    expect(res).toBe(0);
  });

  it('should return 1 if canvasIndex is between second and fourth hit', () => {
    const res = component.findCurrentHitIndex(5);
    expect(res).toBe(1);
  });

  it('should return 3 if canvasIndex is after last', () => {
    const res = component.findCurrentHitIndex(9);
    expect(res).toBe(3);
  });

  it('should go to first hit if current canvas is 4 and user presses previous hit button',
    inject([ViewerService], (viewerService: ViewerServiceMock) => {
      spyOn(viewerService, 'goToPage');

      viewerService.setPageChange(4);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const res = component.goToPreviousHitPage();
        expect(viewerService.goToPage).toHaveBeenCalledWith(2);
      });

    }));

  it('should go to first hit if current canvas is 3 and user presses previous hit button',
    inject([ViewerService], (viewerService: ViewerServiceMock) => {
      spyOn(viewerService, 'goToPage');

      viewerService.setPageChange(3);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const res = component.goToPreviousHitPage();
        expect(viewerService.goToPage).toHaveBeenCalledWith(2);
      });

    }));

  it('should go to first hit if current canvas is 0 and user presses next hit button',
    inject([ViewerService], (viewerService: ViewerServiceMock) => {
      spyOn(viewerService, 'goToPage');

      viewerService.setPageChange(0);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const res = component.goToNextHitPage();
        expect(viewerService.goToPage).toHaveBeenCalledWith(2);
      });

    }));

  it('should disable previous button if on first hit',
    inject([ViewerService], (viewerService: ViewerServiceMock) => {
      viewerService.setPageChange(2);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const button = fixture.debugElement.query(By.css('#footerNavigatePreviousHitButton'));
        expect(button.nativeElement.disabled).toBeTruthy();
      });

    }));

  it('should disable next button if on first hit',
    inject([ViewerService], (viewerService: ViewerServiceMock) => {
      viewerService.setPageChange(8);
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

class ViewerServiceMock {
  pageChanged = new Subject<number>();
  get onPageChange(): Observable<number> {
    return this.pageChanged.asObservable();
  }

  setPageChange(canvasIndex: number) {
    this.pageChanged.next(canvasIndex);
  }

  goToPage(canvasIndex: number): void { }

}

class IiifContentSearchServiceMock {
  _onChange = new Subject<number>();
  get onChange(): Observable<number> {
    return this._onChange.asObservable();
  }

}
