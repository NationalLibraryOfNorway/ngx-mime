import { BreakpointObserver } from '@angular/cdk/layout';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockBreakpointObserver } from '../../test/mock-breakpoint-observer';
import { IiifContentSearchService } from './../../core/iiif-content-search-service/iiif-content-search.service';
import { Hit } from './../../core/models/hit';
import { SearchResult } from './../../core/models/search-result';
import { IiifContentSearchServiceStub } from './../../test/iiif-content-search-service-stub';
import { ViewerFooterComponent } from './viewer-footer.component';

describe('ViewerFooterComponent', () => {
  let cmp: ViewerFooterComponent;
  let breakpointObserver: MockBreakpointObserver;
  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;
  let fixture: ComponentFixture<ViewerFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule],
      declarations: [ViewerFooterComponent],
      providers: [
        {
          provide: IiifContentSearchService,
          useClass: IiifContentSearchServiceStub,
        },
        { provide: BreakpointObserver, useClass: MockBreakpointObserver },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerFooterComponent);
    cmp = fixture.componentInstance;
    breakpointObserver = TestBed.inject<any>(BreakpointObserver);
    iiifContentSearchServiceStub = TestBed.inject<any>(
      IiifContentSearchService,
    );
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(cmp).toBeTruthy();
  });

  it('should start in hidden mode', waitForAsync(() => {
    expect(cmp.state).toBe('hide');
    expectFooterToBeHidden(fixture.debugElement.nativeElement);
  }));

  it("should not be visible when state is changed to 'hide'", waitForAsync(() => {
    cmp.state = 'hide';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expectFooterToBeHidden(fixture.debugElement.nativeElement);
    });
  }));

  it("should be visible when state is changed to 'show'", waitForAsync(() => {
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

  it('should always show pageNavigator in desktop size', waitForAsync(() => {
    cmp.showPageNavigator = false;

    breakpointObserver.setMatches(false);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(cmp.showPageNavigator).toBeTruthy();
    });
  }));

  it('should show pageNavigator in desktop size and if content search navigator is displayed', waitForAsync(() => {
    cmp.showPageNavigator = false;
    cmp.showContentSearchNavigator = false;

    const sr = new SearchResult();
    sr.add(new Hit());

    iiifContentSearchServiceStub._currentSearchResult.next(sr);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(cmp.showPageNavigator).toBeTruthy();
      expect(cmp.showContentSearchNavigator).toBeTruthy();
    });
  }));

  it('should hide pageNavigator if mobile size and content search navigator is displayed', waitForAsync(() => {
    cmp.searchResult = new SearchResult();
    cmp.searchResult.add(new Hit());
    fixture.detectChanges();

    breakpointObserver.setMatches(true);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(cmp.showPageNavigator).toBeFalsy();
    });
  }));
});

function expectFooterToShow(element: any) {
  expect(element.style.transform).toBe('translate(0px, 0px)');
}

function expectFooterToBeHidden(element: any) {
  expect(element.style.transform).toBe('translate(0, 100%)');
}
