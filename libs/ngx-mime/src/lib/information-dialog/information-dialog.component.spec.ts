import { BreakpointObserver } from '@angular/cdk/layout';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { injectedStub } from '../../testing/injected-stub';
import { AltoService } from '../core/alto-service/alto.service';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { ClickService } from '../core/click-service/click.service';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';
import { HighlightService } from '../core/highlight-service/highlight.service';
import { IiifContentSearchService } from '../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { ModeService } from '../core/mode-service/mode.service';
import { Manifest, Metadata, Structure } from '../core/models/manifest';
import { StyleService } from '../core/style-service/style.service';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { SharedModule } from '../shared/shared.module';
import { AltoServiceStub } from '../test/alto-service-stub';
import { MatDialogRefStub } from '../test/mat-dialog-ref-stub';
import { MockBreakpointObserver } from '../test/mock-breakpoint-observer';
import { IiifManifestServiceStub } from './../test/iiif-manifest-service-stub';
import { InformationDialogComponent } from './information-dialog.component';
import { MetadataComponent } from './metadata/metadata.component';
import { TocComponent } from './table-of-contents/table-of-contents.component';

describe('InformationDialogComponent', () => {
  let component: InformationDialogComponent;
  let fixture: ComponentFixture<InformationDialogComponent>;
  let loader: HarnessLoader;
  let breakpointObserver: MockBreakpointObserver;
  let iiifManifestService: IiifManifestServiceStub;
  let intl: MimeViewerIntl;
  let dialogRef: MatDialogRef<InformationDialogComponent>;
  let viewerService: ViewerService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [NoopAnimationsModule, SharedModule, HttpClientTestingModule],
      declarations: [
        InformationDialogComponent,
        MetadataComponent,
        TocComponent,
      ],
      providers: [
        ViewerService,
        ClickService,
        MimeViewerIntl,
        CanvasService,
        ModeService,
        MimeResizeService,
        MimeDomHelper,
        FullscreenService,
        ViewerLayoutService,
        IiifContentSearchService,
        StyleService,
        HighlightService,
        { provide: AltoService, useClass: AltoServiceStub },
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: BreakpointObserver, useClass: MockBreakpointObserver },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationDialogComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    breakpointObserver = injectedStub(BreakpointObserver);
    viewerService = TestBed.inject(ViewerService);
    iiifManifestService = injectedStub(IiifManifestService);
    intl = TestBed.inject(MimeViewerIntl);
    dialogRef = TestBed.inject(MatDialogRef);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display desktop toolbar', () => {
    breakpointObserver.setMatches(false);

    fixture.detectChanges();

    const heading: DebugElement = fixture.debugElement.query(
      By.css('mat-toolbar[data-testid="desktop-toolbar"]')
    );
    expect(heading).not.toBeNull();
  });

  it('should display mobile toolbar', () => {
    breakpointObserver.setMatches(true);

    fixture.detectChanges();

    const heading: DebugElement = fixture.debugElement.query(
      By.css('mat-toolbar[data-testid="mobile-toolbar"]')
    );
    expect(heading).not.toBeNull();
  });

  it('should show toc', waitForAsync(() => {
    fixture.detectChanges();
    const manifest = new Manifest({
      structures: [new Structure()],
    });
    iiifManifestService._currentManifest.next(manifest);
    intl.tocLabel = 'TocTestLabel';
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const tabs: NodeList =
        fixture.nativeElement.querySelectorAll('.mat-mdc-tab');
      const tocTab = Array.from(tabs).find(
        (t) => t.textContent === intl.tocLabel
      );
      expect(tocTab).toBeDefined();
    });
  }));

  it('should hide toc', waitForAsync(() => {
    const manifest = new Manifest();
    iiifManifestService._currentManifest.next(manifest);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const tabs: NodeList =
        fixture.nativeElement.querySelectorAll('.mat-mdc-tab');
      const tocTab = Array.from(tabs).find(
        (t) => t.textContent === intl.tocLabel
      );
      expect(tocTab).toBeUndefined();
    });
  }));

  it('should close information dialog when selecting a canvas group in TOC when on mobile', async () => {
    spyOn(viewerService, 'goToCanvas');
    spyOn(dialogRef, 'close').and.callThrough();
    breakpointObserver.setMatches(true);

    iiifManifestService._currentManifest.next(
      new Manifest({
        metadata: [
          new Metadata('label1', 'value1'),
          new Metadata('label2', 'value2'),
        ],
        sequences: [
          {
            canvases: [
              { id: 'canvas1' },
              { id: 'canvas2' },
              { id: 'canvas3' },
              { id: 'canvas4' },
              { id: 'canvas5' },
            ],
          },
        ],
        structures: [
          new Structure({
            label: 'Forside',
            canvases: ['canvas1'],
            canvasIndex: 0,
          }),
          new Structure({
            label: 'Tittelside',
            canvases: ['canvas2'],
            canvasIndex: 1,
          }),
          new Structure({
            label: 'Bakside',
            canvases: ['canvas5'],
            canvasIndex: 4,
          }),
        ],
      })
    );
    intl.tocLabel = 'TocTestLabel';
    fixture.detectChanges();

    const tabGroup = await loader.getHarness(MatTabGroupHarness);
    await tabGroup.selectTab({ label: intl.tocLabel });
    const divs: DebugElement[] = fixture.debugElement.queryAll(
      By.css('.toc-link')
    );

    divs[2].triggerEventHandler('click', new Event('fakeEvent'));

    expect(dialogRef.close).toHaveBeenCalled();
  });
});
