import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HelpIntl } from './help-intl';
export class MimeViewerIntl {
    constructor() {
        this.changes = new Subject();
        this.help = new HelpIntl();
        this.closeLabel = 'Close';
        this.attributionLabel = 'Attribution';
        this.attributonCloseAriaLabel = 'Close attribution dialog';
        this.recognizedTextContentLabel = 'Recognized text';
        this.contentsLabel = 'Contents';
        this.twoPageViewLabel = 'Two page display';
        this.singlePageViewLabel = 'Single page display';
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
        // ERRORS
        this.somethingHasGoneWrongLabel = 'Oh dear, something has gone terribly wrong...';
        this.manifestUriMissingLabel = 'ManifestUri is missing';
        this.manifestNotValidLabel = 'Manifest is not valid';
        this.pageDoesNotExists = 'Sorry, that page does not exist';
        this.textContentErrorLabel = 'Oh dear, i can\'t find the text for you';
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
}
MimeViewerIntl.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3ZDLE1BQU0sT0FBTyxjQUFjO0lBRDNCO1FBRUUsWUFBTyxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBRTdDLFNBQUksR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLGVBQVUsR0FBRyxPQUFPLENBQUM7UUFDckIscUJBQWdCLEdBQUcsYUFBYSxDQUFDO1FBQ2pDLDZCQUF3QixHQUFHLDBCQUEwQixDQUFDO1FBQ3RELCtCQUEwQixHQUFHLGlCQUFpQixDQUFDO1FBQy9DLGtCQUFhLEdBQUcsVUFBVSxDQUFDO1FBQzNCLHFCQUFnQixHQUFHLGtCQUFrQixDQUFDO1FBQ3RDLHdCQUFtQixHQUFHLHFCQUFxQixDQUFDO1FBQzVDLGtCQUFhLEdBQUcsVUFBVSxDQUFDO1FBQzNCLGlCQUFZLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLGFBQVEsR0FBRyxtQkFBbUIsQ0FBQztRQUMvQixvQkFBZSxHQUFHLGFBQWEsQ0FBQztRQUNoQyx3QkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztRQUN6QyxnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQUN4QixpQkFBWSxHQUFHLFVBQVUsQ0FBQztRQUMxQixzQkFBaUIsR0FBRyxlQUFlLENBQUM7UUFDcEMsa0JBQWEsR0FBRyxXQUFXLENBQUM7UUFDNUIsY0FBUyxHQUFHLFNBQVMsQ0FBQztRQUN0QixrQkFBYSxHQUFHLFlBQVksQ0FBQztRQUM3QixnQkFBVyxHQUFHLFFBQVEsQ0FBQztRQUN2QixxQkFBZ0IsR0FBRyxPQUFPLENBQUM7UUFDM0IscUJBQWdCLEdBQUcsY0FBYyxDQUFDO1FBQ2xDLGlCQUFZLEdBQUcsVUFBVSxDQUFDO1FBQzFCLGtCQUFhLEdBQUcsWUFBWSxDQUFDO1FBQzdCLHFCQUFnQixHQUFHLGNBQWMsQ0FBQztRQUNsQyxvQkFBZSxHQUFHLG1CQUFtQixDQUFDO1FBQ3RDLGlCQUFZLEdBQUcsc0NBQXNDLENBQUM7UUFDdEQsWUFBTyxHQUFHLGFBQWEsQ0FBQztRQUV4QixTQUFTO1FBQ1QsK0JBQTBCLEdBQUcsK0NBQStDLENBQUM7UUFDN0UsNEJBQXVCLEdBQUcsd0JBQXdCLENBQUM7UUFDbkQsMEJBQXFCLEdBQUcsdUJBQXVCLENBQUM7UUFDaEQsc0JBQWlCLEdBQUcsaUNBQWlDLENBQUM7UUFDdEQsMEJBQXFCLEdBQUcseUNBQXlDLENBQUM7UUFFbEUsd0JBQW1CLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRTtZQUNsQyxPQUFPLG1EQUFtRCxDQUFDLE9BQU8sQ0FBQztRQUNyRSxDQUFDLENBQUM7UUFFRixzQkFBaUIsR0FBRyxDQUFDLFlBQW9CLEVBQUUsQ0FBUyxFQUFFLEVBQUU7WUFDdEQsT0FBTyxHQUFHLFlBQVksaURBQWlELENBQUMsT0FBTyxDQUFDO1FBQ2xGLENBQUMsQ0FBQztRQUVGLG9CQUFlLEdBQUcsQ0FBQyxVQUFrQixFQUFFLFlBQW9CLEVBQUUsRUFBRTtZQUM3RCxPQUFPLEdBQUcsVUFBVSxPQUFPLFlBQVksT0FBTyxDQUFDO1FBQ2pELENBQUMsQ0FBQztJQUNKLENBQUM7OztZQW5EQSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSGVscEludGwgfSBmcm9tICcuL2hlbHAtaW50bCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNaW1lVmlld2VySW50bCB7XG4gIGNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGhlbHA6IEhlbHBJbnRsID0gbmV3IEhlbHBJbnRsKCk7XG4gIGNsb3NlTGFiZWwgPSAnQ2xvc2UnO1xuICBhdHRyaWJ1dGlvbkxhYmVsID0gJ0F0dHJpYnV0aW9uJztcbiAgYXR0cmlidXRvbkNsb3NlQXJpYUxhYmVsID0gJ0Nsb3NlIGF0dHJpYnV0aW9uIGRpYWxvZyc7XG4gIHJlY29nbml6ZWRUZXh0Q29udGVudExhYmVsID0gJ1JlY29nbml6ZWQgdGV4dCc7XG4gIGNvbnRlbnRzTGFiZWwgPSAnQ29udGVudHMnO1xuICB0d29QYWdlVmlld0xhYmVsID0gJ1R3byBwYWdlIGRpc3BsYXknO1xuICBzaW5nbGVQYWdlVmlld0xhYmVsID0gJ1NpbmdsZSBwYWdlIGRpc3BsYXknO1xuICBtZXRhZGF0YUxhYmVsID0gJ01ldGFkYXRhJztcbiAgbGljZW5zZUxhYmVsID0gJ0xpY2Vuc2UnO1xuICB0b2NMYWJlbCA9ICdUYWJsZSBvZiBDb250ZW50cyc7XG4gIGZ1bGxTY3JlZW5MYWJlbCA9ICdGdWxsIHNjcmVlbic7XG4gIGV4aXRGdWxsU2NyZWVuTGFiZWwgPSAnRXhpdCBmdWxsIHNjcmVlbic7XG4gIHpvb21JbkxhYmVsID0gJ1pvb20gaW4nO1xuICB6b29tT3V0TGFiZWwgPSAnWm9vbSBvdXQnO1xuICBwcmV2aW91c1BhZ2VMYWJlbCA9ICdQcmV2aW91cyBQYWdlJztcbiAgbmV4dFBhZ2VMYWJlbCA9ICdOZXh0IFBhZ2UnO1xuICBob21lTGFiZWwgPSAnR28gSG9tZSc7XG4gIHJvdGF0ZUN3TGFiZWwgPSAnUm90YXRlIDkwwrAnO1xuICBzZWFyY2hMYWJlbCA9ICdTZWFyY2gnO1xuICBjbGVhclNlYXJjaExhYmVsID0gJ0NsZWFyJztcbiAgcHJldmlvdXNIaXRMYWJlbCA9ICdQcmV2aW91cyBIaXQnO1xuICBuZXh0SGl0TGFiZWwgPSAnTmV4dCBIaXQnO1xuICBnb1RvUGFnZUxhYmVsID0gJ0dvIHRvIHBhZ2UnO1xuICBjdXJyZW50UGFnZUxhYmVsID0gJ0N1cnJlbnQgcGFnZSc7XG4gIGVudGVyUGFnZU51bWJlciA9ICdFbnRlciBwYWdlIG51bWJlcic7XG4gIGRyb3BEaXNhYmxlZCA9ICdTb3JyeSwgYnV0IGRyYWcgYW5kIGRyb3AgaXMgZGlzYWJsZWQnO1xuICBsb2FkaW5nID0gJ0xvYWRpbmcgLi4uJztcblxuICAvLyBFUlJPUlNcbiAgc29tZXRoaW5nSGFzR29uZVdyb25nTGFiZWwgPSAnT2ggZGVhciwgc29tZXRoaW5nIGhhcyBnb25lIHRlcnJpYmx5IHdyb25nLi4uJztcbiAgbWFuaWZlc3RVcmlNaXNzaW5nTGFiZWwgPSAnTWFuaWZlc3RVcmkgaXMgbWlzc2luZyc7XG4gIG1hbmlmZXN0Tm90VmFsaWRMYWJlbCA9ICdNYW5pZmVzdCBpcyBub3QgdmFsaWQnO1xuICBwYWdlRG9lc05vdEV4aXN0cyA9ICdTb3JyeSwgdGhhdCBwYWdlIGRvZXMgbm90IGV4aXN0JztcbiAgdGV4dENvbnRlbnRFcnJvckxhYmVsID0gJ09oIGRlYXIsIGkgY2FuXFwndCBmaW5kIHRoZSB0ZXh0IGZvciB5b3UnO1xuXG4gIG5vUmVzdWx0c0ZvdW5kTGFiZWwgPSAocTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGBObyByZXN1bHRzIGZvdW5kIGZvciA8ZW0gY2xhc3M9XCJjdXJyZW50LXNlYXJjaFwiPiR7cX08L2VtPmA7XG4gIH07XG5cbiAgcmVzdWx0c0ZvdW5kTGFiZWwgPSAobnVtYmVyT2ZIaXRzOiBudW1iZXIsIHE6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBgJHtudW1iZXJPZkhpdHN9IHJlc3VsdHMgZm91bmQgZm9yIDxlbSBjbGFzcz1cImN1cnJlbnQtc2VhcmNoXCI+JHtxfTwvZW0+YDtcbiAgfTtcblxuICBjdXJyZW50SGl0TGFiZWwgPSAoY3VycmVudEhpdDogbnVtYmVyLCBudW1iZXJPZkhpdHM6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiBgJHtjdXJyZW50SGl0fSBvZiAke251bWJlck9mSGl0c30gaGl0c2A7XG4gIH07XG59XG4iXX0=