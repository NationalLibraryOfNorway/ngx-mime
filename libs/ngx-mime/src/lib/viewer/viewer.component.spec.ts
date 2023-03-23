import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import 'openseadragon';
import { injectedStub } from '../../testing/injected-stub';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { AltoService } from '../core/alto-service/alto.service';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { ClickService } from '../core/click-service/click.service';
import { FullscreenService } from '../core/fullscreen-service/fullscreen.service';
import { HighlightService } from '../core/highlight-service/highlight.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { ModeService } from '../core/mode-service/mode.service';
import { Manifest } from '../core/models/manifest';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerMode } from '../core/models/viewer-mode';
import { ContentSearchNavigationService } from '../core/navigation/content-search-navigation-service/content-search-navigation.service';
import { StyleService } from '../core/style-service/style.service';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { SharedModule } from '../shared/shared.module';
import { AltoServiceStub } from '../test/alto-service-stub';
import { MimeResizeServiceStub } from '../test/mime-resize-service-stub';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { IiifContentSearchServiceStub } from './../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from './../test/iiif-manifest-service-stub';
import { TestDynamicComponent } from './test-dynamic.component';
import { TestHostComponent } from './test-host.component';
import { ViewerFooterComponent } from './viewer-footer/viewer-footer.component';
import { ViewerHeaderComponent } from './viewer-header/viewer-header.component';
import { ViewerComponent } from './viewer.component';

