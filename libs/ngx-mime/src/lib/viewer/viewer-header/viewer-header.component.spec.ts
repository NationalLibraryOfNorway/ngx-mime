import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonToggleHarness } from '@angular/material/button-toggle/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { By } from '@angular/platform-browser';
import { ContentSearchDialogModule } from '../../content-search-dialog/content-search-dialog.module';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { ClickService } from '../../core/click-service/click.service';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { ModeService } from '../../core/mode-service/mode.service';
import { Manifest, Service } from '../../core/models/manifest';
import { ViewerLayout } from '../../core/models/viewer-layout';
import { ViewingDirection } from '../../core/models/viewing-direction';
import { ViewerLayoutService } from '../../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../../core/viewer-service/viewer.service';
import { HelpDialogModule } from '../../help-dialog/help-dialog.module';
import { FullscreenService } from './../../core/fullscreen-service/fullscreen.service';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../../core/intl/viewer-intl';
import { MimeDomHelper } from './../../core/mime-dom-helper';
import { FullscreenServiceStub } from './../../test/fullscreen-service-stub';
import { IiifManifestServiceStub } from './../../test/iiif-manifest-service-stub';
import { ViewerHeaderTestModule } from './viewer-header-test.module';
import { ViewerHeaderComponent } from './viewer-header.component';

describe('ViewerHeaderComponent', () => {
  let component: ViewerHeaderComponent;
  let fixture: ComponentFixture<ViewerHeaderComponent>;
  let rootLoader: HarnessLoader;
  let loader: HarnessLoader;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [
          MatButtonToggleModule,
          ViewerHeaderTestModule,
          ContentSearchDialogModule,
          HelpDialogModule,
        ],
        providers: [
          ViewerService,
          ClickService,
          CanvasService,
          ModeService,
          MimeDomHelper,
          FullscreenService,
          ViewerLayoutService,
          IiifContentSearchService,
          { provide: FullscreenService, useClass: FullscreenServiceStub },
          { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerHeaderComponent);
    component = fixture.componentInstance;
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should re-render when the i18n labels have changed', inject(
    [MimeViewerIntl],
    (intl: MimeViewerIntl) => {
      const button = fixture.debugElement.query(
        By.css('#ngx-mimeContentsDialogButton')
      );

      intl.contentsLabel = 'Metadata of the publication';
      intl.changes.next();
      fixture.detectChanges();

      expect(button.nativeElement.getAttribute('aria-label')).toBe(
        'Metadata of the publication'
      );
    }
  ));

  it('should open contents dialog', async () => {
    component.toggleContents();

    const dialogs = await rootLoader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toEqual(1);
  });

  it(
    'should start in hidden mode',
    waitForAsync(() => {
      expect(component.state).toBe('hide');
      expectHeaderToBeHidden(fixture.debugElement.nativeElement);
    })
  );

  it(
    'should not be visible when state is changed to hide',
    waitForAsync(() => {
      const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));

      component.state = 'hide';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expectHeaderToBeHidden(fixture.debugElement.nativeElement);
      });
    })
  );

  it(
    'should be visible when state is changed to show',
    waitForAsync(() => {
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
    })
  );

  it('should show fullscreen button if fullscreen mode is supported', inject(
    [FullscreenService],
    (fullscreenService: FullscreenService) => {
      spyOn(fullscreenService, 'isEnabled').and.returnValue(true);

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('#ngx-mimeFullscreenButton')
      );
      expect(button).not.toBeNull();
    }
  ));

  it('should hide fullscreen button if fullscreen mode is unsupported', inject(
    [FullscreenService],
    (fullscreenService: FullscreenService) => {
      spyOn(fullscreenService, 'isEnabled').and.returnValue(false);

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('#ngx-mimeFullscreenButton')
      );
      expect(button).not.toBeNull();
    }
  ));

  it('should show search button if manifest has a search service', inject(
    [IiifManifestService],
    (iiifManifestService: IiifManifestServiceStub) => {
      iiifManifestService._currentManifest.next({
        ...new Manifest(),
        service: new Service(),
      });

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('#ngx-mimeContentSearchDialogButton')
      );
      expect(button.nativeElement.getAttribute('aria-label')).toBe('Search');
    }
  ));

  it('should hide search button if manifest does not have a search service', inject(
    [IiifManifestService],
    (iiifManifestService: IiifManifestServiceStub) => {
      iiifManifestService._currentManifest.next(new Manifest());

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('#ngx-mimeContentSearchDialogButton')
      );
      expect(button).toBeNull();
    }
  ));

  it('should hide one-page-button and show two-page-button if current viewer-layout is one-page-view', inject(
    [ViewerLayoutService],
    (viewerLayoutService: ViewerLayoutService) => {
      component.isPagedManifest = true;
      viewerLayoutService.setLayout(ViewerLayout.ONE_PAGE);

      fixture.detectChanges();

      const btnTwoPageView = fixture.debugElement.query(
        By.css('#toggleTwoPageViewButton')
      );
      expect(btnTwoPageView).not.toBeNull();

      const btnOnePageView = fixture.debugElement.query(
        By.css('#toggleSinglePageViewButton')
      );
      expect(btnOnePageView).toBeNull();
    }
  ));

  it('should hide two-page-button and show one-page-button if current viewer-layout is two-page-view', inject(
    [ViewerLayoutService],
    (viewerLayoutService: ViewerLayoutService) => {
      component.isPagedManifest = true;
      viewerLayoutService.setLayout(ViewerLayout.TWO_PAGE);

      fixture.detectChanges();

      const btnTwoPageView = fixture.debugElement.query(
        By.css('#toggleTwoPageViewButton')
      );
      expect(btnTwoPageView).toBeNull();

      const btnOnePageView = fixture.debugElement.query(
        By.css('#toggleSinglePageViewButton')
      );
      expect(btnOnePageView).not.toBeNull();
    }
  ));

  it('should hide viewer-layout buttons if manifest is not  "paged"', inject(
    [IiifManifestService],
    (iiifManifestService: IiifManifestServiceStub) => {
      component.isPagedManifest = false;
      fixture.detectChanges();

      const btnTwoPageView = fixture.debugElement.query(
        By.css('#toggleTwoPageViewButton')
      );
      const btnOnePageView = fixture.debugElement.query(
        By.css('#toggleSinglePageViewButton')
      );
      expect(btnOnePageView).toBeNull();
      expect(btnTwoPageView).toBeNull();
    }
  ));

  it('should show label if manifest has a label', inject(
    [IiifManifestService],
    (iiifManifestService: IiifManifestServiceStub) => {
      iiifManifestService._currentManifest.next({
        label: 'Testlabel',
        viewingDirection: ViewingDirection.LTR,
      });

      fixture.detectChanges();

      const label = fixture.debugElement.query(
        By.css('.header-container .label')
      ).nativeElement;
      expect(label.innerHTML).toBe('Testlabel');
    }
  ));

  fit('should show alto button if manifest has recognized text', async () => {
    component.hasAltoXml = true;
    fixture.detectChanges();

    const btnText = await loader.getHarness(
      MatButtonToggleHarness.with({ selector: '#mime-toggleTextButton' })
    );
    expect(btnText).not.toBeNull();
  });
});

function expectHeaderToShow(element: any) {
  expect(element.style.transform).toBe('translate(0px, 0px)');
}

function expectHeaderToBeHidden(element: any) {
  expect(element.style.transform).toBe('translate(0px, -100%)');
}
