import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { OsdToolbarComponent } from './osd-toolbar.component';
import { SharedModule } from '../../shared/shared.module';
import { MimeResizeService } from '../../core/mime-resize-service/mime-resize.service';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { ViewerService } from '../../core/viewer-service/viewer.service';
import { ModeService } from '../../core/mode-service/mode.service';
import { ClickService } from '../../core/click-service/click.service';
import { MimeDomHelper } from '../../core/mime-dom-helper';
import { FullscreenService } from '../../core/fullscreen-service/fullscreen.service';
import { ViewerServiceStub } from './../../test/viewer-service-stub';
import { CanvasServiceStub } from './../../test/canvas-service-stub';

describe('OsdToolbarComponent', () => {
  let component: OsdToolbarComponent;
  let fixture: ComponentFixture<OsdToolbarComponent>;
  let spy: any;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, SharedModule],
        declarations: [OsdToolbarComponent],
        providers: [
          MimeResizeService,
          MimeViewerIntl,
          { provide: ViewerService, useClass: ViewerServiceStub },
          { provide: CanvasService, useClass: CanvasServiceStub },
          ClickService,
          CanvasService,
          ModeService,
          MimeDomHelper,
          FullscreenService
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OsdToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should re-render when the i18n labels have changed',
    inject([MimeViewerIntl], (intl: MimeViewerIntl) => {
      const button = fixture.debugElement.query(By.css('#homeButton'));

      intl.homeLabel = 'Go home button';
      intl.changes.next();
      fixture.detectChanges();

      expect(button.nativeElement.getAttribute('aria-label')).toBe('Go home button');
    })
  );

  it(
    "should not be visible when state is changed to 'hide'",
    async(() => {
      // Check initial style to make sure we later see an actual change
      expectOSDToolbarToShow(fixture.debugElement.nativeElement);

      component.state = 'hide';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expectOSDToolbarToBeHidden(fixture.debugElement.nativeElement);
      });
    })
  );

  it(
    "should be visible when state is changed to 'show'",
    async(() => {
      component.state = 'hide';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expectOSDToolbarToBeHidden(fixture.debugElement.nativeElement);

        component.state = 'show';
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expectOSDToolbarToShow(fixture.debugElement.nativeElement);
        });
      });
    })
  );

  it(
    'should enable both navigation buttons when viewer is on second page',
    inject([ViewerService], (viewerService: ViewerServiceStub) => {
      viewerService.setCanvasGroupIndexChange(1);
      fixture.detectChanges();

      const previousButton = fixture.debugElement.query(By.css('#navigateBeforeButton'));
      const nextButton = fixture.debugElement.query(By.css('#navigateNextButton'));
      expect(previousButton.nativeElement.disabled).toBeFalsy();
      expect(nextButton.nativeElement.disabled).toBeFalsy();
    })
  );

  it(
    'should disable previous button when viewer is on first page',
    inject([ViewerService], (viewerService: ViewerServiceStub) => {
      viewerService.setCanvasGroupIndexChange(0);
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('#navigateBeforeButton'));
      expect(button.nativeElement.disabled).toBeTruthy();
    })
  );

  it(
    'should disable next button when viewer is on last page',
    inject([ViewerService, CanvasService], (viewerService: ViewerServiceStub, canvasService: CanvasService) => {
      spyOnProperty(canvasService, 'numberOfCanvasGroups', 'get').and.returnValue(10);

      viewerService.setCanvasGroupIndexChange(9);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const button = fixture.debugElement.query(By.css('#navigateNextButton'));
        expect(button.nativeElement.disabled).toBeTruthy();
      });
    })
  );

  it(
    'should display next canvas group',
    inject([ViewerService, CanvasService], (viewerService: ViewerServiceStub, canvasService: CanvasServiceStub) => {
      spy = spyOn(viewerService, 'goToNextCanvasGroup');

      const button = fixture.debugElement.query(By.css('#navigateNextButton'));
      button.nativeElement.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy.calls.count()).toEqual(1);
      });
    })
  );

  it(
    'should display previous canvas group',
    inject([ViewerService, CanvasService], (viewerService: ViewerServiceStub, canvasService: CanvasServiceStub) => {
      spy = spyOn(component, 'goToPreviousCanvasGroup');

      const button = fixture.debugElement.query(By.css('#navigateBeforeButton'));
      button.nativeElement.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy.calls.count()).toEqual(1);
      });
    })
  );
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
