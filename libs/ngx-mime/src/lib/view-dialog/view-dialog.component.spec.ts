import { BreakpointObserver } from '@angular/cdk/layout';
import { provideHttpClient } from '@angular/common/http';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
import { MockBreakpointObserver } from '../test/mock-breakpoint-observer';
import { ViewerServiceStub } from '../test/viewer-service-stub';
import { ViewDialogComponent } from './view-dialog.component';

describe('ViewDialogComponent', () => {
  let component: ViewDialogComponent;
  let fixture: ComponentFixture<ViewDialogComponent>;
  let iiifManifestService: IiifManifestServiceStub;
  let breakpointObserver: MockBreakpointObserver;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ViewDialogComponent],
      providers: [
        provideHttpClient(),
        MimeViewerIntl,
        ViewerLayoutService,
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
        { provide: BreakpointObserver, useClass: MockBreakpointObserver },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDialogComponent);
    component = fixture.componentInstance;
    iiifManifestService = TestBed.inject<any>(IiifManifestService);
    breakpointObserver = TestBed.inject(
      BreakpointObserver,
    ) as MockBreakpointObserver;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display desktop toolbar', waitForAsync(() => {
    breakpointObserver.setMatches(false);

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const heading: DebugElement = fixture.debugElement.query(
        By.css('[data-testid="ngx-mime-heading-desktop"]'),
      );
      expect(heading).not.toBeNull();
    });
  }));

  it('should display mobile toolbar', waitForAsync(() => {
    breakpointObserver.setMatches(true);

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const heading: DebugElement = fixture.debugElement.query(
        By.css('[data-testid="ngx-mime-heading-desktop"]'),
      );
      expect(heading).toBeNull();
    });
  }));

  it('should show page layout toggle group if manifest is paged', waitForAsync(() => {
    iiifManifestService._currentManifest.next(TestManifests.aDefault());

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const pageLayoutSection = fixture.debugElement.query(
        By.css('[data-testid="page-layout"]'),
      );
      expect(pageLayoutSection).not.toBeNull();
    });
  }));

  it('should hide page layout toggle group if manifest is not paged', waitForAsync(() => {
    iiifManifestService._currentManifest.next(TestManifests.aEmpty());

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const pageLayoutSection = fixture.debugElement.query(
        By.css('[data-testid="page-layout"]'),
      );
      expect(pageLayoutSection).toBeNull();
    });
  }));

  it('should show digital text toggle group if digital text is available', waitForAsync(() => {
    iiifManifestService._currentManifest.next(
      TestManifests.withDigitalTextContent(),
    );

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const recognizedTextContentSection = fixture.debugElement.query(
        By.css('[data-testid="recognized-text-content"]'),
      );
      expect(recognizedTextContentSection).not.toBeNull();
    });
  }));

  it('should hide digital text toggle group if digital text is not available', waitForAsync(() => {
    iiifManifestService._currentManifest.next(TestManifests.aEmpty());

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const recognizedTextContentSection = fixture.debugElement.query(
        By.css('[data-testid="recognized-text-content"]'),
      );
      expect(recognizedTextContentSection).toBeNull();
    });
  }));
});
