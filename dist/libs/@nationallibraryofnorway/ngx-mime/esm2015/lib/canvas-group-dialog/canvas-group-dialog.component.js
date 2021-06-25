import { ChangeDetectionStrategy, ChangeDetectorRef, Component, } from '@angular/core';
import { FormBuilder, FormControl, Validators, } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { ViewerService } from '../core/viewer-service/viewer.service';
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
        this.createForm();
    }
    createForm() {
        this.canvasGroupControl = new FormControl('', [
            Validators.required,
            Validators.min(1),
            Validators.max(this.numberOfCanvases),
        ]);
        this.canvasGroupForm = this.fb.group({
            canvasGroupControl: this.canvasGroupControl,
        });
    }
    ngOnInit() {
        this.subscriptions.add(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    onSubmit() {
        if (this.canvasGroupForm.valid) {
            const pageNumber = this.canvasGroupControl.value - 1;
            this.viewerService.goToCanvasGroup(this.canvasService.findCanvasGroupByCanvasIndex(pageNumber), false);
            this.dialogRef.close();
        }
    }
}
CanvasGroupDialogComponent.decorators = [
    { type: Component, args: [{
                template: "<div fxLayout=\"column\">\n  <h1 class=\"canvas-group-dialog-title\">{{ intl.goToPageLabel }}</h1>\n  <form\n    [formGroup]=\"canvasGroupForm\"\n    (ngSubmit)=\"onSubmit()\"\n    novalidate\n    autocomplete=\"off\"\n  >\n    <mat-form-field [floatLabel]=\"'always'\">\n      <input\n        class=\"go-to-canvas-group-input\"\n        type=\"number\"\n        matInput\n        min=\"1\"\n        [placeholder]=\"intl.enterPageNumber\"\n        formControlName=\"canvasGroupControl\"\n      />\n      <mat-error *ngIf=\"canvasGroupControl.errors?.max\">{{\n        intl.pageDoesNotExists\n      }}</mat-error>\n    </mat-form-field>\n    <div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n      <button type=\"button\" mat-button matDialogClose> CANCEL </button>\n      <button\n        type=\"submit\"\n        mat-button\n        [disabled]=\"canvasGroupForm.pristine || canvasGroupForm.invalid\"\n      >\n        OK\n      </button>\n    </div>\n  </form>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".canvas-group-dialog-title{margin:0 0 20px;display:block}"]
            },] }
];
CanvasGroupDialogComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: FormBuilder },
    { type: ViewerService },
    { type: CanvasService },
    { type: MimeViewerIntl },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLWdyb3VwLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY2FudmFzLWdyb3VwLWRpYWxvZy9jYW52YXMtZ3JvdXAtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEdBR1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLFdBQVcsRUFDWCxXQUFXLEVBRVgsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFPdEUsTUFBTSxPQUFPLDBCQUEwQjtJQU1yQyxZQUNVLFNBQW1ELEVBQ25ELEVBQWUsRUFDZixhQUE0QixFQUM1QixhQUE0QixFQUM3QixJQUFvQixFQUNuQixpQkFBb0M7UUFMcEMsY0FBUyxHQUFULFNBQVMsQ0FBMEM7UUFDbkQsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNmLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzdCLFNBQUksR0FBSixJQUFJLENBQWdCO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFSdEMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBVXpDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO1FBQzVELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsVUFBVSxDQUFDLFFBQVE7WUFDbkIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDdEMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1NBQzVDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FDekUsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUU7WUFDOUIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsVUFBVSxDQUFDLEVBQzNELEtBQUssQ0FDTixDQUFDO1lBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7OztZQXJERixTQUFTLFNBQUM7Z0JBQ1QsMDlCQUFtRDtnQkFFbkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7WUFWUSxZQUFZO1lBTG5CLFdBQVc7WUFTSixhQUFhO1lBRmIsYUFBYTtZQUNiLGNBQWM7WUFkckIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEZvcm1CdWlsZGVyLFxuICBGb3JtQ29udHJvbCxcbiAgRm9ybUdyb3VwLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4uL2NvcmUvaW50bC92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJy4vY2FudmFzLWdyb3VwLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhbnZhcy1ncm91cC1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENhbnZhc0dyb3VwRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBudW1iZXJPZkNhbnZhc2VzOiBudW1iZXI7XG4gIGNhbnZhc0dyb3VwRm9ybSE6IEZvcm1Hcm91cDtcbiAgY2FudmFzR3JvdXBDb250cm9sITogRm9ybUNvbnRyb2w7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENhbnZhc0dyb3VwRGlhbG9nQ29tcG9uZW50PixcbiAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIHZpZXdlclNlcnZpY2U6IFZpZXdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHB1YmxpYyBpbnRsOiBNaW1lVmlld2VySW50bCxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLm51bWJlck9mQ2FudmFzZXMgPSB0aGlzLmNhbnZhc1NlcnZpY2UubnVtYmVyT2ZDYW52YXNlcztcbiAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcbiAgfVxuXG4gIGNyZWF0ZUZvcm0oKSB7XG4gICAgdGhpcy5jYW52YXNHcm91cENvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycsIFtcbiAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICBWYWxpZGF0b3JzLm1pbigxKSxcbiAgICAgIFZhbGlkYXRvcnMubWF4KHRoaXMubnVtYmVyT2ZDYW52YXNlcyksXG4gICAgXSk7XG4gICAgdGhpcy5jYW52YXNHcm91cEZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIGNhbnZhc0dyb3VwQ29udHJvbDogdGhpcy5jYW52YXNHcm91cENvbnRyb2wsXG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5pbnRsLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgb25TdWJtaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FudmFzR3JvdXBGb3JtLnZhbGlkKSB7XG4gICAgICBjb25zdCBwYWdlTnVtYmVyID0gdGhpcy5jYW52YXNHcm91cENvbnRyb2wudmFsdWUgLSAxO1xuICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9DYW52YXNHcm91cChcbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgocGFnZU51bWJlciksXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==