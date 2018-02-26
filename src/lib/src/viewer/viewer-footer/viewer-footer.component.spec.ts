import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ViewerFooterComponent } from './viewer-footer.component';
import { IiifContentSearchService } from './../../core/iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from './../../core/models/search-result';
import { Hit } from './../../core/models/hit';
import { MediaServiceStub } from './../../test/media-service-stub';
import { IiifContentSearchServiceStub } from './../../test/iiif-content-search-service-stub';

describe('ViewerFooterComponent', () => {
  let cmp: ViewerFooterComponent;
  let mediaServiceStub: MediaServiceStub;
  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;
  let fixture: ComponentFixture<ViewerFooterComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [NoopAnimationsModule],
        declarations: [ViewerFooterComponent],
        providers: [
          { provide: IiifContentSearchService, useClass: IiifContentSearchServiceStub },
          { provide: ObservableMedia, useClass: MediaServiceStub }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerFooterComponent);
    cmp = fixture.componentInstance;
    mediaServiceStub = TestBed.get(ObservableMedia);
    iiifContentSearchServiceStub = TestBed.get(IiifContentSearchService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(cmp).toBeTruthy();
  });

  it(
    'should start in hidden mode',
    async(() => {
      expect(cmp.state).toBe('hide');
      expectFooterToBeHidden(fixture.debugElement.nativeElement);
    })
  );

  it(
    "should not be visible when state is changed to 'hide'",
    async(() => {
      cmp.state = 'hide';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expectFooterToBeHidden(fixture.debugElement.nativeElement);
      });
    })
  );

  it(
    "should be visible when state is changed to 'show'",
    async(() => {
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
    })
  );

  it('should always show pageNavigator in desktop size', () => {
    spyOn(mediaServiceStub, 'isActive').and.returnValue(false);
    cmp.showPageNavigator = false;
    fixture.detectChanges();

    mediaServiceStub._onChange.next(new MediaChange());

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(cmp.showPageNavigator).toBeTruthy();
    });
  });

  it('should show pageNavigator in desktop size and if content search navigator is displayed', () => {
    spyOn(mediaServiceStub, 'isActive').and.returnValue(false);
    cmp.showPageNavigator = false;
    cmp.showContentSearchNavigator = false;

    const sr = new SearchResult();
    sr.add(new Hit());

    mediaServiceStub._onChange.next(new MediaChange());
    iiifContentSearchServiceStub._currentSearchResult.next(sr);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(cmp.showPageNavigator).toBeTruthy();
      expect(cmp.showContentSearchNavigator).toBeTruthy();
    });
  });

  it('should hide pageNavigator if mobile size and content search navigator is displayed', () => {
    spyOn(mediaServiceStub, 'isActive').and.returnValue(true);
    cmp.searchResult = new SearchResult();
    cmp.searchResult.add(new Hit());
    fixture.detectChanges();

    mediaServiceStub._onChange.next(new MediaChange());

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(cmp.showPageNavigator).toBeFalsy();
    });
  });
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
