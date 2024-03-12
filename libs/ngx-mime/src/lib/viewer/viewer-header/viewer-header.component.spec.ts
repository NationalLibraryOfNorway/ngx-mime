import { BreakpointObserver } from '@angular/cdk/layout';
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
import { Spy, provideAutoSpy } from 'jest-auto-spies';
import { TestManifests } from '../../../testing/test-manifests';
import { ContentSearchDialogConfigStrategyFactory } from '../../content-search-dialog/content-search-dialog-config-strategy-factory';
import { ContentSearchDialogComponent } from '../../content-search-dialog/content-search-dialog.component';
import { ContentSearchDialogService } from '../../content-search-dialog/content-search-dialog.service';
import { AltoService } from '../../core/alto-service/alto.service';
import { FullscreenService } from '../../core/fullscreen-service/fullscreen.service';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { MimeDomHelper } from '../../core/mime-dom-helper';
import { MimeResizeService } from '../../core/mime-resize-service/mime-resize.service';
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
import { SharedModule } from '../../shared/shared.module';
import { MockBreakpointObserver } from '../../test/mock-breakpoint-observer';
import { ViewDialogConfigStrategyFactory } from '../../view-dialog/view-dialog-config-strategy-factory';
import { ViewDialogComponent } from '../../view-dialog/view-dialog.component';
import { ViewDialogService } from '../../view-dialog/view-dialog.service';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../../core/intl';
import { IiifManifestServiceStub } from './../../test/iiif-manifest-service-stub';
import { ViewerHeaderComponent } from './viewer-header.component';

@Component({
  template: `<mime-viewer-header #viewer></mime-viewer-header>`,
})
export class TestHostComponent {
  @ViewChild('viewer', { static: false })
  viewerHeaderComponent!: ViewerHeaderComponent;
  @ViewChild('viewer', { read: ElementRef })
  viewerHeaderElementRef!: ElementRef;

  constructor(public viewContainerRef: ViewContainerRef) {}
}

