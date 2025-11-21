import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { testManifest } from '../../test/testManifest';
import { ManifestBuilder } from '../builders/iiif/v2/manifest.builder';
import { MimeViewerIntl } from '../intl';
import { Manifest } from '../models/manifest';
import { SpinnerService } from '../spinner-service/spinner.service';
import { IiifManifestService } from './iiif-manifest-service';

describe('IiifManifestService', () => {
  let svc: IiifManifestService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MimeViewerIntl,
        IiifManifestService,
        SpinnerService,
      ],
    });
    svc = TestBed.inject(IiifManifestService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(svc).toBeTruthy();
  });

  it('should return a Manifest', fakeAsync(() => {
    let result: Manifest | null = new Manifest();
    let error: string | null = null;

    svc.load('dummyUrl').subscribe();

    const request = httpTestingController.expectOne(`dummyUrl`);
    request.flush(new ManifestBuilder(testManifest).build());

    svc.currentManifest.subscribe(
      (manifest: Manifest | null) => (result = manifest),
    );

    svc.errorMessage.subscribe((err: string | null) => (error = err));

    expect(error).toBeNull();
    expect(result).toBeDefined();
    if (result) {
      expect(result.label).toBe('Fjellkongen Ludvig "Ludden"');
    }
  }));

  it('should return error message if manifest url is missing', fakeAsync(() => {
    let result: Manifest | null = null;
    let error: string | null = null;

    svc.currentManifest.subscribe((manifest: Manifest | null) => {
      result = manifest;
    });

    svc.errorMessage.subscribe((err: string | null) => {
      error = err;
    });

    svc.load('').subscribe();

    httpTestingController.expectNone('');
    expect(result).toBeNull();
    expect(error).toBeDefined();
    if (error) {
      expect(error).toBe('ManifestUri is missing');
    }
  }));

  it('should return error message if IiifManifestService could not load manifest', fakeAsync(() => {
    let result: Manifest | null = null;
    let error: string | null = null;

    svc.currentManifest.subscribe(
      (manifest: Manifest | null) => (result = manifest),
    );

    svc.errorMessage.subscribe((err: string | null) => (error = err));

    svc.load('wrongManifestUrl').subscribe();

    httpTestingController
      .expectOne('wrongManifestUrl')
      .flush('Cannot /GET wrongManifestUrl', {
        status: 404,
        statusText: 'NOT FOUND',
      });

    httpTestingController.verify();
    expect(result).toBeNull();
    expect(error).toBeDefined();
    if (error) {
      expect(error).toEqual('Cannot /GET wrongManifestUrl');
    }
  }));

  it('should return error message when manifest is not valid', fakeAsync(() => {
    let result: Manifest | null = new Manifest();
    let error: string | null = null;

    const invalidManifest = new ManifestBuilder(testManifest).build();
    invalidManifest.sequences = [];

    svc.load('invalidManifest').subscribe();

    const req = httpTestingController.expectOne(`invalidManifest`);
    req.flush(invalidManifest);

    svc.currentManifest.subscribe((manifest: Manifest | null) => {
      result = manifest;
    });

    svc.errorMessage.subscribe((err: string | null) => {
      error = err;
    });

    expect(result).toBeNull();
    expect(error).toBeDefined();
    if (error) {
      expect(error).toBe('Manifest is not valid');
    }
  }));
});
