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
        this.openOsdControlPanelLabel = 'Åpne kontrollpanel';
        this.closeOsdControlPanelLabel = 'Lukk kontrollpanel';
        this.zoomInLabel = 'Zoom inn';
        this.zoomOutLabel = 'Zoom ut';
        this.resetZoomLabel = 'Nullstill zoom';
        this.previousPageLabel = 'Forrige side';
        this.nextPageLabel = 'Neste side';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: MimeViewerIntlNoNb, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: MimeViewerIntlNoNb }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: MimeViewerIntlNoNb, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwubm9fbmIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLm5vX25iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBR2pELE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxjQUFjO0lBRHREOztRQUVXLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFCLGVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIscUJBQWdCLEdBQUcsWUFBWSxDQUFDO1FBQ2hDLDZCQUF3QixHQUFHLHlCQUF5QixDQUFDO1FBQ3JELHVCQUFrQixHQUFHLG9CQUFvQixDQUFDO1FBQzFDLHFCQUFnQixHQUFHLGNBQWMsQ0FBQztRQUNsQyxvQkFBZSxHQUFHLFNBQVMsQ0FBQztRQUM1QixvQkFBZSxHQUFHLGFBQWEsQ0FBQztRQUNoQyx3QkFBbUIsR0FBRyxhQUFhLENBQUM7UUFDcEMscUJBQWdCLEdBQUcsZUFBZSxDQUFDO1FBQ25DLHFCQUFnQixHQUFHLFVBQVUsQ0FBQztRQUM5QixvQ0FBK0IsR0FBRyxPQUFPLENBQUM7UUFDMUMsMENBQXFDLEdBQUcsTUFBTSxDQUFDO1FBQy9DLG1DQUE4QixHQUFHLG1CQUFtQixDQUFDO1FBQ3JELGtCQUFhLEdBQUcsVUFBVSxDQUFDO1FBQzNCLGlCQUFZLEdBQUcsUUFBUSxDQUFDO1FBQ3hCLGFBQVEsR0FBRyxxQkFBcUIsQ0FBQztRQUNqQyxvQkFBZSxHQUFHLFlBQVksQ0FBQztRQUMvQix3QkFBbUIsR0FBRyxvQkFBb0IsQ0FBQztRQUMzQyw2QkFBd0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNoRCw4QkFBeUIsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRCxnQkFBVyxHQUFHLFVBQVUsQ0FBQztRQUN6QixpQkFBWSxHQUFHLFNBQVMsQ0FBQztRQUN6QixtQkFBYyxHQUFHLGdCQUFnQixDQUFDO1FBQ2xDLHNCQUFpQixHQUFHLGNBQWMsQ0FBQztRQUNuQyxrQkFBYSxHQUFHLFlBQVksQ0FBQztRQUM3QixrQkFBYSxHQUFHLFdBQVcsQ0FBQztRQUM1QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIscUJBQWdCLEdBQUcsZUFBZSxDQUFDO1FBQ25DLGlCQUFZLEdBQUcsYUFBYSxDQUFDO1FBQzdCLGtCQUFhLEdBQUcsYUFBYSxDQUFDO1FBQzlCLHFCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3BDLG9CQUFlLEdBQUcsc0JBQXNCLENBQUM7UUFDekMsaUJBQVksR0FBRyw4Q0FBOEMsQ0FBQztRQUM5RCxZQUFPLEdBQUcsWUFBWSxDQUFDO1FBQ3ZCLDJCQUFzQixHQUFHLHNDQUFzQyxDQUFDO1FBRXpFLFNBQVM7UUFDQSwrQkFBMEIsR0FBRyw2QkFBNkIsQ0FBQztRQUMzRCw0QkFBdUIsR0FBRyw0QkFBNEIsQ0FBQztRQUN2RCwwQkFBcUIsR0FBRywyQkFBMkIsQ0FBQztRQUNwRCxzQkFBaUIsR0FBRyxxQ0FBcUMsQ0FBQztRQUMxRCwwQkFBcUIsR0FDNUIsK0NBQStDLENBQUM7UUFFekMsd0JBQW1CLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRTtZQUMzQyxPQUFPLHFEQUFxRCxDQUFDLE9BQU8sQ0FBQztRQUN2RSxDQUFDLENBQUM7UUFFTyxzQkFBaUIsR0FBRyxDQUFDLFlBQW9CLEVBQUUsQ0FBUyxFQUFFLEVBQUU7WUFDL0QsT0FBTyxHQUFHLFlBQVksZ0RBQWdELENBQUMsT0FBTyxDQUFDO1FBQ2pGLENBQUMsQ0FBQztRQUVPLG9CQUFlLEdBQUcsQ0FBQyxVQUFrQixFQUFFLFlBQW9CLEVBQUUsRUFBRTtZQUN0RSxPQUFPLEdBQUcsVUFBVSxPQUFPLFlBQVksUUFBUSxDQUFDO1FBQ2xELENBQUMsQ0FBQztLQUNIOzhHQTFEWSxrQkFBa0I7a0hBQWxCLGtCQUFrQjs7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBIZWxwSW50bE5vTmIgfSBmcm9tICcuL2hlbHAtaW50bC5ub19uYic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNaW1lVmlld2VySW50bE5vTmIgZXh0ZW5kcyBNaW1lVmlld2VySW50bCB7XG4gIG92ZXJyaWRlIGhlbHAgPSBuZXcgSGVscEludGxOb05iKCk7XG4gIG92ZXJyaWRlIGNsb3NlTGFiZWwgPSAnTHVrayc7XG4gIG92ZXJyaWRlIGF0dHJpYnV0aW9uTGFiZWwgPSAnVGlsbGF0ZWxzZSc7XG4gIG92ZXJyaWRlIGF0dHJpYnV0b25DbG9zZUFyaWFMYWJlbCA9ICdTdGVuZyB0aWxsYXRlbHNlIGRpYWxvZyc7XG4gIG92ZXJyaWRlIGhlbHBDbG9zZUFyaWFMYWJlbCA9ICdTdGVuZyBoamVscCBkaWFsb2cnO1xuICBvdmVycmlkZSBpbmZvcm1hdGlvbkxhYmVsID0gJ09wcGx5c25pbmdlcic7XG4gIG92ZXJyaWRlIGxheW91dE1lbnVMYWJlbCA9ICdWaXNuaW5nJztcbiAgb3ZlcnJpZGUgcGFnZUxheW91dExhYmVsID0gJ1NpZGVvcHBzZXR0JztcbiAgb3ZlcnJpZGUgc2luZ2xlUGFnZVZpZXdMYWJlbCA9ICdFbmtlbHRzaWRlcic7XG4gIG92ZXJyaWRlIGRpZ2l0YWxUZXh0TGFiZWwgPSAnRGlnaXRhbCB0ZWtzdCc7XG4gIG92ZXJyaWRlIHR3b1BhZ2VWaWV3TGFiZWwgPSAnVG8gc2lkZXInO1xuICBvdmVycmlkZSByZWNvZ25pemVkVGV4dENvbnRlbnRDbG9zZUxhYmVsID0gJ0luZ2VuJztcbiAgb3ZlcnJpZGUgcmVjb2duaXplZFRleHRDb250ZW50SW5TcGxpdFZpZXdMYWJlbCA9ICdEZWx0JztcbiAgb3ZlcnJpZGUgc2hvd1JlY29nbml6ZWRUZXh0Q29udGVudExhYmVsID0gJ0t1biBkaWdpdGFsIHRla3N0JztcbiAgb3ZlcnJpZGUgbWV0YWRhdGFMYWJlbCA9ICdNZXRhZGF0YSc7XG4gIG92ZXJyaWRlIGxpY2Vuc2VMYWJlbCA9ICdMaXNlbnMnO1xuICBvdmVycmlkZSB0b2NMYWJlbCA9ICdJbm5ob2xkc2ZvcnRlZ25lbHNlJztcbiAgb3ZlcnJpZGUgZnVsbFNjcmVlbkxhYmVsID0gJ0Z1bGxza2plcm0nO1xuICBvdmVycmlkZSBleGl0RnVsbFNjcmVlbkxhYmVsID0gJ0F2c2x1dHQgZnVsbHNramVybSc7XG4gIG92ZXJyaWRlIG9wZW5Pc2RDb250cm9sUGFuZWxMYWJlbCA9ICfDhXBuZSBrb250cm9sbHBhbmVsJztcbiAgb3ZlcnJpZGUgY2xvc2VPc2RDb250cm9sUGFuZWxMYWJlbCA9ICdMdWtrIGtvbnRyb2xscGFuZWwnO1xuICBvdmVycmlkZSB6b29tSW5MYWJlbCA9ICdab29tIGlubic7XG4gIG92ZXJyaWRlIHpvb21PdXRMYWJlbCA9ICdab29tIHV0JztcbiAgb3ZlcnJpZGUgcmVzZXRab29tTGFiZWwgPSAnTnVsbHN0aWxsIHpvb20nO1xuICBvdmVycmlkZSBwcmV2aW91c1BhZ2VMYWJlbCA9ICdGb3JyaWdlIHNpZGUnO1xuICBvdmVycmlkZSBuZXh0UGFnZUxhYmVsID0gJ05lc3RlIHNpZGUnO1xuICBvdmVycmlkZSByb3RhdGVDd0xhYmVsID0gJ1JvdMOpciA5MMKwJztcbiAgb3ZlcnJpZGUgc2VhcmNoTGFiZWwgPSAnU8O4ayc7XG4gIG92ZXJyaWRlIGNsZWFyU2VhcmNoTGFiZWwgPSAnVMO4bSc7XG4gIG92ZXJyaWRlIHByZXZpb3VzSGl0TGFiZWwgPSAnRm9ycmlnZSB0cmVmZic7XG4gIG92ZXJyaWRlIG5leHRIaXRMYWJlbCA9ICdOZXN0ZSB0cmVmZic7XG4gIG92ZXJyaWRlIGdvVG9QYWdlTGFiZWwgPSAnR8OlIHRpbCBzaWRlJztcbiAgb3ZlcnJpZGUgY3VycmVudFBhZ2VMYWJlbCA9ICdOw6V2w6ZyZW5kZSBzaWRlJztcbiAgb3ZlcnJpZGUgZW50ZXJQYWdlTnVtYmVyID0gJ1Nrcml2IGlubiBzaWRlbnVtbWVyJztcbiAgb3ZlcnJpZGUgZHJvcERpc2FibGVkID0gJ0Jla2xhZ2VyLCBtZW4gZHJhZyBhbmQgZHJvcCBlciBpa2tlIGFrdGl2ZXJ0JztcbiAgb3ZlcnJpZGUgbG9hZGluZyA9ICdMYXN0ZXIgLi4uJztcbiAgb3ZlcnJpZGUgcm90YXRpb25Jc05vdFN1cHBvcnRlZCA9ICdSb3Rhc2pvbiBzdMO4dHRlcyBpa2tlIGF2IGVuaGV0ZW4gZGluJztcblxuICAvLyBFUlJPUlNcbiAgb3ZlcnJpZGUgc29tZXRoaW5nSGFzR29uZVdyb25nTGFiZWwgPSAnw4UgbmVpISBOb2UgaGFyIGfDpXR0IGdhbHQuLi4nO1xuICBvdmVycmlkZSBtYW5pZmVzdFVyaU1pc3NpbmdMYWJlbCA9ICdMZW5rZSB0aWwgbWFuaWZlc3QgbWFuZ2xlcic7XG4gIG92ZXJyaWRlIG1hbmlmZXN0Tm90VmFsaWRMYWJlbCA9ICdNYW5pZmVzdGV0IGVyIGlra2UgZ3lsZGlnJztcbiAgb3ZlcnJpZGUgcGFnZURvZXNOb3RFeGlzdHMgPSAnQmVrbGFnZXIsIG1lbiBkZW4gc2lkZW4gZmlubmVzIGlra2UnO1xuICBvdmVycmlkZSB0ZXh0Q29udGVudEVycm9yTGFiZWwgPVxuICAgICdCZWtsYWdlciwgbWVuIGplZyBmaW5uZXIgaWtrZSB0ZWtzdGVuIGZvciBkZWcnO1xuXG4gIG92ZXJyaWRlIG5vUmVzdWx0c0ZvdW5kTGFiZWwgPSAocTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGBJbmdlbiB0cmVmZiBmdW5uZXQgZm9yIDxlbSBjbGFzcz1cImN1cnJlbnQtc2VhcmNoXCI+JHtxfTwvZW0+YDtcbiAgfTtcblxuICBvdmVycmlkZSByZXN1bHRzRm91bmRMYWJlbCA9IChudW1iZXJPZkhpdHM6IG51bWJlciwgcTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGAke251bWJlck9mSGl0c30gdHJlZmYgZnVubmV0IGZvciA8ZW0gY2xhc3M9XCJjdXJyZW50LXNlYXJjaFwiPiR7cX08L2VtPmA7XG4gIH07XG5cbiAgb3ZlcnJpZGUgY3VycmVudEhpdExhYmVsID0gKGN1cnJlbnRIaXQ6IG51bWJlciwgbnVtYmVyT2ZIaXRzOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gYCR7Y3VycmVudEhpdH0gYXYgJHtudW1iZXJPZkhpdHN9IHRyZWZmYDtcbiAgfTtcbn1cbiJdfQ==