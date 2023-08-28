import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HelpIntl } from './help-intl';
import * as i0 from "@angular/core";
export class MimeViewerIntl {
    constructor() {
        this.changes = new Subject();
        this.help = new HelpIntl();
        this.closeLabel = 'Close';
        this.attributionLabel = 'Attribution';
        this.attributonCloseAriaLabel = 'Close attribution dialog';
        this.helpCloseAriaLabel = 'Close help dialog';
        this.informationLabel = 'Information';
        this.layoutMenuLabel = 'View';
        this.pageLayoutLabel = 'Page layout';
        this.singlePageViewLabel = 'Single pages';
        this.twoPageViewLabel = 'Two pages';
        this.digitalTextLabel = 'Digital text';
        this.recognizedTextContentCloseLabel = 'None';
        this.recognizedTextContentInSplitViewLabel = 'Split';
        this.showRecognizedTextContentLabel = 'Digital text only';
        this.metadataLabel = 'Metadata';
        this.licenseLabel = 'License';
        this.tocLabel = 'Table of Contents';
        this.fullScreenLabel = 'Full screen';
        this.exitFullScreenLabel = 'Exit full screen';
        this.zoomInLabel = 'Zoom in';
        this.zoomOutLabel = 'Zoom out';
        this.previousPageLabel = 'Previous Page';
        this.nextPageLabel = 'Next Page';
        this.homeLabel = 'Go Home';
        this.rotateCwLabel = 'Rotate 90°';
        this.searchLabel = 'Search';
        this.clearSearchLabel = 'Clear';
        this.previousHitLabel = 'Previous Hit';
        this.nextHitLabel = 'Next Hit';
        this.goToPageLabel = 'Go to page';
        this.currentPageLabel = 'Current page';
        this.enterPageNumber = 'Enter page number';
        this.dropDisabled = 'Sorry, but drag and drop is disabled';
        this.loading = 'Loading ...';
        this.rotationIsNotSupported = 'Rotation is not supported by your device';
        // ERRORS
        this.somethingHasGoneWrongLabel = 'Oh dear, something has gone terribly wrong...';
        this.manifestUriMissingLabel = 'ManifestUri is missing';
        this.manifestNotValidLabel = 'Manifest is not valid';
        this.pageDoesNotExists = 'Sorry, that page does not exist';
        this.textContentErrorLabel = `Oh dear, i can't find the text for you`;
        this.noResultsFoundLabel = (q) => {
            return `No results found for <em class="current-search">${q}</em>`;
        };
        this.resultsFoundLabel = (numberOfHits, q) => {
            return `${numberOfHits} results found for <em class="current-search">${q}</em>`;
        };
        this.currentHitLabel = (currentHit, numberOfHits) => {
            return `${currentHit} of ${numberOfHits} hits`;
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeViewerIntl, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeViewerIntl }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeViewerIntl, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUd2QyxNQUFNLE9BQU8sY0FBYztJQUQzQjtRQUVFLFlBQU8sR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUU3QyxTQUFJLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNoQyxlQUFVLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLHFCQUFnQixHQUFHLGFBQWEsQ0FBQztRQUNqQyw2QkFBd0IsR0FBRywwQkFBMEIsQ0FBQztRQUN0RCx1QkFBa0IsR0FBRyxtQkFBbUIsQ0FBQztRQUN6QyxxQkFBZ0IsR0FBRyxhQUFhLENBQUM7UUFDakMsb0JBQWUsR0FBRyxNQUFNLENBQUM7UUFDekIsb0JBQWUsR0FBRyxhQUFhLENBQUM7UUFDaEMsd0JBQW1CLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLHFCQUFnQixHQUFHLFdBQVcsQ0FBQztRQUMvQixxQkFBZ0IsR0FBRyxjQUFjLENBQUM7UUFDbEMsb0NBQStCLEdBQUcsTUFBTSxDQUFDO1FBQ3pDLDBDQUFxQyxHQUFHLE9BQU8sQ0FBQztRQUNoRCxtQ0FBOEIsR0FBRyxtQkFBbUIsQ0FBQztRQUNyRCxrQkFBYSxHQUFHLFVBQVUsQ0FBQztRQUMzQixpQkFBWSxHQUFHLFNBQVMsQ0FBQztRQUN6QixhQUFRLEdBQUcsbUJBQW1CLENBQUM7UUFDL0Isb0JBQWUsR0FBRyxhQUFhLENBQUM7UUFDaEMsd0JBQW1CLEdBQUcsa0JBQWtCLENBQUM7UUFDekMsZ0JBQVcsR0FBRyxTQUFTLENBQUM7UUFDeEIsaUJBQVksR0FBRyxVQUFVLENBQUM7UUFDMUIsc0JBQWlCLEdBQUcsZUFBZSxDQUFDO1FBQ3BDLGtCQUFhLEdBQUcsV0FBVyxDQUFDO1FBQzVCLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFDN0IsZ0JBQVcsR0FBRyxRQUFRLENBQUM7UUFDdkIscUJBQWdCLEdBQUcsT0FBTyxDQUFDO1FBQzNCLHFCQUFnQixHQUFHLGNBQWMsQ0FBQztRQUNsQyxpQkFBWSxHQUFHLFVBQVUsQ0FBQztRQUMxQixrQkFBYSxHQUFHLFlBQVksQ0FBQztRQUM3QixxQkFBZ0IsR0FBRyxjQUFjLENBQUM7UUFDbEMsb0JBQWUsR0FBRyxtQkFBbUIsQ0FBQztRQUN0QyxpQkFBWSxHQUFHLHNDQUFzQyxDQUFDO1FBQ3RELFlBQU8sR0FBRyxhQUFhLENBQUM7UUFDeEIsMkJBQXNCLEdBQUcsMENBQTBDLENBQUM7UUFFcEUsU0FBUztRQUNULCtCQUEwQixHQUFHLCtDQUErQyxDQUFDO1FBQzdFLDRCQUF1QixHQUFHLHdCQUF3QixDQUFDO1FBQ25ELDBCQUFxQixHQUFHLHVCQUF1QixDQUFDO1FBQ2hELHNCQUFpQixHQUFHLGlDQUFpQyxDQUFDO1FBQ3RELDBCQUFxQixHQUFHLHdDQUF3QyxDQUFDO1FBRWpFLHdCQUFtQixHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7WUFDbEMsT0FBTyxtREFBbUQsQ0FBQyxPQUFPLENBQUM7UUFDckUsQ0FBQyxDQUFDO1FBRUYsc0JBQWlCLEdBQUcsQ0FBQyxZQUFvQixFQUFFLENBQVMsRUFBRSxFQUFFO1lBQ3RELE9BQU8sR0FBRyxZQUFZLGlEQUFpRCxDQUFDLE9BQU8sQ0FBQztRQUNsRixDQUFDLENBQUM7UUFFRixvQkFBZSxHQUFHLENBQUMsVUFBa0IsRUFBRSxZQUFvQixFQUFFLEVBQUU7WUFDN0QsT0FBTyxHQUFHLFVBQVUsT0FBTyxZQUFZLE9BQU8sQ0FBQztRQUNqRCxDQUFDLENBQUM7S0FDSDs4R0F6RFksY0FBYztrSEFBZCxjQUFjOzsyRkFBZCxjQUFjO2tCQUQxQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSGVscEludGwgfSBmcm9tICcuL2hlbHAtaW50bCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNaW1lVmlld2VySW50bCB7XG4gIGNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGhlbHA6IEhlbHBJbnRsID0gbmV3IEhlbHBJbnRsKCk7XG4gIGNsb3NlTGFiZWwgPSAnQ2xvc2UnO1xuICBhdHRyaWJ1dGlvbkxhYmVsID0gJ0F0dHJpYnV0aW9uJztcbiAgYXR0cmlidXRvbkNsb3NlQXJpYUxhYmVsID0gJ0Nsb3NlIGF0dHJpYnV0aW9uIGRpYWxvZyc7XG4gIGhlbHBDbG9zZUFyaWFMYWJlbCA9ICdDbG9zZSBoZWxwIGRpYWxvZyc7XG4gIGluZm9ybWF0aW9uTGFiZWwgPSAnSW5mb3JtYXRpb24nO1xuICBsYXlvdXRNZW51TGFiZWwgPSAnVmlldyc7XG4gIHBhZ2VMYXlvdXRMYWJlbCA9ICdQYWdlIGxheW91dCc7XG4gIHNpbmdsZVBhZ2VWaWV3TGFiZWwgPSAnU2luZ2xlIHBhZ2VzJztcbiAgdHdvUGFnZVZpZXdMYWJlbCA9ICdUd28gcGFnZXMnO1xuICBkaWdpdGFsVGV4dExhYmVsID0gJ0RpZ2l0YWwgdGV4dCc7XG4gIHJlY29nbml6ZWRUZXh0Q29udGVudENsb3NlTGFiZWwgPSAnTm9uZSc7XG4gIHJlY29nbml6ZWRUZXh0Q29udGVudEluU3BsaXRWaWV3TGFiZWwgPSAnU3BsaXQnO1xuICBzaG93UmVjb2duaXplZFRleHRDb250ZW50TGFiZWwgPSAnRGlnaXRhbCB0ZXh0IG9ubHknO1xuICBtZXRhZGF0YUxhYmVsID0gJ01ldGFkYXRhJztcbiAgbGljZW5zZUxhYmVsID0gJ0xpY2Vuc2UnO1xuICB0b2NMYWJlbCA9ICdUYWJsZSBvZiBDb250ZW50cyc7XG4gIGZ1bGxTY3JlZW5MYWJlbCA9ICdGdWxsIHNjcmVlbic7XG4gIGV4aXRGdWxsU2NyZWVuTGFiZWwgPSAnRXhpdCBmdWxsIHNjcmVlbic7XG4gIHpvb21JbkxhYmVsID0gJ1pvb20gaW4nO1xuICB6b29tT3V0TGFiZWwgPSAnWm9vbSBvdXQnO1xuICBwcmV2aW91c1BhZ2VMYWJlbCA9ICdQcmV2aW91cyBQYWdlJztcbiAgbmV4dFBhZ2VMYWJlbCA9ICdOZXh0IFBhZ2UnO1xuICBob21lTGFiZWwgPSAnR28gSG9tZSc7XG4gIHJvdGF0ZUN3TGFiZWwgPSAnUm90YXRlIDkwwrAnO1xuICBzZWFyY2hMYWJlbCA9ICdTZWFyY2gnO1xuICBjbGVhclNlYXJjaExhYmVsID0gJ0NsZWFyJztcbiAgcHJldmlvdXNIaXRMYWJlbCA9ICdQcmV2aW91cyBIaXQnO1xuICBuZXh0SGl0TGFiZWwgPSAnTmV4dCBIaXQnO1xuICBnb1RvUGFnZUxhYmVsID0gJ0dvIHRvIHBhZ2UnO1xuICBjdXJyZW50UGFnZUxhYmVsID0gJ0N1cnJlbnQgcGFnZSc7XG4gIGVudGVyUGFnZU51bWJlciA9ICdFbnRlciBwYWdlIG51bWJlcic7XG4gIGRyb3BEaXNhYmxlZCA9ICdTb3JyeSwgYnV0IGRyYWcgYW5kIGRyb3AgaXMgZGlzYWJsZWQnO1xuICBsb2FkaW5nID0gJ0xvYWRpbmcgLi4uJztcbiAgcm90YXRpb25Jc05vdFN1cHBvcnRlZCA9ICdSb3RhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHlvdXIgZGV2aWNlJztcblxuICAvLyBFUlJPUlNcbiAgc29tZXRoaW5nSGFzR29uZVdyb25nTGFiZWwgPSAnT2ggZGVhciwgc29tZXRoaW5nIGhhcyBnb25lIHRlcnJpYmx5IHdyb25nLi4uJztcbiAgbWFuaWZlc3RVcmlNaXNzaW5nTGFiZWwgPSAnTWFuaWZlc3RVcmkgaXMgbWlzc2luZyc7XG4gIG1hbmlmZXN0Tm90VmFsaWRMYWJlbCA9ICdNYW5pZmVzdCBpcyBub3QgdmFsaWQnO1xuICBwYWdlRG9lc05vdEV4aXN0cyA9ICdTb3JyeSwgdGhhdCBwYWdlIGRvZXMgbm90IGV4aXN0JztcbiAgdGV4dENvbnRlbnRFcnJvckxhYmVsID0gYE9oIGRlYXIsIGkgY2FuJ3QgZmluZCB0aGUgdGV4dCBmb3IgeW91YDtcblxuICBub1Jlc3VsdHNGb3VuZExhYmVsID0gKHE6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBgTm8gcmVzdWx0cyBmb3VuZCBmb3IgPGVtIGNsYXNzPVwiY3VycmVudC1zZWFyY2hcIj4ke3F9PC9lbT5gO1xuICB9O1xuXG4gIHJlc3VsdHNGb3VuZExhYmVsID0gKG51bWJlck9mSGl0czogbnVtYmVyLCBxOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gYCR7bnVtYmVyT2ZIaXRzfSByZXN1bHRzIGZvdW5kIGZvciA8ZW0gY2xhc3M9XCJjdXJyZW50LXNlYXJjaFwiPiR7cX08L2VtPmA7XG4gIH07XG5cbiAgY3VycmVudEhpdExhYmVsID0gKGN1cnJlbnRIaXQ6IG51bWJlciwgbnVtYmVyT2ZIaXRzOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gYCR7Y3VycmVudEhpdH0gb2YgJHtudW1iZXJPZkhpdHN9IGhpdHNgO1xuICB9O1xufVxuIl19