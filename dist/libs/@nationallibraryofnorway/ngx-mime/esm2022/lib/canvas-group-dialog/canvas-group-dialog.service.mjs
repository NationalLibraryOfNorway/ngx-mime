import { Injectable } from '@angular/core';
import { MatDialog, MatDialogState, } from '@angular/material/dialog';
import { CanvasGroupDialogComponent } from './canvas-group-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
export class CanvasGroupDialogService {
    constructor(dialog) {
        this.dialog = dialog;
    }
    set viewContainerRef(viewContainerRef) {
        this._viewContainerRef = viewContainerRef;
    }
    initialize() { }
    destroy() {
        this.close();
    }
    open() {
        if (!this.isOpen()) {
            const config = this.getDialogConfig();
            this.dialogRef = this.dialog.open(CanvasGroupDialogComponent, config);
        }
    }
    close() {
        if (this.isOpen()) {
            this.dialogRef?.close();
        }
    }
    toggle() {
        this.isOpen() ? this.close() : this.open();
    }
    isOpen() {
        return this.dialogRef?.getState() === MatDialogState.OPEN;
    }
    getDialogConfig() {
        return {
            panelClass: ['mime-dialog', 'canvas-group-panel'],
            viewContainerRef: this._viewContainerRef,
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: CanvasGroupDialogService, deps: [{ token: i1.MatDialog }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: CanvasGroupDialogService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: CanvasGroupDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.MatDialog }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLWdyb3VwLWRpYWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NhbnZhcy1ncm91cC1kaWFsb2cvY2FudmFzLWdyb3VwLWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFDTCxTQUFTLEVBR1QsY0FBYyxHQUNmLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7OztBQUc3RSxNQUFNLE9BQU8sd0JBQXdCO0lBSW5DLFlBQW9CLE1BQWlCO1FBQWpCLFdBQU0sR0FBTixNQUFNLENBQVc7SUFBRyxDQUFDO0lBRXpDLElBQUksZ0JBQWdCLENBQUMsZ0JBQWtDO1FBQ3JELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztJQUM1QyxDQUFDO0lBRU0sVUFBVSxLQUFVLENBQUM7SUFFckIsT0FBTztRQUNaLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFTSxJQUFJO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1lBQ25CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hFLENBQUM7SUFDSCxDQUFDO0lBRU0sS0FBSztRQUNWLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUVNLE1BQU07UUFDWCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLGNBQWMsQ0FBQyxJQUFJLENBQUM7SUFDNUQsQ0FBQztJQUVPLGVBQWU7UUFDckIsT0FBTztZQUNMLFVBQVUsRUFBRSxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQztZQUNqRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCO1NBQ3pDLENBQUM7SUFDSixDQUFDOzhHQTFDVSx3QkFBd0I7a0hBQXhCLHdCQUF3Qjs7MkZBQXhCLHdCQUF3QjtrQkFEcEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1hdERpYWxvZyxcbiAgTWF0RGlhbG9nQ29uZmlnLFxuICBNYXREaWFsb2dSZWYsXG4gIE1hdERpYWxvZ1N0YXRlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NhbnZhcy1ncm91cC1kaWFsb2cuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhbnZhc0dyb3VwRGlhbG9nU2VydmljZSB7XG4gIHByaXZhdGUgZGlhbG9nUmVmPzogTWF0RGlhbG9nUmVmPENhbnZhc0dyb3VwRGlhbG9nQ29tcG9uZW50PjtcbiAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZiB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nKSB7fVxuXG4gIHNldCB2aWV3Q29udGFpbmVyUmVmKHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICB0aGlzLl92aWV3Q29udGFpbmVyUmVmID0gdmlld0NvbnRhaW5lclJlZjtcbiAgfVxuXG4gIHB1YmxpYyBpbml0aWFsaXplKCk6IHZvaWQge31cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0RGlhbG9nQ29uZmlnKCk7XG4gICAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQ2FudmFzR3JvdXBEaWFsb2dDb21wb25lbnQsIGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLmRpYWxvZ1JlZj8uY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNPcGVuKCkgPyB0aGlzLmNsb3NlKCkgOiB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHB1YmxpYyBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nUmVmPy5nZXRTdGF0ZSgpID09PSBNYXREaWFsb2dTdGF0ZS5PUEVOO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREaWFsb2dDb25maWcoKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGFuZWxDbGFzczogWydtaW1lLWRpYWxvZycsICdjYW52YXMtZ3JvdXAtcGFuZWwnXSxcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMuX3ZpZXdDb250YWluZXJSZWYsXG4gICAgfTtcbiAgfVxufVxuIl19