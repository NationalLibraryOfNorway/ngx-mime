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
}
HighlightService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: HighlightService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
HighlightService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: HighlightService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: HighlightService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9oaWdobGlnaHQtc2VydmljZS9oaWdobGlnaHQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU0zQyxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLG9CQUFvQixDQUFDLEVBQVU7UUFDN0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFBRSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakUsUUFBUTthQUNMLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUM7WUFDdkMsRUFBRSxZQUFZLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxTQUFTLENBQ1AsSUFBWSxFQUNaLFlBQW9CLEVBQ3BCLElBQXdCO1FBRXhCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUN0QixJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssWUFBWSxFQUFFO29CQUM5QixJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQy9DO2FBQ0Y7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVPLFFBQVEsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLEVBQVc7UUFDekQsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzNCLE9BQU8sSUFBSSxFQUFFLE9BQU8sQ0FDbEIsSUFBSSxNQUFNLENBQ1IsWUFBWSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQy9ELEVBQ0Qsa0JBQWtCLEVBQUUsYUFBYSxDQUNsQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7TUFTRTtJQUNNLHVCQUF1QixDQUFDLElBQVk7UUFDMUMsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUM7UUFDbkMsTUFBTSxrQkFBa0IsR0FBRywyQkFBMkIsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRztZQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsbUJBQW1CLENBQUM7WUFDcEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUM1RCxDQUFDOzs2R0FqRFUsZ0JBQWdCO2lIQUFoQixnQkFBZ0IsY0FGZixNQUFNOzJGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIaXQgfSBmcm9tICcuLy4uLy4uL2NvcmUvbW9kZWxzL2hpdCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRTZXJ2aWNlIHtcbiAgaGlnaGxpZ2h0U2VsZWN0ZWRIaXQoaWQ6IG51bWJlcik6IHZvaWQge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZEhpdCcpPy5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGBtYXJrW2RhdGEtaWQ9JyR7aWR9J11gKVxuICAgICAgPy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NlbGVjdGVkSGl0Jyk7XG4gIH1cblxuICBoaWdobGlnaHQoXG4gICAgaHRtbDogc3RyaW5nLFxuICAgIGN1cnJlbnRJbmRleDogbnVtYmVyLFxuICAgIGhpdHM/OiBIaXRbXSB8IHVuZGVmaW5lZFxuICApOiBzdHJpbmcge1xuICAgIGlmIChoaXRzICYmIGhpdHMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChjb25zdCBoaXQgb2YgaGl0cykge1xuICAgICAgICBpZiAoaGl0LmluZGV4ID09PSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgICBodG1sID0gdGhpcy5tYXJrSHRtbChodG1sLCBoaXQubWF0Y2gsIGhpdC5pZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGh0bWw7XG4gIH1cblxuICBwcml2YXRlIG1hcmtIdG1sKGh0bWw6IHN0cmluZywgcGF0dGVybjogc3RyaW5nLCBpZD86IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3Qgd29yZEJvdW5kYXJ5ID0gJ1xcXFxiJztcbiAgICByZXR1cm4gaHRtbD8ucmVwbGFjZShcbiAgICAgIG5ldyBSZWdFeHAoXG4gICAgICAgIHdvcmRCb3VuZGFyeSArIHRoaXMuZXNjYXBlU3BlY2lhbENoYXJhY3RlcnMocGF0dGVybikgKyAnKD8hPCknXG4gICAgICApLFxuICAgICAgYDxtYXJrIGRhdGEtaWQ9XCIke2lkfVwiPiQmPC9tYXJrPmBcbiAgICApO1xuICB9XG5cbiAgLypcbiAgICBcImVzY2FwZUFuZFJlZ2V4TWF0Y2hcIiBcIlxcXFxcIiBJcyBhIGVzY2FwZSBjaGFyYWN0ZXIgdXNlZCB0byBlc2NhcGUgc3BlY2lhbCBcbiAgICBjaGFyYWN0ZXJzIGluIHRoZSByZWdleFBhdHRlcm4sIFwiJCZcIiBpcyBhIGJhY2sgcmVmZXJlbmNlIHRvIHRoZSB3aG9sZSBtYXRjaC5cblxuICAgIFwic2VhcmNoVmFsdWVQYXR0ZXJuXCIgaXMgYSBsaXN0IG9mIHNwZWNpYWwgY2hhcmFjdGVycyB0byBiZSBlc2NhcGVkLCBcbiAgICBldmVyeXRoaW5nIGluc2lkZSAvWyAuLi4gXSBpbmNsdWRpbmcgXFxzICh3aGl0ZXNwYWNlKSBpcyB0byBiZSBlc2NhcGVkLlxuICAgIFxuICAgIHRleHQuc3Vic3RyaW5nKDEpIHJlbW92ZXMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBhIHN0cmluZyBpZiB0aGUgY2hhcmFjdGVyIGlzIFwiLCBcbiAgICB0aGlzIGlzIGEgc3BlY2lhbCBjYXNlIGluIG9yZGVyIHRvIGhpZ2hsaWdodCBhbGwgd29yZHMuXG4gICovXG4gIHByaXZhdGUgZXNjYXBlU3BlY2lhbENoYXJhY3RlcnModGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBlc2NhcGVBbmRSZWdleE1hdGNoID0gJ1xcXFwkJic7XG4gICAgY29uc3Qgc2VhcmNoVmFsdWVQYXR0ZXJuID0gL1stW1xcXXt9KCkqXCIrPy4sXFxcXF4kfCNcXHNdL2c7XG4gICAgcmV0dXJuIHRleHQuY2hhckF0KDApID09PSAnXCInXG4gICAgICA/IHRleHQuc3Vic3RyaW5nKDEpLnJlcGxhY2Uoc2VhcmNoVmFsdWVQYXR0ZXJuLCBlc2NhcGVBbmRSZWdleE1hdGNoKVxuICAgICAgOiB0ZXh0LnJlcGxhY2Uoc2VhcmNoVmFsdWVQYXR0ZXJuLCBlc2NhcGVBbmRSZWdleE1hdGNoKTtcbiAgfVxufVxuIl19