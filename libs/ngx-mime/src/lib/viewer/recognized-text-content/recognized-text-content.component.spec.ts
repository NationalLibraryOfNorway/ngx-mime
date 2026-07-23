import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAutoSpy } from 'jest-auto-spies';
import { AltoService } from '../../core/alto-service/alto.service';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { HighlightService } from '../../core/highlight-service/highlight.service';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl';
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
  let intl: MimeViewerIntl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecognizedTextContentComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MimeViewerIntl,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        provideAutoSpy(CanvasService),
        provideAutoSpy(AltoService, {
          methodsToSpyOn: ['getHtml'],
          observablePropsToSpyOn: [
            'onTextContentReady$',
            'isLoading$',
            'hasErrors$',
            'currentCanvasGroupHasTextSource$',
          ],
        }),
        provideAutoSpy(IiifContentSearchService, {
          observablePropsToSpyOn: ['onSelected'],
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
    intl = TestBed.inject(MimeViewerIntl);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the region label when translations change', () => {
    fixture.detectChanges();
    intl.digitalTextLabel = 'Recognized text';

    intl.changes.next();
    fixture.detectChanges();

    const region: HTMLElement = fixture.nativeElement.querySelector(
      '.recognized-text-content-container',
    );
    expect(region.getAttribute('aria-label')).toBe('Recognized text');
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

  it('should show recognized text that was loaded before initialization', () => {
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([0]);
    altoService.getHtml.calledWith(0).mockReturnValue('cachedTextContent');

    fixture.detectChanges();

    expect(component.firstCanvasRecognizedTextContent).toBe(
      'cachedTextContent',
    );
    const recognizedTextContentEl: HTMLElement =
      fixture.nativeElement.querySelector(
        'div[data-testid="firstCanvasRecognizedTextContent"]',
      );
    expect(recognizedTextContentEl.innerHTML).toBe('cachedTextContent');
  });

  it('should show error message', () => {
    altoService.hasErrors$.nextWith('fakeError');

    fixture.detectChanges();

    const error: DebugElement = fixture.debugElement.query(
      By.css('div[data-testid="error"]'),
    );
    expect(error.nativeElement.innerHTML).toBe('fakeError');
  });

  it('should announce when recognized text is unavailable', () => {
    fixture.detectChanges();

    const message: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="recognizedTextContentUnavailable"]',
    );
    expect(message.textContent?.trim()).toBe(
      'Recognized text is not available for this item',
    );
  });

  it('should announce when recognized text is unavailable for the current view', () => {
    fixture.detectChanges();
    component.hasRecognizedTextContent = true;

    altoService.currentCanvasGroupHasTextSource$.nextWith(false);
    fixture.detectChanges();

    const message: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="recognizedTextContentUnavailableForCurrentView"]',
    );
    expect(message.textContent?.trim()).toBe(
      'Recognized text is not available for the current view',
    );
    expect(
      fixture.nativeElement.querySelector(
        '[data-testid="recognizedTextContentUnavailable"]',
      ),
    ).toBeNull();
  });

  it('should announce when recognized text is updated', () => {
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([4]);
    altoService.getHtml.calledWith(4).mockReturnValue('updatedTextContent');
    altoService.onTextContentReady$.nextWith(true);

    fixture.detectChanges();

    const message: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="recognizedTextContentUpdated"]',
    );
    expect(message.textContent?.trim()).toBe(
      'Page 5 loaded. Digital text updated.',
    );
  });

  it('should announce when recognized text for two pages is updated', () => {
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([3, 4]);
    altoService.getHtml.mockReturnValue('updatedTextContent');
    altoService.onTextContentReady$.nextWith(true);

    fixture.detectChanges();

    const message: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="recognizedTextContentUpdated"]',
    );
    expect(message.textContent?.trim()).toBe(
      'Pages 4–5 loaded. Digital text updated.',
    );
  });

  it('should announce only the page whose recognized text loaded', () => {
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([3, 4]);
    altoService.getHtml.calledWith(3).mockReturnValue(undefined);
    altoService.getHtml.calledWith(4).mockReturnValue('updatedTextContent');
    altoService.onTextContentReady$.nextWith(true);

    fixture.detectChanges();

    const message: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="recognizedTextContentUpdated"]',
    );
    expect(message.textContent?.trim()).toBe(
      'Page 5 loaded. Digital text updated.',
    );
    expect(component.firstCanvasRecognizedTextContent).toBeUndefined();
    expect(component.secondCanvasRecognizedTextContent).toBe(
      'updatedTextContent',
    );
  });

  it('should clear stale recognized text when loading starts', () => {
    fixture.detectChanges();
    component.firstCanvasRecognizedTextContent = 'previousTextContent';
    component.updatedCanvasGroupLabel = '1';
    component.updatedCanvasGroupPageCount = 1;

    altoService.isLoading$.nextWith(true);

    expect(component.firstCanvasRecognizedTextContent).toBe('');
    expect(component.updatedCanvasGroupLabel).toBeUndefined();
    expect(component.updatedCanvasGroupPageCount).toBe(0);
  });

  it('should call highlightSelectedHit in onSelected subscribe', () => {
    canvasService.getCanvasesPerCanvasGroup.calledWith(0).nextWith([0, 1]);
    iiifContentSearchService.onSelected.nextWith(createMockHit(1, 'test '));

    fixture.detectChanges();

    expect(highlightService.highlightSelectedHit).toHaveBeenCalled();
  });

  it('should call highlightSelectedHit in onTextContentReady subscribe', () => {
    component.selectedHit = 1;
    altoService.onTextContentReady$.nextWith(true);
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([0]);
    altoService.getHtml.calledWith(0).mockReturnValue('fakeTextContent');

    fixture.detectChanges();

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
