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
  let de: DebugElement;
  let comp: ViewerComponent;
  let fixture: ComponentFixture<ViewerComponent>;
  let spy: any;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        SharedModule,
        ContentsDialogModule,
        AttributionDialogModule
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
    testHostFixture.detectChanges();
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should close all dialogs when manifestUri changes', () => {
    testHostComponent.manifestUri = 'dummyURI2';

    spyOn(testHostComponent.viewerComponent.dialog, 'closeAll').and.callThrough();
    testHostFixture.detectChanges();

    expect(testHostComponent.viewerComponent.dialog.closeAll).toHaveBeenCalled();
  });

  it('should create viewer', inject([ViewerService], (viewerService: ViewerService) => {
    expect(viewerService.getViewer()).toBeDefined();
  }));

  it('svgOverlay-plugin should be defined', inject([ViewerService], (viewerService: ViewerService) => {
    expect(viewerService.getViewer().svgOverlay()).toBeDefined();
  }));

  it('should create overlays', inject([ViewerService], (viewerService: ViewerService) => {
    expect(viewerService.getOverlays()).toBeDefined();
  }));

  it('should create overlays-array with same size as tilesources-array', inject([ViewerService], (viewerService: ViewerService) => {
    expect(viewerService.getTilesources().length).toEqual(viewerService.getOverlays().length);
  }));

  it('should initially open in Page-mode', inject([ModeService], (modeService: ModeService) => {
    expect(modeService.mode).toBe(ViewerMode.PAGE);
  }));

  it('should change to dashboard view on first click',
    fakeAsync(inject([ViewerService, ClickService], (viewerService: ViewerService, clickService: ClickService) => {
    expect(comp.mode).toBe(ViewerMode.PAGE);
    let firstOverlay = viewerService.getOverlays()[0];
    let clickEvent = {
      quick: true,
      tracker: { dblClickTimeThreshold: 0 },
      preventDefaultAction: false,
      originalEvent: { target: firstOverlay }
    };
    clickService.click(clickEvent);
    tick();
    expect(comp.mode).toBe(ViewerMode.DASHBOARD);
  })));


  it('should change to dashboard mode when doubleclicking in page mode',
    fakeAsync(inject([ViewerService, ClickService], (viewerService: ViewerService, clickService: ClickService) => {
      // fixture.detectChanges();
      // expect(comp.mode).toBe(ViewerMode.PAGE);
      // let firstOverlay = viewerService.getOverlays()[0];
      // let clickEvent = {
      //   quick: true,
      //   tracker: { dblClickTimeThreshold: 0 },
      //   preventDefaultAction: false,
      //   originalEvent: { target: firstOverlay }
      // };
      // clickService.click(clickEvent);
      // clickService.click(clickEvent);
      // tick();
      // expect(comp.mode).toBe(ViewerMode.DASHBOARD);
      pending('Need to figure out why test is failing, when the one click test works');
  })));

  it('should fit page vertically when in initial page-mode',
    inject([ViewerService, ClickService, PageService],
      (viewerService: ViewerService, clickService: ClickService, pageService: PageService) => {
        pending('');
      }));

  it('should change to page-mode when doubleclick in zoomed-in page-mode', () => {
    pending('');
  });

  it('should change to dashboard-mode when single-click in page-mode', () => {
    pending('');
  });

  it('should change to dashboard-mode when single-click in zoomed-in page-mode', () => {
    pending('');
  });

  it('should change to page-mode when doubleclicking in dashboard-mode', () => {
    pending('');
  });

  it('should increase zoom level when pinching out', inject([ViewerService], (viewerService: ViewerService) => {
    // comp.ngOnInit();
    //
    // pinchOut(viewerService);
    //
    // expect(viewerService.getZoom()).toBeGreaterThan(viewerService.getHomeZoom());
    pending('Set to pending until we find a way to perform pinch event');
  }));

  it('should decrease zoom level when is zoomed in and pinching in', inject([ViewerService], (viewerService: ViewerService) => {
    // comp.ngOnInit();
    // const previousZoom = 1;
    // viewerService.zoomTo(previousZoom);
    //
    // pinchIn(viewerService);
    //
    // expect(viewerService.getZoom()).toBeLessThan(previousZoom);
    pending('Set to pending until we find a way to perform pinch event');
  }));

  it('should not decrease zoom level when zoom level is home and pinching in', inject([ViewerService], (viewerService: ViewerService) => {
    // comp.ngOnInit();
    // viewerService.zoomHome();
    //
    // pinchIn(viewerService);
    //
    // expect(viewerService.getZoom()).toEqual(viewerService.getHomeZoom());
    pending('Set to pending until we find a way to perform pinch event');
  }));

  it('should move image inside the view when user is panning', inject([ViewerService], (viewerService: ViewerService) => {
    // comp.ngOnInit();
    // viewerService.zoomTo(2);
    // const viewer = viewerService.getViewer();
    // const previousCenter = viewer.viewport.getCenter(false);
    //
    // viewer.raiseEvent('pan', {x: 150, y: 150});
    //
    // expect(viewerService.getCenter().x).toBeGreaterThan(previousCenter.x);
    pending('Set to pending until we find a way to perform pan event');
  }));


  it('should increase zoom-level when doubleclicking in page-mode', () => {
    pending('');
  });

  it('should change page when swipeing to left',
    fakeAsync(inject([ViewerService, ClickService],
    (viewerService: ViewerService, clickService: ClickService) => {
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
  })));


  function pinchOut(viewerService: ViewerService) {
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 40, lastDistance: 40 });
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 50, lastDistance: 40 });
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 60, lastDistance: 50 });
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 70, lastDistance: 60 });
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 80, lastDistance: 70 });
    viewerService.getViewer().raiseEvent('canvas-pinch', { distance: 90, lastDistance: 80 });
  }

  function pinchIn(viewerService: ViewerService) {
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
  template: `<mime-viewer [manifestUri]="manifestUri"></mime-viewer>`
})
export class TestHostComponent {
  @ViewChild(ViewerComponent)
  public viewerComponent: any;
  public manifestUri: string;
}

class IiifManifestServiceStub {

  get currentManifest(): Observable<Manifest> {
    return Observable.of(new ManifestBuilder(testManifest).build());
  }

  load(manifestUri: string): void {
  }
}
