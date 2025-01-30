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
import * as i6 from "@angular/material/button";
import * as i7 from "@angular/material/icon";
import * as i8 from "@angular/material/tooltip";
import * as i9 from "@angular/material/dialog";
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.9", type: AttributionDialogComponent, selector: "ng-component", host: { listeners: { "keydown": "handleKeys($event)", "window:resize": "onResize($event)" } }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, static: true }], ngImport: i0, template: "<div #container class=\"attribution-container\">\n  <div class=\"attribution-toolbar mr-4 flex items-center justify-between\">\n    <h1 mat-dialog-title>{{ intl.attributionLabel }}</h1>\n    <button\n      mat-icon-button\n      [aria-label]=\"intl.attributonCloseAriaLabel\"\n      [matTooltip]=\"intl.closeLabel\"\n      [matDialogClose]=\"true\"\n    >\n      <mat-icon>close</mat-icon>\n    </button>\n  </div>\n  <p mat-dialog-content [innerHTML]=\"manifest?.attribution\"> </p>\n</div>\n", styles: [".attribution-toolbar{background:transparent}::ng-deep .attribution-panel .mdc-dialog__surface{background:transparent!important}::ng-deep .attribution-container>.mat-mdc-dialog-content{font-size:11px}::ng-deep .attribution-toolbar>.mat-toolbar-layout>.mat-toolbar-row{height:20px}\n"], dependencies: [{ kind: "component", type: i6.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }, { kind: "component", type: i7.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i8.MatTooltip, selector: "[matTooltip]", inputs: ["matTooltipPosition", "matTooltipPositionAtOrigin", "matTooltipDisabled", "matTooltipShowDelay", "matTooltipHideDelay", "matTooltipTouchGestures", "matTooltip", "matTooltipClass"], exportAs: ["matTooltip"] }, { kind: "directive", type: i9.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i9.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i9.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: AttributionDialogComponent, decorators: [{
            type: Component,
            args: [{ template: "<div #container class=\"attribution-container\">\n  <div class=\"attribution-toolbar mr-4 flex items-center justify-between\">\n    <h1 mat-dialog-title>{{ intl.attributionLabel }}</h1>\n    <button\n      mat-icon-button\n      [aria-label]=\"intl.attributonCloseAriaLabel\"\n      [matTooltip]=\"intl.closeLabel\"\n      [matDialogClose]=\"true\"\n    >\n      <mat-icon>close</mat-icon>\n    </button>\n  </div>\n  <p mat-dialog-content [innerHTML]=\"manifest?.attribution\"> </p>\n</div>\n", styles: [".attribution-toolbar{background:transparent}::ng-deep .attribution-panel .mdc-dialog__surface{background:transparent!important}::ng-deep .attribution-container>.mat-mdc-dialog-content{font-size:11px}::ng-deep .attribution-toolbar>.mat-toolbar-layout>.mat-toolbar-row{height:20px}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRpb24tZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9hdHRyaWJ1dGlvbi1kaWFsb2cvYXR0cmlidXRpb24tZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9hdHRyaWJ1dGlvbi1kaWFsb2cvYXR0cmlidXRpb24tZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFHWixTQUFTLEVBQ1QsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDNUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDMUYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDbkUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7Ozs7Ozs7O0FBTXJGLE1BQU0sT0FBTywwQkFBMEI7SUFPckMsWUFDUyxJQUFvQixFQUNuQixRQUFtQixFQUNuQixtQkFBd0MsRUFDeEMsOEJBQThELEVBQzlELFlBQTBCLEVBQzFCLHdCQUEyQztRQUw1QyxTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsbUNBQThCLEdBQTlCLDhCQUE4QixDQUFnQztRQUM5RCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQW1CO1FBVjlDLGFBQVEsR0FBb0IsSUFBSSxDQUFDO1FBQ2hDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQVV4QyxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUV4RCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQ2hELENBQUMsUUFBeUIsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzNCLENBQUMsQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUF5QixFQUFFLEVBQUU7WUFDakUsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDVixNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUN6RCxLQUFLLEVBQ0wsR0FBRyxDQUNKLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxFQUM3QixrQkFBa0IsRUFDbEIsbUJBQW1CLENBQ3BCLENBQUM7WUFDSixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBR0QsVUFBVSxDQUFDLEtBQW9CO1FBQzdCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUdELFFBQVEsQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyRCxDQUFDOzhHQTlEVSwwQkFBMEI7a0dBQTFCLDBCQUEwQix5UUN2QnZDLCtlQWNBOzsyRkRTYSwwQkFBMEI7a0JBSnRDLFNBQVM7O3FQQVNrQyxTQUFTO3NCQUFsRCxTQUFTO3VCQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBOEN4QyxVQUFVO3NCQURULFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQU1uQyxRQUFRO3NCQURQLFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjY2Vzc0tleXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9hY2Nlc3Mta2V5cy1oYW5kbGVyLXNlcnZpY2UvYWNjZXNzLWtleXMuc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vY29yZS9pbnRsJztcbmltcG9ydCB7IE1hbmlmZXN0IH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9zdHlsZS1zZXJ2aWNlL3N0eWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXR0cmlidXRpb25EaWFsb2dSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi9hdHRyaWJ1dGlvbi1kaWFsb2ctcmVzaXplLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGVVcmw6ICcuL2F0dHJpYnV0aW9uLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2F0dHJpYnV0aW9uLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGlvbkRpYWxvZ0NvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdDaGVja2VkXG57XG4gIHB1YmxpYyBtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb250YWluZXIhOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpbnRsOiBNaW1lVmlld2VySW50bCxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBpaWlmTWFuaWZlc3RTZXJ2aWNlOiBJaWlmTWFuaWZlc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgYXR0cmlidXRpb25EaWFsb2dSZXNpemVTZXJ2aWNlOiBBdHRyaWJ1dGlvbkRpYWxvZ1Jlc2l6ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcbiAgICBwcml2YXRlIGFjY2Vzc0tleXNIYW5kbGVyU2VydmljZTogQWNjZXNzS2V5c1NlcnZpY2UsXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nUmVzaXplU2VydmljZS5lbCA9IHRoaXMuY29udGFpbmVyO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5jdXJyZW50TWFuaWZlc3Quc3Vic2NyaWJlKFxuICAgICAgICAobWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCkgPT4ge1xuICAgICAgICAgIHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgfSxcbiAgICAgICksXG4gICAgKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5zdHlsZVNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChjb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgIGNvbnN0IGJhY2tncm91bmRSZ2JhQ29sb3IgPSB0aGlzLnN0eWxlU2VydmljZS5jb252ZXJ0VG9SZ2JhKFxuICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAwLjMsXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgICAgdGhpcy5jb250YWluZXI/Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcicsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUmdiYUNvbG9yLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBoYW5kbGVLZXlzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgdGhpcy5hY2Nlc3NLZXlzSGFuZGxlclNlcnZpY2UuaGFuZGxlS2V5RXZlbnRzKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBvblJlc2l6ZShldmVudDogYW55KSB7XG4gICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ1Jlc2l6ZVNlcnZpY2UubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ1Jlc2l6ZVNlcnZpY2UubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiIsIjxkaXYgI2NvbnRhaW5lciBjbGFzcz1cImF0dHJpYnV0aW9uLWNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwiYXR0cmlidXRpb24tdG9vbGJhciBtci00IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgIDxoMSBtYXQtZGlhbG9nLXRpdGxlPnt7IGludGwuYXR0cmlidXRpb25MYWJlbCB9fTwvaDE+XG4gICAgPGJ1dHRvblxuICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICBbYXJpYS1sYWJlbF09XCJpbnRsLmF0dHJpYnV0b25DbG9zZUFyaWFMYWJlbFwiXG4gICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLmNsb3NlTGFiZWxcIlxuICAgICAgW21hdERpYWxvZ0Nsb3NlXT1cInRydWVcIlxuICAgID5cbiAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuICA8cCBtYXQtZGlhbG9nLWNvbnRlbnQgW2lubmVySFRNTF09XCJtYW5pZmVzdD8uYXR0cmlidXRpb25cIj4gPC9wPlxuPC9kaXY+XG4iXX0=