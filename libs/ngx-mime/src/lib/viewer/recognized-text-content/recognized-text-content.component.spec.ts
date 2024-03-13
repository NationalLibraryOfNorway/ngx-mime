import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAutoSpy } from 'jest-auto-spies';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RecognizedTextContentComponent],
      providers: [
        MimeViewerIntl,
        MimeViewerIntl,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        provideAutoSpy(CanvasService),
        provideAutoSpy(AltoService, {
          methodsToSpyOn: ['getHtml'],
          observablePropsToSpyOn: [
            'onTextContentReady$',
            'isLoading$',
            'hasErrors$',
          ],
        }),
        provideAutoSpy(IiifContentSearchService, {
          observablePropsToSpyOn: ['onChange', 'onSelected'],
        }),
        provideAutoSpy(HighlightService, ['highlightSelectedHit']),
      ],
    }).compileComponents();
  });

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

  it('should show recognized text', () => {
    const firstCanvasRecognizedTextContent =
      '<p>fakefirstCanvasRecognizedText</p>';
    const secondCanvasRecognizedTextContent =
      '<p>fakeSecondRecognizedTextContent</p>';
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([0, 1]);
    altoService.getHtml
      .calledWith(0)
      .mockReturnValue(firstCanvasRecognizedTextContent);
    altoService.getHtml
      .calledWith(1)
      .mockReturnValue(secondCanvasRecognizedTextContent);
    altoService.onTextContentReady$.nextWith(true);
    altoService.isLoading$.nextWith(false);

    fixture.detectChanges();

    const firstCanvasRecognizedTextContentEl: HTMLElement =
      fixture.nativeElement.querySelector(
        'div[data-testid="firstCanvasRecognizedTextContent"]',
      );
    const secondCanvasRecognizedTextContentEl: HTMLElement =
      fixture.nativeElement.querySelector(
        'div[data-testid="secondCanvasRecognizedTextContent"]',
      );
    expect(firstCanvasRecognizedTextContentEl.innerHTML).toBe(
      firstCanvasRecognizedTextContent,
    );
    expect(secondCanvasRecognizedTextContentEl.innerHTML).toBe(
      secondCanvasRecognizedTextContent,
    );
  });

  it('should show error message', () => {
    altoService.hasErrors$.nextWith('fakeError');

    fixture.detectChanges();

    const error: DebugElement = fixture.debugElement.query(
      By.css('div[data-testid="error"]'),
    );
    expect(error.nativeElement.innerHTML).toBe('fakeError');
  });

  it('should call highlightSelectedHit in onSelected subscribe', () => {
    canvasService.getCanvasesPerCanvasGroup.calledWith(0).nextWith([0, 1]);
    iiifContentSearchService.onSelected.nextWith(createMockHit(1, 'test '));

    fixture.detectChanges();

    expect(highlightService.highlightSelectedHit).toHaveBeenCalled();
  });

  it('should call highlightSelectedHit in onTextContentReady subscribe', async () => {
    component.selectedHit = 1;
    altoService.onTextContentReady$.nextWith(true);
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([0]);
    altoService.getHtml.calledWith(0).mockReturnValue('fakeTextContent');

    fixture.detectChanges();

    await fixture.whenStable();
    expect(highlightService.highlightSelectedHit).toHaveBeenCalled();
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
