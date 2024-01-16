import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';

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
  let harnessLoader: HarnessLoader;

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
    harnessLoader = TestbedHarnessEnvironment.loader(fixture);
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

  describe('FAB button', () => {
    it('should have aria-expanded false when closed', async () => {
      await expectFabButtonToHaveAriaExpanded('false');
    });

    it('should have aria-expanded true when open', async () => {
      await toggleOsdControls();

      await expectFabButtonToHaveAriaExpanded('true');
    });

    it('should toggle OSD controls when clicked', async () => {
      await toggleOsdControls();

      await expectOsdControlsTobeVisible();

      await toggleOsdControls();

      await expectOsdControlsTobeHidden();
    });
  });

  describe('OSD controls', () => {
    it('should re-render when the i18n labels have changed', async () => {
      await toggleOsdControls();
      const homeButton = await getHomeButton();
      intl.zoomHomeLabel = 'Go home button';

      intl.changes.next();
      fixture.detectChanges();

      expect(await (await homeButton.host())?.getAttribute('aria-label')).toBe(
        'Go home button'
      );
    });

    it('should disable previous button when viewer is on first canvas group', async () => {
      viewerService.setCanvasGroupIndexChange(0);
      fixture.detectChanges();

      await toggleOsdControls();
      const previousButton = await getPreviousButton();
      expect(await previousButton.isDisabled()).toBeTrue();
    });

    it('should enable both navigation buttons when viewer is on second canvas group', async () => {
      viewerService.setCanvasGroupIndexChange(1);
      fixture.detectChanges();

      await toggleOsdControls();
      const previousButton = await getPreviousButton();
      const nextButton = await getNextButton();

      expect(await previousButton.isDisabled()).toBeFalse();
      expect(await nextButton.isDisabled()).toBeFalse();
    });

    it('should disable next button when viewer is on last canvas group', waitForAsync(async () => {
      spyOnProperty(
        canvasService,
        'numberOfCanvasGroups',
        'get'
      ).and.returnValue(10);

      viewerService.setCanvasGroupIndexChange(9);
      fixture.detectChanges();

      fixture.whenStable().then(async () => {
        await toggleOsdControls();
        const nextButton = await getNextButton();
        expect(await nextButton.isDisabled()).toBeTrue();
      });
    }));

    it('should display next canvas group', waitForAsync(async () => {
      spy = spyOn(viewerService, 'goToNextCanvasGroup');

      await toggleOsdControls();
      const nextButton = await getNextButton();
      await nextButton.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy.calls.count()).toEqual(1);
      });
    }));

    it('should display previous canvas group', waitForAsync(async () => {
      spy = spyOn(component, 'goToPreviousCanvasGroup');

      await toggleOsdControls();
      const previousButton = await getPreviousButton();
      await previousButton.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy.calls.count()).toEqual(1);
      });
    }));

    it('should disable home zoom button when zoom level is home', async () => {
      await toggleOsdControls();
      const homeButton = await getHomeButton();

      expect(await homeButton.isDisabled()).toBeTrue();
    });

    it('should enable home zoom button when page is zoomed in', async () => {
      await toggleOsdControls();

      const zoomInButton = await getZoomInButton();
      await zoomInButton.click();

      const homeButton = await getHomeButton();
      expect(await homeButton.isDisabled()).toBeTrue();
    });
  });

  const toggleOsdControls = async (): Promise<void> =>
    await (await getFabButton()).click();

  const getFabButton = (): Promise<MatButtonHarness> =>
    getButtonByTestId('fabButton');

  const getHomeButton = (): Promise<MatButtonHarness> =>
    getButtonByTestId('homeButton');

  const getPreviousButton = (): Promise<MatButtonHarness> =>
    getButtonByTestId('navigateBeforeButton');

  const getNextButton = (): Promise<MatButtonHarness> =>
    getButtonByTestId('navigateNextButton');

  const getZoomInButton = (): Promise<MatButtonHarness> =>
    getButtonByTestId('zoomInButton');

  const getButtonByTestId = (id: string): Promise<MatButtonHarness> =>
    harnessLoader.getHarness(
      MatButtonHarness.with({ selector: `[data-testid="${id}"]` })
    );

  const expectFabButtonToHaveAriaExpanded = async (
    expected: string
  ): Promise<void> => {
    const fabButton = await (await getFabButton()).host();
    expect(await fabButton.getAttribute('aria-expanded')).toEqual(expected);
  };

  const expectOsdControlsTobeVisible = async () => {
    const buttons = await getMiniFabButtons();
    expect(buttons.length).toBe(6);
  };

  const expectOsdControlsTobeHidden = async () => {
    const buttons = await getMiniFabButtons();
    expect(buttons.length).toBe(0);
  };

  const getMiniFabButtons = (): Promise<MatButtonHarness[]> => {
    return harnessLoader.getAllHarnesses(
      MatButtonHarness.with({ variant: 'mini-fab' })
    );
  };
});
