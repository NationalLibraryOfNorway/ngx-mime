import { Injectable } from '@angular/core';
import { MimeViewerIntl } from './viewer-intl';
import { HelpIntlNoNb } from './help-intl.no_nb';
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
MimeViewerIntlNoNb.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwubm9fbmIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLm5vX25iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHakQsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGNBQWM7SUFEdEQ7O1FBRUUsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDMUIsZUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixxQkFBZ0IsR0FBRyxZQUFZLENBQUM7UUFDaEMsNkJBQXdCLEdBQUcseUJBQXlCLENBQUM7UUFDckQsK0JBQTBCLEdBQUcsaUJBQWlCLENBQUM7UUFDL0Msa0JBQWEsR0FBRyxTQUFTLENBQUM7UUFDMUIscUJBQWdCLEdBQUcsZUFBZSxDQUFDO1FBQ25DLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDO1FBQzFDLGtCQUFhLEdBQUcsVUFBVSxDQUFDO1FBQzNCLGlCQUFZLEdBQUcsUUFBUSxDQUFDO1FBQ3hCLGFBQVEsR0FBRyxxQkFBcUIsQ0FBQztRQUNqQyxvQkFBZSxHQUFHLFlBQVksQ0FBQztRQUMvQix3QkFBbUIsR0FBRyxvQkFBb0IsQ0FBQztRQUMzQyxnQkFBVyxHQUFHLFVBQVUsQ0FBQztRQUN6QixpQkFBWSxHQUFHLFNBQVMsQ0FBQztRQUN6QixzQkFBaUIsR0FBRyxjQUFjLENBQUM7UUFDbkMsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFDN0IsY0FBUyxHQUFHLE1BQU0sQ0FBQztRQUNuQixrQkFBYSxHQUFHLFdBQVcsQ0FBQztRQUM1QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIscUJBQWdCLEdBQUcsZUFBZSxDQUFDO1FBQ25DLGlCQUFZLEdBQUcsYUFBYSxDQUFDO1FBQzdCLGtCQUFhLEdBQUcsYUFBYSxDQUFDO1FBQzlCLHFCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3BDLG9CQUFlLEdBQUcsc0JBQXNCLENBQUM7UUFDekMsaUJBQVksR0FBRyw4Q0FBOEMsQ0FBQztRQUM5RCxZQUFPLEdBQUcsWUFBWSxDQUFDO1FBRXZCLFNBQVM7UUFDVCwrQkFBMEIsR0FBRyw2QkFBNkIsQ0FBQztRQUMzRCw0QkFBdUIsR0FBRyw0QkFBNEIsQ0FBQztRQUN2RCwwQkFBcUIsR0FBRywyQkFBMkIsQ0FBQztRQUNwRCxzQkFBaUIsR0FBRyxxQ0FBcUMsQ0FBQztRQUMxRCwwQkFBcUIsR0FBRywrQ0FBK0MsQ0FBQztRQUV4RSx3QkFBbUIsR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFO1lBQ2xDLE9BQU8scURBQXFELENBQUMsT0FBTyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQztRQUVGLHNCQUFpQixHQUFHLENBQUMsWUFBb0IsRUFBRSxDQUFTLEVBQUUsRUFBRTtZQUN0RCxPQUFPLEdBQUcsWUFBWSxnREFBZ0QsQ0FBQyxPQUFPLENBQUM7UUFDakYsQ0FBQyxDQUFDO1FBRUYsb0JBQWUsR0FBRyxDQUFDLFVBQWtCLEVBQUUsWUFBb0IsRUFBRSxFQUFFO1lBQzdELE9BQU8sR0FBRyxVQUFVLE9BQU8sWUFBWSxRQUFRLENBQUM7UUFDbEQsQ0FBQyxDQUFDO0lBQ0osQ0FBQzs7O1lBakRBLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4vdmlld2VyLWludGwnO1xuaW1wb3J0IHsgSGVscEludGxOb05iIH0gZnJvbSAnLi9oZWxwLWludGwubm9fbmInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWltZVZpZXdlckludGxOb05iIGV4dGVuZHMgTWltZVZpZXdlckludGwge1xuICBoZWxwID0gbmV3IEhlbHBJbnRsTm9OYigpO1xuICBjbG9zZUxhYmVsID0gJ0x1a2snO1xuICBhdHRyaWJ1dGlvbkxhYmVsID0gJ1RpbGxhdGVsc2UnO1xuICBhdHRyaWJ1dG9uQ2xvc2VBcmlhTGFiZWwgPSAnU3RlbmcgdGlsbGF0ZWxzZSBkaWFsb2cnO1xuICByZWNvZ25pemVkVGV4dENvbnRlbnRMYWJlbCA9ICdHamVua2plbnQgdGVrc3QnO1xuICBjb250ZW50c0xhYmVsID0gJ0lubmhvbGQnO1xuICB0d29QYWdlVmlld0xhYmVsID0gJ1Rvc2lkZXZpc25pbmcnO1xuICBzaW5nbGVQYWdlVmlld0xhYmVsID0gJ0Vua2VsdHNpZGV2aXNuaW5nJztcbiAgbWV0YWRhdGFMYWJlbCA9ICdNZXRhZGF0YSc7XG4gIGxpY2Vuc2VMYWJlbCA9ICdMaXNlbnMnO1xuICB0b2NMYWJlbCA9ICdJbm5ob2xkc2ZvcnRlZ25lbHNlJztcbiAgZnVsbFNjcmVlbkxhYmVsID0gJ0Z1bGxza2plcm0nO1xuICBleGl0RnVsbFNjcmVlbkxhYmVsID0gJ0F2c2x1dHQgZnVsbHNramVybSc7XG4gIHpvb21JbkxhYmVsID0gJ1pvb20gaW5uJztcbiAgem9vbU91dExhYmVsID0gJ1pvb20gdXQnO1xuICBwcmV2aW91c1BhZ2VMYWJlbCA9ICdGb3JyaWdlIHNpZGUnO1xuICBuZXh0UGFnZUxhYmVsID0gJ05lc3RlIHNpZGUnO1xuICBob21lTGFiZWwgPSAnSGplbSc7XG4gIHJvdGF0ZUN3TGFiZWwgPSAnUm90w6lyIDkwwrAnO1xuICBzZWFyY2hMYWJlbCA9ICdTw7hrJztcbiAgY2xlYXJTZWFyY2hMYWJlbCA9ICdUw7htJztcbiAgcHJldmlvdXNIaXRMYWJlbCA9ICdGb3JyaWdlIHRyZWZmJztcbiAgbmV4dEhpdExhYmVsID0gJ05lc3RlIHRyZWZmJztcbiAgZ29Ub1BhZ2VMYWJlbCA9ICdHw6UgdGlsIHNpZGUnO1xuICBjdXJyZW50UGFnZUxhYmVsID0gJ07DpXbDpnJlbmRlIHNpZGUnO1xuICBlbnRlclBhZ2VOdW1iZXIgPSAnU2tyaXYgaW5uIHNpZGVudW1tZXInO1xuICBkcm9wRGlzYWJsZWQgPSAnQmVrbGFnZXIsIG1lbiBkcmFnIGFuZCBkcm9wIGVyIGlra2UgYWt0aXZlcnQnO1xuICBsb2FkaW5nID0gJ0xhc3RlciAuLi4nO1xuXG4gIC8vIEVSUk9SU1xuICBzb21ldGhpbmdIYXNHb25lV3JvbmdMYWJlbCA9ICfDhSBuZWkhIE5vZSBoYXIgZ8OldHQgZ2FsdC4uLic7XG4gIG1hbmlmZXN0VXJpTWlzc2luZ0xhYmVsID0gJ0xlbmtlIHRpbCBtYW5pZmVzdCBtYW5nbGVyJztcbiAgbWFuaWZlc3ROb3RWYWxpZExhYmVsID0gJ01hbmlmZXN0ZXQgZXIgaWtrZSBneWxkaWcnO1xuICBwYWdlRG9lc05vdEV4aXN0cyA9ICdCZWtsYWdlciwgbWVuIGRlbiBzaWRlbiBmaW5uZXMgaWtrZSc7XG4gIHRleHRDb250ZW50RXJyb3JMYWJlbCA9ICdCZWtsYWdlciwgbWVuIGplZyBmaW5uZXIgaWtrZSB0ZWtzdGVuIGZvciBkZWcnO1xuXG4gIG5vUmVzdWx0c0ZvdW5kTGFiZWwgPSAocTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGBJbmdlbiB0cmVmZiBmdW5uZXQgZm9yIDxlbSBjbGFzcz1cImN1cnJlbnQtc2VhcmNoXCI+JHtxfTwvZW0+YDtcbiAgfTtcblxuICByZXN1bHRzRm91bmRMYWJlbCA9IChudW1iZXJPZkhpdHM6IG51bWJlciwgcTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGAke251bWJlck9mSGl0c30gdHJlZmYgZnVubmV0IGZvciA8ZW0gY2xhc3M9XCJjdXJyZW50LXNlYXJjaFwiPiR7cX08L2VtPmA7XG4gIH07XG5cbiAgY3VycmVudEhpdExhYmVsID0gKGN1cnJlbnRIaXQ6IG51bWJlciwgbnVtYmVyT2ZIaXRzOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gYCR7Y3VycmVudEhpdH0gYXYgJHtudW1iZXJPZkhpdHN9IHRyZWZmYDtcbiAgfTtcbn1cbiJdfQ==