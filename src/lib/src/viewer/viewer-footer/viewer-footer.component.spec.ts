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
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SharedModule } from './../../shared/shared.module';
import { ViewerFooterComponent } from './viewer-footer.component';
import { IiifContentSearchService } from './../../core/iiif-content-search-service/iiif-content-search.service';

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
          { provide: IiifContentSearchService, useClass: IiifContentSearchServiceMock },
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
  _onChange = new Subject<number>();
  get onChange(): Observable<number> {
    return this._onChange.asObservable();
  }

}
