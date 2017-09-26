import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { IiifManifestService } from './iiif-manifest-service';
import { Manifest } from '../models/manifest';
import { ManifestBuilder } from '../builders/manifest.builder';
import { testManifest } from '../../test/testManifest';
import { SpinnerService } from '../spinner-service/spinner.service';
import '../../rxjs-extension';

describe('IiifManifestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        IiifManifestService,
        SpinnerService
      ]
    });
  });

  it('should be created', inject([IiifManifestService],
      (svc: IiifManifestService) => {
    expect(svc).toBeTruthy();
  }));

  it('should return a Manifest', inject([IiifManifestService, HttpClient, HttpTestingController],
    fakeAsync((svc: IiifManifestService, http: HttpClient, httpMock: HttpTestingController) => {
    let result: Manifest = null;

    svc.load('dummyUrl');
    svc.currentManifest.subscribe((manifest: Manifest) => {
      result = manifest;
    });

    httpMock.expectOne(`dummyUrl`)
      .flush(new ManifestBuilder(testManifest).build());
    tick();
    expect(result.label).toBe('Fjellkongen Ludvig \"Ludden\"');

  })));

});
