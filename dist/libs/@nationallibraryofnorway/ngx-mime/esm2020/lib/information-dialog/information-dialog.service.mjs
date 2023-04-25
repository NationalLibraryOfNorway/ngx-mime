import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { InformationDialogComponent } from './information-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "./information-dialog-config-strategy-factory";
import * as i3 from "../core/mime-resize-service/mime-resize.service";
export class InformationDialogService {
    constructor(dialog, informationDialogConfigStrategyFactory, mimeResizeService) {
        this.dialog = dialog;
        this.informationDialogConfigStrategyFactory = informationDialogConfigStrategyFactory;
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
    open(selectedIndex) {
        if (!this.isOpen()) {
            const config = this.getDialogConfig();
            this.dialogRef = this.dialog.open(InformationDialogComponent, config);
            if (selectedIndex) {
                this.dialogRef.componentInstance.selectedIndex = selectedIndex;
            }
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
    getSelectedIndex() {
        return this.dialogRef?.componentInstance?.selectedIndex ?? 0;
    }
    getDialogConfig() {
        if (!this._el) {
            throw new Error('No element');
        }
        return this.informationDialogConfigStrategyFactory
            .create()
            .getConfig(this._el);
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
}
InformationDialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: InformationDialogService, deps: [{ token: i1.MatDialog }, { token: i2.InformationDialogConfigStrategyFactory }, { token: i3.MimeResizeService }], target: i0.ɵɵFactoryTarget.Injectable });
InformationDialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: InformationDialogService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: InformationDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MatDialog }, { type: i2.InformationDialogConfigStrategyFactory }, { type: i3.MimeResizeService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvaW5mb3JtYXRpb24tZGlhbG9nL2luZm9ybWF0aW9uLWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdwQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7QUFHNUUsTUFBTSxPQUFPLHdCQUF3QjtJQUtuQyxZQUNVLE1BQWlCLEVBQ2pCLHNDQUE4RSxFQUM5RSxpQkFBb0M7UUFGcEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQiwyQ0FBc0MsR0FBdEMsc0NBQXNDLENBQXdDO1FBQzlFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFQdEMsUUFBRyxHQUFzQixJQUFJLENBQUM7SUFRbkMsQ0FBQztJQUVHLFVBQVU7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDakQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN6RDtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxFQUFFLENBQUMsRUFBYztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRU0sSUFBSSxDQUFDLGFBQXNCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFdEUsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQzthQUNoRTtTQUNGO0lBQ0gsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVNLE1BQU07UUFDWCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxnQ0FBd0IsQ0FBQztJQUM1RCxDQUFDO0lBRU0sZ0JBQWdCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTyxlQUFlO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMvQjtRQUNELE9BQU8sSUFBSSxDQUFDLHNDQUFzQzthQUMvQyxNQUFNLEVBQUU7YUFDUixTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7cUhBM0VVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBRHBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNYXREaWFsb2csXG4gIE1hdERpYWxvZ0NvbmZpZyxcbiAgTWF0RGlhbG9nUmVmLFxuICBNYXREaWFsb2dTdGF0ZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWltZVJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL21pbWUtcmVzaXplLXNlcnZpY2UvbWltZS1yZXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSB9IGZyb20gJy4vaW5mb3JtYXRpb24tZGlhbG9nLWNvbmZpZy1zdHJhdGVneS1mYWN0b3J5JztcbmltcG9ydCB7IEluZm9ybWF0aW9uRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9pbmZvcm1hdGlvbi1kaWFsb2cuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEluZm9ybWF0aW9uRGlhbG9nU2VydmljZSB7XG4gIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgZGlhbG9nUmVmPzogTWF0RGlhbG9nUmVmPEluZm9ybWF0aW9uRGlhbG9nQ29tcG9uZW50PjtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zITogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgcHJpdmF0ZSBpbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeTogSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnksXG4gICAgcHJpdmF0ZSBtaW1lUmVzaXplU2VydmljZTogTWltZVJlc2l6ZVNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5taW1lUmVzaXplU2VydmljZS5vblJlc2l6ZS5zdWJzY3JpYmUoKHJlY3QpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldERpYWxvZ0NvbmZpZygpO1xuICAgICAgICAgIHRoaXMuZGlhbG9nUmVmPy51cGRhdGVQb3NpdGlvbihjb25maWcucG9zaXRpb24pO1xuICAgICAgICAgIHRoaXMuZGlhbG9nUmVmPy51cGRhdGVTaXplKGNvbmZpZy53aWR0aCwgY29uZmlnLmhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBzZXQgZWwoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9lbCA9IGVsO1xuICB9XG5cbiAgcHVibGljIG9wZW4oc2VsZWN0ZWRJbmRleD86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc09wZW4oKSkge1xuICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXREaWFsb2dDb25maWcoKTtcbiAgICAgIHRoaXMuZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihJbmZvcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCwgY29uZmlnKTtcblxuICAgICAgaWYgKHNlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCA9IHNlbGVjdGVkSW5kZXg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLmRpYWxvZ1JlZj8uY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNPcGVuKCkgPyB0aGlzLmNsb3NlKCkgOiB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHB1YmxpYyBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nUmVmPy5nZXRTdGF0ZSgpID09PSBNYXREaWFsb2dTdGF0ZS5PUEVOO1xuICB9XG5cbiAgcHVibGljIGdldFNlbGVjdGVkSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kaWFsb2dSZWY/LmNvbXBvbmVudEluc3RhbmNlPy5zZWxlY3RlZEluZGV4ID8/IDA7XG4gIH1cblxuICBwcml2YXRlIGdldERpYWxvZ0NvbmZpZygpOiBNYXREaWFsb2dDb25maWcge1xuICAgIGlmICghdGhpcy5fZWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gZWxlbWVudCcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeVxuICAgICAgLmNyZWF0ZSgpXG4gICAgICAuZ2V0Q29uZmlnKHRoaXMuX2VsKTtcbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmUoKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=