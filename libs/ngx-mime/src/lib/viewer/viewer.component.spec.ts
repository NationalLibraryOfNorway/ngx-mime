import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAutoSpy, Spy } from 'jest-auto-spies';
import 'openseadragon';
import { filter, firstValueFrom } from 'rxjs';
import { AttributionDialogService } from '../attribution-dialog/attribution-dialog.service';
import { ContentSearchDialogService } from '../content-search-dialog/content-search-dialog.service';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { AltoService } from '../core/alto-service/alto.service';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { IiifContentSearchService } from '../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { ModeService } from '../core/mode-service/mode.service';
import { ViewerMode } from '../core/models';
import { Manifest } from '../core/models/manifest';
import { SearchResult } from '../core/models/search-result';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { HelpDialogService } from '../help-dialog/help-dialog.service';
import { InformationDialogService } from '../information-dialog/information-dialog.service';
import { IiifContentSearchServiceStub } from '../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from '../test/iiif-manifest-service-stub';
import { MimeResizeServiceStub } from '../test/mime-resize-service-stub';
import { ViewDialogService } from '../view-dialog/view-dialog.service';
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
  let injector: Injector;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let viewerService: ViewerService;
  let canvasService: CanvasService;
  let modeService: ModeService;
  let mimeResizeServiceStub: MimeResizeServiceStub;
  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;
  let iiifManifestServiceStub: IiifManifestServiceStub;
  let viewerLayoutService: ViewerLayoutService;
  let accessKeysService: AccessKeysService;
  let attributionDialogService: AttributionDialogService;
  let viewDialogService: ViewDialogService;
  let informationDialogService: Spy<InformationDialogService>;
  let contentSearchDialogService: Spy<ContentSearchDialogService>;
  let helpDialogService: HelpDialogService;
  let resizeService: MimeResizeService;
  let altoService: AltoService;

  beforeEach(async () => {
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
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        TestHostComponent,
        TestDynamicComponent,
        ViewerComponent,
        ViewerSpinnerComponent,
        ViewerHeaderComponent,
        ViewerFooterComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        VIEWER_PROVIDERS,
        provideAutoSpy(AccessKeysService),
        provideAutoSpy(AttributionDialogService),
        provideAutoSpy(ViewDialogService),
        provideAutoSpy(InformationDialogService),
        provideAutoSpy(ContentSearchDialogService),
        provideAutoSpy(HelpDialogService),
      ],
    }).compileComponents();

    testHostFixture = TestBed.createComponent(TestHostComponent);
    comp = testHostFixture.componentInstance.viewerComponent;
    testHostComponent = testHostFixture.componentInstance;
    testHostComponent.manifestUri = 'dummyURI1';

    injector = TestBed.inject(Injector);
    viewerService = TestBed.inject(ViewerService);
    canvasService = TestBed.inject(CanvasService);
    modeService = TestBed.inject(ModeService);
    mimeResizeServiceStub = TestBed.inject<any>(MimeResizeService);
    iiifManifestServiceStub = TestBed.inject<any>(IiifManifestService);
    iiifContentSearchServiceStub = TestBed.inject<any>(
      IiifContentSearchService,
    );
    viewerLayoutService = TestBed.inject(ViewerLayoutService);
    accessKeysService = TestBed.inject(AccessKeysService);
    attributionDialogService = TestBed.inject(AttributionDialogService);
    viewDialogService = TestBed.inject(ViewDialogService);
    informationDialogService = TestBed.inject(
      InformationDialogService,
    ) as Spy<InformationDialogService>;
    contentSearchDialogService = TestBed.inject(
      ContentSearchDialogService,
    ) as Spy<ContentSearchDialogService>;
    helpDialogService = TestBed.inject(HelpDialogService);
    resizeService = TestBed.inject(MimeResizeService);
    altoService = TestBed.inject(AltoService);
  });

  it('should create component', () => {
    testHostFixture.detectChanges();

    expect(comp).toBeDefined();
  });

  it('should emit the latest recognized-text mode', async () => {
    const recognizedTextContentModeChanged = jest.fn();
    comp.recognizedTextContentModeChanged.subscribe(
      recognizedTextContentModeChanged,
    );
    testHostFixture.detectChanges();

    altoService.showRecognizedTextContentOnly();
    await testHostFixture.whenStable();

    expect(recognizedTextContentModeChanged).toHaveBeenLastCalledWith(
      comp.recognizedTextMode.ONLY,
    );
  });

  it('should cleanup when manifestUri changes', () => {
    jest.spyOn(viewerService, 'destroy').mockImplementation();
    jest.spyOn(resizeService, 'destroy').mockImplementation();
    testHostComponent.manifestUri = 'dummyURI2';

    testHostFixture.detectChanges();

    expect(accessKeysService.destroy).toHaveBeenCalled();
    expect(attributionDialogService.destroy).toHaveBeenCalled();
    expect(viewDialogService.destroy).toHaveBeenCalled();
    expect(informationDialogService.destroy).toHaveBeenCalled();
    expect(contentSearchDialogService.destroy).toHaveBeenCalled();
    expect(helpDialogService.destroy).toHaveBeenCalled();
    expect(viewerService.destroy).toHaveBeenCalled();
    expect(resizeService.destroy).toHaveBeenCalled();
    expect(comp.errorMessage()).toBeNull();
  });

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

    expect(modeService.mode()).toBe(config.initViewerMode);
  });

  it('should change mode to initial-mode when changing manifest', async () => {
    testHostFixture.detectChanges();
    await testHostFixture.whenStable();

    if (config.initViewerMode === ViewerMode.PAGE) {
      modeService.setMode(ViewerMode.DASHBOARD);
      expect(modeService.mode()).toBe(ViewerMode.DASHBOARD);
    } else {
      modeService.setMode(ViewerMode.PAGE);
      expect(modeService.mode()).toBe(ViewerMode.PAGE);
    }

    testHostComponent.manifestUri = 'dummyURI3';
    testHostFixture.changeDetectorRef.markForCheck();
    await testHostFixture.whenStable();

    expect(modeService.mode()).toBe(config.initViewerMode);
  });

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

  it('should return to home zoom', async () => {
    testHostFixture.detectChanges();
    await waitForViewerReady();
    await new Promise((resolve) => setTimeout(resolve, 600));

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
  });

  // @TODO need to find a way to test this in jest
  xit('should return to home after resize', async () => {
    testHostFixture.detectChanges();

    const viewer = viewerService.getViewer();
    const overlay = viewerService.getOverlays()[0];
    const openseadragonDE = testHostFixture.debugElement.query(
      By.css('.openseadragon'),
    );
    const element = openseadragonDE.nativeElement;
    let viewportHeight, viewportWidth;
    await waitForViewerReady();
    await new Promise((resolve) => setTimeout(resolve, 600));

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
    await new Promise((resolve) => setTimeout(resolve, 600));

    viewportHeight = Math.round(viewer.viewport.getBounds().height);
    viewportWidth = Math.round(viewer.viewport.getBounds().width);

    expect(
      overlayHeight !== viewportHeight && overlayWidth !== viewportWidth,
    ).toBe(true);

    // Return to home
    mimeResizeServiceStub.triggerResize();
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Confirm that minimum zoom level is updated
    const endMinZoomLevel = viewer.viewport.minZoomLevel;
    expect(endMinZoomLevel).toBeGreaterThan(startMinZoomLevel);

    viewportHeight = Math.round(viewer.viewport.getBounds().height);
    viewportWidth = Math.round(viewer.viewport.getBounds().width);

    // Returned to home
    expect(
      overlayHeight === viewportHeight || overlayWidth === viewportWidth,
    ).toBe(true);
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

  it('should emit when canvas group mode changes', async () => {
    testHostFixture.detectChanges();
    let selectedMode: ViewerMode | undefined;
    comp.viewerModeChanged.subscribe(
      (mode: ViewerMode) => (selectedMode = mode),
    );

    modeService.setMode(ViewerMode.DASHBOARD);
    await testHostFixture.whenStable();

    expect(selectedMode).toEqual(ViewerMode.DASHBOARD);
  });

  it('should not restore a saved dialog when another dialog is already open', async () => {
    testHostFixture.detectChanges();
    await testHostFixture.whenStable();
    await setViewerMode(ViewerMode.DASHBOARD);
    contentSearchDialogService.isOpen.mockReturnValue(true);

    await setViewerMode(ViewerMode.PAGE);
    informationDialogService.isOpen.mockReturnValue(true);
    contentSearchDialogService.isOpen.mockReturnValue(false);

    await setViewerMode(ViewerMode.DASHBOARD);

    expect(contentSearchDialogService.open).not.toHaveBeenCalled();
  });

  it('should emit when canvas group number changes', async () => {
    const canvasChanged = jest.fn();
    testHostFixture.detectChanges();
    comp.canvasChanged.subscribe(canvasChanged);
    await waitForViewerReady();
    await new Promise((resolve) => setTimeout(resolve, 100));

    viewerService.goToCanvasGroup(1, false);
    await new Promise((resolve) => setTimeout(resolve, osdAnimationTime));

    expect(canvasChanged).toHaveBeenLastCalledWith(1);
  });

  it('should stay on same tile after a ViewerLayout change', async () => {
    // Need to set canvasIndex on input of component to trigger previous occuring bug
    testHostComponent.canvasIndex = 3;
    testHostComponent.config = new MimeViewerConfig({
      initViewerLayout: ViewerLayout.ONE_PAGE,
    });

    testHostFixture.detectChanges();
    await waitForViewerReady();

    expect(canvasService.currentCanvasIndex).toEqual(3);

    viewerService.goToCanvas(7, false);
    expect(canvasService.currentCanvasIndex).toEqual(7);

    viewerLayoutService.setLayout(ViewerLayout.TWO_PAGE);

    expect(canvasService.currentCanvasIndex).toEqual(7);
  });

  it('should emit when q changes', () => {
    testHostFixture.detectChanges();

    comp.qChanged.subscribe((q: string) => expect(q).toEqual('dummyquery'));

    iiifContentSearchServiceStub.setQuery('dummyquery');
  });

  it('should search when q input changes', async () => {
    testHostFixture.detectChanges();
    iiifManifestServiceStub.setManifest(new Manifest({ id: 'dummyid' }));
    await testHostFixture.whenStable();
    const search = jest.spyOn(iiifContentSearchServiceStub, 'search');

    testHostComponent.q = 'dummyquery';
    testHostFixture.changeDetectorRef.markForCheck();
    await testHostFixture.whenStable();

    expect(search).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'dummyid' }),
      'dummyquery',
    );
  });

  it('should update highlights when search result changes', async () => {
    const searchResult = new SearchResult({});
    testHostFixture.detectChanges();
    const setHits = jest.spyOn(altoService, 'setHits');
    const highlight = jest.spyOn(viewerService, 'highlight');

    iiifContentSearchServiceStub.setSearchResult(searchResult);
    await testHostFixture.whenStable();

    expect(setHits).toHaveBeenCalledWith(searchResult.hits);
    expect(highlight).toHaveBeenCalledWith(searchResult);
  });

  it('should emit when manifest changes', () => {
    testHostFixture.detectChanges();

    comp.manifestChanged.subscribe((m: Manifest) =>
      expect(m.id).toEqual('dummyid'),
    );

    iiifManifestServiceStub.setManifest(
      new Manifest({
        id: 'dummyid',
      }),
    );
  });

  it('should open on the initial canvas without resetting later navigation', async () => {
    testHostComponent.canvasIndex = 12;
    testHostComponent.config = new MimeViewerConfig({
      initViewerLayout: ViewerLayout.ONE_PAGE,
    });

    testHostFixture.detectChanges();
    await waitForViewerReady();

    expect(canvasService.currentCanvasIndex).toEqual(12);

    viewerService.goToCanvasGroup(0, false);
    testHostFixture.detectChanges();

    expect(canvasService.currentCanvasIndex).toEqual(0);
  });

  describe('header', () => {
    it('should start in hidden mode', (done) => {
      testHostFixture.detectChanges();

      expectHeaderToBeHidden();
      done();
    });

    it('should not be visible when state is changed to hide', async () => {
      testHostComponent.config = new MimeViewerConfig({
        initViewerMode: ViewerMode.DASHBOARD,
      });
      testHostFixture.detectChanges();
      expectHeaderToBeVisible();

      modeService.toggleMode();
      await testHostFixture.whenStable();

      expectHeaderToBeHidden();
    });

    it('should be visible when state is changed to show', async () => {
      testHostFixture.detectChanges();
      expectHeaderToBeHidden();

      modeService.toggleMode();
      await testHostFixture.whenStable();

      expectHeaderToBeVisible();
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
  });

  describe('footer', () => {
    it('should start in hidden mode', (done) => {
      testHostFixture.detectChanges();

      expectFooterToBeHidden();
      done();
    });

    it('should not be visible when state is changed to hide', async () => {
      testHostComponent.config = new MimeViewerConfig({
        initViewerMode: ViewerMode.DASHBOARD,
      });
      testHostFixture.detectChanges();
      expectFooterToBeVisible();

      modeService.toggleMode();
      await testHostFixture.whenStable();

      expectFooterToBeHidden();
    });

    it('should be visible when state is changed to show', async () => {
      testHostFixture.detectChanges();
      expectFooterToBeHidden();

      modeService.toggleMode();
      await testHostFixture.whenStable();

      expectFooterToBeVisible();
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
  });

  // By.css() query does not find SVG elements https://github.com/angular/angular/pull/15372
  xit('should add a mask around the canvas group', async () => {
    await waitForViewerReady();
    await new Promise((resolve) => setTimeout(resolve, 600));

    const leftCanvasGroupMask = testHostFixture.debugElement.query(
      By.css('[data-testid="mime-left-page-mask"]'),
    );
    const rightCanvasGroupMask = testHostFixture.debugElement.query(
      By.css('[data-testid="mime-right-page-mask"]'),
    );
    expect(leftCanvasGroupMask).not.toBeNull();
    expect(rightCanvasGroupMask).not.toBeNull();
  });

  describe('Fab button for toggling OSD controls', () => {
    it("should not be visible when state is changed to 'hide'", async () => {
      testHostFixture.detectChanges();
      expectOsdToolbarToBeVisible();

      modeService.toggleMode();
      await testHostFixture.whenStable();

      expectOsdToolbarToBeHidden();
    });

    it("should be visible when state is changed to 'show'", async () => {
      testHostComponent.config = new MimeViewerConfig({
        initViewerMode: ViewerMode.DASHBOARD,
      });
      testHostFixture.detectChanges();
      expectOsdToolbarToBeHidden();

      modeService.toggleMode();
      await testHostFixture.whenStable();

      expectOsdToolbarToBeVisible();
    });
  });

  const expectHeaderToBeVisible = () => {
    expect(comp.showHeaderAndFooterState()).toBeTruthy();
    expect(getHeader().getAttribute('class')).toContain('show');
  };

  const expectHeaderToBeHidden = () => {
    expect(comp.showHeaderAndFooterState()).toBeFalsy();
    expect(getHeader().getAttribute('class')).not.toContain('hide');
  };

  const expectFooterToBeVisible = () => {
    expect(comp.showHeaderAndFooterState()).toBeTruthy();
    expect(getFooter().getAttribute('class')).not.toContain('hide');
  };

  const expectFooterToBeHidden = () => {
    expect(comp.showHeaderAndFooterState()).toBeFalsy();
    expect(getFooter().getAttribute('class')).not.toContain('hide');
  };

  const expectOsdToolbarToBeVisible = () => {
    expect(comp.osdToolbarState()).toBeTruthy();
    expect(getOsdToolbar().getAttribute('class')).toBe('show');
  };

  const expectOsdToolbarToBeHidden = () => {
    expect(comp.osdToolbarState()).toBeFalsy();
    expect(getOsdToolbar().getAttribute('class')).toBeFalsy();
  };

  const getHeader = () => {
    return testHostFixture.debugElement.query(By.css('mime-viewer-header'))
      .nativeElement;
  };

  const getFooter = () => {
    return testHostFixture.debugElement.query(By.css('mime-viewer-footer'))
      .nativeElement;
  };

  const getOsdToolbar = () => {
    return testHostFixture.debugElement.query(By.css('mime-osd-toolbar'))
      .nativeElement;
  };

  function waitForViewerReady(): Promise<boolean> {
    return firstValueFrom(
      toObservable(viewerService.isReady, { injector }).pipe(
        filter((isReady) => isReady),
      ),
    );
  }

  async function setViewerMode(mode: ViewerMode): Promise<void> {
    modeService.setMode(mode);
    await testHostFixture.whenStable();
  }

  function getAttributeAsInt(
    element: any,
    attribute: string,
    radix = 10,
  ): number {
    return Math.round(parseInt(element.getAttribute(attribute) || '0', radix));
  }
});
