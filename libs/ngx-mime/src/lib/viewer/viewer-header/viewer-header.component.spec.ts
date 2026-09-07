import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { By } from '@angular/platform-browser';
import { provideAutoSpy } from 'jest-auto-spies';
import { TestManifests } from '../../../testing';
import { ContentSearchDialogConfigStrategyFactory } from '../../content-search-dialog/content-search-dialog-config-strategy-factory';
import { ContentSearchDialogComponent } from '../../content-search-dialog/content-search-dialog.component';
import { ContentSearchDialogService } from '../../content-search-dialog/content-search-dialog.service';
import { AltoService } from '../../core/alto-service/alto.service';
import { FullscreenService } from '../../core/fullscreen-service/fullscreen.service';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl';
import { MimeDomHelper } from '../../core/mime-dom-helper';
import { MimeResizeService } from '../../core/mime-resize-service/mime-resize.service';
import { RecognizedTextMode } from '../../core/models';
import { Manifest, Service } from '../../core/models/manifest';
import { ViewingDirection } from '../../core/models/viewing-direction';
import { ContentSearchNavigationService } from '../../core/navigation/content-search-navigation-service/content-search-navigation.service';
import { ViewerLayoutService } from '../../core/viewer-layout-service/viewer-layout-service';
import { HelpDialogConfigStrategyFactory } from '../../help-dialog/help-dialog-config-strategy-factory';
import { HelpDialogComponent } from '../../help-dialog/help-dialog.component';
import { HelpDialogService } from '../../help-dialog/help-dialog.service';
import { InformationDialogConfigStrategyFactory } from '../../information-dialog/information-dialog-config-strategy-factory';
import { InformationDialogComponent } from '../../information-dialog/information-dialog.component';
import { InformationDialogService } from '../../information-dialog/information-dialog.service';
import { FullscreenServiceStub } from '../../test/fullscreen-service-stub';
import { IiifContentSearchServiceStub } from '../../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { MimeResizeServiceStub } from '../../test/mime-resize-service-stub';
import { ViewerLayoutServiceStub } from '../../test/viewer-layout-service-stub';
import { ViewDialogConfigStrategyFactory } from '../../view-dialog/view-dialog-config-strategy-factory';
import { ViewDialogComponent } from '../../view-dialog/view-dialog.component';
import { ViewDialogService } from '../../view-dialog/view-dialog.service';
import { ViewerHeaderComponent } from './viewer-header.component';

@Component({
  template: `<mime-viewer-header #viewer></mime-viewer-header>`,
  imports: [ViewerHeaderComponent],
})
export class TestHostComponent {
  @ViewChild('viewer', { static: false })
  viewerHeaderComponent!: ViewerHeaderComponent;
  @ViewChild('viewer', { read: ElementRef })
  viewerHeaderElementRef!: ElementRef;
  viewContainerRef = inject(ViewContainerRef);
}

