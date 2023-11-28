import { ChangeDetectorRef, Component, Input, } from '@angular/core';
import { Subscription } from 'rxjs';
import { CanvasGroupDialogService } from '../../../canvas-group-dialog/canvas-group-dialog.service';
import { IiifManifestService } from '../../../core/iiif-manifest-service/iiif-manifest-service';
import { AccessKeys } from '../../../core/models/AccessKeys';
import { ViewingDirection } from '../../../core/models/viewing-direction';
import { CanvasService } from './../../../core/canvas-service/canvas-service';
import { MimeViewerIntl } from './../../../core/intl';
import { SearchResult } from './../../../core/models/search-result';
import { ViewerService } from './../../../core/viewer-service/viewer.service';
import * as i0 from "@angular/core";
import * as i1 from "./../../../core/intl";
import * as i2 from "./../../../core/viewer-service/viewer.service";
import * as i3 from "./../../../core/canvas-service/canvas-service";
import * as i4 from "../../../canvas-group-dialog/canvas-group-dialog.service";
import * as i5 from "../../../core/iiif-manifest-service/iiif-manifest-service";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
import * as i8 from "@angular/material/toolbar";
import * as i9 from "@angular/cdk/bidi";
import * as i10 from "@angular/material/button";
import * as i11 from "@angular/material/icon";
import * as i12 from "@angular/material/tooltip";
import * as i13 from "@angular/material/slider";
export class CanvasGroupNavigatorComponent {
    constructor(intl, changeDetectorRef, viewerService, canvasService, canvasGroupDialogService, iiifManifestService) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.viewerService = viewerService;
        this.canvasService = canvasService;
        this.canvasGroupDialogService = canvasGroupDialogService;
        this.iiifManifestService = iiifManifestService;
        this.numberOfCanvases = 0;
        this.canvasGroupLabel = '';
        this.numberOfCanvasGroups = 0;
        this.currentCanvasGroupIndex = -1;
        this.isFirstCanvasGroup = false;
        this.isLastCanvasGroup = false;
        this.ViewingDirection = ViewingDirection;
        this.currentViewingDirection = ViewingDirection.LTR;
        this.currentSliderCanvasGroupIndex = -1;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            if (manifest) {
                this.currentViewingDirection =
                    manifest.viewingDirection === ViewingDirection.LTR
                        ? ViewingDirection.LTR
                        : ViewingDirection.RTL;
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
    onSliderChange(event) {
        const value = parseInt(event.target.value);
        this.currentSliderCanvasGroupIndex = value;
        this.currentCanvasGroupIndex = value;
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
        this.canvasGroupDialogService.toggle();
    }
    isOnFirstCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === 0;
    }
    isOnLastCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === this.numberOfCanvasGroups - 1;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: CanvasGroupNavigatorComponent, deps: [{ token: i1.MimeViewerIntl }, { token: i0.ChangeDetectorRef }, { token: i2.ViewerService }, { token: i3.CanvasService }, { token: i4.CanvasGroupDialogService }, { token: i5.IiifManifestService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: CanvasGroupNavigatorComponent, selector: "mime-page-navigator", inputs: { searchResult: "searchResult" }, ngImport: i0, template: "<mat-toolbar>\n  <div\n    class=\"w-full\"\n    data-testid=\"navigation-slider-container\"\n    [dir]=\"currentViewingDirection\"\n  >\n    <mat-slider\n      class=\"navigation-slider\"\n      [max]=\"numberOfCanvasGroups - 1\"\n      (keydown)=\"onSliderHotKey($event)\"\n    >\n      <input\n        matSliderThumb\n        [attr.aria-label]=\"intl.currentPageLabel\"\n        [(ngModel)]=\"currentCanvasGroupIndex\"\n        (input)=\"onSliderChange($event)\"\n    /></mat-slider>\n  </div>\n  <button\n    mat-button\n    data-testid=\"canvasGroupDialogButton\"\n    class=\"canvasGroups\"\n    (click)=\"openCanvasGroupDialog()\"\n  >\n    <span data-testid=\"currentCanvasGroupLabel\">{{ canvasGroupLabel }}</span\n    ><span>/</span\n    ><span data-testid=\"numOfCanvasGroups\">{{ numberOfCanvases }}</span>\n  </button>\n  <div class=\"navigation-buttons\">\n    <ng-container *ngIf=\"currentViewingDirection === ViewingDirection.LTR\">\n      <button\n        data-testid=\"footerNavigateBeforeButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.previousPageLabel\"\n        [matTooltip]=\"intl.previousPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isFirstCanvasGroup\"\n        (click)=\"goToPreviousCanvasGroup()\"\n      >\n        <mat-icon>navigate_before</mat-icon>\n      </button>\n      <button\n        data-testid=\"footerNavigateNextButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.nextPageLabel\"\n        [matTooltip]=\"intl.nextPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isLastCanvasGroup\"\n        (click)=\"goToNextCanvasGroup()\"\n      >\n        <mat-icon>navigate_next</mat-icon>\n      </button>\n    </ng-container>\n    <ng-container *ngIf=\"currentViewingDirection === ViewingDirection.RTL\">\n      <button\n        data-testid=\"footerNavigateNextButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.nextPageLabel\"\n        [matTooltip]=\"intl.nextPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isLastCanvasGroup\"\n        (click)=\"goToNextCanvasGroup()\"\n      >\n        <mat-icon>navigate_before</mat-icon>\n      </button>\n      <button\n        data-testid=\"footerNavigateBeforeButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.previousPageLabel\"\n        [matTooltip]=\"intl.previousPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isFirstCanvasGroup\"\n        (click)=\"goToPreviousCanvasGroup()\"\n      >\n        <mat-icon>navigate_next</mat-icon>\n      </button>\n    </ng-container>\n  </div>\n</mat-toolbar>\n", styles: [".canvasGroups{font-size:13px;text-align:center;cursor:pointer}.navigation-slider{width:100%;width:-webkit-fill-available}\n"], dependencies: [{ kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i8.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { kind: "directive", type: i9.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { kind: "component", type: i10.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i10.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i11.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i12.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "component", type: i13.MatSlider, selector: "mat-slider", inputs: ["color", "disableRipple", "disabled", "discrete", "showTickMarks", "min", "max", "step", "displayWith"], exportAs: ["matSlider"] }, { kind: "directive", type: i13.MatSliderThumb, selector: "input[matSliderThumb]", inputs: ["value"], outputs: ["valueChange", "dragStart", "dragEnd"], exportAs: ["matSliderThumb"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: CanvasGroupNavigatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-page-navigator', template: "<mat-toolbar>\n  <div\n    class=\"w-full\"\n    data-testid=\"navigation-slider-container\"\n    [dir]=\"currentViewingDirection\"\n  >\n    <mat-slider\n      class=\"navigation-slider\"\n      [max]=\"numberOfCanvasGroups - 1\"\n      (keydown)=\"onSliderHotKey($event)\"\n    >\n      <input\n        matSliderThumb\n        [attr.aria-label]=\"intl.currentPageLabel\"\n        [(ngModel)]=\"currentCanvasGroupIndex\"\n        (input)=\"onSliderChange($event)\"\n    /></mat-slider>\n  </div>\n  <button\n    mat-button\n    data-testid=\"canvasGroupDialogButton\"\n    class=\"canvasGroups\"\n    (click)=\"openCanvasGroupDialog()\"\n  >\n    <span data-testid=\"currentCanvasGroupLabel\">{{ canvasGroupLabel }}</span\n    ><span>/</span\n    ><span data-testid=\"numOfCanvasGroups\">{{ numberOfCanvases }}</span>\n  </button>\n  <div class=\"navigation-buttons\">\n    <ng-container *ngIf=\"currentViewingDirection === ViewingDirection.LTR\">\n      <button\n        data-testid=\"footerNavigateBeforeButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.previousPageLabel\"\n        [matTooltip]=\"intl.previousPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isFirstCanvasGroup\"\n        (click)=\"goToPreviousCanvasGroup()\"\n      >\n        <mat-icon>navigate_before</mat-icon>\n      </button>\n      <button\n        data-testid=\"footerNavigateNextButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.nextPageLabel\"\n        [matTooltip]=\"intl.nextPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isLastCanvasGroup\"\n        (click)=\"goToNextCanvasGroup()\"\n      >\n        <mat-icon>navigate_next</mat-icon>\n      </button>\n    </ng-container>\n    <ng-container *ngIf=\"currentViewingDirection === ViewingDirection.RTL\">\n      <button\n        data-testid=\"footerNavigateNextButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.nextPageLabel\"\n        [matTooltip]=\"intl.nextPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isLastCanvasGroup\"\n        (click)=\"goToNextCanvasGroup()\"\n      >\n        <mat-icon>navigate_before</mat-icon>\n      </button>\n      <button\n        data-testid=\"footerNavigateBeforeButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.previousPageLabel\"\n        [matTooltip]=\"intl.previousPageLabel\"\n        matTooltipPosition=\"above\"\n        [disabled]=\"isFirstCanvasGroup\"\n        (click)=\"goToPreviousCanvasGroup()\"\n      >\n        <mat-icon>navigate_next</mat-icon>\n      </button>\n    </ng-container>\n  </div>\n</mat-toolbar>\n", styles: [".canvasGroups{font-size:13px;text-align:center;cursor:pointer}.navigation-slider{width:100%;width:-webkit-fill-available}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: i2.ViewerService }, { type: i3.CanvasService }, { type: i4.CanvasGroupDialogService }, { type: i5.IiifManifestService }]; }, propDecorators: { searchResult: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLWdyb3VwLW5hdmlnYXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1mb290ZXIvY2FudmFzLWdyb3VwLW5hdmlnYXRvci9jYW52YXMtZ3JvdXAtbmF2aWdhdG9yLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLWZvb3Rlci9jYW52YXMtZ3JvdXAtbmF2aWdhdG9yL2NhbnZhcy1ncm91cC1uYXZpZ2F0b3IuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsS0FBSyxHQUdOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDcEcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDaEcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBTzlFLE1BQU0sT0FBTyw2QkFBNkI7SUFheEMsWUFDUyxJQUFvQixFQUNuQixpQkFBb0MsRUFDcEMs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QyxJQUFJLFVBQVUsQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUM3QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRUQscUJBQXFCO1FBQ25CLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRU8sb0JBQW9CLENBQUMsdUJBQStCO1FBQzFELE9BQU8sdUJBQXVCLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyx1QkFBK0I7UUFDekQsT0FBTyx1QkFBdUIsS0FBSyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0lBQ25FLENBQUM7OEdBM0hVLDZCQUE2QjtrR0FBN0IsNkJBQTZCLHFHQ3hCMUMscWxGQStFQTs7MkZEdkRhLDZCQUE2QjtrQkFMekMsU0FBUzsrQkFDRSxxQkFBcUI7c1FBS2YsWUFBWTtzQkFBM0IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENhbnZhc0dyb3VwRGlhbG9nU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NhbnZhcy1ncm91cC1kaWFsb2cvY2FudmFzLWdyb3VwLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZNYW5pZmVzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgQWNjZXNzS2V5cyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbW9kZWxzL0FjY2Vzc0tleXMnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLi8uLi8uLi9jb3JlL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBWaWV3aW5nRGlyZWN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9tb2RlbHMvdmlld2luZy1kaXJlY3Rpb24nO1xuaW1wb3J0IHsgQ2FudmFzU2VydmljZSB9IGZyb20gJy4vLi4vLi4vLi4vY29yZS9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4vLi4vLi4vLi4vY29yZS9pbnRsJztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4vLi4vLi4vLi4vY29yZS9tb2RlbHMvc2VhcmNoLXJlc3VsdCc7XG5pbXBvcnQgeyBWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi8uLi9jb3JlL3ZpZXdlci1zZXJ2aWNlL3ZpZXdlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS1wYWdlLW5hdmlnYXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYW52YXMtZ3JvdXAtbmF2aWdhdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FudmFzLWdyb3VwLW5hdmlnYXRvci5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDYW52YXNHcm91cE5hdmlnYXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaFJlc3VsdCE6IFNlYXJjaFJlc3VsdDtcbiAgcHVibGljIG51bWJlck9mQ2FudmFzZXMgPSAwO1xuICBwdWJsaWMgY2FudmFzR3JvdXBMYWJlbCA9ICcnO1xuICBwdWJsaWMgbnVtYmVyT2ZDYW52YXNHcm91cHMgPSAwO1xuICBwdWJsaWMgY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IG51bWJlciB8IG51bGwgPSAtMTtcbiAgcHVibGljIGlzRmlyc3RDYW52YXNHcm91cCA9IGZhbHNlO1xuICBwdWJsaWMgaXNMYXN0Q2FudmFzR3JvdXAgPSBmYWxzZTtcbiAgcmVhZG9ubHkgVmlld2luZ0RpcmVjdGlvbiA9IFZpZXdpbmdEaXJlY3Rpb247XG4gIGN1cnJlbnRWaWV3aW5nRGlyZWN0aW9uOiBEaXJlY3Rpb24gPSBWaWV3aW5nRGlyZWN0aW9uLkxUUjtcbiAgcHJpdmF0ZSBjdXJyZW50U2xpZGVyQ2FudmFzR3JvdXBJbmRleDogbnVtYmVyIHwgbnVsbCA9IC0xO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgdmlld2VyU2VydmljZTogVmlld2VyU2VydmljZSxcbiAgICBwcml2YXRlIGNhbnZhc1NlcnZpY2U6IENhbnZhc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNHcm91cERpYWxvZ1NlcnZpY2U6IENhbnZhc0dyb3VwRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZNYW5pZmVzdFNlcnZpY2U6IElpaWZNYW5pZmVzdFNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuY3VycmVudE1hbmlmZXN0LnN1YnNjcmliZShcbiAgICAgICAgKG1hbmlmZXN0OiBNYW5pZmVzdCB8IG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobWFuaWZlc3QpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFZpZXdpbmdEaXJlY3Rpb24gPVxuICAgICAgICAgICAgICBtYW5pZmVzdC52aWV3aW5nRGlyZWN0aW9uID09PSBWaWV3aW5nRGlyZWN0aW9uLkxUUlxuICAgICAgICAgICAgICAgID8gVmlld2luZ0RpcmVjdGlvbi5MVFJcbiAgICAgICAgICAgICAgICA6IFZpZXdpbmdEaXJlY3Rpb24uUlRMO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2Uub25DYW52YXNHcm91cEluZGV4Q2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKGN1cnJlbnRDYW52YXNHcm91cEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTbGlkZXJDYW52YXNHcm91cEluZGV4ICE9PSAtMSAmJlxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2xpZGVyQ2FudmFzR3JvdXBJbmRleCA9PT0gY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNsaWRlckNhbnZhc0dyb3VwSW5kZXggPSAtMTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFNsaWRlckNhbnZhc0dyb3VwSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4ID0gY3VycmVudENhbnZhc0dyb3VwSW5kZXg7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0dyb3VwTGFiZWwgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzR3JvdXBMYWJlbChcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5pc0ZpcnN0Q2FudmFzR3JvdXAgPSB0aGlzLmlzT25GaXJzdENhbnZhc0dyb3VwKFxuICAgICAgICAgICAgY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuaXNMYXN0Q2FudmFzR3JvdXAgPSB0aGlzLmlzT25MYXN0Q2FudmFzR3JvdXAoXG4gICAgICAgICAgICBjdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5vbk51bWJlck9mQ2FudmFzR3JvdXBzQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKG51bWJlck9mQ2FudmFzR3JvdXBzOiBudW1iZXIpID0+IHtcbiAgICAgICAgICB0aGlzLm51bWJlck9mQ2FudmFzR3JvdXBzID0gbnVtYmVyT2ZDYW52YXNHcm91cHM7XG4gICAgICAgICAgdGhpcy5udW1iZXJPZkNhbnZhc2VzID0gdGhpcy5jYW52YXNTZXJ2aWNlLm51bWJlck9mQ2FudmFzZXM7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNGaXJzdENhbnZhc0dyb3VwID0gdGhpcy5pc09uRmlyc3RDYW52YXNHcm91cChcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuaXNMYXN0Q2FudmFzR3JvdXAgPSB0aGlzLmlzT25MYXN0Q2FudmFzR3JvdXAoXG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCk7XG4gIH1cblxuICBnb1RvTmV4dENhbnZhc0dyb3VwKCk6IHZvaWQge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvTmV4dENhbnZhc0dyb3VwKCk7XG4gIH1cblxuICBvblNsaWRlckNoYW5nZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlSW50KChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpO1xuICAgIHRoaXMuY3VycmVudFNsaWRlckNhbnZhc0dyb3VwSW5kZXggPSB2YWx1ZTtcbiAgICB0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4ID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXggIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBMYWJlbCA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNHcm91cExhYmVsKFxuICAgICAgICB0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgICApO1xuICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9DYW52YXNHcm91cCh0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4LCBmYWxzZSk7XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgb25TbGlkZXJIb3RLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBhY2Nlc3NLZXlzID0gbmV3IEFjY2Vzc0tleXMoZXZlbnQpO1xuICAgIGlmIChhY2Nlc3NLZXlzLmlzU2xpZGVyS2V5cygpKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBvcGVuQ2FudmFzR3JvdXBEaWFsb2coKTogdm9pZCB7XG4gICAgdGhpcy5jYW52YXNHcm91cERpYWxvZ1NlcnZpY2UudG9nZ2xlKCk7XG4gIH1cblxuICBwcml2YXRlIGlzT25GaXJzdENhbnZhc0dyb3VwKGN1cnJlbnRDYW52YXNHcm91cEluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gY3VycmVudENhbnZhc0dyb3VwSW5kZXggPT09IDA7XG4gIH1cblxuICBwcml2YXRlIGlzT25MYXN0Q2FudmFzR3JvdXAoY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjdXJyZW50Q2FudmFzR3JvdXBJbmRleCA9PT0gdGhpcy5udW1iZXJPZkNhbnZhc0dyb3VwcyAtIDE7XG4gIH1cbn1cbiIsIjxtYXQtdG9vbGJhcj5cbiAgPGRpdlxuICAgIGNsYXNzPVwidy1mdWxsXCJcbiAgICBkYXRhLXRlc3RpZD1cIm5hdmlnYXRpb24tc2xpZGVyLWNvbnRhaW5lclwiXG4gICAgW2Rpcl09XCJjdXJyZW50Vmlld2luZ0RpcmVjdGlvblwiXG4gID5cbiAgICA8bWF0LXNsaWRlclxuICAgICAgY2xhc3M9XCJuYXZpZ2F0aW9uLXNsaWRlclwiXG4gICAgICBbbWF4XT1cIm51bWJlck9mQ2FudmFzR3JvdXBzIC0gMVwiXG4gICAgICAoa2V5ZG93bik9XCJvblNsaWRlckhvdEtleSgkZXZlbnQpXCJcbiAgICA+XG4gICAgICA8aW5wdXRcbiAgICAgICAgbWF0U2xpZGVyVGh1bWJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpbnRsLmN1cnJlbnRQYWdlTGFiZWxcIlxuICAgICAgICBbKG5nTW9kZWwpXT1cImN1cnJlbnRDYW52YXNHcm91cEluZGV4XCJcbiAgICAgICAgKGlucHV0KT1cIm9uU2xpZGVyQ2hhbmdlKCRldmVudClcIlxuICAgIC8+PC9tYXQtc2xpZGVyPlxuICA8L2Rpdj5cbiAgPGJ1dHRvblxuICAgIG1hdC1idXR0b25cbiAgICBkYXRhLXRlc3RpZD1cImNhbnZhc0dyb3VwRGlhbG9nQnV0dG9uXCJcbiAgICBjbGFzcz1cImNhbnZhc0dyb3Vwc1wiXG4gICAgKGNsaWNrKT1cIm9wZW5DYW52YXNHcm91cERpYWxvZygpXCJcbiAgPlxuICAgIDxzcGFuIGRhdGEtdGVzdGlkPVwiY3VycmVudENhbnZhc0dyb3VwTGFiZWxcIj57eyBjYW52YXNHcm91cExhYmVsIH19PC9zcGFuXG4gICAgPjxzcGFuPi88L3NwYW5cbiAgICA+PHNwYW4gZGF0YS10ZXN0aWQ9XCJudW1PZkNhbnZhc0dyb3Vwc1wiPnt7IG51bWJlck9mQ2FudmFzZXMgfX08L3NwYW4+XG4gIDwvYnV0dG9uPlxuICA8ZGl2IGNsYXNzPVwibmF2aWdhdGlvbi1idXR0b25zXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImN1cnJlbnRWaWV3aW5nRGlyZWN0aW9uID09PSBWaWV3aW5nRGlyZWN0aW9uLkxUUlwiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBkYXRhLXRlc3RpZD1cImZvb3Rlck5hdmlnYXRlQmVmb3JlQnV0dG9uXCJcbiAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW50bC5wcmV2aW91c1BhZ2VMYWJlbFwiXG4gICAgICAgIFttYXRUb29sdGlwXT1cImludGwucHJldmlvdXNQYWdlTGFiZWxcIlxuICAgICAgICBtYXRUb29sdGlwUG9zaXRpb249XCJhYm92ZVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJpc0ZpcnN0Q2FudmFzR3JvdXBcIlxuICAgICAgICAoY2xpY2spPVwiZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKVwiXG4gICAgICA+XG4gICAgICAgIDxtYXQtaWNvbj5uYXZpZ2F0ZV9iZWZvcmU8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGRhdGEtdGVzdGlkPVwiZm9vdGVyTmF2aWdhdGVOZXh0QnV0dG9uXCJcbiAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW50bC5uZXh0UGFnZUxhYmVsXCJcbiAgICAgICAgW21hdFRvb2x0aXBdPVwiaW50bC5uZXh0UGFnZUxhYmVsXCJcbiAgICAgICAgbWF0VG9vbHRpcFBvc2l0aW9uPVwiYWJvdmVcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiaXNMYXN0Q2FudmFzR3JvdXBcIlxuICAgICAgICAoY2xpY2spPVwiZ29Ub05leHRDYW52YXNHcm91cCgpXCJcbiAgICAgID5cbiAgICAgICAgPG1hdC1pY29uPm5hdmlnYXRlX25leHQ8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImN1cnJlbnRWaWV3aW5nRGlyZWN0aW9uID09PSBWaWV3aW5nRGlyZWN0aW9uLlJUTFwiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBkYXRhLXRlc3RpZD1cImZvb3Rlck5hdmlnYXRlTmV4dEJ1dHRvblwiXG4gICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImludGwubmV4dFBhZ2VMYWJlbFwiXG4gICAgICAgIFttYXRUb29sdGlwXT1cImludGwubmV4dFBhZ2VMYWJlbFwiXG4gICAgICAgIG1hdFRvb2x0aXBQb3NpdGlvbj1cImFib3ZlXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImlzTGFzdENhbnZhc0dyb3VwXCJcbiAgICAgICAgKGNsaWNrKT1cImdvVG9OZXh0Q2FudmFzR3JvdXAoKVwiXG4gICAgICA+XG4gICAgICAgIDxtYXQtaWNvbj5uYXZpZ2F0ZV9iZWZvcmU8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGRhdGEtdGVzdGlkPVwiZm9vdGVyTmF2aWdhdGVCZWZvcmVCdXR0b25cIlxuICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpbnRsLnByZXZpb3VzUGFnZUxhYmVsXCJcbiAgICAgICAgW21hdFRvb2x0aXBdPVwiaW50bC5wcmV2aW91c1BhZ2VMYWJlbFwiXG4gICAgICAgIG1hdFRvb2x0aXBQb3NpdGlvbj1cImFib3ZlXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImlzRmlyc3RDYW52YXNHcm91cFwiXG4gICAgICAgIChjbGljayk9XCJnb1RvUHJldmlvdXNDYW52YXNHcm91cCgpXCJcbiAgICAgID5cbiAgICAgICAgPG1hdC1pY29uPm5hdmlnYXRlX25leHQ8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuPC9tYXQtdG9vbGJhcj5cbiJdfQ==