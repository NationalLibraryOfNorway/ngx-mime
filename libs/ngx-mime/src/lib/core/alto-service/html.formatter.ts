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

      var paragraphs = words.join(' ');

      if(this.searchQuery || this.hits){
        paragraphs = this.transform(paragraphs, this.searchQuery);
      }

      html += '<p';
      if (styles && styles.length > 0) {
        html += ` style="${styles.join(';')}"`;
      }
      html += `>${paragraphs}<p/>`;
    });


    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  transform(html: any, searchQuery: any): any {
    if(this.hits){
      if(this.hits.length === 1){
        return this.markMatch(html, this.hits[0].match.trim());
      } else if (this.hits.length === 0)
      return html;
    }
    for(const text of searchQuery) {
      html = text.length === 1 ? this.markMatch(html, `(${text}\\.)|( ${text} )`) : this.markMatch(html, "\\b"+text.replace(/[^\w+\søæå]/gi, '')+"\\b");
    }
    return html;
  }

  markMatch(html: any, pat: string){
    return html.replace(new RegExp(pat, "gi"), (match: any) => `<mark>${match}</mark>`);
  }

}
