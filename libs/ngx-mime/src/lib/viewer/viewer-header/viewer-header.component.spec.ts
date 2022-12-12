import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { By } from '@angular/platform-browser';
import { injectedStub } from '../../../testing/injected-stub';
import { TestManifests } from '../../../testing/test-manifests';
import { ContentSearchDialogModule } from '../../content-search-dialog/content-search-dialog.module';
import { FullscreenService } from '../../core/fullscreen-service/fullscreen.service';
import { Manifest, Service } from '../../core/models/manifest';
import { ViewingDirection } from '../../core/models/viewing-direction';
import { HelpDialogModule } from '../../help-dialog/help-dialog.module';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../../core/intl';
import { IiifManifestServiceStub } from './../../test/iiif-manifest-service-stub';
import { ViewerHeaderTestModule } from './viewer-header-test.module';
import { ViewerHeaderComponent } from './viewer-header.component';

describe('ViewerHeaderComponent', () => {
  let component: ViewerHeaderComponent;
  let fixture: ComponentFixture<ViewerHeaderComponent>;
  let rootLoader: HarnessLoader;
  let fullscreenService: FullscreenService;
  let iiifManifestService: IiifManifestServiceStub;
  let intl: MimeViewerIntl;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ViewerHeaderTestModule,
        ContentSearchDialogModule,
        HelpDialogModule,
      ],
      providers: [
        FullscreenService,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerHeaderComponent);
    component = fixture.componentInstance;
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    fullscreenService = TestBed.inject(FullscreenService);
    intl = TestBed.inject(MimeViewerIntl);
    iiifManifestService = injectedStub(IiifManifestService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed', waitForAsync(() => {
    const button = fixture.debugElement.query(
      By.css('#ngx-mimeContentsDialogButton')
    );

    intl.contentsLabel = 'Metadata of the publication';
    intl.changes.next();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(button.nativeElement.getAttribute('aria-label')).toBe(
        'Metadata of the publication'
      );
    });
  }));

  it('should open contents dialog', async () => {
    component.toggleContents();

    const dialogs = await rootLoader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toEqual(1);
  });

  it('should start in hidden mode', () => {
    expect(component.state).toBe('hide');
    expectHeaderToBeHidden(fixture.debugElement.nativeElement);
  });

  it('should not be visible when state is changed to hide', waitForAsync(() => {
    const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));

    component.state = 'hide';
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
    spyOn(fullscreenService, 'isEnabled').and.returnValue(true);

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('#ngx-mimeFullscreenButton')
      );
      expect(button).not.toBeNull();
    });
  }));

  it('should hide fullscreen button if fullscreen mode is unsupported', waitForAsync(() => {
    spyOn(fullscreenService, 'isEnabled').and.returnValue(false);

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('#ngx-mimeFullscreenButton')
      );
      expect(button).not.toBeNull();
    });
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

  function setCurrentManifest(manifest: Manifest) {
    iiifManifestService._currentManifest.next(manifest);
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
