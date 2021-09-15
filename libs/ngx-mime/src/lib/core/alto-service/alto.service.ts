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
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../intl/viewer-intl';
import { Manifest } from '../models/manifest';
import { Alto } from './alto.model';
import { HtmlFormatter } from './html.formatter';

@Injectable({
  providedIn: 'root',
})
export class AltoService {
  private altos: SafeHtml[] = [];
  private recognizedTextContentToggle = new BehaviorSubject(false);
  private isLoading = new BehaviorSubject(false);
  private textContentReady = new Subject<void>();
  private textError = new Subject<string>();
  private manifest: Manifest | null = null;
  private subscriptions = new Subscription();
  private altoBuilder = new AltoBuilder();
  private htmlFormatter: HtmlFormatter;

  constructor(
    public intl: MimeViewerIntl,
    private http: HttpClient,
    private iiifManifestService: IiifManifestService,
    private canvasService: CanvasService,
    sanitizer: DomSanitizer
  ) {
    this.htmlFormatter = new HtmlFormatter(sanitizer);
  }

  get onRecognizedTextContentToggleChange$(): Observable<boolean> {
    return this.recognizedTextContentToggle.asObservable();
  }

  get onTextContentReady$(): Observable<void> {
    return this.textContentReady.asObservable();
  }

  get isLoading$(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  get hasErrors$(): Observable<string> {
    return this.textError.asObservable();
  }

  get onRecognizedTextContentToggle() {
    return this.recognizedTextContentToggle.value;
  }

  set onRecognizedTextContentToggle(value: boolean) {
    this.recognizedTextContentToggle.next(value);
  }

  initialize() {
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
    this.subscriptions.unsubscribe();
    this.clearCache();
  }

  toggle() {
    this.onRecognizedTextContentToggle = !this.recognizedTextContentToggle.getValue();
  }

  getHtml(index: number): SafeHtml | undefined {
    return this.altos && this.altos.length >= index + 1
      ? this.altos[index]
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
            parseString(data, { explicitChildren: true, preserveChildrenOrder: true}, (error, result) => {
              const alto = this.altoBuilder.withAltoXml(result.alto).build();
              this.addToCache(index, alto);
              this.done(observer);
            });
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
