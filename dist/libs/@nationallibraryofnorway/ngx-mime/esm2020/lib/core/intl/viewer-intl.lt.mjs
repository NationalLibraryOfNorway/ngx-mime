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
MimeViewerIntlLt.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeViewerIntlLt, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
MimeViewerIntlLt.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeViewerIntlLt });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeViewerIntlLt, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwubHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLmx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRzVDLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxjQUFjO0lBRHBEOztRQUVFLFNBQUksR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFDeEIscUJBQWdCLEdBQUcsb0JBQW9CLENBQUM7UUFDeEMsNkJBQXdCLEdBQUcsa0NBQWtDLENBQUM7UUFDOUQsK0JBQTBCLEdBQUcsaUJBQWlCLENBQUM7UUFDL0Msa0JBQWEsR0FBRywwQkFBMEIsQ0FBQztRQUMzQyxxQkFBZ0IsR0FBRyw2QkFBNkIsQ0FBQztRQUNqRCx3QkFBbUIsR0FBRyw4QkFBOEIsQ0FBQztRQUNyRCxrQkFBYSxHQUFHLGNBQWMsQ0FBQztRQUMvQixpQkFBWSxHQUFHLFdBQVcsQ0FBQztRQUMzQixhQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLG9CQUFlLEdBQUcsc0JBQXNCLENBQUM7UUFDekMsd0JBQW1CLEdBQUcsK0JBQStCLENBQUM7UUFDdEQsZ0JBQVcsR0FBRyxZQUFZLENBQUM7UUFDM0IsaUJBQVksR0FBRyxZQUFZLENBQUM7UUFDNUIsc0JBQWlCLEdBQUcsZ0JBQWdCLENBQUM7UUFDckMsa0JBQWEsR0FBRyxnQkFBZ0IsQ0FBQztRQUNqQyxjQUFTLEdBQUcsa0JBQWtCLENBQUM7UUFDL0Isa0JBQWEsR0FBRyxhQUFhLENBQUM7UUFDOUIsZ0JBQVcsR0FBRyxTQUFTLENBQUM7UUFDeEIscUJBQWdCLEdBQUcsVUFBVSxDQUFDO1FBQzlCLHFCQUFnQixHQUFHLGtCQUFrQixDQUFDO1FBQ3RDLGlCQUFZLEdBQUcsa0JBQWtCLENBQUM7UUFDbEMsa0JBQWEsR0FBRyxzQkFBc0IsQ0FBQztRQUN2QyxxQkFBZ0IsR0FBRyxxQkFBcUIsQ0FBQztRQUN6QyxvQkFBZSxHQUFHLDBCQUEwQixDQUFDO1FBQzdDLGlCQUFZLEdBQUcsb0NBQW9DLENBQUM7UUFDcEQsWUFBTyxHQUFHLGdCQUFnQixDQUFDO1FBRTNCLFNBQVM7UUFDVCwrQkFBMEIsR0FBRyxpQ0FBaUMsQ0FBQztRQUMvRCw0QkFBdUIsR0FBRyx3REFBd0QsQ0FBQztRQUNuRiwwQkFBcUIsR0FBRyx1Q0FBdUMsQ0FBQztRQUNoRSxzQkFBaUIsR0FBRyw2QkFBNkIsQ0FBQztRQUNsRCwwQkFBcUIsR0FBRyxxQ0FBcUMsQ0FBQztRQUU5RCx3QkFBbUIsR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFO1lBQ2xDLE9BQU8seURBQXlELENBQUMsT0FBTyxDQUFDO1FBQzNFLENBQUMsQ0FBQztRQUVGLHNCQUFpQixHQUFHLENBQUMsWUFBb0IsRUFBRSxDQUFTLEVBQUUsRUFBRTtZQUN0RCxPQUFPLEdBQUcsWUFBWSxhQUFhLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxrQ0FBa0MsQ0FBQyxPQUFPLENBQUM7UUFDOUcsQ0FBQyxDQUFDO1FBQ0Ysb0JBQWUsR0FBRyxDQUFDLFVBQWtCLEVBQUUsWUFBb0IsRUFBRSxFQUFFO1lBQzdELE9BQU8sR0FBRyxVQUFVLE9BQU8sWUFBWSxhQUFhLENBQUM7UUFDdkQsQ0FBQyxDQUFDO0tBQ0g7OzZHQS9DWSxnQkFBZ0I7aUhBQWhCLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuL3ZpZXdlci1pbnRsJztcbmltcG9ydCB7IEhlbHBJbnRsTHQgfSBmcm9tICcuL2hlbHAtaW50bC5sdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNaW1lVmlld2VySW50bEx0IGV4dGVuZHMgTWltZVZpZXdlckludGwge1xuICBoZWxwID0gbmV3IEhlbHBJbnRsTHQoKTtcbiAgY2xvc2VMYWJlbCA9ICdVxb5kYXJ5dGknO1xuICBhdHRyaWJ1dGlvbkxhYmVsID0gJ1RlaXNpxbMgcHJpc2t5cmltYXMnO1xuICBhdHRyaWJ1dG9uQ2xvc2VBcmlhTGFiZWwgPSAnVcW+ZGFyeXRpIHRlaXNpxbMgcHJpc2t5cmltbyBsYW5nxIUnO1xuICByZWNvZ25pemVkVGV4dENvbnRlbnRMYWJlbCA9ICdBdHBhesSrdHMgdGVrc3RzJztcbiAgY29udGVudHNMYWJlbCA9ICdJbmZvcm1hY2lqYSBhcGllIG9iamVrdMSFJztcbiAgdHdvUGFnZVZpZXdMYWJlbCA9ICdBdHZhaXpkdW90aSBwbyBkdSBwdXNsYXBpdXMnO1xuICBzaW5nbGVQYWdlVmlld0xhYmVsID0gJ0F0dmFpemR1b3RpIHBvIHZpZW7EhSBwdXNsYXDEryc7XG4gIG1ldGFkYXRhTGFiZWwgPSAnTWV0YWR1b21lbnlzJztcbiAgbGljZW5zZUxhYmVsID0gJ0xpY2VuY2lqYSc7XG4gIHRvY0xhYmVsID0gJ1R1cmlueXMnO1xuICBmdWxsU2NyZWVuTGFiZWwgPSAnUGlsbm8gZWtyYW5vIHJlxb5pbWFzJztcbiAgZXhpdEZ1bGxTY3JlZW5MYWJlbCA9ICdJxaFlaXRpIGnFoSBwaWxubyBla3Jhbm8gcmXFvmltbyc7XG4gIHpvb21JbkxhYmVsID0gJ1ByaWFydGludGknO1xuICB6b29tT3V0TGFiZWwgPSAnQXRpdG9saW50aSc7XG4gIHByZXZpb3VzUGFnZUxhYmVsID0gJ0J1dsSZcyBwdXNsYXBpcyc7XG4gIG5leHRQYWdlTGFiZWwgPSAnS2l0YXMgcHVzbGFwaXMnO1xuICBob21lTGFiZWwgPSAnR3LEr8W+dGkgxK8gcHJhZMW+acSFJztcbiAgcm90YXRlQ3dMYWJlbCA9ICdQYXN1a3RpIDkwwrAnO1xuICBzZWFyY2hMYWJlbCA9ICdQYWllxaFrYSc7XG4gIGNsZWFyU2VhcmNoTGFiZWwgPSAnScWhdmFseXRpJztcbiAgcHJldmlvdXNIaXRMYWJlbCA9ICdCdXbEmXMgcmV6dWx0YXRhcyc7XG4gIG5leHRIaXRMYWJlbCA9ICdLaXRhcyByZXp1bHRhdGFzJztcbiAgZ29Ub1BhZ2VMYWJlbCA9ICdQZXJzaWtlbHRpIMSvIHB1c2xhcMSvJztcbiAgY3VycmVudFBhZ2VMYWJlbCA9ICdEYWJhcnRpbmlzIHB1c2xhcGlzJztcbiAgZW50ZXJQYWdlTnVtYmVyID0gJ8SudmVza2l0ZSBwdXNsYXBpbyBudW1lcsSvJztcbiAgZHJvcERpc2FibGVkID0gJ0F0bGVpc2tpdGUsIGJldCB2ZWlrc21hcyBuZWdhbGltYXMnO1xuICBsb2FkaW5nID0gJ1Bha3JvdmltYXMgLi4uJztcblxuICAvLyBFUlJPUlNcbiAgc29tZXRoaW5nSGFzR29uZVdyb25nTGFiZWwgPSAnT2JqZWt0byBhdHZhaXpkdW90aSBuZXBhdnlrby4uLic7XG4gIG1hbmlmZXN0VXJpTWlzc2luZ0xhYmVsID0gJ05lcmFzdGFzIG9iamVrdMWzIHPEhXJhxaFvIGlkZW50aWZpa2F0b3JpdXMgKE1hbmlmZXN0VXJpKSc7XG4gIG1hbmlmZXN0Tm90VmFsaWRMYWJlbCA9ICdOZXRpbmthbWFzIG9iamVrdMWzIHPEhXJhxaFhcyAoTWFuaWZlc3QpJztcbiAgcGFnZURvZXNOb3RFeGlzdHMgPSAnTmVwYXZ5a28gcmFzdGkgxaFpbyBwYXNsYXBpbyc7XG4gIHRleHRDb250ZW50RXJyb3JMYWJlbCA9ICdBdHNpcHJhxaFhdSwgYmV0IG5lcmFuZHUganVtcyB0ZWtzdG8nO1xuXG4gIG5vUmVzdWx0c0ZvdW5kTGFiZWwgPSAocTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGBPYmpla3RlIG5lcmFzdGEgYXRpdGlrbWVuxbMgPGVtIGNsYXNzPVwiY3VycmVudC1zZWFyY2hcIj4ke3F9PC9lbT5gO1xuICB9O1xuXG4gIHJlc3VsdHNGb3VuZExhYmVsID0gKG51bWJlck9mSGl0czogbnVtYmVyLCBxOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gYCR7bnVtYmVyT2ZIaXRzfSByZXp1bHRhdGEke251bWJlck9mSGl0cyA9PT0gMSA/ICdzJyA6ICdpJ30gc3UgPGVtIGNsYXNzPVwiY3VycmVudC1zZWFyY2hcIj4ke3F9PC9lbT5gO1xuICB9O1xuICBjdXJyZW50SGl0TGFiZWwgPSAoY3VycmVudEhpdDogbnVtYmVyLCBudW1iZXJPZkhpdHM6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiBgJHtjdXJyZW50SGl0fSBpxaEgJHtudW1iZXJPZkhpdHN9IGF0aXRpa21lbsWzYDtcbiAgfTtcbn1cbiJdfQ==