describe('ViewerHeaderComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let rootLoader: HarnessLoader;
  let fullscreenService: FullscreenService;
  let isFullscreenEnabledSpy: jest.SpiedFunction<
    FullscreenService['isEnabled']
  >;
  let iiifManifestServiceStub: IiifManifestServiceStub;
  let intl: MimeViewerIntl;
  let viewerLayoutServiceStub: ViewerLayoutServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        TestHostComponent,
        ViewerHeaderComponent,
        ViewDialogComponent,
        HelpDialogComponent,
        ContentSearchDialogComponent,
        InformationDialogComponent,
      ],
      providers: [
        MimeViewerIntl,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        InformationDialogConfigStrategyFactory,
        InformationDialogService,
        ContentSearchDialogConfigStrategyFactory,
        ContentSearchDialogService,
        ViewDialogConfigStrategyFactory,
        ViewDialogService,
        HelpDialogConfigStrategyFactory,
        HelpDialogService,
        provideAutoSpy(ElementRef),
        { provide: FullscreenService, useClass: FullscreenServiceStub },
        { provide: MimeResizeService, useClass: MimeResizeServiceStub },
        provideAutoSpy(MimeDomHelper),
        {
          provide: ViewerLayoutService,
          useClass: ViewerLayoutServiceStub,
        },
        provideAutoSpy(AltoService),
        {
          provide: IiifContentSearchService,
          useClass: IiifContentSearchServiceStub,
        },
        provideAutoSpy(ContentSearchNavigationService),
      ],
    }).compileComponents();

    const altoService = TestBed.inject(AltoService) as any;
    altoService.recognizedTextContentMode = signal(
      RecognizedTextMode.NONE,
    ).asReadonly();
    fullscreenService = TestBed.inject(FullscreenService);
    isFullscreenEnabledSpy = jest
      .spyOn(fullscreenService, 'isEnabled')
      .mockReturnValue(true);
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(testHostFixture);
    intl = TestBed.inject(MimeViewerIntl);
    iiifManifestServiceStub = TestBed.inject<any>(IiifManifestService);
    viewerLayoutServiceStub = TestBed.inject<any>(ViewerLayoutService);
    viewerLayoutServiceStub.useMobileViewport();

    setupViewDialogService();
    setupInformationDialogService();
    setupContentSearchDialogService();
    setupHelpDialogService();
  });

  it('should be created', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed', async () => {
    intl.informationLabel = 'Metadata of the publication';
    intl.notifyChanges();
    await testHostFixture.whenStable();

    const informationDialogButton = await getInformationDialogButton();
    const ariaLabel = await getAriaLabel(informationDialogButton);
    expect(ariaLabel).toEqual('Metadata of the publication');
  });

  it('should open view dialog', async () => {
    setCurrentManifest(TestManifests.aDefault());

    await openViewMenuDialog();

    await expectOneDialogToBeOpened();
  });

  it('should open information dialog', async () => {
    await openInformationDialog();

    await expectOneDialogToBeOpened();
  });

  it('should open search dialog', async () => {
    setCurrentManifest(TestManifests.withContentSearchService());

    await openContentSearchDialog();

    await expectOneDialogToBeOpened();
  });

  it('should open help dialog', async () => {
    await openHelpDialog();

    await expectOneDialogToBeOpened();
  });

  // it('should start in hidden mode', waitForAsync(() => {
  //   testHostFixture.detectChanges();
  //
  //   testHostFixture.whenStable().then(() => {
  //     testHostFixture.detectChanges();
  //     expect(testHostComponent.viewerHeaderComponent.state).toEqual('hide');
  //     expectHeaderToBeHidden(
  //       testHostComponent.viewerHeaderElementRef.nativeElement,
  //     );
  //   });
  // }));
  //
  // it('should not be visible when state is changed to hide', waitForAsync(() => {
  //   testHostFixture.detectChanges();
  //   testHostComponent.viewerHeaderComponent.state = 'hide';
  //
  //   testHostFixture.whenStable().then(() => {
  //     testHostFixture.detectChanges();
  //     expect(testHostComponent.viewerHeaderComponent.state).toEqual('hide');
  //     expectHeaderToBeHidden(
  //       testHostComponent.viewerHeaderElementRef.nativeElement,
  //     );
  //   });
  // }));
  //
  // it('should be visible when state is changed to show', waitForAsync(() => {
  //   testHostFixture.detectChanges();
  //   testHostComponent.viewerHeaderComponent.state = 'hide';
  //
  //   testHostFixture.whenStable().then(() => {
  //     expectHeaderToBeHidden(
  //       testHostComponent.viewerHeaderElementRef.nativeElement,
  //     );
  //
  //     testHostComponent.viewerHeaderComponent.state = 'show';
  //     testHostFixture.detectChanges();
  //     testHostFixture.whenStable().then(() => {
  //       expectHeaderToShow(
  //         testHostComponent.viewerHeaderElementRef.nativeElement,
  //       );
  //     });
  //   });
  // }));

  it('should show fullscreen button if fullscreen mode is supported', async () => {
    isFullscreenEnabledSpy.mockReturnValue(true);
    await testHostFixture.whenStable();

    expect(await getFullscreenButton()).not.toBeNull();
  });

  it('should hide fullscreen button if fullscreen mode is unsupported', async () => {
    testHostFixture.destroy();
    isFullscreenEnabledSpy.mockReturnValue(false);
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(testHostFixture);
    await testHostFixture.whenStable();

    expect(await getFullscreenButton()).toBeNull();
  });

  it('should show search button if manifest has a search service', async () => {
    setCurrentManifest({
      ...TestManifests.aEmpty(),
      service: new Service(),
    });
    await testHostFixture.whenStable();

    const contentSearchDialogbutton = await getContentSearchDialogButton();
    const ariaLabel = await getAriaLabel(contentSearchDialogbutton);
    expect(ariaLabel).toEqual('Search');
  });

  it('should hide search button if manifest does not have a search service', async () => {
    setCurrentManifest(new Manifest());
    await testHostFixture.whenStable();

    expect(await getContentSearchDialogButton()).toBeNull();
  });

  it('should show label if manifest has a label', async () => {
    setCurrentManifest({
      label: 'Testlabel',
      viewingDirection: ViewingDirection.LTR,
    });
    await testHostFixture.whenStable();

    const label = testHostFixture.debugElement.query(
      By.css('[data-testid="ngx-mime-manifest-label"].label'),
    ).nativeElement;

    expect(label.innerHTML).toBe('Testlabel');
  });

  it('should show view menu button if digital text is available', async () => {
    setCurrentManifest(TestManifests.withDigitalTextContent());
    await testHostFixture.whenStable();

    expect(await getViewMenuButton()).not.toBeNull();
  });

  it('should show view menu button if manifest is paged', async () => {
    setCurrentManifest(TestManifests.aDefault());
    await testHostFixture.whenStable();

    expect(await getViewMenuButton()).not.toBeNull();
  });

  it('should hide view menu button if manifest is not paged and digital text is not available', async () => {
    setCurrentManifest(TestManifests.aEmpty());
    await testHostFixture.whenStable();

    expect(await getViewMenuButton()).toBeNull();
  });

  const openViewMenuDialog = async () => {
    const viewMenuButton = await getViewMenuButton();
    viewMenuButton?.click();
  };

  const openInformationDialog = async () => {
    const informationDialogButton = await getInformationDialogButton();
    informationDialogButton?.click();
  };

  const openContentSearchDialog = async () => {
    const contentSearchDialogButton = await getContentSearchDialogButton();
    contentSearchDialogButton?.click();
  };

  const openHelpDialog = async () => {
    const helpDialogButton = await getHelpDialogButton();
    helpDialogButton?.click();
  };

  const setupHelpDialogService = () => {
    const helpDialogService = TestBed.inject(HelpDialogService);
    helpDialogService.el = TestBed.inject(ElementRef);
    helpDialogService.viewContainerRef = testHostComponent.viewContainerRef;
  };

  const setupContentSearchDialogService = () => {
    const contentSearchDialogService = TestBed.inject(
      ContentSearchDialogService,
    );
    contentSearchDialogService.el = TestBed.inject(ElementRef);
    contentSearchDialogService.viewContainerRef =
      testHostComponent.viewContainerRef;
  };

  const setupInformationDialogService = () => {
    const informationDialogService = TestBed.inject(InformationDialogService);
    informationDialogService.el = TestBed.inject(ElementRef);
    informationDialogService.viewContainerRef =
      testHostComponent.viewContainerRef;
  };

  const setupViewDialogService = () => {
    const viewDialogService = TestBed.inject(ViewDialogService);
    viewDialogService.el = TestBed.inject(ElementRef);
    viewDialogService.viewContainerRef = testHostComponent.viewContainerRef;
  };

  const setCurrentManifest = (manifest: Manifest) => {
    iiifManifestServiceStub.setManifest(manifest);
  };

  const getViewMenuButton = async () =>
    rootLoader.getHarnessOrNull(
      MatButtonHarness.with({
        selector: '[data-testid="ngx-mime-view-menu-button"]',
      }),
    );

  const getInformationDialogButton = async () =>
    rootLoader.getHarnessOrNull(
      MatButtonHarness.with({
        selector: '[data-testid="ngx-mimeInformationDialogButton"]',
      }),
    );

  const getContentSearchDialogButton = async () =>
    rootLoader.getHarnessOrNull(
      MatButtonHarness.with({
        selector: '[data-testid="ngx-mimeContentSearchDialogButton"]',
      }),
    );

  const getHelpDialogButton = async () =>
    rootLoader.getHarnessOrNull(
      MatButtonHarness.with({
        selector: '[data-testid="ngx-mimeHelpDialogButton"]',
      }),
    );

  const getFullscreenButton = async () =>
    rootLoader.getHarnessOrNull(
      MatButtonHarness.with({
        selector: '[data-testid="ngx-mimeFullscreenButton"]',
      }),
    );

  const getAriaLabel = async (buttonHarness: MatButtonHarness | null) => {
    const host = await buttonHarness?.host();

    return host?.getAttribute('aria-label');
  };

  const expectOneDialogToBeOpened = async () => {
    const dialogs = await rootLoader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toEqual(1);
  };
});
