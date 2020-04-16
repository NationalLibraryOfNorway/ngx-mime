import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { ClickService } from '../core/click-service/click.service';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';
import { IiifContentSearchService } from '../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { ModeService } from '../core/mode-service/mode.service';
import { Manifest, Structure, Metadata } from '../core/models/manifest';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { SharedModule } from '../shared/shared.module';
import { MatDialogRefStub } from '../test/mat-dialog-ref-stub';
import { IiifManifestServiceStub } from './../test/iiif-manifest-service-stub';
import { MediaObserverStub } from '../test/media-observer-stub';
import { ContentsDialogComponent } from './contents-dialog.component';
import { MetadataComponent } from './metadata/metadata.component';
import { TocComponent } from './table-of-contents/table-of-contents.component';
import { MimeMaterialModule } from '../shared/mime-material.module';

describe('ContentsDialogComponent', () => {
  let component: ContentsDialogComponent;
  let fixture: ComponentFixture<ContentsDialogComponent>;
  let mediaObserver: MediaObserver;
  let iiifManifestService: IiifManifestServiceStub;
  let intl: MimeViewerIntl;
  let dialogRef: MatDialogRef<ContentsDialogComponent>;
  let viewerService: ViewerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule, HttpClientTestingModule, MimeMaterialModule],
      declarations: [ContentsDialogComponent, MetadataComponent, TocComponent],
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
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: MediaObserver, useClass: MediaObserverStub }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContentsDialogComponent);
    component = fixture.componentInstance;
    mediaObserver = TestBed.get(MediaObserver);
    viewerService = TestBed.inject(ViewerService);
    iiifManifestService = TestBed.get(IiifManifestService);
    intl = TestBed.get(MimeViewerIntl);
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  }));

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

  it('should show toc', async(() => {
    const manifest = new Manifest({
      structures: [new Structure()]
    });
    iiifManifestService._currentManifest.next(manifest);
    intl.tocLabel = 'TocTestLabel';

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const tabs: NodeList = fixture.nativeElement.querySelectorAll(
        '.mat-tab-label'
      );
      const tocTab = Array.from(tabs).find(
        t => t.textContent === intl.tocLabel
      );
      expect(tocTab).toBeDefined();
    });
  }));

  it('should hide toc', async(() => {
    const manifest = new Manifest();
    iiifManifestService._currentManifest.next(manifest);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const tabs: NodeList = fixture.nativeElement.querySelectorAll(
        '.mat-tab-label'
      );
      const tocTab = Array.from(tabs).find(
        t => t.textContent === intl.tocLabel
      );
      expect(tocTab).toBeUndefined();
    });
  }));

  fit('should close contents dialog when selecting a canvas group in TOC when on mobile', async(() => {
    spyOn(mediaObserver, 'isActive').and.returnValue(true);
    spyOn(viewerService, 'goToCanvas').and.stub();
    spyOn(dialogRef, 'close').and.callThrough();

    iiifManifestService._currentManifest.next(
      new Manifest({
        metadata: [
          new Metadata('label1', 'value1'),
          new Metadata('label2', 'value2')
        ],
        sequences: [
          {
            canvases: [
              { id: 'canvas1' },
              { id: 'canvas2' },
              { id: 'canvas3' },
              { id: 'canvas4' },
              { id: 'canvas5' }
            ]
          }
        ],
        structures: [
          new Structure({
            label: 'Forside',
            canvases: ['canvas1'],
            canvasIndex: 0
          }),
          new Structure({
            label: 'Tittelside',
            canvases: ['canvas2'],
            canvasIndex: 1
          }),
          new Structure({
            label: 'Bakside',
            canvases: ['canvas5'],
            canvasIndex: 4
          })
        ]
      })
    );
    intl.tocLabel = 'TocTestLabel';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const tabs: NodeList = fixture.nativeElement.querySelectorAll(
        '.mat-tab-label'
      );
      const tocTab = Array.from(tabs).find(
        t => t.textContent === intl.tocLabel
      );
      expect(tocTab).toBeDefined();
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
      });
      tocTab.dispatchEvent(event);
      const divs: DebugElement[] = fixture.debugElement.queryAll(
        By.css('.toc-link')
      );
      divs[2].triggerEventHandler('click', null);

      expect(dialogRef.close).toHaveBeenCalled();
    });

  }));
});
