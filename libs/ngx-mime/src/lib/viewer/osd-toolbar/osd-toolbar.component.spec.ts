import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { injectedStub } from '../../../testing/injected-stub';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { ClickService } from '../../core/click-service/click.service';
import { FullscreenService } from '../../core/fullscreen-service/fullscreen.service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl';
import { MimeDomHelper } from '../../core/mime-dom-helper';
import { MimeResizeService } from '../../core/mime-resize-service/mime-resize.service';
import { ModeService } from '../../core/mode-service/mode.service';
import { StyleService } from '../../core/style-service/style.service';
import { ViewerService } from '../../core/viewer-service/viewer.service';
import { SharedModule } from '../../shared/shared.module';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { MockBreakpointObserver } from '../../test/mock-breakpoint-observer';
import { CanvasServiceStub } from './../../test/canvas-service-stub';
import { ViewerServiceStub } from './../../test/viewer-service-stub';
import { OsdToolbarComponent } from './osd-toolbar.component';

describe('OsdToolbarComponent', () => {
  let component: OsdToolbarComponent;
  let fixture: ComponentFixture<OsdToolbarComponent>;
  let spy: any;
  let breakpointObserver: MockBreakpointObserver;
  let intl: MimeViewerIntl;
  let canvasService: CanvasServiceStub;
  let viewerService: ViewerServiceStub;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [OsdToolbarComponent],
      providers: [
        MimeResizeService,
        MimeViewerIntl,
        { provide: ViewerService, useClass: ViewerServiceStub },
        { provide: CanvasService, useClass: CanvasServiceStub },
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        { provide: BreakpointObserver, useClass: MockBreakpointObserver },
        ClickService,
        CanvasService,
        ModeService,
        MimeDomHelper,
        FullscreenService,
        StyleService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsdToolbarComponent);
    intl = TestBed.inject(MimeViewerIntl);
    breakpointObserver = injectedStub(BreakpointObserver);
    canvasService = injectedStub(CanvasService);
    viewerService = injectedStub(ViewerService);
    component = fixture.componentInstance;

    breakpointObserver.setMatches(true);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed', () => {
    const homeButton = getHomeButton();
    intl.homeLabel = 'Go home button';

    intl.changes.next();
    fixture.detectChanges();

    expect(homeButton.nativeElement.getAttribute('aria-label')).toBe(
      'Go home button'
    );
  });

  it("should not be visible when state is changed to 'hide'", waitForAsync(() => {
    component.state = 'show';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expectOSDToolbarToShow(fixture.debugElement.nativeElement);

      component.state = 'hide';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expectOSDToolbarToBeHidden(fixture.debugElement.nativeElement);
      });
    });
  }));

  it("should be visible when state is changed to 'show'", waitForAsync(() => {
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
  }));

  it('should enable both navigation buttons when viewer is on second canvas group', () => {
    viewerService.setCanvasGroupIndexChange(1);
    fixture.detectChanges();

    const previousButton = getPreviousButton();
    const nextButton = getNextButton();
    expect(previousButton.nativeElement.disabled).toBeFalsy();
    expect(nextButton.nativeElement.disabled).toBeFalsy();
  });

  it('should disable previous button when viewer is on first canvas group', () => {
    viewerService.setCanvasGroupIndexChange(0);
    fixture.detectChanges();

    const previousButton = getPreviousButton();
    expect(previousButton.nativeElement.disabled).toBeTruthy();
  });

  it('should disable next button when viewer is on last canvas group', waitForAsync(() => {
    spyOnProperty(canvasService, 'numberOfCanvasGroups', 'get').and.returnValue(
      10
    );

    viewerService.setCanvasGroupIndexChange(9);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const nextButton = getNextButton();
      expect(nextButton.nativeElement.disabled).toBeTruthy();
    });
  }));

  it('should display next canvas group', waitForAsync(() => {
    spy = spyOn(viewerService, 'goToNextCanvasGroup');

    const nextButton = getNextButton();
    nextButton.nativeElement.click();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(spy.calls.count()).toEqual(1);
    });
  }));

  it('should display previous canvas group', waitForAsync(() => {
    spy = spyOn(component, 'goToPreviousCanvasGroup');

    const previousButton = getPreviousButton();
    previousButton.nativeElement.click();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(spy.calls.count()).toEqual(1);
    });
  }));

  const getHomeButton = () =>
    fixture.debugElement.query(By.css('[data-testid="homeButton"]'));

  const getPreviousButton = () =>
    fixture.debugElement.query(By.css('[data-testid="navigateBeforeButton"]'));

  const getNextButton = () =>
    fixture.debugElement.query(By.css('[data-testid="navigateNextButton"]'));

  const expectOSDToolbarToShow = (element: any) => {
    expect(element.style.transform).toBe('translate(0px, 0px)');
  };

  const expectOSDToolbarToBeHidden = (element: any) => {
    expect(element.style.transform).toBe('translate(-120px, 0px)');
  };
});
