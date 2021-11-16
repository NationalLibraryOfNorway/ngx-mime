import { ChangeDetectorRef, Component, Input, } from '@angular/core';
import { Subscription } from 'rxjs';
import { CanvasGroupDialogService } from '../../../canvas-group-dialog/canvas-group-dialog.service';
import { IiifManifestService } from '../../../core/iiif-manifest-service/iiif-manifest-service';
import { AccessKeys } from '../../../core/models/AccessKeys';
import { ViewingDirection } from '../../../core/models/viewing-direction';
import { CanvasService } from './../../../core/canvas-service/canvas-service';
import { MimeViewerIntl } from './../../../core/intl/viewer-intl';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
export class CanvasGroupNavigatorComponent {
    constructor(intl, changeDetectorRef, viewerService, canvasService, pageDialogService, iiifManifestService) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.viewerService = viewerService;
        this.canvasService = canvasService;
        this.pageDialogService = pageDialogService;
        this.iiifManifestService = iiifManifestService;
        this.numberOfCanvases = 0;
        this.canvasGroupLabel = '';
        this.numberOfCanvasGroups = 0;
        this.currentCanvasGroupIndex = -1;
        this.isFirstCanvasGroup = false;
        this.isLastCanvasGroup = false;
        this.invert = false;
        this.currentSliderCanvasGroupIndex = -1;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            if (manifest) {
                this.invert = manifest.viewingDirection === ViewingDirection.LTR;
                this.changeDetectorRef.detectChanges();
            }
        }));
        this.subscriptions.add(this.canvasService.onCanvasGroupIndexChange.subscribe((currentCanvasGroupIndex) => {
            if (this.currentSliderCanvasGroupIndex !== -1 &&
                this.currentSliderCanvasGroupIndex === currentCanvasGroupIndex) {
                this.currentSliderCanvasGroupIndex = -1;
            }
            else if (this.currentSliderCanvasGroupIndex === -1) {
                this.currentCanvasGroupIndex = currentCanvasGroupIndex;
                this.canvasGroupLabel = this.canvasService.getCanvasGroupLabel(this.currentCanvasGroupIndex);
            }
            this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(currentCanvasGroupIndex);
            this.isLastCanvasGroup = this.isOnLastCanvasGroup(currentCanvasGroupIndex);
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.canvasService.onNumberOfCanvasGroupsChange.subscribe((numberOfCanvasGroups) => {
            this.numberOfCanvasGroups = numberOfCanvasGroups;
            this.numberOfCanvases = this.canvasService.numberOfCanvases;
            if (this.currentCanvasGroupIndex !== null) {
                this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(this.currentCanvasGroupIndex);
                this.isLastCanvasGroup = this.isOnLastCanvasGroup(this.currentCanvasGroupIndex);
            }
            this.changeDetectorRef.detectChanges();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    goToPreviousCanvasGroup() {
        this.viewerService.goToPreviousCanvasGroup();
    }
    goToNextCanvasGroup() {
        this.viewerService.goToNextCanvasGroup();
    }
    onSliderChange(change) {
        this.currentSliderCanvasGroupIndex = change.value;
        this.currentCanvasGroupIndex = change.value;
        if (this.currentCanvasGroupIndex !== null) {
            this.canvasGroupLabel = this.canvasService.getCanvasGroupLabel(this.currentCanvasGroupIndex);
            this.viewerService.goToCanvasGroup(this.currentCanvasGroupIndex, false);
        }
        this.changeDetectorRef.detectChanges();
    }
    onSliderHotKey(event) {
        const accessKeys = new AccessKeys(event);
        if (accessKeys.isSliderKeys()) {
            event.stopPropagation();
        }
    }
    openCanvasGroupDialog() {
        this.pageDialogService.toggle();
    }
    isOnFirstCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === 0;
    }
    isOnLastCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === this.numberOfCanvasGroups - 1;
    }
}
CanvasGroupNavigatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'mime-page-navigator',
                template: "<mat-toolbar>\n  <div fxLayout=\"row\" fxFlex fxLayoutAlign=\"start center\">\n    <div fxFlex>\n      <mat-slider\n        class=\"navigation-slider\"\n        [invert]=\"!invert\"\n        [max]=\"numberOfCanvasGroups - 1\"\n        [value]=\"currentCanvasGroupIndex\"\n        [attr.aria-label]=\"intl.currentPageLabel\"\n        (input)=\"onSliderChange($event)\"\n        (keyup)=\"onSliderHotKey($event)\"\n        fxFlex\n      ></mat-slider>\n    </div>\n    <button mat-button class=\"canvasGroups\" (click)=\"openCanvasGroupDialog()\">\n      <div fxLayout=\"row\" fxLayoutGap=\"1px\">\n        <span id=\"currentCanvasGroupLabel\">{{ canvasGroupLabel }}</span\n        ><span>/</span\n        ><span id=\"numOfCanvasGroups\">{{ numberOfCanvases }}</span>\n      </div>\n    </button>\n    <div class=\"navigation-buttons\">\n      <ng-container *ngIf=\"invert\">\n        <button\n          id=\"footerNavigateBeforeButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.previousPageLabel\"\n          [matTooltip]=\"intl.previousPageLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isFirstCanvasGroup\"\n          (click)=\"goToPreviousCanvasGroup()\"\n        >\n          <mat-icon>navigate_before</mat-icon>\n        </button>\n        <button\n          id=\"footerNavigateNextButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.nextPageLabel\"\n          [matTooltip]=\"intl.nextPageLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isLastCanvasGroup\"\n          (click)=\"goToNextCanvasGroup()\"\n        >\n          <mat-icon>navigate_next</mat-icon>\n        </button>\n      </ng-container>\n      <ng-container *ngIf=\"!invert\">\n        <button\n          id=\"footerNavigateNextButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.nextPageLabel\"\n          [matTooltip]=\"intl.nextPageLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isLastCanvasGroup\"\n          (click)=\"goToNextCanvasGroup()\"\n        >\n          <mat-icon>navigate_before</mat-icon>\n        </button>\n        <button\n          id=\"footerNavigateBeforeButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.previousPageLabel\"\n          [matTooltip]=\"intl.previousPageLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isFirstCanvasGroup\"\n          (click)=\"goToPreviousCanvasGroup()\"\n        >\n          <mat-icon>navigate_next</mat-icon>\n        </button>\n      </ng-container>\n    </div>\n  </div>\n</mat-toolbar>\n",
                styles: [".canvasGroups{font-size:13px;text-align:center;cursor:pointer}.navigation-slider{width:100%}\n"]
            },] }
];
CanvasGroupNavigatorComponent.ctorParameters = () => [
    { type: MimeViewerIntl },
    { type: ChangeDetectorRef },
    { type: ViewerService },
    { type: CanvasService },
    { type: CanvasGroupDialogService },
    { type: IiifManifestService }
];
CanvasGroupNavigatorComponent.propDecorators = {
    searchResult: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLWdyb3VwLW5hdmlnYXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1mb290ZXIvY2FudmFzLWdyb3VwLW5hdmlnYXRvci9jYW52YXMtZ3JvdXAtbmF2aWdhdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxLQUFLLEdBR04sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUNoRyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFN0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFPOUUsTUFBTSxPQUFPLDZCQUE2QjtJQVl4QyxZQUNTLElBQW9CLEVBQ25CLGlCQUFvQyxFQUNwQyxhQUE0QixFQUM1QixhQUE0QixFQUM1QixpQkFBMkMsRUFDM0MsbUJBQXdDO1FBTHpDLFNBQUksR0FBSixJQUFJLENBQWdCO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUEwQjtR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RkFBc0Q7O2FBRXZEOzs7WUFSUSxjQUFjO1lBZHJCLGlCQUFpQjtZQWdCVixhQUFhO1lBSGIsYUFBYTtZQUxiLHdCQUF3QjtZQUN4QixtQkFBbUI7OzsyQkFlekIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTbGlkZXJDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDYW52YXNHcm91cERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jYW52YXMtZ3JvdXAtZGlhbG9nL2NhbnZhcy1ncm91cC1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IEFjY2Vzc0tleXMgfSBmcm9tICcuLi8uLi8uLi9jb3JlL21vZGVscy9BY2Nlc3NLZXlzJztcbmltcG9ydCB7IE1hbmlmZXN0IH0gZnJvbSAnLi4vLi4vLi4vY29yZS9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgVmlld2luZ0RpcmVjdGlvbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbW9kZWxzL3ZpZXdpbmctZGlyZWN0aW9uJztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLy4uLy4uLy4uL2NvcmUvY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLy4uLy4uLy4uL2NvcmUvaW50bC92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLy4uLy4uLy4uL2NvcmUvbW9kZWxzL3NlYXJjaC1yZXN1bHQnO1xuaW1wb3J0IHsgVmlld2VyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vLi4vY29yZS92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21pbWUtcGFnZS1uYXZpZ2F0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FudmFzLWdyb3VwLW5hdmlnYXRvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhbnZhcy1ncm91cC1uYXZpZ2F0b3IuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FudmFzR3JvdXBOYXZpZ2F0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHB1YmxpYyBzZWFyY2hSZXN1bHQhOiBTZWFyY2hSZXN1bHQ7XG4gIHB1YmxpYyBudW1iZXJPZkNhbnZhc2VzID0gMDtcbiAgcHVibGljIGNhbnZhc0dyb3VwTGFiZWwgPSAnJztcbiAgcHVibGljIG51bWJlck9mQ2FudmFzR3JvdXBzID0gMDtcbiAgcHVibGljIGN1cnJlbnRDYW52YXNHcm91cEluZGV4OiBudW1iZXIgfCBudWxsID0gLTE7XG4gIHB1YmxpYyBpc0ZpcnN0Q2FudmFzR3JvdXAgPSBmYWxzZTtcbiAgcHVibGljIGlzTGFzdENhbnZhc0dyb3VwID0gZmFsc2U7XG4gIGludmVydCA9IGZhbHNlO1xuICBwcml2YXRlIGN1cnJlbnRTbGlkZXJDYW52YXNHcm91cEluZGV4OiBudW1iZXIgfCBudWxsID0gLTE7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSB2aWV3ZXJTZXJ2aWNlOiBWaWV3ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwcml2YXRlIHBhZ2VEaWFsb2dTZXJ2aWNlOiBDYW52YXNHcm91cERpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmTWFuaWZlc3RTZXJ2aWNlOiBJaWlmTWFuaWZlc3RTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG1hbmlmZXN0KSB7XG4gICAgICAgICAgICB0aGlzLmludmVydCA9IG1hbmlmZXN0LnZpZXdpbmdEaXJlY3Rpb24gPT09IFZpZXdpbmdEaXJlY3Rpb24uTFRSO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2Uub25DYW52YXNHcm91cEluZGV4Q2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKGN1cnJlbnRDYW52YXNHcm91cEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTbGlkZXJDYW52YXNHcm91cEluZGV4ICE9PSAtMSAmJlxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2xpZGVyQ2FudmFzR3JvdXBJbmRleCA9PT0gY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNsaWRlckNhbnZhc0dyb3VwSW5kZXggPSAtMTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFNsaWRlckNhbnZhc0dyb3VwSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4ID0gY3VycmVudENhbnZhc0dyb3VwSW5kZXg7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0dyb3VwTGFiZWwgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzR3JvdXBMYWJlbChcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5pc0ZpcnN0Q2FudmFzR3JvdXAgPSB0aGlzLmlzT25GaXJzdENhbnZhc0dyb3VwKFxuICAgICAgICAgICAgY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuaXNMYXN0Q2FudmFzR3JvdXAgPSB0aGlzLmlzT25MYXN0Q2FudmFzR3JvdXAoXG4gICAgICAgICAgICBjdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5vbk51bWJlck9mQ2FudmFzR3JvdXBzQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKG51bWJlck9mQ2FudmFzR3JvdXBzOiBudW1iZXIpID0+IHtcbiAgICAgICAgICB0aGlzLm51bWJlck9mQ2FudmFzR3JvdXBzID0gbnVtYmVyT2ZDYW52YXNHcm91cHM7XG4gICAgICAgICAgdGhpcy5udW1iZXJPZkNhbnZhc2VzID0gdGhpcy5jYW52YXNTZXJ2aWNlLm51bWJlck9mQ2FudmFzZXM7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNGaXJzdENhbnZhc0dyb3VwID0gdGhpcy5pc09uRmlyc3RDYW52YXNHcm91cChcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuaXNMYXN0Q2FudmFzR3JvdXAgPSB0aGlzLmlzT25MYXN0Q2FudmFzR3JvdXAoXG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCk7XG4gIH1cblxuICBnb1RvTmV4dENhbnZhc0dyb3VwKCk6IHZvaWQge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvTmV4dENhbnZhc0dyb3VwKCk7XG4gIH1cblxuICBvblNsaWRlckNoYW5nZShjaGFuZ2U6IE1hdFNsaWRlckNoYW5nZSk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudFNsaWRlckNhbnZhc0dyb3VwSW5kZXggPSBjaGFuZ2UudmFsdWU7XG4gICAgdGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCA9IGNoYW5nZS52YWx1ZTtcbiAgICBpZiAodGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5jYW52YXNHcm91cExhYmVsID0gdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc0dyb3VwTGFiZWwoXG4gICAgICAgIHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICk7XG4gICAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0NhbnZhc0dyb3VwKHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXgsIGZhbHNlKTtcbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBvblNsaWRlckhvdEtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGFjY2Vzc0tleXMgPSBuZXcgQWNjZXNzS2V5cyhldmVudCk7XG4gICAgaWYgKGFjY2Vzc0tleXMuaXNTbGlkZXJLZXlzKCkpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5DYW52YXNHcm91cERpYWxvZygpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2VEaWFsb2dTZXJ2aWNlLnRvZ2dsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc09uRmlyc3RDYW52YXNHcm91cChjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGN1cnJlbnRDYW52YXNHcm91cEluZGV4ID09PSAwO1xuICB9XG5cbiAgcHJpdmF0ZSBpc09uTGFzdENhbnZhc0dyb3VwKGN1cnJlbnRDYW52YXNHcm91cEluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gY3VycmVudENhbnZhc0dyb3VwSW5kZXggPT09IHRoaXMubnVtYmVyT2ZDYW52YXNHcm91cHMgLSAxO1xuICB9XG59XG4iXX0=