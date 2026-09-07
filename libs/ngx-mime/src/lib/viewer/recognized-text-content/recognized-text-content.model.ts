import { SafeHtml } from '@angular/platform-browser';
import { Manifest } from '../../core/models/manifest';

export interface RecognizedTextSource {
  manifest: Manifest | null;
  isLoading: boolean;
  hasTextSource: boolean | undefined;
  textContentRevision: number;
  highlightsRevision: number;
}

export interface RecognizedTextState {
  firstCanvas: SafeHtml | string | undefined;
  secondCanvas: SafeHtml | string | undefined;
  updatedCanvasGroupLabel: string | undefined;
  updatedCanvasGroupPageCount: number;
}

export interface PreviousRecognizedTextState {
  source: RecognizedTextSource;
  value: RecognizedTextState;
}
