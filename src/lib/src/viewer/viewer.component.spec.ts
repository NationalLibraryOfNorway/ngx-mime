import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Component, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { async, ComponentFixture, inject, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

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
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerHeaderComponent } from './viewer-header/viewer-header.component';
import { ViewerFooterComponent } from './viewer-footer/viewer-footer.component';
import { SearchResult } from './../core/models/search-result';
import { IiifManifestServiceStub } from './../test/iiif-manifest-service-stub';
import { IiifContentSearchServiceStub } from './../test/iiif-content-search-service-stub';

import 'openseadragon';
import '../rxjs-extension';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';

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
  let iiifManifestServiceStub: IiifManifestServiceStub;
  let viewerLayoutService: ViewerLayoutService;

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
        TestHostComponent,
        ViewerHeaderComponent,
        ViewerFooterComponent,
        TestDynamicComponent
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
        FullscreenService,
        AccessKeysService,
        ViewerLayoutService,
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ TestDynamicComponent ],
      }
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
    iiifManifestServiceStub = TestBed.get(IiifManifestService);
    viewerLayoutService = TestBed.get(ViewerLayoutService);

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

  it('should stay on same tile after a ViewerLayout change', (done: any) => {
    // Need to set canvasIndex on input of component to trigger previous occuring bug
    viewerLayoutService.setLayout(ViewerLayout.ONE_PAGE);
    testHostComponent.canvasIndex = 3;
    testHostFixture.detectChanges();
    expect(pageService.currentTile).toEqual(3);

    viewerService.goToTile(7, false);
    expect(pageService.currentTile).toEqual(7);

    viewerLayoutService.setLayout(ViewerLayout.TWO_PAGE);

    setTimeout(() => {
      expect(pageService.currentTile).toEqual(7);
      done();
    }, osdAnimationTime);

  });

  it('should emit when q changes', () => {
    comp.onQChange.subscribe((q: string) => expect(q).toEqual('dummyquery'));

    iiifContentSearchServiceStub._currentQ.next('dummyquery');
  });

  it('should emit when manifest changes', () => {
    comp.onManifestChange.subscribe((m: Manifest) => expect(m.id).toEqual('dummyid'));

    iiifManifestServiceStub._currentManifest.next(new Manifest({
      id: 'dummyid'
    }));
  });

  it('should open viewer on canvas index if present', (done) => {
    let currentPageNumber: number;
    testHostComponent.canvasIndex = 12;
    comp.onPageChange.subscribe((pageNumber: number) => {
      currentPageNumber = pageNumber;
    });

    testHostFixture.detectChanges();

    viewerService.onOsdReadyChange.subscribe((state: boolean) => {
      if (state) {
        setTimeout(() => {
          expect(currentPageNumber).toEqual(12);
          done();
        }, osdAnimationTime);
      }
    });
  });

  it('should create dynamic component to start of header', () => {
    testHostComponent.addComponentToStartOfHeader();

    const button = testHostFixture.debugElement.query(By.css('#test-dynamic-component'));
    expect(button).not.toBeNull();
  });

  it('should create dynamic component to end of header', () => {
    testHostComponent.addComponentToEndOfHeader();

    const button = testHostFixture.debugElement.query(By.css('#test-dynamic-component'));
    expect(button).not.toBeNull();
  });

  it('should create dynamic component to start of footer', () => {
    testHostComponent.addComponentToStartOfFooter();

    const button = testHostFixture.debugElement.query(By.css('#test-dynamic-component'));
    expect(button).not.toBeNull();
  });

  it('should create dynamic component to end of footer', () => {
    testHostComponent.addComponentToEndOfFooter();

    const button = testHostFixture.debugElement.query(By.css('#test-dynamic-component'));
    expect(button).not.toBeNull();
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
  template: `<div id="test-dynamic-component"></div>`
})
export class TestDynamicComponent { }

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

  constructor(private r: ComponentFactoryResolver) { }

  addComponentToStartOfHeader() {
    const factory = this.r.resolveComponentFactory(TestDynamicComponent);
    this.viewerComponent.mimeHeaderBeforeRef.createComponent(factory);
  }

  addComponentToEndOfHeader() {
    const factory = this.r.resolveComponentFactory(TestDynamicComponent);
    this.viewerComponent.mimeHeaderAfterRef.createComponent(factory);
  }

  addComponentToStartOfFooter() {
    const factory = this.r.resolveComponentFactory(TestDynamicComponent);
    this.viewerComponent.mimeFooterBeforeRef.createComponent(factory);
  }

  addComponentToEndOfFooter() {
    const factory = this.r.resolveComponentFactory(TestDynamicComponent);
    this.viewerComponent.mimeFooterAfterRef.createComponent(factory);
  }

}
