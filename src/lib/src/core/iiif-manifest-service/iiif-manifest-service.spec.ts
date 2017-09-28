import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { IiifManifestService } from './iiif-manifest-service';
import { Manifest } from '../models/manifest';
import { ManifestBuilder } from '../builders/manifest.builder';
import { testManifest } from '../../test/testManifest';
import { MimeViewerIntl } from '../viewer-intl';
import '../../rxjs-extension';

describe('IiifManifestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        IiifManifestService,
        MimeViewerIntl
      ]
    });
  });

  beforeEach(inject([IiifManifestService], (svc: IiifManifestService) => {
    svc.destroy();
  }));

  it('should be created', inject([IiifManifestService],
      (svc: IiifManifestService) => {
    expect(svc).toBeTruthy();
  }));

  it('should return a Manifest', inject([IiifManifestService, HttpClient, HttpTestingController],
    fakeAsync((svc: IiifManifestService, http: HttpClient, httpMock: HttpTestingController) => {
    let result: Manifest = null;
    let error: string = null;

    svc.load('dummyUrl');
    svc.currentManifest.subscribe(
      (manifest: Manifest) => result = manifest
    );

    svc.errorMessage.subscribe(
      (err: string) => error = err
    );

    httpMock.expectOne(`dummyUrl`).flush(new ManifestBuilder(testManifest).build());
    tick();
    expect(error).toBeNull();
    expect(result.label).toBe('Fjellkongen Ludvig \"Ludden\"');

  })));

  it('should return error message if manifest url is missing',
    inject([IiifManifestService, HttpClient, HttpTestingController],
      fakeAsync((svc: IiifManifestService, http: HttpClient, httpMock: HttpTestingController) => {
        let result: Manifest = null;
        let error: string = null;

        svc.load(null);
        svc.currentManifest.subscribe(
          (manifest: Manifest) => result = manifest
        );

        svc.errorMessage.subscribe(
          (err: string) => error = err
        );

        httpMock.expectNone('');
        expect(result).toBeNull();
        expect(error).toBe('ManifestUri is missing');
    })));

  it('should return error message if IiifManifestService could not load manifest',
    inject([IiifManifestService, HttpClient, HttpTestingController],
      fakeAsync((svc: IiifManifestService, http: HttpClient, httpMock: HttpTestingController) => {
        let result: Manifest = null;
        let error: string = null;

        svc.load('dummyUrl');
        svc.currentManifest.subscribe(
          (manifest: Manifest) => result = manifest
        );

        svc.errorMessage.subscribe(
          (err: string) => error = err
        );

        httpMock.expectOne('dummyUrl').flush('Cannot /GET dummyUrl', {status: 404, statusText: 'NOT FOUND'});
        expect(result).toBeNull();
        expect(error).toBe('Cannot /GET dummyUrl');
  })));

  it('should return error message when manifest is not valid',
    inject([IiifManifestService, HttpClient, HttpTestingController],
      fakeAsync((svc: IiifManifestService, http: HttpClient, httpMock: HttpTestingController) => {
        let result: Manifest = null;
        let error: string = null;

        svc.load('dummyUrl');
        svc.currentManifest.subscribe(
          (manifest: Manifest) => result = manifest
        );

        svc.errorMessage.subscribe(
          (err: string) => error = err
        );

        testManifest.sequences = null;
        httpMock.expectOne(`dummyUrl`).flush(new ManifestBuilder(testManifest).build());
        expect(result).toBeNull();
        expect(error).toBe('Manifest is not valid');
  })));
});
