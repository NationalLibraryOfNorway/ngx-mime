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
        this.informationLabel = 'Opplysninger';
        this.layoutMenuLabel = 'Visning';
        this.pageLayoutLabel = 'Sideoppsett';
        this.singlePageViewLabel = 'Enkeltsider';
        this.digitalTextLabel = 'Digital tekst';
        this.twoPageViewLabel = 'To sider';
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
MimeViewerIntlNoNb.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MimeViewerIntlNoNb, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
MimeViewerIntlNoNb.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MimeViewerIntlNoNb });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MimeViewerIntlNoNb, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwubm9fbmIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLm5vX25iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBR2pELE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxjQUFjO0lBRHREOztRQUVXLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFCLGVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIscUJBQWdCLEdBQUcsWUFBWSxDQUFDO1FBQ2hDLDZCQUF3QixHQUFHLHlCQUF5QixDQUFDO1FBQ3JELHVCQUFrQixHQUFHLG9CQUFvQixDQUFDO1FBQzFDLHFCQUFnQixHQUFHLGNBQWMsQ0FBQztRQUNsQyxvQkFBZSxHQUFHLFNBQVMsQ0FBQztRQUM1QixvQkFBZSxHQUFHLGFBQWEsQ0FBQztRQUNoQyx3QkFBbUIsR0FBRyxhQUFhLENBQUM7UUFDcEMscUJBQWdCLEdBQUcsZUFBZSxDQUFDO1FBQ25DLHFCQUFnQixHQUFHLFVBQVUsQ0FBQztRQUM5QixvQ0FBK0IsR0FBRyxPQUFPLENBQUM7UUFDMUMsMENBQXFDLEdBQUcsTUFBTSxDQUFDO1FBQy9DLG1DQUE4QixHQUFHLG1CQUFtQixDQUFDO1FBQ3JELGtCQUFhLEdBQUcsVUFBVSxDQUFDO1FBQzNCLGlCQUFZLEdBQUcsUUFBUSxDQUFDO1FBQ3hCLGFBQVEsR0FBRyxxQkFBcUIsQ0FBQztRQUNqQyxvQkFBZSxHQUFHLFlBQVksQ0FBQztRQUMvQix3QkFBbUIsR0FBRyxvQkFBb0IsQ0FBQztRQUMzQyxnQkFBVyxHQUFHLFVBQVUsQ0FBQztRQUN6QixpQkFBWSxHQUFHLFNBQVMsQ0FBQztRQUN6QixzQkFBaUIsR0FBRyxjQUFjLENBQUM7UUFDbkMsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFDN0IsY0FBUyxHQUFHLE1BQU0sQ0FBQztRQUNuQixrQkFBYSxHQUFHLFdBQVcsQ0FBQztRQUM1QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIscUJBQWdCLEdBQUcsZUFBZSxDQUFDO1FBQ25DLGlCQUFZLEdBQUcsYUFBYSxDQUFDO1FBQzdCLGtCQUFhLEdBQUcsYUFBYSxDQUFDO1FBQzlCLHFCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3BDLG9CQUFlLEdBQUcsc0JBQXNCLENBQUM7UUFDekMsaUJBQVksR0FBRyw4Q0FBOEMsQ0FBQztRQUM5RCxZQUFPLEdBQUcsWUFBWSxDQUFDO1FBQ3ZCLDJCQUFzQixHQUFHLHNDQUFzQyxDQUFDO1FBRXpFLFNBQVM7UUFDQSwrQkFBMEIsR0FBRyw2QkFBNkIsQ0FBQztRQUMzRCw0QkFBdUIsR0FBRyw0QkFBNEIsQ0FBQztRQUN2RCwwQkFBcUIsR0FBRywyQkFBMkIsQ0FBQztRQUNwRCxzQkFBaUIsR0FBRyxxQ0FBcUMsQ0FBQztRQUMxRCwwQkFBcUIsR0FBRywrQ0FBK0MsQ0FBQztRQUV4RSx3QkFBbUIsR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFO1lBQzNDLE9BQU8scURBQXFELENBQUMsT0FBTyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQztRQUVPLHNCQUFpQixHQUFHLENBQUMsWUFBb0IsRUFBRSxDQUFTLEVBQUUsRUFBRTtZQUMvRCxPQUFPLEdBQUcsWUFBWSxnREFBZ0QsQ0FBQyxPQUFPLENBQUM7UUFDakYsQ0FBQyxDQUFDO1FBRU8sb0JBQWUsR0FBRyxDQUFDLFVBQWtCLEVBQUUsWUFBb0IsRUFBRSxFQUFFO1lBQ3RFLE9BQU8sR0FBRyxVQUFVLE9BQU8sWUFBWSxRQUFRLENBQUM7UUFDbEQsQ0FBQyxDQUFDO0tBQ0g7OytHQXZEWSxrQkFBa0I7bUhBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUQ5QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuL3ZpZXdlci1pbnRsJztcbmltcG9ydCB7IEhlbHBJbnRsTm9OYiB9IGZyb20gJy4vaGVscC1pbnRsLm5vX25iJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1pbWVWaWV3ZXJJbnRsTm9OYiBleHRlbmRzIE1pbWVWaWV3ZXJJbnRsIHtcbiAgb3ZlcnJpZGUgaGVscCA9IG5ldyBIZWxwSW50bE5vTmIoKTtcbiAgb3ZlcnJpZGUgY2xvc2VMYWJlbCA9ICdMdWtrJztcbiAgb3ZlcnJpZGUgYXR0cmlidXRpb25MYWJlbCA9ICdUaWxsYXRlbHNlJztcbiAgb3ZlcnJpZGUgYXR0cmlidXRvbkNsb3NlQXJpYUxhYmVsID0gJ1N0ZW5nIHRpbGxhdGVsc2UgZGlhbG9nJztcbiAgb3ZlcnJpZGUgaGVscENsb3NlQXJpYUxhYmVsID0gJ1N0ZW5nIGhqZWxwIGRpYWxvZyc7XG4gIG92ZXJyaWRlIGluZm9ybWF0aW9uTGFiZWwgPSAnT3BwbHlzbmluZ2VyJztcbiAgb3ZlcnJpZGUgbGF5b3V0TWVudUxhYmVsID0gJ1Zpc25pbmcnO1xuICBvdmVycmlkZSBwYWdlTGF5b3V0TGFiZWwgPSAnU2lkZW9wcHNldHQnO1xuICBvdmVycmlkZSBzaW5nbGVQYWdlVmlld0xhYmVsID0gJ0Vua2VsdHNpZGVyJztcbiAgb3ZlcnJpZGUgZGlnaXRhbFRleHRMYWJlbCA9ICdEaWdpdGFsIHRla3N0JztcbiAgb3ZlcnJpZGUgdHdvUGFnZVZpZXdMYWJlbCA9ICdUbyBzaWRlcic7XG4gIG92ZXJyaWRlIHJlY29nbml6ZWRUZXh0Q29udGVudENsb3NlTGFiZWwgPSAnSW5nZW4nO1xuICBvdmVycmlkZSByZWNvZ25pemVkVGV4dENvbnRlbnRJblNwbGl0Vmlld0xhYmVsID0gJ0RlbHQnO1xuICBvdmVycmlkZSBzaG93UmVjb2duaXplZFRleHRDb250ZW50TGFiZWwgPSAnS3VuIGRpZ2l0YWwgdGVrc3QnO1xuICBvdmVycmlkZSBtZXRhZGF0YUxhYmVsID0gJ01ldGFkYXRhJztcbiAgb3ZlcnJpZGUgbGljZW5zZUxhYmVsID0gJ0xpc2Vucyc7XG4gIG92ZXJyaWRlIHRvY0xhYmVsID0gJ0lubmhvbGRzZm9ydGVnbmVsc2UnO1xuICBvdmVycmlkZSBmdWxsU2NyZWVuTGFiZWwgPSAnRnVsbHNramVybSc7XG4gIG92ZXJyaWRlIGV4aXRGdWxsU2NyZWVuTGFiZWwgPSAnQXZzbHV0dCBmdWxsc2tqZXJtJztcbiAgb3ZlcnJpZGUgem9vbUluTGFiZWwgPSAnWm9vbSBpbm4nO1xuICBvdmVycmlkZSB6b29tT3V0TGFiZWwgPSAnWm9vbSB1dCc7XG4gIG92ZXJyaWRlIHByZXZpb3VzUGFnZUxhYmVsID0gJ0ZvcnJpZ2Ugc2lkZSc7XG4gIG92ZXJyaWRlIG5leHRQYWdlTGFiZWwgPSAnTmVzdGUgc2lkZSc7XG4gIG92ZXJyaWRlIGhvbWVMYWJlbCA9ICdIamVtJztcbiAgb3ZlcnJpZGUgcm90YXRlQ3dMYWJlbCA9ICdSb3TDqXIgOTDCsCc7XG4gIG92ZXJyaWRlIHNlYXJjaExhYmVsID0gJ1PDuGsnO1xuICBvdmVycmlkZSBjbGVhclNlYXJjaExhYmVsID0gJ1TDuG0nO1xuICBvdmVycmlkZSBwcmV2aW91c0hpdExhYmVsID0gJ0ZvcnJpZ2UgdHJlZmYnO1xuICBvdmVycmlkZSBuZXh0SGl0TGFiZWwgPSAnTmVzdGUgdHJlZmYnO1xuICBvdmVycmlkZSBnb1RvUGFnZUxhYmVsID0gJ0fDpSB0aWwgc2lkZSc7XG4gIG92ZXJyaWRlIGN1cnJlbnRQYWdlTGFiZWwgPSAnTsOldsOmcmVuZGUgc2lkZSc7XG4gIG92ZXJyaWRlIGVudGVyUGFnZU51bWJlciA9ICdTa3JpdiBpbm4gc2lkZW51bW1lcic7XG4gIG92ZXJyaWRlIGRyb3BEaXNhYmxlZCA9ICdCZWtsYWdlciwgbWVuIGRyYWcgYW5kIGRyb3AgZXIgaWtrZSBha3RpdmVydCc7XG4gIG92ZXJyaWRlIGxvYWRpbmcgPSAnTGFzdGVyIC4uLic7XG4gIG92ZXJyaWRlIHJvdGF0aW9uSXNOb3RTdXBwb3J0ZWQgPSAnUm90YXNqb24gc3TDuHR0ZXMgaWtrZSBhdiBlbmhldGVuIGRpbic7XG5cbiAgLy8gRVJST1JTXG4gIG92ZXJyaWRlIHNvbWV0aGluZ0hhc0dvbmVXcm9uZ0xhYmVsID0gJ8OFIG5laSEgTm9lIGhhciBnw6V0dCBnYWx0Li4uJztcbiAgb3ZlcnJpZGUgbWFuaWZlc3RVcmlNaXNzaW5nTGFiZWwgPSAnTGVua2UgdGlsIG1hbmlmZXN0IG1hbmdsZXInO1xuICBvdmVycmlkZSBtYW5pZmVzdE5vdFZhbGlkTGFiZWwgPSAnTWFuaWZlc3RldCBlciBpa2tlIGd5bGRpZyc7XG4gIG92ZXJyaWRlIHBhZ2VEb2VzTm90RXhpc3RzID0gJ0Jla2xhZ2VyLCBtZW4gZGVuIHNpZGVuIGZpbm5lcyBpa2tlJztcbiAgb3ZlcnJpZGUgdGV4dENvbnRlbnRFcnJvckxhYmVsID0gJ0Jla2xhZ2VyLCBtZW4gamVnIGZpbm5lciBpa2tlIHRla3N0ZW4gZm9yIGRlZyc7XG5cbiAgb3ZlcnJpZGUgbm9SZXN1bHRzRm91bmRMYWJlbCA9IChxOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gYEluZ2VuIHRyZWZmIGZ1bm5ldCBmb3IgPGVtIGNsYXNzPVwiY3VycmVudC1zZWFyY2hcIj4ke3F9PC9lbT5gO1xuICB9O1xuXG4gIG92ZXJyaWRlIHJlc3VsdHNGb3VuZExhYmVsID0gKG51bWJlck9mSGl0czogbnVtYmVyLCBxOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gYCR7bnVtYmVyT2ZIaXRzfSB0cmVmZiBmdW5uZXQgZm9yIDxlbSBjbGFzcz1cImN1cnJlbnQtc2VhcmNoXCI+JHtxfTwvZW0+YDtcbiAgfTtcblxuICBvdmVycmlkZSBjdXJyZW50SGl0TGFiZWwgPSAoY3VycmVudEhpdDogbnVtYmVyLCBudW1iZXJPZkhpdHM6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiBgJHtjdXJyZW50SGl0fSBhdiAke251bWJlck9mSGl0c30gdHJlZmZgO1xuICB9O1xufVxuIl19