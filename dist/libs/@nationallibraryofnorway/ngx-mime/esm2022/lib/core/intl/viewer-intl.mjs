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
        this.openOsdControlPanelLabel = 'Open control panel';
        this.closeOsdControlPanelLabel = 'Close control panel';
        this.zoomInLabel = 'Zoom in';
        this.zoomOutLabel = 'Zoom out';
        this.resetZoomLabel = 'Reset zoom';
        this.previousPageLabel = 'Previous Page';
        this.nextPageLabel = 'Next Page';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: MimeViewerIntl, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: MimeViewerIntl }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: MimeViewerIntl, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWludGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9pbnRsL3ZpZXdlci1pbnRsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUd2QyxNQUFNLE9BQU8sY0FBYztJQUQzQjtRQUVFLFlBQU8sR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUU3QyxTQUFJLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNoQyxlQUFVLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLHFCQUFnQixHQUFHLGFBQWEsQ0FBQztRQUNqQyw2QkFBd0IsR0FBRywwQkFBMEIsQ0FBQztRQUN0RCx1QkFBa0IsR0FBRyxtQkFBbUIsQ0FBQztRQUN6QyxxQkFBZ0IsR0FBRyxhQUFhLENBQUM7UUFDakMsb0JBQWUsR0FBRyxNQUFNLENBQUM7UUFDekIsb0JBQWUsR0FBRyxhQUFhLENBQUM7UUFDaEMsd0JBQW1CLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLHFCQUFnQixHQUFHLFdBQVcsQ0FBQztRQUMvQixxQkFBZ0IsR0FBRyxjQUFjLENBQUM7UUFDbEMsb0NBQStCLEdBQUcsTUFBTSxDQUFDO1FBQ3pDLDBDQUFxQyxHQUFHLE9BQU8sQ0FBQztRQUNoRCxtQ0FBOEIsR0FBRyxtQkFBbUIsQ0FBQztRQUNyRCxrQkFBYSxHQUFHLFVBQVUsQ0FBQztRQUMzQixpQkFBWSxHQUFHLFNBQVMsQ0FBQztRQUN6QixhQUFRLEdBQUcsbUJBQW1CLENBQUM7UUFDL0Isb0JBQWUsR0FBRyxhQUFhLENBQUM7UUFDaEMsd0JBQW1CLEdBQUcsa0JBQWtCLENBQUM7UUFDekMsNkJBQXdCLEdBQUcsb0JBQW9CLENBQUM7UUFDaEQsOEJBQXlCLEdBQUcscUJBQXFCLENBQUM7UUFDbEQsZ0JBQVcsR0FBRyxTQUFTLENBQUM7UUFDeEIsaUJBQVksR0FBRyxVQUFVLENBQUM7UUFDMUIsbUJBQWMsR0FBRyxZQUFZLENBQUM7UUFDOUIsc0JBQWlCLEdBQUcsZUFBZSxDQUFDO1FBQ3BDLGtCQUFhLEdBQUcsV0FBVyxDQUFDO1FBQzVCLGtCQUFhLEdBQUcsWUFBWSxDQUFDO1FBQzdCLGdCQUFXLEdBQUcsUUFBUSxDQUFDO1FBQ3ZCLHFCQUFnQixHQUFHLE9BQU8sQ0FBQztRQUMzQixxQkFBZ0IsR0FBRyxjQUFjLENBQUM7UUFDbEMsaUJBQVksR0FBRyxVQUFVLENBQUM7UUFDMUIsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFDN0IscUJBQWdCLEdBQUcsY0FBYyxDQUFDO1FBQ2xDLG9CQUFlLEdBQUcsbUJBQW1CLENBQUM7UUFDdEMsaUJBQVksR0FBRyxzQ0FBc0MsQ0FBQztRQUN0RCxZQUFPLEdBQUcsYUFBYSxDQUFDO1FBQ3hCLDJCQUFzQixHQUFHLDBDQUEwQyxDQUFDO1FBRXBFLFNBQVM7UUFDVCwrQkFBMEIsR0FBRywrQ0FBK0MsQ0FBQztRQUM3RSw0QkFBdUIsR0FBRyx3QkFBd0IsQ0FBQztRQUNuRCwwQkFBcUIsR0FBRyx1QkFBdUIsQ0FBQztRQUNoRCxzQkFBaUIsR0FBRyxpQ0FBaUMsQ0FBQztRQUN0RCwwQkFBcUIsR0FBRyx3Q0FBd0MsQ0FBQztRQUVqRSx3QkFBbUIsR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFO1lBQ2xDLE9BQU8sbURBQW1ELENBQUMsT0FBTyxDQUFDO1FBQ3JFLENBQUMsQ0FBQztRQUVGLHNCQUFpQixHQUFHLENBQUMsWUFBb0IsRUFBRSxDQUFTLEVBQUUsRUFBRTtZQUN0RCxPQUFPLEdBQUcsWUFBWSxpREFBaUQsQ0FBQyxPQUFPLENBQUM7UUFDbEYsQ0FBQyxDQUFDO1FBRUYsb0JBQWUsR0FBRyxDQUFDLFVBQWtCLEVBQUUsWUFBb0IsRUFBRSxFQUFFO1lBQzdELE9BQU8sR0FBRyxVQUFVLE9BQU8sWUFBWSxPQUFPLENBQUM7UUFDakQsQ0FBQyxDQUFDO0tBQ0g7OEdBM0RZLGNBQWM7a0hBQWQsY0FBYzs7MkZBQWQsY0FBYztrQkFEMUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEhlbHBJbnRsIH0gZnJvbSAnLi9oZWxwLWludGwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWltZVZpZXdlckludGwge1xuICBjaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBoZWxwOiBIZWxwSW50bCA9IG5ldyBIZWxwSW50bCgpO1xuICBjbG9zZUxhYmVsID0gJ0Nsb3NlJztcbiAgYXR0cmlidXRpb25MYWJlbCA9ICdBdHRyaWJ1dGlvbic7XG4gIGF0dHJpYnV0b25DbG9zZUFyaWFMYWJlbCA9ICdDbG9zZSBhdHRyaWJ1dGlvbiBkaWFsb2cnO1xuICBoZWxwQ2xvc2VBcmlhTGFiZWwgPSAnQ2xvc2UgaGVscCBkaWFsb2cnO1xuICBpbmZvcm1hdGlvbkxhYmVsID0gJ0luZm9ybWF0aW9uJztcbiAgbGF5b3V0TWVudUxhYmVsID0gJ1ZpZXcnO1xuICBwYWdlTGF5b3V0TGFiZWwgPSAnUGFnZSBsYXlvdXQnO1xuICBzaW5nbGVQYWdlVmlld0xhYmVsID0gJ1NpbmdsZSBwYWdlcyc7XG4gIHR3b1BhZ2VWaWV3TGFiZWwgPSAnVHdvIHBhZ2VzJztcbiAgZGlnaXRhbFRleHRMYWJlbCA9ICdEaWdpdGFsIHRleHQnO1xuICByZWNvZ25pemVkVGV4dENvbnRlbnRDbG9zZUxhYmVsID0gJ05vbmUnO1xuICByZWNvZ25pemVkVGV4dENvbnRlbnRJblNwbGl0Vmlld0xhYmVsID0gJ1NwbGl0JztcbiAgc2hvd1JlY29nbml6ZWRUZXh0Q29udGVudExhYmVsID0gJ0RpZ2l0YWwgdGV4dCBvbmx5JztcbiAgbWV0YWRhdGFMYWJlbCA9ICdNZXRhZGF0YSc7XG4gIGxpY2Vuc2VMYWJlbCA9ICdMaWNlbnNlJztcbiAgdG9jTGFiZWwgPSAnVGFibGUgb2YgQ29udGVudHMnO1xuICBmdWxsU2NyZWVuTGFiZWwgPSAnRnVsbCBzY3JlZW4nO1xuICBleGl0RnVsbFNjcmVlbkxhYmVsID0gJ0V4aXQgZnVsbCBzY3JlZW4nO1xuICBvcGVuT3NkQ29udHJvbFBhbmVsTGFiZWwgPSAnT3BlbiBjb250cm9sIHBhbmVsJztcbiAgY2xvc2VPc2RDb250cm9sUGFuZWxMYWJlbCA9ICdDbG9zZSBjb250cm9sIHBhbmVsJztcbiAgem9vbUluTGFiZWwgPSAnWm9vbSBpbic7XG4gIHpvb21PdXRMYWJlbCA9ICdab29tIG91dCc7XG4gIHJlc2V0Wm9vbUxhYmVsID0gJ1Jlc2V0IHpvb20nO1xuICBwcmV2aW91c1BhZ2VMYWJlbCA9ICdQcmV2aW91cyBQYWdlJztcbiAgbmV4dFBhZ2VMYWJlbCA9ICdOZXh0IFBhZ2UnO1xuICByb3RhdGVDd0xhYmVsID0gJ1JvdGF0ZSA5MMKwJztcbiAgc2VhcmNoTGFiZWwgPSAnU2VhcmNoJztcbiAgY2xlYXJTZWFyY2hMYWJlbCA9ICdDbGVhcic7XG4gIHByZXZpb3VzSGl0TGFiZWwgPSAnUHJldmlvdXMgSGl0JztcbiAgbmV4dEhpdExhYmVsID0gJ05leHQgSGl0JztcbiAgZ29Ub1BhZ2VMYWJlbCA9ICdHbyB0byBwYWdlJztcbiAgY3VycmVudFBhZ2VMYWJlbCA9ICdDdXJyZW50IHBhZ2UnO1xuICBlbnRlclBhZ2VOdW1iZXIgPSAnRW50ZXIgcGFnZSBudW1iZXInO1xuICBkcm9wRGlzYWJsZWQgPSAnU29ycnksIGJ1dCBkcmFnIGFuZCBkcm9wIGlzIGRpc2FibGVkJztcbiAgbG9hZGluZyA9ICdMb2FkaW5nIC4uLic7XG4gIHJvdGF0aW9uSXNOb3RTdXBwb3J0ZWQgPSAnUm90YXRpb24gaXMgbm90IHN1cHBvcnRlZCBieSB5b3VyIGRldmljZSc7XG5cbiAgLy8gRVJST1JTXG4gIHNvbWV0aGluZ0hhc0dvbmVXcm9uZ0xhYmVsID0gJ09oIGRlYXIsIHNvbWV0aGluZyBoYXMgZ29uZSB0ZXJyaWJseSB3cm9uZy4uLic7XG4gIG1hbmlmZXN0VXJpTWlzc2luZ0xhYmVsID0gJ01hbmlmZXN0VXJpIGlzIG1pc3NpbmcnO1xuICBtYW5pZmVzdE5vdFZhbGlkTGFiZWwgPSAnTWFuaWZlc3QgaXMgbm90IHZhbGlkJztcbiAgcGFnZURvZXNOb3RFeGlzdHMgPSAnU29ycnksIHRoYXQgcGFnZSBkb2VzIG5vdCBleGlzdCc7XG4gIHRleHRDb250ZW50RXJyb3JMYWJlbCA9IGBPaCBkZWFyLCBpIGNhbid0IGZpbmQgdGhlIHRleHQgZm9yIHlvdWA7XG5cbiAgbm9SZXN1bHRzRm91bmRMYWJlbCA9IChxOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gYE5vIHJlc3VsdHMgZm91bmQgZm9yIDxlbSBjbGFzcz1cImN1cnJlbnQtc2VhcmNoXCI+JHtxfTwvZW0+YDtcbiAgfTtcblxuICByZXN1bHRzRm91bmRMYWJlbCA9IChudW1iZXJPZkhpdHM6IG51bWJlciwgcTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGAke251bWJlck9mSGl0c30gcmVzdWx0cyBmb3VuZCBmb3IgPGVtIGNsYXNzPVwiY3VycmVudC1zZWFyY2hcIj4ke3F9PC9lbT5gO1xuICB9O1xuXG4gIGN1cnJlbnRIaXRMYWJlbCA9IChjdXJyZW50SGl0OiBudW1iZXIsIG51bWJlck9mSGl0czogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIGAke2N1cnJlbnRIaXR9IG9mICR7bnVtYmVyT2ZIaXRzfSBoaXRzYDtcbiAgfTtcbn1cbiJdfQ==