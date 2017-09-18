import { MimeViewerConfig } from '../core/mime-viewer-config';
import { BehaviorSubject, Subject } from 'rxjs/Rx';

import { OptionsTransitions } from '../core/models/options-transitions';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, inject, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

import { SharedModule } from '../shared/shared.module';
import { ContentsDialogModule } from '../contents-dialog/contents-dialog.module';
import { ViewerComponent } from './viewer.component';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { AttributionDialogModule } from '../attribution-dialog/attribution-dialog.module';
import { SearchDialogModule } from './../search-dialog/search-dialog.module';
import { testManifest } from '../test/testManifest';
import { ManifestBuilder } from '../core/builders/manifest.builder';
import { Manifest } from '../core/models/manifest';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { MimeViewerIntl } from '../core/viewer-intl';
import { ClickService } from '../core/click/click.service';
import { PageService } from '../core/page-service/page-service';
import { ModeService } from '../core/mode-service/mode.service';
import { ViewerMode } from '../core/models/viewer-mode';

import 'openseadragon';
import '../rxjs-extension';

describe('ViewerComponent', function () {
  const config: MimeViewerConfig = new MimeViewerConfig();
  let de: DebugElement;
  let comp: ViewerComponent;
  let fixture: ComponentFixture<ViewerComponent>;
  let spy: any;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

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
        SearchDialogModule
      ],
      declarations: [
        ViewerComponent,
        TestHostComponent
      ],
      providers: [
        ViewerService,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        MimeResizeService,
        MimeViewerIntl,
        ClickService,
        PageService,
        ModeService
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
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should cleanUp when manifestUri changes', () => {
    testHostComponent.manifestUri = 'dummyURI2';

    spyOn(testHostComponent.viewerComponent, 'cleanUp').and.callThrough();
    testHostFixture.detectChanges();

    expect(testHostComponent.viewerComponent.cleanUp).toHaveBeenCalled();
  });

  it('should create viewer', () => {
    expect(viewerService.getViewer()).toBeDefined();
  });

  it('should initially open in configs intial-mode', () => {
    expect(modeService.mode).toBe(config.initViewerMode);
  });

  it('should change mode to initial-mode when changing manifest', (done: any) => {
    testHostFixture.whenStable().then(() => {
      // Toggle to opposite of initial-mode
      config.initViewerMode === ViewerMode.PAGE ? viewerService.toggleToDashboard() : viewerService.toggleToPage();
      testHostComponent.manifestUri = 'dummyURI3';
      testHostComponent.viewerComponent.ngOnInit();
      testHostFixture.detectChanges();
      expect(modeService.mode).toBe(config.initViewerMode);
      done();
    });
  });

  it('should change to DASHBOARD-mode when doubleclicking in PAGE-mode', fakeAsync(() => {
    viewerService.toggleToPage();
    expect(comp.mode).toBe(ViewerMode.PAGE);
    let firstOverlay = viewerService.getOverlays()[0];
    let clickEvent = createClickEvent(firstOverlay);
    clickService.click(clickEvent);

    tick(1000);
    expect(comp.mode).toBe(ViewerMode.DASHBOARD);
    clickService.click(clickEvent);
    clickService.click(clickEvent);
    tick(1000);
    expect(comp.mode).toBe(ViewerMode.PAGE);
  }));



  it('should change to PAGE-mode when doubleclicking in DASHBOARD-mode', fakeAsync(() => {
    viewerService.toggleToDashboard();
    expect(modeService.mode).toBe(ViewerMode.DASHBOARD);

    let firstOverlay = viewerService.getOverlays()[0];
    let clickEvent = createClickEvent(firstOverlay);
    clickService.click(clickEvent);
    clickService.click(clickEvent);
    tick(1000);
    expect(comp.mode).toBe(ViewerMode.PAGE);
  }));

  it('should change to PAGE-mode when singleclicking in DASHBOARD-mode', fakeAsync(() => {
    viewerService.toggleToDashboard();

    let firstOverlay = viewerService.getOverlays()[0];
    let clickEvent = createClickEvent(firstOverlay);
    clickService.click(clickEvent);
    tick(1000);
    expect(comp.mode).toBe(ViewerMode.PAGE);
  }));

  it('should fit page vertically in PAGE-mode', fakeAsync(() => {
    viewerService.toggleToPage();
    tick(1000);
    expect(viewerService.getIsFittedVertically()).toBe(true);
  }));


  it('should still be PAGE-mode when doubleclick in zoomed-in page-mode', fakeAsync(() => {
    viewerService.toggleToPage();
    let firstOverlay = viewerService.getOverlays()[0];
    let clickEvent = createClickEvent(firstOverlay);
    clickService.click(clickEvent);
    clickService.click(clickEvent);
    tick(1000);
    expect(comp.mode).toBe(ViewerMode.PAGE);
  }));

  it('should be in zoomed PAGE-mode when doubleclicking in page-mode', fakeAsync(() => {
    pending('');
  }));

  it('should change to dashboard-mode when single-click in page-mode', fakeAsync(() => {
    viewerService.toggleToPage();
    let firstOverlay = viewerService.getOverlays()[0];
    let clickEvent = createClickEvent(firstOverlay);
    clickService.click(clickEvent);
    tick(1000);
    expect(comp.mode).toBe(ViewerMode.DASHBOARD);
  }));

  it('should change to dashboard-mode when single-click in zoomed-in page-mode', fakeAsync(() => {
    viewerService.toggleToPage();
    let firstOverlay = viewerService.getOverlays()[0];
    let clickEvent = createClickEvent(firstOverlay);
    clickService.click(clickEvent);
    clickService.click(clickEvent);
    tick(1000);
    expect(comp.mode).toBe(ViewerMode.PAGE); // We are in zoomed-in page-mode
    clickService.click(clickEvent);
    tick(1000);
    expect(comp.mode).toBe(ViewerMode.DASHBOARD);
  }));



  it('should close all dialogs when manifestUri changes', () => {
    testHostComponent.manifestUri = 'dummyURI2';

    spyOn(testHostComponent.viewerComponent, 'cleanUp').and.callThrough();
    testHostFixture.detectChanges();

    expect(testHostComponent.viewerComponent.cleanUp).toHaveBeenCalled();
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

  it('should increase zoom-level when doubleclicking in page mode', () => {
    pending('');
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

  it('should fit bounds vertically to viewport for a page', fakeAsync(() => {
    let overlay = viewerService.getOverlays()[0];
    let viewer = viewerService.getViewer();
    let overlayBounds = viewerService.createRectangle(overlay);

    viewerService.fitBounds(overlay);
    tick(1000);

    let viewportY = Math.round(viewer.viewport.getBounds().y);
    let overlayY = Math.round(overlayBounds.y);
    expect(viewportY).toEqual(overlayY);

  }));

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

  it('should change page when swipeing to left', () => {
    // viewerService.toggleToDashboard();
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

  function createClickEvent(target: any) {
    return {
      quick: true,
      tracker: { dblClickTimeThreshold: 0 },
      preventDefaultAction: false,
      originalEvent: { target: target }
    };
  }

});

@Component({
  selector: `test-component`,
  template: `<mime-viewer [manifestUri]="manifestUri"></mime-viewer>`
})
export class TestHostComponent {
  @ViewChild(ViewerComponent)
  public viewerComponent: any;
  public manifestUri: string;
}

class IiifManifestServiceStub {
  protected _currentManifest: Subject<Manifest> = new BehaviorSubject<Manifest>(new Manifest());

  get currentManifest(): Observable<Manifest> {
    return this._currentManifest.asObservable();
  }

  load(manifestUri: string): void {
    if (manifestUri === null) {
      return;
    }
    this._currentManifest.next(new ManifestBuilder(testManifest).build());
  }
}
