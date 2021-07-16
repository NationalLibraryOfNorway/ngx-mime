import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  BehaviorSubject,
  forkJoin,
  Observable,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import { catchError, debounceTime, map, take } from 'rxjs/operators';
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
  showText = false;
  private altos: SafeHtml[] = [];
  private _showText = new BehaviorSubject(false);
  private _isLoading = new BehaviorSubject(false);
  private _textReady = new Subject<void>();
  private _textError = new Subject<string>();
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

  get onShowTextChange(): Observable<boolean> {
    return this._showText.asObservable();
  }

  get onTextReady(): Observable<void> {
    return this._textReady.asObservable();
  }

  get isLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }

  get hasErrors(): Observable<string> {
    return this._textError.asObservable();
  }

  initialize() {
    this.subscriptions = new Subscription();

    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          this.manifest = manifest;
        }
      )
    );

    this.subscriptions.add(
      this.canvasService.onCanvasGroupIndexChange
        .pipe(debounceTime(200))
        .subscribe((currentCanvasGroupIndex: number) => {
          this._textError.next(undefined);

          const canvases = this.canvasService.getCanvasesPerCanvasGroup(
            currentCanvasGroupIndex
          );
          if (this.manifest && this.manifest.sequences) {
            const seq = this.manifest.sequences[0];
            if (seq.canvases) {
              const currentCanvases = [canvases.length];
              const index0 = canvases[0];
              currentCanvases[0] = index0;
              const can1 = seq.canvases[index0];
              const sources: Observable<void>[] = [];
              if (can1 && can1.altoUrl) {
                sources.push(this.add(index0, can1.altoUrl));
              }
              if (canvases.length === 2) {
                const index1 = canvases[1];
                currentCanvases[1] = index1;
                const can2 = seq.canvases[index1];
                if (can2 && can2.altoUrl) {
                  sources.push(this.add(index1, can2.altoUrl));
                }
              }
              this._isLoading.next(true);
              forkJoin(sources)
                .pipe(take(1))
                .subscribe((val) => {
                  this._isLoading.next(false);
                });
            }
          }
        })
    );
  }

  destroy() {
    this.showText = false;
    this.altos = [];
    this._showText.next(false);
    this.subscriptions.unsubscribe();
  }

  toggle() {
    this.showText = !this.showText;
    this._showText.next(this.showText);
  }

  getHtml(index: number): SafeHtml | undefined {
    return this.altos && this.altos.length >= index
      ? this.altos[index]
      : undefined;
  }

  private add(index: number, url: string): Observable<void> {
    console.log('tester');

    return new Observable((observer) => {
      if (this.altos[index]) {
        this._textReady.next();
        observer.next();
        observer.complete();
        return;
      }

      this.http
        .get(url, {
          headers: new HttpHeaders().set('Content-Type', 'text/xml'),
          responseType: 'text',
        })
        .pipe(
          take(1),
          map((altoXml: any) => {
            let alto!: Alto;
            parseString(altoXml, {}, (error, result) => {
              if (error) {
                throw error;
              } else {
                alto = this.altoBuilder.withAltoXml(result.alto).build();
              }
            });
            return alto;
          }),
          catchError((err) => of({ isError: true, error: err }))
        )
        .subscribe((data: Alto | any) => {
          try {
            if (!data.isError) {
              this.altos[index] = this.htmlFormatter.altoToHtml(data);
              this._textReady.next();
            } else {
              this._textError.next(this.intl.textErrorLabel);
            }
          } finally {
            observer.next();
            observer.complete();
          }
        });
    });
  }
}
