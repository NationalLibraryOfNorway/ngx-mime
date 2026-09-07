import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideAutoSpy } from 'jest-auto-spies';
import { when } from 'jest-when';
import { CanvasServiceStub } from '../../test/canvas-service-stub';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { testAlto } from '../../test/testAltos';
import { CanvasService } from '../canvas-service/canvas-service';
import { HighlightService } from '../highlight-service/highlight.service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../intl';
import { RecognizedTextMode } from '../models';
import { ViewerLayout } from '../models/viewer-layout';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { AltoService } from './alto.service';
import { HtmlFormatter } from './html.formatter';

describe('AltoService', () => {
  const debounceTime = 200;
  let service: AltoService;
  let httpTestingController: HttpTestingController;
  let iiifManifestService: any;
  let canvasService: any;
  let viewerLayoutService: any;
  let intl: MimeViewerIntl;

  beforeEach(() => {
    jest.useFakeTimers();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AltoService,
        MimeViewerIntl,
        HighlightService,
        { provide: CanvasService, useClass: CanvasServiceStub },
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        provideAutoSpy(ViewerLayoutService, {
          observablePropsToSpyOn: ['onChange'],
        }),
      ],
    });
    service = TestBed.inject(AltoService);
    httpTestingController = TestBed.inject(HttpTestingController);
    iiifManifestService = TestBed.inject(IiifManifestService);
    canvasService = TestBed.inject(CanvasService);
    viewerLayoutService = TestBed.inject(ViewerLayoutService);
    intl = TestBed.inject(MimeViewerIntl);
    viewerLayoutService.onChange.nextWith(ViewerLayout.ONE_PAGE);
    setUpSpy();
  });

  afterEach(() => {
    jest.useRealTimers();
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should increment the highlights revision when hits change', () => {
    service.setHits([]);

    expect(service.highlightsRevision()).toBe(1);
  });

  it('should load alto on load', () => {
    service.initialize();
    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      mockFirstCanvasGroupRequest();

      expectAltoToBeDefined();
    });
  });

  it('should increment the text content revision once per canvas group', () => {
    service.initialize();

    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      coverTestRequest().flush(testAlto);
      expect(service.textContentRevision()).toBe(0);

      insideTestRequest().flush(testAlto);
      expect(service.textContentRevision()).toBe(1);
    });
  });

  it('should report when the current canvas group has no alto source', () => {
    service.initialize();

    iiifManifestService.load('fakeUrl').subscribe(() => {
      const manifest = iiifManifestService.manifest();
      if (!manifest) {
        throw new Error('Expected the manifest to be loaded');
      }
      const canvases = manifest.sequences[0].canvases;
      canvases[0].altoUrl = undefined;
      canvases[1].altoUrl = undefined;

      waitForDebounce();

      expect(service.currentCanvasGroupHasTextSource()).toBe(false);
    });
  });

  it('should only initialize canvas loading once', () => {
    service.initialize();
    service.initialize();

    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      mockFirstCanvasGroupRequest();

      expectAltoToBeDefined();
    });
  });

  it('should cancel pending alto loads on destroy', () => {
    service.initialize();

    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      const coverRequest = coverTestRequest();
      const insideRequest = insideTestRequest();

      service.destroy();

      expect(coverRequest.cancelled).toBe(true);
      expect(insideRequest.cancelled).toBe(true);
    });
  });

  it('should cancel pending alto loads on canvas change', () => {
    service.initialize();

    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      const coverRequest = coverTestRequest();
      const insideRequest = insideTestRequest();

      canvasService.setCanvasGroupIndexChange(1);

      expect(coverRequest.cancelled).toBe(true);
      expect(insideRequest.cancelled).toBe(true);

      waitForDebounce();
      mockSecondCanvasGroupRequest();
      expect(service.textContentRevision()).toBe(1);
    });
  });

  it('should load alto on canvas change', () => {
    service.initialize();
    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      mockFirstCanvasGroupRequest();

      changeCanvasGroupIndex(1);
      mockSecondCanvasGroupRequest();

      expectAltoToBeDefined();
    });
  });

  it('should reload the current canvas group when the layout changes', () => {
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([0]);
    service.initialize();

    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      coverTestRequest().flush(testAlto);
      expect(service.textContentRevision()).toBe(1);

      canvasService.getCanvasesPerCanvasGroup.mockReturnValue([0, 1]);
      viewerLayoutService.onChange.nextWith(ViewerLayout.TWO_PAGE);
      waitForDebounce();
      insideTestRequest().flush(testAlto);

      expect(canvasService.currentCanvasGroupIndex).toBe(0);
      expect(service.getHtml(1)).toBeDefined();
      expect(service.textContentRevision()).toBe(2);
    });
  });

  it('should use cache if alto is already loaded', () => {
    service.initialize();
    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      mockFirstCanvasGroupRequest();

      changeCanvasGroupIndex(1);
      mockSecondCanvasGroupRequest();

      changeCanvasGroupIndex(0);

      expectAltoToBeDefined();
    });
  });

  it('should cache an alto page with no recognized text', () => {
    jest.spyOn(HtmlFormatter.prototype, 'altoToHtml').mockReturnValue('');
    service.initialize();

    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      mockFirstCanvasGroupRequest();

      changeCanvasGroupIndex(1);
      mockSecondCanvasGroupRequest();

      changeCanvasGroupIndex(0);
      expectNoFirstCanvasGroupRequest();
      expectAltoToBeDefined();
    });
  });

  it('should emit error message if an error has occurred', () => {
    service.initialize();
    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      mockFailedAltoRequest();

      expect(service.error()).toBe(intl.textContentErrorLabel);
    });
  });

  it('should replay and reset the current error', () => {
    service.initialize();

    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      mockFailedAltoRequest();

      expect(service.error()).toBe(intl.textContentErrorLabel);

      canvasService.setCanvasGroupIndexChange(1);
      expect(service.error()).toBeUndefined();

      waitForDebounce();
      mockSecondCanvasGroupRequest();
    });
  });

  it('should finish loading the other page if one page fails', () => {
    service.initialize();

    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      const coverRequest = coverTestRequest();
      const insideRequest = insideTestRequest();

      coverRequest.flush('deliberate 404 error', {
        status: 404,
        statusText: 'Not Found',
      });

      expect(insideRequest.cancelled).toBe(false);
      insideRequest.flush(testAlto);
      expect(service.getHtml(0)).toBeUndefined();
      expect(service.getHtml(1)).toBeDefined();
      expect(service.textContentRevision()).toBe(1);
    });
  });

  it('should return undefined if alto does not exists on canvas', () => {
    service.initialize();
    iiifManifestService.load('fakeUrl').subscribe(() => {
      waitForDebounce();
      mockFailedAltoRequest();

      expectAltoToBeUndefined();
    });
  });

  it('should toggle on recognized text in split view', () => {
    service.showRecognizedTextContentInSplitView();

    expect(service.recognizedTextContentMode()).toBe(RecognizedTextMode.SPLIT);
  });

  it('should toggle on recognized text only', () => {
    service.showRecognizedTextContentOnly();

    expect(service.recognizedTextContentMode()).toBe(RecognizedTextMode.ONLY);
  });

  it('should toggle off recognized text', () => {
    service.showRecognizedTextContentOnly();

    service.closeRecognizedTextContent();

    expect(service.recognizedTextContentMode()).toBe(RecognizedTextMode.NONE);
  });

  const setUpSpy = () => {
    const spy = jest.spyOn(canvasService, 'getCanvasesPerCanvasGroup');
    when(spy)
      .calledWith(0)
      .mockReturnValue([0, 1])
      .calledWith(1)
      .mockReturnValue([2, 3]);
  };

  const mockFirstCanvasGroupRequest = () => {
    coverTestRequest().flush(testAlto);
    insideTestRequest().flush(testAlto);
  };

  const mockSecondCanvasGroupRequest = () => {
    firstPageTestRequest().flush(testAlto);
    secondPageTestRequest().flush(testAlto);
  };

  const mockFailedAltoRequest = () => {
    const emsg = 'deliberate 404 error';
    const body = { status: 404, statusText: 'Not Found' };
    const coverRequest = coverTestRequest();
    const insideRequest = insideTestRequest();

    coverRequest.flush(emsg, body);
    expect(insideRequest.cancelled).toBe(false);
    insideRequest.flush(emsg, body);
  };

  const changeCanvasGroupIndex = (index: number) => {
    canvasService.setCanvasGroupIndexChange(index);
    waitForDebounce();
  };

  const waitForDebounce = () => {
    jest.advanceTimersByTime(debounceTime);
  };

  const coverTestRequest = () => {
    return httpTestingController.expectOne(
      `https://api.nb.no:443/catalog/v1/metadata/0266d0da8f0d064a7725048aacf19872/altos/URN:NBN:no-nb_digibok_2008020404020_C1`,
    );
  };

  const insideTestRequest = () => {
    return httpTestingController.expectOne(
      `https://api.nb.no:443/catalog/v1/metadata/0266d0da8f0d064a7725048aacf19872/altos/URN:NBN:no-nb_digibok_2008020404020_I1`,
    );
  };

  const expectNoFirstCanvasGroupRequest = () => {
    httpTestingController.expectNone(
      `https://api.nb.no:443/catalog/v1/metadata/0266d0da8f0d064a7725048aacf19872/altos/URN:NBN:no-nb_digibok_2008020404020_C1`,
    );
    httpTestingController.expectNone(
      `https://api.nb.no:443/catalog/v1/metadata/0266d0da8f0d064a7725048aacf19872/altos/URN:NBN:no-nb_digibok_2008020404020_I1`,
    );
  };

  const firstPageTestRequest = () => {
    return httpTestingController.expectOne(
      `https://api.nb.no:443/catalog/v1/metadata/0266d0da8f0d064a7725048aacf19872/altos/URN:NBN:no-nb_digibok_2008020404020_001`,
    );
  };

  const secondPageTestRequest = () => {
    return httpTestingController.expectOne(
      `https://api.nb.no:443/catalog/v1/metadata/0266d0da8f0d064a7725048aacf19872/altos/URN:NBN:no-nb_digibok_2008020404020_002`,
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
});
