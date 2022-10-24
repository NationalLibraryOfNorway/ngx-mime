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
        this.recognizedTextContentLabel = 'Gjenkjent tekst';
        this.contentsLabel = 'Innhold';
        this.layoutMenuLabel = 'Visning';
        this.pageLayoutLabel = 'Sideoppsett';
        this.singlePageViewLabel = 'Enkeltsider';
        this.twoPageViewLabel = 'To sider';
        this.digitalTextLabel = 'Digital tekst';
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
MimeViewerIntlNoNb.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MimeViewerIntlNoNb, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
MimeViewerIntlNoNb.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MimeViewerIntlNoNb });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MimeViewerIntlNoNb, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwubm9fbmIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLm5vX25iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBR2pELE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxjQUFjO0lBRHREOztRQUVFLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFCLGVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIscUJBQWdCLEdBQUcsWUFBWSxDQUFDO1FBQ2hDLDZCQUF3QixHQUFHLHlCQUF5QixDQUFDO1FBQ3JELCtCQUEwQixHQUFHLGlCQUFpQixDQUFDO1FBQy9DLGtCQUFhLEdBQUcsU0FBUyxDQUFDO1FBQzFCLG9CQUFlLEdBQUcsU0FBUyxDQUFDO1FBQzVCLG9CQUFlLEdBQUcsYUFBYSxDQUFDO1FBQ2hDLHdCQUFtQixHQUFHLGFBQWEsQ0FBQztRQUNwQyxxQkFBZ0IsR0FBRyxVQUFVLENBQUM7UUFDOUIscUJBQWdCLEdBQUcsZUFBZSxDQUFDO1FBQ25DLG9DQUErQixHQUFHLE9BQU8sQ0FBQztRQUMxQywwQ0FBcUMsR0FBRyxNQUFNLENBQUM7UUFDL0MsbUNBQThCLEdBQUcsbUJBQW1CLENBQUM7UUFDckQsa0JBQWEsR0FBRyxVQUFVLENBQUM7UUFDM0IsaUJBQVksR0FBRyxRQUFRLENBQUM7UUFDeEIsYUFBUSxHQUFHLHFCQUFxQixDQUFDO1FBQ2pDLG9CQUFlLEdBQUcsWUFBWSxDQUFDO1FBQy9CLHdCQUFtQixHQUFHLG9CQUFvQixDQUFDO1FBQzNDLGdCQUFXLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLGlCQUFZLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLHNCQUFpQixHQUFHLGNBQWMsQ0FBQztRQUNuQyxrQkFBYSxHQUFHLFlBQVksQ0FBQztRQUM3QixjQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsV0FBVyxDQUFDO1FBQzVCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixxQkFBZ0IsR0FBRyxlQUFlLENBQUM7UUFDbkMsaUJBQVksR0FBRyxhQUFhLENBQUM7UUFDN0Isa0JBQWEsR0FBRyxhQUFhLENBQUM7UUFDOUIscUJBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDcEMsb0JBQWUsR0FBRyxzQkFBc0IsQ0FBQztRQUN6QyxpQkFBWSxHQUFHLDhDQUE4QyxDQUFDO1FBQzlELFlBQU8sR0FBRyxZQUFZLENBQUM7UUFDdkIsMkJBQXNCLEdBQUcsc0NBQXNDLENBQUM7UUFFaEUsU0FBUztRQUNULCtCQUEwQixHQUFHLDZCQUE2QixDQUFDO1FBQzNELDRCQUF1QixHQUFHLDRCQUE0QixDQUFDO1FBQ3ZELDBCQUFxQixHQUFHLDJCQUEyQixDQUFDO1FBQ3BELHNCQUFpQixHQUFHLHFDQUFxQyxDQUFDO1FBQzFELDBCQUFxQixHQUFHLCtDQUErQyxDQUFDO1FBRXhFLHdCQUFtQixHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7WUFDbEMsT0FBTyxxREFBcUQsQ0FBQyxPQUFPLENBQUM7UUFDdkUsQ0FBQyxDQUFDO1FBRUYsc0JBQWlCLEdBQUcsQ0FBQyxZQUFvQixFQUFFLENBQVMsRUFBRSxFQUFFO1lBQ3RELE9BQU8sR0FBRyxZQUFZLGdEQUFnRCxDQUFDLE9BQU8sQ0FBQztRQUNqRixDQUFDLENBQUM7UUFFRixvQkFBZSxHQUFHLENBQUMsVUFBa0IsRUFBRSxZQUFvQixFQUFFLEVBQUU7WUFDN0QsT0FBTyxHQUFHLFVBQVUsT0FBTyxZQUFZLFFBQVEsQ0FBQztRQUNsRCxDQUFDLENBQUM7S0FDSDs7K0dBdkRZLGtCQUFrQjttSEFBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBRDlCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4vdmlld2VyLWludGwnO1xuaW1wb3J0IHsgSGVscEludGxOb05iIH0gZnJvbSAnLi9oZWxwLWludGwubm9fbmInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWltZVZpZXdlckludGxOb05iIGV4dGVuZHMgTWltZVZpZXdlckludGwge1xuICBoZWxwID0gbmV3IEhlbHBJbnRsTm9OYigpO1xuICBjbG9zZUxhYmVsID0gJ0x1a2snO1xuICBhdHRyaWJ1dGlvbkxhYmVsID0gJ1RpbGxhdGVsc2UnO1xuICBhdHRyaWJ1dG9uQ2xvc2VBcmlhTGFiZWwgPSAnU3RlbmcgdGlsbGF0ZWxzZSBkaWFsb2cnO1xuICByZWNvZ25pemVkVGV4dENvbnRlbnRMYWJlbCA9ICdHamVua2plbnQgdGVrc3QnO1xuICBjb250ZW50c0xhYmVsID0gJ0lubmhvbGQnO1xuICBsYXlvdXRNZW51TGFiZWwgPSAnVmlzbmluZyc7XG4gIHBhZ2VMYXlvdXRMYWJlbCA9ICdTaWRlb3Bwc2V0dCc7XG4gIHNpbmdsZVBhZ2VWaWV3TGFiZWwgPSAnRW5rZWx0c2lkZXInO1xuICB0d29QYWdlVmlld0xhYmVsID0gJ1RvIHNpZGVyJztcbiAgZGlnaXRhbFRleHRMYWJlbCA9ICdEaWdpdGFsIHRla3N0JztcbiAgcmVjb2duaXplZFRleHRDb250ZW50Q2xvc2VMYWJlbCA9ICdJbmdlbic7XG4gIHJlY29nbml6ZWRUZXh0Q29udGVudEluU3BsaXRWaWV3TGFiZWwgPSAnRGVsdCc7XG4gIHNob3dSZWNvZ25pemVkVGV4dENvbnRlbnRMYWJlbCA9ICdLdW4gZGlnaXRhbCB0ZWtzdCc7XG4gIG1ldGFkYXRhTGFiZWwgPSAnTWV0YWRhdGEnO1xuICBsaWNlbnNlTGFiZWwgPSAnTGlzZW5zJztcbiAgdG9jTGFiZWwgPSAnSW5uaG9sZHNmb3J0ZWduZWxzZSc7XG4gIGZ1bGxTY3JlZW5MYWJlbCA9ICdGdWxsc2tqZXJtJztcbiAgZXhpdEZ1bGxTY3JlZW5MYWJlbCA9ICdBdnNsdXR0IGZ1bGxza2plcm0nO1xuICB6b29tSW5MYWJlbCA9ICdab29tIGlubic7XG4gIHpvb21PdXRMYWJlbCA9ICdab29tIHV0JztcbiAgcHJldmlvdXNQYWdlTGFiZWwgPSAnRm9ycmlnZSBzaWRlJztcbiAgbmV4dFBhZ2VMYWJlbCA9ICdOZXN0ZSBzaWRlJztcbiAgaG9tZUxhYmVsID0gJ0hqZW0nO1xuICByb3RhdGVDd0xhYmVsID0gJ1JvdMOpciA5MMKwJztcbiAgc2VhcmNoTGFiZWwgPSAnU8O4ayc7XG4gIGNsZWFyU2VhcmNoTGFiZWwgPSAnVMO4bSc7XG4gIHByZXZpb3VzSGl0TGFiZWwgPSAnRm9ycmlnZSB0cmVmZic7XG4gIG5leHRIaXRMYWJlbCA9ICdOZXN0ZSB0cmVmZic7XG4gIGdvVG9QYWdlTGFiZWwgPSAnR8OlIHRpbCBzaWRlJztcbiAgY3VycmVudFBhZ2VMYWJlbCA9ICdOw6V2w6ZyZW5kZSBzaWRlJztcbiAgZW50ZXJQYWdlTnVtYmVyID0gJ1Nrcml2IGlubiBzaWRlbnVtbWVyJztcbiAgZHJvcERpc2FibGVkID0gJ0Jla2xhZ2VyLCBtZW4gZHJhZyBhbmQgZHJvcCBlciBpa2tlIGFrdGl2ZXJ0JztcbiAgbG9hZGluZyA9ICdMYXN0ZXIgLi4uJztcbiAgcm90YXRpb25Jc05vdFN1cHBvcnRlZCA9ICdSb3Rhc2pvbiBzdMO4dHRlcyBpa2tlIGF2IGVuaGV0ZW4gZGluJztcblxuICAvLyBFUlJPUlNcbiAgc29tZXRoaW5nSGFzR29uZVdyb25nTGFiZWwgPSAnw4UgbmVpISBOb2UgaGFyIGfDpXR0IGdhbHQuLi4nO1xuICBtYW5pZmVzdFVyaU1pc3NpbmdMYWJlbCA9ICdMZW5rZSB0aWwgbWFuaWZlc3QgbWFuZ2xlcic7XG4gIG1hbmlmZXN0Tm90VmFsaWRMYWJlbCA9ICdNYW5pZmVzdGV0IGVyIGlra2UgZ3lsZGlnJztcbiAgcGFnZURvZXNOb3RFeGlzdHMgPSAnQmVrbGFnZXIsIG1lbiBkZW4gc2lkZW4gZmlubmVzIGlra2UnO1xuICB0ZXh0Q29udGVudEVycm9yTGFiZWwgPSAnQmVrbGFnZXIsIG1lbiBqZWcgZmlubmVyIGlra2UgdGVrc3RlbiBmb3IgZGVnJztcblxuICBub1Jlc3VsdHNGb3VuZExhYmVsID0gKHE6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBgSW5nZW4gdHJlZmYgZnVubmV0IGZvciA8ZW0gY2xhc3M9XCJjdXJyZW50LXNlYXJjaFwiPiR7cX08L2VtPmA7XG4gIH07XG5cbiAgcmVzdWx0c0ZvdW5kTGFiZWwgPSAobnVtYmVyT2ZIaXRzOiBudW1iZXIsIHE6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBgJHtudW1iZXJPZkhpdHN9IHRyZWZmIGZ1bm5ldCBmb3IgPGVtIGNsYXNzPVwiY3VycmVudC1zZWFyY2hcIj4ke3F9PC9lbT5gO1xuICB9O1xuXG4gIGN1cnJlbnRIaXRMYWJlbCA9IChjdXJyZW50SGl0OiBudW1iZXIsIG51bWJlck9mSGl0czogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIGAke2N1cnJlbnRIaXR9IGF2ICR7bnVtYmVyT2ZIaXRzfSB0cmVmZmA7XG4gIH07XG59XG4iXX0=