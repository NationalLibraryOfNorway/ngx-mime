import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Alto, String, TextLine } from './alto.model';

export class HtmlFormatter {
  constructor(private sanitizer: DomSanitizer, private searchQuery: string[] | null | undefined) {}

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
      html += `>${words.join(' ')}<p/>`;
    });

    if(this.searchQuery){
      html = this.transform(html, this.searchQuery);
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

    transform(html: any, searchQuery: any): any {
        if (!searchQuery) {return html;}
        for(const text of searchQuery) {
            var reText = new RegExp(text, 'gi');
            html = html.replace(reText, `<mark class="highlight">${text}</mark>`); 
        }
        return html;
    }
}
