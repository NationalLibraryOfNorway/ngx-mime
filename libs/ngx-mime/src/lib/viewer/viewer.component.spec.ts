import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import 'openseadragon';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { ModeService } from '../core/mode-service/mode.service';
import { Manifest } from '../core/models/manifest';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerMode } from '../core/models/viewer-mode';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { MimeResizeServiceStub } from '../test/mime-resize-service-stub';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { IiifContentSearchServiceStub } from './../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from './../test/iiif-manifest-service-stub';
import { TestDynamicComponent } from './test-dynamic.component';
import { TestHostComponent } from './test-host.component';
import { ViewerFooterComponent } from './viewer-footer/viewer-footer.component';
import { ViewerHeaderComponent } from './viewer-header/viewer-header.component';
import { ViewerSpinnerComponent } from './viewer-spinner/viewer-spinner.component';
import { ViewerComponent } from './viewer.component';
import { VIEWER_PROVIDERS } from './viewer.providers';

describe('ViewerComponent', () => {
  const config: MimeViewerConfig = new MimeViewerConfig();
  const osdAnimationTime = 4000;
  let comp: ViewerComponent;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let viewerService: ViewerService;
  let canvasService: CanvasService;
  let modeService: ModeService;
  let mimeResizeServiceStub: MimeResizeServiceStub;
  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;
  let iiifManifestServiceStub: IiifManifestServiceStub;
  let viewerLayoutService: ViewerLayoutService;

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(ViewerComponent, {
      set: {
        providers: [],
      },
    });
    TestBed.overrideProvider(MimeResizeService, {
      useValue: new MimeResizeServiceStub(),
    });
    TestBed.overrideProvider(IiifManifestService, {
      useValue: new IiifManifestServiceStub(),
    });
    TestBed.overrideProvider(IiifContentSearchService, {
      useValue: new IiifContentSearchServiceStub(),
    });
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        TestHostComponent,
        TestDynamicComponent,
        ViewerComponent,
        ViewerSpinnerComponent,
        ViewerHeaderComponent,
        ViewerFooterComponent,
      ],
      providers: [VIEWER_PROVIDERS, MimeViewerIntl],
    }).compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    comp = testHostFixture.componentInstance.viewerComponent;
    testHostComponent = testHostFixture.componentInstance;
    testHostComponent.manifestUri = 'dummyURI1';

    viewerService = TestBed.inject(ViewerService);
    canvasService = TestBed.inject(CanvasService);
    modeService = TestBed.inject(ModeService);
    mimeResizeServiceStub = TestBed.inject<any>(MimeResizeService);
    iiifManifestServiceStub = TestBed.inject<any>(IiifManifestService);
    iiifContentSearchServiceStub = TestBed.inject<any>(
      IiifContentSearchService,
    );
    viewerLayoutService = TestBed.inject(ViewerLayoutService);
  });

  it('should create component', () => {
    testHostFixture.detectChanges();

    expect(comp).toBeDefined();
  });

  // it('should cleanup when manifestUri changes', () => {
  //   jest.spyOn(testHostComponent.viewerComponent, 'cleanup');
  //   testHostComponent.manifestUri = 'dummyURI2';
  //   testHostFixture.detectChanges();
  //
  //   expect(testHostComponent.viewerComponent.cleanup).toHaveBeenCalled();
  // });

  it('should create viewer', () => {
    testHostFixture.detectChanges();

    expect(viewerService.getViewer()).toBeDefined();
  });

  it('should set tabindex', () => {
    testHostComponent.tabIndex = 1;
    testHostFixture.detectChanges();

    const viewerDe = testHostFixture.debugElement.query(
      By.css('.viewer-container'),
    );
    expect(viewerDe.nativeElement.getAttribute('tabindex')).toBe('1');
  });

  it('should initially open in configs intial-mode', () => {
    testHostFixture.detectChanges();

    expect(modeService.mode).toBe(config.initViewerMode);
  });

  it('should change mode to initial-mode when changing manifest', (done) => {
    testHostFixture.detectChanges();

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
            config.initViewerMode.valueOf(),
          );
          done();
        }, osdAnimationTime);
      }
    });
  });

  // it('should close all dialogs when manifestUri changes', () => {
  //   testHostComponent.manifestUri = 'dummyURI2';
  //
  //   jest.spyOn(testHostComponent.viewerComponent, 'cleanup');
  //   testHostFixture.detectChanges();
  //
  //   expect(testHostComponent.viewerComponent.cleanup).toHaveBeenCalled();
  // });

  it('svgOverlay-plugin should be defined', () => {
    testHostFixture.detectChanges();

    expect(viewerService.getViewer().svgOverlay()).toBeDefined();
  });

  it('should create overlays', () => {
    testHostFixture.detectChanges();

    expect(viewerService.getOverlays()).toBeDefined();
  });

  it('should create overlays-array with same size as tilesources-array', () => {
    testHostFixture.detectChanges();

    expect(viewerService.getTilesources().length).toEqual(
      viewerService.getOverlays().length,
    );
  });

  it('should return to home zoom', (done) => {
    testHostFixture.detectChanges();

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

          const overlayWidth = getAttributeAsInt(overlay, 'width');
          const overlayHeight = getAttributeAsInt(overlay, 'height');
          const viewportHeight = Math.round(viewer.viewport.getBounds().height);
          const viewportWidth = Math.round(viewer.viewport.getBounds().width);
          expect(
            overlayHeight === viewportHeight || overlayWidth === viewportWidth,
          ).toEqual(true);

          done();
        }, 600);
      }
    });
  });

  // @TODO need to find a way to test this in jest
  xit('should return to home after resize', (done) => {
    testHostFixture.detectChanges();

    const viewer = viewerService.getViewer();
    const overlay = viewerService.getOverlays()[0];
    const openseadragonDE = testHostFixture.debugElement.query(
      By.css('.openseadragon'),
    );
    const element = openseadragonDE.nativeElement;
    let viewportHeight, viewportWidth;

    viewerService.onOsdReadyChange.subscribe((state: boolean) => {
      if (state) {
        setTimeout(() => {
          const startMinZoomLevel = viewer.viewport.minZoomLevel;
          viewportHeight = Math.round(viewer.viewport.getBounds().height);
          viewportWidth = Math.round(viewer.viewport.getBounds().width);

          const overlayWidth = getAttributeAsInt(overlay, 'width');
          const overlayHeight = getAttributeAsInt(overlay, 'height');

          // Starting out at home
          expect(
            overlayHeight === viewportHeight || overlayWidth === viewportWidth,
          ).toEqual(true);

          // Resize OSD
          element.style.display = 'block';
          element.style.width = '800px';
          element.style.height = '400px';
          element.dispatchEvent(new Event('resize'));
          Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 150,
          });

          window.dispatchEvent(new Event('resize'));

          expect(window.innerHeight).toBe(150);

          setTimeout(() => {
            viewportHeight = Math.round(viewer.viewport.getBounds().height);
            viewportWidth = Math.round(viewer.viewport.getBounds().width);

            expect(
              overlayHeight !== viewportHeight &&
                overlayWidth !== viewportWidth,
            ).toBe(true);

            // Return to home
            mimeResizeServiceStub.triggerResize();

            setTimeout(() => {
              // Confirm that minimum zoom level is updated
              const endMinZoomLevel = viewer.viewport.minZoomLevel;
              expect(endMinZoomLevel).toBeGreaterThan(startMinZoomLevel);

              viewportHeight = Math.round(viewer.viewport.getBounds().height);
              viewportWidth = Math.round(viewer.viewport.getBounds().width);

              // Returned to home
              expect(
                overlayHeight === viewportHeight ||
                  overlayWidth === viewportWidth,
              ).toBe(true);

              done();
            }, 600);
          }, 600);
        }, 600);
      }
    });
  });

  it('should return overlay-index if target is an overlay', () => {
    testHostFixture.detectChanges();
    jest.spyOn(viewerService, 'isCanvasGroupHit').mockReturnValue(true);
    const event = {
      originalEvent: {
        target: viewerService.getOverlays()[0],
      },
    };

    let index = viewerService.getOverlayIndexFromClickEvent(event);
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

  // @TODO Set to pending until we find a way to perform pinch event
  // comp.ngOnInit();
  //
  // pinchOut(viewerService);
  //
  // expect(viewerService.getZoom()).toBeGreaterThan(viewerService.getHomeZoom());
  it.todo('should increase zoom level when pinching out');

  // @TODO Set to pending until we find a way to perform pinch event
  // comp.ngOnInit();
  // const previousZoom = 1;
  // viewerService.zoomTo(previousZoom);
  //
  // pinchIn(viewerService);
  //
  // expect(viewerService.getZoom()).toBeLessThan(previousZoom);
  it.todo('should decrease zoom level when is zoomed in and pinching in');

  // @TODO Set to pending until we find a way to perform pinch event
  // comp.ngOnInit();
  // viewerService.zoomHome();
  //
  // pinchIn(viewerService);
  //
  // expect(viewerService.getZoom()).toEqual(viewerService.getHomeZoom());
  it.todo(
    'should not decrease zoom level when zoom level is home and pinching in',
  );

  it.todo('should return true if canvas group is at minimum zoom level');

  // @TODO Set to pending until we find a way to perform pan event
  // comp.ngOnInit();
  // viewerService.zoomTo(2);
  // const viewer = viewerService.getViewer();
  // const previousCenter = viewer.viewport.getCenter(false);
  //
  // viewer.raiseEvent('pan', {x: 150, y: 150});
  //
  // expect(viewerService.getCenter().x).toBeGreaterThan(previousCenter.x);
  it.todo('should move image inside the view when user is panning');

  // @TODO Set to pending until we find a way to perform swipe event
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
  it.todo('should change canvas group when swipeing to left');

  it('should emit when canvas group mode changes', () => {
    testHostFixture.detectChanges();
    let selectedMode: ViewerMode | undefined;
    comp.viewerModeChanged.subscribe(
      (mode: ViewerMode) => (selectedMode = mode),
    );

    modeService.mode = ViewerMode.DASHBOARD;
    expect(selectedMode).toEqual(ViewerMode.DASHBOARD);
  });

  it('should emit when canvas group number changes', (done) => {
    testHostFixture.detectChanges();
    let currentCanvasIndex: number;
    comp.canvasChanged.subscribe(
      (canvasIndex: number) => (currentCanvasIndex = canvasIndex),
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

  it('should stay on same tile after a ViewerLayout change', (done) => {
    // Need to set canvasIndex on input of component to trigger previous occuring bug
    testHostComponent.canvasIndex = 3;
    testHostComponent.config = new MimeViewerConfig({
      initViewerLayout: ViewerLayout.ONE_PAGE,
    });

    testHostFixture.detectChanges();

    viewerService.onOsdReadyChange.subscribe((state: boolean) => {
      if (state) {
        expect(canvasService.currentCanvasIndex).toEqual(3);

        viewerService.goToCanvas(7, false);
        expect(canvasService.currentCanvasIndex).toEqual(7);

        viewerLayoutService.setLayout(ViewerLayout.TWO_PAGE);

        expect(canvasService.currentCanvasIndex).toEqual(7);
        done();
      }
    });
  });

  it('should emit when q changes', () => {
    testHostFixture.detectChanges();

    comp.qChanged.subscribe((q: string) => expect(q).toEqual('dummyquery'));

    iiifContentSearchServiceStub._currentQ.next('dummyquery');
  });

  it('should emit when manifest changes', () => {
    testHostFixture.detectChanges();

    comp.manifestChanged.subscribe((m: Manifest) =>
      expect(m.id).toEqual('dummyid'),
    );

    iiifManifestServiceStub._currentManifest.next(
      new Manifest({
        id: 'dummyid',
      }),
    );
  });

  it('should open viewer on canvas index if present', (done) => {
    testHostComponent.canvasIndex = 12;
    testHostComponent.config = new MimeViewerConfig({
      initViewerLayout: ViewerLayout.ONE_PAGE,
    });

    testHostFixture.detectChanges();

    viewerService.onOsdReadyChange.subscribe((state: boolean) => {
      if (state) {
        expect(canvasService.currentCanvasIndex).toEqual(12);
        done();
      }
    });
  });

  it('should create dynamic component to start of header', () => {
    testHostComponent.addComponentToStartOfHeader();
    testHostFixture.detectChanges();

    const button = testHostFixture.debugElement.query(
      By.css('#test-dynamic-component'),
    );
    expect(button).not.toBeNull();
  });

  it('should create dynamic component to end of header', () => {
    testHostComponent.addComponentToEndOfHeader();
    testHostFixture.detectChanges();

    const button = testHostFixture.debugElement.query(
      By.css('#test-dynamic-component'),
    );
    expect(button).not.toBeNull();
  });

  it('should create dynamic component to start of footer', () => {
    testHostComponent.addComponentToStartOfFooter();
    testHostFixture.detectChanges();

    const button = testHostFixture.debugElement.query(
      By.css('#test-dynamic-component'),
    );
    expect(button).not.toBeNull();
  });

  it('should create dynamic component to end of footer', () => {
    testHostComponent.addComponentToEndOfFooter();
    testHostFixture.detectChanges();

    const button = testHostFixture.debugElement.query(
      By.css('#test-dynamic-component'),
    );
    expect(button).not.toBeNull();
  });

  // By.css() query does not find SVG elements https://github.com/angular/angular/pull/15372
  xit('should add a mask around the canvas group', (done) => {
    viewerService.onOsdReadyChange.subscribe((state: boolean) => {
      if (state) {
        setTimeout(() => {
          const leftCanvasGroupMask = testHostFixture.debugElement.query(
            By.css('[data-testid="mime-left-page-mask"]'),
          );
          const rightCanvasGroupMask = testHostFixture.debugElement.query(
            By.css('[data-testid="mime-right-page-mask"]'),
          );
          expect(leftCanvasGroupMask).not.toBeNull();
          expect(rightCanvasGroupMask).not.toBeNull();
          done();
        }, 600);
      }
    });
  });

  describe('Fab button for toggling OSD controls', () => {
    it("should not be visible when state is changed to 'hide'", (done) => {
      testHostFixture.detectChanges();

      setTimeout(() => {
        expectOsdToolbarToBeVisible();
        comp.osdToolbarState = 'hide';
        testHostFixture.detectChanges();

        setTimeout(() => {
          expectOsdToolbarToBeHidden();
          done();
        }, 0);
      }, 0);
    });

    it("should be visible when state is changed to 'show'", (done) => {
      testHostComponent.config = new MimeViewerConfig({
        initViewerMode: ViewerMode.DASHBOARD,
      });
      testHostFixture.detectChanges();

      setTimeout(() => {
        expectOsdToolbarToBeHidden();
        comp.osdToolbarState = 'show';
        testHostFixture.detectChanges();

        setTimeout(() => {
          expectOsdToolbarToBeVisible();
          done();
        }, 0);
      }, 0);
    });
  });

  const expectOsdToolbarToBeVisible = () => {
    expect(getOsdToolbar().style.transform).toBe('translate(0px, 0px)');
  };

  const expectOsdToolbarToBeHidden = () => {
    expect(getOsdToolbar().style.transform).toBe('translate(-100%, 0)');
  };

  const getOsdToolbar = () => {
    return testHostFixture.debugElement.query(By.css('mime-osd-toolbar'))
      .nativeElement;
  };

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

  function getAttributeAsInt(
    element: any,
    attribute: string,
    radix = 10,
  ): number {
    return Math.round(parseInt(element.getAttribute(attribute) || '0', radix));
  }
});
