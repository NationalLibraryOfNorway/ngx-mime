import { Injectable } from '@angular/core';
import { Hit } from './../../core/models/hit';

@Injectable({ providedIn: 'root' })
export class HighlightService {
  highlightSelectedHit(id: number): void {
    document.querySelector('.selectedHit')?.removeAttribute('class');
    document
      .querySelector(`mark[data-id='${id}']`)
      ?.setAttribute('class', 'selectedHit');
  }

  highlight(
    html: string,
    currentIndex: number,
    hits?: Hit[] | undefined,
  ): string {
    if (hits && hits.length > 0) {
      for (const hit of hits) {
        if (hit.index === currentIndex) {
          html = this.markHtml(html, hit.match, hit.id);
        }
      }
    }
    return html;
  }

  private markHtml(html: string, pattern: string, id?: number): string {
    const wordBoundary = '\\b';
    return html?.replace(
      new RegExp(
        wordBoundary + this.escapeSpecialCharacters(pattern) + '(?!<)',
      ),
      `<mark data-id="${id}">$&</mark>`,
    );
  }

  /*
    "escapeAndRegexMatch" "\\" Is a escape character used to escape special
    characters in the regexPattern, "$&" is a back reference to the whole match.

    "searchValuePattern" is a list of special characters to be escaped,
    everything inside /[ ... ] including \s (whitespace) is to be escaped.

    text.substring(1) removes the first character of a string if the character is ",
    this is a special case in order to highlight all words.
  */
  private escapeSpecialCharacters(text: string): string {
    const escapeAndRegexMatch = '\\$&';
    const searchValuePattern = /[-[\]{}()*"+?.,\\^$|#\s]/g;
    return text.charAt(0) === '"'
      ? text.substring(1).replace(searchValuePattern, escapeAndRegexMatch)
      : text.replace(searchValuePattern, escapeAndRegexMatch);
  }
}
