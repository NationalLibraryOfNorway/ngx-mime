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
import * as i7 from "@angular/flex-layout/flex";
import * as i8 from "@angular/forms";
import * as i9 from "@angular/material/toolbar";
import * as i10 from "@angular/cdk/bidi";
import * as i11 from "@angular/material/button";
import * as i12 from "@angular/material/icon";
import * as i13 from "@angular/material/tooltip";
import * as i14 from "@angular/material/slider";
function CanvasGroupNavigatorComponent_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 10);
    i0.ɵɵlistener("click", function CanvasGroupNavigatorComponent_ng_container_14_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToPreviousCanvasGroup()); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "navigate_before");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "button", 11);
    i0.ɵɵlistener("click", function CanvasGroupNavigatorComponent_ng_container_14_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r3); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.goToNextCanvasGroup()); });
    i0.ɵɵelementStart(5, "mat-icon");
    i0.ɵɵtext(6, "navigate_next");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("matTooltip", ctx_r0.intl.previousPageLabel)("disabled", ctx_r0.isFirstCanvasGroup);
    i0.ɵɵattribute("aria-label", ctx_r0.intl.previousPageLabel);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("matTooltip", ctx_r0.intl.nextPageLabel)("disabled", ctx_r0.isLastCanvasGroup);
    i0.ɵɵattribute("aria-label", ctx_r0.intl.nextPageLabel);
} }
function CanvasGroupNavigatorComponent_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 11);
    i0.ɵɵlistener("click", function CanvasGroupNavigatorComponent_ng_container_15_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.goToNextCanvasGroup()); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "navigate_before");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "button", 10);
    i0.ɵɵlistener("click", function CanvasGroupNavigatorComponent_ng_container_15_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r6); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.goToPreviousCanvasGroup()); });
    i0.ɵɵelementStart(5, "mat-icon");
    i0.ɵɵtext(6, "navigate_next");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("matTooltip", ctx_r1.intl.nextPageLabel)("disabled", ctx_r1.isLastCanvasGroup);
    i0.ɵɵattribute("aria-label", ctx_r1.intl.nextPageLabel);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("matTooltip", ctx_r1.intl.previousPageLabel)("disabled", ctx_r1.isFirstCanvasGroup);
    i0.ɵɵattribute("aria-label", ctx_r1.intl.previousPageLabel);
} }
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
    onSliderChange(value) {
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
        this.pageDialogService.toggle();
    }
    isOnFirstCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === 0;
    }
    isOnLastCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === this.numberOfCanvasGroups - 1;
    }
}
CanvasGroupNavigatorComponent.ɵfac = function CanvasGroupNavigatorComponent_Factory(t) { return new (t || CanvasGroupNavigatorComponent)(i0.ɵɵdirectiveInject(i1.MimeViewerIntl), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.ViewerService), i0.ɵɵdirectiveInject(i3.CanvasService), i0.ɵɵdirectiveInject(i4.CanvasGroupDialogService), i0.ɵɵdirectiveInject(i5.IiifManifestService)); };
CanvasGroupNavigatorComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CanvasGroupNavigatorComponent, selectors: [["mime-page-navigator"]], inputs: { searchResult: "searchResult" }, decls: 16, vars: 8, consts: [["fxLayout", "row", "fxFlex", "", "fxLayoutAlign", "start center"], ["fxFlex", "", "data-test-id", "navigation-slider-container", 3, "dir"], ["fxFlex", "", 1, "navigation-slider", 3, "max", "keydown"], ["matSliderThumb", "", 3, "ngModel", "ngModelChange", "valueChange"], ["mat-button", "", 1, "canvasGroups", 3, "click"], ["fxLayout", "row", "fxLayoutGap", "1px"], ["id", "currentCanvasGroupLabel"], ["id", "numOfCanvasGroups"], [1, "navigation-buttons"], [4, "ngIf"], ["id", "footerNavigateBeforeButton", "mat-icon-button", "", "matTooltipPosition", "above", 3, "matTooltip", "disabled", "click"], ["id", "footerNavigateNextButton", "mat-icon-button", "", "matTooltipPosition", "above", 3, "matTooltip", "disabled", "click"]], template: function CanvasGroupNavigatorComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-toolbar")(1, "div", 0)(2, "div", 1)(3, "mat-slider", 2);
        i0.ɵɵlistener("keydown", function CanvasGroupNavigatorComponent_Template_mat_slider_keydown_3_listener($event) { return ctx.onSliderHotKey($event); });
        i0.ɵɵelementStart(4, "input", 3);
        i0.ɵɵlistener("ngModelChange", function CanvasGroupNavigatorComponent_Template_input_ngModelChange_4_listener($event) { return ctx.currentCanvasGroupIndex = $event; })("valueChange", function CanvasGroupNavigatorComponent_Template_input_valueChange_4_listener($event) { return ctx.onSliderChange($event); });
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(5, "button", 4);
        i0.ɵɵlistener("click", function CanvasGroupNavigatorComponent_Template_button_click_5_listener() { return ctx.openCanvasGroupDialog(); });
        i0.ɵɵelementStart(6, "div", 5)(7, "span", 6);
        i0.ɵɵtext(8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "span");
        i0.ɵɵtext(10, "/");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "span", 7);
        i0.ɵɵtext(12);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵtemplate(14, CanvasGroupNavigatorComponent_ng_container_14_Template, 7, 6, "ng-container", 9);
        i0.ɵɵtemplate(15, CanvasGroupNavigatorComponent_ng_container_15_Template, 7, 6, "ng-container", 9);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("dir", ctx.currentViewingDirection);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("max", ctx.numberOfCanvasGroups - 1);
        i0.ɵɵattribute("aria-label", ctx.intl.currentPageLabel);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.currentCanvasGroupIndex);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.canvasGroupLabel);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.numberOfCanvases);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.currentViewingDirection === ctx.ViewingDirection.LTR);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.currentViewingDirection === ctx.ViewingDirection.RTL);
    } }, dependencies: [i6.NgIf, i7.DefaultLayoutDirective, i7.DefaultLayoutGapDirective, i7.DefaultLayoutAlignDirective, i7.DefaultFlexDirective, i8.DefaultValueAccessor, i8.NgControlStatus, i8.NgModel, i9.MatToolbar, i10.Dir, i11.MatButton, i11.MatIconButton, i12.MatIcon, i13.MatTooltip, i14.MatSlider, i14.MatSliderThumb], styles: [".canvasGroups[_ngcontent-%COMP%]{font-size:13px;text-align:center;cursor:pointer}.navigation-slider[_ngcontent-%COMP%]{width:100%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CanvasGroupNavigatorComponent, [{
        type: Component,
        args: [{ selector: 'mime-page-navigator', template: "<mat-toolbar>\n  <div fxLayout=\"row\" fxFlex fxLayoutAlign=\"start center\">\n    <div fxFlex data-test-id=\"navigation-slider-container\" [dir]=\"currentViewingDirection\">\n      <mat-slider\n        class=\"navigation-slider\"\n        [max]=\"numberOfCanvasGroups - 1\"\n        [attr.aria-label]=\"intl.currentPageLabel\"\n        (keydown)=\"onSliderHotKey($event)\"\n        fxFlex\n      >\n        <input\n          matSliderThumb\n          [(ngModel)]=\"currentCanvasGroupIndex\"\n          (valueChange)=\"onSliderChange($event)\"\n      /></mat-slider>\n    </div>\n    <button mat-button class=\"canvasGroups\" (click)=\"openCanvasGroupDialog()\">\n      <div fxLayout=\"row\" fxLayoutGap=\"1px\">\n        <span id=\"currentCanvasGroupLabel\">{{ canvasGroupLabel }}</span\n        ><span>/</span\n        ><span id=\"numOfCanvasGroups\">{{ numberOfCanvases }}</span>\n      </div>\n    </button>\n    <div class=\"navigation-buttons\">\n      <ng-container *ngIf=\"currentViewingDirection === ViewingDirection.LTR\">\n        <button\n          id=\"footerNavigateBeforeButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.previousPageLabel\"\n          [matTooltip]=\"intl.previousPageLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isFirstCanvasGroup\"\n          (click)=\"goToPreviousCanvasGroup()\"\n        >\n          <mat-icon>navigate_before</mat-icon>\n        </button>\n        <button\n          id=\"footerNavigateNextButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.nextPageLabel\"\n          [matTooltip]=\"intl.nextPageLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isLastCanvasGroup\"\n          (click)=\"goToNextCanvasGroup()\"\n        >\n          <mat-icon>navigate_next</mat-icon>\n        </button>\n      </ng-container>\n      <ng-container *ngIf=\"currentViewingDirection === ViewingDirection.RTL\">\n        <button\n          id=\"footerNavigateNextButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.nextPageLabel\"\n          [matTooltip]=\"intl.nextPageLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isLastCanvasGroup\"\n          (click)=\"goToNextCanvasGroup()\"\n        >\n          <mat-icon>navigate_before</mat-icon>\n        </button>\n        <button\n          id=\"footerNavigateBeforeButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.previousPageLabel\"\n          [matTooltip]=\"intl.previousPageLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isFirstCanvasGroup\"\n          (click)=\"goToPreviousCanvasGroup()\"\n        >\n          <mat-icon>navigate_next</mat-icon>\n        </button>\n      </ng-container>\n    </div>\n  </div>\n</mat-toolbar>\n", styles: [".canvasGroups{font-size:13px;text-align:center;cursor:pointer}.navigation-slider{width:100%}\n"] }]
    }], function () { return [{ type: i1.MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: i2.ViewerService }, { type: i3.CanvasService }, { type: i4.CanvasGroupDialogService }, { type: i5.IiifManifestService }]; }, { searchResult: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLWdyb3VwLW5hdmlnYXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1mb290ZXIvY2FudmFzLWdyb3VwLW5hdmlnYXRvci9jYW52YXMtZ3JvdXAtbmF2aWdhdG9yLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLWZvb3Rlci9jYW52YXMtZ3JvdXAtbmF2aWdhdG9yL2NhbnZhcy1ncm91cC1uYXZpZ2F0b3IuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsS0FBSyxHQUdOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDcEcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDaEcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDT3hFLDZCQUF1RTtJQUNyRSxrQ0FRQztJQURDLG9MQUFTLGVBQUEsZ0NBQXlCLENBQUEsSUFB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SUE7UUFGRSx1S0FBcUMsOEdBQ3RCLDBCQUFzQixJQURBO1FBRnZDLGlCQUlBLEVBQUEsRUFBQTtRQUVKLGlDQUEwRTtRQUFsQywwR0FBUywyQkFBdUIsSUFBQztRQUN2RSw4QkFBc0MsY0FBQTtRQUNELFlBQXNCO1FBQUEsaUJBQ3hEO1FBQUEsNEJBQU07UUFBQSxrQkFBQztRQUFBLGlCQUNQO1FBQUEsZ0NBQTZCO1FBQUEsYUFBc0I7UUFBQSxpQkFBTyxFQUFBLEVBQUE7UUFHL0QsK0JBQWdDO1FBQzlCLGtHQXVCZTtRQUNmLGtHQXVCZTtRQUNqQixpQkFBTSxFQUFBLEVBQUE7O1FBdEVpRCxlQUErQjtRQUEvQixpREFBK0I7UUFHbEYsZUFBZ0M7UUFBaEMsa0RBQWdDO1FBQ2hDLHVEQUF5QztRQU12QyxlQUFxQztRQUFyQyxxREFBcUM7UUFNSixlQUFzQjtRQUF0QiwwQ0FBc0I7UUFFM0IsZUFBc0I7UUFBdEIsMENBQXNCO1FBSXZDLGVBQXNEO1FBQXRELCtFQUFzRDtRQXdCdEQsZUFBc0Q7UUFBdEQsK0VBQXNEOzt1RkR4QjlELDZCQUE2QjtjQUx6QyxTQUFTOzJCQUNFLHFCQUFxQjtrT0FLZixZQUFZO2tCQUEzQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY2FudmFzLWdyb3VwLWRpYWxvZy9jYW52YXMtZ3JvdXAtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZk1hbmlmZXN0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3Qtc2VydmljZSc7XG5pbXBvcnQgeyBBY2Nlc3NLZXlzIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9tb2RlbHMvQWNjZXNzS2V5cyc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IFZpZXdpbmdEaXJlY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9jb3JlL21vZGVscy92aWV3aW5nLWRpcmVjdGlvbic7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi8uLi9jb3JlL2NhbnZhcy1zZXJ2aWNlL2NhbnZhcy1zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi8uLi8uLi8uLi9jb3JlL2ludGwnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi8uLi8uLi9jb3JlL21vZGVscy9zZWFyY2gtcmVzdWx0JztcbmltcG9ydCB7IFZpZXdlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uLy4uL2NvcmUvdmlld2VyLXNlcnZpY2Uvdmlld2VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtaW1lLXBhZ2UtbmF2aWdhdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbnZhcy1ncm91cC1uYXZpZ2F0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYW52YXMtZ3JvdXAtbmF2aWdhdG9yLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIENhbnZhc0dyb3VwTmF2aWdhdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoUmVzdWx0ITogU2VhcmNoUmVzdWx0O1xuICBwdWJsaWMgbnVtYmVyT2ZDYW52YXNlcyA9IDA7XG4gIHB1YmxpYyBjYW52YXNHcm91cExhYmVsID0gJyc7XG4gIHB1YmxpYyBudW1iZXJPZkNhbnZhc0dyb3VwcyA9IDA7XG4gIHB1YmxpYyBjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyIHwgbnVsbCA9IC0xO1xuICBwdWJsaWMgaXNGaXJzdENhbnZhc0dyb3VwID0gZmFsc2U7XG4gIHB1YmxpYyBpc0xhc3RDYW52YXNHcm91cCA9IGZhbHNlO1xuICByZWFkb25seSBWaWV3aW5nRGlyZWN0aW9uID0gVmlld2luZ0RpcmVjdGlvbjtcbiAgY3VycmVudFZpZXdpbmdEaXJlY3Rpb246IERpcmVjdGlvbiA9IFZpZXdpbmdEaXJlY3Rpb24uTFRSO1xuICBwcml2YXRlIGN1cnJlbnRTbGlkZXJDYW52YXNHcm91cEluZGV4OiBudW1iZXIgfCBudWxsID0gLTE7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSB2aWV3ZXJTZXJ2aWNlOiBWaWV3ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwcml2YXRlIHBhZ2VEaWFsb2dTZXJ2aWNlOiBDYW52YXNHcm91cERpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmTWFuaWZlc3RTZXJ2aWNlOiBJaWlmTWFuaWZlc3RTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG1hbmlmZXN0KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3aW5nRGlyZWN0aW9uID1cbiAgICAgICAgICAgICAgbWFuaWZlc3Qudmlld2luZ0RpcmVjdGlvbiA9PT0gVmlld2luZ0RpcmVjdGlvbi5MVFJcbiAgICAgICAgICAgICAgICA/IFZpZXdpbmdEaXJlY3Rpb24uTFRSXG4gICAgICAgICAgICAgICAgOiBWaWV3aW5nRGlyZWN0aW9uLlJUTDtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLm9uQ2FudmFzR3JvdXBJbmRleENoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgIChjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2xpZGVyQ2FudmFzR3JvdXBJbmRleCAhPT0gLTEgJiZcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNsaWRlckNhbnZhc0dyb3VwSW5kZXggPT09IGN1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTbGlkZXJDYW52YXNHcm91cEluZGV4ID0gLTE7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRTbGlkZXJDYW52YXNHcm91cEluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCA9IGN1cnJlbnRDYW52YXNHcm91cEluZGV4O1xuICAgICAgICAgICAgdGhpcy5jYW52YXNHcm91cExhYmVsID0gdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc0dyb3VwTGFiZWwoXG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuaXNGaXJzdENhbnZhc0dyb3VwID0gdGhpcy5pc09uRmlyc3RDYW52YXNHcm91cChcbiAgICAgICAgICAgIGN1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmlzTGFzdENhbnZhc0dyb3VwID0gdGhpcy5pc09uTGFzdENhbnZhc0dyb3VwKFxuICAgICAgICAgICAgY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2Uub25OdW1iZXJPZkNhbnZhc0dyb3Vwc0NoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgIChudW1iZXJPZkNhbnZhc0dyb3VwczogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgdGhpcy5udW1iZXJPZkNhbnZhc0dyb3VwcyA9IG51bWJlck9mQ2FudmFzR3JvdXBzO1xuICAgICAgICAgIHRoaXMubnVtYmVyT2ZDYW52YXNlcyA9IHRoaXMuY2FudmFzU2VydmljZS5udW1iZXJPZkNhbnZhc2VzO1xuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlzRmlyc3RDYW52YXNHcm91cCA9IHRoaXMuaXNPbkZpcnN0Q2FudmFzR3JvdXAoXG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmlzTGFzdENhbnZhc0dyb3VwID0gdGhpcy5pc09uTGFzdENhbnZhc0dyb3VwKFxuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIGdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCk6IHZvaWQge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvUHJldmlvdXNDYW52YXNHcm91cCgpO1xuICB9XG5cbiAgZ29Ub05leHRDYW52YXNHcm91cCgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub05leHRDYW52YXNHcm91cCgpO1xuICB9XG5cbiAgb25TbGlkZXJDaGFuZ2UodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudFNsaWRlckNhbnZhc0dyb3VwSW5kZXggPSB2YWx1ZTtcbiAgICB0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4ID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXggIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBMYWJlbCA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNHcm91cExhYmVsKFxuICAgICAgICB0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgICApO1xuICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9DYW52YXNHcm91cCh0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4LCBmYWxzZSk7XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgb25TbGlkZXJIb3RLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBhY2Nlc3NLZXlzID0gbmV3IEFjY2Vzc0tleXMoZXZlbnQpO1xuICAgIGlmIChhY2Nlc3NLZXlzLmlzU2xpZGVyS2V5cygpKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBvcGVuQ2FudmFzR3JvdXBEaWFsb2coKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlRGlhbG9nU2VydmljZS50b2dnbGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNPbkZpcnN0Q2FudmFzR3JvdXAoY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjdXJyZW50Q2FudmFzR3JvdXBJbmRleCA9PT0gMDtcbiAgfVxuXG4gIHByaXZhdGUgaXNPbkxhc3RDYW52YXNHcm91cChjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGN1cnJlbnRDYW52YXNHcm91cEluZGV4ID09PSB0aGlzLm51bWJlck9mQ2FudmFzR3JvdXBzIC0gMTtcbiAgfVxufVxuIiwiPG1hdC10b29sYmFyPlxuICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhGbGV4IGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIj5cbiAgICA8ZGl2IGZ4RmxleCBkYXRhLXRlc3QtaWQ9XCJuYXZpZ2F0aW9uLXNsaWRlci1jb250YWluZXJcIiBbZGlyXT1cImN1cnJlbnRWaWV3aW5nRGlyZWN0aW9uXCI+XG4gICAgICA8bWF0LXNsaWRlclxuICAgICAgICBjbGFzcz1cIm5hdmlnYXRpb24tc2xpZGVyXCJcbiAgICAgICAgW21heF09XCJudW1iZXJPZkNhbnZhc0dyb3VwcyAtIDFcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImludGwuY3VycmVudFBhZ2VMYWJlbFwiXG4gICAgICAgIChrZXlkb3duKT1cIm9uU2xpZGVySG90S2V5KCRldmVudClcIlxuICAgICAgICBmeEZsZXhcbiAgICAgID5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgbWF0U2xpZGVyVGh1bWJcbiAgICAgICAgICBbKG5nTW9kZWwpXT1cImN1cnJlbnRDYW52YXNHcm91cEluZGV4XCJcbiAgICAgICAgICAodmFsdWVDaGFuZ2UpPVwib25TbGlkZXJDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAvPjwvbWF0LXNsaWRlcj5cbiAgICA8L2Rpdj5cbiAgICA8YnV0dG9uIG1hdC1idXR0b24gY2xhc3M9XCJjYW52YXNHcm91cHNcIiAoY2xpY2spPVwib3BlbkNhbnZhc0dyb3VwRGlhbG9nKClcIj5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjFweFwiPlxuICAgICAgICA8c3BhbiBpZD1cImN1cnJlbnRDYW52YXNHcm91cExhYmVsXCI+e3sgY2FudmFzR3JvdXBMYWJlbCB9fTwvc3BhblxuICAgICAgICA+PHNwYW4+Lzwvc3BhblxuICAgICAgICA+PHNwYW4gaWQ9XCJudW1PZkNhbnZhc0dyb3Vwc1wiPnt7IG51bWJlck9mQ2FudmFzZXMgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2J1dHRvbj5cbiAgICA8ZGl2IGNsYXNzPVwibmF2aWdhdGlvbi1idXR0b25zXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY3VycmVudFZpZXdpbmdEaXJlY3Rpb24gPT09IFZpZXdpbmdEaXJlY3Rpb24uTFRSXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBpZD1cImZvb3Rlck5hdmlnYXRlQmVmb3JlQnV0dG9uXCJcbiAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImludGwucHJldmlvdXNQYWdlTGFiZWxcIlxuICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwucHJldmlvdXNQYWdlTGFiZWxcIlxuICAgICAgICAgIG1hdFRvb2x0aXBQb3NpdGlvbj1cImFib3ZlXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNGaXJzdENhbnZhc0dyb3VwXCJcbiAgICAgICAgICAoY2xpY2spPVwiZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bWF0LWljb24+bmF2aWdhdGVfYmVmb3JlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBpZD1cImZvb3Rlck5hdmlnYXRlTmV4dEJ1dHRvblwiXG4gICAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpbnRsLm5leHRQYWdlTGFiZWxcIlxuICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwubmV4dFBhZ2VMYWJlbFwiXG4gICAgICAgICAgbWF0VG9vbHRpcFBvc2l0aW9uPVwiYWJvdmVcIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCJpc0xhc3RDYW52YXNHcm91cFwiXG4gICAgICAgICAgKGNsaWNrKT1cImdvVG9OZXh0Q2FudmFzR3JvdXAoKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bWF0LWljb24+bmF2aWdhdGVfbmV4dDwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY3VycmVudFZpZXdpbmdEaXJlY3Rpb24gPT09IFZpZXdpbmdEaXJlY3Rpb24uUlRMXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBpZD1cImZvb3Rlck5hdmlnYXRlTmV4dEJ1dHRvblwiXG4gICAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpbnRsLm5leHRQYWdlTGFiZWxcIlxuICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwubmV4dFBhZ2VMYWJlbFwiXG4gICAgICAgICAgbWF0VG9vbHRpcFBvc2l0aW9uPVwiYWJvdmVcIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCJpc0xhc3RDYW52YXNHcm91cFwiXG4gICAgICAgICAgKGNsaWNrKT1cImdvVG9OZXh0Q2FudmFzR3JvdXAoKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bWF0LWljb24+bmF2aWdhdGVfYmVmb3JlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBpZD1cImZvb3Rlck5hdmlnYXRlQmVmb3JlQnV0dG9uXCJcbiAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImludGwucHJldmlvdXNQYWdlTGFiZWxcIlxuICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwucHJldmlvdXNQYWdlTGFiZWxcIlxuICAgICAgICAgIG1hdFRvb2x0aXBQb3NpdGlvbj1cImFib3ZlXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNGaXJzdENhbnZhc0dyb3VwXCJcbiAgICAgICAgICAoY2xpY2spPVwiZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bWF0LWljb24+bmF2aWdhdGVfbmV4dDwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9tYXQtdG9vbGJhcj5cbiJdfQ==