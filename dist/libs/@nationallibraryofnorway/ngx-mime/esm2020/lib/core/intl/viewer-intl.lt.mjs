import { Injectable } from '@angular/core';
import { HelpIntlLt } from './help-intl.lt';
import { MimeViewerIntl } from './viewer-intl';
import * as i0 from "@angular/core";
export class MimeViewerIntlLt extends MimeViewerIntl {
    constructor() {
        super(...arguments);
        this.help = new HelpIntlLt();
        this.closeLabel = 'Uždaryti';
        this.attributionLabel = 'Teisių priskyrimas';
        this.attributonCloseAriaLabel = 'Uždaryti teisių priskyrimo langą';
        this.helpCloseAriaLabel = 'Uždaryti pagalbos dialogo langą';
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
MimeViewerIntlLt.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeViewerIntlLt, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
MimeViewerIntlLt.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeViewerIntlLt });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeViewerIntlLt, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwubHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLmx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRy9DLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxjQUFjO0lBRHBEOztRQUVXLFNBQUksR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFDeEIscUJBQWdCLEdBQUcsb0JBQW9CLENBQUM7UUFDeEMsNkJBQXdCLEdBQUcsa0NBQWtDLENBQUM7UUFDOUQsdUJBQWtCLEdBQUcsaUNBQWlDLENBQUM7UUFDdkQsa0JBQWEsR0FBRywwQkFBMEIsQ0FBQztRQUMzQyxvQkFBZSxHQUFHLFNBQVMsQ0FBQztRQUM1QixvQkFBZSxHQUFHLHFCQUFxQixDQUFDO1FBQ3hDLHdCQUFtQixHQUFHLDhCQUE4QixDQUFDO1FBQ3JELHFCQUFnQixHQUFHLDZCQUE2QixDQUFDO1FBQ2pELHFCQUFnQixHQUFHLHNCQUFzQixDQUFDO1FBQzFDLG9DQUErQixHQUFHLFdBQVcsQ0FBQztRQUM5QywwQ0FBcUMsR0FBRyxhQUFhLENBQUM7UUFDdEQsbUNBQThCLEdBQUcsMEJBQTBCLENBQUM7UUFDNUQsa0JBQWEsR0FBRyxjQUFjLENBQUM7UUFDL0IsaUJBQVksR0FBRyxXQUFXLENBQUM7UUFDM0IsYUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNyQixvQkFBZSxHQUFHLHNCQUFzQixDQUFDO1FBQ3pDLHdCQUFtQixHQUFHLCtCQUErQixDQUFDO1FBQ3RELGdCQUFXLEdBQUcsWUFBWSxDQUFDO1FBQzNCLGlCQUFZLEdBQUcsWUFBWSxDQUFDO1FBQzVCLHNCQUFpQixHQUFHLGdCQUFnQixDQUFDO1FBQ3JDLGtCQUFhLEdBQUcsZ0JBQWdCLENBQUM7UUFDakMsY0FBUyxHQUFHLGtCQUFrQixDQUFDO1FBQy9CLGtCQUFhLEdBQUcsYUFBYSxDQUFDO1FBQzlCLGdCQUFXLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLHFCQUFnQixHQUFHLFVBQVUsQ0FBQztRQUM5QixxQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztRQUN0QyxpQkFBWSxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLGtCQUFhLEdBQUcsc0JBQXNCLENBQUM7UUFDdkMscUJBQWdCLEdBQUcscUJBQXFCLENBQUM7UUFDekMsb0JBQWUsR0FBRywwQkFBMEIsQ0FBQztRQUM3QyxpQkFBWSxHQUFHLG9DQUFvQyxDQUFDO1FBQ3BELFlBQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUMzQiwyQkFBc0IsR0FBRyxzQ0FBc0MsQ0FBQztRQUV6RSxTQUFTO1FBQ0EsK0JBQTBCLEdBQUcsaUNBQWlDLENBQUM7UUFDL0QsNEJBQXVCLEdBQzlCLHdEQUF3RCxDQUFDO1FBQ2xELDBCQUFxQixHQUFHLHVDQUF1QyxDQUFDO1FBQ2hFLHNCQUFpQixHQUFHLDZCQUE2QixDQUFDO1FBQ2xELDBCQUFxQixHQUFHLHFDQUFxQyxDQUFDO1FBRTlELHdCQUFtQixHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7WUFDM0MsT0FBTyx5REFBeUQsQ0FBQyxPQUFPLENBQUM7UUFDM0UsQ0FBQyxDQUFDO1FBRU8sc0JBQWlCLEdBQUcsQ0FBQyxZQUFvQixFQUFFLENBQVMsRUFBRSxFQUFFO1lBQy9ELE9BQU8sR0FBRyxZQUFZLGFBQ3BCLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FDN0Isa0NBQWtDLENBQUMsT0FBTyxDQUFDO1FBQzdDLENBQUMsQ0FBQztRQUNPLG9CQUFlLEdBQUcsQ0FBQyxVQUFrQixFQUFFLFlBQW9CLEVBQUUsRUFBRTtZQUN0RSxPQUFPLEdBQUcsVUFBVSxPQUFPLFlBQVksYUFBYSxDQUFDO1FBQ3ZELENBQUMsQ0FBQztLQUNIOzs2R0F6RFksZ0JBQWdCO2lIQUFoQixnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlbHBJbnRsTHQgfSBmcm9tICcuL2hlbHAtaW50bC5sdCc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4vdmlld2VyLWludGwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWltZVZpZXdlckludGxMdCBleHRlbmRzIE1pbWVWaWV3ZXJJbnRsIHtcbiAgb3ZlcnJpZGUgaGVscCA9IG5ldyBIZWxwSW50bEx0KCk7XG4gIG92ZXJyaWRlIGNsb3NlTGFiZWwgPSAnVcW+ZGFyeXRpJztcbiAgb3ZlcnJpZGUgYXR0cmlidXRpb25MYWJlbCA9ICdUZWlzacWzIHByaXNreXJpbWFzJztcbiAgb3ZlcnJpZGUgYXR0cmlidXRvbkNsb3NlQXJpYUxhYmVsID0gJ1XFvmRhcnl0aSB0ZWlzacWzIHByaXNreXJpbW8gbGFuZ8SFJztcbiAgb3ZlcnJpZGUgaGVscENsb3NlQXJpYUxhYmVsID0gJ1XFvmRhcnl0aSBwYWdhbGJvcyBkaWFsb2dvIGxhbmfEhSc7XG4gIG92ZXJyaWRlIGNvbnRlbnRzTGFiZWwgPSAnSW5mb3JtYWNpamEgYXBpZSBvYmpla3TEhSc7XG4gIG92ZXJyaWRlIGxheW91dE1lbnVMYWJlbCA9ICfFvWnFq3LEl3RpJztcbiAgb3ZlcnJpZGUgcGFnZUxheW91dExhYmVsID0gJ1B1c2xhcGlvIGnFoWTEl3N0eW1hcyc7XG4gIG92ZXJyaWRlIHNpbmdsZVBhZ2VWaWV3TGFiZWwgPSAnQXR2YWl6ZHVvdGkgcG8gdmllbsSFIHB1c2xhcMSvJztcbiAgb3ZlcnJpZGUgdHdvUGFnZVZpZXdMYWJlbCA9ICdBdHZhaXpkdW90aSBwbyBkdSBwdXNsYXBpdXMnO1xuICBvdmVycmlkZSBkaWdpdGFsVGV4dExhYmVsID0gJ1NrYWl0bWVuaW5pcyB0ZWtzdGFzJztcbiAgb3ZlcnJpZGUgcmVjb2duaXplZFRleHRDb250ZW50Q2xvc2VMYWJlbCA9ICdOxJcgdmllbmFzJztcbiAgb3ZlcnJpZGUgcmVjb2duaXplZFRleHRDb250ZW50SW5TcGxpdFZpZXdMYWJlbCA9ICdTdXNrYWlkeXRhcyc7XG4gIG92ZXJyaWRlIHNob3dSZWNvZ25pemVkVGV4dENvbnRlbnRMYWJlbCA9ICdUaWsgc2thaXRtZW5pbmlzIHRla3N0YXMnO1xuICBvdmVycmlkZSBtZXRhZGF0YUxhYmVsID0gJ01ldGFkdW9tZW55cyc7XG4gIG92ZXJyaWRlIGxpY2Vuc2VMYWJlbCA9ICdMaWNlbmNpamEnO1xuICBvdmVycmlkZSB0b2NMYWJlbCA9ICdUdXJpbnlzJztcbiAgb3ZlcnJpZGUgZnVsbFNjcmVlbkxhYmVsID0gJ1BpbG5vIGVrcmFubyByZcW+aW1hcyc7XG4gIG92ZXJyaWRlIGV4aXRGdWxsU2NyZWVuTGFiZWwgPSAnScWhZWl0aSBpxaEgcGlsbm8gZWtyYW5vIHJlxb5pbW8nO1xuICBvdmVycmlkZSB6b29tSW5MYWJlbCA9ICdQcmlhcnRpbnRpJztcbiAgb3ZlcnJpZGUgem9vbU91dExhYmVsID0gJ0F0aXRvbGludGknO1xuICBvdmVycmlkZSBwcmV2aW91c1BhZ2VMYWJlbCA9ICdCdXbEmXMgcHVzbGFwaXMnO1xuICBvdmVycmlkZSBuZXh0UGFnZUxhYmVsID0gJ0tpdGFzIHB1c2xhcGlzJztcbiAgb3ZlcnJpZGUgaG9tZUxhYmVsID0gJ0dyxK/FvnRpIMSvIHByYWTFvmnEhSc7XG4gIG92ZXJyaWRlIHJvdGF0ZUN3TGFiZWwgPSAnUGFzdWt0aSA5MMKwJztcbiAgb3ZlcnJpZGUgc2VhcmNoTGFiZWwgPSAnUGFpZcWha2EnO1xuICBvdmVycmlkZSBjbGVhclNlYXJjaExhYmVsID0gJ0nFoXZhbHl0aSc7XG4gIG92ZXJyaWRlIHByZXZpb3VzSGl0TGFiZWwgPSAnQnV2xJlzIHJlenVsdGF0YXMnO1xuICBvdmVycmlkZSBuZXh0SGl0TGFiZWwgPSAnS2l0YXMgcmV6dWx0YXRhcyc7XG4gIG92ZXJyaWRlIGdvVG9QYWdlTGFiZWwgPSAnUGVyc2lrZWx0aSDEryBwdXNsYXDEryc7XG4gIG92ZXJyaWRlIGN1cnJlbnRQYWdlTGFiZWwgPSAnRGFiYXJ0aW5pcyBwdXNsYXBpcyc7XG4gIG92ZXJyaWRlIGVudGVyUGFnZU51bWJlciA9ICfErnZlc2tpdGUgcHVzbGFwaW8gbnVtZXLEryc7XG4gIG92ZXJyaWRlIGRyb3BEaXNhYmxlZCA9ICdBdGxlaXNraXRlLCBiZXQgdmVpa3NtYXMgbmVnYWxpbWFzJztcbiAgb3ZlcnJpZGUgbG9hZGluZyA9ICdQYWtyb3ZpbWFzIC4uLic7XG4gIG92ZXJyaWRlIHJvdGF0aW9uSXNOb3RTdXBwb3J0ZWQgPSAnU3VraW1hcyBqxatzxbMgxK9yZW5naW55amUgbmVwYWxhaWtvbWFzJztcblxuICAvLyBFUlJPUlNcbiAgb3ZlcnJpZGUgc29tZXRoaW5nSGFzR29uZVdyb25nTGFiZWwgPSAnT2JqZWt0byBhdHZhaXpkdW90aSBuZXBhdnlrby4uLic7XG4gIG92ZXJyaWRlIG1hbmlmZXN0VXJpTWlzc2luZ0xhYmVsID1cbiAgICAnTmVyYXN0YXMgb2JqZWt0xbMgc8SFcmHFoW8gaWRlbnRpZmlrYXRvcml1cyAoTWFuaWZlc3RVcmkpJztcbiAgb3ZlcnJpZGUgbWFuaWZlc3ROb3RWYWxpZExhYmVsID0gJ05ldGlua2FtYXMgb2JqZWt0xbMgc8SFcmHFoWFzIChNYW5pZmVzdCknO1xuICBvdmVycmlkZSBwYWdlRG9lc05vdEV4aXN0cyA9ICdOZXBhdnlrbyByYXN0aSDFoWlvIHBhc2xhcGlvJztcbiAgb3ZlcnJpZGUgdGV4dENvbnRlbnRFcnJvckxhYmVsID0gJ0F0c2lwcmHFoWF1LCBiZXQgbmVyYW5kdSBqdW1zIHRla3N0byc7XG5cbiAgb3ZlcnJpZGUgbm9SZXN1bHRzRm91bmRMYWJlbCA9IChxOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gYE9iamVrdGUgbmVyYXN0YSBhdGl0aWttZW7FsyA8ZW0gY2xhc3M9XCJjdXJyZW50LXNlYXJjaFwiPiR7cX08L2VtPmA7XG4gIH07XG5cbiAgb3ZlcnJpZGUgcmVzdWx0c0ZvdW5kTGFiZWwgPSAobnVtYmVyT2ZIaXRzOiBudW1iZXIsIHE6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBgJHtudW1iZXJPZkhpdHN9IHJlenVsdGF0YSR7XG4gICAgICBudW1iZXJPZkhpdHMgPT09IDEgPyAncycgOiAnaSdcbiAgICB9IHN1IDxlbSBjbGFzcz1cImN1cnJlbnQtc2VhcmNoXCI+JHtxfTwvZW0+YDtcbiAgfTtcbiAgb3ZlcnJpZGUgY3VycmVudEhpdExhYmVsID0gKGN1cnJlbnRIaXQ6IG51bWJlciwgbnVtYmVyT2ZIaXRzOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gYCR7Y3VycmVudEhpdH0gacWhICR7bnVtYmVyT2ZIaXRzfSBhdGl0aWttZW7Fs2A7XG4gIH07XG59XG4iXX0=