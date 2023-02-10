import { animate, group, state, style, transition, trigger, } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Renderer2, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { ViewerOptions } from '../../core/models/viewer-options';
import { ViewingDirection } from '../../core/models/viewing-direction';
import { StyleService } from '../../core/style-service/style.service';
import { CanvasService } from './../../core/canvas-service/canvas-service';
import { MimeViewerIntl } from './../../core/intl';
import { MimeResizeService } from './../../core/mime-resize-service/mime-resize.service';
import { ViewerService } from './../../core/viewer-service/viewer.service';
import * as i0 from "@angular/core";
import * as i1 from "./../../core/intl";
import * as i2 from "./../../core/mime-resize-service/mime-resize.service";
import * as i3 from "./../../core/viewer-service/viewer.service";
import * as i4 from "./../../core/canvas-service/canvas-service";
import * as i5 from "../../core/style-service/style.service";
import * as i6 from "../../core/iiif-manifest-service/iiif-manifest-service";
import * as i7 from "@angular/common";
import * as i8 from "@angular/flex-layout/flex";
import * as i9 from "@angular/flex-layout/extended";
import * as i10 from "@angular/material/button";
import * as i11 from "@angular/material/icon";
import * as i12 from "@angular/material/tooltip";
const _c0 = ["container"];
function OsdToolbarComponent_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 10);
    i0.ɵɵlistener("click", function OsdToolbarComponent_ng_container_6_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.goToPreviousCanvasGroup()); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "navigate_before");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("matTooltip", ctx_r1.intl.previousPageLabel)("disabled", ctx_r1.isFirstCanvasGroup);
    i0.ɵɵattribute("aria-label", ctx_r1.intl.previousPageLabel);
} }
function OsdToolbarComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 11);
    i0.ɵɵlistener("click", function OsdToolbarComponent_ng_container_7_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.goToNextCanvasGroup()); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "navigate_before");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("matTooltip", ctx_r2.intl.nextPageLabel)("disabled", ctx_r2.isLastCanvasGroup);
    i0.ɵɵattribute("aria-label", ctx_r2.intl.nextPageLabel);
} }
function OsdToolbarComponent_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 11);
    i0.ɵɵlistener("click", function OsdToolbarComponent_ng_container_11_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.goToNextCanvasGroup()); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "navigate_next");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("matTooltip", ctx_r3.intl.nextPageLabel)("disabled", ctx_r3.isLastCanvasGroup);
    i0.ɵɵattribute("aria-label", ctx_r3.intl.nextPageLabel);
} }
function OsdToolbarComponent_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 10);
    i0.ɵɵlistener("click", function OsdToolbarComponent_ng_container_12_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.goToPreviousCanvasGroup()); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "navigate_next");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("matTooltip", ctx_r4.intl.previousPageLabel)("disabled", ctx_r4.isFirstCanvasGroup);
    i0.ɵɵattribute("aria-label", ctx_r4.intl.previousPageLabel);
} }
export class OsdToolbarComponent {
    constructor(intl, renderer, changeDetectorRef, mimeService, viewerService, canvasService, styleService, iiifManifestService) {
        this.intl = intl;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.mimeService = mimeService;
        this.viewerService = viewerService;
        this.canvasService = canvasService;
        this.styleService = styleService;
        this.iiifManifestService = iiifManifestService;
        this.osdToolbarStyle = {};
        this.numberOfCanvasGroups = 0;
        this.isFirstCanvasGroup = false;
        this.isLastCanvasGroup = false;
        this.state = 'hide';
        this.invert = false;
        this.subscriptions = new Subscription();
    }
    get osdToolbarState() {
        return this.state;
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            if (manifest) {
                this.invert = manifest.viewingDirection === ViewingDirection.LTR;
                this.changeDetectorRef.detectChanges();
            }
        }));
        this.subscriptions.add(this.mimeService.onResize.subscribe((dimensions) => {
            this.osdToolbarStyle = {
                top: dimensions.top + 110 + 'px',
            };
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.viewerService.onCanvasGroupIndexChange.subscribe((currentCanvasGroupIndex) => {
            this.numberOfCanvasGroups = this.canvasService.numberOfCanvasGroups;
            this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(currentCanvasGroupIndex);
            this.isLastCanvasGroup = this.isOnLastCanvasGroup(currentCanvasGroupIndex);
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
    }
    ngAfterViewInit() {
        this.subscriptions.add(this.styleService.onChange.subscribe((color) => {
            if (color) {
                const backgroundRgbaColor = this.styleService.convertToRgba(color, 0.3);
                this.renderer.setStyle(this.container.nativeElement, 'background-color', backgroundRgbaColor);
            }
        }));
    }
    zoomIn() {
        this.viewerService.zoomIn();
    }
    zoomOut() {
        this.viewerService.zoomOut();
    }
    home() {
        this.viewerService.home();
    }
    rotate() {
        this.viewerService.rotate();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    goToPreviousCanvasGroup() {
        this.viewerService.goToPreviousCanvasGroup();
    }
    goToNextCanvasGroup() {
        this.viewerService.goToNextCanvasGroup();
    }
    isOnFirstCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === 0;
    }
    isOnLastCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === this.numberOfCanvasGroups - 1;
    }
}
OsdToolbarComponent.ɵfac = function OsdToolbarComponent_Factory(t) { return new (t || OsdToolbarComponent)(i0.ɵɵdirectiveInject(i1.MimeViewerIntl), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.MimeResizeService), i0.ɵɵdirectiveInject(i3.ViewerService), i0.ɵɵdirectiveInject(i4.CanvasService), i0.ɵɵdirectiveInject(i5.StyleService), i0.ɵɵdirectiveInject(i6.IiifManifestService)); };
OsdToolbarComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OsdToolbarComponent, selectors: [["mime-osd-toolbar"]], viewQuery: function OsdToolbarComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 7);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.container = _t.first);
    } }, hostVars: 1, hostBindings: function OsdToolbarComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵsyntheticHostProperty("@osdToolbarState", ctx.osdToolbarState);
    } }, decls: 23, vars: 13, consts: [[1, "osd-toolbar", 3, "ngStyle"], ["container", ""], ["fxHide", "", "fxShow.gt-sm", "true"], ["fxLayout", "column", "fxLayoutAlign", "center center", 1, "osd-toolbar-container"], [1, "osd-toolbar-row"], [4, "ngIf"], ["id", "homeButton", "mat-icon-button", "", 3, "matTooltip", "click"], ["id", "zoomInButton", "mat-icon-button", "", 3, "matTooltip", "click"], ["id", "rotateButton", "mat-icon-button", "", 3, "matTooltip", "click"], ["id", "zoomOutButton", "mat-icon-button", "", 3, "matTooltip", "click"], ["id", "navigateBeforeButton", "mat-icon-button", "", 3, "matTooltip", "disabled", "click"], ["id", "navigateNextButton", "mat-icon-button", "", 3, "matTooltip", "disabled", "click"]], template: function OsdToolbarComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0, 1)(2, "div", 2)(3, "div", 3);
        i0.ɵɵelement(4, "div", 4);
        i0.ɵɵelementStart(5, "div", 4);
        i0.ɵɵtemplate(6, OsdToolbarComponent_ng_container_6_Template, 4, 3, "ng-container", 5);
        i0.ɵɵtemplate(7, OsdToolbarComponent_ng_container_7_Template, 4, 3, "ng-container", 5);
        i0.ɵɵelementStart(8, "button", 6);
        i0.ɵɵlistener("click", function OsdToolbarComponent_Template_button_click_8_listener() { return ctx.home(); });
        i0.ɵɵelementStart(9, "mat-icon");
        i0.ɵɵtext(10, "home");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(11, OsdToolbarComponent_ng_container_11_Template, 4, 3, "ng-container", 5);
        i0.ɵɵtemplate(12, OsdToolbarComponent_ng_container_12_Template, 4, 3, "ng-container", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "div", 4)(14, "button", 7);
        i0.ɵɵlistener("click", function OsdToolbarComponent_Template_button_click_14_listener() { return ctx.zoomIn(); });
        i0.ɵɵelementStart(15, "mat-icon");
        i0.ɵɵtext(16, "zoom_in");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(17, "button", 8);
        i0.ɵɵlistener("click", function OsdToolbarComponent_Template_button_click_17_listener() { return ctx.rotate(); });
        i0.ɵɵelementStart(18, "mat-icon");
        i0.ɵɵtext(19, "rotate_right");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(20, "button", 9);
        i0.ɵɵlistener("click", function OsdToolbarComponent_Template_button_click_20_listener() { return ctx.zoomOut(); });
        i0.ɵɵelementStart(21, "mat-icon");
        i0.ɵɵtext(22, "zoom_out");
        i0.ɵɵelementEnd()()()()()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngStyle", ctx.osdToolbarStyle);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngIf", ctx.invert);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.invert);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("matTooltip", ctx.intl.homeLabel);
        i0.ɵɵattribute("aria-label", ctx.intl.homeLabel);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.invert);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.invert);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("matTooltip", ctx.intl.zoomInLabel);
        i0.ɵɵattribute("aria-label", ctx.intl.zoomInLabel);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("matTooltip", ctx.intl.rotateCwLabel);
        i0.ɵɵattribute("aria-label", ctx.intl.rotateCwLabel);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("matTooltip", ctx.intl.zoomOutLabel);
        i0.ɵɵattribute("aria-label", ctx.intl.zoomOutLabel);
    } }, dependencies: [i7.NgIf, i7.NgStyle, i8.DefaultLayoutDirective, i8.DefaultLayoutAlignDirective, i9.DefaultShowHideDirective, i9.DefaultStyleDirective, i10.MatIconButton, i11.MatIcon, i12.MatTooltip], styles: ["[_nghost-%COMP%]{z-index:2}  .osd-toolbar-row>.mat-toolbar-row{height:40px}.osd-toolbar[_ngcontent-%COMP%]{position:absolute;background:transparent;width:auto;border-radius:8px;margin-left:16px}"], data: { animation: [
            trigger('osdToolbarState', [
                state('hide', style({
                    transform: 'translate(-120px, 0)',
                    display: 'none',
                })),
                state('show', style({
                    transform: 'translate(0px, 0px)',
                    display: 'block',
                })),
                transition('hide => show', [
                    group([
                        style({ display: 'block' }),
                        animate(`${ViewerOptions.transitions.toolbarsEaseInTime}ms ease-out`),
                    ]),
                ]),
                transition('show => hide', animate(`${ViewerOptions.transitions.toolbarsEaseOutTime}ms ease-in`)),
            ]),
        ] }, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OsdToolbarComponent, [{
        type: Component,
        args: [{ selector: 'mime-osd-toolbar', changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                    trigger('osdToolbarState', [
                        state('hide', style({
                            transform: 'translate(-120px, 0)',
                            display: 'none',
                        })),
                        state('show', style({
                            transform: 'translate(0px, 0px)',
                            display: 'block',
                        })),
                        transition('hide => show', [
                            group([
                                style({ display: 'block' }),
                                animate(`${ViewerOptions.transitions.toolbarsEaseInTime}ms ease-out`),
                            ]),
                        ]),
                        transition('show => hide', animate(`${ViewerOptions.transitions.toolbarsEaseOutTime}ms ease-in`)),
                    ]),
                ], template: "<div #container class=\"osd-toolbar\" [ngStyle]=\"osdToolbarStyle\">\n  <div fxHide fxShow.gt-sm=\"true\">\n    <div\n      class=\"osd-toolbar-container\"\n      fxLayout=\"column\"\n      fxLayoutAlign=\"center center\"\n    >\n      <div class=\"osd-toolbar-row\"> </div>\n      <div class=\"osd-toolbar-row\">\n        <ng-container *ngIf=\"invert\">\n          <button\n            id=\"navigateBeforeButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.previousPageLabel\"\n            [matTooltip]=\"intl.previousPageLabel\"\n            [disabled]=\"isFirstCanvasGroup\"\n            (click)=\"goToPreviousCanvasGroup()\"\n          >\n            <mat-icon>navigate_before</mat-icon>\n          </button>\n        </ng-container>\n        <ng-container *ngIf=\"!invert\">\n          <button\n            id=\"navigateNextButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.nextPageLabel\"\n            [matTooltip]=\"intl.nextPageLabel\"\n            [disabled]=\"isLastCanvasGroup\"\n            (click)=\"goToNextCanvasGroup()\"\n          >\n            <mat-icon>navigate_before</mat-icon>\n          </button>\n        </ng-container>\n        <button\n          (click)=\"home()\"\n          id=\"homeButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.homeLabel\"\n          [matTooltip]=\"intl.homeLabel\"\n        >\n          <mat-icon>home</mat-icon>\n        </button>\n        <ng-container *ngIf=\"invert\">\n          <button\n            id=\"navigateNextButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.nextPageLabel\"\n            [matTooltip]=\"intl.nextPageLabel\"\n            [disabled]=\"isLastCanvasGroup\"\n            (click)=\"goToNextCanvasGroup()\"\n          >\n            <mat-icon>navigate_next</mat-icon>\n          </button>\n        </ng-container>\n        <ng-container *ngIf=\"!invert\">\n          <button\n            id=\"navigateBeforeButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.previousPageLabel\"\n            [matTooltip]=\"intl.previousPageLabel\"\n            [disabled]=\"isFirstCanvasGroup\"\n            (click)=\"goToPreviousCanvasGroup()\"\n          >\n            <mat-icon>navigate_next</mat-icon>\n          </button>\n        </ng-container>\n      </div>\n\n      <div class=\"osd-toolbar-row\">\n        <button\n          (click)=\"zoomIn()\"\n          id=\"zoomInButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.zoomInLabel\"\n          [matTooltip]=\"intl.zoomInLabel\"\n        >\n          <mat-icon>zoom_in</mat-icon>\n        </button>\n\n        <button\n          (click)=\"rotate()\"\n          id=\"rotateButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.rotateCwLabel\"\n          [matTooltip]=\"intl.rotateCwLabel\"\n        >\n          <mat-icon>rotate_right</mat-icon>\n        </button>\n        <button\n          (click)=\"zoomOut()\"\n          id=\"zoomOutButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.zoomOutLabel\"\n          [matTooltip]=\"intl.zoomOutLabel\"\n        >\n          <mat-icon>zoom_out</mat-icon>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [":host{z-index:2}::ng-deep .osd-toolbar-row>.mat-toolbar-row{height:40px}.osd-toolbar{position:absolute;background:transparent;width:auto;border-radius:8px;margin-left:16px}\n"] }]
    }], function () { return [{ type: i1.MimeViewerIntl }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i2.MimeResizeService }, { type: i3.ViewerService }, { type: i4.CanvasService }, { type: i5.StyleService }, { type: i6.IiifManifestService }]; }, { container: [{
            type: ViewChild,
            args: ['container', { static: true }]
        }], osdToolbarState: [{
            type: HostBinding,
            args: ['@osdToolbarState']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NkLXRvb2xiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXdlci9vc2QtdG9vbGJhci9vc2QtdG9vbGJhci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL29zZC10b29sYmFyL29zZC10b29sYmFyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUdYLFNBQVMsRUFDVCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUU3RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFFekYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRDQUE0QyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztJQ3JCbkUsNkJB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LGNBQ25DO29CQUNWLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTt3QkFDekIsS0FBSyxDQUNILE1BQU0sRUFDTixLQUFLLENBQUM7NEJBQ0osU0FBUyxFQUFFLHNCQUFzQjs0QkFDakMsT0FBTyxFQUFFLE1BQU07eUJBQ2hCLENBQUMsQ0FDSDt3QkFDRCxLQUFLLENBQ0gsTUFBTSxFQUNOLEtBQUssQ0FBQzs0QkFDSixTQUFTLEVBQUUscUJBQXFCOzRCQUNoQyxPQUFPLEVBQUUsT0FBTzt5QkFDakIsQ0FBQyxDQUNIO3dCQUNELFVBQVUsQ0FBQyxjQUFjLEVBQUU7NEJBQ3pCLEtBQUssQ0FBQztnQ0FDSixLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7Z0NBQzNCLE9BQU8sQ0FBQyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLGFBQWEsQ0FBQzs2QkFDdEUsQ0FBQzt5QkFDSCxDQUFDO3dCQUNGLFVBQVUsQ0FDUixjQUFjLEVBQ2QsT0FBTyxDQUFDLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsWUFBWSxDQUFDLENBQ3RFO3FCQUNGLENBQUM7aUJBQ0g7OFFBR3lDLFNBQVM7a0JBQWxELFNBQVM7bUJBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUVwQyxlQUFlO2tCQURsQixXQUFXO21CQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGFuaW1hdGUsXG4gIGdyb3VwLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1hbmlmZXN0IH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgVmlld2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL3ZpZXdlci1vcHRpb25zJztcbmltcG9ydCB7IFZpZXdpbmdEaXJlY3Rpb24gfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy92aWV3aW5nLWRpcmVjdGlvbic7XG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3N0eWxlLXNlcnZpY2Uvc3R5bGUuc2VydmljZSc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb3JlL2NhbnZhcy1zZXJ2aWNlL2NhbnZhcy1zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi8uLi8uLi9jb3JlL2ludGwnO1xuaW1wb3J0IHsgTWltZVJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL2NvcmUvbWltZS1yZXNpemUtc2VydmljZS9taW1lLXJlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IERpbWVuc2lvbnMgfSBmcm9tICcuLy4uLy4uL2NvcmUvbW9kZWxzL2RpbWVuc2lvbnMnO1xuaW1wb3J0IHsgVmlld2VyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vY29yZS92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21pbWUtb3NkLXRvb2xiYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vb3NkLXRvb2xiYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9vc2QtdG9vbGJhci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ29zZFRvb2xiYXJTdGF0ZScsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnaGlkZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTEyMHB4LCAwKScsXG4gICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAnc2hvdycsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMHB4LCAwcHgpJyxcbiAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oJ2hpZGUgPT4gc2hvdycsIFtcbiAgICAgICAgZ3JvdXAoW1xuICAgICAgICAgIHN0eWxlKHsgZGlzcGxheTogJ2Jsb2NrJyB9KSxcbiAgICAgICAgICBhbmltYXRlKGAke1ZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMudG9vbGJhcnNFYXNlSW5UaW1lfW1zIGVhc2Utb3V0YCksXG4gICAgICAgIF0pLFxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKFxuICAgICAgICAnc2hvdyA9PiBoaWRlJyxcbiAgICAgICAgYW5pbWF0ZShgJHtWaWV3ZXJPcHRpb25zLnRyYW5zaXRpb25zLnRvb2xiYXJzRWFzZU91dFRpbWV9bXMgZWFzZS1pbmApXG4gICAgICApLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBPc2RUb29sYmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb250YWluZXIhOiBFbGVtZW50UmVmO1xuICBASG9zdEJpbmRpbmcoJ0Bvc2RUb29sYmFyU3RhdGUnKVxuICBnZXQgb3NkVG9vbGJhclN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICB9XG4gIHB1YmxpYyBvc2RUb29sYmFyU3R5bGUgPSB7fTtcbiAgcHVibGljIG51bWJlck9mQ2FudmFzR3JvdXBzID0gMDtcbiAgcHVibGljIGlzRmlyc3RDYW52YXNHcm91cCA9IGZhbHNlO1xuICBwdWJsaWMgaXNMYXN0Q2FudmFzR3JvdXAgPSBmYWxzZTtcbiAgcHVibGljIHN0YXRlID0gJ2hpZGUnO1xuICBpbnZlcnQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpbnRsOiBNaW1lVmlld2VySW50bCxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBtaW1lU2VydmljZTogTWltZVJlc2l6ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3ZXJTZXJ2aWNlOiBWaWV3ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwcml2YXRlIHN0eWxlU2VydmljZTogU3R5bGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZk1hbmlmZXN0U2VydmljZTogSWlpZk1hbmlmZXN0U2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5jdXJyZW50TWFuaWZlc3Quc3Vic2NyaWJlKFxuICAgICAgICAobWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChtYW5pZmVzdCkge1xuICAgICAgICAgICAgdGhpcy5pbnZlcnQgPSBtYW5pZmVzdC52aWV3aW5nRGlyZWN0aW9uID09PSBWaWV3aW5nRGlyZWN0aW9uLkxUUjtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5taW1lU2VydmljZS5vblJlc2l6ZS5zdWJzY3JpYmUoKGRpbWVuc2lvbnM6IERpbWVuc2lvbnMpID0+IHtcbiAgICAgICAgdGhpcy5vc2RUb29sYmFyU3R5bGUgPSB7XG4gICAgICAgICAgdG9wOiBkaW1lbnNpb25zLnRvcCArIDExMCArICdweCcsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS5vbkNhbnZhc0dyb3VwSW5kZXhDaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAoY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIHRoaXMubnVtYmVyT2ZDYW52YXNHcm91cHMgPSB0aGlzLmNhbnZhc1NlcnZpY2UubnVtYmVyT2ZDYW52YXNHcm91cHM7XG4gICAgICAgICAgdGhpcy5pc0ZpcnN0Q2FudmFzR3JvdXAgPSB0aGlzLmlzT25GaXJzdENhbnZhc0dyb3VwKFxuICAgICAgICAgICAgY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuaXNMYXN0Q2FudmFzR3JvdXAgPSB0aGlzLmlzT25MYXN0Q2FudmFzR3JvdXAoXG4gICAgICAgICAgICBjdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaW50bC5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKVxuICAgICk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuc3R5bGVTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZSgoY29sb3I6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT4ge1xuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICBjb25zdCBiYWNrZ3JvdW5kUmdiYUNvbG9yID0gdGhpcy5zdHlsZVNlcnZpY2UuY29udmVydFRvUmdiYShcbiAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgMC4zXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJyxcbiAgICAgICAgICAgIGJhY2tncm91bmRSZ2JhQ29sb3JcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICB6b29tSW4oKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLnpvb21JbigpO1xuICB9XG5cbiAgem9vbU91dCgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2Uuem9vbU91dCgpO1xuICB9XG5cbiAgaG9tZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuaG9tZSgpO1xuICB9XG5cbiAgcm90YXRlKCk6IHZvaWQge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5yb3RhdGUoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIGdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKCk6IHZvaWQge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvUHJldmlvdXNDYW52YXNHcm91cCgpO1xuICB9XG5cbiAgcHVibGljIGdvVG9OZXh0Q2FudmFzR3JvdXAoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9OZXh0Q2FudmFzR3JvdXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNPbkZpcnN0Q2FudmFzR3JvdXAoY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjdXJyZW50Q2FudmFzR3JvdXBJbmRleCA9PT0gMDtcbiAgfVxuXG4gIHByaXZhdGUgaXNPbkxhc3RDYW52YXNHcm91cChjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGN1cnJlbnRDYW52YXNHcm91cEluZGV4ID09PSB0aGlzLm51bWJlck9mQ2FudmFzR3JvdXBzIC0gMTtcbiAgfVxufVxuIiwiPGRpdiAjY29udGFpbmVyIGNsYXNzPVwib3NkLXRvb2xiYXJcIiBbbmdTdHlsZV09XCJvc2RUb29sYmFyU3R5bGVcIj5cbiAgPGRpdiBmeEhpZGUgZnhTaG93Lmd0LXNtPVwidHJ1ZVwiPlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwib3NkLXRvb2xiYXItY29udGFpbmVyXCJcbiAgICAgIGZ4TGF5b3V0PVwiY29sdW1uXCJcbiAgICAgIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwib3NkLXRvb2xiYXItcm93XCI+IDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm9zZC10b29sYmFyLXJvd1wiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaW52ZXJ0XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgaWQ9XCJuYXZpZ2F0ZUJlZm9yZUJ1dHRvblwiXG4gICAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW50bC5wcmV2aW91c1BhZ2VMYWJlbFwiXG4gICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLnByZXZpb3VzUGFnZUxhYmVsXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpc0ZpcnN0Q2FudmFzR3JvdXBcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5uYXZpZ2F0ZV9iZWZvcmU8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpbnZlcnRcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBpZD1cIm5hdmlnYXRlTmV4dEJ1dHRvblwiXG4gICAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW50bC5uZXh0UGFnZUxhYmVsXCJcbiAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwubmV4dFBhZ2VMYWJlbFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNMYXN0Q2FudmFzR3JvdXBcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImdvVG9OZXh0Q2FudmFzR3JvdXAoKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1pY29uPm5hdmlnYXRlX2JlZm9yZTwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgKGNsaWNrKT1cImhvbWUoKVwiXG4gICAgICAgICAgaWQ9XCJob21lQnV0dG9uXCJcbiAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImludGwuaG9tZUxhYmVsXCJcbiAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLmhvbWVMYWJlbFwiXG4gICAgICAgID5cbiAgICAgICAgICA8bWF0LWljb24+aG9tZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaW52ZXJ0XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgaWQ9XCJuYXZpZ2F0ZU5leHRCdXR0b25cIlxuICAgICAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImludGwubmV4dFBhZ2VMYWJlbFwiXG4gICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLm5leHRQYWdlTGFiZWxcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImlzTGFzdENhbnZhc0dyb3VwXCJcbiAgICAgICAgICAgIChjbGljayk9XCJnb1RvTmV4dENhbnZhc0dyb3VwKClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5uYXZpZ2F0ZV9uZXh0PC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaW52ZXJ0XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgaWQ9XCJuYXZpZ2F0ZUJlZm9yZUJ1dHRvblwiXG4gICAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW50bC5wcmV2aW91c1BhZ2VMYWJlbFwiXG4gICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLnByZXZpb3VzUGFnZUxhYmVsXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpc0ZpcnN0Q2FudmFzR3JvdXBcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImdvVG9QcmV2aW91c0NhbnZhc0dyb3VwKClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5uYXZpZ2F0ZV9uZXh0PC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cIm9zZC10b29sYmFyLXJvd1wiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgKGNsaWNrKT1cInpvb21JbigpXCJcbiAgICAgICAgICBpZD1cInpvb21JbkJ1dHRvblwiXG4gICAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpbnRsLnpvb21JbkxhYmVsXCJcbiAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLnpvb21JbkxhYmVsXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxtYXQtaWNvbj56b29tX2luPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIChjbGljayk9XCJyb3RhdGUoKVwiXG4gICAgICAgICAgaWQ9XCJyb3RhdGVCdXR0b25cIlxuICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW50bC5yb3RhdGVDd0xhYmVsXCJcbiAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLnJvdGF0ZUN3TGFiZWxcIlxuICAgICAgICA+XG4gICAgICAgICAgPG1hdC1pY29uPnJvdGF0ZV9yaWdodDwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgKGNsaWNrKT1cInpvb21PdXQoKVwiXG4gICAgICAgICAgaWQ9XCJ6b29tT3V0QnV0dG9uXCJcbiAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImludGwuem9vbU91dExhYmVsXCJcbiAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLnpvb21PdXRMYWJlbFwiXG4gICAgICAgID5cbiAgICAgICAgICA8bWF0LWljb24+em9vbV9vdXQ8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19