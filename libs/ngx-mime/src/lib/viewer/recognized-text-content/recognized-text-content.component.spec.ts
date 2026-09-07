import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement, signal, WritableSignal } from '@angular/core';
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
import { Canvas, Manifest, Sequence } from '../../core/models/manifest';
import { IiifContentSearchServiceStub } from '../../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';
import { RecognizedTextContentComponent } from './recognized-text-content.component';

describe('RecognizedTextContentComponent', () => {
  let component: RecognizedTextContentComponent;
  let fixture: ComponentFixture<RecognizedTextContentComponent>;
  let altoService: any;
  let canvasService: any;
  let highlightService: any;
  let iiifContentSearchService: any;
  let iiifManifestService: any;
  let intl: MimeViewerIntl;
  let isLoadingState: WritableSignal<boolean>;
  let errorState: WritableSignal<string | undefined>;
  let currentCanvasGroupHasTextSourceState: WritableSignal<boolean | undefined>;
  let textContentRevisionState: WritableSignal<number>;
  let highlightsRevisionState: WritableSignal<number>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecognizedTextContentComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MimeViewerIntl,
        { provide: IiifManifestService, useClass: IiifManifestServiceStub },
        provideAutoSpy(CanvasService),
        provideAutoSpy(AltoService, {
          methodsToSpyOn: ['getHtml'],
        }),
        {
          provide: IiifContentSearchService,
          useClass: IiifContentSearchServiceStub,
        },
        provideAutoSpy(HighlightService, ['highlightSelectedHit']),
      ],
    }).compileComponents();

    altoService = TestBed.inject(AltoService);
    isLoadingState = signal(false);
    errorState = signal<string | undefined>(undefined);
    currentCanvasGroupHasTextSourceState = signal<boolean | undefined>(
      undefined,
    );
    textContentRevisionState = signal(0);
    highlightsRevisionState = signal(0);
    altoService.isLoading = isLoadingState.asReadonly();
    altoService.error = errorState.asReadonly();
    altoService.currentCanvasGroupHasTextSource =
      currentCanvasGroupHasTextSourceState.asReadonly();
    altoService.textContentRevision = textContentRevisionState.asReadonly();
    altoService.highlightsRevision = highlightsRevisionState.asReadonly();
    canvasService = TestBed.inject(CanvasService);
    highlightService = TestBed.inject(HighlightService);
    iiifContentSearchService = TestBed.inject(IiifContentSearchService);
    iiifManifestService = TestBed.inject(IiifManifestService);
    intl = TestBed.inject(MimeViewerIntl);
    fixture = TestBed.createComponent(RecognizedTextContentComponent);
    fixture.componentRef.setInput('viewerId', 'test-viewer');
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the region label when translations change', async () => {
    await fixture.whenStable();
    intl.digitalTextLabel = 'Recognized text';

    intl.notifyChanges();
    await fixture.whenStable();

    const region: HTMLElement = fixture.nativeElement.querySelector(
      '.recognized-text-content-container',
    );
    expect(region.getAttribute('aria-label')).toBe('Recognized text');
  });

  it('should show recognized text', async () => {
    await fixture.whenStable();
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

    incrementTextContentRevision();
    await fixture.whenStable();

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

  it('should show recognized text that was loaded before initialization', async () => {
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([0]);
    altoService.getHtml.calledWith(0).mockReturnValue('cachedTextContent');

    await fixture.whenStable();

    expect(component.firstCanvasRecognizedTextContent()).toBe(
      'cachedTextContent',
    );
    const recognizedTextContentEl: HTMLElement =
      fixture.nativeElement.querySelector(
        'div[data-testid="firstCanvasRecognizedTextContent"]',
      );
    expect(recognizedTextContentEl.innerHTML).toBe('cachedTextContent');
  });

  it('should show error message', async () => {
    await fixture.whenStable();

    errorState.set('fakeError');
    await fixture.whenStable();

    const error: DebugElement = fixture.debugElement.query(
      By.css('div[data-testid="error"]'),
    );
    expect(error.nativeElement.innerHTML).toBe('fakeError');
  });

  it('should announce when recognized text is unavailable', async () => {
    await fixture.whenStable();

    const message: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="recognizedTextContentUnavailable"]',
    );
    expect(message.textContent?.trim()).toBe(
      'Recognized text is not available for this item',
    );
  });

  it('should announce when recognized text is unavailable for the current view', async () => {
    iiifManifestService.setManifest(
      new Manifest({
        sequences: [
          new Sequence({ canvases: [new Canvas({ altoUrl: 'alto.xml' })] }),
        ],
      }),
    );
    await fixture.whenStable();

    currentCanvasGroupHasTextSourceState.set(false);
    await fixture.whenStable();

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

  it('should announce when recognized text is updated', async () => {
    await fixture.whenStable();
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([4]);
    altoService.getHtml.calledWith(4).mockReturnValue('updatedTextContent');

    incrementTextContentRevision();
    await fixture.whenStable();

    const message: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="recognizedTextContentUpdated"]',
    );
    expect(message.textContent?.trim()).toBe(
      'Page 5 loaded. Digital text updated.',
    );
  });

  it('should announce when recognized text for two pages is updated', async () => {
    await fixture.whenStable();
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([3, 4]);
    altoService.getHtml.mockReturnValue('updatedTextContent');

    incrementTextContentRevision();
    await fixture.whenStable();

    const message: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="recognizedTextContentUpdated"]',
    );
    expect(message.textContent?.trim()).toBe(
      'Pages 4–5 loaded. Digital text updated.',
    );
  });

  it('should announce only the page whose recognized text loaded', async () => {
    await fixture.whenStable();
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([3, 4]);
    altoService.getHtml.calledWith(3).mockReturnValue(undefined);
    altoService.getHtml.calledWith(4).mockReturnValue('updatedTextContent');

    incrementTextContentRevision();
    await fixture.whenStable();

    const message: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="recognizedTextContentUpdated"]',
    );
    expect(message.textContent?.trim()).toBe(
      'Page 5 loaded. Digital text updated.',
    );
    expect(component.firstCanvasRecognizedTextContent()).toBeUndefined();
    expect(component.secondCanvasRecognizedTextContent()).toBe(
      'updatedTextContent',
    );
  });

  it('should refresh recognized text when highlights change', async () => {
    await fixture.whenStable();
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([0]);
    altoService.getHtml
      .calledWith(0)
      .mockReturnValue('<mark>updatedTextContent</mark>');

    incrementHighlightsRevision();
    await fixture.whenStable();

    const recognizedTextContentEl: HTMLElement =
      fixture.nativeElement.querySelector(
        'div[data-testid="firstCanvasRecognizedTextContent"]',
      );
    expect(recognizedTextContentEl.innerHTML).toBe(
      '<mark>updatedTextContent</mark>',
    );
  });

  it('should clear stale recognized text when loading starts', async () => {
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([0]);
    altoService.getHtml.calledWith(0).mockReturnValue('previousTextContent');
    incrementTextContentRevision();
    await fixture.whenStable();

    isLoadingState.set(true);
    await fixture.whenStable();

    expect(component.firstCanvasRecognizedTextContent()).toBe('');
    expect(component.updatedCanvasGroupLabel()).toBeUndefined();
    expect(component.updatedCanvasGroupPageCount()).toBe(0);
  });

  it('should clear rendered text when the current canvas group is reset', async () => {
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([0, 1]);
    altoService.getHtml.calledWith(0).mockReturnValue('previousFirstPage');
    altoService.getHtml.calledWith(1).mockReturnValue('previousSecondPage');
    currentCanvasGroupHasTextSourceState.set(true);
    incrementTextContentRevision();
    await fixture.whenStable();

    currentCanvasGroupHasTextSourceState.set(undefined);
    await fixture.whenStable();

    expect(component.firstCanvasRecognizedTextContent()).toBe('');
    expect(component.secondCanvasRecognizedTextContent()).toBe('');
    expect(component.updatedCanvasGroupLabel()).toBeUndefined();
    expect(component.updatedCanvasGroupPageCount()).toBe(0);
    expect(
      fixture.nativeElement.querySelector(
        '[data-testid="firstCanvasRecognizedTextContent"]',
      ),
    ).toBeNull();
    expect(
      fixture.nativeElement.querySelector(
        '[data-testid="secondCanvasRecognizedTextContent"]',
      ),
    ).toBeNull();
  });

  it('should highlight the selected search hit', async () => {
    await fixture.whenStable();
    canvasService.getCanvasesPerCanvasGroup.calledWith(0).nextWith([0, 1]);

    iiifContentSearchService.setSelected(createMockHit(1, 'test '));
    await fixture.whenStable();

    expect(highlightService.highlightSelectedHit).toHaveBeenCalledWith(
      'test-viewer',
      1,
    );
  });

  it('should reapply the selected hit when text content is ready', async () => {
    await fixture.whenStable();
    iiifContentSearchService.setSelected(createMockHit(1, 'test '));
    await fixture.whenStable();
    highlightService.highlightSelectedHit.mockClear();
    canvasService.getCanvasesPerCanvasGroup.mockReturnValue([0]);
    altoService.getHtml.calledWith(0).mockReturnValue('fakeTextContent');

    incrementTextContentRevision();
    await fixture.whenStable();

    expect(highlightService.highlightSelectedHit).toHaveBeenCalledWith(
      'test-viewer',
      1,
    );
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

  function incrementTextContentRevision(): void {
    textContentRevisionState.update((revision) => revision + 1);
  }

  function incrementHighlightsRevision(): void {
    highlightsRevisionState.update((revision) => revision + 1);
  }
});
