import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, inject, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { MimeViewerConfig } from '../core/mime-viewer-config';
import { SharedModule } from '../shared/shared.module';
import { ContentsDialogModule } from '../contents-dialog/contents-dialog.module';
import { ViewerComponent } from './viewer.component';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { AttributionDialogModule } from '../attribution-dialog/attribution-dialog.module';
import { ContentSearchDialogModule } from './../content-search-dialog/content-search-dialog.module';
import { testManifest } from '../test/testManifest';
import { ManifestBuilder } from '../core/builders/manifest.builder';
import { Manifest } from '../core/models/manifest';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { ClickService } from '../core/click-service/click.service';
import { PageService } from '../core/page-service/page-service';
import { ModeService } from '../core/mode-service/mode.service';
import { ViewerMode } from '../core/models/viewer-mode';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';

import 'openseadragon';
import '../rxjs-extension';

describe('ViewerComponent', function () {
  const config: MimeViewerConfig = new MimeViewerConfig();
  const osdAnimationTime = 2000;
  let comp: ViewerComponent;
  let fixture: ComponentFixture<ViewerComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let originalTimeout: number;

  let viewerService: ViewerService;
  let pageService: PageService;
  let clickService: ClickService;
  let modeService: ModeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        SharedModule,
        ContentsDialogModule,
        AttributionDialogModule,
        ContentSearchDialogModule
      ],
      declarations: [
        ViewerComponent,
        TestHostComponent
      ],
      providers: [
        ViewerService,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        IiifContentSearchService,
        MimeResizeService,
        MimeViewerIntl,
        ClickService,
        PageService,
        ModeService,
        FullscreenService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostComponent.manifestUri = 'dummyURI1';
    testHostComponent.viewerComponent.ngOnInit();
    testHostFixture.detectChanges();

    viewerService = TestBed.get(ViewerService);
    pageService = TestBed.get(PageService);
    clickService = TestBed.get(ClickService);
    modeService = TestBed.get(ModeService);
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should emit when page mode changes', () => {
    let selectedMode: ViewerMode;
    comp.onPageModeChange.subscribe((mode: ViewerMode) => selectedMode = mode);

    modeService.mode = ViewerMode.DASHBOARD;
    expect(selectedMode).toEqual(ViewerMode.DASHBOARD);
  });

  it('should emit when page number changes', (done) => {
    let currentPageNumber: number;
    comp.onPageChange.subscribe((pageNumber: number) => currentPageNumber = pageNumber);
    viewerService.onOsdReadyChange.subscribe((state: boolean) => {
      if (state) {
        setTimeout(() => {
          viewerService.goToPage(1, false);
        }, 100);

        setTimeout(() => {
          testHostFixture.detectChanges();
          expect(currentPageNumber).toEqual(1);
          setTimeout(() => {
            done();
          }, 1000);
        }, osdAnimationTime);
      }
    });
  });

  it('should open viewer on canvas index if present', (done) => {
    let currentPageNumber: number;
    testHostComponent.canvasIndex = 2;
    testHostFixture.detectChanges();

    comp.onPageChange.subscribe((pageNumber: number) => {
      currentPageNumber = pageNumber;
    });
    viewerService.onOsdReadyChange.subscribe((state: boolean) => {
      if (state) {
        setTimeout(() => {
          testHostFixture.detectChanges();
          expect(currentPageNumber).toEqual(2);
          setTimeout(() => {
            done();
          }, 1000);
        }, osdAnimationTime);
      }
    });
  });

  function pinchOut() {
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 40, lastDistance: 40 });
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 50, lastDistance: 40 });
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 60, lastDistance: 50 });
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 70, lastDistance: 60 });
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 80, lastDistance: 70 });
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 90, lastDistance: 80 });
  }

  function pinchIn() {
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 90, lastDistance: 90 });
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 80, lastDistance: 90 });
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 70, lastDistance: 80 });
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 60, lastDistance: 70 });
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 50, lastDistance: 60 });
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 40, lastDistance: 50 });
  }

});

@Component({
  selector: `test-component`,
  template: `<mime-viewer [manifestUri]="manifestUri" [canvasIndex]="canvasIndex" [config]="config"></mime-viewer>`
})
export class TestHostComponent {
  @ViewChild(ViewerComponent)
  public viewerComponent: any;
  public manifestUri: string;
  public canvasIndex = 0;
  public config = new MimeViewerConfig({
    attributionDialogHideTimeout: -1
  });
}

class IiifManifestServiceStub {
  protected _currentManifest: Subject<Manifest> = new BehaviorSubject<Manifest>(new Manifest());
  protected _errorMessage: Subject<string> = new BehaviorSubject(null);

  get currentManifest(): Observable<Manifest> {
    return this._currentManifest.asObservable();
  }

  get errorMessage(): Observable<string> {
    return this._errorMessage.asObservable();
  }

  load(manifestUri: string): void {
    if (manifestUri) {
      const manifest = new ManifestBuilder(testManifest).build();
      if (manifest && manifest.tileSource) {
        this._currentManifest.next(manifest);
      } else {
        this._errorMessage.next('Manifest is not valid');
      }
    } else {
      this._errorMessage.next('ManifestUri is missing');
    }
  }

  resetCurrentManifest() {
    this._currentManifest.next(null);
  }

  resetErrorMessage() {
    this._errorMessage.next(null);
  }

  destroy(): void { }

}
