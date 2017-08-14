import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IiifService } from './iiif-service';
import { Manifest } from '../models/manifest';
import { ManifestBuilder } from '../builders/manifest.builder';
import { testManifest } from '../../test/testManifest';

describe('IiifService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        IiifService
      ]
    });
  });

  it('should be created', inject([IiifService],
      (svc: IiifService) => {
    expect(svc).toBeTruthy();
  }));

  it('should return a Manifest', inject([IiifService, HttpClient, HttpTestingController],
    fakeAsync((svc: IiifService, http: HttpClient, httpMock: HttpTestingController) => {
    let result: Manifest = null;

    svc.getManifest('dummyUrl').subscribe((manifest: Manifest) => {
      result = manifest;
    });

    httpMock.expectOne(`dummyUrl`)
      .flush(new ManifestBuilder(testManifest).build());
    tick();
    expect(result.label).toBe('Fjellkongen Ludvig \"Ludden\"');

  })));

});
