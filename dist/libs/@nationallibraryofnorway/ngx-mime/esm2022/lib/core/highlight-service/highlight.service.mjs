import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class HighlightService {
    highlightSelectedHit(id) {
        document.querySelector('.selectedHit')?.removeAttribute('class');
        document
            .querySelector(`mark[data-id='${id}']`)
            ?.setAttribute('class', 'selectedHit');
    }
    highlight(html, currentIndex, hits) {
        if (hits && hits.length > 0) {
            for (const hit of hits) {
                if (hit.index === currentIndex) {
                    html = this.markHtml(html, hit.match, hit.id);
                }
            }
        }
        return html;
    }
    markHtml(html, pattern, id) {
        const wordBoundary = '\\b';
        return html?.replace(new RegExp(wordBoundary + this.escapeSpecialCharacters(pattern) + '(?!<)'), `<mark data-id="${id}">$&</mark>`);
    }
    /*
      "escapeAndRegexMatch" "\\" Is a escape character used to escape special
      characters in the regexPattern, "$&" is a back reference to the whole match.
  
      "searchValuePattern" is a list of special characters to be escaped,
      everything inside /[ ... ] including \s (whitespace) is to be escaped.
  
      text.substring(1) removes the first character of a string if the character is ",
      this is a special case in order to highlight all words.
    */
    escapeSpecialCharacters(text) {
        const escapeAndRegexMatch = '\\$&';
        const searchValuePattern = /[-[\]{}()*"+?.,\\^$|#\s]/g;
        return text.charAt(0) === '"'
            ? text.substring(1).replace(searchValuePattern, escapeAndRegexMatch)
            : text.replace(searchValuePattern, escapeAndRegexMatch);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HighlightService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HighlightService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HighlightService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9oaWdobGlnaHQtc2VydmljZS9oaWdobGlnaHQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUkzQyxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLG9CQUFvQixDQUFDLEVBQVU7UUFDN0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFBRSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakUsUUFBUTthQUNMLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUM7WUFDdkMsRUFBRSxZQUFZLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxTQUFTLENBQ1AsSUFBWSxFQUNaLFlBQW9CLEVBQ3BCLElBQXdCO1FBRXhCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUN0QixJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssWUFBWSxFQUFFO29CQUM5QixJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQy9DO2FBQ0Y7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVPLFFBQVEsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLEVBQVc7UUFDekQsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzNCLE9BQU8sSUFBSSxFQUFFLE9BQU8sQ0FDbEIsSUFBSSxNQUFNLENBQ1IsWUFBWSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQy9ELEVBQ0Qsa0JBQWtCLEVBQUUsYUFBYSxDQUNsQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7TUFTRTtJQUNNLHVCQUF1QixDQUFDLElBQVk7UUFDMUMsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUM7UUFDbkMsTUFBTSxrQkFBa0IsR0FBRywyQkFBMkIsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRztZQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsbUJBQW1CLENBQUM7WUFDcEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUM1RCxDQUFDOzhHQWpEVSxnQkFBZ0I7a0hBQWhCLGdCQUFnQjs7MkZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhpdCB9IGZyb20gJy4vLi4vLi4vY29yZS9tb2RlbHMvaGl0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhpZ2hsaWdodFNlcnZpY2Uge1xuICBoaWdobGlnaHRTZWxlY3RlZEhpdChpZDogbnVtYmVyKTogdm9pZCB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkSGl0Jyk/LnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYG1hcmtbZGF0YS1pZD0nJHtpZH0nXWApXG4gICAgICA/LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2VsZWN0ZWRIaXQnKTtcbiAgfVxuXG4gIGhpZ2hsaWdodChcbiAgICBodG1sOiBzdHJpbmcsXG4gICAgY3VycmVudEluZGV4OiBudW1iZXIsXG4gICAgaGl0cz86IEhpdFtdIHwgdW5kZWZpbmVkXG4gICk6IHN0cmluZyB7XG4gICAgaWYgKGhpdHMgJiYgaGl0cy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGNvbnN0IGhpdCBvZiBoaXRzKSB7XG4gICAgICAgIGlmIChoaXQuaW5kZXggPT09IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgIGh0bWwgPSB0aGlzLm1hcmtIdG1sKGh0bWwsIGhpdC5tYXRjaCwgaGl0LmlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaHRtbDtcbiAgfVxuXG4gIHByaXZhdGUgbWFya0h0bWwoaHRtbDogc3RyaW5nLCBwYXR0ZXJuOiBzdHJpbmcsIGlkPzogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCB3b3JkQm91bmRhcnkgPSAnXFxcXGInO1xuICAgIHJldHVybiBodG1sPy5yZXBsYWNlKFxuICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgd29yZEJvdW5kYXJ5ICsgdGhpcy5lc2NhcGVTcGVjaWFsQ2hhcmFjdGVycyhwYXR0ZXJuKSArICcoPyE8KSdcbiAgICAgICksXG4gICAgICBgPG1hcmsgZGF0YS1pZD1cIiR7aWR9XCI+JCY8L21hcms+YFxuICAgICk7XG4gIH1cblxuICAvKlxuICAgIFwiZXNjYXBlQW5kUmVnZXhNYXRjaFwiIFwiXFxcXFwiIElzIGEgZXNjYXBlIGNoYXJhY3RlciB1c2VkIHRvIGVzY2FwZSBzcGVjaWFsXG4gICAgY2hhcmFjdGVycyBpbiB0aGUgcmVnZXhQYXR0ZXJuLCBcIiQmXCIgaXMgYSBiYWNrIHJlZmVyZW5jZSB0byB0aGUgd2hvbGUgbWF0Y2guXG5cbiAgICBcInNlYXJjaFZhbHVlUGF0dGVyblwiIGlzIGEgbGlzdCBvZiBzcGVjaWFsIGNoYXJhY3RlcnMgdG8gYmUgZXNjYXBlZCxcbiAgICBldmVyeXRoaW5nIGluc2lkZSAvWyAuLi4gXSBpbmNsdWRpbmcgXFxzICh3aGl0ZXNwYWNlKSBpcyB0byBiZSBlc2NhcGVkLlxuXG4gICAgdGV4dC5zdWJzdHJpbmcoMSkgcmVtb3ZlcyB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIGEgc3RyaW5nIGlmIHRoZSBjaGFyYWN0ZXIgaXMgXCIsXG4gICAgdGhpcyBpcyBhIHNwZWNpYWwgY2FzZSBpbiBvcmRlciB0byBoaWdobGlnaHQgYWxsIHdvcmRzLlxuICAqL1xuICBwcml2YXRlIGVzY2FwZVNwZWNpYWxDaGFyYWN0ZXJzKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgZXNjYXBlQW5kUmVnZXhNYXRjaCA9ICdcXFxcJCYnO1xuICAgIGNvbnN0IHNlYXJjaFZhbHVlUGF0dGVybiA9IC9bLVtcXF17fSgpKlwiKz8uLFxcXFxeJHwjXFxzXS9nO1xuICAgIHJldHVybiB0ZXh0LmNoYXJBdCgwKSA9PT0gJ1wiJ1xuICAgICAgPyB0ZXh0LnN1YnN0cmluZygxKS5yZXBsYWNlKHNlYXJjaFZhbHVlUGF0dGVybiwgZXNjYXBlQW5kUmVnZXhNYXRjaClcbiAgICAgIDogdGV4dC5yZXBsYWNlKHNlYXJjaFZhbHVlUGF0dGVybiwgZXNjYXBlQW5kUmVnZXhNYXRjaCk7XG4gIH1cbn1cbiJdfQ==