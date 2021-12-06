import { Injectable } from '@angular/core';
import { MimeViewerIntl } from './viewer-intl';
import { HelpIntlNoNb } from './help-intl.no_nb';
import * as i0 from "@angular/core";
export class MimeViewerIntlNoNb extends MimeViewerIntl {
    constructor() {
        super(...arguments);
        this.help = new HelpIntlNoNb();
        this.closeLabel = 'Lukk';
        this.attributionLabel = 'Tillatelse';
        this.attributonCloseAriaLabel = 'Steng tillatelse dialog';
        this.recognizedTextContentLabel = 'Gjenkjent tekst';
        this.contentsLabel = 'Innhold';
        this.twoPageViewLabel = 'Tosidevisning';
        this.singlePageViewLabel = 'Enkeltsidevisning';
        this.metadataLabel = 'Metadata';
        this.licenseLabel = 'Lisens';
        this.tocLabel = 'Innholdsfortegnelse';
        this.fullScreenLabel = 'Fullskjerm';
        this.exitFullScreenLabel = 'Avslutt fullskjerm';
        this.zoomInLabel = 'Zoom inn';
        this.zoomOutLabel = 'Zoom ut';
        this.previousPageLabel = 'Forrige side';
        this.nextPageLabel = 'Neste side';
        this.homeLabel = 'Hjem';
        this.rotateCwLabel = 'Rotér 90°';
        this.searchLabel = 'Søk';
        this.clearSearchLabel = 'Tøm';
        this.previousHitLabel = 'Forrige treff';
        this.nextHitLabel = 'Neste treff';
        this.goToPageLabel = 'Gå til side';
        this.currentPageLabel = 'Nåværende side';
        this.enterPageNumber = 'Skriv inn sidenummer';
        this.dropDisabled = 'Beklager, men drag and drop er ikke aktivert';
        this.loading = 'Laster ...';
        // ERRORS
        this.somethingHasGoneWrongLabel = 'Å nei! Noe har gått galt...';
        this.manifestUriMissingLabel = 'Lenke til manifest mangler';
        this.manifestNotValidLabel = 'Manifestet er ikke gyldig';
        this.pageDoesNotExists = 'Beklager, men den siden finnes ikke';
        this.textContentErrorLabel = 'Beklager, men jeg finner ikke teksten for deg';
        this.noResultsFoundLabel = (q) => {
            return `Ingen treff funnet for <em class="current-search">${q}</em>`;
        };
        this.resultsFoundLabel = (numberOfHits, q) => {
            return `${numberOfHits} treff funnet for <em class="current-search">${q}</em>`;
        };
        this.currentHitLabel = (currentHit, numberOfHits) => {
            return `${currentHit} av ${numberOfHits} treff`;
        };
    }
}
MimeViewerIntlNoNb.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeViewerIntlNoNb, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
MimeViewerIntlNoNb.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeViewerIntlNoNb });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeViewerIntlNoNb, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwubm9fbmIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLm5vX25iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBR2pELE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxjQUFjO0lBRHREOztRQUVFLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFCLGVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIscUJBQWdCLEdBQUcsWUFBWSxDQUFDO1FBQ2hDLDZCQUF3QixHQUFHLHlCQUF5QixDQUFDO1FBQ3JELCtCQUEwQixHQUFHLGlCQUFpQixDQUFDO1FBQy9DLGtCQUFhLEdBQUcsU0FBUyxDQUFDO1FBQzFCLHFCQUFnQixHQUFHLGVBQWUsQ0FBQztRQUNuQyx3QkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztRQUMxQyxrQkFBYSxHQUFHLFVBQVUsQ0FBQztRQUMzQixpQkFBWSxHQUFHLFFBQVEsQ0FBQztRQUN4QixhQUFRLEdBQUcscUJBQXFCLENBQUM7UUFDakMsb0JBQWUsR0FBRyxZQUFZLENBQUM7UUFDL0Isd0JBQW1CLEdBQUcsb0JBQW9CLENBQUM7UUFDM0MsZ0JBQVcsR0FBRyxVQUFVLENBQUM7UUFDekIsaUJBQVksR0FBRyxTQUFTLENBQUM7UUFDekIsc0JBQWlCLEdBQUcsY0FBYyxDQUFDO1FBQ25DLGtCQUFhLEdBQUcsWUFBWSxDQUFDO1FBQzdCLGNBQVMsR0FBRyxNQUFNLENBQUM7UUFDbkIsa0JBQWEsR0FBRyxXQUFXLENBQUM7UUFDNUIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLHFCQUFnQixHQUFHLGVBQWUsQ0FBQztRQUNuQyxpQkFBWSxHQUFHLGFBQWEsQ0FBQztRQUM3QixrQkFBYSxHQUFHLGFBQWEsQ0FBQztRQUM5QixxQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUNwQyxvQkFBZSxHQUFHLHNCQUFzQixDQUFDO1FBQ3pDLGlCQUFZLEdBQUcsOENBQThDLENBQUM7UUFDOUQsWUFBTyxHQUFHLFlBQVksQ0FBQztRQUV2QixTQUFTO1FBQ1QsK0JBQTBCLEdBQUcsNkJBQTZCLENBQUM7UUFDM0QsNEJBQXVCLEdBQUcsNEJBQTRCLENBQUM7UUFDdkQsMEJBQXFCLEdBQUcsMkJBQTJCLENBQUM7UUFDcEQsc0JBQWlCLEdBQUcscUNBQXFDLENBQUM7UUFDMUQsMEJBQXFCLEdBQUcsK0NBQStDLENBQUM7UUFFeEUsd0JBQW1CLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRTtZQUNsQyxPQUFPLHFEQUFxRCxDQUFDLE9BQU8sQ0FBQztRQUN2RSxDQUFDLENBQUM7UUFFRixzQkFBaUIsR0FBRyxDQUFDLFlBQW9CLEVBQUUsQ0FBUyxFQUFFLEVBQUU7WUFDdEQsT0FBTyxHQUFHLFlBQVksZ0RBQWdELENBQUMsT0FBTyxDQUFDO1FBQ2pGLENBQUMsQ0FBQztRQUVGLG9CQUFlLEdBQUcsQ0FBQyxVQUFrQixFQUFFLFlBQW9CLEVBQUUsRUFBRTtZQUM3RCxPQUFPLEdBQUcsVUFBVSxPQUFPLFlBQVksUUFBUSxDQUFDO1FBQ2xELENBQUMsQ0FBQztLQUNIOzsrR0FoRFksa0JBQWtCO21IQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBIZWxwSW50bE5vTmIgfSBmcm9tICcuL2hlbHAtaW50bC5ub19uYic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNaW1lVmlld2VySW50bE5vTmIgZXh0ZW5kcyBNaW1lVmlld2VySW50bCB7XG4gIGhlbHAgPSBuZXcgSGVscEludGxOb05iKCk7XG4gIGNsb3NlTGFiZWwgPSAnTHVrayc7XG4gIGF0dHJpYnV0aW9uTGFiZWwgPSAnVGlsbGF0ZWxzZSc7XG4gIGF0dHJpYnV0b25DbG9zZUFyaWFMYWJlbCA9ICdTdGVuZyB0aWxsYXRlbHNlIGRpYWxvZyc7XG4gIHJlY29nbml6ZWRUZXh0Q29udGVudExhYmVsID0gJ0dqZW5ramVudCB0ZWtzdCc7XG4gIGNvbnRlbnRzTGFiZWwgPSAnSW5uaG9sZCc7XG4gIHR3b1BhZ2VWaWV3TGFiZWwgPSAnVG9zaWRldmlzbmluZyc7XG4gIHNpbmdsZVBhZ2VWaWV3TGFiZWwgPSAnRW5rZWx0c2lkZXZpc25pbmcnO1xuICBtZXRhZGF0YUxhYmVsID0gJ01ldGFkYXRhJztcbiAgbGljZW5zZUxhYmVsID0gJ0xpc2Vucyc7XG4gIHRvY0xhYmVsID0gJ0lubmhvbGRzZm9ydGVnbmVsc2UnO1xuICBmdWxsU2NyZWVuTGFiZWwgPSAnRnVsbHNramVybSc7XG4gIGV4aXRGdWxsU2NyZWVuTGFiZWwgPSAnQXZzbHV0dCBmdWxsc2tqZXJtJztcbiAgem9vbUluTGFiZWwgPSAnWm9vbSBpbm4nO1xuICB6b29tT3V0TGFiZWwgPSAnWm9vbSB1dCc7XG4gIHByZXZpb3VzUGFnZUxhYmVsID0gJ0ZvcnJpZ2Ugc2lkZSc7XG4gIG5leHRQYWdlTGFiZWwgPSAnTmVzdGUgc2lkZSc7XG4gIGhvbWVMYWJlbCA9ICdIamVtJztcbiAgcm90YXRlQ3dMYWJlbCA9ICdSb3TDqXIgOTDCsCc7XG4gIHNlYXJjaExhYmVsID0gJ1PDuGsnO1xuICBjbGVhclNlYXJjaExhYmVsID0gJ1TDuG0nO1xuICBwcmV2aW91c0hpdExhYmVsID0gJ0ZvcnJpZ2UgdHJlZmYnO1xuICBuZXh0SGl0TGFiZWwgPSAnTmVzdGUgdHJlZmYnO1xuICBnb1RvUGFnZUxhYmVsID0gJ0fDpSB0aWwgc2lkZSc7XG4gIGN1cnJlbnRQYWdlTGFiZWwgPSAnTsOldsOmcmVuZGUgc2lkZSc7XG4gIGVudGVyUGFnZU51bWJlciA9ICdTa3JpdiBpbm4gc2lkZW51bW1lcic7XG4gIGRyb3BEaXNhYmxlZCA9ICdCZWtsYWdlciwgbWVuIGRyYWcgYW5kIGRyb3AgZXIgaWtrZSBha3RpdmVydCc7XG4gIGxvYWRpbmcgPSAnTGFzdGVyIC4uLic7XG5cbiAgLy8gRVJST1JTXG4gIHNvbWV0aGluZ0hhc0dvbmVXcm9uZ0xhYmVsID0gJ8OFIG5laSEgTm9lIGhhciBnw6V0dCBnYWx0Li4uJztcbiAgbWFuaWZlc3RVcmlNaXNzaW5nTGFiZWwgPSAnTGVua2UgdGlsIG1hbmlmZXN0IG1hbmdsZXInO1xuICBtYW5pZmVzdE5vdFZhbGlkTGFiZWwgPSAnTWFuaWZlc3RldCBlciBpa2tlIGd5bGRpZyc7XG4gIHBhZ2VEb2VzTm90RXhpc3RzID0gJ0Jla2xhZ2VyLCBtZW4gZGVuIHNpZGVuIGZpbm5lcyBpa2tlJztcbiAgdGV4dENvbnRlbnRFcnJvckxhYmVsID0gJ0Jla2xhZ2VyLCBtZW4gamVnIGZpbm5lciBpa2tlIHRla3N0ZW4gZm9yIGRlZyc7XG5cbiAgbm9SZXN1bHRzRm91bmRMYWJlbCA9IChxOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gYEluZ2VuIHRyZWZmIGZ1bm5ldCBmb3IgPGVtIGNsYXNzPVwiY3VycmVudC1zZWFyY2hcIj4ke3F9PC9lbT5gO1xuICB9O1xuXG4gIHJlc3VsdHNGb3VuZExhYmVsID0gKG51bWJlck9mSGl0czogbnVtYmVyLCBxOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gYCR7bnVtYmVyT2ZIaXRzfSB0cmVmZiBmdW5uZXQgZm9yIDxlbSBjbGFzcz1cImN1cnJlbnQtc2VhcmNoXCI+JHtxfTwvZW0+YDtcbiAgfTtcblxuICBjdXJyZW50SGl0TGFiZWwgPSAoY3VycmVudEhpdDogbnVtYmVyLCBudW1iZXJPZkhpdHM6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiBgJHtjdXJyZW50SGl0fSBhdiAke251bWJlck9mSGl0c30gdHJlZmZgO1xuICB9O1xufVxuIl19