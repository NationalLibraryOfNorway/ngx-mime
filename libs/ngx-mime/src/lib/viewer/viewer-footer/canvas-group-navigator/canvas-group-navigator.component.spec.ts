import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { injectedStub } from '../../../../testing/injected-stub';
import { CanvasGroupDialogComponent } from '../../../canvas-group-dialog/canvas-group-dialog.component';
import { CanvasGroupDialogService } from '../../../canvas-group-dialog/canvas-group-dialog.service';
import { IiifManifestService } from '../../../core/iiif-manifest-service/iiif-manifest-service';
import { Rect } from '../../../core/models/rect';
import { ViewerLayout } from '../../../core/models/viewer-layout';
import { CanvasServiceStub } from '../../../test/canvas-service-stub';
import { IiifManifestServiceStub } from '../../../test/iiif-manifest-service-stub';
import { ViewerServiceStub } from '../../../test/viewer-service-stub';
import { CanvasService } from './../../../core/canvas-service/canvas-service';
import { MimeViewerIntl } from './../../../core/intl';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
import { SharedModule } from './../../../shared/shared.module';
import { CanvasGroupNavigatorComponent } from './canvas-group-navigator.component';

@Component({
  template: `<mime-page-navigator #navigator></mime-page-navigator>`,
})
export class TestHostComponent {
  @ViewChild('navigator', { static: false })
  canvasGroupNavigatorComponent!: CanvasGroupNavigatorComponent;
  @ViewChild('navigator', { read: ElementRef })
  canvasGroupNavigatorElementRef!: ElementRef;

  constructor(public viewContainerRef: ViewContainerRef) {}
}

describe('CanvasGroupNavigatorComponent', () => {
  let component: CanvasGroupNavigatorComponent;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let rootLoader: HarnessLoader;
  let spy: any;
  let canvasService: CanvasServiceStub;
  let viewerService: ViewerService;
  let intl: MimeViewerIntl;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [
        TestHostComponent,
        CanvasGroupNavigatorComponent,
        CanvasGroupDialogComponent,
      ],
      providers: [
        MimeViewerIntl,
        CanvasGroupDialogService,
        { provide: ViewerService, useClass: ViewerServiceStub },
        { provide: CanvasService, useClass: CanvasServiceStub },
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(testHostFixture);
    canvasService = injectedStub(CanvasService);
    viewerService = injectedStub(ViewerService);
    intl = TestBed.inject(MimeViewerIntl);
    testHostFixture.detectChanges();
    component = testHostComponent.canvasGroupNavigatorComponent;
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('should open canvas group dialog', async () => {
    const canvasGroupDialogButton = await getCanvasGroupDialogButton();

    await canvasGroupDialogButton?.click();

    const dialogs = await rootLoader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toEqual(1);
  });

  it('should re-render when the i18n labels have changed', async () => {
    const nextButton = await getNextButton();
    let ariaLabel = await getAriaLabel(nextButton);

    expect(ariaLabel).toEqual(`Next Page`);

    intl.nextPageLabel = 'New test string';
    intl.changes.next();
    testHostFixture.detectChanges();

    ariaLabel = await getAriaLabel(nextButton);
    expect(ariaLabel).toEqual('New test string');
  });

  it('should enable both navigation buttons when viewer is on second canvas group', async () => {
    canvasService._currentCanvasGroupIndex.next(1);
    testHostFixture.detectChanges();

    const previousButton = await getPreviousButton();
    const nextButton = await getNextButton();
    expect(await previousButton?.isDisabled()).toBeFalsy();
    expect(await nextButton?.isDisabled()).toBeFalsy();
  });

  it('should disable previous button when viewer is on first canvas group', async () => {
    canvasService._currentCanvasGroupIndex.next(0);
    testHostFixture.detectChanges();

    const previousButton = await getPreviousButton();
    expect(await previousButton?.isDisabled()).toBeTruthy();
  });

  it('should disable next button when viewer is on last canvas group', waitForAsync(() => {
    canvasService._currentNumberOfCanvasGroups.next(10);

    canvasService._currentCanvasGroupIndex.next(9);
    testHostFixture.detectChanges();

    testHostFixture.whenStable().then(async () => {
      const nextButton = await getNextButton();

      expect(await nextButton?.isDisabled()).toBeTruthy();
    });
  }));

  it('should display next canvas group', waitForAsync(() => {
    spy = spyOn(viewerService, 'goToNextCanvasGroup').and.stub();
    testHostFixture.whenStable().then(async () => {
      const nextButton = await getNextButton();

      await nextButton?.click();

      testHostFixture.detectChanges();
      expect(spy.calls.count()).toEqual(1);
    });
  }));

  it('should display previous canvas group', waitForAsync(() => {
    spy = spyOn(viewerService, 'goToPreviousCanvasGroup');

    canvasService._currentCanvasGroupIndex.next(9);

    testHostFixture.whenStable().then(async () => {
      testHostFixture.detectChanges();
      const previousButton = await getPreviousButton();

      await previousButton?.click();

      testHostFixture.detectChanges();
      testHostFixture.whenStable().then(() => {
        expect(spy.calls.count()).toEqual(1);
      });
    });
  }));

  it('should disable previous and next button if there is only one canvas', waitForAsync(() => {
    canvasService.addAll([new Rect()], ViewerLayout.ONE_PAGE);
    testHostFixture.detectChanges();

    testHostFixture.whenStable().then(async () => {
      const previousButton = await getPreviousButton();
      const nextButton = await getNextButton();

      expect(await nextButton?.isDisabled()).toBeTrue();
      expect(await previousButton?.isDisabled()).toBeTrue();
    });
  }));

  it('should check hotkeys', waitForAsync(() => {
    const event: KeyboardEvent = new KeyboardEvent('keydown', {
      code: '70', // 'f'
    });

    spy = spyOn(component, 'onSliderHotKey').and.callThrough();
    canvasService.addAll([new Rect()], ViewerLayout.ONE_PAGE);

    testHostFixture.detectChanges();
    testHostFixture.whenStable().then(() => {
      const slider = testHostFixture.debugElement.query(
        By.css('.navigation-slider')
      );
      slider.nativeElement.dispatchEvent(event);
      testHostFixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  }));

  const getCanvasGroupDialogButton = async () =>
    rootLoader.getHarnessOrNull(
      MatButtonHarness.with({
        selector: '[data-testid="canvasGroupDialogButton"]',
      })
    );

  const getPreviousButton = async () =>
    rootLoader.getHarnessOrNull(
      MatButtonHarness.with({
        selector: '[data-testid="footerNavigateBeforeButton"]',
      })
    );

  const getNextButton = async () =>
    rootLoader.getHarnessOrNull(
      MatButtonHarness.with({
        selector: '[data-testid="footerNavigateNextButton"]',
      })
    );

  const getAriaLabel = async (buttonHarness: MatButtonHarness | null) => {
    const host = await buttonHarness?.host();
    return host?.getAttribute('aria-label');
  };
});
