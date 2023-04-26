import { Injectable } from '@angular/core';
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
        return this.dialogRef?.getState() === 0 /* MatDialogState.OPEN */;
    }
    getDialogConfig() {
        return {
            panelClass: 'canvas-group-panel',
            viewContainerRef: this._viewContainerRef,
        };
    }
}
CanvasGroupDialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: CanvasGroupDialogService, deps: [{ token: i1.MatDialog }], target: i0.ɵɵFactoryTarget.Injectable });
CanvasGroupDialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: CanvasGroupDialogService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: CanvasGroupDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MatDialog }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLWdyb3VwLWRpYWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NhbnZhcy1ncm91cC1kaWFsb2cvY2FudmFzLWdyb3VwLWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBTzdELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7QUFHN0UsTUFBTSxPQUFPLHdCQUF3QjtJQUluQyxZQUFvQixNQUFpQjtRQUFqQixXQUFNLEdBQU4sTUFBTSxDQUFXO0lBQUcsQ0FBQztJQUV6QyxJQUFJLGdCQUFnQixDQUFDLGdCQUFrQztRQUNyRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7SUFDNUMsQ0FBQztJQUVNLFVBQVUsS0FBVSxDQUFDO0lBRXJCLE9BQU87UUFDWixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRU0sSUFBSTtRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdkU7SUFDSCxDQUFDO0lBRU0sS0FBSztRQUNWLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLGdDQUF3QixDQUFDO0lBQzVELENBQUM7SUFFTyxlQUFlO1FBQ3JCLE9BQU87WUFDTCxVQUFVLEVBQUUsb0JBQW9CO1lBQ2hDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxpQkFBaUI7U0FDekMsQ0FBQztJQUNKLENBQUM7O3FIQTFDVSx3QkFBd0I7eUhBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTWF0RGlhbG9nLFxuICBNYXREaWFsb2dDb25maWcsXG4gIE1hdERpYWxvZ1JlZixcbiAgTWF0RGlhbG9nU3RhdGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBDYW52YXNHcm91cERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY2FudmFzLWdyb3VwLWRpYWxvZy5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FudmFzR3JvdXBEaWFsb2dTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBkaWFsb2dSZWY/OiBNYXREaWFsb2dSZWY8Q2FudmFzR3JvdXBEaWFsb2dDb21wb25lbnQ+O1xuICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2cpIHt9XG5cbiAgc2V0IHZpZXdDb250YWluZXJSZWYodmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYgPSB2aWV3Q29udGFpbmVyUmVmO1xuICB9XG5cbiAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7fVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc09wZW4oKSkge1xuICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXREaWFsb2dDb25maWcoKTtcbiAgICAgIHRoaXMuZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihDYW52YXNHcm91cERpYWxvZ0NvbXBvbmVudCwgY29uZmlnKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMuZGlhbG9nUmVmPy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5pc09wZW4oKSA/IHRoaXMuY2xvc2UoKSA6IHRoaXMub3BlbigpO1xuICB9XG5cbiAgcHVibGljIGlzT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaWFsb2dSZWY/LmdldFN0YXRlKCkgPT09IE1hdERpYWxvZ1N0YXRlLk9QRU47XG4gIH1cblxuICBwcml2YXRlIGdldERpYWxvZ0NvbmZpZygpOiBNYXREaWFsb2dDb25maWcge1xuICAgIHJldHVybiB7XG4gICAgICBwYW5lbENsYXNzOiAnY2FudmFzLWdyb3VwLXBhbmVsJyxcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMuX3ZpZXdDb250YWluZXJSZWYsXG4gICAgfTtcbiAgfVxufVxuIl19