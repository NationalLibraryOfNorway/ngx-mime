import { AttributionDialogModule } from './../attribution-dialog/attribution-dialog.module';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SharedModule } from '../shared/shared.module';
import { ContentsDialogModule } from '../contents-dialog/contents-dialog.module';
import { ViewerComponent } from './viewer.component';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';

import 'openseadragon';
import { Observable } from 'rxjs/Observable';
import { testManifest } from '../test/testManifest';
import { ManifestBuilder } from '../core/builders/manifest.builder';
import { Manifest } from '../core/models/manifest';
import { ViewerService } from '../core/viewer-service/viewer.service';

describe('ViewerComponent', function () {
  let de: DebugElement;
  let comp: ViewerComponent;
  let fixture: ComponentFixture<ViewerComponent>;
  let spy: any;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        HttpClientTestingModule,
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
        {provide: IiifManifestService, useClass: IiifManifestServiceStub},
        MimeResizeService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));

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
    comp.ngOnInit();

    expect(viewerService.getViewer()).toBeDefined();
  }));

  it('should increase zoom level when pinching out', inject([ViewerService], (viewerService: ViewerService) => {
    comp.ngOnInit();
    const previousZoom = viewerService.getZoom();

    viewerService.zoomTo(viewerService.getZoom() + 0.2);

    expect(viewerService.getZoom()).toBeGreaterThan(previousZoom);
  }));

  it('should decrease zoom level when pinching in and is zoomed in', inject([ViewerService], (viewerService: ViewerService) => {
    comp.ngOnInit();
    const previousZoom = 1;
    viewerService.zoomTo(previousZoom);

    viewerService.zoomTo(viewerService.getZoom() - 0.2);

    expect(viewerService.getZoom()).toBeLessThan(previousZoom);
  }));

  it('should not decrease zoom level when pinching out and zoom level is home', inject([ViewerService], (viewerService: ViewerService) => {
    comp.ngOnInit();
    viewerService.zoomTo(viewerService.getHomeZoom() - 0.3);

    expect(viewerService.getZoom()).toEqual(viewerService.getHomeZoom());
  }));
});

@Component({
  selector : `test-component`,
  template : `<mime-viewer [manifestUri]="manifestUri"></mime-viewer>`
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
