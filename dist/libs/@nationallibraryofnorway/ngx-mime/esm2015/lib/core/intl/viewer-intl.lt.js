import { Injectable } from '@angular/core';
import { MimeViewerIntl } from './viewer-intl';
import { HelpIntlLt } from './help-intl.lt';
export class MimeViewerIntlLt extends MimeViewerIntl {
    constructor() {
        super(...arguments);
        this.help = new HelpIntlLt();
        this.closeLabel = 'Uždaryti';
        this.attributionLabel = 'Teisių priskyrimas';
        this.attributonCloseAriaLabel = 'Uždaryti teisių priskyrimo langą';
        this.recognizedTextContentLabel = 'Atpazīts teksts';
        this.contentsLabel = 'Informacija apie objektą';
        this.twoPageViewLabel = 'Atvaizduoti po du puslapius';
        this.singlePageViewLabel = 'Atvaizduoti po vieną puslapį';
        this.metadataLabel = 'Metaduomenys';
        this.licenseLabel = 'Licencija';
        this.tocLabel = 'Turinys';
        this.fullScreenLabel = 'Pilno ekrano režimas';
        this.exitFullScreenLabel = 'Išeiti iš pilno ekrano režimo';
        this.zoomInLabel = 'Priartinti';
        this.zoomOutLabel = 'Atitolinti';
        this.previousPageLabel = 'Buvęs puslapis';
        this.nextPageLabel = 'Kitas puslapis';
        this.homeLabel = 'Grįžti į pradžią';
        this.rotateCwLabel = 'Pasukti 90°';
        this.searchLabel = 'Paieška';
        this.clearSearchLabel = 'Išvalyti';
        this.previousHitLabel = 'Buvęs rezultatas';
        this.nextHitLabel = 'Kitas rezultatas';
        this.goToPageLabel = 'Persikelti į puslapį';
        this.currentPageLabel = 'Dabartinis puslapis';
        this.enterPageNumber = 'Įveskite puslapio numerį';
        this.dropDisabled = 'Atleiskite, bet veiksmas negalimas';
        this.loading = 'Pakrovimas ...';
        // ERRORS
        this.somethingHasGoneWrongLabel = 'Objekto atvaizduoti nepavyko...';
        this.manifestUriMissingLabel = 'Nerastas objektų sąrašo identifikatorius (ManifestUri)';
        this.manifestNotValidLabel = 'Netinkamas objektų sąrašas (Manifest)';
        this.pageDoesNotExists = 'Nepavyko rasti šio paslapio';
        this.textContentErrorLabel = 'Atsiprašau, bet nerandu jums teksto';
        this.noResultsFoundLabel = (q) => {
            return `Objekte nerasta atitikmenų <em class="current-search">${q}</em>`;
        };
        this.resultsFoundLabel = (numberOfHits, q) => {
            return `${numberOfHits} rezultata${numberOfHits === 1 ? 's' : 'i'} su <em class="current-search">${q}</em>`;
        };
        this.currentHitLabel = (currentHit, numberOfHits) => {
            return `${currentHit} iš ${numberOfHits} atitikmenų`;
        };
    }
}
MimeViewerIntlLt.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwubHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLmx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHNUMsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGNBQWM7SUFEcEQ7O1FBRUUsU0FBSSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDeEIsZUFBVSxHQUFHLFVBQVUsQ0FBQztRQUN4QixxQkFBZ0IsR0FBRyxvQkFBb0IsQ0FBQztRQUN4Qyw2QkFBd0IsR0FBRyxrQ0FBa0MsQ0FBQztRQUM5RCwrQkFBMEIsR0FBRyxpQkFBaUIsQ0FBQztRQUMvQyxrQkFBYSxHQUFHLDBCQUEwQixDQUFDO1FBQzNDLHFCQUFnQixHQUFHLDZCQUE2QixDQUFDO1FBQ2pELHdCQUFtQixHQUFHLDhCQUE4QixDQUFDO1FBQ3JELGtCQUFhLEdBQUcsY0FBYyxDQUFDO1FBQy9CLGlCQUFZLEdBQUcsV0FBVyxDQUFDO1FBQzNCLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFDckIsb0JBQWUsR0FBRyxzQkFBc0IsQ0FBQztRQUN6Qyx3QkFBbUIsR0FBRywrQkFBK0IsQ0FBQztRQUN0RCxnQkFBVyxHQUFHLFlBQVksQ0FBQztRQUMzQixpQkFBWSxHQUFHLFlBQVksQ0FBQztRQUM1QixzQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztRQUNyQyxrQkFBYSxHQUFHLGdCQUFnQixDQUFDO1FBQ2pDLGNBQVMsR0FBRyxrQkFBa0IsQ0FBQztRQUMvQixrQkFBYSxHQUFHLGFBQWEsQ0FBQztRQUM5QixnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQUN4QixxQkFBZ0IsR0FBRyxVQUFVLENBQUM7UUFDOUIscUJBQWdCLEdBQUcsa0JBQWtCLENBQUM7UUFDdEMsaUJBQVksR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxrQkFBYSxHQUFHLHNCQUFzQixDQUFDO1FBQ3ZDLHFCQUFnQixHQUFHLHFCQUFxQixDQUFDO1FBQ3pDLG9CQUFlLEdBQUcsMEJBQTBCLENBQUM7UUFDN0MsaUJBQVksR0FBRyxvQ0FBb0MsQ0FBQztRQUNwRCxZQUFPLEdBQUcsZ0JBQWdCLENBQUM7UUFFM0IsU0FBUztRQUNULCtCQUEwQixHQUFHLGlDQUFpQyxDQUFDO1FBQy9ELDRCQUF1QixHQUFHLHdEQUF3RCxDQUFDO1FBQ25GLDBCQUFxQixHQUFHLHVDQUF1QyxDQUFDO1FBQ2hFLHNCQUFpQixHQUFHLDZCQUE2QixDQUFDO1FBQ2xELDBCQUFxQixHQUFHLHFDQUFxQyxDQUFDO1FBRTlELHdCQUFtQixHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7WUFDbEMsT0FBTyx5REFBeUQsQ0FBQyxPQUFPLENBQUM7UUFDM0UsQ0FBQyxDQUFDO1FBRUYsc0JBQWlCLEdBQUcsQ0FBQyxZQUFvQixFQUFFLENBQVMsRUFBRSxFQUFFO1lBQ3RELE9BQU8sR0FBRyxZQUFZLGFBQWEsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLGtDQUFrQyxDQUFDLE9BQU8sQ0FBQztRQUM5RyxDQUFDLENBQUM7UUFDRixvQkFBZSxHQUFHLENBQUMsVUFBa0IsRUFBRSxZQUFvQixFQUFFLEVBQUU7WUFDN0QsT0FBTyxHQUFHLFVBQVUsT0FBTyxZQUFZLGFBQWEsQ0FBQztRQUN2RCxDQUFDLENBQUM7SUFDSixDQUFDOzs7WUFoREEsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBIZWxwSW50bEx0IH0gZnJvbSAnLi9oZWxwLWludGwubHQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWltZVZpZXdlckludGxMdCBleHRlbmRzIE1pbWVWaWV3ZXJJbnRsIHtcbiAgaGVscCA9IG5ldyBIZWxwSW50bEx0KCk7XG4gIGNsb3NlTGFiZWwgPSAnVcW+ZGFyeXRpJztcbiAgYXR0cmlidXRpb25MYWJlbCA9ICdUZWlzacWzIHByaXNreXJpbWFzJztcbiAgYXR0cmlidXRvbkNsb3NlQXJpYUxhYmVsID0gJ1XFvmRhcnl0aSB0ZWlzacWzIHByaXNreXJpbW8gbGFuZ8SFJztcbiAgcmVjb2duaXplZFRleHRDb250ZW50TGFiZWwgPSAnQXRwYXrEq3RzIHRla3N0cyc7XG4gIGNvbnRlbnRzTGFiZWwgPSAnSW5mb3JtYWNpamEgYXBpZSBvYmpla3TEhSc7XG4gIHR3b1BhZ2VWaWV3TGFiZWwgPSAnQXR2YWl6ZHVvdGkgcG8gZHUgcHVzbGFwaXVzJztcbiAgc2luZ2xlUGFnZVZpZXdMYWJlbCA9ICdBdHZhaXpkdW90aSBwbyB2aWVuxIUgcHVzbGFwxK8nO1xuICBtZXRhZGF0YUxhYmVsID0gJ01ldGFkdW9tZW55cyc7XG4gIGxpY2Vuc2VMYWJlbCA9ICdMaWNlbmNpamEnO1xuICB0b2NMYWJlbCA9ICdUdXJpbnlzJztcbiAgZnVsbFNjcmVlbkxhYmVsID0gJ1BpbG5vIGVrcmFubyByZcW+aW1hcyc7XG4gIGV4aXRGdWxsU2NyZWVuTGFiZWwgPSAnScWhZWl0aSBpxaEgcGlsbm8gZWtyYW5vIHJlxb5pbW8nO1xuICB6b29tSW5MYWJlbCA9ICdQcmlhcnRpbnRpJztcbiAgem9vbU91dExhYmVsID0gJ0F0aXRvbGludGknO1xuICBwcmV2aW91c1BhZ2VMYWJlbCA9ICdCdXbEmXMgcHVzbGFwaXMnO1xuICBuZXh0UGFnZUxhYmVsID0gJ0tpdGFzIHB1c2xhcGlzJztcbiAgaG9tZUxhYmVsID0gJ0dyxK/FvnRpIMSvIHByYWTFvmnEhSc7XG4gIHJvdGF0ZUN3TGFiZWwgPSAnUGFzdWt0aSA5MMKwJztcbiAgc2VhcmNoTGFiZWwgPSAnUGFpZcWha2EnO1xuICBjbGVhclNlYXJjaExhYmVsID0gJ0nFoXZhbHl0aSc7XG4gIHByZXZpb3VzSGl0TGFiZWwgPSAnQnV2xJlzIHJlenVsdGF0YXMnO1xuICBuZXh0SGl0TGFiZWwgPSAnS2l0YXMgcmV6dWx0YXRhcyc7XG4gIGdvVG9QYWdlTGFiZWwgPSAnUGVyc2lrZWx0aSDEryBwdXNsYXDEryc7XG4gIGN1cnJlbnRQYWdlTGFiZWwgPSAnRGFiYXJ0aW5pcyBwdXNsYXBpcyc7XG4gIGVudGVyUGFnZU51bWJlciA9ICfErnZlc2tpdGUgcHVzbGFwaW8gbnVtZXLEryc7XG4gIGRyb3BEaXNhYmxlZCA9ICdBdGxlaXNraXRlLCBiZXQgdmVpa3NtYXMgbmVnYWxpbWFzJztcbiAgbG9hZGluZyA9ICdQYWtyb3ZpbWFzIC4uLic7XG5cbiAgLy8gRVJST1JTXG4gIHNvbWV0aGluZ0hhc0dvbmVXcm9uZ0xhYmVsID0gJ09iamVrdG8gYXR2YWl6ZHVvdGkgbmVwYXZ5a28uLi4nO1xuICBtYW5pZmVzdFVyaU1pc3NpbmdMYWJlbCA9ICdOZXJhc3RhcyBvYmpla3TFsyBzxIVyYcWhbyBpZGVudGlmaWthdG9yaXVzIChNYW5pZmVzdFVyaSknO1xuICBtYW5pZmVzdE5vdFZhbGlkTGFiZWwgPSAnTmV0aW5rYW1hcyBvYmpla3TFsyBzxIVyYcWhYXMgKE1hbmlmZXN0KSc7XG4gIHBhZ2VEb2VzTm90RXhpc3RzID0gJ05lcGF2eWtvIHJhc3RpIMWhaW8gcGFzbGFwaW8nO1xuICB0ZXh0Q29udGVudEVycm9yTGFiZWwgPSAnQXRzaXByYcWhYXUsIGJldCBuZXJhbmR1IGp1bXMgdGVrc3RvJztcblxuICBub1Jlc3VsdHNGb3VuZExhYmVsID0gKHE6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBgT2JqZWt0ZSBuZXJhc3RhIGF0aXRpa21lbsWzIDxlbSBjbGFzcz1cImN1cnJlbnQtc2VhcmNoXCI+JHtxfTwvZW0+YDtcbiAgfTtcblxuICByZXN1bHRzRm91bmRMYWJlbCA9IChudW1iZXJPZkhpdHM6IG51bWJlciwgcTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGAke251bWJlck9mSGl0c30gcmV6dWx0YXRhJHtudW1iZXJPZkhpdHMgPT09IDEgPyAncycgOiAnaSd9IHN1IDxlbSBjbGFzcz1cImN1cnJlbnQtc2VhcmNoXCI+JHtxfTwvZW0+YDtcbiAgfTtcbiAgY3VycmVudEhpdExhYmVsID0gKGN1cnJlbnRIaXQ6IG51bWJlciwgbnVtYmVyT2ZIaXRzOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gYCR7Y3VycmVudEhpdH0gacWhICR7bnVtYmVyT2ZIaXRzfSBhdGl0aWttZW7Fs2A7XG4gIH07XG59XG4iXX0=