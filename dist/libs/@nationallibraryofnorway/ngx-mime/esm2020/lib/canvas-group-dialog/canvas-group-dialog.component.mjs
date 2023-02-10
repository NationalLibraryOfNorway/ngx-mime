import { ChangeDetectionStrategy, ChangeDetectorRef, Component, } from '@angular/core';
import { FormBuilder, FormControl, Validators, } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { MimeViewerIntl } from '../core/intl';
import { ViewerService } from '../core/viewer-service/viewer.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "@angular/forms";
import * as i3 from "../core/viewer-service/viewer.service";
import * as i4 from "../core/canvas-service/canvas-service";
import * as i5 from "../core/intl";
import * as i6 from "@angular/common";
import * as i7 from "@angular/flex-layout/flex";
import * as i8 from "@angular/material/button";
import * as i9 from "@angular/material/input";
import * as i10 from "@angular/material/form-field";
function CanvasGroupDialogComponent_mat_error_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-error");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.intl.pageDoesNotExists);
} }
export class CanvasGroupDialogComponent {
    constructor(dialogRef, fb, viewerService, canvasService, intl, changeDetectorRef) {
        this.dialogRef = dialogRef;
        this.fb = fb;
        this.viewerService = viewerService;
        this.canvasService = canvasService;
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.subscriptions = new Subscription();
        this.numberOfCanvases = this.canvasService.numberOfCanvases;
        this.canvasGroupForm = this.fb.group({
            canvasGroupControl: new FormControl(null, [
                Validators.required,
                Validators.min(1),
                Validators.max(this.numberOfCanvases),
            ]),
        });
    }
    get canvasGroupControl() {
        return this.canvasGroupForm.get('canvasGroupControl');
    }
    ngOnInit() {
        this.subscriptions.add(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    onSubmit() {
        if (this.canvasGroupForm.valid) {
            const pageNumber = this.canvasGroupControl?.value;
            if (pageNumber !== null && pageNumber !== undefined)
                this.viewerService.goToCanvasGroup(this.canvasService.findCanvasGroupByCanvasIndex(pageNumber - 1), false);
            this.dialogRef.close();
        }
    }
}
CanvasGroupDialogComponent.ɵfac = function CanvasGroupDialogComponent_Factory(t) { return new (t || CanvasGroupDialogComponent)(i0.ɵɵdirectiveInject(i1.MatDialogRef), i0.ɵɵdirectiveInject(i2.FormBuilder), i0.ɵɵdirectiveInject(i3.ViewerService), i0.ɵɵdirectiveInject(i4.CanvasService), i0.ɵɵdirectiveInject(i5.MimeViewerIntl), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
CanvasGroupDialogComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CanvasGroupDialogComponent, selectors: [["ng-component"]], decls: 15, vars: 6, consts: [["fxLayout", "column"], ["mat-dialog-title", "", 1, "canvas-group-dialog-title"], ["mat-dialog-content", ""], ["novalidate", "", "autocomplete", "off", 3, "formGroup", "ngSubmit"], [3, "floatLabel"], ["type", "number", "matInput", "", "min", "1", "formControlName", "canvasGroupControl", 1, "go-to-canvas-group-input"], [4, "ngIf"], ["fxLayout", "row", "fxLayoutAlign", "end center"], ["type", "button", "mat-button", "", "matDialogClose", ""], ["type", "submit", "mat-button", "", 3, "disabled"]], template: function CanvasGroupDialogComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "h1", 1);
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "div", 2)(4, "form", 3);
        i0.ɵɵlistener("ngSubmit", function CanvasGroupDialogComponent_Template_form_ngSubmit_4_listener() { return ctx.onSubmit(); });
        i0.ɵɵelementStart(5, "mat-form-field", 4)(6, "mat-label");
        i0.ɵɵtext(7);
        i0.ɵɵelementEnd();
        i0.ɵɵelement(8, "input", 5);
        i0.ɵɵtemplate(9, CanvasGroupDialogComponent_mat_error_9_Template, 2, 1, "mat-error", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(10, "div", 7)(11, "button", 8);
        i0.ɵɵtext(12, " CANCEL ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "button", 9);
        i0.ɵɵtext(14, " OK ");
        i0.ɵɵelementEnd()()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.intl.goToPageLabel);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("formGroup", ctx.canvasGroupForm);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("floatLabel", "always");
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.intl.enterPageNumber);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.canvasGroupControl == null ? null : ctx.canvasGroupControl.errors == null ? null : ctx.canvasGroupControl.errors["max"]);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("disabled", ctx.canvasGroupForm.pristine || ctx.canvasGroupForm.invalid);
    } }, dependencies: [i6.NgIf, i7.DefaultLayoutDirective, i7.DefaultLayoutAlignDirective, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MinValidator, i2.FormGroupDirective, i2.FormControlName, i8.MatButton, i1.MatDialogClose, i1.MatDialogTitle, i1.MatDialogContent, i9.MatInput, i10.MatFormField, i10.MatLabel, i10.MatError], styles: [".canvas-group-dialog-title[_ngcontent-%COMP%]{margin:0 0 20px;display:block}"], changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CanvasGroupDialogComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, template: "<div fxLayout=\"column\">\n  <h1 class=\"canvas-group-dialog-title\" mat-dialog-title>{{\n    intl.goToPageLabel\n  }}</h1>\n  <div mat-dialog-content>\n    <form\n      [formGroup]=\"canvasGroupForm\"\n      (ngSubmit)=\"onSubmit()\"\n      novalidate\n      autocomplete=\"off\"\n    >\n      <mat-form-field [floatLabel]=\"'always'\">\n        <mat-label>{{ intl.enterPageNumber }}</mat-label>\n        <input\n          class=\"go-to-canvas-group-input\"\n          type=\"number\"\n          matInput\n          min=\"1\"\n          formControlName=\"canvasGroupControl\"\n        />\n        <mat-error *ngIf=\"canvasGroupControl?.errors?.['max']\">{{\n          intl.pageDoesNotExists\n        }}</mat-error>\n      </mat-form-field>\n      <div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n        <button type=\"button\" mat-button matDialogClose> CANCEL </button>\n        <button\n          type=\"submit\"\n          mat-button\n          [disabled]=\"canvasGroupForm.pristine || canvasGroupForm.invalid\"\n        >\n          OK\n        </button>\n      </div>\n    </form>\n  </div>\n</div>\n", styles: [".canvas-group-dialog-title{margin:0 0 20px;display:block}\n"] }]
    }], function () { return [{ type: i1.MatDialogRef }, { type: i2.FormBuilder }, { type: i3.ViewerService }, { type: i4.CanvasService }, { type: i5.MimeViewerIntl }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLWdyb3VwLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY2FudmFzLWdyb3VwLWRpYWxvZy9jYW52YXMtZ3JvdXAtZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jYW52YXMtZ3JvdXAtZGlhbG9nL2NhbnZhcy1ncm91cC1kaWFsb2cuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxHQUdWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxXQUFXLEVBQ1gsV0FBVyxFQUVYLFVBQVUsR0FDWCxNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7Ozs7Ozs7Ozs7OztJQ0c5RCxpQ0FBdUQ7SUFBQSxZQUVyRDtJQUFBLGlCQUFZOzs7SUFGeUMsZUFFckQ7SUFGcUQsbURBRXJEOztBREVWLE1BQU0sT0FBTywwQkFBMEI7SUFPckMsWUFDVSxTQUFtRCxFQUNuRCxFQUFlLEVBQ2YsYUFBNEIsRUFDNUIsYUFBNEIsRUFDN0IsSUFBb0IsRUFDbkIsaUJBQW9DO1FBTHBDLGNBQVMsR0FBVCxTQUFTLENBQTBDO1FBQ25ELE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM3QixTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUNuQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBUnRDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVV6QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM1RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25DLGtCQUFrQixFQUFFLElBQUksV0FBVyxDQUFnQixJQUFJLEVBQUU7Z0JBQ3ZELFVBQVUsQ0FBQyxRQUFRO2dCQUNuQixVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7YUFDdEMsQ0FBQztTQUNILENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLGtCQUFrQjtRQUNwQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUN6RSxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRTtZQUM5QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDO1lBQ2xELElBQUksVUFBVSxLQUFLLElBQUksSUFBSSxVQUFVLEtBQUssU0FBUztnQkFDakQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUMvRCxLQUFLLENBQ04sQ0FBQztZQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDOztvR0FqRFUsMEJBQTBCOzZFQUExQiwwQkFBMEI7UUN4QnZDLDhCQUF1QixZQUFBO1FBQ2tDLFlBRXJEO1FBQUEsaUJBQUs7UUFDUCw4QkFBd0IsY0FBQTtRQUdwQiwyR0FBWSxjQUFVLElBQUM7UUFJdkIseUNBQXdDLGdCQUFBO1FBQzNCLFlBQTBCO1FBQUEsaUJBQVk7UUFDakQsMkJBTUU7UUFDRix1RkFFYztRQUNoQixpQkFBaUI7UUFDakIsK0JBQStDLGlCQUFBO1FBQ0kseUJBQU87UUFBQSxpQkFBUztRQUNqRSxrQ0FJQztRQUNDLHFCQUNGO1FBQUEsaUJBQVMsRUFBQSxFQUFBLEVBQUEsRUFBQTs7UUEvQndDLGVBRXJEO1FBRnFELDRDQUVyRDtRQUdFLGVBQTZCO1FBQTdCLCtDQUE2QjtRQUtiLGVBQXVCO1FBQXZCLHFDQUF1QjtRQUMxQixlQUEwQjtRQUExQiw4Q0FBMEI7UUFRekIsZUFBeUM7UUFBekMsa0pBQXlDO1FBU25ELGVBQWdFO1FBQWhFLHNGQUFnRTs7dUZETDdELDBCQUEwQjtjQUx0QyxTQUFTO2tDQUdTLHVCQUF1QixDQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRm9ybUJ1aWxkZXIsXG4gIEZvcm1Db250cm9sLFxuICBGb3JtR3JvdXAsXG4gIFZhbGlkYXRvcnMsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLi9jb3JlL2NhbnZhcy1zZXJ2aWNlL2NhbnZhcy1zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vY29yZS9pbnRsJztcbmltcG9ydCB7IFZpZXdlclNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3ZpZXdlci1zZXJ2aWNlL3ZpZXdlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAnLi9jYW52YXMtZ3JvdXAtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FudmFzLWdyb3VwLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FudmFzR3JvdXBEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIG51bWJlck9mQ2FudmFzZXM6IG51bWJlcjtcbiAgY2FudmFzR3JvdXBGb3JtOiBGb3JtR3JvdXA8e1xuICAgIGNhbnZhc0dyb3VwQ29udHJvbDogRm9ybUNvbnRyb2w8bnVtYmVyIHwgbnVsbD47XG4gIH0+O1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxDYW52YXNHcm91cERpYWxvZ0NvbXBvbmVudD4sXG4gICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSB2aWV3ZXJTZXJ2aWNlOiBWaWV3ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgdGhpcy5udW1iZXJPZkNhbnZhc2VzID0gdGhpcy5jYW52YXNTZXJ2aWNlLm51bWJlck9mQ2FudmFzZXM7XG4gICAgdGhpcy5jYW52YXNHcm91cEZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwQ29udHJvbDogbmV3IEZvcm1Db250cm9sPG51bWJlciB8IG51bGw+KG51bGwsIFtcbiAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcbiAgICAgICAgVmFsaWRhdG9ycy5taW4oMSksXG4gICAgICAgIFZhbGlkYXRvcnMubWF4KHRoaXMubnVtYmVyT2ZDYW52YXNlcyksXG4gICAgICBdKSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBjYW52YXNHcm91cENvbnRyb2woKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzR3JvdXBGb3JtLmdldCgnY2FudmFzR3JvdXBDb250cm9sJyk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5pbnRsLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgb25TdWJtaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FudmFzR3JvdXBGb3JtLnZhbGlkKSB7XG4gICAgICBjb25zdCBwYWdlTnVtYmVyID0gdGhpcy5jYW52YXNHcm91cENvbnRyb2w/LnZhbHVlO1xuICAgICAgaWYgKHBhZ2VOdW1iZXIgIT09IG51bGwgJiYgcGFnZU51bWJlciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0NhbnZhc0dyb3VwKFxuICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KHBhZ2VOdW1iZXIgLSAxKSxcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgPGgxIGNsYXNzPVwiY2FudmFzLWdyb3VwLWRpYWxvZy10aXRsZVwiIG1hdC1kaWFsb2ctdGl0bGU+e3tcbiAgICBpbnRsLmdvVG9QYWdlTGFiZWxcbiAgfX08L2gxPlxuICA8ZGl2IG1hdC1kaWFsb2ctY29udGVudD5cbiAgICA8Zm9ybVxuICAgICAgW2Zvcm1Hcm91cF09XCJjYW52YXNHcm91cEZvcm1cIlxuICAgICAgKG5nU3VibWl0KT1cIm9uU3VibWl0KClcIlxuICAgICAgbm92YWxpZGF0ZVxuICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICA+XG4gICAgICA8bWF0LWZvcm0tZmllbGQgW2Zsb2F0TGFiZWxdPVwiJ2Fsd2F5cydcIj5cbiAgICAgICAgPG1hdC1sYWJlbD57eyBpbnRsLmVudGVyUGFnZU51bWJlciB9fTwvbWF0LWxhYmVsPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBjbGFzcz1cImdvLXRvLWNhbnZhcy1ncm91cC1pbnB1dFwiXG4gICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgbWF0SW5wdXRcbiAgICAgICAgICBtaW49XCIxXCJcbiAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJjYW52YXNHcm91cENvbnRyb2xcIlxuICAgICAgICAvPlxuICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiY2FudmFzR3JvdXBDb250cm9sPy5lcnJvcnM/LlsnbWF4J11cIj57e1xuICAgICAgICAgIGludGwucGFnZURvZXNOb3RFeGlzdHNcbiAgICAgICAgfX08L21hdC1lcnJvcj5cbiAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWJ1dHRvbiBtYXREaWFsb2dDbG9zZT4gQ0FOQ0VMIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgbWF0LWJ1dHRvblxuICAgICAgICAgIFtkaXNhYmxlZF09XCJjYW52YXNHcm91cEZvcm0ucHJpc3RpbmUgfHwgY2FudmFzR3JvdXBGb3JtLmludmFsaWRcIlxuICAgICAgICA+XG4gICAgICAgICAgT0tcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=