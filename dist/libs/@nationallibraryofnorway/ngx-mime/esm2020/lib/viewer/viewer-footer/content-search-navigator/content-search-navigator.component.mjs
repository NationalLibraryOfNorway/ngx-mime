import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, } from '@angular/core';
import { Subscription } from 'rxjs';
import { CanvasService } from '../../../core/canvas-service/canvas-service';
import { IiifContentSearchService } from '../../../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../../core/intl';
import { SearchResult } from '../../../core/models/search-result';
import { ViewingDirection } from '../../../core/models/viewing-direction';
import { ContentSearchNavigationService } from '../../../core/navigation/content-search-navigation-service/content-search-navigation.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/intl";
import * as i2 from "../../../core/canvas-service/canvas-service";
import * as i3 from "../../../core/iiif-content-search-service/iiif-content-search.service";
import * as i4 from "../../../core/navigation/content-search-navigation-service/content-search-navigation.service";
import * as i5 from "../../../core/iiif-manifest-service/iiif-manifest-service";
import * as i6 from "@angular/common";
import * as i7 from "@angular/flex-layout/flex";
import * as i8 from "@angular/flex-layout/extended";
import * as i9 from "@angular/material/toolbar";
import * as i10 from "@angular/material/button";
import * as i11 from "@angular/material/icon";
import * as i12 from "@angular/material/tooltip";
function ContentSearchNavigatorComponent_div_1_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 7);
    i0.ɵɵlistener("click", function ContentSearchNavigatorComponent_div_1_ng_container_7_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.goToPreviousHit()); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "navigate_before");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "button", 8);
    i0.ɵɵlistener("click", function ContentSearchNavigatorComponent_div_1_ng_container_7_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r5 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r5.goToNextHit()); });
    i0.ɵɵelementStart(5, "mat-icon");
    i0.ɵɵtext(6, "navigate_next");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("matTooltip", ctx_r1.intl.previousHitLabel)("disabled", ctx_r1.isFirstHit);
    i0.ɵɵattribute("aria-label", ctx_r1.intl.previousHitLabel);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("matTooltip", ctx_r1.intl.nextHitLabel)("disabled", ctx_r1.isLastHit);
    i0.ɵɵattribute("aria-label", ctx_r1.intl.nextHitLabel);
} }
function ContentSearchNavigatorComponent_div_1_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 8);
    i0.ɵɵlistener("click", function ContentSearchNavigatorComponent_div_1_ng_container_8_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r6.goToNextHit()); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "navigate_before");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "button", 7);
    i0.ɵɵlistener("click", function ContentSearchNavigatorComponent_div_1_ng_container_8_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r7); const ctx_r8 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r8.goToPreviousHit()); });
    i0.ɵɵelementStart(5, "mat-icon");
    i0.ɵɵtext(6, "navigate_next");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("matTooltip", ctx_r2.intl.nextHitLabel)("disabled", ctx_r2.isLastHit);
    i0.ɵɵattribute("aria-label", ctx_r2.intl.nextHitLabel);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("matTooltip", ctx_r2.intl.previousHitLabel)("disabled", ctx_r2.isFirstHit);
    i0.ɵɵattribute("aria-label", ctx_r2.intl.previousHitLabel);
} }
const _c0 = function (a0) { return { "not-on-page": a0 }; };
function ContentSearchNavigatorComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2)(1, "div")(2, "button", 3);
    i0.ɵɵlistener("click", function ContentSearchNavigatorComponent_div_1_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.clear()); });
    i0.ɵɵelementStart(3, "mat-icon");
    i0.ɵɵtext(4, "close");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(5, "div", 4);
    i0.ɵɵelementStart(6, "div", 5);
    i0.ɵɵtemplate(7, ContentSearchNavigatorComponent_div_1_ng_container_7_Template, 7, 6, "ng-container", 6);
    i0.ɵɵtemplate(8, ContentSearchNavigatorComponent_div_1_ng_container_8_Template, 7, 6, "ng-container", 6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("matTooltip", ctx_r0.intl.closeLabel);
    i0.ɵɵattribute("aria-label", ctx_r0.intl.closeLabel);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c0, !ctx_r0.isHitOnActiveCanvasGroup))("innerHTML", ctx_r0.intl.currentHitLabel(ctx_r0.currentHit + 1, ctx_r0.searchResult.size()), i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.invert);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.invert);
} }
export class ContentSearchNavigatorComponent {
    constructor(intl, changeDetectorRef, canvasService, iiifContentSearchService, contentSearchNavigationService, iiifManifestService) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.canvasService = canvasService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.contentSearchNavigationService = contentSearchNavigationService;
        this.iiifManifestService = iiifManifestService;
        this.isHitOnActiveCanvasGroup = false;
        this.isFirstHit = false;
        this.isLastHit = false;
        this.currentHit = 0;
        this.invert = false;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.contentSearchNavigationService.initialize();
        this.subscriptions.add(this.contentSearchNavigationService.currentHitCounter.subscribe((n) => {
            this.isFirstHit = n <= 0;
            this.isLastHit = n === this.searchResult.size() - 1;
            this.currentHit = n;
        }));
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            if (manifest) {
                this.invert = manifest.viewingDirection === ViewingDirection.LTR;
                this.changeDetectorRef.detectChanges();
            }
        }));
        this.subscriptions.add(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
        this.subscriptions.add(this.canvasService.onCanvasGroupIndexChange.subscribe((canvasGroupIndex) => {
            this.contentSearchNavigationService.update(canvasGroupIndex);
            this.isHitOnActiveCanvasGroup =
                this.contentSearchNavigationService.getHitOnActiveCanvasGroup();
            this.changeDetectorRef.detectChanges();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.contentSearchNavigationService.destroy();
    }
    clear() {
        this.iiifContentSearchService.destroy();
    }
    goToNextHit() {
        this.contentSearchNavigationService.goToNextHit();
    }
    goToPreviousHit() {
        this.contentSearchNavigationService.goToPreviousHit();
    }
}
ContentSearchNavigatorComponent.ɵfac = function ContentSearchNavigatorComponent_Factory(t) { return new (t || ContentSearchNavigatorComponent)(i0.ɵɵdirectiveInject(i1.MimeViewerIntl), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.CanvasService), i0.ɵɵdirectiveInject(i3.IiifContentSearchService), i0.ɵɵdirectiveInject(i4.ContentSearchNavigationService), i0.ɵɵdirectiveInject(i5.IiifManifestService)); };
ContentSearchNavigatorComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ContentSearchNavigatorComponent, selectors: [["mime-content-search-navigator"]], inputs: { searchResult: "searchResult" }, decls: 2, vars: 1, consts: [["color", "primary", 1, "content-search-navigator-toolbar"], ["fxLayout", "row", "fxFlex", "", "fxLayoutAlign", "space-between center", 4, "ngIf"], ["fxLayout", "row", "fxFlex", "", "fxLayoutAlign", "space-between center"], ["id", "footerNavigateCloseHitsButton", "mat-icon-button", "", "matTooltipPosition", "above", 3, "matTooltip", "click"], ["fxFlex", "", 1, "current-hit-label", 3, "ngClass", "innerHTML"], [1, "navigation-buttons"], [4, "ngIf"], ["id", "footerNavigatePreviousHitButton", "mat-icon-button", "", "matTooltipPosition", "above", 3, "matTooltip", "disabled", "click"], ["id", "footerNavigateNextHitButton", "mat-icon-button", "", "matTooltipPosition", "above", 3, "matTooltip", "disabled", "click"]], template: function ContentSearchNavigatorComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-toolbar", 0);
        i0.ɵɵtemplate(1, ContentSearchNavigatorComponent_div_1_Template, 9, 8, "div", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.searchResult);
    } }, dependencies: [i6.NgClass, i6.NgIf, i7.DefaultLayoutDirective, i7.DefaultLayoutAlignDirective, i7.DefaultFlexDirective, i8.DefaultClassDirective, i9.MatToolbar, i10.MatIconButton, i11.MatIcon, i12.MatTooltip], styles: [".current-hit-label[_ngcontent-%COMP%]{font-size:13px;text-align:center}.not-on-page[_ngcontent-%COMP%]{opacity:.6}"], changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContentSearchNavigatorComponent, [{
        type: Component,
        args: [{ selector: 'mime-content-search-navigator', changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-toolbar class=\"content-search-navigator-toolbar\" color=\"primary\">\n  <div\n    *ngIf=\"searchResult\"\n    fxLayout=\"row\"\n    fxFlex\n    fxLayoutAlign=\"space-between center\"\n  >\n    <div>\n      <button\n        id=\"footerNavigateCloseHitsButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.closeLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        matTooltipPosition=\"above\"\n        (click)=\"clear()\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n    </div>\n    <div\n      fxFlex\n      class=\"current-hit-label\"\n      [ngClass]=\"{ 'not-on-page': !isHitOnActiveCanvasGroup }\"\n      [innerHTML]=\"intl.currentHitLabel(currentHit + 1, searchResult.size())\"\n    ></div>\n    <div class=\"navigation-buttons\">\n      <ng-container *ngIf=\"invert\">\n        <button\n          id=\"footerNavigatePreviousHitButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.previousHitLabel\"\n          [matTooltip]=\"intl.previousHitLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isFirstHit\"\n          (click)=\"goToPreviousHit()\"\n        >\n          <mat-icon>navigate_before</mat-icon>\n        </button>\n        <button\n          id=\"footerNavigateNextHitButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.nextHitLabel\"\n          [matTooltip]=\"intl.nextHitLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isLastHit\"\n          (click)=\"goToNextHit()\"\n        >\n          <mat-icon>navigate_next</mat-icon>\n        </button>\n      </ng-container>\n      <ng-container *ngIf=\"!invert\">\n        <button\n          id=\"footerNavigateNextHitButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.nextHitLabel\"\n          [matTooltip]=\"intl.nextHitLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isLastHit\"\n          (click)=\"goToNextHit()\"\n        >\n          <mat-icon>navigate_before</mat-icon>\n        </button>\n        <button\n          id=\"footerNavigatePreviousHitButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.previousHitLabel\"\n          [matTooltip]=\"intl.previousHitLabel\"\n          matTooltipPosition=\"above\"\n          [disabled]=\"isFirstHit\"\n          (click)=\"goToPreviousHit()\"\n        >\n          <mat-icon>navigate_next</mat-icon>\n        </button>\n      </ng-container>\n    </div>\n  </div>\n</mat-toolbar>\n", styles: [".current-hit-label{font-size:13px;text-align:center}.not-on-page{opacity:.6}\n"] }]
    }], function () { return [{ type: i1.MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: i2.CanvasService }, { type: i3.IiifContentSearchService }, { type: i4.ContentSearchNavigationService }, { type: i5.IiifManifestService }]; }, { searchResult: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLWZvb3Rlci9jb250ZW50LXNlYXJjaC1uYXZpZ2F0b3IvY29udGVudC1zZWFyY2gtbmF2aWdhdG9yLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLWZvb3Rlci9jb250ZW50LXNlYXJjaC1uYXZpZ2F0b3IvY29udGVudC1zZWFyY2gtbmF2aWdhdG9yLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxLQUFLLEdBR04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUVBQXVFLENBQUM7QUFDakgsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDaEcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw4RkFBOEYsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztJQ1V4SSw2QkFBNkI7SUFDM0IsaUNBUUM7SUFEQyw0TEFBUyxlQUFBLHdCQUFpQixDQUFBLElBQUM7SUFFM0IsZ0NBQVU7SUFBQSwr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QUFTOzJCQUNFLCtCQUErQixtQkFHeEIsdUJBQXVCLENBQUMsTUFBTTttUEFHdEMsWUFBWTtrQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2lpaWYtY29udGVudC1zZWFyY2gtc2VydmljZS9paWlmLWNvbnRlbnQtc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZk1hbmlmZXN0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3Qtc2VydmljZSc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW50bCc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbW9kZWxzL3NlYXJjaC1yZXN1bHQnO1xuaW1wb3J0IHsgVmlld2luZ0RpcmVjdGlvbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbW9kZWxzL3ZpZXdpbmctZGlyZWN0aW9uJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbmF2aWdhdGlvbi9jb250ZW50LXNlYXJjaC1uYXZpZ2F0aW9uLXNlcnZpY2UvY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS1jb250ZW50LXNlYXJjaC1uYXZpZ2F0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vY29udGVudC1zZWFyY2gtbmF2aWdhdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29udGVudC1zZWFyY2gtbmF2aWdhdG9yLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb250ZW50U2VhcmNoTmF2aWdhdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBzZWFyY2hSZXN1bHQhOiBTZWFyY2hSZXN1bHQ7XG4gIGlzSGl0T25BY3RpdmVDYW52YXNHcm91cCA9IGZhbHNlO1xuICBpc0ZpcnN0SGl0ID0gZmFsc2U7XG4gIGlzTGFzdEhpdCA9IGZhbHNlO1xuICBjdXJyZW50SGl0ID0gMDtcbiAgaW52ZXJ0ID0gZmFsc2U7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpbnRsOiBNaW1lVmlld2VySW50bCxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGNhbnZhc1NlcnZpY2U6IENhbnZhc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmQ29udGVudFNlYXJjaFNlcnZpY2U6IElpaWZDb250ZW50U2VhcmNoU2VydmljZSxcbiAgICBwcml2YXRlIGNvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZTogQ29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZk1hbmlmZXN0U2VydmljZTogSWlpZk1hbmlmZXN0U2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmNvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZS5jdXJyZW50SGl0Q291bnRlci5zdWJzY3JpYmUoKG4pID0+IHtcbiAgICAgICAgdGhpcy5pc0ZpcnN0SGl0ID0gbiA8PSAwO1xuICAgICAgICB0aGlzLmlzTGFzdEhpdCA9IG4gPT09IHRoaXMuc2VhcmNoUmVzdWx0LnNpemUoKSAtIDE7XG4gICAgICAgIHRoaXMuY3VycmVudEhpdCA9IG47XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5jdXJyZW50TWFuaWZlc3Quc3Vic2NyaWJlKFxuICAgICAgICAobWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChtYW5pZmVzdCkge1xuICAgICAgICAgICAgdGhpcy5pbnZlcnQgPSBtYW5pZmVzdC52aWV3aW5nRGlyZWN0aW9uID09PSBWaWV3aW5nRGlyZWN0aW9uLkxUUjtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5pbnRsLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2Uub25DYW52YXNHcm91cEluZGV4Q2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKGNhbnZhc0dyb3VwSW5kZXgpID0+IHtcbiAgICAgICAgICB0aGlzLmNvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZS51cGRhdGUoY2FudmFzR3JvdXBJbmRleCk7XG4gICAgICAgICAgdGhpcy5pc0hpdE9uQWN0aXZlQ2FudmFzR3JvdXAgPVxuICAgICAgICAgICAgdGhpcy5jb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2UuZ2V0SGl0T25BY3RpdmVDYW52YXNHcm91cCgpO1xuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlLmRlc3Ryb3koKTtcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgfVxuXG4gIGdvVG9OZXh0SGl0KCkge1xuICAgIHRoaXMuY29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlLmdvVG9OZXh0SGl0KCk7XG4gIH1cblxuICBnb1RvUHJldmlvdXNIaXQoKSB7XG4gICAgdGhpcy5jb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2UuZ29Ub1ByZXZpb3VzSGl0KCk7XG4gIH1cbn1cbiIsIjxtYXQtdG9vbGJhciBjbGFzcz1cImNvbnRlbnQtc2VhcmNoLW5hdmlnYXRvci10b29sYmFyXCIgY29sb3I9XCJwcmltYXJ5XCI+XG4gIDxkaXZcbiAgICAqbmdJZj1cInNlYXJjaFJlc3VsdFwiXG4gICAgZnhMYXlvdXQ9XCJyb3dcIlxuICAgIGZ4RmxleFxuICAgIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIGNlbnRlclwiXG4gID5cbiAgICA8ZGl2PlxuICAgICAgPGJ1dHRvblxuICAgICAgICBpZD1cImZvb3Rlck5hdmlnYXRlQ2xvc2VIaXRzQnV0dG9uXCJcbiAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW50bC5jbG9zZUxhYmVsXCJcbiAgICAgICAgW21hdFRvb2x0aXBdPVwiaW50bC5jbG9zZUxhYmVsXCJcbiAgICAgICAgbWF0VG9vbHRpcFBvc2l0aW9uPVwiYWJvdmVcIlxuICAgICAgICAoY2xpY2spPVwiY2xlYXIoKVwiXG4gICAgICA+XG4gICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICBmeEZsZXhcbiAgICAgIGNsYXNzPVwiY3VycmVudC1oaXQtbGFiZWxcIlxuICAgICAgW25nQ2xhc3NdPVwieyAnbm90LW9uLXBhZ2UnOiAhaXNIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwIH1cIlxuICAgICAgW2lubmVySFRNTF09XCJpbnRsLmN1cnJlbnRIaXRMYWJlbChjdXJyZW50SGl0ICsgMSwgc2VhcmNoUmVzdWx0LnNpemUoKSlcIlxuICAgID48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibmF2aWdhdGlvbi1idXR0b25zXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaW52ZXJ0XCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBpZD1cImZvb3Rlck5hdmlnYXRlUHJldmlvdXNIaXRCdXR0b25cIlxuICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW50bC5wcmV2aW91c0hpdExhYmVsXCJcbiAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLnByZXZpb3VzSGl0TGFiZWxcIlxuICAgICAgICAgIG1hdFRvb2x0aXBQb3NpdGlvbj1cImFib3ZlXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNGaXJzdEhpdFwiXG4gICAgICAgICAgKGNsaWNrKT1cImdvVG9QcmV2aW91c0hpdCgpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxtYXQtaWNvbj5uYXZpZ2F0ZV9iZWZvcmU8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGlkPVwiZm9vdGVyTmF2aWdhdGVOZXh0SGl0QnV0dG9uXCJcbiAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImludGwubmV4dEhpdExhYmVsXCJcbiAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLm5leHRIaXRMYWJlbFwiXG4gICAgICAgICAgbWF0VG9vbHRpcFBvc2l0aW9uPVwiYWJvdmVcIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCJpc0xhc3RIaXRcIlxuICAgICAgICAgIChjbGljayk9XCJnb1RvTmV4dEhpdCgpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxtYXQtaWNvbj5uYXZpZ2F0ZV9uZXh0PC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaW52ZXJ0XCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBpZD1cImZvb3Rlck5hdmlnYXRlTmV4dEhpdEJ1dHRvblwiXG4gICAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpbnRsLm5leHRIaXRMYWJlbFwiXG4gICAgICAgICAgW21hdFRvb2x0aXBdPVwiaW50bC5uZXh0SGl0TGFiZWxcIlxuICAgICAgICAgIG1hdFRvb2x0aXBQb3NpdGlvbj1cImFib3ZlXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNMYXN0SGl0XCJcbiAgICAgICAgICAoY2xpY2spPVwiZ29Ub05leHRIaXQoKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bWF0LWljb24+bmF2aWdhdGVfYmVmb3JlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBpZD1cImZvb3Rlck5hdmlnYXRlUHJldmlvdXNIaXRCdXR0b25cIlxuICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW50bC5wcmV2aW91c0hpdExhYmVsXCJcbiAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLnByZXZpb3VzSGl0TGFiZWxcIlxuICAgICAgICAgIG1hdFRvb2x0aXBQb3NpdGlvbj1cImFib3ZlXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNGaXJzdEhpdFwiXG4gICAgICAgICAgKGNsaWNrKT1cImdvVG9QcmV2aW91c0hpdCgpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxtYXQtaWNvbj5uYXZpZ2F0ZV9uZXh0PC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L21hdC10b29sYmFyPlxuIl19