describe('ViewerHeaderComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let rootLoader: HarnessLoader;
  let fullscreenServiceSpy: Spy<FullscreenService>;
  let iiifManifestServiceStub: IiifManifestServiceStub;
  let intl: MimeViewerIntl;
  let breakpointObserver: MockBreakpointObserver;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [
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
        provideAutoSpy(FullscreenService, {
          observablePropsToSpyOn: ['onChange'],
        }),
        provideAutoSpy(MimeResizeService, {
          observablePropsToSpyOn: ['onResize'],
        }),
        provideAutoSpy(MimeDomHelper),
        provideAutoSpy(ViewerLayoutService, {
          observablePropsToSpyOn: ['onChange'],
        }),
        provideAutoSpy(AltoService, {
          observablePropsToSpyOn: ['onRecognizedTextContentModeChange$'],
        }),
        provideAutoSpy(IiifContentSearchService, {
          observablePropsToSpyOn: ['onChange', 'isSearching', 'onSelected'],
        }),
        provideAutoSpy(ContentSearchNavigationService),
        { provide: BreakpointObserver, useClass: MockBreakpointObserver },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(testHostFixture);
    fullscreenServiceSpy = TestBed.inject<any>(FullscreenService);
    intl = TestBed.inject(MimeViewerIntl);
    iiifManifestServiceStub = TestBed.inject<any>(IiifManifestService);
    breakpointObserver = TestBed.inject<any>(BreakpointObserver);
    breakpointObserver.setMatches(true);

    setupViewDialogService();
    setupInformationDialogService();
    setupContentSearchDialogService();
    setupHelpDialogService();
  });

  it('should be created', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed', waitForAsync(() => {
    intl.informationLabel = 'Metadata of the publication';
    intl.changes.next();

    testHostFixture.whenStable().then(async () => {
      testHostFixture.detectChanges();
      const informationDialogButton = await getInformationDialogButton();
      const ariaLabel = await getAriaLabel(informationDialogButton);
      expect(ariaLabel).toEqual('Metadata of the publication');
    });
  }));

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

  it('should start in hidden mode', waitForAsync(() => {
    testHostFixture.detectChanges();

    testHostFixture.whenStable().then(() => {
      testHostFixture.detectChanges();
      expect(testHostComponent.viewerHeaderComponent.state).toEqual('hide');
      expectHeaderToBeHidden(
        testHostComponent.viewerHeaderElementRef.nativeElement,
      );
    });
  }));

  it('should not be visible when state is changed to hide', waitForAsync(() => {
    testHostFixture.detectChanges();
    testHostComponent.viewerHeaderComponent.state = 'hide';

    testHostFixture.whenStable().then(() => {
      testHostFixture.detectChanges();
      expect(testHostComponent.viewerHeaderComponent.state).toEqual('hide');
      expectHeaderToBeHidden(
        testHostComponent.viewerHeaderElementRef.nativeElement,
      );
    });
  }));

  it('should be visible when state is changed to show', waitForAsync(() => {
    testHostFixture.detectChanges();
    testHostComponent.viewerHeaderComponent.state = 'hide';

    testHostFixture.whenStable().then(() => {
      expectHeaderToBeHidden(
        testHostComponent.viewerHeaderElementRef.nativeElement,
      );

      testHostComponent.viewerHeaderComponent.state = 'show';
      testHostFixture.detectChanges();
      testHostFixture.whenStable().then(() => {
        expectHeaderToShow(
          testHostComponent.viewerHeaderElementRef.nativeElement,
        );
      });
    });
  }));

  it('should show fullscreen button if fullscreen mode is supported', async () => {
    fullscreenServiceSpy.isEnabled.mockReturnValue(true);
    testHostFixture.detectChanges();

    expect(await getFullscreenButton()).not.toBeNull();
  });

  it('should hide fullscreen button if fullscreen mode is unsupported', async () => {
    fullscreenServiceSpy.isEnabled.mockReturnValue(false);
    testHostFixture.detectChanges();

    expect(await getFullscreenButton()).toBeNull();
  });

  it('should show search button if manifest has a search service', waitForAsync(() => {
    setCurrentManifest({
      ...TestManifests.aEmpty(),
      service: new Service(),
    });

    testHostFixture.whenStable().then(async () => {
      testHostFixture.detectChanges();

      const contentSearchDialogbutton = await getContentSearchDialogButton();
      const ariaLabel = await getAriaLabel(contentSearchDialogbutton);
      expect(ariaLabel).toEqual('Search');
    });
  }));

  it('should hide search button if manifest does not have a search service', waitForAsync(() => {
    setCurrentManifest(new Manifest());

    testHostFixture.whenStable().then(async () => {
      testHostFixture.detectChanges();

      expect(await getContentSearchDialogButton()).toBeNull();
    });
  }));

  it('should show label if manifest has a label', waitForAsync(() => {
    setCurrentManifest({
      label: 'Testlabel',
      viewingDirection: ViewingDirection.LTR,
    });

    testHostFixture.whenStable().then(() => {
      testHostFixture.detectChanges();

      const label = testHostFixture.debugElement.query(
        By.css('[data-testid="ngx-mime-manifest-label"].label'),
      ).nativeElement;

      expect(label.innerHTML).toBe('Testlabel');
    });
  }));

  it('should show view menu button if digital text is available', waitForAsync(() => {
    setCurrentManifest(TestManifests.withDigitalTextContent());

    testHostFixture.whenStable().then(async () => {
      testHostFixture.detectChanges();

      expect(await getViewMenuButton()).not.toBeNull();
    });
  }));

  it('should show view menu button if manifest is paged', waitForAsync(() => {
    setCurrentManifest(TestManifests.aDefault());

    testHostFixture.whenStable().then(async () => {
      testHostFixture.detectChanges();

      expect(await getViewMenuButton()).not.toBeNull();
    });
  }));

  it('should hide view menu button if manifest is not paged and digital text is not available', waitForAsync(() => {
    setCurrentManifest(TestManifests.aEmpty());

    testHostFixture.whenStable().then(async () => {
      testHostFixture.detectChanges();

      expect(await getViewMenuButton()).toBeNull();
    });
  }));

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
    iiifManifestServiceStub._currentManifest.next(manifest);
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

  const expectHeaderToShow = (element: any) => {
    expect(element.style.transform).toBe('translate(0px, 0px)');
  };

  const expectHeaderToBeHidden = async (element: any) => {
    expect(element.style.transform).toBe('translate(0, -100%)');
  };
});
