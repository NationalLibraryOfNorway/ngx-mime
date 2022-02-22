import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Alto, String, TextLine } from './alto.model';
import { Hit } from './../../core/models/hit';

export class HtmlFormatter {
  constructor(
    private sanitizer: DomSanitizer,
    private hits?: Hit[]
  ) {}

  altoToHtml(alto: Alto): SafeHtml {
    const page = alto.layout.page;
    let html = '';
    let textBlocks: any[] = [];

    if (page.topMargin.textBlocks) {
      textBlocks = [...textBlocks, ...page.topMargin.textBlocks];
    }
    if (page.leftMargin.textBlocks) {
      textBlocks = [...textBlocks, ...page.leftMargin.textBlocks];
    }
    if (page.printSpace.textBlocks) {
      textBlocks = [...textBlocks, ...page.printSpace.textBlocks];
    }
    if (page.bottomMargin.textBlocks) {
      textBlocks = [...textBlocks, ...page.bottomMargin.textBlocks];
    }

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

      html += '<p';
      if (styles && styles.length > 0) {
        html += ` style="${styles.join(';')}"`;
      }
      html += `>${this.transform(words.join(' '))}<p/>`;
    });

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  transform(html: string): string {
    if (this.hits && this.hits.length > 0) {
      for (const hit of this.hits) {
          html = this.markMatch(html+' ', '\\b'+this.escape(hit.match));
      }
    }
    return html.trim();
  }

  markMatch(html: string, pattern: string): string {
    return html.replace(
      new RegExp(pattern, 'gi'),
      (match: any) => `<mark>${match}</mark>`
    );
  }

  escape(text: string): string {
    const pattern = /[-[\]{}()*"+?.,\\^$|#\s]/g;
    return text.charAt(0)==='"'? 
    text.substr(1).replace(pattern, '\\$&'):
    text.replace(pattern, '\\$&');
  }
}
