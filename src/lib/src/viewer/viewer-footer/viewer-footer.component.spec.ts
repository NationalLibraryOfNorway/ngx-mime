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

describe('ViewerFooterComponent', () => {
  let cmp: ViewerFooterComponent;
  let fixture: ComponentFixture<ViewerFooterComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [NoopAnimationsModule, SharedModule],
        declarations: [ViewerFooterComponent],
        providers: [MimeViewerIntl]
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
      const text = fixture.debugElement.query(By.css('.text'));
      expect(text.nativeElement.textContent).toContain(`I'm a footer`);

      intl.footerTestString = 'New test string';
      intl.changes.next();
      fixture.detectChanges();
      expect(text.nativeElement.textContent).toContain('New test string');
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
