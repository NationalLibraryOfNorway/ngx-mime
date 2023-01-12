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
        this.helpCloseAriaLabel = 'Steng hjelp dialog';
        this.recognizedTextContentLabel = 'Gjenkjent tekst';
        this.contentsLabel = 'Innhold';
        this.layoutMenuLabel = 'Visning';
        this.pageLayoutLabel = 'Sideoppsett';
        this.singlePageViewLabel = 'Enkeltsider';
        this.twoPageViewLabel = 'To sider';
        this.digitalTextLabel = 'Digital tekst';
        this.recognizedTextContentCloseLabel = 'Ingen';
        this.recognizedTextContentInSplitViewLabel = 'Delt';
        this.showRecognizedTextContentLabel = 'Kun digital tekst';
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
        this.rotationIsNotSupported = 'Rotasjon støttes ikke av enheten din';
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
MimeViewerIntlNoNb.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: MimeViewerIntlNoNb, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
MimeViewerIntlNoNb.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: MimeViewerIntlNoNb });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: MimeViewerIntlNoNb, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwubm9fbmIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLm5vX25iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBR2pELE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxjQUFjO0lBRHREOztRQUVFLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFCLGVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIscUJBQWdCLEdBQUcsWUFBWSxDQUFDO1FBQ2hDLDZCQUF3QixHQUFHLHlCQUF5QixDQUFDO1FBQ3JELHVCQUFrQixHQUFHLG9CQUFvQixDQUFDO1FBQzFDLCtCQUEwQixHQUFHLGlCQUFpQixDQUFDO1FBQy9DLGtCQUFhLEdBQUcsU0FBUyxDQUFDO1FBQzFCLG9CQUFlLEdBQUcsU0FBUyxDQUFDO1FBQzVCLG9CQUFlLEdBQUcsYUFBYSxDQUFDO1FBQ2hDLHdCQUFtQixHQUFHLGFBQWEsQ0FBQztRQUNwQyxxQkFBZ0IsR0FBRyxVQUFVLENBQUM7UUFDOUIscUJBQWdCLEdBQUcsZUFBZSxDQUFDO1FBQ25DLG9DQUErQixHQUFHLE9BQU8sQ0FBQztRQUMxQywwQ0FBcUMsR0FBRyxNQUFNLENBQUM7UUFDL0MsbUNBQThCLEdBQUcsbUJBQW1CLENBQUM7UUFDckQsa0JBQWEsR0FBRyxVQUFVLENBQUM7UUFDM0IsaUJBQVksR0FBRyxRQUFRLENBQUM7UUFDeEIsYUFBUSxHQUFHLHFCQUFxQixDQUFDO1FBQ2pDLG9CQUFlLEdBQUcsWUFBWSxDQUFDO1FBQy9CLHdCQUFtQixHQUFHLG9CQUFvQixDQUFDO1FBQzNDLGdCQUFXLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLGlCQUFZLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLHNCQUFpQixHQUFHLGNBQWMsQ0FBQztRQUNuQyxrQkFBYSxHQUFHLFlBQVksQ0FBQztRQUM3QixjQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsV0FBVyxDQUFDO1FBQzVCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixxQkFBZ0IsR0FBRyxlQUFlLENBQUM7UUFDbkMsaUJBQVksR0FBRyxhQUFhLENBQUM7UUFDN0Isa0JBQWEsR0FBRyxhQUFhLENBQUM7UUFDOUIscUJBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDcEMsb0JBQWUsR0FBRyxzQkFBc0IsQ0FBQztRQUN6QyxpQkFBWSxHQUFHLDhDQUE4QyxDQUFDO1FBQzlELFlBQU8sR0FBRyxZQUFZLENBQUM7UUFDdkIsMkJBQXNCLEdBQUcsc0NBQXNDLENBQUM7UUFFaEUsU0FBUztRQUNULCtCQUEwQixHQUFHLDZCQUE2QixDQUFDO1FBQzNELDRCQUF1QixHQUFHLDRCQUE0QixDQUFDO1FBQ3ZELDBCQUFxQixHQUFHLDJCQUEyQixDQUFDO1FBQ3BELHNCQUFpQixHQUFHLHFDQUFxQyxDQUFDO1FBQzFELDBCQUFxQixHQUFHLCtDQUErQyxDQUFDO1FBRXhFLHdCQUFtQixHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7WUFDbEMsT0FBTyxxREFBcUQsQ0FBQyxPQUFPLENBQUM7UUFDdkUsQ0FBQyxDQUFDO1FBRUYsc0JBQWlCLEdBQUcsQ0FBQyxZQUFvQixFQUFFLENBQVMsRUFBRSxFQUFFO1lBQ3RELE9BQU8sR0FBRyxZQUFZLGdEQUFnRCxDQUFDLE9BQU8sQ0FBQztRQUNqRixDQUFDLENBQUM7UUFFRixvQkFBZSxHQUFHLENBQUMsVUFBa0IsRUFBRSxZQUFvQixFQUFFLEVBQUU7WUFDN0QsT0FBTyxHQUFHLFVBQVUsT0FBTyxZQUFZLFFBQVEsQ0FBQztRQUNsRCxDQUFDLENBQUM7S0FDSDs7K0dBeERZLGtCQUFrQjttSEFBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBRDlCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4vdmlld2VyLWludGwnO1xuaW1wb3J0IHsgSGVscEludGxOb05iIH0gZnJvbSAnLi9oZWxwLWludGwubm9fbmInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWltZVZpZXdlckludGxOb05iIGV4dGVuZHMgTWltZVZpZXdlckludGwge1xuICBoZWxwID0gbmV3IEhlbHBJbnRsTm9OYigpO1xuICBjbG9zZUxhYmVsID0gJ0x1a2snO1xuICBhdHRyaWJ1dGlvbkxhYmVsID0gJ1RpbGxhdGVsc2UnO1xuICBhdHRyaWJ1dG9uQ2xvc2VBcmlhTGFiZWwgPSAnU3RlbmcgdGlsbGF0ZWxzZSBkaWFsb2cnO1xuICBoZWxwQ2xvc2VBcmlhTGFiZWwgPSAnU3RlbmcgaGplbHAgZGlhbG9nJztcbiAgcmVjb2duaXplZFRleHRDb250ZW50TGFiZWwgPSAnR2plbmtqZW50IHRla3N0JztcbiAgY29udGVudHNMYWJlbCA9ICdJbm5ob2xkJztcbiAgbGF5b3V0TWVudUxhYmVsID0gJ1Zpc25pbmcnO1xuICBwYWdlTGF5b3V0TGFiZWwgPSAnU2lkZW9wcHNldHQnO1xuICBzaW5nbGVQYWdlVmlld0xhYmVsID0gJ0Vua2VsdHNpZGVyJztcbiAgdHdvUGFnZVZpZXdMYWJlbCA9ICdUbyBzaWRlcic7XG4gIGRpZ2l0YWxUZXh0TGFiZWwgPSAnRGlnaXRhbCB0ZWtzdCc7XG4gIHJlY29nbml6ZWRUZXh0Q29udGVudENsb3NlTGFiZWwgPSAnSW5nZW4nO1xuICByZWNvZ25pemVkVGV4dENvbnRlbnRJblNwbGl0Vmlld0xhYmVsID0gJ0RlbHQnO1xuICBzaG93UmVjb2duaXplZFRleHRDb250ZW50TGFiZWwgPSAnS3VuIGRpZ2l0YWwgdGVrc3QnO1xuICBtZXRhZGF0YUxhYmVsID0gJ01ldGFkYXRhJztcbiAgbGljZW5zZUxhYmVsID0gJ0xpc2Vucyc7XG4gIHRvY0xhYmVsID0gJ0lubmhvbGRzZm9ydGVnbmVsc2UnO1xuICBmdWxsU2NyZWVuTGFiZWwgPSAnRnVsbHNramVybSc7XG4gIGV4aXRGdWxsU2NyZWVuTGFiZWwgPSAnQXZzbHV0dCBmdWxsc2tqZXJtJztcbiAgem9vbUluTGFiZWwgPSAnWm9vbSBpbm4nO1xuICB6b29tT3V0TGFiZWwgPSAnWm9vbSB1dCc7XG4gIHByZXZpb3VzUGFnZUxhYmVsID0gJ0ZvcnJpZ2Ugc2lkZSc7XG4gIG5leHRQYWdlTGFiZWwgPSAnTmVzdGUgc2lkZSc7XG4gIGhvbWVMYWJlbCA9ICdIamVtJztcbiAgcm90YXRlQ3dMYWJlbCA9ICdSb3TDqXIgOTDCsCc7XG4gIHNlYXJjaExhYmVsID0gJ1PDuGsnO1xuICBjbGVhclNlYXJjaExhYmVsID0gJ1TDuG0nO1xuICBwcmV2aW91c0hpdExhYmVsID0gJ0ZvcnJpZ2UgdHJlZmYnO1xuICBuZXh0SGl0TGFiZWwgPSAnTmVzdGUgdHJlZmYnO1xuICBnb1RvUGFnZUxhYmVsID0gJ0fDpSB0aWwgc2lkZSc7XG4gIGN1cnJlbnRQYWdlTGFiZWwgPSAnTsOldsOmcmVuZGUgc2lkZSc7XG4gIGVudGVyUGFnZU51bWJlciA9ICdTa3JpdiBpbm4gc2lkZW51bW1lcic7XG4gIGRyb3BEaXNhYmxlZCA9ICdCZWtsYWdlciwgbWVuIGRyYWcgYW5kIGRyb3AgZXIgaWtrZSBha3RpdmVydCc7XG4gIGxvYWRpbmcgPSAnTGFzdGVyIC4uLic7XG4gIHJvdGF0aW9uSXNOb3RTdXBwb3J0ZWQgPSAnUm90YXNqb24gc3TDuHR0ZXMgaWtrZSBhdiBlbmhldGVuIGRpbic7XG5cbiAgLy8gRVJST1JTXG4gIHNvbWV0aGluZ0hhc0dvbmVXcm9uZ0xhYmVsID0gJ8OFIG5laSEgTm9lIGhhciBnw6V0dCBnYWx0Li4uJztcbiAgbWFuaWZlc3RVcmlNaXNzaW5nTGFiZWwgPSAnTGVua2UgdGlsIG1hbmlmZXN0IG1hbmdsZXInO1xuICBtYW5pZmVzdE5vdFZhbGlkTGFiZWwgPSAnTWFuaWZlc3RldCBlciBpa2tlIGd5bGRpZyc7XG4gIHBhZ2VEb2VzTm90RXhpc3RzID0gJ0Jla2xhZ2VyLCBtZW4gZGVuIHNpZGVuIGZpbm5lcyBpa2tlJztcbiAgdGV4dENvbnRlbnRFcnJvckxhYmVsID0gJ0Jla2xhZ2VyLCBtZW4gamVnIGZpbm5lciBpa2tlIHRla3N0ZW4gZm9yIGRlZyc7XG5cbiAgbm9SZXN1bHRzRm91bmRMYWJlbCA9IChxOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gYEluZ2VuIHRyZWZmIGZ1bm5ldCBmb3IgPGVtIGNsYXNzPVwiY3VycmVudC1zZWFyY2hcIj4ke3F9PC9lbT5gO1xuICB9O1xuXG4gIHJlc3VsdHNGb3VuZExhYmVsID0gKG51bWJlck9mSGl0czogbnVtYmVyLCBxOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gYCR7bnVtYmVyT2ZIaXRzfSB0cmVmZiBmdW5uZXQgZm9yIDxlbSBjbGFzcz1cImN1cnJlbnQtc2VhcmNoXCI+JHtxfTwvZW0+YDtcbiAgfTtcblxuICBjdXJyZW50SGl0TGFiZWwgPSAoY3VycmVudEhpdDogbnVtYmVyLCBudW1iZXJPZkhpdHM6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiBgJHtjdXJyZW50SGl0fSBhdiAke251bWJlck9mSGl0c30gdHJlZmZgO1xuICB9O1xufVxuIl19