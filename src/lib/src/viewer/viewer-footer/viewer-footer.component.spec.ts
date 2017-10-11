import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { ViewerFooterComponent } from './viewer-footer.component';
import { IiifContentSearchService } from './../../core/iiif-content-search-service/iiif-content-search.service';
import { SearchResult, Hit } from './../../core/models/search-result';

describe('ViewerFooterComponent', () => {
  let cmp: ViewerFooterComponent;
  let mediaMock: MediaMock;
  let iiifContentSearchServiceMock: IiifContentSearchServiceMock;
  let fixture: ComponentFixture<ViewerFooterComponent>;
  let spy: any;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [NoopAnimationsModule],
        declarations: [ViewerFooterComponent],
        providers: [
          { provide: IiifContentSearchService, useClass: IiifContentSearchServiceMock },
          { provide: ObservableMedia, useClass: MediaMock }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerFooterComponent);
    cmp = fixture.componentInstance;
    mediaMock = TestBed.get(ObservableMedia);
    iiifContentSearchServiceMock = TestBed.get(IiifContentSearchService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(cmp).toBeTruthy();
  });

  it('should start in hidden mode', async(() => {
    expect(cmp.state).toBe('hide');
    expectFooterToBeHidden(fixture.debugElement.nativeElement);
  }));

  it('should not be visible when state is changed to \'hide\'', async(() => {
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

  it('should always show pageNavigator in desktop size', () => {
    spyOn(mediaMock, 'isActive').and.returnValue(false);
    cmp.showPageNavigator = false;
    fixture.detectChanges();

    mediaMock._onChange.next(new MediaChange());

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(cmp.showPageNavigator).toBeTruthy();
    });
  });

  it('should show pageNavigator in desktop size and if content search navigator is displayed', () => {
    spyOn(mediaMock, 'isActive').and.returnValue(false);
    cmp.showPageNavigator = false;
    cmp.showContentSearchNavigator = false;

    const sr = new SearchResult();
    sr.add(new Hit());

    mediaMock._onChange.next(new MediaChange());
    iiifContentSearchServiceMock._onChange.next(sr);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(cmp.showPageNavigator).toBeTruthy();
      expect(cmp.showContentSearchNavigator).toBeTruthy();
    });
  });

  it('should hide pageNavigator if mobile size and content search navigator is displayed', () => {
    spyOn(mediaMock, 'isActive').and.returnValue(true);
    cmp.searchResult = new SearchResult();
    cmp.searchResult.add(new Hit());
    fixture.detectChanges();

    mediaMock._onChange.next(new MediaChange());

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

class IiifContentSearchServiceMock {
  _onChange = new Subject<SearchResult>();

  get onChange(): Observable<SearchResult> {
    return this._onChange.asObservable();
  }
}

class MediaMock {
  _onChange = new Subject<MediaChange>();

  isActive(m: string) {
    return false;
  }

  subscribe(next?: (value: MediaChange) => void,
    error?: (error: any) => void,
    complete?: () => void): Subscription {
    return this._onChange.subscribe(next, error, complete);
  }
}
