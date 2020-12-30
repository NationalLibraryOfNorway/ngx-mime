import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { injectedStub } from '../../../testing/injected-stub';
import { MediaObserverStub } from '../../test/media-observer-stub';
import { IiifContentSearchService } from './../../core/iiif-content-search-service/iiif-content-search.service';
import { Hit } from './../../core/models/hit';
import { SearchResult } from './../../core/models/search-result';
import { IiifContentSearchServiceStub } from './../../test/iiif-content-search-service-stub';
import { ViewerFooterComponent } from './viewer-footer.component';

describe('ViewerFooterComponent', () => {
  let cmp: ViewerFooterComponent;
  let mediaObserverStub: MediaObserverStub;
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
          useClass: IiifContentSearchServiceStub
        },
        { provide: MediaObserver, useClass: MediaObserverStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerFooterComponent);
    cmp = fixture.componentInstance;
    mediaObserverStub = injectedStub(MediaObserver);
    iiifContentSearchServiceStub = injectedStub(IiifContentSearchService);
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
    spyOn(mediaObserverStub, 'isActive').and.returnValue(false);
    cmp.showPageNavigator = false;
    fixture.detectChanges();

    mediaObserverStub._onChange.next([new MediaChange()]);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(cmp.showPageNavigator).toBeTruthy();
    });
  }));

  it('should show pageNavigator in desktop size and if content search navigator is displayed', waitForAsync(() => {
    spyOn(mediaObserverStub, 'isActive').and.returnValue(false);
    cmp.showPageNavigator = false;
    cmp.showContentSearchNavigator = false;

    const sr = new SearchResult();
    sr.add(new Hit());

    mediaObserverStub._onChange.next([new MediaChange()]);
    iiifContentSearchServiceStub._currentSearchResult.next(sr);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(cmp.showPageNavigator).toBeTruthy();
      expect(cmp.showContentSearchNavigator).toBeTruthy();
    });
  }));

  it('should hide pageNavigator if mobile size and content search navigator is displayed', waitForAsync(() => {
    spyOn(mediaObserverStub, 'isActive').and.returnValue(true);
    cmp.searchResult = new SearchResult();
    cmp.searchResult.add(new Hit());
    fixture.detectChanges();

    mediaObserverStub._onChange.next([new MediaChange()]);

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
  expect(element.style.transform).toBe('translate(0px, 100%)');
}
