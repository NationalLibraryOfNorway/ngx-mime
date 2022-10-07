import { Injectable } from '@angular/core';
import { MimeViewerIntl } from './viewer-intl';
import { HelpIntlLt } from './help-intl.lt';
import * as i0 from "@angular/core";
export class MimeViewerIntlLt extends MimeViewerIntl {
    constructor() {
        super(...arguments);
        this.help = new HelpIntlLt();
        this.closeLabel = 'Uždaryti';
        this.attributionLabel = 'Teisių priskyrimas';
        this.attributonCloseAriaLabel = 'Uždaryti teisių priskyrimo langą';
        this.recognizedTextContentLabel = 'Atpazīts teksts';
        this.contentsLabel = 'Informacija apie objektą';
        this.layoutMenuLabel = 'Žiūrėti';
        this.pageLayoutLabel = 'Puslapio išdėstymas';
        this.singlePageViewLabel = 'Atvaizduoti po vieną puslapį';
        this.twoPageViewLabel = 'Atvaizduoti po du puslapius';
        this.digitalTextLabel = 'Skaitmeninis tekstas';
        this.recognizedTextContentCloseLabel = 'Nė vienas';
        this.recognizedTextContentInSplitViewLabel = 'Suskaidytas';
        this.showRecognizedTextContentLabel = 'Tik skaitmeninis tekstas';
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
        this.rotationIsNotSupported = 'Sukimas jūsų įrenginyje nepalaikomas';
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
MimeViewerIntlLt.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: MimeViewerIntlLt, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
MimeViewerIntlLt.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: MimeViewerIntlLt });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: MimeViewerIntlLt, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwubHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLmx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRzVDLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxjQUFjO0lBRHBEOztRQUVFLFNBQUksR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFDeEIscUJBQWdCLEdBQUcsb0JBQW9CLENBQUM7UUFDeEMsNkJBQXdCLEdBQUcsa0NBQWtDLENBQUM7UUFDOUQsK0JBQTBCLEdBQUcsaUJBQWlCLENBQUM7UUFDL0Msa0JBQWEsR0FBRywwQkFBMEIsQ0FBQztRQUMzQyxvQkFBZSxHQUFHLFNBQVMsQ0FBQztRQUM1QixvQkFBZSxHQUFHLHFCQUFxQixDQUFDO1FBQ3hDLHdCQUFtQixHQUFHLDhCQUE4QixDQUFDO1FBQ3JELHFCQUFnQixHQUFHLDZCQUE2QixDQUFDO1FBQ2pELHFCQUFnQixHQUFHLHNCQUFzQixDQUFDO1FBQzFDLG9DQUErQixHQUFHLFdBQVcsQ0FBQztRQUM5QywwQ0FBcUMsR0FBRyxhQUFhLENBQUM7UUFDdEQsbUNBQThCLEdBQUcsMEJBQTBCLENBQUM7UUFDNUQsa0JBQWEsR0FBRyxjQUFjLENBQUM7UUFDL0IsaUJBQVksR0FBRyxXQUFXLENBQUM7UUFDM0IsYUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNyQixvQkFBZSxHQUFHLHNCQUFzQixDQUFDO1FBQ3pDLHdCQUFtQixHQUFHLCtCQUErQixDQUFDO1FBQ3RELGdCQUFXLEdBQUcsWUFBWSxDQUFDO1FBQzNCLGlCQUFZLEdBQUcsWUFBWSxDQUFDO1FBQzVCLHNCQUFpQixHQUFHLGdCQUFnQixDQUFDO1FBQ3JDLGtCQUFhLEdBQUcsZ0JBQWdCLENBQUM7UUFDakMsY0FBUyxHQUFHLGtCQUFrQixDQUFDO1FBQy9CLGtCQUFhLEdBQUcsYUFBYSxDQUFDO1FBQzlCLGdCQUFXLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLHFCQUFnQixHQUFHLFVBQVUsQ0FBQztRQUM5QixxQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztRQUN0QyxpQkFBWSxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLGtCQUFhLEdBQUcsc0JBQXNCLENBQUM7UUFDdkMscUJBQWdCLEdBQUcscUJBQXFCLENBQUM7UUFDekMsb0JBQWUsR0FBRywwQkFBMEIsQ0FBQztRQUM3QyxpQkFBWSxHQUFHLG9DQUFvQyxDQUFDO1FBQ3BELFlBQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUMzQiwyQkFBc0IsR0FBRyxzQ0FBc0MsQ0FBQztRQUVoRSxTQUFTO1FBQ1QsK0JBQTBCLEdBQUcsaUNBQWlDLENBQUM7UUFDL0QsNEJBQXVCLEdBQ3JCLHdEQUF3RCxDQUFDO1FBQzNELDBCQUFxQixHQUFHLHVDQUF1QyxDQUFDO1FBQ2hFLHNCQUFpQixHQUFHLDZCQUE2QixDQUFDO1FBQ2xELDBCQUFxQixHQUFHLHFDQUFxQyxDQUFDO1FBRTlELHdCQUFtQixHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7WUFDbEMsT0FBTyx5REFBeUQsQ0FBQyxPQUFPLENBQUM7UUFDM0UsQ0FBQyxDQUFDO1FBRUYsc0JBQWlCLEdBQUcsQ0FBQyxZQUFvQixFQUFFLENBQVMsRUFBRSxFQUFFO1lBQ3RELE9BQU8sR0FBRyxZQUFZLGFBQ3BCLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FDN0Isa0NBQWtDLENBQUMsT0FBTyxDQUFDO1FBQzdDLENBQUMsQ0FBQztRQUNGLG9CQUFlLEdBQUcsQ0FBQyxVQUFrQixFQUFFLFlBQW9CLEVBQUUsRUFBRTtZQUM3RCxPQUFPLEdBQUcsVUFBVSxPQUFPLFlBQVksYUFBYSxDQUFDO1FBQ3ZELENBQUMsQ0FBQztLQUNIOzs2R0F6RFksZ0JBQWdCO2lIQUFoQixnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBIZWxwSW50bEx0IH0gZnJvbSAnLi9oZWxwLWludGwubHQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWltZVZpZXdlckludGxMdCBleHRlbmRzIE1pbWVWaWV3ZXJJbnRsIHtcbiAgaGVscCA9IG5ldyBIZWxwSW50bEx0KCk7XG4gIGNsb3NlTGFiZWwgPSAnVcW+ZGFyeXRpJztcbiAgYXR0cmlidXRpb25MYWJlbCA9ICdUZWlzacWzIHByaXNreXJpbWFzJztcbiAgYXR0cmlidXRvbkNsb3NlQXJpYUxhYmVsID0gJ1XFvmRhcnl0aSB0ZWlzacWzIHByaXNreXJpbW8gbGFuZ8SFJztcbiAgcmVjb2duaXplZFRleHRDb250ZW50TGFiZWwgPSAnQXRwYXrEq3RzIHRla3N0cyc7XG4gIGNvbnRlbnRzTGFiZWwgPSAnSW5mb3JtYWNpamEgYXBpZSBvYmpla3TEhSc7XG4gIGxheW91dE1lbnVMYWJlbCA9ICfFvWnFq3LEl3RpJztcbiAgcGFnZUxheW91dExhYmVsID0gJ1B1c2xhcGlvIGnFoWTEl3N0eW1hcyc7XG4gIHNpbmdsZVBhZ2VWaWV3TGFiZWwgPSAnQXR2YWl6ZHVvdGkgcG8gdmllbsSFIHB1c2xhcMSvJztcbiAgdHdvUGFnZVZpZXdMYWJlbCA9ICdBdHZhaXpkdW90aSBwbyBkdSBwdXNsYXBpdXMnO1xuICBkaWdpdGFsVGV4dExhYmVsID0gJ1NrYWl0bWVuaW5pcyB0ZWtzdGFzJztcbiAgcmVjb2duaXplZFRleHRDb250ZW50Q2xvc2VMYWJlbCA9ICdOxJcgdmllbmFzJztcbiAgcmVjb2duaXplZFRleHRDb250ZW50SW5TcGxpdFZpZXdMYWJlbCA9ICdTdXNrYWlkeXRhcyc7XG4gIHNob3dSZWNvZ25pemVkVGV4dENvbnRlbnRMYWJlbCA9ICdUaWsgc2thaXRtZW5pbmlzIHRla3N0YXMnO1xuICBtZXRhZGF0YUxhYmVsID0gJ01ldGFkdW9tZW55cyc7XG4gIGxpY2Vuc2VMYWJlbCA9ICdMaWNlbmNpamEnO1xuICB0b2NMYWJlbCA9ICdUdXJpbnlzJztcbiAgZnVsbFNjcmVlbkxhYmVsID0gJ1BpbG5vIGVrcmFubyByZcW+aW1hcyc7XG4gIGV4aXRGdWxsU2NyZWVuTGFiZWwgPSAnScWhZWl0aSBpxaEgcGlsbm8gZWtyYW5vIHJlxb5pbW8nO1xuICB6b29tSW5MYWJlbCA9ICdQcmlhcnRpbnRpJztcbiAgem9vbU91dExhYmVsID0gJ0F0aXRvbGludGknO1xuICBwcmV2aW91c1BhZ2VMYWJlbCA9ICdCdXbEmXMgcHVzbGFwaXMnO1xuICBuZXh0UGFnZUxhYmVsID0gJ0tpdGFzIHB1c2xhcGlzJztcbiAgaG9tZUxhYmVsID0gJ0dyxK/FvnRpIMSvIHByYWTFvmnEhSc7XG4gIHJvdGF0ZUN3TGFiZWwgPSAnUGFzdWt0aSA5MMKwJztcbiAgc2VhcmNoTGFiZWwgPSAnUGFpZcWha2EnO1xuICBjbGVhclNlYXJjaExhYmVsID0gJ0nFoXZhbHl0aSc7XG4gIHByZXZpb3VzSGl0TGFiZWwgPSAnQnV2xJlzIHJlenVsdGF0YXMnO1xuICBuZXh0SGl0TGFiZWwgPSAnS2l0YXMgcmV6dWx0YXRhcyc7XG4gIGdvVG9QYWdlTGFiZWwgPSAnUGVyc2lrZWx0aSDEryBwdXNsYXDEryc7XG4gIGN1cnJlbnRQYWdlTGFiZWwgPSAnRGFiYXJ0aW5pcyBwdXNsYXBpcyc7XG4gIGVudGVyUGFnZU51bWJlciA9ICfErnZlc2tpdGUgcHVzbGFwaW8gbnVtZXLEryc7XG4gIGRyb3BEaXNhYmxlZCA9ICdBdGxlaXNraXRlLCBiZXQgdmVpa3NtYXMgbmVnYWxpbWFzJztcbiAgbG9hZGluZyA9ICdQYWtyb3ZpbWFzIC4uLic7XG4gIHJvdGF0aW9uSXNOb3RTdXBwb3J0ZWQgPSAnU3VraW1hcyBqxatzxbMgxK9yZW5naW55amUgbmVwYWxhaWtvbWFzJztcblxuICAvLyBFUlJPUlNcbiAgc29tZXRoaW5nSGFzR29uZVdyb25nTGFiZWwgPSAnT2JqZWt0byBhdHZhaXpkdW90aSBuZXBhdnlrby4uLic7XG4gIG1hbmlmZXN0VXJpTWlzc2luZ0xhYmVsID1cbiAgICAnTmVyYXN0YXMgb2JqZWt0xbMgc8SFcmHFoW8gaWRlbnRpZmlrYXRvcml1cyAoTWFuaWZlc3RVcmkpJztcbiAgbWFuaWZlc3ROb3RWYWxpZExhYmVsID0gJ05ldGlua2FtYXMgb2JqZWt0xbMgc8SFcmHFoWFzIChNYW5pZmVzdCknO1xuICBwYWdlRG9lc05vdEV4aXN0cyA9ICdOZXBhdnlrbyByYXN0aSDFoWlvIHBhc2xhcGlvJztcbiAgdGV4dENvbnRlbnRFcnJvckxhYmVsID0gJ0F0c2lwcmHFoWF1LCBiZXQgbmVyYW5kdSBqdW1zIHRla3N0byc7XG5cbiAgbm9SZXN1bHRzRm91bmRMYWJlbCA9IChxOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gYE9iamVrdGUgbmVyYXN0YSBhdGl0aWttZW7FsyA8ZW0gY2xhc3M9XCJjdXJyZW50LXNlYXJjaFwiPiR7cX08L2VtPmA7XG4gIH07XG5cbiAgcmVzdWx0c0ZvdW5kTGFiZWwgPSAobnVtYmVyT2ZIaXRzOiBudW1iZXIsIHE6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBgJHtudW1iZXJPZkhpdHN9IHJlenVsdGF0YSR7XG4gICAgICBudW1iZXJPZkhpdHMgPT09IDEgPyAncycgOiAnaSdcbiAgICB9IHN1IDxlbSBjbGFzcz1cImN1cnJlbnQtc2VhcmNoXCI+JHtxfTwvZW0+YDtcbiAgfTtcbiAgY3VycmVudEhpdExhYmVsID0gKGN1cnJlbnRIaXQ6IG51bWJlciwgbnVtYmVyT2ZIaXRzOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gYCR7Y3VycmVudEhpdH0gacWhICR7bnVtYmVyT2ZIaXRzfSBhdGl0aWttZW7Fs2A7XG4gIH07XG59XG4iXX0=