import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewDialogComponent } from './view-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "./view-dialog-config-strategy-factory";
import * as i3 from "../core/mime-resize-service/mime-resize.service";
export class ViewDialogService {
    constructor(dialog, viewDialogConfigStrategyFactory, mimeResizeService) {
        this.dialog = dialog;
        this.viewDialogConfigStrategyFactory = viewDialogConfigStrategyFactory;
        this.mimeResizeService = mimeResizeService;
        this._el = null;
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe((rect) => {
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
    open() {
        if (!this.isOpen()) {
            const config = this.getDialogConfig();
            this.dialogRef = this.dialog.open(ViewDialogComponent, config);
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
        return this.viewDialogConfigStrategyFactory.create().getConfig(this._el);
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
}
ViewDialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ViewDialogService, deps: [{ token: i1.MatDialog }, { token: i2.ViewDialogConfigStrategyFactory }, { token: i3.MimeResizeService }], target: i0.ɵɵFactoryTarget.Injectable });
ViewDialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ViewDialogService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ViewDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MatDialog }, { type: i2.ViewDialogConfigStrategyFactory }, { type: i3.MimeResizeService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1kaWFsb2cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3LWRpYWxvZy92aWV3LWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdwQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUFHOUQsTUFBTSxPQUFPLGlCQUFpQjtJQUs1QixZQUNVLE1BQWlCLEVBQ2pCLCtCQUFnRSxFQUNoRSxpQkFBb0M7UUFGcEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixvQ0FBK0IsR0FBL0IsK0JBQStCLENBQWlDO1FBQ2hFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFQdEMsUUFBRyxHQUFzQixJQUFJLENBQUM7SUFRbkMsQ0FBQztJQUVHLFVBQVU7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDakQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN6RDtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxFQUFFLENBQUMsRUFBYztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRU0sSUFBSTtRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDO0lBRU0sS0FBSztRQUNWLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLGdDQUF3QixDQUFDO0lBQzVELENBQUM7SUFFTyxlQUFlO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLCtCQUErQixDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs4R0E5RFUsaUJBQWlCO2tIQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1hdERpYWxvZyxcbiAgTWF0RGlhbG9nQ29uZmlnLFxuICBNYXREaWFsb2dSZWYsXG4gIE1hdERpYWxvZ1N0YXRlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNaW1lUmVzaXplU2VydmljZSB9IGZyb20gJy4uL2NvcmUvbWltZS1yZXNpemUtc2VydmljZS9taW1lLXJlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnkgfSBmcm9tICcuL3ZpZXctZGlhbG9nLWNvbmZpZy1zdHJhdGVneS1mYWN0b3J5JztcbmltcG9ydCB7IFZpZXdEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3ZpZXctZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWaWV3RGlhbG9nU2VydmljZSB7XG4gIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgZGlhbG9nUmVmPzogTWF0RGlhbG9nUmVmPFZpZXdEaWFsb2dDb21wb25lbnQ+O1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMhOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwcml2YXRlIHZpZXdEaWFsb2dDb25maWdTdHJhdGVneUZhY3Rvcnk6IFZpZXdEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnksXG4gICAgcHJpdmF0ZSBtaW1lUmVzaXplU2VydmljZTogTWltZVJlc2l6ZVNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5taW1lUmVzaXplU2VydmljZS5vblJlc2l6ZS5zdWJzY3JpYmUoKHJlY3QpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldERpYWxvZ0NvbmZpZygpO1xuICAgICAgICAgIHRoaXMuZGlhbG9nUmVmPy51cGRhdGVQb3NpdGlvbihjb25maWcucG9zaXRpb24pO1xuICAgICAgICAgIHRoaXMuZGlhbG9nUmVmPy51cGRhdGVTaXplKGNvbmZpZy53aWR0aCwgY29uZmlnLmhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBzZXQgZWwoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9lbCA9IGVsO1xuICB9XG5cbiAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbigpKSB7XG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldERpYWxvZ0NvbmZpZygpO1xuICAgICAgdGhpcy5kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFZpZXdEaWFsb2dDb21wb25lbnQsIGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLmRpYWxvZ1JlZj8uY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNPcGVuKCkgPyB0aGlzLmNsb3NlKCkgOiB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHB1YmxpYyBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nUmVmPy5nZXRTdGF0ZSgpID09PSBNYXREaWFsb2dTdGF0ZS5PUEVOO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREaWFsb2dDb25maWcoKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy52aWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5LmNyZWF0ZSgpLmdldENvbmZpZyh0aGlzLl9lbCk7XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlKCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19