import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NgModule } from '@angular/core';
import { OsdToolbarComponent } from './osd-toolbar.component';
import { By } from '@angular/platform-browser';
import { SharedModule } from './../../shared/shared.module';
import { MimeResizeService } from './../../core/mime-resize-service/mime-resize.service';
import { MimeViewerIntl } from '../../core/viewer-intl';

describe('OsdToolbarComponent', () => {
  let cmp: OsdToolbarComponent;
  let fixture: ComponentFixture<OsdToolbarComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [NoopAnimationsModule, SharedModule],
        declarations: [OsdToolbarComponent],
        providers: [MimeViewerIntl, MimeResizeService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OsdToolbarComponent);
    cmp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(cmp).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed',
    inject([MimeViewerIntl], (intl: MimeViewerIntl) => {
      const button = fixture.debugElement.query(By.css('#homeButton'));

      intl.home = 'Go home button';
      intl.changes.next();
      fixture.detectChanges();

      expect(button.nativeElement.getAttribute('aria-label')).toBe('Go home button');
    }));

  it('should not be visible when state is changed to \'hide\'', async(() => {
    // Check initial style to make sure we later see an actual change
    expectOSDToolbarToShow(fixture.debugElement.nativeElement);

    cmp.state = 'hide';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expectOSDToolbarToBeHidden(fixture.debugElement.nativeElement);
    });
  }));

  it('should be visible when state is changed to \'show\'', async(() => {
    cmp.state = 'hide';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expectOSDToolbarToBeHidden(fixture.debugElement.nativeElement);

      cmp.state = 'show';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expectOSDToolbarToShow(fixture.debugElement.nativeElement);
      });

    });

  }));

});

function expectOSDToolbarToShow(element: any) {
  expect(element.style.display).toBe('block');
  expect(element.style.opacity).toBe('1');
}

function expectOSDToolbarToBeHidden(element: any) {
  expect(element.style.display).toBe('none');
  expect(element.style.opacity).toBe('0');
  expect(element.style.transform).toBe('translate(-100%, 0px)');
}
