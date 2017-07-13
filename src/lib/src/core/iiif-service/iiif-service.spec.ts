import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { IiifService } from './iiif-service';
import { BaseRequestOptions, ConnectionBackend, Http, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Manifest } from '../models/manifest';
import { ManifestBuilder } from '../builders/manifest.builder';
import { testManifest } from '../../test/testManifest';

describe('IiifService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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
    });
  });

  it('should be created', inject([IiifService], (service: IiifService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a Manifest', inject([IiifService, MockBackend], fakeAsync((service: IiifService, backend: MockBackend) => {
    let result: Manifest = null;

    backend.connections.subscribe((c: any) => {
      const response = new ResponseOptions({body: new ManifestBuilder(testManifest).build()});
      c.mockRespond(new Response(response));
    });

    service.getManifest('dummyUrl').subscribe((manifest: Manifest) => {
      result = manifest;
    });

    expect(result.label).toBe('Fjellkongen Ludvig \"Ludden\"');
  })));
});
