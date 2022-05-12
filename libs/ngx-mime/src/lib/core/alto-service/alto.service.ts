import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  BehaviorSubject,
  forkJoin,
  Observable,
  of,
  Subject,
  Subscriber,
  Subscription,
} from 'rxjs';
import { catchError, debounceTime, finalize, take } from 'rxjs/operators';
import { parseString } from 'xml2js';
import { AltoBuilder } from '../builders/alto';
import { CanvasService } from '../canvas-service/canvas-service';
import { HighlightService } from '../highlight-service/highlight.service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../intl';
import { MimeViewerConfig } from '../mime-viewer-config';
import { RecognizedTextMode, RecognizedTextModeChanges } from '../models';
import { Manifest } from '../models/manifest';
import { Hit } from './../../core/models/hit';
import { Alto } from './alto.model';
import { HtmlFormatter } from './html.formatter';

@Injectable({
  providedIn: 'root',
})
export class AltoService {
  private config!: MimeViewerConfig;
  private altos: string[] = [];
  private isLoading = new BehaviorSubject(false);
  private textContentReady = new Subject<void>();
  private textError = new Subject<string | undefined>();
  private manifest: Manifest | null = null;
  private subscriptions = new Subscription();
  private altoBuilder = new AltoBuilder();
  private htmlFormatter!: HtmlFormatter;
  private hits: Hit[] | undefined;
  private _recognizedTextContentModeChanges =
    new BehaviorSubject<RecognizedTextModeChanges>({
      previousValue: RecognizedTextMode.NONE,
      currentValue: RecognizedTextMode.NONE,
    });
  private previousRecognizedTextMode = RecognizedTextMode.NONE;

  constructor(
    public intl: MimeViewerIntl,
    private http: HttpClient,
    private iiifManifestService: IiifManifestService,
    private highlightService: HighlightService,
    private canvasService: CanvasService,
    private sanitizer: DomSanitizer
  ) {}

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

  get recognizedTextContentMode() {
    return this._recognizedTextContentModeChanges.value.currentValue;
  }

  set recognizedTextContentMode(value: RecognizedTextMode) {
    this._recognizedTextContentModeChanges.next({
      currentValue: value,
      previousValue: this.previousRecognizedTextMode,
    });
    this.previousRecognizedTextMode = value;
  }

  initialize(hits?: Hit[]) {
    this.hits = hits;
    this.htmlFormatter = new HtmlFormatter();
    this.subscriptions = new Subscription();

    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          this.manifest = manifest;
          this.clearCache();
        }
      )
    );

    this.subscriptions.add(
      this.canvasService.onCanvasGroupIndexChange
        .pipe(debounceTime(200))
        .subscribe((currentCanvasGroupIndex: number) => {
          this.textError.next(undefined);
          const sources: Observable<void>[] = [];

          const canvasGroup = this.canvasService.getCanvasesPerCanvasGroup(
            currentCanvasGroupIndex
          );

          if (!canvasGroup || canvasGroup.length === 0) {
            return;
          }
          this.addAltoSource(canvasGroup[0], sources);
          if (canvasGroup.length === 2) {
            this.addAltoSource(canvasGroup[1], sources);
          }
          this.isLoading.next(true);
          forkJoin(sources)
            .pipe(
              take(1),
              finalize(() => this.isLoading.next(false))
            )
            .subscribe();
        })
    );
  }

  destroy() {
    this.recognizedTextContentMode = this.config?.initRecognizedTextContentMode
      ? this.config?.initRecognizedTextContentMode
      : RecognizedTextMode.NONE;

    this.subscriptions.unsubscribe();
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

  hideRecognizedTextContent() {
    this.recognizedTextContentMode = RecognizedTextMode.NONE;
  }

  getHtml(index: number): SafeHtml | undefined {
    return this.altos && this.altos.length >= index + 1
      ? this.sanitizer.bypassSecurityTrustHtml(
          this.highlightService.highlight(this.altos[index], index, this.hits)
        )
      : undefined;
  }

  clearCache() {
    this.altos = [];
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
      } else {
        this.load(observer, index, url);
      }
    });
  }

  private isInCache(index: number) {
    return this.altos[index];
  }

  private load(observer: Subscriber<void>, index: number, url: string) {
    this.http
      .get(url, {
        headers: new HttpHeaders().set('Content-Type', 'text/xml'),
        responseType: 'text',
      })
      .pipe(
        take(1),
        catchError((err) => of({ isError: true, error: err }))
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
              }
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
    this.textContentReady.next();
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
