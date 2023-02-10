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
MimeViewerIntlLt.ɵfac = /*@__PURE__*/ function () { let ɵMimeViewerIntlLt_BaseFactory; return function MimeViewerIntlLt_Factory(t) { return (ɵMimeViewerIntlLt_BaseFactory || (ɵMimeViewerIntlLt_BaseFactory = i0.ɵɵgetInheritedFactory(MimeViewerIntlLt)))(t || MimeViewerIntlLt); }; }();
MimeViewerIntlLt.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MimeViewerIntlLt, factory: MimeViewerIntlLt.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MimeViewerIntlLt, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwubHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLmx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRy9DLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxjQUFjO0lBRHBEOztRQUVXLFNBQUksR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFDeEIscUJBQWdCLEdBQUcsb0JBQW9CLENBQUM7UUFDeEMsNkJBQXdCLEdBQUcsa0NBQWtDLENBQUM7UUFDOUQsdUJBQWtCLEdBQUcsaUNBQWlDLENBQUM7UUFDdkQsa0JBQWEsR0FBRywwQkFBMEIsQ0FBQztRQUMzQyxvQkFBZSxHQUFHLFNBQVMsQ0FBQztRQUM1QixvQkFBZSxHQUFHLHFCQUFxQixDQUFDO1FBQ3hDLHdCQUFtQixHQUFHLDhCQUE4QixDQUFDO1FBQ3JELHFCQUFnQixHQUFHLDZCQUE2QixDQUFDO1FBQ2pELHFCQUFnQixHQUFHLHNCQUFzQixDQUFDO1FBQzFDLG9DQUErQixHQUFHLFdBQVcsQ0FBQztRQUM5QywwQ0FBcUMsR0FBRyxhQUFhLENBQUM7UUFDdEQsbUNBQThCLEdBQUcsMEJBQTBCLENBQUM7UUFDNUQsa0JBQWEsR0FBRyxjQUFjLENBQUM7UUFDL0IsaUJBQVksR0FBRyxXQUFXLENBQUM7UUFDM0IsYUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNyQixvQkFBZSxHQUFHLHNCQUFzQixDQUFDO1FBQ3pDLHdCQUFtQixHQUFHLCtCQUErQixDQUFDO1FBQ3RELGdCQUFXLEdBQUcsWUFBWSxDQUFDO1FBQzNCLGlCQUFZLEdBQUcsWUFBWSxDQUFDO1FBQzVCLHNCQUFpQixHQUFHLGdCQUFnQixDQUFDO1FBQ3JDLGtCQUFhLEdBQUcsZ0JBQWdCLENBQUM7UUFDakMsY0FBUyxHQUFHLGtCQUFrQixDQUFDO1FBQy9CLGtCQUFhLEdBQUcsYUFBYSxDQUFDO1FBQzlCLGdCQUFXLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLHFCQUFnQixHQUFHLFVBQVUsQ0FBQztRQUM5QixxQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztRQUN0QyxpQkFBWSxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLGtCQUFhLEdBQUcsc0JBQXNCLENBQUM7UUFDdkMscUJBQWdCLEdBQUcscUJBQXFCLENBQUM7UUFDekMsb0JBQWUsR0FBRywwQkFBMEIsQ0FBQztRQUM3QyxpQkFBWSxHQUFHLG9DQUFvQyxDQUFDO1FBQ3BELFlBQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUMzQiwyQkFBc0IsR0FBRyxzQ0FBc0MsQ0FBQztRQUV6RSxTQUFTO1FBQ0EsK0JBQTBCLEdBQUcsaUNBQWlDLENBQUM7UUFDL0QsNEJBQXVCLEdBQzlCLHdEQUF3RCxDQUFDO1FBQ2xELDBCQUFxQixHQUFHLHVDQUF1QyxDQUFDO1FBQ2hFLHNCQUFpQixHQUFHLDZCQUE2QixDQUFDO1FBQ2xELDBCQUFxQixHQUFHLHFDQUFxQyxDQUFDO1FBRTlELHdCQUFtQixHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7WUFDM0MsT0FBTyx5REFBeUQsQ0FBQyxPQUFPLENBQUM7UUFDM0UsQ0FBQyxDQUFDO1FBRU8sc0JBQWlCLEdBQUcsQ0FBQyxZQUFvQixFQUFFLENBQVMsRUFBRSxFQUFFO1lBQy9ELE9BQU8sR0FBRyxZQUFZLGFBQ3BCLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FDN0Isa0NBQWtDLENBQUMsT0FBTyxDQUFDO1FBQzdDLENBQUMsQ0FBQztRQUNPLG9CQUFlLEdBQUcsQ0FBQyxVQUFrQixFQUFFLFlBQW9CLEVBQUUsRUFBRTtZQUN0RSxPQUFPLEdBQUcsVUFBVSxPQUFPLFlBQVksYUFBYSxDQUFDO1FBQ3ZELENBQUMsQ0FBQztLQUNIOzt3T0F6RFksZ0JBQWdCLFNBQWhCLGdCQUFnQjtzRUFBaEIsZ0JBQWdCLFdBQWhCLGdCQUFnQjt1RkFBaEIsZ0JBQWdCO2NBRDVCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxwSW50bEx0IH0gZnJvbSAnLi9oZWxwLWludGwubHQnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuL3ZpZXdlci1pbnRsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1pbWVWaWV3ZXJJbnRsTHQgZXh0ZW5kcyBNaW1lVmlld2VySW50bCB7XG4gIG92ZXJyaWRlIGhlbHAgPSBuZXcgSGVscEludGxMdCgpO1xuICBvdmVycmlkZSBjbG9zZUxhYmVsID0gJ1XFvmRhcnl0aSc7XG4gIG92ZXJyaWRlIGF0dHJpYnV0aW9uTGFiZWwgPSAnVGVpc2nFsyBwcmlza3lyaW1hcyc7XG4gIG92ZXJyaWRlIGF0dHJpYnV0b25DbG9zZUFyaWFMYWJlbCA9ICdVxb5kYXJ5dGkgdGVpc2nFsyBwcmlza3lyaW1vIGxhbmfEhSc7XG4gIG92ZXJyaWRlIGhlbHBDbG9zZUFyaWFMYWJlbCA9ICdVxb5kYXJ5dGkgcGFnYWxib3MgZGlhbG9nbyBsYW5nxIUnO1xuICBvdmVycmlkZSBjb250ZW50c0xhYmVsID0gJ0luZm9ybWFjaWphIGFwaWUgb2JqZWt0xIUnO1xuICBvdmVycmlkZSBsYXlvdXRNZW51TGFiZWwgPSAnxb1pxatyxJd0aSc7XG4gIG92ZXJyaWRlIHBhZ2VMYXlvdXRMYWJlbCA9ICdQdXNsYXBpbyBpxaFkxJdzdHltYXMnO1xuICBvdmVycmlkZSBzaW5nbGVQYWdlVmlld0xhYmVsID0gJ0F0dmFpemR1b3RpIHBvIHZpZW7EhSBwdXNsYXDEryc7XG4gIG92ZXJyaWRlIHR3b1BhZ2VWaWV3TGFiZWwgPSAnQXR2YWl6ZHVvdGkgcG8gZHUgcHVzbGFwaXVzJztcbiAgb3ZlcnJpZGUgZGlnaXRhbFRleHRMYWJlbCA9ICdTa2FpdG1lbmluaXMgdGVrc3Rhcyc7XG4gIG92ZXJyaWRlIHJlY29nbml6ZWRUZXh0Q29udGVudENsb3NlTGFiZWwgPSAnTsSXIHZpZW5hcyc7XG4gIG92ZXJyaWRlIHJlY29nbml6ZWRUZXh0Q29udGVudEluU3BsaXRWaWV3TGFiZWwgPSAnU3Vza2FpZHl0YXMnO1xuICBvdmVycmlkZSBzaG93UmVjb2duaXplZFRleHRDb250ZW50TGFiZWwgPSAnVGlrIHNrYWl0bWVuaW5pcyB0ZWtzdGFzJztcbiAgb3ZlcnJpZGUgbWV0YWRhdGFMYWJlbCA9ICdNZXRhZHVvbWVueXMnO1xuICBvdmVycmlkZSBsaWNlbnNlTGFiZWwgPSAnTGljZW5jaWphJztcbiAgb3ZlcnJpZGUgdG9jTGFiZWwgPSAnVHVyaW55cyc7XG4gIG92ZXJyaWRlIGZ1bGxTY3JlZW5MYWJlbCA9ICdQaWxubyBla3Jhbm8gcmXFvmltYXMnO1xuICBvdmVycmlkZSBleGl0RnVsbFNjcmVlbkxhYmVsID0gJ0nFoWVpdGkgacWhIHBpbG5vIGVrcmFubyByZcW+aW1vJztcbiAgb3ZlcnJpZGUgem9vbUluTGFiZWwgPSAnUHJpYXJ0aW50aSc7XG4gIG92ZXJyaWRlIHpvb21PdXRMYWJlbCA9ICdBdGl0b2xpbnRpJztcbiAgb3ZlcnJpZGUgcHJldmlvdXNQYWdlTGFiZWwgPSAnQnV2xJlzIHB1c2xhcGlzJztcbiAgb3ZlcnJpZGUgbmV4dFBhZ2VMYWJlbCA9ICdLaXRhcyBwdXNsYXBpcyc7XG4gIG92ZXJyaWRlIGhvbWVMYWJlbCA9ICdHcsSvxb50aSDEryBwcmFkxb5pxIUnO1xuICBvdmVycmlkZSByb3RhdGVDd0xhYmVsID0gJ1Bhc3VrdGkgOTDCsCc7XG4gIG92ZXJyaWRlIHNlYXJjaExhYmVsID0gJ1BhaWXFoWthJztcbiAgb3ZlcnJpZGUgY2xlYXJTZWFyY2hMYWJlbCA9ICdJxaF2YWx5dGknO1xuICBvdmVycmlkZSBwcmV2aW91c0hpdExhYmVsID0gJ0J1dsSZcyByZXp1bHRhdGFzJztcbiAgb3ZlcnJpZGUgbmV4dEhpdExhYmVsID0gJ0tpdGFzIHJlenVsdGF0YXMnO1xuICBvdmVycmlkZSBnb1RvUGFnZUxhYmVsID0gJ1BlcnNpa2VsdGkgxK8gcHVzbGFwxK8nO1xuICBvdmVycmlkZSBjdXJyZW50UGFnZUxhYmVsID0gJ0RhYmFydGluaXMgcHVzbGFwaXMnO1xuICBvdmVycmlkZSBlbnRlclBhZ2VOdW1iZXIgPSAnxK52ZXNraXRlIHB1c2xhcGlvIG51bWVyxK8nO1xuICBvdmVycmlkZSBkcm9wRGlzYWJsZWQgPSAnQXRsZWlza2l0ZSwgYmV0IHZlaWtzbWFzIG5lZ2FsaW1hcyc7XG4gIG92ZXJyaWRlIGxvYWRpbmcgPSAnUGFrcm92aW1hcyAuLi4nO1xuICBvdmVycmlkZSByb3RhdGlvbklzTm90U3VwcG9ydGVkID0gJ1N1a2ltYXMgasWrc8WzIMSvcmVuZ2lueWplIG5lcGFsYWlrb21hcyc7XG5cbiAgLy8gRVJST1JTXG4gIG92ZXJyaWRlIHNvbWV0aGluZ0hhc0dvbmVXcm9uZ0xhYmVsID0gJ09iamVrdG8gYXR2YWl6ZHVvdGkgbmVwYXZ5a28uLi4nO1xuICBvdmVycmlkZSBtYW5pZmVzdFVyaU1pc3NpbmdMYWJlbCA9XG4gICAgJ05lcmFzdGFzIG9iamVrdMWzIHPEhXJhxaFvIGlkZW50aWZpa2F0b3JpdXMgKE1hbmlmZXN0VXJpKSc7XG4gIG92ZXJyaWRlIG1hbmlmZXN0Tm90VmFsaWRMYWJlbCA9ICdOZXRpbmthbWFzIG9iamVrdMWzIHPEhXJhxaFhcyAoTWFuaWZlc3QpJztcbiAgb3ZlcnJpZGUgcGFnZURvZXNOb3RFeGlzdHMgPSAnTmVwYXZ5a28gcmFzdGkgxaFpbyBwYXNsYXBpbyc7XG4gIG92ZXJyaWRlIHRleHRDb250ZW50RXJyb3JMYWJlbCA9ICdBdHNpcHJhxaFhdSwgYmV0IG5lcmFuZHUganVtcyB0ZWtzdG8nO1xuXG4gIG92ZXJyaWRlIG5vUmVzdWx0c0ZvdW5kTGFiZWwgPSAocTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGBPYmpla3RlIG5lcmFzdGEgYXRpdGlrbWVuxbMgPGVtIGNsYXNzPVwiY3VycmVudC1zZWFyY2hcIj4ke3F9PC9lbT5gO1xuICB9O1xuXG4gIG92ZXJyaWRlIHJlc3VsdHNGb3VuZExhYmVsID0gKG51bWJlck9mSGl0czogbnVtYmVyLCBxOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gYCR7bnVtYmVyT2ZIaXRzfSByZXp1bHRhdGEke1xuICAgICAgbnVtYmVyT2ZIaXRzID09PSAxID8gJ3MnIDogJ2knXG4gICAgfSBzdSA8ZW0gY2xhc3M9XCJjdXJyZW50LXNlYXJjaFwiPiR7cX08L2VtPmA7XG4gIH07XG4gIG92ZXJyaWRlIGN1cnJlbnRIaXRMYWJlbCA9IChjdXJyZW50SGl0OiBudW1iZXIsIG51bWJlck9mSGl0czogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIGAke2N1cnJlbnRIaXR9IGnFoSAke251bWJlck9mSGl0c30gYXRpdGlrbWVuxbNgO1xuICB9O1xufVxuIl19