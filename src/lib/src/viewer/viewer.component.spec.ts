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
import { MimeResizeServiceStub } from '../test/mime-resize-service-stub';
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
import { SearchResult } from './../core/models/search-result';

import 'openseadragon';
import '../rxjs-extension';

describe('ViewerComponent', function () {
  const config: MimeViewerConfig = new MimeViewerConfig();
  const osdAnimationTime = 4000;
  let comp: ViewerComponent;
  let fixture: ComponentFixture<ViewerComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let originalTimeout: number;

  let viewerService: ViewerService;
  let pageService: PageService;
  let clickService: ClickService;
  let modeService: ModeService;
  let mimeResizeServiceStub: MimeResizeServiceStub;
  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;

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
        { provide: IiifContentSearchService, useClass: IiifContentSearchServiceStub },
        { provide: MimeResizeService, useClass: MimeResizeServiceStub },
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
    mimeResizeServiceStub = TestBed.get(MimeResizeService);
    iiifContentSearchServiceStub = TestBed.get(IiifContentSearchService);

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should cleanup when manifestUri changes', () => {
    spyOn(testHostComponent.viewerComponent, 'cleanup').and.callThrough();
    testHostComponent.manifestUri = 'dummyURI2';
    testHostFixture.detectChanges();

    expect(testHostComponent.viewerComponent.cleanup).toHaveBeenCalled();
  });

  it('should create viewer', () => {
    expect(viewerService.getViewer()).toBeDefined();
  });

  it('should initially open in configs intial-mode', () => {
    expect(modeService.mode).toBe(config.initViewerMode);
  });

  it('should change mode to initial-mode when changing manifest', (done) => {
    viewerService.onOsdReadyChange.subscribe((state: boolean) => {
      if (state) {
        setTimeout(() => {
          if (config.initViewerMode === ViewerMode.PAGE) {
            modeService.mode = ViewerMode.DASHBOARD;
            expect(modeService.mode).toBe(ViewerMode.DASHBOARD);
          } else {
            modeService.mode = ViewerMode.PAGE;
            expect(modeService.mode).toBe(ViewerMode.PAGE);
          }
          testHostComponent.manifestUri = 'dummyURI3';
          testHostFixture.detectChanges();
          expect(modeService.mode).toBe(config.initViewerMode);
          done();
        }, osdAnimationTime);
      }
    });
  });

  it('should close all dialogs when manifestUri changes', () => {
    testHostComponent.manifestUri = 'dummyURI2';

    spyOn(testHostComponent.viewerComponent, 'cleanup').and.callThrough();
    testHostFixture.detectChanges();

    expect(testHostComponent.viewerComponent.cleanup).toHaveBeenCalled();
  });

  it('svgOverlay-plugin should be defined', () => {
    expect(viewerService.getViewer().svgOverlay()).toBeDefined();
  });

  it('should create overlays', () => {
    expect(viewerService.getOverlays()).toBeDefined();
  });

  it('should create overlays-array with same size as tilesources-array', () => {
    expect(viewerService.getTilesources().length).toEqual(viewerService.getOverlays().length);
  });

  it('should return an OpenSeadragon.Rect with properties equal to overlay', () => {
    let overlay = viewerService.getOverlays()[0];
    let rect = viewerService.createRectangle(overlay);

    expect(rect.x).toEqual(overlay.x.baseVal.value);
    expect(rect.y).toEqual(overlay.y.baseVal.value);
    expect(rect.width).toEqual(overlay.width.baseVal.value);
    expect(rect.height).toEqual(overlay.height.baseVal.value);
  });

  it('should return to home zoom', (done: any) => {
    viewerService.onOsdReadyChange.subscribe((state: boolean) => {
      if (state) {
        setTimeout(() => {
          const overlay = viewerService.getOverlays()[0];
          const viewer = viewerService.getViewer();

          // Make sure zooming actually works, or else test will always be true
          const startZoom = viewer.viewport.getZoom(false);
          viewerService.zoomBy(1.5);
          const newZoom = viewer.viewport.getZoom(false);
          expect(newZoom).toBeGreaterThan(startZoom);

          // Return to home
          viewerService.home();

          const viewportHeight = Math.round(viewer.viewport.getBounds().height);
          const viewportWidth = Math.round(viewer.viewport.getBounds().width);
          const overlayHeight = Math.round(overlay.height.baseVal.value);
          const overlayWidth = Math.round(overlay.width.baseVal.value);
          expect((overlayHeight === viewportHeight) || (overlayWidth === viewportWidth)).toEqual(true);

          done();
        }, 600);
      }
    });
  });

  it('should return to home after resize', (done: any) => {
    const viewer = viewerService.getViewer();
    const overlay = viewerService.getOverlays()[0];
    const openseadragonDE = testHostFixture.debugElement.query(By.css('#openseadragon'));
    const element = openseadragonDE.nativeElement;
    let viewportHeight, viewportWidth, overlayHeight, overlayWidth;

    viewerService.onOsdReadyChange.subscribe((state: boolean) => {
      if (state) {
        setTimeout(() => {
          const startMinZoomLevel = viewer.viewport.minZoomLevel;
          viewportHeight = Math.round(viewer.viewport.getBounds().height);
          viewportWidth = Math.round(viewer.viewport.getBounds().width);
          overlayHeight = Math.round(overlay.height.baseVal.value);
          overlayWidth = Math.round(overlay.width.baseVal.value);

          // Starting out at home
          expect((overlayHeight === viewportHeight) || (overlayWidth === viewportWidth)).toEqual(true);

          // Resize OSD
          element.style.display = 'block';
          element.style.width = '800px';
          element.style.height = '400px';

          setTimeout(() => {
            viewportHeight = Math.round(viewer.viewport.getBounds().height);
            viewportWidth = Math.round(viewer.viewport.getBounds().width);
            overlayHeight = Math.round(overlay.height.baseVal.value);
            overlayWidth = Math.round(overlay.width.baseVal.value);

            expect((overlayHeight !== viewportHeight) && (overlayWidth !== viewportWidth)).toEqual(true);

            // Return to home
            mimeResizeServiceStub.triggerResize();
            setTimeout(() => {

              // Confirm that minimum zoom level is updated
              const endMinZoomLevel = viewer.viewport.minZoomLevel;
              expect(endMinZoomLevel).toBeGreaterThan(startMinZoomLevel);

              viewportHeight = Math.round(viewer.viewport.getBounds().height);
              viewportWidth = Math.round(viewer.viewport.getBounds().width);
              overlayHeight = Math.round(overlay.height.baseVal.value);
              overlayWidth = Math.round(overlay.width.baseVal.value);

              // Returned to home
              expect((overlayHeight === viewportHeight) || (overlayWidth === viewportWidth)).toEqual(true);

              done();
             }, 600);

          }, 600);

        }, 600);
      }
    });
  });

  it('should return overlay-index if target is an overlay', () => {
    let overlay, index;
    overlay = viewerService.getOverlays()[0];
    index = viewerService.getOverlayIndexFromClickEvent(overlay);
    expect(index).toBe(0);

    overlay = viewerService.getOverlays()[1];
    index = viewerService.getOverlayIndexFromClickEvent(overlay);
    expect(index).toBe(1);

    overlay = viewerService.getOverlays()[12];
    index = viewerService.getOverlayIndexFromClickEvent(overlay);
    expect(index).toBe(12);

    // Should return -1 for nonsense overlay
    overlay = viewerService.getOverlays()[12000];
    index = viewerService.getOverlayIndexFromClickEvent(overlay);
    expect(index).toBe(-1);

  });

  it('should increase zoom level when pinching out', () => {
    // comp.ngOnInit();
    //
    // pinchOut(viewerService);
    //
    // expect(viewerService.getZoom()).toBeGreaterThan(viewerService.getHomeZoom());
    pending('Set to pending until we find a way to perform pinch event');
  });

  it('should decrease zoom level when is zoomed in and pinching in', () => {
    // comp.ngOnInit();
    // const previousZoom = 1;
    // viewerService.zoomTo(previousZoom);
    //
    // pinchIn(viewerService);
    //
    // expect(viewerService.getZoom()).toBeLessThan(previousZoom);
    pending('Set to pending until we find a way to perform pinch event');
  });

  it('should not decrease zoom level when zoom level is home and pinching in', () => {
    // comp.ngOnInit();
    // viewerService.zoomHome();
    //
    // pinchIn(viewerService);
    //
    // expect(viewerService.getZoom()).toEqual(viewerService.getHomeZoom());
    pending('Set to pending until we find a way to perform pinch event');
  });

  it('#pageIsAtMinZoom should return true if page is at minimum zoom level', () => {
    pending('');
  });

  it('should move image inside the view when user is panning', () => {
    // comp.ngOnInit();
    // viewerService.zoomTo(2);
    // const viewer = viewerService.getViewer();
    // const previousCenter = viewer.viewport.getCenter(false);
    //
    // viewer.raiseEvent('pan', {x: 150, y: 150});
    //
    // expect(viewerService.getCenter().x).toBeGreaterThan(previousCenter.x);
    pending('Set to pending until we find a way to perform pan event');
  });

  it('should change page when swipeing to left', () => {
    // modeService.mode = ViewerMode.DASHBOARD;
    // tick();
    // const viewer = viewerService.getViewer();
    // viewer.raiseEvent('canvas-press', {position: {
    //   x: 1450, y: 150}
    // });
    // tick(1);
    // viewer.raiseEvent('canvas-drag-end', {position: {
    //   x: 150, y: 150}
    // });
    // let pageNumber = 0;
    // viewerService.onPageChange.subscribe(p => {
    //   pageNumber = p;
    // });
    // tick(100);
    // expect(pageNumber).toBe(10);
    pending('Set to pending until we find a way to perform swipe event');
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
          expect(currentPageNumber).toEqual(1);
          done();
        }, osdAnimationTime);
      }
    });
  });

  it('should emit when q changes', () => {
    comp.onQChange.subscribe((q: string) => expect(q).toEqual('dummyquery'));

    iiifContentSearchServiceStub._currentQ.next('dummyquery');
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
          expect(currentPageNumber).toEqual(2);
          done();
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

class IiifContentSearchServiceStub {
  public _currentSearchResult: Subject<SearchResult> = new BehaviorSubject<SearchResult>(new SearchResult({}));
  public _searching: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public _currentQ: Subject<string> = new BehaviorSubject<string>(null);

  get onQChange(): Observable<string> {
    return this._currentQ.asObservable().distinctUntilChanged();
  }

  get onChange(): Observable<SearchResult> {
    return this._currentSearchResult.asObservable();
  }

  get isSearching(): Observable<boolean> {
    return this._searching.asObservable();
  }

}
