import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  linkedSignal,
  viewChild,
} from '@angular/core';
import { AltoService } from '../../core/alto-service/alto.service';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { HighlightService } from '../../core/highlight-service/highlight.service';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { ManifestUtils } from '../../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeViewerIntl } from '../../core/intl/viewer-intl';
import {
  PreviousRecognizedTextState,
  RecognizedTextSource,
  RecognizedTextState,
} from './recognized-text-content.model';

@Component({
  selector: 'mime-recognized-text-content',
  templateUrl: './recognized-text-content.component.html',
  styleUrls: ['./recognized-text-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecognizedTextContentComponent {
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly altoService = inject(AltoService);
  private readonly iiifContentSearchService = inject(IiifContentSearchService);
  private readonly highlightService = inject(HighlightService);
  private readonly canvasService = inject(CanvasService);
  readonly intl = inject(MimeViewerIntl).value;

  readonly viewerId = input.required<string>();
  readonly recognizedTextContentContainer = viewChild.required<
    ElementRef<HTMLElement>
  >('recognizedTextContentContainer');
  readonly manifest = this.iiifManifestService.manifest;
  readonly isLoading = this.altoService.isLoading;
  readonly error = this.altoService.error;
  readonly currentCanvasGroupHasTextSource =
    this.altoService.currentCanvasGroupHasTextSource;
  readonly selectedHit = computed(
    () => this.iiifContentSearchService.selectedHit()?.id,
  );
  readonly textContentRevision = this.altoService.textContentRevision;
  readonly highlightsRevision = this.altoService.highlightsRevision;
  readonly hasRecognizedTextContent = computed(() =>
    this.currentManifestHasRecognizedTextContent(),
  );
  readonly recognizedTextState = this.createRecognizedTextStateSignal();
  readonly firstCanvasRecognizedTextContent = computed(
    () => this.recognizedTextState().firstCanvas,
  );
  readonly secondCanvasRecognizedTextContent = computed(
    () => this.recognizedTextState().secondCanvas,
  );
  readonly updatedCanvasGroupLabel = computed(
    () => this.recognizedTextState().updatedCanvasGroupLabel,
  );
  readonly updatedCanvasGroupPageCount = computed(
    () => this.recognizedTextState().updatedCanvasGroupPageCount,
  );
  private lastScrolledTextContentRevision = 0;

  constructor() {
    afterRenderEffect(() => {
      const revision = this.textContentRevision();
      const container = this.recognizedTextContentContainer();

      this.scrollToTopOnTextContentChange(revision, container);
    });
    afterRenderEffect(() => {
      // Recognized text changes replace the elements that contain highlights.
      this.recognizedTextState();
      const viewerId = this.viewerId();
      const selectedHit = this.selectedHit();

      this.highlightSelectedHit(viewerId, selectedHit);
    });
  }

  private scrollToTopOnTextContentChange(
    revision: number,
    container: ElementRef<HTMLElement>,
  ): void {
    if (revision > this.lastScrolledTextContentRevision) {
      container.nativeElement.scrollTop = 0;
      this.lastScrolledTextContentRevision = revision;
    }
  }

  private highlightSelectedHit(
    viewerId: string,
    selectedHit: number | undefined,
  ): void {
    if (selectedHit !== undefined) {
      this.highlightService.highlightSelectedHit(viewerId, selectedHit);
    }
  }

  private currentManifestHasRecognizedTextContent(): boolean | undefined {
    const manifest = this.manifest();

    return manifest
      ? ManifestUtils.hasRecognizedTextContent(manifest)
      : undefined;
  }

  private createRecognizedTextStateSignal() {
    return linkedSignal<RecognizedTextSource, RecognizedTextState>({
      source: () => this.getRecognizedTextSource(),
      computation: (source, previous) =>
        this.getRecognizedTextState(source, previous),
    });
  }

  private getRecognizedTextSource(): RecognizedTextSource {
    return {
      manifest: this.manifest(),
      isLoading: this.isLoading(),
      hasTextSource: this.currentCanvasGroupHasTextSource(),
      textContentRevision: this.textContentRevision(),
      highlightsRevision: this.highlightsRevision(),
    };
  }

  private getRecognizedTextState(
    source: RecognizedTextSource,
    previous?: PreviousRecognizedTextState,
  ): RecognizedTextState {
    if (!previous) {
      return this.refreshRecognizedText(false);
    }
    if (
      source.manifest !== previous.source.manifest ||
      source.isLoading ||
      (source.hasTextSource === undefined &&
        previous.source.hasTextSource !== undefined)
    ) {
      return this.emptyRecognizedTextState();
    }
    if (source.textContentRevision !== previous.source.textContentRevision) {
      return this.refreshRecognizedText(true, previous.value);
    }
    if (source.highlightsRevision !== previous.source.highlightsRevision) {
      return this.refreshRecognizedText(false, previous.value);
    }

    return previous.value;
  }

  private refreshRecognizedText(
    announceUpdate: boolean,
    previous?: RecognizedTextState,
  ): RecognizedTextState {
    const canvases = this.canvasService.getCanvasesPerCanvasGroup(
      this.canvasService.currentCanvasGroupIndex,
    );
    if (!canvases?.length) {
      return announceUpdate
        ? this.emptyRecognizedTextState()
        : (previous ?? this.emptyRecognizedTextState());
    }

    const firstCanvas = this.altoService.getHtml(canvases[0]);
    const secondCanvas =
      canvases.length === 2 ? this.altoService.getHtml(canvases[1]) : '';
    const updatedCanvases = canvases.filter((_, index) =>
      index === 0 ? firstCanvas !== undefined : secondCanvas !== undefined,
    );

    return {
      firstCanvas,
      secondCanvas,
      updatedCanvasGroupLabel: announceUpdate
        ? this.getCanvasGroupLabel(updatedCanvases)
        : previous?.updatedCanvasGroupLabel,
      updatedCanvasGroupPageCount: announceUpdate
        ? updatedCanvases.length
        : (previous?.updatedCanvasGroupPageCount ?? 0),
    };
  }

  private emptyRecognizedTextState(): RecognizedTextState {
    return {
      firstCanvas: '',
      secondCanvas: '',
      updatedCanvasGroupLabel: undefined,
      updatedCanvasGroupPageCount: 0,
    };
  }

  private getCanvasGroupLabel(canvases: number[]): string | undefined {
    if (canvases.length === 0) {
      return undefined;
    }
    const firstPage = canvases[0] + 1;
    const lastPage = canvases[canvases.length - 1] + 1;

    return firstPage === lastPage ? `${firstPage}` : `${firstPage}–${lastPage}`;
  }
}
