import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { parseString } from 'xml2js';
import {
  Alto,
  Layout,
  Page,
  PrintSpace,
  TextBlock,
  TextLine,
} from './alto.model';

@Injectable({
  providedIn: 'root',
})
export class AltoService {
  showText = false;
  private altos: Alto[] = [];
  private _showText = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  get onShowTextChange(): Observable<boolean> {
    return this._showText.asObservable();
  }

  toggle() {
    this.showText = !this.showText;
    this._showText.next(this.showText);
  }

  add(index: number, url: string): void {
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
              try {
                alto = this.extractAlto(result.alto);
              } catch (e) {
                console.error(e);
                throw e;
              }
            }
          });
          return alto;
        })
      )
      .subscribe((data) => {
        this.altos[index] = data;
      });
  }

  getAlto(index: number): Alto | undefined {
    return this.altos && this.altos.length >= index
      ? this.altos[index]
      : undefined;
  }

  private extractAlto(altoXml: any): Alto {
    return {
      layout: this.extractLayout(altoXml.Layout[0]),
    };
  }

  private extractLayout(layoutXml: any): Layout {
    return {
      page: this.extractPage(layoutXml.Page[0]),
    };
  }

  private extractPage(pageXml: any): Page {
    return {
      printSpace: this.extractPrintSpace(pageXml.PrintSpace[0]),
    };
  }

  private extractPrintSpace(printSpaceXml: any): PrintSpace {
    return {
      textBlocks: this.extractTextBlocks(printSpaceXml.TextBlock),
    };
  }

  private extractTextBlocks(textBlocksXml: any[]): TextBlock[] {
    return textBlocksXml.map((textBlock: any) => {
      return { textLines: this.extractTextLines(textBlock.TextLine) };
    });
  }

  private extractTextLines(textLinesXml: any): TextLine[] {
    return textLinesXml.map((textLine: any) => {
      const strings = this.extractStrings(textLine.String);
      return { strings: strings };
    });
  }

  private extractStrings(stringXml: any): String[] {
    return stringXml.map((string: any) => {
      return { content: string.$.CONTENT };
    });
  }
}
