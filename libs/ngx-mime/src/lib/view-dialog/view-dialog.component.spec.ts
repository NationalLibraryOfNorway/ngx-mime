import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { injectedStub } from '../../testing/injected-stub';
import { AltoService } from '../core/alto-service/alto.service';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { IiifContentSearchService } from '../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { AltoServiceStub } from '../test/alto-service-stub';
import { IiifContentSearchServiceStub } from '../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from '../test/iiif-manifest-service-stub';
import { MatDialogRefStub } from '../test/mat-dialog-ref-stub';
import { ViewerServiceStub } from '../test/viewer-service-stub';
import { ViewDialogComponent } from './view-dialog.component';

describe('ViewDialogComponent', () => {
  let component: ViewDialogComponent;
  let fixture: ComponentFixture<ViewDialogComponent>;
  let loader: HarnessLoader;

  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;
  let iiifManifestServiceStub: IiifManifestServiceStub;
  let mediaObserver: any;
  let dialogRef: any;
  let viewerLayoutService: ViewerLayoutService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        imports: [HttpClientTestingModule],
        declarations: [ViewDialogComponent],
        providers: [
          MimeViewerIntl,
          ViewerLayoutService,
          CanvasService,
          { provide: AltoService, useClass: AltoServiceStub },
          { provide: ViewerService, useClass: ViewerServiceStub },
          { provide: IiifManifestService, useClass: IiifManifestServiceStub },
          {
            provide: IiifContentSearchService,
            useClass: IiifContentSearchServiceStub,
          },
          { provide: MatDialogRef, useClass: MatDialogRefStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDialogComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    iiifContentSearchServiceStub = injectedStub(IiifContentSearchService);
    iiifManifestServiceStub = injectedStub(IiifManifestService);
    viewerLayoutService = TestBed.inject(ViewerLayoutService);
    mediaObserver = TestBed.inject(MediaObserver);
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display desktop toolbar', () => {
    spyOn(mediaObserver, 'isActive').and.returnValue(false);

    fixture.detectChanges();

    const heading: DebugElement = fixture.debugElement.query(
      By.css('.heading-desktop')
    );
    expect(heading).not.toBeNull();
  });

  it('should display mobile toolbar', () => {
    spyOn(mediaObserver, 'isActive').and.returnValue(true);

    fixture.detectChanges();

    const heading: DebugElement = fixture.debugElement.query(
      By.css('.heading-desktop')
    );
    expect(heading).toBeNull();
  });

  it('should hide digital text toggle group if digital text is not available', () => {
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
  });

  it('should hide two-page-button and show one-page-button if current viewer-layout is two-page-view', () => {
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
  });
});
