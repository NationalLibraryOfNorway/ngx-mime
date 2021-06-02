import { Injectable } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { CanvasGroupDialogComponent } from './canvas-group-dialog.component';
export class CanvasGroupDialogService {
    constructor(dialog) {
        this.dialog = dialog;
        this.isCanvasGroupDialogOpen = false;
        this.dialogRef = null;
    }
    initialize() { }
    destroy() {
        this.close();
    }
    open(timeout) {
        if (!this.isCanvasGroupDialogOpen) {
            const config = this.getDialogConfig();
            this.dialogRef = this.dialog.open(CanvasGroupDialogComponent, config);
            this.dialogRef
                .afterClosed()
                .pipe(take(1))
                .subscribe((result) => {
                this.isCanvasGroupDialogOpen = false;
            });
            this.isCanvasGroupDialogOpen = true;
        }
    }
    close() {
        if (this.dialogRef) {
            this.dialogRef.close();
            this.isCanvasGroupDialogOpen = false;
        }
    }
    toggle() {
        this.isCanvasGroupDialogOpen ? this.close() : this.open();
    }
    getDialogConfig() {
        return {
            hasBackdrop: false,
            disableClose: true,
            panelClass: 'canvas-group-panel',
        };
    }
}
CanvasGroupDialogService.decorators = [
    { type: Injectable }
];
CanvasGroupDialogService.ctorParameters = () => [
    { type: MatDialog }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLWdyb3VwLWRpYWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NhbnZhcy1ncm91cC1kaWFsb2cvY2FudmFzLWdyb3VwLWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLFNBQVMsR0FHVixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUc3RSxNQUFNLE9BQU8sd0JBQXdCO0lBSW5DLFlBQW9CLE1BQWlCO1FBQWpCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFIN0IsNEJBQXVCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLGNBQVMsR0FBb0QsSUFBSSxDQUFDO0lBRWxDLENBQUM7SUFFbEMsVUFBVSxLQUFVLENBQUM7SUFFckIsT0FBTztRQUNaLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFTSxJQUFJLENBQUMsT0FBZ0I7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsU0FBUztpQkFDWCxXQUFXLEVBQUU7aUJBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDYixTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRU0sS0FBSztRQUNWLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7U0FDdEM7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUVPLGVBQWU7UUFDckIsT0FBTztZQUNMLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFVBQVUsRUFBRSxvQkFBb0I7U0FDakMsQ0FBQztJQUNKLENBQUM7OztZQTVDRixVQUFVOzs7WUFQVCxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTWF0RGlhbG9nLFxuICBNYXREaWFsb2dDb25maWcsXG4gIE1hdERpYWxvZ1JlZixcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYW52YXNHcm91cERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY2FudmFzLWdyb3VwLWRpYWxvZy5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FudmFzR3JvdXBEaWFsb2dTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBpc0NhbnZhc0dyb3VwRGlhbG9nT3BlbiA9IGZhbHNlO1xuICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENhbnZhc0dyb3VwRGlhbG9nQ29tcG9uZW50PiB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2cpIHt9XG5cbiAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7fVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuKHRpbWVvdXQ/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNDYW52YXNHcm91cERpYWxvZ09wZW4pIHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0RGlhbG9nQ29uZmlnKCk7XG4gICAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQ2FudmFzR3JvdXBEaWFsb2dDb21wb25lbnQsIGNvbmZpZyk7XG4gICAgICB0aGlzLmRpYWxvZ1JlZlxuICAgICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICB0aGlzLmlzQ2FudmFzR3JvdXBEaWFsb2dPcGVuID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5pc0NhbnZhc0dyb3VwRGlhbG9nT3BlbiA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpYWxvZ1JlZikge1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICAgIHRoaXMuaXNDYW52YXNHcm91cERpYWxvZ09wZW4gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNDYW52YXNHcm91cERpYWxvZ09wZW4gPyB0aGlzLmNsb3NlKCkgOiB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGlhbG9nQ29uZmlnKCk6IE1hdERpYWxvZ0NvbmZpZyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZSxcbiAgICAgIHBhbmVsQ2xhc3M6ICdjYW52YXMtZ3JvdXAtcGFuZWwnLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==