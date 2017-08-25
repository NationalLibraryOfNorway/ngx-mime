import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Component, ViewChild } from '@angular/core';
import { async, fakeAsync, tick, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';

import { SharedModule } from './../shared/shared.module';
import { ContentsDialogModule } from './../contents-dialog/contents-dialog.module';
import { ViewerComponent } from './viewer.component';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ResizeService } from './../core/resize-service/resize.service';
import { ClickService } from '../core/click/click.service';
import { PageService } from '../core/page-service/page-service';
import { Manifest } from './../core/models/manifest';
import { ManifestBuilder } from '../core/builders/manifest.builder';
import { testManifest } from '../test/testManifest';

import 'openseadragon';

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
        IiifManifestService,
        ResizeService,
        ClickService,
        PageService
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

  it('should create viewer on init', inject([IiifManifestService], (iiifManifestService: IiifManifestService) => {
    comp.manifestUri = 'dummyURI';
    const manifest = new ManifestBuilder(testManifest).build();
    spy = spyOn(iiifManifestService, 'load').and.returnValue(Observable.of(manifest));

    comp.ngOnInit();

    expect(comp.viewer).not.toBeNull();
  }));

  it('should close all dialogs when manifestUri changes', inject([IiifManifestService], (iiifService: IiifManifestService) => {
    testHostComponent.manifestUri = 'dummyURI2';

    spyOn(testHostComponent.viewerComponent.dialog, 'closeAll').and.callThrough();
    testHostFixture.detectChanges();

    expect(testHostComponent.viewerComponent.dialog.closeAll).toHaveBeenCalled();
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
