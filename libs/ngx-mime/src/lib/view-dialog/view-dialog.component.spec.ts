import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { injectedStub } from '../../testing/injected-stub';
import { TestManifests } from '../../testing/test-manifests';
import { AltoService } from '../core/alto-service/alto.service';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { IiifContentSearchService } from '../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { AltoServiceStub } from '../test/alto-service-stub';
import { IiifContentSearchServiceStub } from '../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from '../test/iiif-manifest-service-stub';
import { MatDialogRefStub } from '../test/mat-dialog-ref-stub';
import { MimeResizeServiceStub } from '../test/mime-resize-service-stub';
import { ViewerServiceStub } from '../test/viewer-service-stub';
import { ViewDialogComponent } from './view-dialog.component';

describe('ViewDialogComponent', () => {
  let component: ViewDialogComponent;
  let fixture: ComponentFixture<ViewDialogComponent>;
  let loader: HarnessLoader;

  let iiifContentSearchService: IiifContentSearchServiceStub;
  let iiifManifestService: IiifManifestServiceStub;
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
          { provide: MimeResizeService, useClass: MimeResizeServiceStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDialogComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    iiifContentSearchService = injectedStub(IiifContentSearchService);
    iiifManifestService = injectedStub(IiifManifestService);
    viewerLayoutService = TestBed.inject(ViewerLayoutService);
    mediaObserver = TestBed.inject(MediaObserver);
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should display desktop toolbar',
    waitForAsync(() => {
      spyOn(mediaObserver, 'isActive').and.returnValue(false);

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const heading: DebugElement = fixture.debugElement.query(
          By.css('.heading-desktop')
        );
        expect(heading).not.toBeNull();
      });
    })
  );

  it(
    'should display mobile toolbar',
    waitForAsync(() => {
      spyOn(mediaObserver, 'isActive').and.returnValue(true);

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const heading: DebugElement = fixture.debugElement.query(
          By.css('.heading-desktop')
        );
        expect(heading).toBeNull();
      });
    })
  );

  it(
    'should show page layout toggle group if manifest is paged',
    waitForAsync(() => {
      iiifManifestService._currentManifest.next(TestManifests.aDefault());

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const pageLayoutSection = fixture.debugElement.query(
          By.css('[data-test-id="page-layout"]')
        );
        expect(pageLayoutSection).not.toBeNull();
      });
    })
  );

  it(
    'should hide page layout toggle group if manifest is not paged',
    waitForAsync(() => {
      iiifManifestService._currentManifest.next(TestManifests.aEmpty());

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const pageLayoutSection = fixture.debugElement.query(
          By.css('[data-test-id="page-layout"]')
        );
        expect(pageLayoutSection).toBeNull();
      });
    })
  );

  it(
    'should show digital text toggle group if digital text is available',
    waitForAsync(() => {
      iiifManifestService._currentManifest.next(
        TestManifests.withDigitalTextContent()
      );

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const recognizedTextContentSection = fixture.debugElement.query(
          By.css('[data-test-id="recognized-text-content"]')
        );
        expect(recognizedTextContentSection).not.toBeNull();
      });
    })
  );

  it(
    'should hide digital text toggle group if digital text is not available',
    waitForAsync(() => {
      iiifManifestService._currentManifest.next(TestManifests.aEmpty());

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const recognizedTextContentSection = fixture.debugElement.query(
          By.css('[data-test-id="recognized-text-content"]')
        );
        expect(recognizedTextContentSection).toBeNull();
      });
    })
  );
});
