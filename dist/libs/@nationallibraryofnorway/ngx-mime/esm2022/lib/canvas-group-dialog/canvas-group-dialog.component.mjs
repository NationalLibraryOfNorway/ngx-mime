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
import * as i6 from "@angular/material/button";
import * as i7 from "@angular/material/input";
import * as i8 from "@angular/material/form-field";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: CanvasGroupDialogComponent, deps: [{ token: i1.MatDialogRef }, { token: i2.FormBuilder }, { token: i3.ViewerService }, { token: i4.CanvasService }, { token: i5.MimeViewerIntl }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.9", type: CanvasGroupDialogComponent, selector: "ng-component", ngImport: i0, template: "<h1 class=\"canvas-group-dialog-title\" mat-dialog-title>{{\n  intl.goToPageLabel\n}}</h1>\n<form\n  [formGroup]=\"canvasGroupForm\"\n  (ngSubmit)=\"onSubmit()\"\n  novalidate\n  autocomplete=\"off\"\n>\n  <div mat-dialog-content>\n    <mat-form-field [floatLabel]=\"'always'\">\n      <mat-label>{{ intl.enterPageNumber }}</mat-label>\n      <input\n        class=\"go-to-canvas-group-input\"\n        type=\"number\"\n        matInput\n        min=\"1\"\n        formControlName=\"canvasGroupControl\"\n      />\n      @if (canvasGroupControl?.errors?.['max']) {\n        <mat-error>{{ intl.pageDoesNotExists }}</mat-error>\n      }\n    </mat-form-field>\n  </div>\n  <div mat-dialog-actions [align]=\"'end'\">\n    <button type=\"button\" mat-button matDialogClose>CANCEL</button>\n    <button\n      type=\"submit\"\n      mat-button\n      [disabled]=\"canvasGroupForm.pristine || canvasGroupForm.invalid\"\n      >OK</button\n    >\n  </div>\n</form>\n", styles: [".canvas-group-dialog-title{margin:0 0 20px;display:block}\n"], dependencies: [{ kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.MinValidator, selector: "input[type=number][min][formControlName],input[type=number][min][formControl],input[type=number][min][ngModel]", inputs: ["min"] }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i6.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "directive", type: i1.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i8.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i8.MatLabel, selector: "mat-label" }, { kind: "directive", type: i8.MatError, selector: "mat-error, [matError]", inputs: ["id"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: CanvasGroupDialogComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, template: "<h1 class=\"canvas-group-dialog-title\" mat-dialog-title>{{\n  intl.goToPageLabel\n}}</h1>\n<form\n  [formGroup]=\"canvasGroupForm\"\n  (ngSubmit)=\"onSubmit()\"\n  novalidate\n  autocomplete=\"off\"\n>\n  <div mat-dialog-content>\n    <mat-form-field [floatLabel]=\"'always'\">\n      <mat-label>{{ intl.enterPageNumber }}</mat-label>\n      <input\n        class=\"go-to-canvas-group-input\"\n        type=\"number\"\n        matInput\n        min=\"1\"\n        formControlName=\"canvasGroupControl\"\n      />\n      @if (canvasGroupControl?.errors?.['max']) {\n        <mat-error>{{ intl.pageDoesNotExists }}</mat-error>\n      }\n    </mat-form-field>\n  </div>\n  <div mat-dialog-actions [align]=\"'end'\">\n    <button type=\"button\" mat-button matDialogClose>CANCEL</button>\n    <button\n      type=\"submit\"\n      mat-button\n      [disabled]=\"canvasGroupForm.pristine || canvasGroupForm.invalid\"\n      >OK</button\n    >\n  </div>\n</form>\n", styles: [".canvas-group-dialog-title{margin:0 0 20px;display:block}\n"] }]
        }], ctorParameters: () => [{ type: i1.MatDialogRef }, { type: i2.FormBuilder }, { type: i3.ViewerService }, { type: i4.CanvasService }, { type: i5.MimeViewerIntl }, { type: i0.ChangeDetectorRef }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLWdyb3VwLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY2FudmFzLWdyb3VwLWRpYWxvZy9jYW52YXMtZ3JvdXAtZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jYW52YXMtZ3JvdXAtZGlhbG9nL2NhbnZhcy1ncm91cC1kaWFsb2cuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxHQUdWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxXQUFXLEVBQ1gsV0FBVyxFQUVYLFVBQVUsR0FDWCxNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7Ozs7Ozs7OztBQU90RSxNQUFNLE9BQU8sMEJBQTBCO0lBT3JDLFlBQ21CLFNBQW1ELEVBQ25ELEVBQWUsRUFDZixhQUE0QixFQUM1QixhQUE0QixFQUM3QixJQUFvQixFQUNuQixpQkFBb0M7UUFMcEMsY0FBUyxHQUFULFNBQVMsQ0FBMEM7UUFDbkQsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNmLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzdCLFNBQUksR0FBSixJQUFJLENBQWdCO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFSdEMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBVWxELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO1FBQzVELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbkMsa0JBQWtCLEVBQUUsSUFBSSxXQUFXLENBQWdCLElBQUksRUFBRTtnQkFDdkQsVUFBVSxDQUFDLFFBQVE7Z0JBQ25CLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQzthQUN0QyxDQUFDO1NBQ0gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQ3pFLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDL0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQztZQUNsRCxJQUFJLFVBQVUsS0FBSyxJQUFJLElBQUksVUFBVSxLQUFLLFNBQVM7Z0JBQ2pELElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFDL0QsS0FBSyxDQUNOLENBQUM7WUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pCLENBQUM7SUFDSCxDQUFDOzhHQWpEVSwwQkFBMEI7a0dBQTFCLDBCQUEwQixvREN4QnZDLGk4QkFrQ0E7OzJGRFZhLDBCQUEwQjtrQkFMdEMsU0FBUztzQ0FHUyx1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEZvcm1CdWlsZGVyLFxuICBGb3JtQ29udHJvbCxcbiAgRm9ybUdyb3VwLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4uL2NvcmUvaW50bCc7XG5pbXBvcnQgeyBWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJy4vY2FudmFzLWdyb3VwLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhbnZhcy1ncm91cC1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENhbnZhc0dyb3VwRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBudW1iZXJPZkNhbnZhc2VzOiBudW1iZXI7XG4gIGNhbnZhc0dyb3VwRm9ybTogRm9ybUdyb3VwPHtcbiAgICBjYW52YXNHcm91cENvbnRyb2w6IEZvcm1Db250cm9sPG51bWJlciB8IG51bGw+O1xuICB9PjtcbiAgcHJpdmF0ZSByZWFkb25seSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8Q2FudmFzR3JvdXBEaWFsb2dDb21wb25lbnQ+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgdmlld2VyU2VydmljZTogVmlld2VyU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhbnZhc1NlcnZpY2U6IENhbnZhc1NlcnZpY2UsXG4gICAgcHVibGljIHJlYWRvbmx5IGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHtcbiAgICB0aGlzLm51bWJlck9mQ2FudmFzZXMgPSB0aGlzLmNhbnZhc1NlcnZpY2UubnVtYmVyT2ZDYW52YXNlcztcbiAgICB0aGlzLmNhbnZhc0dyb3VwRm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgY2FudmFzR3JvdXBDb250cm9sOiBuZXcgRm9ybUNvbnRyb2w8bnVtYmVyIHwgbnVsbD4obnVsbCwgW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBWYWxpZGF0b3JzLm1pbigxKSxcbiAgICAgICAgVmFsaWRhdG9ycy5tYXgodGhpcy5udW1iZXJPZkNhbnZhc2VzKSxcbiAgICAgIF0pLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGNhbnZhc0dyb3VwQ29udHJvbCgpIHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNHcm91cEZvcm0uZ2V0KCdjYW52YXNHcm91cENvbnRyb2wnKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmludGwuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSksXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgb25TdWJtaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FudmFzR3JvdXBGb3JtLnZhbGlkKSB7XG4gICAgICBjb25zdCBwYWdlTnVtYmVyID0gdGhpcy5jYW52YXNHcm91cENvbnRyb2w/LnZhbHVlO1xuICAgICAgaWYgKHBhZ2VOdW1iZXIgIT09IG51bGwgJiYgcGFnZU51bWJlciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0NhbnZhc0dyb3VwKFxuICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KHBhZ2VOdW1iZXIgLSAxKSxcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgKTtcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgfVxuICB9XG59XG4iLCI8aDEgY2xhc3M9XCJjYW52YXMtZ3JvdXAtZGlhbG9nLXRpdGxlXCIgbWF0LWRpYWxvZy10aXRsZT57e1xuICBpbnRsLmdvVG9QYWdlTGFiZWxcbn19PC9oMT5cbjxmb3JtXG4gIFtmb3JtR3JvdXBdPVwiY2FudmFzR3JvdXBGb3JtXCJcbiAgKG5nU3VibWl0KT1cIm9uU3VibWl0KClcIlxuICBub3ZhbGlkYXRlXG4gIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4+XG4gIDxkaXYgbWF0LWRpYWxvZy1jb250ZW50PlxuICAgIDxtYXQtZm9ybS1maWVsZCBbZmxvYXRMYWJlbF09XCInYWx3YXlzJ1wiPlxuICAgICAgPG1hdC1sYWJlbD57eyBpbnRsLmVudGVyUGFnZU51bWJlciB9fTwvbWF0LWxhYmVsPlxuICAgICAgPGlucHV0XG4gICAgICAgIGNsYXNzPVwiZ28tdG8tY2FudmFzLWdyb3VwLWlucHV0XCJcbiAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgIG1hdElucHV0XG4gICAgICAgIG1pbj1cIjFcIlxuICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJjYW52YXNHcm91cENvbnRyb2xcIlxuICAgICAgLz5cbiAgICAgIEBpZiAoY2FudmFzR3JvdXBDb250cm9sPy5lcnJvcnM/LlsnbWF4J10pIHtcbiAgICAgICAgPG1hdC1lcnJvcj57eyBpbnRsLnBhZ2VEb2VzTm90RXhpc3RzIH19PC9tYXQtZXJyb3I+XG4gICAgICB9XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgPC9kaXY+XG4gIDxkaXYgbWF0LWRpYWxvZy1hY3Rpb25zIFthbGlnbl09XCInZW5kJ1wiPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b24gbWF0RGlhbG9nQ2xvc2U+Q0FOQ0VMPC9idXR0b24+XG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICBtYXQtYnV0dG9uXG4gICAgICBbZGlzYWJsZWRdPVwiY2FudmFzR3JvdXBGb3JtLnByaXN0aW5lIHx8IGNhbnZhc0dyb3VwRm9ybS5pbnZhbGlkXCJcbiAgICAgID5PSzwvYnV0dG9uXG4gICAgPlxuICA8L2Rpdj5cbjwvZm9ybT5cbiJdfQ==