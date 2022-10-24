import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Dimensions } from '../core/models/dimensions';
import { AttributionDialogComponent } from './attribution-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "../core/mime-resize-service/mime-resize.service";
import * as i3 from "./attribution-dialog-resize.service";
import * as i4 from "../core/mime-dom-helper";
export class AttributionDialogService {
    constructor(dialog, mimeResizeService, attributionDialogResizeService, mimeDomHelper) {
        this.dialog = dialog;
        this.mimeResizeService = mimeResizeService;
        this.attributionDialogResizeService = attributionDialogResizeService;
        this.mimeDomHelper = mimeDomHelper;
        this._el = null;
        this.attributionDialogHeight = 0;
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe(() => {
            if (this.isOpen()) {
                const config = this.getDialogConfig();
                this.dialogRef?.updatePosition(config.position);
            }
        }));
        this.subscriptions.add(this.attributionDialogResizeService.onResize.subscribe((dimensions) => {
            if (this.isOpen()) {
                this.attributionDialogHeight = dimensions.height;
                const config = this.getDialogConfig();
                this.dialogRef?.updatePosition(config.position);
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
    open(timeout) {
        if (!this.isOpen()) {
            const config = this.getDialogConfig();
            this.dialogRef = this.dialog.open(AttributionDialogComponent, config);
            this.dialogRef
                .afterClosed()
                .pipe(take(1))
                .subscribe(() => {
                this.mimeDomHelper.setFocusOnViewer();
            });
            this.closeDialogAfter(timeout);
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
        return this.dialogRef?.getState() === 0 /* OPEN */;
    }
    closeDialogAfter(seconds) {
        if (seconds && seconds > 0) {
            interval(seconds * 1000)
                .pipe(take(1))
                .subscribe(() => {
                this.close();
            });
        }
    }
    getDialogConfig() {
        const dimensions = this.getPosition();
        return {
            hasBackdrop: false,
            width: '180px',
            panelClass: 'attribution-panel',
            position: {
                top: dimensions.top + 'px',
                left: dimensions.left + 'px',
            },
            autoFocus: true,
            restoreFocus: false,
        };
    }
    getPosition() {
        if (!this._el) {
            throw new Error(`Could not find position because element is missing`);
        }
        const padding = 20;
        const dimensions = this.mimeDomHelper.getBoundingClientRect(this._el);
        return new Dimensions({
            top: dimensions.top + dimensions.height - this.attributionDialogHeight - 68,
            left: dimensions.left + padding,
        });
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
}
AttributionDialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: AttributionDialogService, deps: [{ token: i1.MatDialog }, { token: i2.MimeResizeService }, { token: i3.AttributionDialogResizeService }, { token: i4.MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable });
AttributionDialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: AttributionDialogService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: AttributionDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MatDialog }, { type: i2.MimeResizeService }, { type: i3.AttributionDialogResizeService }, { type: i4.MimeDomHelper }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRpb24tZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvYXR0cmlidXRpb24tZGlhbG9nL2F0dHJpYnV0aW9uLWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7O0FBRzVFLE1BQU0sT0FBTyx3QkFBd0I7SUFNbkMsWUFDVSxNQUFpQixFQUNqQixpQkFBb0MsRUFDcEMsOEJBQThELEVBQzlELGFBQTRCO1FBSDVCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxtQ0FBOEIsR0FBOUIsOEJBQThCLENBQWdDO1FBQzlELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBUjlCLFFBQUcsR0FBc0IsSUFBSSxDQUFDO1FBQzlCLDRCQUF1QixHQUFHLENBQUMsQ0FBQztJQVFqQyxDQUFDO0lBRUcsVUFBVTtRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzdDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNqQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFB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WUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQztJQUNKLENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1NBQ3ZFO1FBQ0QsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25CLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sSUFBSSxVQUFVLENBQUM7WUFDcEIsR0FBRyxFQUNELFVBQVUsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsRUFBRTtZQUN4RSxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksR0FBRyxPQUFPO1NBQ2hDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7cUhBbkhVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBRHBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNYXREaWFsb2csXG4gIE1hdERpYWxvZ0NvbmZpZyxcbiAgTWF0RGlhbG9nUmVmLFxuICBNYXREaWFsb2dTdGF0ZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IGludGVydmFsLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNaW1lRG9tSGVscGVyIH0gZnJvbSAnLi4vY29yZS9taW1lLWRvbS1oZWxwZXInO1xuaW1wb3J0IHsgTWltZVJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL21pbWUtcmVzaXplLXNlcnZpY2UvbWltZS1yZXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBEaW1lbnNpb25zIH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvZGltZW5zaW9ucyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkRpYWxvZ1Jlc2l6ZVNlcnZpY2UgfSBmcm9tICcuL2F0dHJpYnV0aW9uLWRpYWxvZy1yZXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vYXR0cmlidXRpb24tZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2Uge1xuICBwcml2YXRlIGRpYWxvZ1JlZj86IE1hdERpYWxvZ1JlZjxBdHRyaWJ1dGlvbkRpYWxvZ0NvbXBvbmVudD47XG4gIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgYXR0cmlidXRpb25EaWFsb2dIZWlnaHQgPSAwO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMhOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwcml2YXRlIG1pbWVSZXNpemVTZXJ2aWNlOiBNaW1lUmVzaXplU2VydmljZSxcbiAgICBwcml2YXRlIGF0dHJpYnV0aW9uRGlhbG9nUmVzaXplU2VydmljZTogQXR0cmlidXRpb25EaWFsb2dSZXNpemVTZXJ2aWNlLFxuICAgIHByaXZhdGUgbWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlclxuICApIHt9XG5cbiAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm1pbWVSZXNpemVTZXJ2aWNlLm9uUmVzaXplLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XG4gICAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXREaWFsb2dDb25maWcoKTtcbiAgICAgICAgICB0aGlzLmRpYWxvZ1JlZj8udXBkYXRlUG9zaXRpb24oY29uZmlnLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nUmVzaXplU2VydmljZS5vblJlc2l6ZS5zdWJzY3JpYmUoXG4gICAgICAgIChkaW1lbnNpb25zOiBEaW1lbnNpb25zKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dIZWlnaHQgPSBkaW1lbnNpb25zLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0RGlhbG9nQ29uZmlnKCk7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ1JlZj8udXBkYXRlUG9zaXRpb24oY29uZmlnLnBvc2l0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHNldCBlbChlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2VsID0gZWw7XG4gIH1cblxuICBwdWJsaWMgb3Blbih0aW1lb3V0PzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbigpKSB7XG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldERpYWxvZ0NvbmZpZygpO1xuICAgICAgdGhpcy5kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEF0dHJpYnV0aW9uRGlhbG9nQ29tcG9uZW50LCBjb25maWcpO1xuICAgICAgdGhpcy5kaWFsb2dSZWZcbiAgICAgICAgLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5taW1lRG9tSGVscGVyLnNldEZvY3VzT25WaWV3ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLmNsb3NlRGlhbG9nQWZ0ZXIodGltZW91dCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLmRpYWxvZ1JlZj8uY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNPcGVuKCkgPyB0aGlzLmNsb3NlKCkgOiB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHB1YmxpYyBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nUmVmPy5nZXRTdGF0ZSgpID09PSBNYXREaWFsb2dTdGF0ZS5PUEVOO1xuICB9XG5cbiAgcHJpdmF0ZSBjbG9zZURpYWxvZ0FmdGVyKHNlY29uZHM6IG51bWJlciB8IHVuZGVmaW5lZCkge1xuICAgIGlmIChzZWNvbmRzICYmIHNlY29uZHMgPiAwKSB7XG4gICAgICBpbnRlcnZhbChzZWNvbmRzICogMTAwMClcbiAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldERpYWxvZ0NvbmZpZygpOiBNYXREaWFsb2dDb25maWcge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgICAgIHdpZHRoOiAnMTgwcHgnLFxuICAgICAgcGFuZWxDbGFzczogJ2F0dHJpYnV0aW9uLXBhbmVsJyxcbiAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIHRvcDogZGltZW5zaW9ucy50b3AgKyAncHgnLFxuICAgICAgICBsZWZ0OiBkaW1lbnNpb25zLmxlZnQgKyAncHgnLFxuICAgICAgfSxcbiAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcbiAgICAgIHJlc3RvcmVGb2N1czogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UG9zaXRpb24oKSB7XG4gICAgaWYgKCF0aGlzLl9lbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBwb3NpdGlvbiBiZWNhdXNlIGVsZW1lbnQgaXMgbWlzc2luZ2ApO1xuICAgIH1cbiAgICBjb25zdCBwYWRkaW5nID0gMjA7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMubWltZURvbUhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QodGhpcy5fZWwpO1xuICAgIHJldHVybiBuZXcgRGltZW5zaW9ucyh7XG4gICAgICB0b3A6XG4gICAgICAgIGRpbWVuc2lvbnMudG9wICsgZGltZW5zaW9ucy5oZWlnaHQgLSB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nSGVpZ2h0IC0gNjgsXG4gICAgICBsZWZ0OiBkaW1lbnNpb25zLmxlZnQgKyBwYWRkaW5nLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==