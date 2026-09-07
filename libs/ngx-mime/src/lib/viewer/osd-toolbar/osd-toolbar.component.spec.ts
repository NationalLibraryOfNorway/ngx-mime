import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { By } from '@angular/platform-browser';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { ClickService } from '../../core/click-service/click.service';
import { FullscreenService } from '../../core/fullscreen-service/fullscreen.service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl';
import { MimeDomHelper } from '../../core/mime-dom-helper';
import { MimeResizeService } from '../../core/mime-resize-service/mime-resize.service';
import { ModeService } from '../../core/mode-service/mode.service';
import { StyleService } from '../../core/style-service/style.service';
import { ViewerLayoutService } from '../../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../../core/viewer-service/viewer.service';
import { CanvasServiceStub } from '../../test/canvas-service-stub';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { ViewerLayoutServiceStub } from '../../test/viewer-layout-service-stub';
import { ViewerServiceStub } from '../../test/viewer-service-stub';
import { OsdToolbarComponent } from './osd-toolbar.component';

describe('OsdToolbarComponent', () => {
  let component: OsdToolbarComponent;
  let fixture: ComponentFixture<OsdToolbarComponent>;
  let spy: any;
  let intl: MimeViewerIntl;
  let canvasService: CanvasServiceStub;
  let viewerService: ViewerServiceStub;
  let harnessLoader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsdToolbarComponent],
      providers: [
        MimeResizeService,
        MimeViewerIntl,
        { provide: ViewerService, useClass: ViewerServiceStub },
        { provide: CanvasService, useClass: CanvasServiceStub },
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        ClickService,
        ModeService,
        MimeDomHelper,
        FullscreenService,
        StyleService,
        {
          provide: ViewerLayoutService,
          useClass: ViewerLayoutServiceStub,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OsdToolbarComponent);
    harnessLoader = TestbedHarnessEnvironment.loader(fixture);
    intl = TestBed.inject(MimeViewerIntl);
    canvasService = TestBed.inject<any>(CanvasService);
    viewerService = TestBed.inject<any>(ViewerService);
    component = fixture.componentInstance;

    await fixture.whenStable();
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

      expectOsdToolbarToBeVisible();

      await toggleOsdControls();

      expectOsdToolbarToBeHidden();
    });
  });

  describe('OSD controls', () => {
    it('should re-render when the i18n labels have changed', async () => {
      await toggleOsdControls();
      const homeButton = await getHomeButton();
      intl.resetZoomLabel = 'Go home button';

      intl.notifyChanges();
      await fixture.whenStable();

      expect(await (await homeButton.host())?.getAttribute('aria-label')).toBe(
        'Go home button',
      );
    });

    it('should disable previous button when viewer is on first canvas group', async () => {
      canvasService.setCanvasGroupIndexChange(0);
      await fixture.whenStable();

      await toggleOsdControls();

      const previousButton = await getPreviousButton();
      expect(await previousButton.isDisabled()).toBe(true);
    });

    it('should enable both navigation buttons when viewer is on second canvas group', async () => {
      canvasService.setCanvasGroupIndexChange(1);
      await fixture.whenStable();

      await toggleOsdControls();

      const previousButton = await getPreviousButton();
      const nextButton = await getNextButton();
      expect(await previousButton.isDisabled()).toBe(false);
      expect(await nextButton.isDisabled()).toBe(false);
    });

    it('should disable next button when viewer is on last canvas group', async () => {
      canvasService.setCanvasGroupCount(10);
      canvasService.setCanvasGroupIndexChange(9);
      await fixture.whenStable();

      await toggleOsdControls();

      const nextButton = await getNextButton();
      expect(await nextButton.isDisabled()).toBe(true);
    });

    it('should display next canvas group', async () => {
      spy = jest.spyOn(viewerService, 'goToNextCanvasGroup');
      await toggleOsdControls();
      const nextButton = await getNextButton();

      await nextButton.click();
      await fixture.whenStable();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should display previous canvas group', async () => {
      spy = jest.spyOn(component, 'goToPreviousCanvasGroup');
      canvasService.setCanvasGroupIndexChange(1);
      await fixture.whenStable();
      await toggleOsdControls();
      const previousButton = await getPreviousButton();

      await previousButton.click();
      await fixture.whenStable();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should disable home zoom button when zoom level is home', async () => {
      await toggleOsdControls();

      const homeButton = await getHomeButton();
      expect(await homeButton.isDisabled()).toBe(true);
    });

    it('should enable home zoom button when page is zoomed in', async () => {
      await toggleOsdControls();
      const zoomInButton = await getZoomInButton();

      await zoomInButton.click();

      const homeButton = await getHomeButton();
      expect(await homeButton.isDisabled()).toBe(true);
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
      MatButtonHarness.with({ selector: `[data-testid="${id}"]` }),
    );

  const expectFabButtonToHaveAriaExpanded = async (
    expected: string,
  ): Promise<void> => {
    const fabButton = await (await getFabButton()).host();
    expect(await fabButton.getAttribute('aria-expanded')).toEqual(expected);
  };

  const expectOsdToolbarToBeVisible = () => {
    expect(component.fabState()).toEqual('open');
    expect(getOsdToolbar().getAttribute('class')).toContain('open');
  };

  const expectOsdToolbarToBeHidden = () => {
    expect(component.fabState()).toEqual('closed');
    expect(getOsdToolbar().getAttribute('class')).not.toContain('open');
  };

  const getOsdToolbar = () => {
    return fixture.debugElement.query(By.css('.osd-toolbar')).nativeElement;
  };
});
