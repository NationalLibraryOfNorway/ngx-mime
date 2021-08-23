import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { CanvasServiceStub } from '../../test/canvas-service-stub';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { CanvasService } from '../canvas-service/canvas-service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../intl/viewer-intl';
import { testAlto } from './../../test/testAltos';
import { AltoService } from './alto.service';

describe('AltoService', () => {
  const debounceTime = 200;
  let service: AltoService;
  let httpTestingController: HttpTestingController;
  let iiifManifestService: any;
  let canvasService: any;
  let intl: MimeViewerIntl;

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
    intl = TestBed.inject(MimeViewerIntl);
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
      expectAltoToBeDefined();
    });
  }));

  it('should use cache if alto is already loaded', fakeAsync(() => {
    service.initialize();
    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      mockAltoRequest();
      expectAltoToBeDefined();

      changeCanvaasGroupIndex(2);

      changeCanvaasGroupIndex(0);
      expectAltoToBeDefined();
    });
  }));

  it('should emit error message if an error has occurred', fakeAsync(() => {
    service.initialize();
    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      let errorMessage: string | undefined;
      service.hasErrors$.subscribe((err: string) => (errorMessage = err));

      mockFailedAltoRequest();

      expect(errorMessage).toBe(intl.textErrorLabel);
    });
  }));

  it('should return undefined if alto does not exists on canvas', fakeAsync(() => {
    service.initialize();
    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      mockFailedAltoRequest();

      expectAltoToBeUndefined();
    });
  }));

  it('should toggle showing text', () => {
    expectOnShowTextChangeToBe(false);

    service.toggle();

    expectOnShowTextChangeToBe(true);
  });

  const setUpSpy = () => {
    spyOn(canvasService, 'getCanvasesPerCanvasGroup')
      .withArgs(0)
      .and.returnValue([0, 1])
      .withArgs(2)
      .and.returnValue([2, 3]);
  };

  const mockAltoRequest = () => {
    coverTestRequest().flush(testAlto);
    insideTestRequest().flush(testAlto);
  };

  const mockFailedAltoRequest = () => {
    const emsg = 'deliberate 404 error';
    const body = { status: 404, statusText: 'Not Found' };
    coverTestRequest().flush(emsg, body);
    insideTestRequest().flush(emsg, body);
  };

  const changeCanvaasGroupIndex = (index: number) => {
    canvasService.setCanvasGroupIndexChange(index);
    waitForDebounce();
  };

  const waitForDebounce = () => {
    tick(debounceTime);
  };

  const coverTestRequest = () => {
    return httpTestingController.expectOne(
      `https://api.nb.no:443/catalog/v1/metadata/0266d0da8f0d064a7725048aacf19872/altos/URN:NBN:no-nb_digibok_2008020404020_C1`
    );
  };

  const insideTestRequest = () => {
    return httpTestingController.expectOne(
      `https://api.nb.no:443/catalog/v1/metadata/0266d0da8f0d064a7725048aacf19872/altos/URN:NBN:no-nb_digibok_2008020404020_I1`
    );
  };

  const expectAltoToBeDefined = () => {
    expect(service.getHtml(0)).toBeDefined();
    expect(service.getHtml(1)).toBeDefined();
  };

  const expectAltoToBeUndefined = () => {
    expect(service.getHtml(0)).toBeUndefined();
    expect(service.getHtml(1)).toBeUndefined();
  };

  const expectOnShowTextChangeToBe = (value: boolean) => {
    expect(service.onTextContentToggleChange$).toBeObservable(cold('a', { a: value }));
  };
});
