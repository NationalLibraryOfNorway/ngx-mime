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
        this.isAttributionDialogOpen = false;
        this.dialogRef = null;
        this._el = null;
        this.attributionDialogHeight = 0;
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe((dimensions) => {
            if (this.dialogRef && this.isAttributionDialogOpen) {
                const config = this.getDialogConfig();
                this.dialogRef.updatePosition(config.position);
            }
        }));
        this.subscriptions.add(this.attributionDialogResizeService.onResize.subscribe((dimensions) => {
            if (this.dialogRef && this.isAttributionDialogOpen) {
                this.attributionDialogHeight = dimensions.height;
                const config = this.getDialogConfig();
                this.dialogRef.updatePosition(config.position);
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
        if (!this.isAttributionDialogOpen) {
            /**
             * Sleeping for material animations to finish
             * fix: https://github.com/angular/material2/issues/7438
             */
            interval(1000)
                .pipe(take(1))
                .subscribe(() => {
                const config = this.getDialogConfig();
                this.dialogRef = this.dialog.open(AttributionDialogComponent, config);
                this.dialogRef
                    .afterClosed()
                    .pipe(take(1))
                    .subscribe((result) => {
                    this.isAttributionDialogOpen = false;
                    this.mimeDomHelper.setFocusOnViewer();
                });
                this.isAttributionDialogOpen = true;
                this.closeDialogAfter(timeout);
            });
        }
    }
    close() {
        if (this.dialogRef) {
            this.dialogRef.close();
            this.isAttributionDialogOpen = false;
        }
    }
    toggle() {
        this.isAttributionDialogOpen ? this.close() : this.open();
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
AttributionDialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: AttributionDialogService, deps: [{ token: i1.MatDialog }, { token: i2.MimeResizeService }, { token: i3.AttributionDialogResizeService }, { token: i4.MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable });
AttributionDialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: AttributionDialogService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: AttributionDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MatDialog }, { type: i2.MimeResizeService }, { type: i3.AttributionDialogResizeService }, { type: i4.MimeDomHelper }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRpb24tZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvYXR0cmlidXRpb24tZGlhbG9nL2F0dHJpYnV0aW9uLWRpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7O0FBRzVFLE1BQU0sT0FBTyx3QkFBd0I7SUFPbkMsWUFDVSxNQUFpQixFQUNqQixpQkFBb0MsRUFDcEMsOEJBQThELEVBQzlELGFBQTRCO1FBSDVCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxtQ0FBOEIsR0FBOUIsOEJBQThCLENBQWdDO1FBQzlELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBVjlCLDRCQUF1QixHQUFHLEtBQUssQ0FBQztRQUNoQyxjQUFTLEdBQW9ELElBQUksQ0FBQztRQUNsRSxRQUFHLEdBQXNCLElBQUksQ0FBQztRQUM5Qiw0QkFBdUIsR0FBRyxDQUFDLENBQUM7SUFRakMsQ0FBQztJQUVHLFVBQVU7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBc0IsRUFBRSxFQUFFO1lBQ25F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YW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1hdERpYWxvZyxcbiAgTWF0RGlhbG9nQ29uZmlnLFxuICBNYXREaWFsb2dSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBpbnRlcnZhbCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL2NvcmUvbWltZS1kb20taGVscGVyJztcbmltcG9ydCB7IE1pbWVSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9taW1lLXJlc2l6ZS1zZXJ2aWNlL21pbWUtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL2RpbWVuc2lvbnMnO1xuaW1wb3J0IHsgQXR0cmlidXRpb25EaWFsb2dSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi9hdHRyaWJ1dGlvbi1kaWFsb2ctcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXR0cmlidXRpb25EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2F0dHJpYnV0aW9uLWRpYWxvZy5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBpc0F0dHJpYnV0aW9uRGlhbG9nT3BlbiA9IGZhbHNlO1xuICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEF0dHJpYnV0aW9uRGlhbG9nQ29tcG9uZW50PiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9lbDogRWxlbWVudFJlZiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGF0dHJpYnV0aW9uRGlhbG9nSGVpZ2h0ID0gMDtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zITogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgcHJpdmF0ZSBtaW1lUmVzaXplU2VydmljZTogTWltZVJlc2l6ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhdHRyaWJ1dGlvbkRpYWxvZ1Jlc2l6ZVNlcnZpY2U6IEF0dHJpYnV0aW9uRGlhbG9nUmVzaXplU2VydmljZSxcbiAgICBwcml2YXRlIG1pbWVEb21IZWxwZXI6IE1pbWVEb21IZWxwZXJcbiAgKSB7fVxuXG4gIHB1YmxpYyBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5taW1lUmVzaXplU2VydmljZS5vblJlc2l6ZS5zdWJzY3JpYmUoKGRpbWVuc2lvbnM6IERpbWVuc2lvbnMpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZGlhbG9nUmVmICYmIHRoaXMuaXNBdHRyaWJ1dGlvbkRpYWxvZ09wZW4pIHtcbiAgICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldERpYWxvZ0NvbmZpZygpO1xuICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLnVwZGF0ZVBvc2l0aW9uKGNvbmZpZy5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ1Jlc2l6ZVNlcnZpY2Uub25SZXNpemUuc3Vic2NyaWJlKFxuICAgICAgICAoZGltZW5zaW9uczogRGltZW5zaW9ucykgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmRpYWxvZ1JlZiAmJiB0aGlzLmlzQXR0cmlidXRpb25EaWFsb2dPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nSGVpZ2h0ID0gZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldERpYWxvZ0NvbmZpZygpO1xuICAgICAgICAgICAgdGhpcy5kaWFsb2dSZWYudXBkYXRlUG9zaXRpb24oY29uZmlnLnBvc2l0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHNldCBlbChlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2VsID0gZWw7XG4gIH1cblxuICBwdWJsaWMgb3Blbih0aW1lb3V0PzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzQXR0cmlidXRpb25EaWFsb2dPcGVuKSB7XG4gICAgICAvKipcbiAgICAgICAqIFNsZWVwaW5nIGZvciBtYXRlcmlhbCBhbmltYXRpb25zIHRvIGZpbmlzaFxuICAgICAgICogZml4OiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvaXNzdWVzLzc0MzhcbiAgICAgICAqL1xuICAgICAgaW50ZXJ2YWwoMTAwMClcbiAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXREaWFsb2dDb25maWcoKTtcbiAgICAgICAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQXR0cmlidXRpb25EaWFsb2dDb21wb25lbnQsIGNvbmZpZyk7XG4gICAgICAgICAgdGhpcy5kaWFsb2dSZWZcbiAgICAgICAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaXNBdHRyaWJ1dGlvbkRpYWxvZ09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy5taW1lRG9tSGVscGVyLnNldEZvY3VzT25WaWV3ZXIoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuaXNBdHRyaWJ1dGlvbkRpYWxvZ09wZW4gPSB0cnVlO1xuICAgICAgICAgIHRoaXMuY2xvc2VEaWFsb2dBZnRlcih0aW1lb3V0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpYWxvZ1JlZikge1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICAgIHRoaXMuaXNBdHRyaWJ1dGlvbkRpYWxvZ09wZW4gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNBdHRyaWJ1dGlvbkRpYWxvZ09wZW4gPyB0aGlzLmNsb3NlKCkgOiB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VEaWFsb2dBZnRlcihzZWNvbmRzOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAoc2Vjb25kcyAmJiBzZWNvbmRzID4gMCkge1xuICAgICAgaW50ZXJ2YWwoc2Vjb25kcyAqIDEwMDApXG4gICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXREaWFsb2dDb25maWcoKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgIHJldHVybiB7XG4gICAgICBoYXNCYWNrZHJvcDogZmFsc2UsXG4gICAgICB3aWR0aDogJzE4MHB4JyxcbiAgICAgIHBhbmVsQ2xhc3M6ICdhdHRyaWJ1dGlvbi1wYW5lbCcsXG4gICAgICBwb3NpdGlvbjoge1xuICAgICAgICB0b3A6IGRpbWVuc2lvbnMudG9wICsgJ3B4JyxcbiAgICAgICAgbGVmdDogZGltZW5zaW9ucy5sZWZ0ICsgJ3B4JyxcbiAgICAgIH0sXG4gICAgICBhdXRvRm9jdXM6IHRydWUsXG4gICAgICByZXN0b3JlRm9jdXM6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldFBvc2l0aW9uKCkge1xuICAgIGlmICghdGhpcy5fZWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgcG9zaXRpb24gYmVjYXVzZSBlbGVtZW50IGlzIG1pc3NpbmdgKVxuICAgIH1cbiAgICBjb25zdCBwYWRkaW5nID0gMjA7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMubWltZURvbUhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QodGhpcy5fZWwpO1xuICAgIHJldHVybiBuZXcgRGltZW5zaW9ucyh7XG4gICAgICB0b3A6XG4gICAgICAgIGRpbWVuc2lvbnMudG9wICsgZGltZW5zaW9ucy5oZWlnaHQgLSB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nSGVpZ2h0IC0gNjgsXG4gICAgICBsZWZ0OiBkaW1lbnNpb25zLmxlZnQgKyBwYWRkaW5nLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==