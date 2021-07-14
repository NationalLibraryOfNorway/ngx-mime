import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { CanvasService } from '../canvas-service/canvas-service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../intl/viewer-intl';
import { testAlto } from './../../test/testAltos';
import { AltoService } from './alto.service';

describe('AltoService', () => {
  let service: AltoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MimeViewerIntl,
        CanvasService,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
      ],
    });
    service = TestBed.inject(AltoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add alto xml to service', () => {
    service.add(0, 'dummyUrl').subscribe(() => {
      const safeHtml = service.getHtml(0);
      expect(safeHtml).toBeTruthy();
    });

    httpTestingController.expectOne(`dummyUrl`).flush(testAlto);
  });
});
