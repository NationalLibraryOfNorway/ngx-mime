import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewerComponent } from './viewer.component';
import { BaseRequestOptions, ConnectionBackend, Http, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { IiifService } from '../core/iiif-service/iiif-service';
import { ManifestBuilder } from '../core/builders/manifest.builder';
import { testManifest } from '../test/testManifest';
import { Observable } from 'rxjs/Observable';

describe('ViewerComponent', function () {
  let de: DebugElement;
  let comp: ViewerComponent;
  let fixture: ComponentFixture<ViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      imports: [
        HttpModule
      ],
      declarations: [ViewerComponent],
      providers: [
        IiifService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        }
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
    spyOn(iiifService, 'getManifest').and.returnValue(Observable.of(manifest));

    comp.createViewer();

    expect(comp.viewer).not.toBeNull();
  }));
});
