import { Component, ElementRef, HostListener, ViewChild, ViewChildren, } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../core/intl/viewer-intl';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
export class ContentSearchDialogComponent {
    constructor(dialogRef, intl, mediaObserver, mimeResizeService, iiifManifestService, iiifContentSearchService) {
        this.dialogRef = dialogRef;
        this.intl = intl;
        this.mediaObserver = mediaObserver;
        this.mimeResizeService = mimeResizeService;
        this.iiifManifestService = iiifManifestService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.q = '';
        this.hits = [];
        this.currentHit = null;
        this.currentSearch = null;
        this.numberOfHits = 0;
        this.isSearching = false;
        this.tabHeight = {};
        this.manifest = null;
        this.mimeHeight = 0;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe((dimensions) => {
            this.mimeHeight = dimensions.height;
            this.resizeTabHeight();
        }));
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
        }));
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((sr) => {
            this.hits = sr.hits;
            this.currentSearch = sr.q ? sr.q : '';
            this.q = sr.q;
            this.numberOfHits = sr.size();
            if (this.resultContainer !== null && this.numberOfHits > 0) {
                this.resultContainer.nativeElement.focus();
            }
            else if (this.q.length === 0 || this.numberOfHits === 0) {
                this.qEl.nativeElement.focus();
            }
        }));
        this.subscriptions.add(this.iiifContentSearchService.isSearching.subscribe((s) => {
            this.isSearching = s;
        }));
        this.subscriptions.add(this.iiifContentSearchService.onSelected.subscribe((hit) => {
            if (hit === null) {
                this.currentHit = hit;
            }
            else {
                if (!this.currentHit || this.currentHit.id !== hit.id) {
                    this.currentHit = hit;
                    this.scrollCurrentHitIntoView();
                }
            }
        }));
        this.resizeTabHeight();
    }
    ngAfterViewInit() {
        this.scrollCurrentHitIntoView();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    onResize(event) {
        this.resizeTabHeight();
    }
    onSubmit(event) {
        event.preventDefault();
        this.search();
    }
    clear() {
        this.q = '';
        this.search();
    }
    goToHit(hit) {
        this.currentHit = hit;
        this.iiifContentSearchService.selected(hit);
        if (this.mediaObserver.isActive('lt-md')) {
            this.dialogRef.close();
        }
    }
    search() {
        this.currentSearch = this.q;
        if (this.manifest) {
            this.iiifContentSearchService.search(this.manifest, this.q);
        }
    }
    resizeTabHeight() {
        let height = this.mimeHeight;
        if (this.mediaObserver.isActive('lt-md')) {
            this.tabHeight = {
                maxHeight: window.innerHeight - 128 + 'px',
            };
        }
        else {
            height -= 272;
            this.tabHeight = {
                maxHeight: height + 'px',
            };
        }
    }
    scrollCurrentHitIntoView() {
        this.iiifContentSearchService.onSelected
            .pipe(take(1))
            .subscribe((hit) => {
            if (hit !== null) {
                const selected = this.findSelected(hit);
                if (selected) {
                    selected.nativeElement.focus();
                }
            }
        });
    }
    findSelected(selectedHit) {
        if (this.hitList) {
            const selectedList = this.hitList.filter((item, index) => index === selectedHit.id);
            return selectedList.length > 0 ? selectedList[0] : null;
        }
        else {
            return null;
        }
    }
}
ContentSearchDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'mime-search',
                template: "<div class=\"content-search-container\">\n  <div [ngSwitch]=\"mediaObserver.isActive('lt-md')\">\n    <div *ngSwitchCase=\"true\">\n      <mat-toolbar color=\"primary\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n          <button\n            mat-icon-button\n            class=\"close-content-search-dialog-button\"\n            [aria-label]=\"intl.closeLabel\"\n            [matTooltip]=\"intl.closeLabel\"\n            [matDialogClose]=\"true\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n          <div mat-dialog-title class=\"heading\">{{ intl.searchLabel }}</div>\n        </div>\n      </mat-toolbar>\n    </div>\n    <div *ngSwitchDefault>\n      <mat-toolbar>\n        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex>\n          <div mat-dialog-title class=\"heading heading-desktop\">{{\n            intl.searchLabel\n          }}</div>\n          <button\n            mat-icon-button\n            class=\"close-content-search-dialog-button\"\n            [aria-label]=\"intl.closeLabel\"\n            [matTooltip]=\"intl.closeLabel\"\n            [matDialogClose]=\"true\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n        </div>\n      </mat-toolbar>\n    </div>\n  </div>\n  <mat-dialog-content>\n    <div class=\"content-search-form\">\n      <form (ngSubmit)=\"onSubmit($event)\" #searchForm=\"ngForm\">\n        <mat-form-field class=\"content-search-box\">\n          <button\n            type=\"submit\"\n            matPrefix\n            mat-icon-button\n            [attr.aria-label]=\"intl.searchLabel\"\n            [matTooltip]=\"intl.searchLabel\"\n          >\n            <mat-icon class=\"icon\">search</mat-icon>\n          </button>\n          <input\n            #query\n            cdkFocusInitial\n            matInput\n            class=\"content-search-input\"\n            [(ngModel)]=\"q\"\n            [attr.aria-label]=\"intl.searchLabel\"\n            name=\"q\"\n            autocomplete=\"off\"\n          />\n          <button\n            *ngIf=\"q\"\n            type=\"button\"\n            class=\"clearSearchButton\"\n            matSuffix\n            mat-icon-button\n            [attr.aria-label]=\"intl.clearSearchLabel\"\n            [matTooltip]=\"intl.clearSearchLabel\"\n            (click)=\"clear()\"\n          >\n            <mat-icon class=\"icon\">clear</mat-icon>\n          </button>\n        </mat-form-field>\n      </form>\n    </div>\n    <div\n      #contentSearchResult\n      class=\"content-search-result-container\"\n      [ngStyle]=\"tabHeight\"\n    >\n      <div *ngIf=\"!isSearching\" class=\"content-search-result\" fxLayout=\"column\">\n        <input type=\"hidden\" class=\"numberOfHits\" [value]=\"numberOfHits\" />\n        <div *ngIf=\"currentSearch && currentSearch.length > 0\">\n          <div\n            *ngIf=\"numberOfHits > 0\"\n            [innerHTML]=\"intl.resultsFoundLabel(numberOfHits, currentSearch)\"\n          ></div>\n          <div\n            *ngIf=\"numberOfHits === 0\"\n            [innerHTML]=\"intl.noResultsFoundLabel(currentSearch)\"\n          ></div>\n        </div>\n        <ng-container *ngFor=\"let hit of hits; let last = last\">\n          <button\n            #hitButton\n            mat-button\n            [color]=\"currentHit && hit.id === currentHit.id ? 'accent' : null\"\n            [ngClass]=\"'hit'\"\n            (click)=\"goToHit(hit)\"\n            (keyup.enter)=\"goToHit(hit)\"\n          >\n            <div fxLayout=\"row\" fxLayoutAlign=\"space-between start\">\n              <div fxFlex class=\"summary\">\n                {{ hit.before }} <em>{{ hit.match }}</em> {{ hit.after }}\n              </div>\n              <div fxFlex=\"40px\" class=\"canvasGroup\">{{ hit.index + 1 }}</div>\n            </div>\n          </button>\n          <mat-divider *ngIf=\"!last\"></mat-divider>\n        </ng-container>\n      </div>\n      <div *ngIf=\"isSearching\" class=\"content-search-result\" fxLayout=\"column\">\n        <mat-progress-bar mode=\"indeterminate\"></mat-progress-bar>\n      </div>\n    </div>\n  </mat-dialog-content>\n</div>\n",
                styles: [".heading{font-size:17px}.heading-desktop{padding-left:16px}.label{text-decoration:underline}.content-search-form{padding:0 16px}.content-search-box{width:100%}.content-search-input{font-size:20px}.content-search-result-container{font-family:Roboto,Helvetica Neue,sans-serif;overflow:auto;margin-bottom:8px}.content-search-result{padding:8px 16px}.content-search-result .mat-button{line-height:normal;white-space:normal;word-wrap:normal;max-width:none;padding:8px;text-align:left;font-size:14px}::ng-deep .content-search-container .current-content-search{font-weight:700}em{font-weight:700}.canvasGroupLabel{text-align:right;opacity:.54}::ng-deep .content-search-panel{max-width:none!important}::ng-deep .content-search-panel>.mat-dialog-container{padding:0!important;overflow:visible;overflow:initial}::ng-deep .content-search-container>div>div>.mat-toolbar{padding:0!important}input{font-family:Roboto,Helvetica Neue,sans-serif}.icon{font-size:22px!important}"]
            },] }
];
ContentSearchDialogComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: MimeViewerIntl },
    { type: MediaObserver },
    { type: MimeResizeService },
    { type: IiifManifestService },
    { type: IiifContentSearchService }
];
ContentSearchDialogComponent.propDecorators = {
    resultContainer: [{ type: ViewChild, args: ['contentSearchResult', { static: true },] }],
    qEl: [{ type: ViewChild, args: ['query', { static: true },] }],
    hitList: [{ type: ViewChildren, args: ['hitButton', { read: ElementRef },] }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBSVosU0FBUyxFQUNULFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFVLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG1FQUFtRSxDQUFDO0FBQzdHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQzVGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQVd0RixNQUFNLE9BQU8sNEJBQTRCO0lBa0J2QyxZQUNTLFNBQXFELEVBQ3JELElBQW9CLEVBQ3BCLGFBQTRCLEVBQzNCLGlCQUFvQyxFQUNwQyxtQkFBd0MsRUFDeEMsd0JBQWtEO1FBTG5ELGNBQVMsR0FBVCxTQUFTLENBQTRDO1FBQ3JELFNBQUksR0FBSixJQUFJLENBQWdCO1FBQ3BCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzNCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyw2QkFBd0Is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QUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2Qix3bUlBQXFEOzthQUV0RDs7O1lBakJRLFlBQVk7WUFLWixjQUFjO1lBTmQsYUFBYTtZQVFiLGlCQUFpQjtZQUhqQixtQkFBbUI7WUFEbkIsd0JBQXdCOzs7OEJBMkI5QixTQUFTLFNBQUMscUJBQXFCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2tCQUVqRCxTQUFTLFNBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtzQkFDbkMsWUFBWSxTQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7dUJBd0U5QyxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1lZGlhT2JzZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLy4uL2NvcmUvaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi8uLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLy4uL2NvcmUvaW50bC92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBNaW1lRG9tSGVscGVyIH0gZnJvbSAnLi8uLi9jb3JlL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQgeyBNaW1lUmVzaXplU2VydmljZSB9IGZyb20gJy4vLi4vY29yZS9taW1lLXJlc2l6ZS1zZXJ2aWNlL21pbWUtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4vLi4vY29yZS9tb2RlbHMvZGltZW5zaW9ucyc7XG5pbXBvcnQgeyBIaXQgfSBmcm9tICcuLy4uL2NvcmUvbW9kZWxzL2hpdCc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4vLi4vY29yZS9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi9jb3JlL21vZGVscy9zZWFyY2gtcmVzdWx0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS1zZWFyY2gnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29udGVudC1zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29udGVudC1zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIENvbnRlbnRTZWFyY2hEaWFsb2dDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIHB1YmxpYyBxID0gJyc7XG4gIHB1YmxpYyBoaXRzOiBIaXRbXSA9IFtdO1xuICBwdWJsaWMgY3VycmVudEhpdDogSGl0IHwgbnVsbCA9IG51bGw7XG4gIHB1YmxpYyBjdXJyZW50U2VhcmNoOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgcHVibGljIG51bWJlck9mSGl0cyA9IDA7XG4gIHB1YmxpYyBpc1NlYXJjaGluZyA9IGZhbHNlO1xuICBwdWJsaWMgdGFiSGVpZ2h0ID0ge307XG4gIHByaXZhdGUgbWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbWltZUhlaWdodCA9IDA7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgQFZpZXdDaGlsZCgnY29udGVudFNlYXJjaFJlc3VsdCcsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHJlc3VsdENvbnRhaW5lciE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3F1ZXJ5JywgeyBzdGF0aWM6IHRydWUgfSkgcUVsITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZHJlbignaGl0QnV0dG9uJywgeyByZWFkOiBFbGVtZW50UmVmIH0pXG4gIGhpdExpc3QhOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENvbnRlbnRTZWFyY2hEaWFsb2dDb21wb25lbnQ+LFxuICAgIHB1YmxpYyBpbnRsOiBNaW1lVmlld2VySW50bCxcbiAgICBwdWJsaWMgbWVkaWFPYnNlcnZlcjogTWVkaWFPYnNlcnZlcixcbiAgICBwcml2YXRlIG1pbWVSZXNpemVTZXJ2aWNlOiBNaW1lUmVzaXplU2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZNYW5pZmVzdFNlcnZpY2U6IElpaWZNYW5pZmVzdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmQ29udGVudFNlYXJjaFNlcnZpY2U6IElpaWZDb250ZW50U2VhcmNoU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMubWltZVJlc2l6ZVNlcnZpY2Uub25SZXNpemUuc3Vic2NyaWJlKChkaW1lbnNpb25zOiBEaW1lbnNpb25zKSA9PiB7XG4gICAgICAgIHRoaXMubWltZUhlaWdodCA9IGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICB0aGlzLnJlc2l6ZVRhYkhlaWdodCgpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5jdXJyZW50TWFuaWZlc3Quc3Vic2NyaWJlKFxuICAgICAgICAobWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCkgPT4ge1xuICAgICAgICAgIHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChzcjogU2VhcmNoUmVzdWx0KSA9PiB7XG4gICAgICAgIHRoaXMuaGl0cyA9IHNyLmhpdHM7XG4gICAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IHNyLnEgPyBzci5xIDogJyc7XG4gICAgICAgIHRoaXMucSA9IHNyLnE7XG4gICAgICAgIHRoaXMubnVtYmVyT2ZIaXRzID0gc3Iuc2l6ZSgpO1xuICAgICAgICBpZiAodGhpcy5yZXN1bHRDb250YWluZXIgIT09IG51bGwgJiYgdGhpcy5udW1iZXJPZkhpdHMgPiAwKSB7XG4gICAgICAgICAgdGhpcy5yZXN1bHRDb250YWluZXIubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucS5sZW5ndGggPT09IDAgfHwgdGhpcy5udW1iZXJPZkhpdHMgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnFFbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5pc1NlYXJjaGluZy5zdWJzY3JpYmUoKHM6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgdGhpcy5pc1NlYXJjaGluZyA9IHM7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25TZWxlY3RlZC5zdWJzY3JpYmUoKGhpdDogSGl0IHwgbnVsbCkgPT4ge1xuICAgICAgICBpZiAoaGl0ID09PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50SGl0ID0gaGl0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghdGhpcy5jdXJyZW50SGl0IHx8IHRoaXMuY3VycmVudEhpdC5pZCAhPT0gaGl0LmlkKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRIaXQgPSBoaXQ7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEN1cnJlbnRIaXRJbnRvVmlldygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5yZXNpemVUYWJIZWlnaHQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnNjcm9sbEN1cnJlbnRIaXRJbnRvVmlldygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMucmVzaXplVGFiSGVpZ2h0KCk7XG4gIH1cblxuICBvblN1Ym1pdChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZWFyY2goKTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMucSA9ICcnO1xuICAgIHRoaXMuc2VhcmNoKCk7XG4gIH1cblxuICBnb1RvSGl0KGhpdDogSGl0KTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50SGl0ID0gaGl0O1xuICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLnNlbGVjdGVkKGhpdCk7XG4gICAgaWYgKHRoaXMubWVkaWFPYnNlcnZlci5pc0FjdGl2ZSgnbHQtbWQnKSkge1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlYXJjaCgpIHtcbiAgICB0aGlzLmN1cnJlbnRTZWFyY2ggPSB0aGlzLnE7XG4gICAgaWYgKHRoaXMubWFuaWZlc3QpIHtcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLnNlYXJjaCh0aGlzLm1hbmlmZXN0LCB0aGlzLnEpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzaXplVGFiSGVpZ2h0KCk6IHZvaWQge1xuICAgIGxldCBoZWlnaHQgPSB0aGlzLm1pbWVIZWlnaHQ7XG5cbiAgICBpZiAodGhpcy5tZWRpYU9ic2VydmVyLmlzQWN0aXZlKCdsdC1tZCcpKSB7XG4gICAgICB0aGlzLnRhYkhlaWdodCA9IHtcbiAgICAgICAgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAxMjggKyAncHgnLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVpZ2h0IC09IDI3MjtcbiAgICAgIHRoaXMudGFiSGVpZ2h0ID0ge1xuICAgICAgICBtYXhIZWlnaHQ6IGhlaWdodCArICdweCcsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsQ3VycmVudEhpdEludG9WaWV3KCkge1xuICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uU2VsZWN0ZWRcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKChoaXQ6IEhpdCB8IG51bGwpID0+IHtcbiAgICAgICAgaWYgKGhpdCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5maW5kU2VsZWN0ZWQoaGl0KTtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kU2VsZWN0ZWQoc2VsZWN0ZWRIaXQ6IEhpdCk6IEVsZW1lbnRSZWYgfCBudWxsIHtcbiAgICBpZiAodGhpcy5oaXRMaXN0KSB7XG4gICAgICBjb25zdCBzZWxlY3RlZExpc3QgPSB0aGlzLmhpdExpc3QuZmlsdGVyKFxuICAgICAgICAoaXRlbTogRWxlbWVudFJlZiwgaW5kZXg6IG51bWJlcikgPT4gaW5kZXggPT09IHNlbGVjdGVkSGl0LmlkXG4gICAgICApO1xuICAgICAgcmV0dXJuIHNlbGVjdGVkTGlzdC5sZW5ndGggPiAwID8gc2VsZWN0ZWRMaXN0WzBdIDogbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=