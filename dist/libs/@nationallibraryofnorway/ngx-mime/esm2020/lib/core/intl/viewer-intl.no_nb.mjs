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
        this.contentsLabel = 'Innhold';
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
MimeViewerIntlNoNb.ɵfac = /*@__PURE__*/ function () { let ɵMimeViewerIntlNoNb_BaseFactory; return function MimeViewerIntlNoNb_Factory(t) { return (ɵMimeViewerIntlNoNb_BaseFactory || (ɵMimeViewerIntlNoNb_BaseFactory = i0.ɵɵgetInheritedFactory(MimeViewerIntlNoNb)))(t || MimeViewerIntlNoNb); }; }();
MimeViewerIntlNoNb.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MimeViewerIntlNoNb, factory: MimeViewerIntlNoNb.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MimeViewerIntlNoNb, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwubm9fbmIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLm5vX25iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBR2pELE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxjQUFjO0lBRHREOztRQUVXLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFCLGVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIscUJBQWdCLEdBQUcsWUFBWSxDQUFDO1FBQ2hDLDZCQUF3QixHQUFHLHlCQUF5QixDQUFDO1FBQ3JELHVCQUFrQixHQUFHLG9CQUFvQixDQUFDO1FBQzFDLGtCQUFhLEdBQUcsU0FBUyxDQUFDO1FBQzFCLG9CQUFlLEdBQUcsU0FBUyxDQUFDO1FBQzVCLG9CQUFlLEdBQUcsYUFBYSxDQUFDO1FBQ2hDLHdCQUFtQixHQUFHLGFBQWEsQ0FBQztRQUNwQyxxQkFBZ0IsR0FBRyxlQUFlLENBQUM7UUFDbkMscUJBQWdCLEdBQUcsVUFBVSxDQUFDO1FBQzlCLG9DQUErQixHQUFHLE9BQU8sQ0FBQztRQUMxQywwQ0FBcUMsR0FBRyxNQUFNLENBQUM7UUFDL0MsbUNBQThCLEdBQUcsbUJBQW1CLENBQUM7UUFDckQsa0JBQWEsR0FBRyxVQUFVLENBQUM7UUFDM0IsaUJBQVksR0FBRyxRQUFRLENBQUM7UUFDeEIsYUFBUSxHQUFHLHFCQUFxQixDQUFDO1FBQ2pDLG9CQUFlLEdBQUcsWUFBWSxDQUFDO1FBQy9CLHdCQUFtQixHQUFHLG9CQUFvQixDQUFDO1FBQzNDLGdCQUFXLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLGlCQUFZLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLHNCQUFpQixHQUFHLGNBQWMsQ0FBQztRQUNuQyxrQkFBYSxHQUFHLFlBQVksQ0FBQztRQUM3QixjQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsV0FBVyxDQUFDO1FBQzVCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixxQkFBZ0IsR0FBRyxlQUFlLENBQUM7UUFDbkMsaUJBQVksR0FBRyxhQUFhLENBQUM7UUFDN0Isa0JBQWEsR0FBRyxhQUFhLENBQUM7UUFDOUIscUJBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDcEMsb0JBQWUsR0FBRyxzQkFBc0IsQ0FBQztRQUN6QyxpQkFBWSxHQUFHLDhDQUE4QyxDQUFDO1FBQzlELFlBQU8sR0FBRyxZQUFZLENBQUM7UUFDdkIsMkJBQXNCLEdBQUcsc0NBQXNDLENBQUM7UUFFekUsU0FBUztRQUNBLCtCQUEwQixHQUFHLDZCQUE2QixDQUFDO1FBQzNELDRCQUF1QixHQUFHLDRCQUE0QixDQUFDO1FBQ3ZELDBCQUFxQixHQUFHLDJCQUEyQixDQUFDO1FBQ3BELHNCQUFpQixHQUFHLHFDQUFxQyxDQUFDO1FBQzFELDBCQUFxQixHQUFHLCtDQUErQyxDQUFDO1FBRXhFLHdCQUFtQixHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7WUFDM0MsT0FBTyxxREFBcUQsQ0FBQyxPQUFPLENBQUM7UUFDdkUsQ0FBQyxDQUFDO1FBRU8sc0JBQWlCLEdBQUcsQ0FBQyxZQUFvQixFQUFFLENBQVMsRUFBRSxFQUFFO1lBQy9ELE9BQU8sR0FBRyxZQUFZLGdEQUFnRCxDQUFDLE9BQU8sQ0FBQztRQUNqRixDQUFDLENBQUM7UUFFTyxvQkFBZSxHQUFHLENBQUMsVUFBa0IsRUFBRSxZQUFvQixFQUFFLEVBQUU7WUFDdEUsT0FBTyxHQUFHLFVBQVUsT0FBTyxZQUFZLFFBQVEsQ0FBQztRQUNsRCxDQUFDLENBQUM7S0FDSDs7a1BBdkRZLGtCQUFrQixTQUFsQixrQkFBa0I7d0VBQWxCLGtCQUFrQixXQUFsQixrQkFBa0I7dUZBQWxCLGtCQUFrQjtjQUQ5QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuL3ZpZXdlci1pbnRsJztcbmltcG9ydCB7IEhlbHBJbnRsTm9OYiB9IGZyb20gJy4vaGVscC1pbnRsLm5vX25iJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1pbWVWaWV3ZXJJbnRsTm9OYiBleHRlbmRzIE1pbWVWaWV3ZXJJbnRsIHtcbiAgb3ZlcnJpZGUgaGVscCA9IG5ldyBIZWxwSW50bE5vTmIoKTtcbiAgb3ZlcnJpZGUgY2xvc2VMYWJlbCA9ICdMdWtrJztcbiAgb3ZlcnJpZGUgYXR0cmlidXRpb25MYWJlbCA9ICdUaWxsYXRlbHNlJztcbiAgb3ZlcnJpZGUgYXR0cmlidXRvbkNsb3NlQXJpYUxhYmVsID0gJ1N0ZW5nIHRpbGxhdGVsc2UgZGlhbG9nJztcbiAgb3ZlcnJpZGUgaGVscENsb3NlQXJpYUxhYmVsID0gJ1N0ZW5nIGhqZWxwIGRpYWxvZyc7XG4gIG92ZXJyaWRlIGNvbnRlbnRzTGFiZWwgPSAnSW5uaG9sZCc7XG4gIG92ZXJyaWRlIGxheW91dE1lbnVMYWJlbCA9ICdWaXNuaW5nJztcbiAgb3ZlcnJpZGUgcGFnZUxheW91dExhYmVsID0gJ1NpZGVvcHBzZXR0JztcbiAgb3ZlcnJpZGUgc2luZ2xlUGFnZVZpZXdMYWJlbCA9ICdFbmtlbHRzaWRlcic7XG4gIG92ZXJyaWRlIGRpZ2l0YWxUZXh0TGFiZWwgPSAnRGlnaXRhbCB0ZWtzdCc7XG4gIG92ZXJyaWRlIHR3b1BhZ2VWaWV3TGFiZWwgPSAnVG8gc2lkZXInO1xuICBvdmVycmlkZSByZWNvZ25pemVkVGV4dENvbnRlbnRDbG9zZUxhYmVsID0gJ0luZ2VuJztcbiAgb3ZlcnJpZGUgcmVjb2duaXplZFRleHRDb250ZW50SW5TcGxpdFZpZXdMYWJlbCA9ICdEZWx0JztcbiAgb3ZlcnJpZGUgc2hvd1JlY29nbml6ZWRUZXh0Q29udGVudExhYmVsID0gJ0t1biBkaWdpdGFsIHRla3N0JztcbiAgb3ZlcnJpZGUgbWV0YWRhdGFMYWJlbCA9ICdNZXRhZGF0YSc7XG4gIG92ZXJyaWRlIGxpY2Vuc2VMYWJlbCA9ICdMaXNlbnMnO1xuICBvdmVycmlkZSB0b2NMYWJlbCA9ICdJbm5ob2xkc2ZvcnRlZ25lbHNlJztcbiAgb3ZlcnJpZGUgZnVsbFNjcmVlbkxhYmVsID0gJ0Z1bGxza2plcm0nO1xuICBvdmVycmlkZSBleGl0RnVsbFNjcmVlbkxhYmVsID0gJ0F2c2x1dHQgZnVsbHNramVybSc7XG4gIG92ZXJyaWRlIHpvb21JbkxhYmVsID0gJ1pvb20gaW5uJztcbiAgb3ZlcnJpZGUgem9vbU91dExhYmVsID0gJ1pvb20gdXQnO1xuICBvdmVycmlkZSBwcmV2aW91c1BhZ2VMYWJlbCA9ICdGb3JyaWdlIHNpZGUnO1xuICBvdmVycmlkZSBuZXh0UGFnZUxhYmVsID0gJ05lc3RlIHNpZGUnO1xuICBvdmVycmlkZSBob21lTGFiZWwgPSAnSGplbSc7XG4gIG92ZXJyaWRlIHJvdGF0ZUN3TGFiZWwgPSAnUm90w6lyIDkwwrAnO1xuICBvdmVycmlkZSBzZWFyY2hMYWJlbCA9ICdTw7hrJztcbiAgb3ZlcnJpZGUgY2xlYXJTZWFyY2hMYWJlbCA9ICdUw7htJztcbiAgb3ZlcnJpZGUgcHJldmlvdXNIaXRMYWJlbCA9ICdGb3JyaWdlIHRyZWZmJztcbiAgb3ZlcnJpZGUgbmV4dEhpdExhYmVsID0gJ05lc3RlIHRyZWZmJztcbiAgb3ZlcnJpZGUgZ29Ub1BhZ2VMYWJlbCA9ICdHw6UgdGlsIHNpZGUnO1xuICBvdmVycmlkZSBjdXJyZW50UGFnZUxhYmVsID0gJ07DpXbDpnJlbmRlIHNpZGUnO1xuICBvdmVycmlkZSBlbnRlclBhZ2VOdW1iZXIgPSAnU2tyaXYgaW5uIHNpZGVudW1tZXInO1xuICBvdmVycmlkZSBkcm9wRGlzYWJsZWQgPSAnQmVrbGFnZXIsIG1lbiBkcmFnIGFuZCBkcm9wIGVyIGlra2UgYWt0aXZlcnQnO1xuICBvdmVycmlkZSBsb2FkaW5nID0gJ0xhc3RlciAuLi4nO1xuICBvdmVycmlkZSByb3RhdGlvbklzTm90U3VwcG9ydGVkID0gJ1JvdGFzam9uIHN0w7h0dGVzIGlra2UgYXYgZW5oZXRlbiBkaW4nO1xuXG4gIC8vIEVSUk9SU1xuICBvdmVycmlkZSBzb21ldGhpbmdIYXNHb25lV3JvbmdMYWJlbCA9ICfDhSBuZWkhIE5vZSBoYXIgZ8OldHQgZ2FsdC4uLic7XG4gIG92ZXJyaWRlIG1hbmlmZXN0VXJpTWlzc2luZ0xhYmVsID0gJ0xlbmtlIHRpbCBtYW5pZmVzdCBtYW5nbGVyJztcbiAgb3ZlcnJpZGUgbWFuaWZlc3ROb3RWYWxpZExhYmVsID0gJ01hbmlmZXN0ZXQgZXIgaWtrZSBneWxkaWcnO1xuICBvdmVycmlkZSBwYWdlRG9lc05vdEV4aXN0cyA9ICdCZWtsYWdlciwgbWVuIGRlbiBzaWRlbiBmaW5uZXMgaWtrZSc7XG4gIG92ZXJyaWRlIHRleHRDb250ZW50RXJyb3JMYWJlbCA9ICdCZWtsYWdlciwgbWVuIGplZyBmaW5uZXIgaWtrZSB0ZWtzdGVuIGZvciBkZWcnO1xuXG4gIG92ZXJyaWRlIG5vUmVzdWx0c0ZvdW5kTGFiZWwgPSAocTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGBJbmdlbiB0cmVmZiBmdW5uZXQgZm9yIDxlbSBjbGFzcz1cImN1cnJlbnQtc2VhcmNoXCI+JHtxfTwvZW0+YDtcbiAgfTtcblxuICBvdmVycmlkZSByZXN1bHRzRm91bmRMYWJlbCA9IChudW1iZXJPZkhpdHM6IG51bWJlciwgcTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGAke251bWJlck9mSGl0c30gdHJlZmYgZnVubmV0IGZvciA8ZW0gY2xhc3M9XCJjdXJyZW50LXNlYXJjaFwiPiR7cX08L2VtPmA7XG4gIH07XG5cbiAgb3ZlcnJpZGUgY3VycmVudEhpdExhYmVsID0gKGN1cnJlbnRIaXQ6IG51bWJlciwgbnVtYmVyT2ZIaXRzOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gYCR7Y3VycmVudEhpdH0gYXYgJHtudW1iZXJPZkhpdHN9IHRyZWZmYDtcbiAgfTtcbn1cbiJdfQ==