import { Component, ElementRef, HostListener, Renderer2, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { StyleService } from '../core/style-service/style.service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import * as i0 from "@angular/core";
import * as i1 from "../core/intl";
import * as i2 from "../core/iiif-manifest-service/iiif-manifest-service";
import * as i3 from "./attribution-dialog-resize.service";
import * as i4 from "../core/style-service/style.service";
import * as i5 from "../core/access-keys-handler-service/access-keys.service";
import * as i6 from "@angular/material/toolbar";
import * as i7 from "@angular/material/button";
import * as i8 from "@angular/material/icon";
import * as i9 from "@angular/material/tooltip";
import * as i10 from "@angular/material/dialog";
export class AttributionDialogComponent {
    constructor(intl, renderer, iiifManifestService, attributionDialogResizeService, styleService, accessKeysHandlerService) {
        this.intl = intl;
        this.renderer = renderer;
        this.iiifManifestService = iiifManifestService;
        this.attributionDialogResizeService = attributionDialogResizeService;
        this.styleService = styleService;
        this.accessKeysHandlerService = accessKeysHandlerService;
        this.manifest = null;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.attributionDialogResizeService.el = this.container;
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
        }));
    }
    ngAfterViewInit() {
        this.subscriptions.add(this.styleService.onChange.subscribe((color) => {
            if (color) {
                const backgroundRgbaColor = this.styleService.convertToRgba(color, 0.3);
                this.renderer.setStyle(this.container?.nativeElement, 'background-color', backgroundRgbaColor);
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    handleKeys(event) {
        this.accessKeysHandlerService.handleKeyEvents(event);
    }
    onResize(event) {
        this.attributionDialogResizeService.markForCheck();
    }
    ngAfterViewChecked() {
        this.attributionDialogResizeService.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: AttributionDialogComponent, deps: [{ token: i1.MimeViewerIntl }, { token: i0.Renderer2 }, { token: i2.IiifManifestService }, { token: i3.AttributionDialogResizeService }, { token: i4.StyleService }, { token: i5.AccessKeysService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.9", type: AttributionDialogComponent, selector: "ng-component", host: { listeners: { "keydown": "handleKeys($event)", "window:resize": "onResize($event)" } }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, static: true }], ngImport: i0, template: "<div #container class=\"attribution-container\">\n  <mat-toolbar class=\"attribution-toolbar justify-between\">\n    <h1 mat-dialog-title>{{ intl.attributionLabel }}</h1>\n    <button\n      mat-icon-button\n      [aria-label]=\"intl.attributonCloseAriaLabel\"\n      [matTooltip]=\"intl.closeLabel\"\n      [matDialogClose]=\"true\"\n    >\n      <mat-icon>close</mat-icon>\n    </button>\n  </mat-toolbar>\n  <p mat-dialog-content [innerHTML]=\"manifest?.attribution\"> </p>\n</div>\n", styles: [".attribution-toolbar{font-size:14px;background:transparent;min-height:20px!important;padding:6px}.mat-mdc-dialog-title{font-size:16px;padding:0 2px 16px}.mat-mdc-dialog-content{padding:8px;margin:0}::ng-deep .attribution-panel .mdc-dialog__surface{background:transparent!important}::ng-deep .attribution-container>.mat-mdc-dialog-content{font-size:11px}::ng-deep .attribution-toolbar>.mat-toolbar-layout>.mat-toolbar-row{height:20px}\n"], dependencies: [{ kind: "component", type: i6.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { kind: "component", type: i7.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }, { kind: "component", type: i8.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i9.MatTooltip, selector: "[matTooltip]", inputs: ["matTooltipPosition", "matTooltipPositionAtOrigin", "matTooltipDisabled", "matTooltipShowDelay", "matTooltipHideDelay", "matTooltipTouchGestures", "matTooltip", "matTooltipClass"], exportAs: ["matTooltip"] }, { kind: "directive", type: i10.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i10.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i10.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: AttributionDialogComponent, decorators: [{
            type: Component,
            args: [{ template: "<div #container class=\"attribution-container\">\n  <mat-toolbar class=\"attribution-toolbar justify-between\">\n    <h1 mat-dialog-title>{{ intl.attributionLabel }}</h1>\n    <button\n      mat-icon-button\n      [aria-label]=\"intl.attributonCloseAriaLabel\"\n      [matTooltip]=\"intl.closeLabel\"\n      [matDialogClose]=\"true\"\n    >\n      <mat-icon>close</mat-icon>\n    </button>\n  </mat-toolbar>\n  <p mat-dialog-content [innerHTML]=\"manifest?.attribution\"> </p>\n</div>\n", styles: [".attribution-toolbar{font-size:14px;background:transparent;min-height:20px!important;padding:6px}.mat-mdc-dialog-title{font-size:16px;padding:0 2px 16px}.mat-mdc-dialog-content{padding:8px;margin:0}::ng-deep .attribution-panel .mdc-dialog__surface{background:transparent!important}::ng-deep .attribution-container>.mat-mdc-dialog-content{font-size:11px}::ng-deep .attribution-toolbar>.mat-toolbar-layout>.mat-toolbar-row{height:20px}\n"] }]
        }], ctorParameters: () => [{ type: i1.MimeViewerIntl }, { type: i0.Renderer2 }, { type: i2.IiifManifestService }, { type: i3.AttributionDialogResizeService }, { type: i4.StyleService }, { type: i5.AccessKeysService }], propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { static: true }]
            }], handleKeys: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], onResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRpb24tZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9hdHRyaWJ1dGlvbi1kaWFsb2cvYXR0cmlidXRpb24tZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9hdHRyaWJ1dGlvbi1kaWFsb2cvYXR0cmlidXRpb24tZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFHWixTQUFTLEVBQ1QsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDNUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDMUYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDbkUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7Ozs7Ozs7OztBQU1yRixNQUFNLE9BQU8sMEJBQTBCO0lBT3JDLFlBQ1MsSUFBb0IsRUFDbkIsUUFBbUIsRUFDbkIsbUJBQXdDLEVBQ3hDLDhCQUE4RCxFQUM5RCxZQUEwQixFQUMxQix3QkFBMkM7UUFMNUMsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLG1DQUE4QixHQUE5Qiw4QkFBOEIsQ0FBZ0M7UUFDOUQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUFtQjtRQVY5QyxhQUFRLEdBQW9CLElBQUksQ0FBQztRQUNoQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFVeEMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsOEJBQThCLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFFeEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUNoRCxDQUFDLFFBQXlCLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUMzQixDQUFDLENBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBeUIsRUFBRSxFQUFFO1lBQ2pFLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ1YsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FDekQsS0FBSyxFQUNMLEdBQUcsQ0FDSixDQUFDO2dCQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFDN0Isa0JBQWtCLEVBQ2xCLG1CQUFtQixDQUNwQixDQUFDO1lBQ0osQ0FBQztRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUdELFVBQVUsQ0FBQyxLQUFvQjtRQUM3QixJQUFJLENBQUMsd0JBQXdCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFHRCxRQUFRLENBQUMsS0FBVTtRQUNqQixJQUFJLENBQUMsOEJBQThCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckQsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsOEJBQThCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckQsQ0FBQzs4R0E5RFUsMEJBQTBCO2tHQUExQiwwQkFBMEIseVFDdkJ2Qyx3ZUFjQTs7MkZEU2EsMEJBQTBCO2tCQUp0QyxTQUFTOztxUEFTa0MsU0FBUztzQkFBbEQsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQThDeEMsVUFBVTtzQkFEVCxZQUFZO3VCQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFNbkMsUUFBUTtzQkFEUCxZQUFZO3VCQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBY2Nlc3NLZXlzU2VydmljZSB9IGZyb20gJy4uL2NvcmUvYWNjZXNzLWtleXMtaGFuZGxlci1zZXJ2aWNlL2FjY2Vzcy1rZXlzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZk1hbmlmZXN0U2VydmljZSB9IGZyb20gJy4uL2NvcmUvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3Qtc2VydmljZSc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4uL2NvcmUvaW50bCc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4uL2NvcmUvc3R5bGUtc2VydmljZS9zdHlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IEF0dHJpYnV0aW9uRGlhbG9nUmVzaXplU2VydmljZSB9IGZyb20gJy4vYXR0cmlidXRpb24tZGlhbG9nLXJlc2l6ZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAnLi9hdHRyaWJ1dGlvbi1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hdHRyaWJ1dGlvbi1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQXR0cmlidXRpb25EaWFsb2dDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3Q2hlY2tlZFxue1xuICBwdWJsaWMgbWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgY29udGFpbmVyITogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgaWlpZk1hbmlmZXN0U2VydmljZTogSWlpZk1hbmlmZXN0U2VydmljZSxcbiAgICBwcml2YXRlIGF0dHJpYnV0aW9uRGlhbG9nUmVzaXplU2VydmljZTogQXR0cmlidXRpb25EaWFsb2dSZXNpemVTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhY2Nlc3NLZXlzSGFuZGxlclNlcnZpY2U6IEFjY2Vzc0tleXNTZXJ2aWNlLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ1Jlc2l6ZVNlcnZpY2UuZWwgPSB0aGlzLmNvbnRhaW5lcjtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuY3VycmVudE1hbmlmZXN0LnN1YnNjcmliZShcbiAgICAgICAgKG1hbmlmZXN0OiBNYW5pZmVzdCB8IG51bGwpID0+IHtcbiAgICAgICAgICB0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuc3R5bGVTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZSgoY29sb3I6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT4ge1xuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICBjb25zdCBiYWNrZ3JvdW5kUmdiYUNvbG9yID0gdGhpcy5zdHlsZVNlcnZpY2UuY29udmVydFRvUmdiYShcbiAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgMC4zLFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyPy5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InLFxuICAgICAgICAgICAgYmFja2dyb3VuZFJnYmFDb2xvcixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgaGFuZGxlS2V5cyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIHRoaXMuYWNjZXNzS2V5c0hhbmRsZXJTZXJ2aWNlLmhhbmRsZUtleUV2ZW50cyhldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dSZXNpemVTZXJ2aWNlLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dSZXNpemVTZXJ2aWNlLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iLCI8ZGl2ICNjb250YWluZXIgY2xhc3M9XCJhdHRyaWJ1dGlvbi1jb250YWluZXJcIj5cbiAgPG1hdC10b29sYmFyIGNsYXNzPVwiYXR0cmlidXRpb24tdG9vbGJhciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICA8aDEgbWF0LWRpYWxvZy10aXRsZT57eyBpbnRsLmF0dHJpYnV0aW9uTGFiZWwgfX08L2gxPlxuICAgIDxidXR0b25cbiAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgW2FyaWEtbGFiZWxdPVwiaW50bC5hdHRyaWJ1dG9uQ2xvc2VBcmlhTGFiZWxcIlxuICAgICAgW21hdFRvb2x0aXBdPVwiaW50bC5jbG9zZUxhYmVsXCJcbiAgICAgIFttYXREaWFsb2dDbG9zZV09XCJ0cnVlXCJcbiAgICA+XG4gICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICA8L21hdC10b29sYmFyPlxuICA8cCBtYXQtZGlhbG9nLWNvbnRlbnQgW2lubmVySFRNTF09XCJtYW5pZmVzdD8uYXR0cmlidXRpb25cIj4gPC9wPlxuPC9kaXY+XG4iXX0=