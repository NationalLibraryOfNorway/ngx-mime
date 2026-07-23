import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  BehaviorSubject,
  EMPTY,
  forkJoin,
  Observable,
  of,
  Subject,
  Subscriber,
  Subscription,
  timer,
} from 'rxjs';
import { catchError, finalize, map, switchMap, take } from 'rxjs/operators';
import { parseString } from 'xml2js';
import { AltoBuilder } from '../builders/alto';
import { CanvasService } from '../canvas-service/canvas-service';
import { HighlightService } from '../highlight-service/highlight.service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../intl';
import { MimeViewerConfig } from '../mime-viewer-config';
import { RecognizedTextMode, RecognizedTextModeChanges } from '../models';
import { Hit } from '../models/hit';
import { Manifest } from '../models/manifest';
import { Alto } from './alto.model';
import { HtmlFormatter } from './html.formatter';

@Injectable()
export class AltoService {
  intl = inject(MimeViewerIntl);
  private readonly http = inject(HttpClient);
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly highlightService = inject(HighlightService);
  private readonly canvasService = inject(CanvasService);
  private readonly sanitizer = inject(DomSanitizer);
  private config!: MimeViewerConfig;
  private altos: string[] = [];
  private readonly isLoading = new BehaviorSubject(false);
  private readonly textContentReady = new Subject<void>();
  private readonly textError = new BehaviorSubject<string | undefined>(
    undefined,
  );
  private readonly currentCanvasGroupHasTextSource = new BehaviorSubject<
    boolean | undefined
  >(undefined);
  private manifest: Manifest | null = null;
  private subscriptions = new Subscription();
  private readonly altoBuilder = new AltoBuilder();
  private htmlFormatter!: HtmlFormatter;
  private hits: Hit[] | undefined;
  private initialized = false;
  private readonly _recognizedTextContentModeChanges =
    new BehaviorSubject<RecognizedTextModeChanges>({
      previousValue: RecognizedTextMode.NONE,
      currentValue: RecognizedTextMode.NONE,
    });
  private previousRecognizedTextMode = RecognizedTextMode.NONE;

  get onRecognizedTextContentModeChange$(): Observable<RecognizedTextModeChanges> {
    return this._recognizedTextContentModeChanges.asObservable();
  }

  get onTextContentReady$(): Observable<void> {
    return this.textContentReady.asObservable();
  }

  get isLoading$(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  get hasErrors$(): Observable<string | undefined> {
    return this.textError.asObservable();
  }

  get currentCanvasGroupHasTextSource$(): Observable<boolean | undefined> {
    return this.currentCanvasGroupHasTextSource.asObservable();
  }

  get recognizedTextContentMode(): RecognizedTextMode {
    return this._recognizedTextContentModeChanges.value.currentValue;
  }

  set recognizedTextContentMode(value: RecognizedTextMode) {
    this._recognizedTextContentModeChanges.next({
      currentValue: value,
      previousValue: this.previousRecognizedTextMode,
    });
    this.previousRecognizedTextMode = value;
  }

  initialize() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
    this.htmlFormatter = new HtmlFormatter();
    this.subscriptions = new Subscription();

    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          this.manifest = manifest;
          this.textError.next(undefined);
          this.currentCanvasGroupHasTextSource.next(undefined);
          this.clearCache();
        },
      ),
    );

    this.subscriptions.add(
      this.canvasService.onCanvasGroupIndexChange
        .pipe(
          switchMap((currentCanvasGroupIndex: number) => {
            this.textError.next(undefined);
            this.currentCanvasGroupHasTextSource.next(undefined);
            this.isLoading.next(true);
            return timer(200).pipe(
              switchMap(() => this.loadCanvasGroup(currentCanvasGroupIndex)),
              finalize(() => this.isLoading.next(false)),
            );
          }),
        )
        .subscribe(() => this.textContentReady.next()),
    );
  }

  setHits(hits?: Hit[]) {
    this.hits = hits;
  }

  destroy() {
    this.recognizedTextContentMode = this.config?.initRecognizedTextContentMode
      ? this.config?.initRecognizedTextContentMode
      : RecognizedTextMode.NONE;

    this.subscriptions.unsubscribe();
    this.initialized = false;
    this.textError.next(undefined);
    this.currentCanvasGroupHasTextSource.next(undefined);
    this.clearCache();
  }

  setConfig(config: MimeViewerConfig) {
    this.config = config;
  }

  showRecognizedTextContentOnly() {
    this.recognizedTextContentMode = RecognizedTextMode.ONLY;
  }

  showRecognizedTextContentInSplitView() {
    this.recognizedTextContentMode = RecognizedTextMode.SPLIT;
  }

  closeRecognizedTextContent() {
    this.recognizedTextContentMode = RecognizedTextMode.NONE;
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

  private loadCanvasGroup(currentCanvasGroupIndex: number): Observable<void> {
    const sources: Observable<void>[] = [];
    const canvasGroup = this.canvasService.getCanvasesPerCanvasGroup(
      currentCanvasGroupIndex,
    );

    if (!canvasGroup || canvasGroup.length === 0) {
      this.currentCanvasGroupHasTextSource.next(false);
      return EMPTY;
    }
    this.addAltoSource(canvasGroup[0], sources);
    if (canvasGroup.length === 2) {
      this.addAltoSource(canvasGroup[1], sources);
    }
    this.currentCanvasGroupHasTextSource.next(sources.length > 0);
    return sources.length > 0
      ? forkJoin(sources).pipe(
          take(1),
          map(() => undefined),
        )
      : EMPTY;
  }

  private addAltoSource(index: number, sources: Observable<void>[]) {
    if (this.manifest && this.manifest.sequences) {
      const seq = this.manifest.sequences[0];
      if (seq.canvases) {
        const canvas = seq.canvases[index];
        if (canvas && canvas.altoUrl) {
          sources.push(this.add(index, canvas.altoUrl));
        }
      }
    }
  }

  private add(index: number, url: string): Observable<void> {
    return new Observable((observer) => {
      if (this.isInCache(index)) {
        this.done(observer);
        return;
      }
      return this.load(observer, index, url);
    });
  }

  private isInCache(index: number) {
    return this.altos[index] !== undefined;
  }

  private load(observer: Subscriber<void>, index: number, url: string) {
    return this.http
      .get(url, {
        headers: new HttpHeaders().set('Content-Type', 'text/xml'),
        responseType: 'text',
      })
      .pipe(
        take(1),
        catchError((err) => of({ isError: true, error: err })),
      )
      .subscribe((data: Alto | any) => {
        try {
          if (!data.isError) {
            parseString(
              data,
              { explicitChildren: true, preserveChildrenOrder: true },
              (error, result) => {
                const alto = this.altoBuilder.withAltoXml(result.alto).build();
                this.addToCache(index, alto);
                this.done(observer);
              },
            );
          } else {
            throw data.err;
          }
        } catch {
          this.error(observer);
        }
      });
  }

  private addToCache(index: number, alto: Alto) {
    this.altos[index] = this.htmlFormatter.altoToHtml(alto);
  }

  private done(observer: Subscriber<void>) {
    this.complete(observer);
  }

  private error(observer: Subscriber<void>) {
    this.textError.next(this.intl.textContentErrorLabel);
    this.complete(observer);
  }

  private complete(observer: Subscriber<void>) {
    observer.next();
    observer.complete();
  }
}
