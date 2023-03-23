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
        this.contentsLabel = 'Contents';
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
}
MimeViewerIntl.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeViewerIntl, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MimeViewerIntl.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeViewerIntl });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeViewerIntl, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUd2QyxNQUFNLE9BQU8sY0FBYztJQUQzQjtRQUVFLFlBQU8sR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUU3QyxTQUFJLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNoQyxlQUFVLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLHFCQUFnQixHQUFHLGFBQWEsQ0FBQztRQUNqQyw2QkFBd0IsR0FBRywwQkFBMEIsQ0FBQztRQUN0RCx1QkFBa0IsR0FBRyxtQkFBbUIsQ0FBQztRQUN6QyxrQkFBYSxHQUFHLFVBQVUsQ0FBQztRQUMzQixvQkFBZSxHQUFHLE1BQU0sQ0FBQztRQUN6QixvQkFBZSxHQUFHLGFBQWEsQ0FBQztRQUNoQyx3QkFBbUIsR0FBRyxjQUFjLENBQUM7UUFDckMscUJBQWdCLEdBQUcsV0FBVyxDQUFDO1FBQy9CLHFCQUFnQixHQUFHLGNBQWMsQ0FBQztRQUNsQyxvQ0FBK0IsR0FBRyxNQUFNLENBQUM7UUFDekMsMENBQXFDLEdBQUcsT0FBTyxDQUFDO1FBQ2hELG1DQUE4QixHQUFHLG1CQUFtQixDQUFDO1FBQ3JELGtCQUFhLEdBQUcsVUFBVSxDQUFDO1FBQzNCLGlCQUFZLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLGFBQVEsR0FBRyxtQkFBbUIsQ0FBQztRQUMvQixvQkFBZSxHQUFHLGFBQWEsQ0FBQztRQUNoQyx3QkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztRQUN6QyxnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQUN4QixpQkFBWSxHQUFHLFVBQVUsQ0FBQztRQUMxQixzQkFBaUIsR0FBRyxlQUFlLENBQUM7UUFDcEMsa0JBQWEsR0FBRyxXQUFXLENBQUM7UUFDNUIsY0FBUyxHQUFHLFNBQVMsQ0FBQztRQUN0QixrQkFBYSxHQUFHLFlBQVksQ0FBQztRQUM3QixnQkFBVyxHQUFHLFFBQVEsQ0FBQztRQUN2QixxQkFBZ0IsR0FBRyxPQUFPLENBQUM7UUFDM0IscUJBQWdCLEdBQUcsY0FBYyxDQUFDO1FBQ2xDLGlCQUFZLEdBQUcsVUFBVSxDQUFDO1FBQzFCLGtCQUFhLEdBQUcsWUFBWSxDQUFDO1FBQzdCLHFCQUFnQixHQUFHLGNBQWMsQ0FBQztRQUNsQyxvQkFBZSxHQUFHLG1CQUFtQixDQUFDO1FBQ3RDLGlCQUFZLEdBQUcsc0NBQXNDLENBQUM7UUFDdEQsWUFBTyxHQUFHLGFBQWEsQ0FBQztRQUN4QiwyQkFBc0IsR0FBRywwQ0FBMEMsQ0FBQztRQUVwRSxTQUFTO1FBQ1QsK0JBQTBCLEdBQUcsK0NBQStDLENBQUM7UUFDN0UsNEJBQXVCLEdBQUcsd0JBQXdCLENBQUM7UUFDbkQsMEJBQXFCLEdBQUcsdUJBQXVCLENBQUM7UUFDaEQsc0JBQWlCLEdBQUcsaUNBQWlDLENBQUM7UUFDdEQsMEJBQXFCLEdBQUcsd0NBQXdDLENBQUM7UUFFakUsd0JBQW1CLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRTtZQUNsQyxPQUFPLG1EQUFtRCxDQUFDLE9BQU8sQ0FBQztRQUNyRSxDQUFDLENBQUM7UUFFRixzQkFBaUIsR0FBRyxDQUFDLFlBQW9CLEVBQUUsQ0FBUyxFQUFFLEVBQUU7WUFDdEQsT0FBTyxHQUFHLFlBQVksaURBQWlELENBQUMsT0FBTyxDQUFDO1FBQ2xGLENBQUMsQ0FBQztRQUVGLG9CQUFlLEdBQUcsQ0FBQyxVQUFrQixFQUFFLFlBQW9CLEVBQUUsRUFBRTtZQUM3RCxPQUFPLEdBQUcsVUFBVSxPQUFPLFlBQVksT0FBTyxDQUFDO1FBQ2pELENBQUMsQ0FBQztLQUNIOzsyR0F6RFksY0FBYzsrR0FBZCxjQUFjOzJGQUFkLGNBQWM7a0JBRDFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIZWxwSW50bCB9IGZyb20gJy4vaGVscC1pbnRsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1pbWVWaWV3ZXJJbnRsIHtcbiAgY2hhbmdlczogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgaGVscDogSGVscEludGwgPSBuZXcgSGVscEludGwoKTtcbiAgY2xvc2VMYWJlbCA9ICdDbG9zZSc7XG4gIGF0dHJpYnV0aW9uTGFiZWwgPSAnQXR0cmlidXRpb24nO1xuICBhdHRyaWJ1dG9uQ2xvc2VBcmlhTGFiZWwgPSAnQ2xvc2UgYXR0cmlidXRpb24gZGlhbG9nJztcbiAgaGVscENsb3NlQXJpYUxhYmVsID0gJ0Nsb3NlIGhlbHAgZGlhbG9nJztcbiAgY29udGVudHNMYWJlbCA9ICdDb250ZW50cyc7XG4gIGxheW91dE1lbnVMYWJlbCA9ICdWaWV3JztcbiAgcGFnZUxheW91dExhYmVsID0gJ1BhZ2UgbGF5b3V0JztcbiAgc2luZ2xlUGFnZVZpZXdMYWJlbCA9ICdTaW5nbGUgcGFnZXMnO1xuICB0d29QYWdlVmlld0xhYmVsID0gJ1R3byBwYWdlcyc7XG4gIGRpZ2l0YWxUZXh0TGFiZWwgPSAnRGlnaXRhbCB0ZXh0JztcbiAgcmVjb2duaXplZFRleHRDb250ZW50Q2xvc2VMYWJlbCA9ICdOb25lJztcbiAgcmVjb2duaXplZFRleHRDb250ZW50SW5TcGxpdFZpZXdMYWJlbCA9ICdTcGxpdCc7XG4gIHNob3dSZWNvZ25pemVkVGV4dENvbnRlbnRMYWJlbCA9ICdEaWdpdGFsIHRleHQgb25seSc7XG4gIG1ldGFkYXRhTGFiZWwgPSAnTWV0YWRhdGEnO1xuICBsaWNlbnNlTGFiZWwgPSAnTGljZW5zZSc7XG4gIHRvY0xhYmVsID0gJ1RhYmxlIG9mIENvbnRlbnRzJztcbiAgZnVsbFNjcmVlbkxhYmVsID0gJ0Z1bGwgc2NyZWVuJztcbiAgZXhpdEZ1bGxTY3JlZW5MYWJlbCA9ICdFeGl0IGZ1bGwgc2NyZWVuJztcbiAgem9vbUluTGFiZWwgPSAnWm9vbSBpbic7XG4gIHpvb21PdXRMYWJlbCA9ICdab29tIG91dCc7XG4gIHByZXZpb3VzUGFnZUxhYmVsID0gJ1ByZXZpb3VzIFBhZ2UnO1xuICBuZXh0UGFnZUxhYmVsID0gJ05leHQgUGFnZSc7XG4gIGhvbWVMYWJlbCA9ICdHbyBIb21lJztcbiAgcm90YXRlQ3dMYWJlbCA9ICdSb3RhdGUgOTDCsCc7XG4gIHNlYXJjaExhYmVsID0gJ1NlYXJjaCc7XG4gIGNsZWFyU2VhcmNoTGFiZWwgPSAnQ2xlYXInO1xuICBwcmV2aW91c0hpdExhYmVsID0gJ1ByZXZpb3VzIEhpdCc7XG4gIG5leHRIaXRMYWJlbCA9ICdOZXh0IEhpdCc7XG4gIGdvVG9QYWdlTGFiZWwgPSAnR28gdG8gcGFnZSc7XG4gIGN1cnJlbnRQYWdlTGFiZWwgPSAnQ3VycmVudCBwYWdlJztcbiAgZW50ZXJQYWdlTnVtYmVyID0gJ0VudGVyIHBhZ2UgbnVtYmVyJztcbiAgZHJvcERpc2FibGVkID0gJ1NvcnJ5LCBidXQgZHJhZyBhbmQgZHJvcCBpcyBkaXNhYmxlZCc7XG4gIGxvYWRpbmcgPSAnTG9hZGluZyAuLi4nO1xuICByb3RhdGlvbklzTm90U3VwcG9ydGVkID0gJ1JvdGF0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBkZXZpY2UnO1xuXG4gIC8vIEVSUk9SU1xuICBzb21ldGhpbmdIYXNHb25lV3JvbmdMYWJlbCA9ICdPaCBkZWFyLCBzb21ldGhpbmcgaGFzIGdvbmUgdGVycmlibHkgd3JvbmcuLi4nO1xuICBtYW5pZmVzdFVyaU1pc3NpbmdMYWJlbCA9ICdNYW5pZmVzdFVyaSBpcyBtaXNzaW5nJztcbiAgbWFuaWZlc3ROb3RWYWxpZExhYmVsID0gJ01hbmlmZXN0IGlzIG5vdCB2YWxpZCc7XG4gIHBhZ2VEb2VzTm90RXhpc3RzID0gJ1NvcnJ5LCB0aGF0IHBhZ2UgZG9lcyBub3QgZXhpc3QnO1xuICB0ZXh0Q29udGVudEVycm9yTGFiZWwgPSBgT2ggZGVhciwgaSBjYW4ndCBmaW5kIHRoZSB0ZXh0IGZvciB5b3VgO1xuXG4gIG5vUmVzdWx0c0ZvdW5kTGFiZWwgPSAocTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGBObyByZXN1bHRzIGZvdW5kIGZvciA8ZW0gY2xhc3M9XCJjdXJyZW50LXNlYXJjaFwiPiR7cX08L2VtPmA7XG4gIH07XG5cbiAgcmVzdWx0c0ZvdW5kTGFiZWwgPSAobnVtYmVyT2ZIaXRzOiBudW1iZXIsIHE6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBgJHtudW1iZXJPZkhpdHN9IHJlc3VsdHMgZm91bmQgZm9yIDxlbSBjbGFzcz1cImN1cnJlbnQtc2VhcmNoXCI+JHtxfTwvZW0+YDtcbiAgfTtcblxuICBjdXJyZW50SGl0TGFiZWwgPSAoY3VycmVudEhpdDogbnVtYmVyLCBudW1iZXJPZkhpdHM6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiBgJHtjdXJyZW50SGl0fSBvZiAke251bWJlck9mSGl0c30gaGl0c2A7XG4gIH07XG59XG4iXX0=