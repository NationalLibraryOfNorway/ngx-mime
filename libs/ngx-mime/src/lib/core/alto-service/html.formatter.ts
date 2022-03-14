import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Alto, String, TextLine } from './alto.model';
import { Hit } from './../../core/models/hit';

export class HtmlFormatter {
  constructor(private sanitizer: DomSanitizer, private currentIndex: number, private hits?: Hit[], private selectedHit?: Hit,) {}

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

  private transform(html: string): string {
    if (this.hits && this.hits.length > 0) {
      for (const hit of this.hits) {
        //console.log("currentIndex: " +(this.currentIndex) + " " + "hit.label: " + hit.index + "hit.id: " + hit.id);
       if(hit.index === this.currentIndex){
        html = this.highlight(
          html + ' ',
            hit.match,
            hit.id,
            this.selectedHit
            );
       //   }
        }
      }
    }
    return html.trim();
  }

    private highlight(html: string, pattern: string, id?: number, selectedHit?: Hit): string {
      const wordBoundary = '\\b';
      //console.log(html.replace(new RegExp(wordBoundary + this.escapeSpecialCharacters(pattern)+"(?!<)"), `<mark ${selectedHit&&selectedHit.id === id ?  'style="background: #00ced1!important"' : ''} id="${id}">$&</mark>`))
      return html.replace(new RegExp(wordBoundary + this.escapeSpecialCharacters(pattern)+"(?!<)"), `<mark ${selectedHit&&selectedHit.id === id ?  'style="background: #ffe10099!important"' : ''} id="${id}">$&</mark>`);
  }

  /*
    "escapeAndRegexMatch" "\\" Is a escape character used to escape special 
    characters in the regexPattern, "$&" is a back reference to the whole match.

    "searchValuePattern" is a list of special characters to be escaped, 
    everything inside /[ ... ] including \s (whitespace) is to be escaped.
    
    text.substr(1) removes the first character of a string if the character is ", 
    this is a special case in order to highlight all words.
  */
  private escapeSpecialCharacters(text: string): string {
    const escapeAndRegexMatch = '\\$&';
    const searchValuePattern = /[-[\]{}()*"+?.,\\^$|#\s]/g;
    return text.charAt(0) === '"'
      ? text.substr(1).replace(searchValuePattern, escapeAndRegexMatch)
      : text.replace(searchValuePattern, escapeAndRegexMatch);
  }
}
