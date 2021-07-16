import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CanvasServiceStub } from '../../test/canvas-service-stub';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { CanvasService } from '../canvas-service/canvas-service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../intl/viewer-intl';
import { testAlto } from './../../test/testAltos';
import { AltoService } from './alto.service';

describe('AltoService', () => {
  let service: AltoService;
  let httpTestingController: HttpTestingController;
  let iiifManifestService: any;
  let canvasService: any;
  const debounceTime = 200;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MimeViewerIntl,
        { provide: CanvasService, useClass: CanvasServiceStub },
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
      ],
    });
    service = TestBed.inject(AltoService);
    httpTestingController = TestBed.inject(HttpTestingController);
    iiifManifestService = TestBed.inject(IiifManifestService);
    canvasService = TestBed.inject(CanvasService);
    setUpSpy();
  });

  afterEach(() => {
    httpTestingController.verify();
    service.destroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load current alto on canvas change', fakeAsync(() => {
    service.initialize();
    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      mockAltoRequest();
      expect(service.getHtml(0)).toBeDefined();
    });
  }));

  fit('should use cache if alto is already loaded', fakeAsync(() => {
    service.initialize();
    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      mockAltoRequest();
      expect(service.getHtml(0)).toBeDefined();

      changeCanvaasGroupIndex(2);

      changeCanvaasGroupIndex(0);
      expect(service.getHtml(0)).toBeDefined();
    });
  }));

  const setUpSpy = () => {
    spyOn(canvasService, 'getCanvasesPerCanvasGroup')
      .withArgs(0)
      .and.returnValue([0, 1])
      .withArgs(2)
      .and.returnValue([2, 3]);
  };

  const mockAltoRequest = () => {
    httpTestingController
      .expectOne(
        `https://api.nb.no:443/catalog/v1/metadata/0266d0da8f0d064a7725048aacf19872/altos/URN:NBN:no-nb_digibok_2008020404020_C1`
      )
      .flush(testAlto);
  };

  const changeCanvaasGroupIndex = (index: number) => {
    canvasService.setCanvasGroupIndexChange(index);
    waitForDebounce();
  };

  const waitForDebounce = () => {
    tick(debounceTime);
  };
});
