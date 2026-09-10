import { httpResource } from '@angular/common/http';
import { effect, inject, Injectable, signal, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { combineLatest, Subscription, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { parseString } from 'xml2js';
import { AltoBuilder } from '../builders/alto';
import { CanvasService } from '../canvas-service/canvas-service';
import { HighlightService } from '../highlight-service/highlight.service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../intl';
import { MimeViewerConfig } from '../mime-viewer-config';
import { RecognizedTextMode } from '../models';
import { Hit } from '../models/hit';
import { Manifest } from '../models/manifest';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import {
  AltoDocumentSource,
  AltoGroupLoad,
  AltoLoadResult,
} from './alto-load.model';
import { HtmlFormatter } from './html.formatter';

@Injectable()
export class AltoService {
  intl = inject(MimeViewerIntl);
  readonly recognizedTextContentMode: Signal<RecognizedTextMode>;
  readonly isLoading: Signal<boolean>;
  readonly error: Signal<string | undefined>;
  readonly currentCanvasGroupHasTextSource: Signal<boolean | undefined>;
  readonly textContentRevision: Signal<number>;
  readonly highlightsRevision: Signal<number>;
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly highlightService = inject(HighlightService);
  private readonly canvasService = inject(CanvasService);
  private readonly viewerLayoutService = inject(ViewerLayoutService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly manifestChanges = toObservable(
    this.iiifManifestService.manifest,
  );
  private config!: MimeViewerConfig;
  private altos: string[] = [];
  private readonly recognizedTextContentModeState = signal(
    RecognizedTextMode.NONE,
  );
  private readonly isLoadingState = signal(false);
  private readonly errorState = signal<string | undefined>(undefined);
  private readonly currentCanvasGroupHasTextSourceState = signal<
    boolean | undefined
  >(undefined);
  private readonly textContentRevisionState = signal(0);
  private readonly highlightsRevisionState = signal(0);
  private readonly activeCanvasGroupState = signal<AltoGroupLoad | undefined>(
    undefined,
  );
  private readonly firstAltoResource = httpResource.text<AltoLoadResult>(
    () => this.createAltoRequest(0),
    { parse: (xml) => this.parseAltoResponse(0, xml) },
  );
  private readonly secondAltoResource = httpResource.text<AltoLoadResult>(
    () => this.createAltoRequest(1),
    { parse: (xml) => this.parseAltoResponse(1, xml) },
  );
  private readonly canvasGroupCompletionEffect = effect(() =>
    this.updateCanvasGroup(),
  );
  private subscriptions = new Subscription();
  private htmlFormatter!: HtmlFormatter;
  private hits: Hit[] | undefined;
  private manifest: Manifest | null = null;
  private initialized = false;
  private requestId = 0;
  private completedRequestId: number | undefined;

  constructor() {
    this.recognizedTextContentMode =
      this.recognizedTextContentModeState.asReadonly();
    this.isLoading = this.isLoadingState.asReadonly();
    this.error = this.errorState.asReadonly();
    this.currentCanvasGroupHasTextSource =
      this.currentCanvasGroupHasTextSourceState.asReadonly();
    this.textContentRevision = this.textContentRevisionState.asReadonly();
    this.highlightsRevision = this.highlightsRevisionState.asReadonly();
  }

  initialize() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
    this.htmlFormatter = new HtmlFormatter();
    this.subscriptions = new Subscription();

    this.subscriptions.add(
      combineLatest([
        this.manifestChanges,
        this.canvasService.onCanvasGroupIndexChange,
        this.viewerLayoutService.onChange,
      ])
        .pipe(
          switchMap(([manifest, currentCanvasGroupIndex]) => {
            if (manifest !== this.manifest) {
              this.manifest = manifest;
              this.clearCache();
            }
            this.prepareCanvasGroupLoad();

            return timer(200).pipe(
              map(() => ({ manifest, currentCanvasGroupIndex })),
            );
          }),
        )
        .subscribe(({ manifest, currentCanvasGroupIndex }) =>
          this.activateCanvasGroup(manifest, currentCanvasGroupIndex),
        ),
    );
  }

  setHits(hits?: Hit[]) {
    this.hits = hits;
    this.highlightsRevisionState.update((revision) => revision + 1);
  }

  destroy() {
    this.setRecognizedTextContentMode(
      this.config?.initRecognizedTextContentMode ?? RecognizedTextMode.NONE,
    );

    this.subscriptions.unsubscribe();
    this.initialized = false;
    this.activeCanvasGroupState.set(undefined);
    this.firstAltoResource.set(undefined);
    this.secondAltoResource.set(undefined);
    this.isLoadingState.set(false);
    this.errorState.set(undefined);
    this.currentCanvasGroupHasTextSourceState.set(undefined);
    this.completedRequestId = undefined;
    this.manifest = null;
    this.clearCache();
  }

  setConfig(config: MimeViewerConfig) {
    this.config = config;
  }

  showRecognizedTextContentOnly() {
    this.setRecognizedTextContentMode(RecognizedTextMode.ONLY);
  }

  showRecognizedTextContentInSplitView() {
    this.setRecognizedTextContentMode(RecognizedTextMode.SPLIT);
  }

  closeRecognizedTextContent() {
    this.setRecognizedTextContentMode(RecognizedTextMode.NONE);
  }

  getHtml(index: number): SafeHtml | undefined {
    return this.isInCache(index)
      ? this.sanitizer.bypassSecurityTrustHtml(
          this.highlightService.highlight(this.altos[index], index, this.hits),
        )
      : undefined;
  }

  clearCache() {
    this.altos = [];
  }

  private prepareCanvasGroupLoad(): void {
    this.activeCanvasGroupState.set(undefined);
    this.firstAltoResource.set(undefined);
    this.secondAltoResource.set(undefined);
    this.completedRequestId = undefined;
    this.errorState.set(undefined);
    this.currentCanvasGroupHasTextSourceState.set(undefined);
    this.isLoadingState.set(true);
  }

  private activateCanvasGroup(
    manifest: Manifest | null,
    currentCanvasGroupIndex: number,
  ): void {
    const sources = this.getAltoSources(manifest, currentCanvasGroupIndex);
    const hasTextSource = sources.length > 0;

    this.currentCanvasGroupHasTextSourceState.set(hasTextSource);
    if (!hasTextSource) {
      this.isLoadingState.set(false);
      return;
    }

    this.activeCanvasGroupState.set({ id: ++this.requestId, sources });
  }

  private getAltoSources(
    manifest: Manifest | null,
    currentCanvasGroupIndex: number,
  ): AltoDocumentSource[] {
    const canvasGroup = this.canvasService.getCanvasesPerCanvasGroup(
      currentCanvasGroupIndex,
    );
    const canvases = manifest?.sequences?.[0]?.canvases;

    if (!canvasGroup?.length || !canvases) {
      return [];
    }

    return canvasGroup.slice(0, 2).flatMap((index) => {
      const url = canvases[index]?.altoUrl;
      return url ? [{ index, url }] : [];
    });
  }

  private createAltoRequest(resourceIndex: number) {
    const source = this.activeCanvasGroupState()?.sources[resourceIndex];

    return source && !this.isInCache(source.index)
      ? {
          url: source.url,
          headers: { Accept: 'text/xml, application/xml' },
        }
      : undefined;
  }

  private parseAltoResponse(
    resourceIndex: number,
    xml: string,
  ): AltoLoadResult {
    const request = this.activeCanvasGroupState();
    const source = request?.sources[resourceIndex];
    if (!request || !source) {
      throw new Error('The ALTO request is no longer active');
    }

    let parseError: Error | null = null;
    let result: any;
    parseString(
      xml,
      { explicitChildren: true, preserveChildrenOrder: true },
      (error, parsedXml) => {
        parseError = error;
        result = parsedXml;
      },
    );

    if (parseError) {
      throw parseError;
    }
    if (!result?.alto) {
      throw new Error('The ALTO response is invalid');
    }

    const alto = new AltoBuilder().withAltoXml(result.alto).build();
    return {
      requestId: request.id,
      index: source.index,
      html: this.htmlFormatter.altoToHtml(alto),
    };
  }

  private updateCanvasGroup(): void {
    const request = this.activeCanvasGroupState();
    if (!request || request.id === this.completedRequestId) {
      return;
    }

    let hasError = false;
    const isComplete = request.sources.every((source, resourceIndex) => {
      if (this.isInCache(source.index)) {
        return true;
      }

      const resource =
        resourceIndex === 0 ? this.firstAltoResource : this.secondAltoResource;
      if (resource.hasValue()) {
        const loadedAlto = resource.value();
        if (
          loadedAlto.requestId === request.id &&
          loadedAlto.index === source.index
        ) {
          this.altos[source.index] = loadedAlto.html;
          return true;
        }
      }

      if (resource.error()) {
        hasError = true;
        return true;
      }

      return false;
    });

    if (hasError) {
      this.errorState.set(this.intl.textContentErrorLabel);
    }
    if (isComplete) {
      this.completedRequestId = request.id;
      this.isLoadingState.set(false);
      this.textContentRevisionState.update((revision) => revision + 1);
    }
  }

  private isInCache(index: number) {
    return this.altos[index] !== undefined;
  }

  private setRecognizedTextContentMode(value: RecognizedTextMode): void {
    this.recognizedTextContentModeState.set(value);
  }
}
