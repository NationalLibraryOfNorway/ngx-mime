import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Spy, provideAutoSpy } from 'jasmine-auto-spies';
import { injectedStub } from '../../../testing/injected-stub';
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
import { ViewDialogConfigStrategyFactory } from '../../view-dialog/view-dialog-config-strategy-factory';
import { ViewDialogComponent } from '../../view-dialog/view-dialog.component';
import { ViewDialogService } from '../../view-dialog/view-dialog.service';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../../core/intl';
import { IiifManifestServiceStub } from './../../test/iiif-manifest-service-stub';
import { ViewerHeaderComponent } from './viewer-header.component';

describe('ViewerHeaderComponent', () => {
  let component: ViewerHeaderComponent;
  let fixture: ComponentFixture<ViewerHeaderComponent>;
  let rootLoader: HarnessLoader;
  let fullscreenServiceSpy: Spy<FullscreenService>;
  let iiifManifestServiceStub: IiifManifestServiceStub;
  let intl: MimeViewerIntl;
  let mediaObserverSpy: Spy<MediaObserver>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [
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
        ViewContainerRef,
        provideAutoSpy(ElementRef),
        provideAutoSpy(MediaObserver),
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerHeaderComponent);
    component = fixture.componentInstance;
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    fullscreenServiceSpy = TestBed.inject<any>(FullscreenService);
    intl = TestBed.inject(MimeViewerIntl);
    iiifManifestServiceStub = injectedStub(IiifManifestService);
    mediaObserverSpy = TestBed.inject<any>(MediaObserver);
    mediaObserverSpy.isActive.and.returnValue(true);

    setupViewDialogService();
    setupInformationDialogService();
    setupContentSearchDialogService();
    setupHelpDialogService();

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should re-render when the i18n labels have changed', waitForAsync(() => {
      const button = fixture.debugElement.query(
        By.css('#ngx-mimeInformationDialogButton')
      );

      intl.informationLabel = 'Metadata of the publication';
      intl.changes.next();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(button.nativeElement.getAttribute('aria-label')).toBe(
          'Metadata of the publication'
        );
      });
    }));

    it('should open view dialog', async () => {
      component.toggleView();

      const dialogs = await rootLoader.getAllHarnesses(MatDialogHarness);
      expect(dialogs.length).toEqual(1);
    });

    it('should open information dialog', async () => {
      component.toggleInformationDialog();

      const dialogs = await rootLoader.getAllHarnesses(MatDialogHarness);
      expect(dialogs.length).toEqual(1);
    });

    it('should open search dialog', async () => {
      component.toggleSearch();

      const dialogs = await rootLoader.getAllHarnesses(MatDialogHarness);
      expect(dialogs.length).toEqual(1);
    });

    it('should open help dialog', async () => {
      component.toggleHelp();

      const dialogs = await rootLoader.getAllHarnesses(MatDialogHarness);
      expect(dialogs.length).toEqual(1);
    });

    it('should start in hidden mode', () => {
      fixture.detectChanges();

      expect(component.state).toEqual('hide');
      expectHeaderToBeHidden(fixture.debugElement.nativeElement);
    });

    it('should not be visible when state is changed to hide', waitForAsync(() => {
      const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));

      component.state = 'hide';
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expectHeaderToBeHidden(fixture.debugElement.nativeElement);
      });
    }));

    it('should be visible when state is changed to show', waitForAsync(() => {
      const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));

      component.state = 'hide';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expectHeaderToBeHidden(fixture.debugElement.nativeElement);

        component.state = 'show';
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expectHeaderToShow(fixture.debugElement.nativeElement);
        });
      });
    }));

    it('should show fullscreen button if fullscreen mode is supported', waitForAsync(() => {
      fullscreenServiceSpy.isEnabled.and.returnValue(true);
      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('#ngx-mimeFullscreenButton')
      );
      expect(button).not.toBeNull();
    }));

    it('should hide fullscreen button if fullscreen mode is unsupported', waitForAsync(() => {
      fullscreenServiceSpy.isEnabled.and.returnValue(false);
      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('#ngx-mimeFullscreenButton')
      );
      expect(button).toBeNull();
    }));

    it('should show search button if manifest has a search service', waitForAsync(() => {
      setCurrentManifest({
        ...TestManifests.aEmpty(),
        service: new Service(),
      });

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const button = fixture.debugElement.query(
          By.css('#ngx-mimeContentSearchDialogButton')
        );
        expect(button.nativeElement.getAttribute('aria-label')).toBe('Search');
      });
    }));

    it('should hide search button if manifest does not have a search service', waitForAsync(() => {
      setCurrentManifest(new Manifest());

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const button = fixture.debugElement.query(
          By.css('#ngx-mimeContentSearchDialogButton')
        );
        expect(button).toBeNull();
      });
    }));

    it('should show label if manifest has a label', waitForAsync(() => {
      setCurrentManifest({
        label: 'Testlabel',
        viewingDirection: ViewingDirection.LTR,
      });

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const label = fixture.debugElement.query(
          By.css('.header-container .label')
        ).nativeElement;

        expect(label.innerHTML).toBe('Testlabel');
      });
    }));

    it('should show view menu button if digital text is available', waitForAsync(() => {
      setCurrentManifest(TestManifests.withDigitalTextContent());

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const viewMenuButton = getViewMenuButton();
        expect(viewMenuButton).not.toBeNull();
      });
    }));

    it('should show view menu button if manifest is paged', waitForAsync(() => {
      setCurrentManifest(TestManifests.aDefault());

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const viewMenuButton = getViewMenuButton();
        expect(viewMenuButton).not.toBeNull();
      });
    }));

    it('should hide view menu button if manifest is not paged and digital text is not available', waitForAsync(() => {
      setCurrentManifest(TestManifests.aEmpty());

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const viewMenuButton = getViewMenuButton();
        expect(viewMenuButton).toBeNull();
      });
    }));
  });

  function setupHelpDialogService() {
    const helpDialogService = TestBed.inject(HelpDialogService);
    helpDialogService.el = TestBed.inject(ElementRef);
    helpDialogService.viewContainerRef = component.viewContainerRef;
  }

  function setupContentSearchDialogService() {
    const contentSearchDialogService = TestBed.inject(
      ContentSearchDialogService
    );
    contentSearchDialogService.el = TestBed.inject(ElementRef);
    contentSearchDialogService.viewContainerRef = component.viewContainerRef;
  }

  function setupInformationDialogService() {
    const informationDialogService = TestBed.inject(InformationDialogService);
    informationDialogService.el = TestBed.inject(ElementRef);
    informationDialogService.viewContainerRef = component.viewContainerRef;
  }

  function setupViewDialogService() {
    const viewDialogService = TestBed.inject(ViewDialogService);
    viewDialogService.el = TestBed.inject(ElementRef);
    viewDialogService.viewContainerRef = component.viewContainerRef;
  }

  function setCurrentManifest(manifest: Manifest) {
    iiifManifestServiceStub._currentManifest.next(manifest);
  }

  function getViewMenuButton() {
    return fixture.debugElement.query(
      By.css('[data-test-id="ngx-mime-view-menu-button"]')
    );
  }

  function expectHeaderToShow(element: any) {
    expect(element.style.transform).toBe('translate(0px, 0px)');
  }

  function expectHeaderToBeHidden(element: any) {
    expect(element.style.transform).toBe('translate(0px, -100%)');
  }
});
