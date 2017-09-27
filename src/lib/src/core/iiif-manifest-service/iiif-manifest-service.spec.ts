import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IiifManifestService } from './iiif-manifest-service';
import { Manifest } from '../models/manifest';
import { ManifestBuilder } from '../builders/manifest.builder';
import { testManifest } from '../../test/testManifest';
import '../../rxjs-extension';
import { MimeViewerIntl } from '../viewer-intl';

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

  it('should return error message if manifest url is missing',
    inject([IiifManifestService, HttpClient, HttpTestingController],
      fakeAsync((svc: IiifManifestService, http: HttpClient, httpMock: HttpTestingController) => {
        let result: Manifest = null;
        let error: string = null;

        svc.currentManifest.subscribe(
          (manifest: Manifest) => result = manifest,
          (err: HttpErrorResponse) => error = err.error
        );

        svc.load(null);

        httpMock.expectNone('');
        expect(result).toBeNull();
        expect(error).toBe('ManifestUri is missing');
    })));

  it('should return error message if IiifManifestService could not load manifest',
    inject([IiifManifestService, HttpClient, HttpTestingController],
      fakeAsync((svc: IiifManifestService, http: HttpClient, httpMock: HttpTestingController) => {
        let result: Manifest = null;
        let error: any = null;

        svc.currentManifest.subscribe(
          (manifest: Manifest) => result = manifest,
          (err: HttpErrorResponse) => error = err.error
        );

        svc.load('dummyUrl');

        httpMock.expectOne('dummyUrl').error(new ErrorEvent('ERROR', {error: 'Cannot /GET dummyUrl'}), {status: 404});
        expect(result).toBeNull();
        expect(error.error).toBe('Cannot /GET dummyUrl');
  })));
});