describe('ViewerComponent', function () {
  const matSnackBarSpy = jasmine.createSpy('MatSnackBar');
  const config: MimeViewerConfig = new MimeViewerConfig();
  const osdAnimationTime = 4000;
  let comp: ViewerComponent;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let originalTimeout: number;

  let viewerService: ViewerService;
  let canvasService: CanvasService;
  let modeService: ModeService;
  let mimeResizeServiceStub: MimeResizeServiceStub;
  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;
  let iiifManifestServiceStub: IiifManifestServiceStub;
  let viewerLayoutService: ViewerLayoutService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, NoopAnimationsModule, SharedModule],
      declarations: [
        ViewerComponent,
        TestHostComponent,
        ViewerHeaderComponent,
        ViewerFooterComponent,
        TestDynamicComponent,
      ],
      providers: [
        { provide: MatSnackBar, useClass: matSnackBarSpy },
        ViewerService,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        {
          provide: IiifContentSearchService,
          useClass: IiifContentSearchServiceStub,
        },
        { provide: MimeResizeService, useClass: MimeResizeServiceStub },
        { provide: AltoService, useClass: AltoServiceStub },
        MimeViewerIntl,
        ClickService,
        CanvasService,
        ModeService,
        FullscreenService,
        AccessKeysService,
        ViewerLayoutService,
        ContentSearchNavigationService,
        StyleService,
        HighlightService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    comp = testHostFixture.componentInstance.viewerComponent;
    testHostComponent = testHostFixture.componentInstance;
    testHostComponent.manifestUri = 'dummyURI1';
    testHostFixture.detectChanges();

    viewerService = TestBed.inject(ViewerService);
    canvasService = TestBed.inject(CanvasService);
    modeService = TestBed.inject(ModeService);
    mimeResizeServiceStub = injectedStub(MimeResizeService);
    iiifContentSearchServiceStub = injectedStub(IiifContentSearchService);
    iiifManifestServiceStub = injectedStub(IiifManifestService);
    viewerLayoutService = TestBed.inject(ViewerLayoutService);

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    viewerService.destroy();
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

  it('should set tabindex', () => {
    testHostComponent.tabIndex = 1;
    testHostFixture.detectChanges();

    const viewerDe = testHostFixture.debugElement.query(
      By.css('.viewer-container')
    );
    expect(viewerDe.nativeElement.getAttribute('tabindex')).toBe('1');
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
          expect(modeService.mode.valueOf()).toBe(
            config.initViewerMode.valueOf()
          );
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
    expect(viewerService.getTilesources().length).toEqual(
      viewerService.getOverlays().length
    );
  });

  it('should return to home zoom', (done: any) => {
    viewerService.onOsdReadyChange.subscribe((state: boolean) => {
      if (state) {
        setTimeout(() => {
          const overlay = viewerService.getOverlays()[0];
          const viewer = viewerService.getViewer();

          // Make sure zooming actually works, or else test will always be true
          const startZoom = viewer.viewport.getZoom(false);
          viewerService.zoomIn();
          const newZoom = viewer.viewport.getZoom(false);
          expect(newZoom).toBeGreaterThan(startZoom);

          // Return to home
          viewerService.home();

          const viewportHeight = Math.round(viewer.viewport.getBounds().height);
          const viewportWidth = Math.round(viewer.viewport.getBounds().width);
          const overlayHeight = Math.round(overlay.height.baseVal.value);
          const overlayWidth = Math.round(overlay.width.baseVal.value);
          expect(
            overlayHeight === viewportHeight || overlayWidth === viewportWidth
          ).toEqual(true);

          done();
        }, 600);
      }
    });
  });

  it('should return to home after resize', (done: any) => {
    const viewer = viewerService.getViewer();
    const overlay = viewerService.getOverlays()[0];
    const openseadragonDE = testHostFixture.debugElement.query(
      By.css('.openseadragon')
    );
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
          expect(
            overlayHeight === viewportHeight || overlayWidth === viewportWidth
          ).toEqual(true);

          // Resize OSD
          element.style.display = 'block';
          element.style.width = '800px';
          element.style.height = '400px';

          setTimeout(() => {
            viewportHeight = Math.round(viewer.viewport.getBounds().height);
            viewportWidth = Math.round(viewer.viewport.getBounds().width);
            overlayHeight = Math.round(overlay.height.baseVal.value);
            overlayWidth = Math.round(overlay.width.baseVal.value);

            expect(
              overlayHeight !== viewportHeight && overlayWidth !== viewportWidth
            ).toEqual(true);

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
              expect(
                overlayHeight === viewportHeight ||
                  overlayWidth === viewportWidth
              ).toEqual(true);

              done();
            }, 600);
          }, 600);
        }, 600);
      }
    });
  });

  it('should return overlay-index if target is an overlay', () => {
    let index;
    const event = {
      originalEvent: {
        target: viewerService.getOverlays()[0],
      },
    };

    index = viewerService.getOverlayIndexFromClickEvent(event);
    expect(index).toBe(0);

    event.originalEvent.target = viewerService.getOverlays()[1];
    index = viewerService.getOverlayIndexFromClickEvent(event);
    expect(index).toBe(1);

    event.originalEvent.target = viewerService.getOverlays()[12];
    index = viewerService.getOverlayIndexFromClickEvent(event);
    expect(index).toBe(12);

    // Should return -1 for nonsense overlay
    event.originalEvent.target = viewerService.getOverlays()[12000];
    index = viewerService.getOverlayIndexFromClickEvent(event);
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

  it('should return true if canvas group is at minimum zoom level', () => {
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

  it('should change canvas group when swipeing to left', () => {
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

  it('should emit when canvas group mode changes', () => {
    let selectedMode: ViewerMode | undefined;
    comp.viewerModeChanged.subscribe(
      (mode: ViewerMode) => (selectedMode = mode)
    );

    modeService.mode = ViewerMode.DASHBOARD;
    expect(selectedMode).toEqual(ViewerMode.DASHBOARD);
  });

  it('should emit when canvas group number changes', (done) => {
    let currentCanvasIndex: number;
    comp.canvasChanged.subscribe(
      (canvasIndex: number) => (currentCanvasIndex = canvasIndex)
    );
    viewerService.onOsdReadyChange.subscribe((state: boolean) => {
      if (state) {
        setTimeout(() => {
          viewerService.goToCanvasGroup(1, false);
        }, 100);

        setTimeout(() => {
          expect(currentCanvasIndex).toEqual(1);
          done();
        }, osdAnimationTime);
      }
    });
  });

  it('should stay on same tile after a ViewerLayout change', (done: DoneFn) => {
    // Need to set canvasIndex on input of component to trigger previous occuring bug
    viewerLayoutService.setLayout(ViewerLayout.ONE_PAGE);
    testHostComponent.canvasIndex = 3;
    testHostFixture.detectChanges();
    expect(canvasService.currentCanvasIndex).toEqual(3);

    viewerService.goToCanvas(7, false);
    expect(canvasService.currentCanvasIndex).toEqual(7);

    viewerLayoutService.setLayout(ViewerLayout.TWO_PAGE);

    setTimeout(() => {
      expect(canvasService.currentCanvasIndex).toEqual(7);
      done();
    }, osdAnimationTime);
  });

  it('should emit when q changes', () => {
    comp.qChanged.subscribe((q: string) => expect(q).toEqual('dummyquery'));

    iiifContentSearchServiceStub._currentQ.next('dummyquery');
  });

  it('should emit when manifest changes', () => {
    comp.manifestChanged.subscribe((m: Manifest) =>
      expect(m.id).toEqual('dummyid')
    );

    iiifManifestServiceStub._currentManifest.next(
      new Manifest({
        id: 'dummyid',
      })
    );
  });

  it('should open viewer on canvas index if present', (done) => {
    let currentCanvasIndex: number;
    comp.canvasChanged.subscribe((canvasIndex: number) => {
      currentCanvasIndex = canvasIndex;
    });

    testHostComponent.canvasIndex = 12;
    testHostFixture.detectChanges();
    setTimeout(() => {
      expect(currentCanvasIndex).toBe(12);
      done();
    }, osdAnimationTime);
  });

  it('should create dynamic component to start of header', () => {
    testHostComponent.addComponentToStartOfHeader();

    const button = testHostFixture.debugElement.query(
      By.css('#test-dynamic-component')
    );
    expect(button).not.toBeNull();
  });

  it('should create dynamic component to end of header', () => {
    testHostComponent.addComponentToEndOfHeader();

    const button = testHostFixture.debugElement.query(
      By.css('#test-dynamic-component')
    );
    expect(button).not.toBeNull();
  });

  it('should create dynamic component to start of footer', () => {
    testHostComponent.addComponentToStartOfFooter();

    const button = testHostFixture.debugElement.query(
      By.css('#test-dynamic-component')
    );
    expect(button).not.toBeNull();
  });

  it('should create dynamic component to end of footer', () => {
    testHostComponent.addComponentToEndOfFooter();

    const button = testHostFixture.debugElement.query(
      By.css('#test-dynamic-component')
    );
    expect(button).not.toBeNull();
  });

  // By.css() query does not find SVG elements https://github.com/angular/angular/pull/15372
  xit('should add a mask around the canvas group', (done: any) => {
    viewerService.onOsdReadyChange.subscribe((state: boolean) => {
      if (state) {
        setTimeout(() => {
          const leftCanvasGroupMask = testHostFixture.debugElement.query(
            By.css('#mime-left-page-mask')
          );
          const rightCanvasGroupMask = testHostFixture.debugElement.query(
            By.css('#mime-right-page-mask')
          );
          expect(leftCanvasGroupMask).not.toBeNull();
          expect(rightCanvasGroupMask).not.toBeNull();
          done();
        }, 600);
      }
    });
  });

  function pinchOut() {
    viewerService
      .getViewer()
      .raiseEvent('canvas-pinch', { distance: 40, lastDistance: 40 });
    viewerService
      .getViewer()
      .raiseEvent('canvas-pinch', { distance: 50, lastDistance: 40 });
    viewerService
      .getViewer()
      .raiseEvent('canvas-pinch', { distance: 60, lastDistance: 50 });
    viewerService
      .getViewer()
      .raiseEvent('canvas-pinch', { distance: 70, lastDistance: 60 });
    viewerService
      .getViewer()
      .raiseEvent('canvas-pinch', { distance: 80, lastDistance: 70 });
    viewerService
      .getViewer()
      .raiseEvent('canvas-pinch', { distance: 90, lastDistance: 80 });
  }

  function pinchIn() {
    viewerService
      .getViewer()
      .raiseEvent('canvas-pinch', { distance: 90, lastDistance: 90 });
    viewerService
      .getViewer()
      .raiseEvent('canvas-pinch', { distance: 80, lastDistance: 90 });
    viewerService
      .getViewer()
      .raiseEvent('canvas-pinch', { distance: 70, lastDistance: 80 });
    viewerService
      .getViewer()
      .raiseEvent('canvas-pinch', { distance: 60, lastDistance: 70 });
    viewerService
      .getViewer()
      .raiseEvent('canvas-pinch', { distance: 50, lastDistance: 60 });
    viewerService
      .getViewer()
      .raiseEvent('canvas-pinch', { distance: 40, lastDistance: 50 });
  }
});
