import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Renderer2, ViewChild, } from '@angular/core';
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
import * as i6 from "@angular/flex-layout/flex";
import * as i7 from "@angular/material/toolbar";
import * as i8 from "@angular/material/button";
import * as i9 from "@angular/material/icon";
import * as i10 from "@angular/material/tooltip";
import * as i11 from "@angular/material/dialog";
const _c0 = ["container"];
export class AttributionDialogComponent {
    constructor(intl, renderer, el, changeDetectorRef, iiifManifestService, attributionDialogResizeService, styleService, accessKeysHandlerService) {
        this.intl = intl;
        this.renderer = renderer;
        this.el = el;
        this.changeDetectorRef = changeDetectorRef;
        this.iiifManifestService = iiifManifestService;
        this.attributionDialogResizeService = attributionDialogResizeService;
        this.styleService = styleService;
        this.accessKeysHandlerService = accessKeysHandlerService;
        this.manifest = null;
        this.subscriptions = new Subscription();
        attributionDialogResizeService.el = el;
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
            this.changeDetectorRef.markForCheck();
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
}
AttributionDialogComponent.ɵfac = function AttributionDialogComponent_Factory(t) { return new (t || AttributionDialogComponent)(i0.ɵɵdirectiveInject(i1.MimeViewerIntl), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.IiifManifestService), i0.ɵɵdirectiveInject(i3.AttributionDialogResizeService), i0.ɵɵdirectiveInject(i4.StyleService), i0.ɵɵdirectiveInject(i5.AccessKeysService)); };
AttributionDialogComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AttributionDialogComponent, selectors: [["ng-component"]], viewQuery: function AttributionDialogComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 7);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.container = _t.first);
    } }, hostBindings: function AttributionDialogComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("keydown", function AttributionDialogComponent_keydown_HostBindingHandler($event) { return ctx.handleKeys($event); })("resize", function AttributionDialogComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, i0.ɵɵresolveWindow);
    } }, decls: 10, vars: 5, consts: [[1, "attribution-container"], ["container", ""], [1, "attribution-toolbar"], ["fxLayout", "row", "fxLayoutAlign", "space-between center", "fxFlex", ""], ["mat-dialog-title", ""], ["mat-icon-button", "", 3, "aria-label", "matTooltip", "matDialogClose"], ["mat-dialog-content", "", 3, "innerHTML"]], template: function AttributionDialogComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0, 1)(2, "mat-toolbar", 2)(3, "div", 3)(4, "h1", 4);
        i0.ɵɵtext(5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "button", 5)(7, "mat-icon");
        i0.ɵɵtext(8, "close");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelement(9, "p", 6);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.intl.attributionLabel);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("aria-label", ctx.intl.attributonCloseAriaLabel)("matTooltip", ctx.intl.closeLabel)("matDialogClose", true);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("innerHTML", ctx.manifest == null ? null : ctx.manifest.attribution, i0.ɵɵsanitizeHtml);
    } }, dependencies: [i6.DefaultLayoutDirective, i6.DefaultLayoutAlignDirective, i6.DefaultFlexDirective, i7.MatToolbar, i8.MatIconButton, i9.MatIcon, i10.MatTooltip, i11.MatDialogClose, i11.MatDialogTitle, i11.MatDialogContent], styles: [".attribution-toolbar[_ngcontent-%COMP%]{font-size:14px;background:transparent;min-height:20px!important;padding:6px}.mat-mdc-dialog-title[_ngcontent-%COMP%]{font-size:16px;padding:0 2px 16px}.mat-mdc-dialog-content[_ngcontent-%COMP%]{padding:8px;margin:0}  .attribution-panel .mdc-dialog__surface{background:transparent!important}  .attribution-container>.mat-mdc-dialog-content{font-family:Roboto,Helvetica Neue,sans-serif;font-size:11px}  .attribution-toolbar>.mat-toolbar-layout>.mat-toolbar-row{height:20px}"], changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AttributionDialogComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, template: "<div #container class=\"attribution-container\">\n  <mat-toolbar class=\"attribution-toolbar\">\n    <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex>\n      <h1 mat-dialog-title>{{ intl.attributionLabel }}</h1>\n      <button\n        mat-icon-button\n        [aria-label]=\"intl.attributonCloseAriaLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        [matDialogClose]=\"true\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n    </div>\n  </mat-toolbar>\n  <p mat-dialog-content [innerHTML]=\"manifest?.attribution\"> </p>\n</div>\n", styles: [".attribution-toolbar{font-size:14px;background:transparent;min-height:20px!important;padding:6px}.mat-mdc-dialog-title{font-size:16px;padding:0 2px 16px}.mat-mdc-dialog-content{padding:8px;margin:0}::ng-deep .attribution-panel .mdc-dialog__surface{background:transparent!important}::ng-deep .attribution-container>.mat-mdc-dialog-content{font-family:Roboto,Helvetica Neue,sans-serif;font-size:11px}::ng-deep .attribution-toolbar>.mat-toolbar-layout>.mat-toolbar-row{height:20px}\n"] }]
    }], function () { return [{ type: i1.MimeViewerIntl }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.IiifManifestService }, { type: i3.AttributionDialogResizeService }, { type: i4.StyleService }, { type: i5.AccessKeysService }]; }, { container: [{
            type: ViewChild,
            args: ['container', { static: true }]
        }], handleKeys: [{
            type: HostListener,
            args: ['keydown', ['$event']]
        }], onResize: [{
            type: HostListener,
            args: ['window:resize', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRpb24tZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9hdHRyaWJ1dGlvbi1kaWFsb2cvYXR0cmlidXRpb24tZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9hdHRyaWJ1dGlvbi1kaWFsb2cvYXR0cmlidXRpb24tZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUdaLFNBQVMsRUFDVCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUMxRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFPckYsTUFBTSxPQUFPLDBCQUEwQjtJQU9yQyxZQUNTLElBQW9CLEVBQ25CLFFBQW1CLEVBQ25CLEVBQWMsRUFDZCxpQkFBb0MsRUFDcEMsbUJBQXdDLEVBQ3hDLDhCQUE4RCxFQUM5RCxZQUEwQixFQUMxQix3QkFBMkM7UUFQNUMsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2Qsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLG1DQUE4QixHQUE5Qiw4QkFBOEIsQ0FBZ0M7UUFDOUQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUFtQjtRQVo5QyxhQUFRLEdBQW9CLElBQUksQ0FBQztRQUNoQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFhekMsOEJBQThCLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FDaEQsQ0FBQyxRQUF5QixFQUFFLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hDLENBQUMsQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUF5QixFQUFFLEVBQUU7WUFDakUsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FDekQsS0FBSyxFQUNMLEdBQUcsQ0FDSixDQUFDO2dCQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFDN0Isa0JBQWtCLEVBQ2xCLG1CQUFtQixDQUNwQixDQUFDO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFHRCxVQUFVLENBQUMsS0FBb0I7UUFDN0IsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsUUFBUSxDQUFDLEtBQVU7UUFDakIsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JELENBQUM7O29HQWpFVSwwQkFBMEI7NkVBQTFCLDBCQUEwQjs7Ozs7O2lIQUExQixzQkFBa0IsOEZBQWxCLG9CQUFnQjs7UUMxQjdCLGlDQUE4QyxxQkFBQSxhQUFBLFlBQUE7UUFHbkIsWUFBMkI7UUFBQSxpQkFBSztRQUNyRCxpQ0FLQyxlQUFBO1FBQ1cscUJBQUs7UUFBQSxpQkFBVyxFQUFBLEVBQUEsRUFBQTtRQUloQyx1QkFBK0Q7UUFDakUsaUJBQU07O1FBWnFCLGVBQTJCO1FBQTNCLCtDQUEyQjtRQUc5QyxlQUE0QztRQUE1Qyw4REFBNEMsbUNBQUEsd0JBQUE7UUFRNUIsZUFBbUM7UUFBbkMscUdBQW1DOzt1RkRZOUMsMEJBQTBCO2NBTHRDLFNBQVM7a0NBR1MsdUJBQXVCLENBQUMsTUFBTTs0UkFPTCxTQUFTO2tCQUFsRCxTQUFTO21CQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFpRHhDLFVBQVU7a0JBRFQsWUFBWTttQkFBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFNbkMsUUFBUTtrQkFEUCxZQUFZO21CQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjY2Vzc0tleXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9hY2Nlc3Mta2V5cy1oYW5kbGVyLXNlcnZpY2UvYWNjZXNzLWtleXMuc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vY29yZS9pbnRsJztcbmltcG9ydCB7IE1hbmlmZXN0IH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9zdHlsZS1zZXJ2aWNlL3N0eWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXR0cmlidXRpb25EaWFsb2dSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi9hdHRyaWJ1dGlvbi1kaWFsb2ctcmVzaXplLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGVVcmw6ICcuL2F0dHJpYnV0aW9uLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2F0dHJpYnV0aW9uLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQXR0cmlidXRpb25EaWFsb2dDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3Q2hlY2tlZFxue1xuICBwdWJsaWMgbWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgY29udGFpbmVyPzogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBpaWlmTWFuaWZlc3RTZXJ2aWNlOiBJaWlmTWFuaWZlc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgYXR0cmlidXRpb25EaWFsb2dSZXNpemVTZXJ2aWNlOiBBdHRyaWJ1dGlvbkRpYWxvZ1Jlc2l6ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcbiAgICBwcml2YXRlIGFjY2Vzc0tleXNIYW5kbGVyU2VydmljZTogQWNjZXNzS2V5c1NlcnZpY2VcbiAgKSB7XG4gICAgYXR0cmlidXRpb25EaWFsb2dSZXNpemVTZXJ2aWNlLmVsID0gZWw7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5tYW5pZmVzdCA9IG1hbmlmZXN0O1xuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnN0eWxlU2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoKGNvbG9yOiBzdHJpbmcgfCB1bmRlZmluZWQpID0+IHtcbiAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgY29uc3QgYmFja2dyb3VuZFJnYmFDb2xvciA9IHRoaXMuc3R5bGVTZXJ2aWNlLmNvbnZlcnRUb1JnYmEoXG4gICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgIDAuM1xuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyPy5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InLFxuICAgICAgICAgICAgYmFja2dyb3VuZFJnYmFDb2xvclxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIGhhbmRsZUtleXMoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICB0aGlzLmFjY2Vzc0tleXNIYW5kbGVyU2VydmljZS5oYW5kbGVLZXlFdmVudHMoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nUmVzaXplU2VydmljZS5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nUmVzaXplU2VydmljZS5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIiwiPGRpdiAjY29udGFpbmVyIGNsYXNzPVwiYXR0cmlidXRpb24tY29udGFpbmVyXCI+XG4gIDxtYXQtdG9vbGJhciBjbGFzcz1cImF0dHJpYnV0aW9uLXRvb2xiYXJcIj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCIgZnhGbGV4PlxuICAgICAgPGgxIG1hdC1kaWFsb2ctdGl0bGU+e3sgaW50bC5hdHRyaWJ1dGlvbkxhYmVsIH19PC9oMT5cbiAgICAgIDxidXR0b25cbiAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgIFthcmlhLWxhYmVsXT1cImludGwuYXR0cmlidXRvbkNsb3NlQXJpYUxhYmVsXCJcbiAgICAgICAgW21hdFRvb2x0aXBdPVwiaW50bC5jbG9zZUxhYmVsXCJcbiAgICAgICAgW21hdERpYWxvZ0Nsb3NlXT1cInRydWVcIlxuICAgICAgPlxuICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvbWF0LXRvb2xiYXI+XG4gIDxwIG1hdC1kaWFsb2ctY29udGVudCBbaW5uZXJIVE1MXT1cIm1hbmlmZXN0Py5hdHRyaWJ1dGlvblwiPiA8L3A+XG48L2Rpdj5cbiJdfQ==