import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SharedModule } from '../shared/shared.module';
import { ContentsDialogModule } from '../contents-dialog/contents-dialog.module';
import { ViewerComponent } from './viewer.component';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ResizeService } from '../core/resize-service/resize.service';

import 'openseadragon';
import { Observable } from 'rxjs/Observable';
import { testManifest } from '../test/testManifest';
import { ManifestBuilder } from '../core/builders/manifest.builder';
import { Manifest } from '../core/models/manifest';

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
        ContentsDialogModule
      ],
      declarations: [
        ViewerComponent,
        TestHostComponent
      ],
      providers: [
        {provide: IiifManifestService, useClass: IiifManifestServiceStub},
        ResizeService
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

  it('should create viewer on init', () => {
    comp.ngOnInit();
    expect(comp.viewer).toBeDefined();
  });

  it('should close all dialogs when manifestUri changes', () => {
    testHostComponent.manifestUri = 'dummyURI2';

    spyOn(testHostComponent.viewerComponent.dialog, 'closeAll').and.callThrough();
    testHostFixture.detectChanges();

    expect(testHostComponent.viewerComponent.dialog.closeAll).toHaveBeenCalled();
  });

  it('should increase zoom level when pinching out', fakeAsync(() => {
    comp.ngOnInit();

    let previousZoom = comp.viewer.viewport.getZoom(true);
    comp.viewer.viewport.zoomTo(comp.viewer.viewport.getZoom(true) + 0.01);

    expect(comp.viewer.viewport.getZoom(true)).toBeGreaterThan(previousZoom);
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
