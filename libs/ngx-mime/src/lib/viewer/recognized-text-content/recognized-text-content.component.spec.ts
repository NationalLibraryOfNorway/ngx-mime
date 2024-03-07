import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { cold } from 'jest-marbles';
import { when } from 'jest-when';
import { of } from 'rxjs';
import { AltoService } from '../../core/alto-service/alto.service';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { HighlightService } from '../../core/highlight-service/highlight.service';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import { MimeViewerConfig } from '../../core/mime-viewer-config';
import { Hit } from '../../core/models/hit';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { RecognizedTextContentComponent } from './recognized-text-content.component';

describe('RecognizedTextContentComponent', () => {
  let component: RecognizedTextContentComponent;
  let fixture: ComponentFixture<RecognizedTextContentComponent>;
  let altoService: any;
  let canvasService: any;
  let highlightService: any;
  let iiifContentSearchService: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RecognizedTextContentComponent],
      providers: [
        MimeViewerIntl,
        CanvasService,
        AltoService,
        MimeViewerIntl,
        HighlightService,
        IiifContentSearchService,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecognizedTextContentComponent);
    component = fixture.componentInstance;
    altoService = TestBed.inject(AltoService);
    canvasService = TestBed.inject(CanvasService);
    highlightService = TestBed.inject(HighlightService);
    iiifContentSearchService = TestBed.inject(IiifContentSearchService);

    altoService.setConfig(new MimeViewerConfig());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show recognized text', (done) => {
    const firstCanvasRecognizedTextContent =
      '<p>fakefirstCanvasRecognizedText</p>';
    const secondCanvasRecognizedTextContent =
      '<p>fakeSecondRecognizedTextContent</p>';
    when(canvasService.getCanvasesPerCanvasGroup)
      .calledWith(0)
      .mockReturnValue([0, 1]);

    when(altoService.getHtml)
      .calledWith(0)
      .mockReturnValue(firstCanvasRecognizedTextContent)
      .calledWith(1)
      .mockReturnValue(secondCanvasRecognizedTextContent);

    const stream$ = jest
      .spyOn(altoService, 'onTextContentReady', 'get')
      .mockReturnValue(cold('x|'));

    fixture.detectChanges();

    expect(stream$).toSatisfyOnFlush(() => {
      const firstCanvasRecognizedTextContentDe: DebugElement =
        fixture.debugElement.query(
          By.css('div[data-testid="firstCanvasRecognizedTextContent"]'),
        );
      const secondCanvasRecognizedTextContentDe: DebugElement =
        fixture.debugElement.query(
          By.css('div[data-testid="secondCanvasRecognizedTextContent"]'),
        );

      expect(firstCanvasRecognizedTextContentDe.nativeElement.innerHTML).toBe(
        firstCanvasRecognizedTextContent,
      );
      expect(secondCanvasRecognizedTextContentDe.nativeElement.innerHTML).toBe(
        secondCanvasRecognizedTextContent,
      );
      done();
    });
  });

  it('should show error message', () => {
    const stream$ = jest
      .spyOn(altoService, 'hasErrors$', 'get')
      .mockReturnValue(cold('x|', { x: 'fakeError' }));

    fixture.detectChanges();

    expect(stream$).toSatisfyOnFlush(() => {
      const error: DebugElement = fixture.debugElement.query(
        By.css('div[data-testid="error"]'),
      );
      expect(error.nativeElement.innerHTML).toBe('fakeError');
    });
  });

  it('should call highlightSelectedHit in onSelected subscribe', () => {
    when(canvasService.getCanvasesPerCanvasGroup)
      .calledWith(0)
      .mockReturnValue([0, 1]);
    jest
      .spyOn(iiifContentSearchService, 'onSelected', 'get')
      .mockReturnValue(of(createMockHit(1, 'test ')));
    const spy = jest.spyOn(highlightService, 'highlightSelectedHit');

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should call highlightSelectedHit in updateRecognizedText method', (done) => {
    component.selectedHit = 1;
    const stream$ = jest
      .spyOn(altoService, 'onTextContentReady$', 'get')
      .mockReturnValue(cold('x|'));
    when(canvasService.getCanvasesPerCanvasGroup)
      .calledWith(0)
      .mockReturnValue([0, 1]);

    const spy = jest.spyOn(highlightService, 'highlightSelectedHit');

    fixture.detectChanges();

    expect(stream$).toSatisfyOnFlush(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  function createMockHit(id: number, match: string): Hit {
    return {
      id,
      index: 0,
      match,
      label: '',
      before: '',
      after: '',
      highlightRects: [],
    };
  }
});
