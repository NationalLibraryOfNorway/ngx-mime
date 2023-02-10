import { Injectable } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { ContentsDialogConfigStrategyFactory } from './contents-dialog-config-strategy-factory';
import { ContentsDialogComponent } from './contents-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "./contents-dialog-config-strategy-factory";
import * as i3 from "../core/mime-resize-service/mime-resize.service";
export class ContentsDialogService {
    constructor(dialog, contentsDialogConfigStrategyFactory, mimeResizeService) {
        this.dialog = dialog;
        this.contentsDialogConfigStrategyFactory = contentsDialogConfigStrategyFactory;
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
            this.dialogRef = this.dialog.open(ContentsDialogComponent, config);
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
        return this.contentsDialogConfigStrategyFactory
            .create()
            .getConfig(this._el);
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
}
ContentsDialogService.ɵfac = function ContentsDialogService_Factory(t) { return new (t || ContentsDialogService)(i0.ɵɵinject(i1.MatDialog), i0.ɵɵinject(i2.ContentsDialogConfigStrategyFactory), i0.ɵɵinject(i3.MimeResizeService)); };
ContentsDialogService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ContentsDialogService, factory: ContentsDialogService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContentsDialogService, [{
        type: Injectable
    }], function () { return [{ type: i1.MatDialog }, { type: i2.ContentsDialogConfigStrategyFactory }, { type: i3.MimeResizeService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudHMtZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29udGVudHMtZGlhbG9nL2NvbnRlbnRzLWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUNMLFNBQVMsR0FJVixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDcEYsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7O0FBR3RFLE1BQU0sT0FBTyxxQkFBcUI7SUFLaEMsWUFDVSxNQUFpQixFQUNqQixtQ0FBd0UsRUFDeEUsaUJBQW9DO1FBRnBDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsd0NBQW1DLEdBQW5DLG1DQUFtQyxDQUFxQztRQUN4RSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBUHRDLFFBQUcsR0FBc0IsSUFBSSxDQUFDO0lBUW5DLENBQUM7SUFFRyxVQUFVO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2pELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNqQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDekQ7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksRUFBRSxDQUFDLEVBQWM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVNLElBQUksQ0FBQyxhQUFzQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2xCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRW5FLElBQUksYUFBYSxFQUFFO2dCQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7YUFDaEU7U0FDRjtJQUNILENBQUM7SUFFTSxLQUFLO1FBQ1YsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFFTSxNQUFNO1FBQ1gsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsZ0NBQXdCLENBQUM7SUFDNUQsQ0FBQztJQUVNLGdCQUFnQjtRQUNyQixPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU8sZUFBZTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDL0I7UUFDRCxPQUFPLElBQUksQ0FBQyxtQ0FBbUM7YUFDNUMsTUFBTSxFQUFFO2FBQ1IsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRU8sV0FBVztRQUNqQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7OzBGQTNFVSxxQkFBcUI7MkVBQXJCLHFCQUFxQixXQUFyQixxQkFBcUI7dUZBQXJCLHFCQUFxQjtjQURqQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTWF0RGlhbG9nLFxuICBNYXREaWFsb2dDb25maWcsXG4gIE1hdERpYWxvZ1JlZixcbiAgTWF0RGlhbG9nU3RhdGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1pbWVSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9taW1lLXJlc2l6ZS1zZXJ2aWNlL21pbWUtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udGVudHNEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnkgfSBmcm9tICcuL2NvbnRlbnRzLWRpYWxvZy1jb25maWctc3RyYXRlZ3ktZmFjdG9yeSc7XG5pbXBvcnQgeyBDb250ZW50c0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29udGVudHMtZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb250ZW50c0RpYWxvZ1NlcnZpY2Uge1xuICBwcml2YXRlIF9lbDogRWxlbWVudFJlZiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGRpYWxvZ1JlZj86IE1hdERpYWxvZ1JlZjxDb250ZW50c0RpYWxvZ0NvbXBvbmVudD47XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyE6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLFxuICAgIHByaXZhdGUgY29udGVudHNEaWFsb2dDb25maWdTdHJhdGVneUZhY3Rvcnk6IENvbnRlbnRzRGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5LFxuICAgIHByaXZhdGUgbWltZVJlc2l6ZVNlcnZpY2U6IE1pbWVSZXNpemVTZXJ2aWNlXG4gICkge31cblxuICBwdWJsaWMgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMubWltZVJlc2l6ZVNlcnZpY2Uub25SZXNpemUuc3Vic2NyaWJlKChyZWN0KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XG4gICAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXREaWFsb2dDb25maWcoKTtcbiAgICAgICAgICB0aGlzLmRpYWxvZ1JlZj8udXBkYXRlUG9zaXRpb24oY29uZmlnLnBvc2l0aW9uKTtcbiAgICAgICAgICB0aGlzLmRpYWxvZ1JlZj8udXBkYXRlU2l6ZShjb25maWcud2lkdGgsIGNvbmZpZy5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgc2V0IGVsKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fZWwgPSBlbDtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuKHNlbGVjdGVkSW5kZXg/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0RGlhbG9nQ29uZmlnKCk7XG4gICAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQ29udGVudHNEaWFsb2dDb21wb25lbnQsIGNvbmZpZyk7XG5cbiAgICAgIGlmIChzZWxlY3RlZEluZGV4KSB7XG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnNlbGVjdGVkSW5kZXggPSBzZWxlY3RlZEluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgdGhpcy5kaWFsb2dSZWY/LmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmlzT3BlbigpID8gdGhpcy5jbG9zZSgpIDogdGhpcy5vcGVuKCk7XG4gIH1cblxuICBwdWJsaWMgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpYWxvZ1JlZj8uZ2V0U3RhdGUoKSA9PT0gTWF0RGlhbG9nU3RhdGUuT1BFTjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTZWxlY3RlZEluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nUmVmPy5jb21wb25lbnRJbnN0YW5jZT8uc2VsZWN0ZWRJbmRleCA/PyAwO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREaWFsb2dDb25maWcoKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICBpZiAoIXRoaXMuX2VsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGVsZW1lbnQnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29udGVudHNEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnlcbiAgICAgIC5jcmVhdGUoKVxuICAgICAgLmdldENvbmZpZyh0aGlzLl9lbCk7XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlKCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19