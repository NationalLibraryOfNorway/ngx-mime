import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Alto, String, TextLine } from './alto.model';
import { Hit } from './../../core/models/hit';

export class HtmlFormatter {
  constructor(private sanitizer: DomSanitizer, private searchQuery?: string[] | null | undefined, private hits?: Hit[]) {}

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
        html += ` style="${ styles.join(';') }"`;
      }
      html += `>${ this.transform(words.join(' ')) }<p/>`;
    });

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  transform(html: string): string {
    console.log("Her");
    if (this.hits && this.hits.length > 0) {
      return this.markMatch(html, this.hits[ 0 ].match.trim());
    } else {
      if (this.searchQuery) {
        for (const text of this.searchQuery) {
          html =
            text.length === 1
              ? this.markMatch(html, `(${ text }\\.)|( ${ text } )`)
              : this.markMatch(
                html,
                '\\b' + text.replace(/[^\w+\søæå]/gi, '') + '\\b'
              );
        }
      }
    }

    return html;
  }

  markMatch(html: string, pattern: string): string {
    return html.replace(
      new RegExp(pattern, 'gi'),
      (match: any) => `<mark>${ match }</mark>`
    );
  }

}
