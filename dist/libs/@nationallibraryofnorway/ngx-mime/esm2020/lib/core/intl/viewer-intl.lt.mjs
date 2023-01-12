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
        this.helpCloseAriaLabel = 'Uždaryti pagalbos dialogo langą';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwubHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLmx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRzVDLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxjQUFjO0lBRHBEOztRQUVFLFNBQUksR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFDeEIscUJBQWdCLEdBQUcsb0JBQW9CLENBQUM7UUFDeEMsNkJBQXdCLEdBQUcsa0NBQWtDLENBQUM7UUFDOUQsdUJBQWtCLEdBQUcsaUNBQWlDLENBQUM7UUFDdkQsK0JBQTBCLEdBQUcsaUJBQWlCLENBQUM7UUFDL0Msa0JBQWEsR0FBRywwQkFBMEIsQ0FBQztRQUMzQyxvQkFBZSxHQUFHLFNBQVMsQ0FBQztRQUM1QixvQkFBZSxHQUFHLHFCQUFxQixDQUFDO1FBQ3hDLHdCQUFtQixHQUFHLDhCQUE4QixDQUFDO1FBQ3JELHFCQUFnQixHQUFHLDZCQUE2QixDQUFDO1FBQ2pELHFCQUFnQixHQUFHLHNCQUFzQixDQUFDO1FBQzFDLG9DQUErQixHQUFHLFdBQVcsQ0FBQztRQUM5QywwQ0FBcUMsR0FBRyxhQUFhLENBQUM7UUFDdEQsbUNBQThCLEdBQUcsMEJBQTBCLENBQUM7UUFDNUQsa0JBQWEsR0FBRyxjQUFjLENBQUM7UUFDL0IsaUJBQVksR0FBRyxXQUFXLENBQUM7UUFDM0IsYUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNyQixvQkFBZSxHQUFHLHNCQUFzQixDQUFDO1FBQ3pDLHdCQUFtQixHQUFHLCtCQUErQixDQUFDO1FBQ3RELGdCQUFXLEdBQUcsWUFBWSxDQUFDO1FBQzNCLGlCQUFZLEdBQUcsWUFBWSxDQUFDO1FBQzVCLHNCQUFpQixHQUFHLGdCQUFnQixDQUFDO1FBQ3JDLGtCQUFhLEdBQUcsZ0JBQWdCLENBQUM7UUFDakMsY0FBUyxHQUFHLGtCQUFrQixDQUFDO1FBQy9CLGtCQUFhLEdBQUcsYUFBYSxDQUFDO1FBQzlCLGdCQUFXLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLHFCQUFnQixHQUFHLFVBQVUsQ0FBQztRQUM5QixxQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztRQUN0QyxpQkFBWSxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLGtCQUFhLEdBQUcsc0JBQXNCLENBQUM7UUFDdkMscUJBQWdCLEdBQUcscUJBQXFCLENBQUM7UUFDekMsb0JBQWUsR0FBRywwQkFBMEIsQ0FBQztRQUM3QyxpQkFBWSxHQUFHLG9DQUFvQyxDQUFDO1FBQ3BELFlBQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUMzQiwyQkFBc0IsR0FBRyxzQ0FBc0MsQ0FBQztRQUVoRSxTQUFTO1FBQ1QsK0JBQTBCLEdBQUcsaUNBQWlDLENBQUM7UUFDL0QsNEJBQXVCLEdBQ3JCLHdEQUF3RCxDQUFDO1FBQzNELDBCQUFxQixHQUFHLHVDQUF1QyxDQUFDO1FBQ2hFLHNCQUFpQixHQUFHLDZCQUE2QixDQUFDO1FBQ2xELDBCQUFxQixHQUFHLHFDQUFxQyxDQUFDO1FBRTlELHdCQUFtQixHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7WUFDbEMsT0FBTyx5REFBeUQsQ0FBQyxPQUFPLENBQUM7UUFDM0UsQ0FBQyxDQUFDO1FBRUYsc0JBQWlCLEdBQUcsQ0FBQyxZQUFvQixFQUFFLENBQVMsRUFBRSxFQUFFO1lBQ3RELE9BQU8sR0FBRyxZQUFZLGFBQ3BCLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FDN0Isa0NBQWtDLENBQUMsT0FBTyxDQUFDO1FBQzdDLENBQUMsQ0FBQztRQUNGLG9CQUFlLEdBQUcsQ0FBQyxVQUFrQixFQUFFLFlBQW9CLEVBQUUsRUFBRTtZQUM3RCxPQUFPLEdBQUcsVUFBVSxPQUFPLFlBQVksYUFBYSxDQUFDO1FBQ3ZELENBQUMsQ0FBQztLQUNIOzs2R0ExRFksZ0JBQWdCO2lIQUFoQixnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBIZWxwSW50bEx0IH0gZnJvbSAnLi9oZWxwLWludGwubHQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWltZVZpZXdlckludGxMdCBleHRlbmRzIE1pbWVWaWV3ZXJJbnRsIHtcbiAgaGVscCA9IG5ldyBIZWxwSW50bEx0KCk7XG4gIGNsb3NlTGFiZWwgPSAnVcW+ZGFyeXRpJztcbiAgYXR0cmlidXRpb25MYWJlbCA9ICdUZWlzacWzIHByaXNreXJpbWFzJztcbiAgYXR0cmlidXRvbkNsb3NlQXJpYUxhYmVsID0gJ1XFvmRhcnl0aSB0ZWlzacWzIHByaXNreXJpbW8gbGFuZ8SFJztcbiAgaGVscENsb3NlQXJpYUxhYmVsID0gJ1XFvmRhcnl0aSBwYWdhbGJvcyBkaWFsb2dvIGxhbmfEhSc7XG4gIHJlY29nbml6ZWRUZXh0Q29udGVudExhYmVsID0gJ0F0cGF6xKt0cyB0ZWtzdHMnO1xuICBjb250ZW50c0xhYmVsID0gJ0luZm9ybWFjaWphIGFwaWUgb2JqZWt0xIUnO1xuICBsYXlvdXRNZW51TGFiZWwgPSAnxb1pxatyxJd0aSc7XG4gIHBhZ2VMYXlvdXRMYWJlbCA9ICdQdXNsYXBpbyBpxaFkxJdzdHltYXMnO1xuICBzaW5nbGVQYWdlVmlld0xhYmVsID0gJ0F0dmFpemR1b3RpIHBvIHZpZW7EhSBwdXNsYXDEryc7XG4gIHR3b1BhZ2VWaWV3TGFiZWwgPSAnQXR2YWl6ZHVvdGkgcG8gZHUgcHVzbGFwaXVzJztcbiAgZGlnaXRhbFRleHRMYWJlbCA9ICdTa2FpdG1lbmluaXMgdGVrc3Rhcyc7XG4gIHJlY29nbml6ZWRUZXh0Q29udGVudENsb3NlTGFiZWwgPSAnTsSXIHZpZW5hcyc7XG4gIHJlY29nbml6ZWRUZXh0Q29udGVudEluU3BsaXRWaWV3TGFiZWwgPSAnU3Vza2FpZHl0YXMnO1xuICBzaG93UmVjb2duaXplZFRleHRDb250ZW50TGFiZWwgPSAnVGlrIHNrYWl0bWVuaW5pcyB0ZWtzdGFzJztcbiAgbWV0YWRhdGFMYWJlbCA9ICdNZXRhZHVvbWVueXMnO1xuICBsaWNlbnNlTGFiZWwgPSAnTGljZW5jaWphJztcbiAgdG9jTGFiZWwgPSAnVHVyaW55cyc7XG4gIGZ1bGxTY3JlZW5MYWJlbCA9ICdQaWxubyBla3Jhbm8gcmXFvmltYXMnO1xuICBleGl0RnVsbFNjcmVlbkxhYmVsID0gJ0nFoWVpdGkgacWhIHBpbG5vIGVrcmFubyByZcW+aW1vJztcbiAgem9vbUluTGFiZWwgPSAnUHJpYXJ0aW50aSc7XG4gIHpvb21PdXRMYWJlbCA9ICdBdGl0b2xpbnRpJztcbiAgcHJldmlvdXNQYWdlTGFiZWwgPSAnQnV2xJlzIHB1c2xhcGlzJztcbiAgbmV4dFBhZ2VMYWJlbCA9ICdLaXRhcyBwdXNsYXBpcyc7XG4gIGhvbWVMYWJlbCA9ICdHcsSvxb50aSDEryBwcmFkxb5pxIUnO1xuICByb3RhdGVDd0xhYmVsID0gJ1Bhc3VrdGkgOTDCsCc7XG4gIHNlYXJjaExhYmVsID0gJ1BhaWXFoWthJztcbiAgY2xlYXJTZWFyY2hMYWJlbCA9ICdJxaF2YWx5dGknO1xuICBwcmV2aW91c0hpdExhYmVsID0gJ0J1dsSZcyByZXp1bHRhdGFzJztcbiAgbmV4dEhpdExhYmVsID0gJ0tpdGFzIHJlenVsdGF0YXMnO1xuICBnb1RvUGFnZUxhYmVsID0gJ1BlcnNpa2VsdGkgxK8gcHVzbGFwxK8nO1xuICBjdXJyZW50UGFnZUxhYmVsID0gJ0RhYmFydGluaXMgcHVzbGFwaXMnO1xuICBlbnRlclBhZ2VOdW1iZXIgPSAnxK52ZXNraXRlIHB1c2xhcGlvIG51bWVyxK8nO1xuICBkcm9wRGlzYWJsZWQgPSAnQXRsZWlza2l0ZSwgYmV0IHZlaWtzbWFzIG5lZ2FsaW1hcyc7XG4gIGxvYWRpbmcgPSAnUGFrcm92aW1hcyAuLi4nO1xuICByb3RhdGlvbklzTm90U3VwcG9ydGVkID0gJ1N1a2ltYXMgasWrc8WzIMSvcmVuZ2lueWplIG5lcGFsYWlrb21hcyc7XG5cbiAgLy8gRVJST1JTXG4gIHNvbWV0aGluZ0hhc0dvbmVXcm9uZ0xhYmVsID0gJ09iamVrdG8gYXR2YWl6ZHVvdGkgbmVwYXZ5a28uLi4nO1xuICBtYW5pZmVzdFVyaU1pc3NpbmdMYWJlbCA9XG4gICAgJ05lcmFzdGFzIG9iamVrdMWzIHPEhXJhxaFvIGlkZW50aWZpa2F0b3JpdXMgKE1hbmlmZXN0VXJpKSc7XG4gIG1hbmlmZXN0Tm90VmFsaWRMYWJlbCA9ICdOZXRpbmthbWFzIG9iamVrdMWzIHPEhXJhxaFhcyAoTWFuaWZlc3QpJztcbiAgcGFnZURvZXNOb3RFeGlzdHMgPSAnTmVwYXZ5a28gcmFzdGkgxaFpbyBwYXNsYXBpbyc7XG4gIHRleHRDb250ZW50RXJyb3JMYWJlbCA9ICdBdHNpcHJhxaFhdSwgYmV0IG5lcmFuZHUganVtcyB0ZWtzdG8nO1xuXG4gIG5vUmVzdWx0c0ZvdW5kTGFiZWwgPSAocTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGBPYmpla3RlIG5lcmFzdGEgYXRpdGlrbWVuxbMgPGVtIGNsYXNzPVwiY3VycmVudC1zZWFyY2hcIj4ke3F9PC9lbT5gO1xuICB9O1xuXG4gIHJlc3VsdHNGb3VuZExhYmVsID0gKG51bWJlck9mSGl0czogbnVtYmVyLCBxOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gYCR7bnVtYmVyT2ZIaXRzfSByZXp1bHRhdGEke1xuICAgICAgbnVtYmVyT2ZIaXRzID09PSAxID8gJ3MnIDogJ2knXG4gICAgfSBzdSA8ZW0gY2xhc3M9XCJjdXJyZW50LXNlYXJjaFwiPiR7cX08L2VtPmA7XG4gIH07XG4gIGN1cnJlbnRIaXRMYWJlbCA9IChjdXJyZW50SGl0OiBudW1iZXIsIG51bWJlck9mSGl0czogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIGAke2N1cnJlbnRIaXR9IGnFoSAke251bWJlck9mSGl0c30gYXRpdGlrbWVuxbNgO1xuICB9O1xufVxuIl19