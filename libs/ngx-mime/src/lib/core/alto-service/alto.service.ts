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
import { CanvasService } from '../canvas-service/canvas-service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../intl/viewer-intl';
import { Manifest } from '../models/manifest';
import {
  Alto,
  Layout,
  Page,
  PrintSpace,
  String,
  TextBlock,
  TextLine,
  TextStyle,
} from './alto.model';

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

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public intl: MimeViewerIntl,
    private iiifManifestService: IiifManifestService,
    private canvasService: CanvasService
  ) {}

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

  add(index: number, url: string): Observable<void> {
    return new Observable((observer) => {
      if (this.altos[index]) {
        this._textReady.next();
        observer.next();
        observer.complete();
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
                alto = this.extractAlto(result.alto);
              }
            });
            return alto;
          }),
          catchError((err) => of({ isError: true, error: err }))
        )
        .subscribe((data: Alto | any) => {
          if (!data.isError) {
            const html = this.toHtml(data);
            this.altos[index] = html;
            this._textReady.next();
          } else {
            console.log('error', data.error);
            this._textError.next(this.intl.textErrorLabel);
          }
          observer.next();
          observer.complete();
        });
    });
  }

  getHtml(index: number): SafeHtml | undefined {
    return this.altos && this.altos.length >= index
      ? this.altos[index]
      : undefined;
  }

  private extractAlto(altoXml: any): Alto {
    let fontStyles: Map<string, TextStyle> = new Map();
    if (altoXml.Styles) {
      this.extractTextStyles((fontStyles = altoXml.Styles[0]));
    }
    return {
      layout: this.extractLayout(altoXml.Layout[0], fontStyles),
    };
  }

  private toHtml(alto: Alto): SafeHtml {
    let html = '';

    const page = alto.layout.page;
    const textBlocks = [
      ...page.topMargin.textBlocks,
      ...page.leftMargin.textBlocks,
      ...page.printSpace.textBlocks,
      ...page.bottomMargin.textBlocks,
    ];
    textBlocks.forEach((textBlock) => {
      let words: string[] = [];
      textBlock.textLines.forEach((textLine: TextLine) => {
        textLine.strings.forEach((string: String) => {
          words.push(string.content);
        });
      });
      const styles: string[] = [];
      if (textBlock?.textStyle?.fontStyle === 'bold') {
        styles.push('font-weight: bold');
      }
      /*
      if (textBlock?.textStyle?.fontSize) {
        styles.push(`font-size: ${textBlock?.textStyle?.fontSize}px`);
      }
      */
      html += `<p style="${styles.join(';')}">${words.join(' ')}<p/>`;
    });
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private extractTextStyles(stylesXml: any): Map<string, TextStyle> {
    const textStyles: Map<string, TextStyle> = new Map();
    if (stylesXml.TextStyle) {
      stylesXml.TextStyle.forEach((textStyle: any) => {
        textStyles.set(textStyle.$.ID, {
          fontSize: textStyle.$.FONTSIZE,
          fontStyle: textStyle.$.FONTSTYLE,
        });
      });
    }
    return textStyles;
  }

  private extractLayout(
    layoutXml: any,
    textStyles: Map<string, TextStyle>
  ): Layout {
    return {
      page: this.extractPage(layoutXml.Page[0], textStyles),
    };
  }

  private extractPage(pageXml: any, textStyles: Map<string, TextStyle>): Page {
    return {
      topMargin: this.extractPrintSpace(pageXml.TopMargin[0], textStyles),
      leftMargin: this.extractPrintSpace(pageXml.LeftMargin[0], textStyles),
      rightMargin: this.extractPrintSpace(pageXml.RightMargin[0], textStyles),
      bottomMargin: this.extractPrintSpace(pageXml.BottomMargin[0], textStyles),
      printSpace: this.extractPrintSpace(pageXml.PrintSpace[0], textStyles),
    };
  }

  private extractPrintSpace(
    printSpaceXml: any,
    textStyles: Map<string, TextStyle>
  ): PrintSpace {
    return {
      textBlocks: this.extractTextBlocks(printSpaceXml.TextBlock, textStyles),
    };
  }

  private extractTextBlocks(
    textBlocksXml: any[],
    textStyles: Map<string, TextStyle>
  ): TextBlock[] {
    return textBlocksXml
      ? textBlocksXml.map((textBlock: any) => {
          const styleRef = textBlock.$.STYLEREFS?.split(' ');
          let textStyle = undefined;
          if (styleRef) {
            textStyle = textStyles.get(styleRef[0]);
          }
          return {
            textLines: this.extractTextLines(textBlock.TextLine),
            textStyle: {
              fontSize: textStyle?.fontSize,
              fontStyle: textStyle?.fontStyle,
            },
          };
        })
      : [];
  }

  private extractTextLines(textLinesXml: any): TextLine[] {
    return textLinesXml
      ? textLinesXml.map((textLine: any) => {
          const strings = this.extractStrings(textLine.String);
          return { strings: strings };
        })
      : [];
  }

  private extractStrings(stringXml: any): String[] {
    return stringXml
      ? stringXml.map((string: any) => {
          return { content: string.$.CONTENT };
        })
      : [];
  }
}
