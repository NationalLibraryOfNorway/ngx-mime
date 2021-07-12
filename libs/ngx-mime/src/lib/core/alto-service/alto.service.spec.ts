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
  let httpMock: HttpTestingController;

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
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add alto xml to service', () => {
    service.add(0, 'dummyUrl');
    httpMock.expectOne(`dummyUrl`).flush(testAlto);

    const safeHtml = service.getHtml(0);

    expect(safeHtml).toBeTruthy();
  });
});
