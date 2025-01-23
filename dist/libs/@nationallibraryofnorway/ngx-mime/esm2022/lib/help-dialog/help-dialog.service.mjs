import { Injectable } from '@angular/core';
import { MatDialog, MatDialogState, } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { HelpDialogConfigStrategyFactory } from './help-dialog-config-strategy-factory';
import { HelpDialogComponent } from './help-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "./help-dialog-config-strategy-factory";
import * as i3 from "../core/mime-resize-service/mime-resize.service";
export class HelpDialogService {
    constructor(dialog, helpDialogConfigStrategyFactory, mimeResizeService) {
        this.dialog = dialog;
        this.helpDialogConfigStrategyFactory = helpDialogConfigStrategyFactory;
        this.mimeResizeService = mimeResizeService;
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe(() => {
            if (this.isOpen()) {
                const config = this.getDialogConfig();
                this.dialogRef?.updatePosition(config.position);
                this.dialogRef?.updateSize(config.width, config.height);
            }
        }));
    }
    destroy() {
        this.close();
        this.unsubscribe();
    }
    set el(el) {
        this._el = el;
    }
    set viewContainerRef(viewContainerRef) {
        this._viewContainerRef = viewContainerRef;
    }
    open() {
        if (!this.isOpen()) {
            const config = this.getDialogConfig();
            this.dialogRef = this.dialog.open(HelpDialogComponent, config);
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
        if (!this._el || !this._viewContainerRef) {
            throw new Error('No element or viewContainerRef');
        }
        return this._el
            ? this.helpDialogConfigStrategyFactory
                .create()
                .getConfig(this._el, this._viewContainerRef)
            : {};
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: HelpDialogService, deps: [{ token: i1.MatDialog }, { token: i2.HelpDialogConfigStrategyFactory }, { token: i3.MimeResizeService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: HelpDialogService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: HelpDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.MatDialog }, { type: i2.HelpDialogConfigStrategyFactory }, { type: i3.MimeResizeService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1kaWFsb2cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9oZWxwLWRpYWxvZy9oZWxwLWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxVQUFVLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFDTCxTQUFTLEVBRVQsY0FBYyxHQUNmLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNwRixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN4RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUFHOUQsTUFBTSxPQUFPLGlCQUFpQjtJQU01QixZQUNVLE1BQWlCLEVBQ2pCLCtCQUFnRSxFQUNoRSxpQkFBb0M7UUFGcEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixvQ0FBK0IsR0FBL0IsK0JBQStCLENBQWlDO1FBQ2hFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFDM0MsQ0FBQztJQUVHLFVBQVU7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUM3QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO2dCQUNsQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUQsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxFQUFFLENBQUMsRUFBYztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSSxnQkFBZ0IsQ0FBQyxnQkFBa0M7UUFDckQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDO0lBQzVDLENBQUM7SUFFTSxJQUFJO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1lBQ25CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLENBQUM7SUFDSCxDQUFDO0lBRU0sS0FBSztRQUNWLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUVNLE1BQU07UUFDWCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLGNBQWMsQ0FBQyxJQUFJLENBQUM7SUFDNUQsQ0FBQztJQUVPLGVBQWU7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDLEdBQUc7WUFDYixDQUFDLENBQUMsSUFBSSxDQUFDLCtCQUErQjtpQkFDakMsTUFBTSxFQUFFO2lCQUNSLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNoRCxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQyxDQUFDO0lBQ0gsQ0FBQzs4R0EzRVUsaUJBQWlCO2tIQUFqQixpQkFBaUI7OzJGQUFqQixpQkFBaUI7a0JBRDdCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3RhYmxlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNYXREaWFsb2csXG4gIE1hdERpYWxvZ1JlZixcbiAgTWF0RGlhbG9nU3RhdGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1pbWVSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9taW1lLXJlc2l6ZS1zZXJ2aWNlL21pbWUtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscERpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSB9IGZyb20gJy4vaGVscC1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnknO1xuaW1wb3J0IHsgSGVscERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vaGVscC1kaWFsb2cuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhlbHBEaWFsb2dTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgZGlhbG9nUmVmPzogTWF0RGlhbG9nUmVmPEhlbHBEaWFsb2dDb21wb25lbnQ+O1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMhOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwcml2YXRlIGhlbHBEaWFsb2dDb25maWdTdHJhdGVneUZhY3Rvcnk6IEhlbHBEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnksXG4gICAgcHJpdmF0ZSBtaW1lUmVzaXplU2VydmljZTogTWltZVJlc2l6ZVNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5taW1lUmVzaXplU2VydmljZS5vblJlc2l6ZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0RGlhbG9nQ29uZmlnKCk7XG4gICAgICAgICAgdGhpcy5kaWFsb2dSZWY/LnVwZGF0ZVBvc2l0aW9uKGNvbmZpZy5wb3NpdGlvbik7XG4gICAgICAgICAgdGhpcy5kaWFsb2dSZWY/LnVwZGF0ZVNpemUoY29uZmlnLndpZHRoLCBjb25maWcuaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHNldCBlbChlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2VsID0gZWw7XG4gIH1cblxuICBzZXQgdmlld0NvbnRhaW5lclJlZih2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZiA9IHZpZXdDb250YWluZXJSZWY7XG4gIH1cblxuICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0RGlhbG9nQ29uZmlnKCk7XG4gICAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oSGVscERpYWxvZ0NvbXBvbmVudCwgY29uZmlnKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMuZGlhbG9nUmVmPy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5pc09wZW4oKSA/IHRoaXMuY2xvc2UoKSA6IHRoaXMub3BlbigpO1xuICB9XG5cbiAgcHVibGljIGlzT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaWFsb2dSZWY/LmdldFN0YXRlKCkgPT09IE1hdERpYWxvZ1N0YXRlLk9QRU47XG4gIH1cblxuICBwcml2YXRlIGdldERpYWxvZ0NvbmZpZygpIHtcbiAgICBpZiAoIXRoaXMuX2VsIHx8ICF0aGlzLl92aWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGVsZW1lbnQgb3Igdmlld0NvbnRhaW5lclJlZicpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9lbFxuICAgICAgPyB0aGlzLmhlbHBEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnlcbiAgICAgICAgICAuY3JlYXRlKClcbiAgICAgICAgICAuZ2V0Q29uZmlnKHRoaXMuX2VsLCB0aGlzLl92aWV3Q29udGFpbmVyUmVmKVxuICAgICAgOiB7fTtcbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmUoKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=