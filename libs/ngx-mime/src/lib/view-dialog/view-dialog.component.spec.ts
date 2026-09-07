import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleHarness } from '@angular/material/button-toggle/testing';
import { By } from '@angular/platform-browser';
import { TestManifests } from '../../testing';
import { AltoService } from '../core/alto-service/alto.service';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { HighlightService } from '../core/highlight-service/highlight.service';
import { IiifContentSearchService } from '../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { AltoServiceStub } from '../test/alto-service-stub';
import { IiifContentSearchServiceStub } from '../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from '../test/iiif-manifest-service-stub';
import { MimeResizeServiceStub } from '../test/mime-resize-service-stub';
import { ViewerLayoutServiceStub } from '../test/viewer-layout-service-stub';
import { ViewerServiceStub } from '../test/viewer-service-stub';
import { ViewDialogComponent } from './view-dialog.component';

describe('ViewDialogComponent', () => {
  let component: ViewDialogComponent;
  let fixture: ComponentFixture<ViewDialogComponent>;
  let loader: HarnessLoader;
  let iiifManifestService: IiifManifestServiceStub;
  let viewerLayoutServiceStub: ViewerLayoutServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ViewDialogComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MimeViewerIntl,
        CanvasService,
        HighlightService,
        { provide: AltoService, useClass: AltoServiceStub },
        { provide: ViewerService, useClass: ViewerServiceStub },
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        {
          provide: IiifContentSearchService,
          useClass: IiifContentSearchServiceStub,
        },
        { provide: MimeResizeService, useClass: MimeResizeServiceStub },
        {
          provide: ViewerLayoutService,
          useClass: ViewerLayoutServiceStub,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDialogComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    iiifManifestService = TestBed.inject<any>(IiifManifestService);
    viewerLayoutServiceStub = TestBed.inject<any>(ViewerLayoutService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display desktop toolbar', async () => {
    await fixture.whenStable();

    const heading: DebugElement = fixture.debugElement.query(
      By.css('[data-testid="ngx-mime-heading-desktop"]'),
    );
    expect(heading).not.toBeNull();
  });

  it('should display mobile toolbar', async () => {
    viewerLayoutServiceStub.useMobileViewport();
    await fixture.whenStable();

    const heading: DebugElement = fixture.debugElement.query(
      By.css('[data-testid="ngx-mime-heading-desktop"]'),
    );
    expect(heading).toBeNull();
  });

  it('should show page layout toggle group if manifest is paged', async () => {
    iiifManifestService.setManifest(TestManifests.aDefault());
    await fixture.whenStable();

    const pageLayoutToggle = await loader.getHarnessOrNull(
      MatButtonToggleHarness.with({
        selector: '[data-testid="ngx-mime-single-page-view-button"]',
      }),
    );
    expect(pageLayoutToggle).not.toBeNull();
  });

  it('should hide page layout toggle group if manifest is not paged', async () => {
    iiifManifestService.setManifest(TestManifests.aEmpty());
    await fixture.whenStable();

    const pageLayoutToggle = await loader.getHarnessOrNull(
      MatButtonToggleHarness.with({
        selector: '[data-testid="ngx-mime-single-page-view-button"]',
      }),
    );
    expect(pageLayoutToggle).toBeNull();
  });

  it('should show digital text toggle group if digital text is available', async () => {
    iiifManifestService.setManifest(TestManifests.withDigitalTextContent());
    await fixture.whenStable();

    const recognizedTextContentToggle = await loader.getHarnessOrNull(
      MatButtonToggleHarness.with({
        selector:
          '[data-testid="ngx-mime-recognized-text-content-close-button"]',
      }),
    );
    expect(recognizedTextContentToggle).not.toBeNull();
  });

  it('should hide digital text toggle group if digital text is not available', async () => {
    iiifManifestService.setManifest(TestManifests.aEmpty());
    await fixture.whenStable();

    const recognizedTextContentToggle = await loader.getHarnessOrNull(
      MatButtonToggleHarness.with({
        selector:
          '[data-testid="ngx-mime-recognized-text-content-close-button"]',
      }),
    );
    expect(recognizedTextContentToggle).toBeNull();
  });

  it('should re-render when the international labels change', async () => {
    const intl = TestBed.inject(MimeViewerIntl);
    intl.layoutMenuLabel = 'Updated view label';

    intl.notifyChanges();
    await fixture.whenStable();

    const heading: DebugElement = fixture.debugElement.query(
      By.css('[data-testid="ngx-mime-heading-desktop"]'),
    );
    expect(heading.nativeElement.textContent).toContain('Updated view label');
  });
});
