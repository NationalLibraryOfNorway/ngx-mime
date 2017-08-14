import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ViewerComponent } from './viewer.component';
import { IiifService } from '../core/iiif-service/iiif-service';
import { Manifest } from './../core/models/manifest';
import { ManifestBuilder } from '../core/builders/manifest.builder';
import { testManifest } from '../test/testManifest';
import { Observable } from 'rxjs/Observable';

describe('ViewerComponent', function () {
  let de: DebugElement;
  let comp: ViewerComponent;
  let fixture: ComponentFixture<ViewerComponent>;
  let spy: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ViewerComponent],
      providers: [
        IiifService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should create viewer', inject([IiifService], (iiifService: IiifService) => {
    comp.manifestUri = 'dummyURI';
    const manifest = new ManifestBuilder(testManifest).build();
    spy = spyOn(iiifService, 'getManifest').and.returnValue(Observable.of(manifest));

    comp.createViewer();

    expect(comp.viewer).not.toBeNull();
  }));

});
