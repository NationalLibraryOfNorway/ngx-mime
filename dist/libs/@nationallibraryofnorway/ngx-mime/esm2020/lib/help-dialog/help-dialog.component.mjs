import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/flex-layout";
import * as i2 from "../core/intl";
import * as i3 from "../core/mime-resize-service/mime-resize.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/flex-layout/flex";
import * as i6 from "@angular/flex-layout/extended";
import * as i7 from "@angular/material/toolbar";
import * as i8 from "@angular/material/button";
import * as i9 from "@angular/material/icon";
import * as i10 from "@angular/material/tooltip";
import * as i11 from "@angular/material/dialog";
function HelpDialogComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "mat-toolbar", 6)(2, "div", 7)(3, "button", 8)(4, "mat-icon");
    i0.ɵɵtext(5, "close");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h1", 9);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("aria-label", ctx_r0.intl.helpCloseAriaLabel)("matTooltip", ctx_r0.intl.closeLabel)("matDialogClose", true);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.intl.help.helpLabel);
} }
function HelpDialogComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "mat-toolbar")(2, "div", 10)(3, "h1", 11);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 8)(6, "mat-icon");
    i0.ɵɵtext(7, "close");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.intl.help.helpLabel);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("aria-label", ctx_r1.intl.helpCloseAriaLabel)("matTooltip", ctx_r1.intl.closeLabel)("matDialogClose", true);
} }
export class HelpDialogComponent {
    constructor(mediaObserver, intl, cdr, mimeResizeService) {
        this.mediaObserver = mediaObserver;
        this.intl = intl;
        this.cdr = cdr;
        this.mimeResizeService = mimeResizeService;
        this.tabHeight = {};
        this.mimeHeight = 0;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe((dimensions) => {
            this.mimeHeight = dimensions.height;
            this.resizeTabHeight();
        }));
        this.resizeTabHeight();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
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
        this.cdr.detectChanges();
    }
}
HelpDialogComponent.ɵfac = function HelpDialogComponent_Factory(t) { return new (t || HelpDialogComponent)(i0.ɵɵdirectiveInject(i1.MediaObserver), i0.ɵɵdirectiveInject(i2.MimeViewerIntl), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i3.MimeResizeService)); };
HelpDialogComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HelpDialogComponent, selectors: [["mime-help"]], decls: 17, vars: 15, consts: [[1, "help-container"], [3, "ngSwitch"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], ["tabindex", "0", 1, "help-content", 3, "ngStyle"], [3, "innerHTML"], ["color", "primary"], ["fxLayout", "row", "fxLayoutAlign", "start center"], ["mat-icon-button", "", 3, "aria-label", "matTooltip", "matDialogClose"], ["mat-dialog-title", ""], ["fxLayout", "row", "fxLayoutAlign", "space-between center", "fxFlex", ""], ["mat-dialog-title", "", 1, "heading-desktop"]], template: function HelpDialogComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
        i0.ɵɵtemplate(2, HelpDialogComponent_div_2_Template, 8, 4, "div", 2);
        i0.ɵɵtemplate(3, HelpDialogComponent_div_3_Template, 8, 4, "div", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "mat-dialog-content", 4);
        i0.ɵɵelement(5, "p", 5)(6, "p", 5)(7, "p", 5)(8, "p", 5)(9, "p", 5)(10, "p", 5)(11, "p", 5)(12, "p", 5)(13, "p", 5)(14, "p", 5)(15, "p", 5)(16, "p", 5);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitch", ctx.mediaObserver.isActive("lt-md"));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", true);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngStyle", ctx.tabHeight);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", ctx.intl.help.line1, i0.ɵɵsanitizeHtml);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", ctx.intl.help.line2, i0.ɵɵsanitizeHtml);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", ctx.intl.help.line3, i0.ɵɵsanitizeHtml);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", ctx.intl.help.line4, i0.ɵɵsanitizeHtml);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", ctx.intl.help.line5, i0.ɵɵsanitizeHtml);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", ctx.intl.help.line6, i0.ɵɵsanitizeHtml);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", ctx.intl.help.line12, i0.ɵɵsanitizeHtml);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", ctx.intl.help.line7, i0.ɵɵsanitizeHtml);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", ctx.intl.help.line8, i0.ɵɵsanitizeHtml);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", ctx.intl.help.line9, i0.ɵɵsanitizeHtml);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", ctx.intl.help.line10, i0.ɵɵsanitizeHtml);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", ctx.intl.help.line11, i0.ɵɵsanitizeHtml);
    } }, dependencies: [i4.NgStyle, i4.NgSwitch, i4.NgSwitchCase, i4.NgSwitchDefault, i5.DefaultLayoutDirective, i5.DefaultLayoutAlignDirective, i5.DefaultFlexDirective, i6.DefaultStyleDirective, i7.MatToolbar, i8.MatIconButton, i9.MatIcon, i10.MatTooltip, i11.MatDialogClose, i11.MatDialogTitle, i11.MatDialogContent], styles: [".mat-mdc-dialog-title[_ngcontent-%COMP%]{color:inherit;padding:0 2px 16px}.help-container[_ngcontent-%COMP%]{font-family:Roboto,Helvetica Neue,sans-serif;font-size:14px}.help-content[_ngcontent-%COMP%]{padding:16px;overflow:auto}  .help-panel>.mat-mdc-dialog-container{padding:0!important;overflow:initial}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpDialogComponent, [{
        type: Component,
        args: [{ selector: 'mime-help', template: "<div class=\"help-container\">\n  <div [ngSwitch]=\"mediaObserver.isActive('lt-md')\">\n    <div *ngSwitchCase=\"true\">\n      <mat-toolbar color=\"primary\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n          <button\n            mat-icon-button\n            [aria-label]=\"intl.helpCloseAriaLabel\"\n            [matTooltip]=\"intl.closeLabel\"\n            [matDialogClose]=\"true\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n          <h1 mat-dialog-title>{{ intl.help.helpLabel }}</h1>\n        </div>\n      </mat-toolbar>\n    </div>\n    <div *ngSwitchDefault>\n      <mat-toolbar>\n        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex>\n          <h1 class=\"heading-desktop\" mat-dialog-title>{{\n            intl.help.helpLabel\n          }}</h1>\n          <button\n            mat-icon-button\n            [aria-label]=\"intl.helpCloseAriaLabel\"\n            [matTooltip]=\"intl.closeLabel\"\n            [matDialogClose]=\"true\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n        </div>\n      </mat-toolbar>\n    </div>\n  </div>\n  <mat-dialog-content [ngStyle]=\"tabHeight\" class=\"help-content\" tabindex=\"0\">\n    <p [innerHTML]=\"intl.help.line1\"></p>\n    <p [innerHTML]=\"intl.help.line2\"></p>\n    <p [innerHTML]=\"intl.help.line3\"></p>\n    <p [innerHTML]=\"intl.help.line4\"></p>\n    <p [innerHTML]=\"intl.help.line5\"></p>\n    <p [innerHTML]=\"intl.help.line6\"></p>\n    <p [innerHTML]=\"intl.help.line12\"></p>\n    <p [innerHTML]=\"intl.help.line7\"></p>\n    <p [innerHTML]=\"intl.help.line8\"></p>\n    <p [innerHTML]=\"intl.help.line9\"></p>\n    <p [innerHTML]=\"intl.help.line10\"></p>\n    <p [innerHTML]=\"intl.help.line11\"></p>\n  </mat-dialog-content>\n</div>\n", styles: [".mat-mdc-dialog-title{color:inherit;padding:0 2px 16px}.help-container{font-family:Roboto,Helvetica Neue,sans-serif;font-size:14px}.help-content{padding:16px;overflow:auto}::ng-deep .help-panel>.mat-mdc-dialog-container{padding:0!important;overflow:initial}\n"] }]
    }], function () { return [{ type: i1.MediaObserver }, { type: i2.MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: i3.MimeResizeService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2hlbHAtZGlhbG9nL2hlbHAtZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9oZWxwLWRpYWxvZy9oZWxwLWRpYWxvZy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDOzs7Ozs7Ozs7Ozs7OztJQ0ZoRiwyQkFBMEIscUJBQUEsYUFBQSxnQkFBQSxlQUFBO0lBU1IscUJBQUs7SUFBQSxpQkFBVyxFQUFBO0lBRTVCLDZCQUFxQjtJQUFBLFlBQXlCO0lBQUEsaUJBQUssRUFBQSxFQUFBLEVBQUE7OztJQU5qRCxlQUFzQztJQUF0QywyREFBc0Msc0NBQUEsd0JBQUE7SUFNbkIsZUFBeUI7SUFBekIsZ0RBQXlCOzs7SUFJcEQsMkJBQXNCLGtCQUFBLGNBQUEsYUFBQTtJQUc2QixZQUUzQztJQUFBLGlCQUFLO0lBQ1AsaUNBS0MsZUFBQTtJQUNXLHFCQUFLO0lBQUEsaUJBQVcsRUFBQSxFQUFBLEVBQUEsRUFBQTs7O0lBVGlCLGVBRTNDO0lBRjJDLGdEQUUzQztJQUdBLGVBQXNDO0lBQXRDLDJEQUFzQyxzQ0FBQSx3QkFBQTs7QURibEQsTUFBTSxPQUFPLG1CQUFtQjtJQUs5QixZQUNTLGFBQTRCLEVBQzVCLElBQW9CLEVBQ25CLEdBQXNCLEVBQ3RCLGlCQUFvQztRQUhyQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUNuQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBUnZDLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZCxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2Ysa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBT3hDLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBc0IsRUFBRSxFQUFFO1lBQ25FLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUNwQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVPLGVBQWU7UUFDckIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUU3QixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUc7Z0JBQ2YsU0FBUyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLElBQUk7YUFDM0MsQ0FBQztTQUNIO2FBQU07WUFDTCxNQUFNLElBQUksR0FBRyxDQUFDO1lBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRztnQkFDZixTQUFTLEVBQUUsTUFBTSxHQUFHLElBQUk7YUFDekIsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDOztzRkF6Q1UsbUJBQW1CO3NFQUFuQixtQkFBbUI7UUNaaEMsOEJBQTRCLGFBQUE7UUFFeEIsb0VBY007UUFDTixvRUFnQk07UUFDUixpQkFBTTtRQUNOLDZDQUE0RTtRQUMxRSx1QkFBcUMsV0FBQSxXQUFBLFdBQUEsV0FBQSxZQUFBLFlBQUEsWUFBQSxZQUFBLFlBQUEsWUFBQSxZQUFBO1FBWXZDLGlCQUFxQixFQUFBOztRQS9DaEIsZUFBNEM7UUFBNUMsOERBQTRDO1FBQ3pDLGVBQWtCO1FBQWxCLG1DQUFrQjtRQWlDTixlQUFxQjtRQUFyQix1Q0FBcUI7UUFDcEMsZUFBNkI7UUFBN0Isa0VBQTZCO1FBQzdCLGVBQTZCO1FBQTdCLGtFQUE2QjtRQUM3QixlQUE2QjtRQUE3QixrRUFBNkI7UUFDN0IsZUFBNkI7UUFBN0Isa0VBQTZCO1FBQzdCLGVBQTZCO1FBQTdCLGtFQUE2QjtRQUM3QixlQUE2QjtRQUE3QixrRUFBNkI7UUFDN0IsZUFBOEI7UUFBOUIsbUVBQThCO1FBQzlCLGVBQTZCO1FBQTdCLGtFQUE2QjtRQUM3QixlQUE2QjtRQUE3QixrRUFBNkI7UUFDN0IsZUFBNkI7UUFBN0Isa0VBQTZCO1FBQzdCLGVBQThCO1FBQTlCLG1FQUE4QjtRQUM5QixlQUE4QjtRQUE5QixtRUFBOEI7O3VGRG5DeEIsbUJBQW1CO2NBTC9CLFNBQVM7MkJBQ0UsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZWRpYU9ic2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4uL2NvcmUvaW50bCc7XG5pbXBvcnQgeyBNaW1lUmVzaXplU2VydmljZSB9IGZyb20gJy4uL2NvcmUvbWltZS1yZXNpemUtc2VydmljZS9taW1lLXJlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IERpbWVuc2lvbnMgfSBmcm9tICcuLi9jb3JlL21vZGVscy9kaW1lbnNpb25zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS1oZWxwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2hlbHAtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaGVscC1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgSGVscERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHVibGljIHRhYkhlaWdodCA9IHt9O1xuICBwcml2YXRlIG1pbWVIZWlnaHQgPSAwO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG1lZGlhT2JzZXJ2ZXI6IE1lZGlhT2JzZXJ2ZXIsXG4gICAgcHVibGljIGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIG1pbWVSZXNpemVTZXJ2aWNlOiBNaW1lUmVzaXplU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMubWltZVJlc2l6ZVNlcnZpY2Uub25SZXNpemUuc3Vic2NyaWJlKChkaW1lbnNpb25zOiBEaW1lbnNpb25zKSA9PiB7XG4gICAgICAgIHRoaXMubWltZUhlaWdodCA9IGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICB0aGlzLnJlc2l6ZVRhYkhlaWdodCgpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5yZXNpemVUYWJIZWlnaHQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNpemVUYWJIZWlnaHQoKSB7XG4gICAgbGV0IGhlaWdodCA9IHRoaXMubWltZUhlaWdodDtcblxuICAgIGlmICh0aGlzLm1lZGlhT2JzZXJ2ZXIuaXNBY3RpdmUoJ2x0LW1kJykpIHtcbiAgICAgIHRoaXMudGFiSGVpZ2h0ID0ge1xuICAgICAgICBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDEyOCArICdweCcsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWlnaHQgLT0gMjcyO1xuICAgICAgdGhpcy50YWJIZWlnaHQgPSB7XG4gICAgICAgIG1heEhlaWdodDogaGVpZ2h0ICsgJ3B4JyxcbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImhlbHAtY29udGFpbmVyXCI+XG4gIDxkaXYgW25nU3dpdGNoXT1cIm1lZGlhT2JzZXJ2ZXIuaXNBY3RpdmUoJ2x0LW1kJylcIj5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+XG4gICAgICA8bWF0LXRvb2xiYXIgY29sb3I9XCJwcmltYXJ5XCI+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICBbYXJpYS1sYWJlbF09XCJpbnRsLmhlbHBDbG9zZUFyaWFMYWJlbFwiXG4gICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLmNsb3NlTGFiZWxcIlxuICAgICAgICAgICAgW21hdERpYWxvZ0Nsb3NlXT1cInRydWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGgxIG1hdC1kaWFsb2ctdGl0bGU+e3sgaW50bC5oZWxwLmhlbHBMYWJlbCB9fTwvaDE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9tYXQtdG9vbGJhcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ1N3aXRjaERlZmF1bHQ+XG4gICAgICA8bWF0LXRvb2xiYXI+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIiBmeEZsZXg+XG4gICAgICAgICAgPGgxIGNsYXNzPVwiaGVhZGluZy1kZXNrdG9wXCIgbWF0LWRpYWxvZy10aXRsZT57e1xuICAgICAgICAgICAgaW50bC5oZWxwLmhlbHBMYWJlbFxuICAgICAgICAgIH19PC9oMT5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgIFthcmlhLWxhYmVsXT1cImludGwuaGVscENsb3NlQXJpYUxhYmVsXCJcbiAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwuY2xvc2VMYWJlbFwiXG4gICAgICAgICAgICBbbWF0RGlhbG9nQ2xvc2VdPVwidHJ1ZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L21hdC10b29sYmFyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPG1hdC1kaWFsb2ctY29udGVudCBbbmdTdHlsZV09XCJ0YWJIZWlnaHRcIiBjbGFzcz1cImhlbHAtY29udGVudFwiIHRhYmluZGV4PVwiMFwiPlxuICAgIDxwIFtpbm5lckhUTUxdPVwiaW50bC5oZWxwLmxpbmUxXCI+PC9wPlxuICAgIDxwIFtpbm5lckhUTUxdPVwiaW50bC5oZWxwLmxpbmUyXCI+PC9wPlxuICAgIDxwIFtpbm5lckhUTUxdPVwiaW50bC5oZWxwLmxpbmUzXCI+PC9wPlxuICAgIDxwIFtpbm5lckhUTUxdPVwiaW50bC5oZWxwLmxpbmU0XCI+PC9wPlxuICAgIDxwIFtpbm5lckhUTUxdPVwiaW50bC5oZWxwLmxpbmU1XCI+PC9wPlxuICAgIDxwIFtpbm5lckhUTUxdPVwiaW50bC5oZWxwLmxpbmU2XCI+PC9wPlxuICAgIDxwIFtpbm5lckhUTUxdPVwiaW50bC5oZWxwLmxpbmUxMlwiPjwvcD5cbiAgICA8cCBbaW5uZXJIVE1MXT1cImludGwuaGVscC5saW5lN1wiPjwvcD5cbiAgICA8cCBbaW5uZXJIVE1MXT1cImludGwuaGVscC5saW5lOFwiPjwvcD5cbiAgICA8cCBbaW5uZXJIVE1MXT1cImludGwuaGVscC5saW5lOVwiPjwvcD5cbiAgICA8cCBbaW5uZXJIVE1MXT1cImludGwuaGVscC5saW5lMTBcIj48L3A+XG4gICAgPHAgW2lubmVySFRNTF09XCJpbnRsLmhlbHAubGluZTExXCI+PC9wPlxuICA8L21hdC1kaWFsb2ctY29udGVudD5cbjwvZGl2PlxuIl19