import { animate, state, style, transition, trigger, } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, ViewChild, ViewContainerRef, } from '@angular/core';
import { Subscription } from 'rxjs';
import { ManifestUtils } from '../../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeDomHelper } from '../../core/mime-dom-helper';
import { ViewerOptions } from '../../core/models/viewer-options';
import { HelpDialogService } from '../../help-dialog/help-dialog.service';
import { ViewDialogService } from '../../view-dialog/view-dialog.service';
import { ContentSearchDialogService } from './../../content-search-dialog/content-search-dialog.service';
import { ContentsDialogService } from './../../contents-dialog/contents-dialog.service';
import { FullscreenService } from './../../core/fullscreen-service/fullscreen.service';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../../core/intl';
import * as i0 from "@angular/core";
import * as i1 from "./../../core/intl";
import * as i2 from "./../../contents-dialog/contents-dialog.service";
import * as i3 from "./../../content-search-dialog/content-search-dialog.service";
import * as i4 from "../../view-dialog/view-dialog.service";
import * as i5 from "../../help-dialog/help-dialog.service";
import * as i6 from "./../../core/iiif-manifest-service/iiif-manifest-service";
import * as i7 from "./../../core/fullscreen-service/fullscreen.service";
import * as i8 from "../../core/mime-dom-helper";
import * as i9 from "@angular/common";
import * as i10 from "@angular/flex-layout/flex";
import * as i11 from "@angular/material/toolbar";
import * as i12 from "@angular/material/button";
import * as i13 from "@angular/material/icon";
import * as i14 from "@angular/material/tooltip";
const _c0 = ["mimeHeaderBefore"];
const _c1 = ["mimeHeaderAfter"];
const _c2 = ["viewMenu"];
function ViewerHeaderComponent_ng_template_3_Template(rf, ctx) { }
function ViewerHeaderComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("matTooltip", ctx_r2.manifest.label);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.manifest.label);
} }
function ViewerHeaderComponent_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 12, 13);
    i0.ɵɵlistener("click", function ViewerHeaderComponent_button_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.toggleView()); });
    i0.ɵɵelementStart(2, "mat-icon", 6);
    i0.ɵɵtext(3, "view_module");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("matTooltip", ctx_r3.intl.layoutMenuLabel);
    i0.ɵɵattribute("aria-label", ctx_r3.intl.layoutMenuLabel);
} }
function ViewerHeaderComponent_button_11_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 14);
    i0.ɵɵlistener("click", function ViewerHeaderComponent_button_11_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.toggleSearch()); });
    i0.ɵɵelementStart(1, "mat-icon", 6);
    i0.ɵɵtext(2, "search");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("matTooltip", ctx_r4.intl.searchLabel);
    i0.ɵɵattribute("aria-label", ctx_r4.intl.searchLabel);
} }
function ViewerHeaderComponent_button_15_mat_icon_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 6);
    i0.ɵɵtext(1, "fullscreen_exit");
    i0.ɵɵelementEnd();
} }
function ViewerHeaderComponent_button_15_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 6);
    i0.ɵɵtext(1, "fullscreen");
    i0.ɵɵelementEnd();
} }
function ViewerHeaderComponent_button_15_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function ViewerHeaderComponent_button_15_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r16); const ctx_r15 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r15.toggleFullscreen()); });
    i0.ɵɵtemplate(1, ViewerHeaderComponent_button_15_mat_icon_1_Template, 2, 0, "mat-icon", 16);
    i0.ɵɵtemplate(2, ViewerHeaderComponent_button_15_mat_icon_2_Template, 2, 0, "mat-icon", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("matTooltip", ctx_r5.fullscreenLabel);
    i0.ɵɵattribute("aria-label", ctx_r5.fullscreenLabel);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.isInFullScreen);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r5.isInFullScreen);
} }
function ViewerHeaderComponent_ng_template_17_Template(rf, ctx) { }
export class ViewerHeaderComponent {
    constructor(intl, changeDetectorRef, contentsDialogService, contentSearchDialogService, viewDialogService, helpDialogService, iiifManifestService, fullscreenService, mimeDomHelper, el) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.contentsDialogService = contentsDialogService;
        this.contentSearchDialogService = contentSearchDialogService;
        this.viewDialogService = viewDialogService;
        this.helpDialogService = helpDialogService;
        this.iiifManifestService = iiifManifestService;
        this.fullscreenService = fullscreenService;
        this.mimeDomHelper = mimeDomHelper;
        this.manifest = null;
        this.state = 'hide';
        this.isContentSearchEnabled = false;
        this.isFullscreenEnabled = false;
        this.isInFullscreen = false;
        this.fullscreenLabel = '';
        this.isPagedManifest = false;
        this.hasRecognizedTextContent = false;
        this.subscriptions = new Subscription();
        contentsDialogService.el = el;
        contentSearchDialogService.el = el;
        helpDialogService.el = el;
        viewDialogService.el = el;
    }
    get headerState() {
        return this.state;
    }
    ngOnInit() {
        this.isFullscreenEnabled = this.fullscreenService.isEnabled();
        this.subscriptions.add(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
        this.subscriptions.add(this.fullscreenService.onChange.subscribe(() => {
            this.isInFullscreen = this.fullscreenService.isFullscreen();
            this.fullscreenLabel = this.isInFullscreen
                ? this.intl.exitFullScreenLabel
                : this.intl.fullScreenLabel;
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
            this.isContentSearchEnabled =
                manifest && manifest.service ? true : false;
            this.isPagedManifest = manifest
                ? ManifestUtils.isManifestPaged(manifest)
                : false;
            this.hasRecognizedTextContent = manifest
                ? ManifestUtils.hasRecognizedTextContent(manifest)
                : false;
            this.changeDetectorRef.detectChanges();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    toggleView() {
        this.contentsDialogService.close();
        this.contentSearchDialogService.close();
        this.helpDialogService.close();
        this.viewDialogService.toggle();
    }
    toggleContents() {
        this.viewDialogService.close();
        this.contentSearchDialogService.close();
        this.helpDialogService.close();
        this.contentsDialogService.toggle();
    }
    toggleSearch() {
        this.viewDialogService.close();
        this.contentsDialogService.close();
        this.helpDialogService.close();
        this.contentSearchDialogService.toggle();
    }
    toggleHelp() {
        this.viewDialogService.close();
        this.contentsDialogService.close();
        this.contentSearchDialogService.close();
        this.helpDialogService.toggle();
    }
    toggleFullscreen() {
        return this.mimeDomHelper.toggleFullscreen();
    }
    isInFullScreen() {
        return this.fullscreenService.isFullscreen();
    }
}
ViewerHeaderComponent.ɵfac = function ViewerHeaderComponent_Factory(t) { return new (t || ViewerHeaderComponent)(i0.ɵɵdirectiveInject(i1.MimeViewerIntl), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.ContentsDialogService), i0.ɵɵdirectiveInject(i3.ContentSearchDialogService), i0.ɵɵdirectiveInject(i4.ViewDialogService), i0.ɵɵdirectiveInject(i5.HelpDialogService), i0.ɵɵdirectiveInject(i6.IiifManifestService), i0.ɵɵdirectiveInject(i7.FullscreenService), i0.ɵɵdirectiveInject(i8.MimeDomHelper), i0.ɵɵdirectiveInject(i0.ElementRef)); };
ViewerHeaderComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ViewerHeaderComponent, selectors: [["mime-viewer-header"]], viewQuery: function ViewerHeaderComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 7, ViewContainerRef);
        i0.ɵɵviewQuery(_c1, 7, ViewContainerRef);
        i0.ɵɵviewQuery(_c2, 7, ElementRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.mimeHeaderBefore = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.mimeHeaderAfter = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.viewMenu = _t.first);
    } }, hostVars: 1, hostBindings: function ViewerHeaderComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵsyntheticHostProperty("@headerState", ctx.headerState);
    } }, decls: 19, vars: 8, consts: [["fxLayout", "row", "fxLayoutAlign", "space-between center", 1, "header-container"], ["mimeHeaderBefore", ""], ["fxFlexOffset", "16px", "class", "label", 3, "matTooltip", 4, "ngIf"], ["fxFlex", "noshrink", "fxLayout", "row", "fxLayoutAlign", "end center", 1, "buttons-container"], ["data-test-id", "ngx-mime-view-menu-button", "mat-icon-button", "", 3, "matTooltip", "click", 4, "ngIf"], ["id", "ngx-mimeContentsDialogButton", "mat-icon-button", "", 3, "matTooltip", "click"], ["aria-hidden", "true"], ["id", "ngx-mimeContentSearchDialogButton", "mat-icon-button", "", 3, "matTooltip", "click", 4, "ngIf"], ["id", "ngx-mimeHelpDialogButton", "mat-icon-button", "", 3, "matTooltip", "click"], ["id", "ngx-mimeFullscreenButton", "mat-icon-button", "", 3, "matTooltip", "click", 4, "ngIf"], ["mimeHeaderAfter", ""], ["fxFlexOffset", "16px", 1, "label", 3, "matTooltip"], ["data-test-id", "ngx-mime-view-menu-button", "mat-icon-button", "", 3, "matTooltip", "click"], ["viewMenu", ""], ["id", "ngx-mimeContentSearchDialogButton", "mat-icon-button", "", 3, "matTooltip", "click"], ["id", "ngx-mimeFullscreenButton", "mat-icon-button", "", 3, "matTooltip", "click"], ["aria-hidden", "true", 4, "ngIf"]], template: function ViewerHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-toolbar")(1, "div", 0)(2, "div");
        i0.ɵɵtemplate(3, ViewerHeaderComponent_ng_template_3_Template, 0, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(5, ViewerHeaderComponent_div_5_Template, 2, 2, "div", 2);
        i0.ɵɵelementStart(6, "div", 3);
        i0.ɵɵtemplate(7, ViewerHeaderComponent_button_7_Template, 4, 2, "button", 4);
        i0.ɵɵelementStart(8, "button", 5);
        i0.ɵɵlistener("click", function ViewerHeaderComponent_Template_button_click_8_listener() { return ctx.toggleContents(); });
        i0.ɵɵelementStart(9, "mat-icon", 6);
        i0.ɵɵtext(10, "list");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(11, ViewerHeaderComponent_button_11_Template, 3, 2, "button", 7);
        i0.ɵɵelementStart(12, "button", 8);
        i0.ɵɵlistener("click", function ViewerHeaderComponent_Template_button_click_12_listener() { return ctx.toggleHelp(); });
        i0.ɵɵelementStart(13, "mat-icon", 6);
        i0.ɵɵtext(14, "help");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(15, ViewerHeaderComponent_button_15_Template, 3, 4, "button", 9);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "div");
        i0.ɵɵtemplate(17, ViewerHeaderComponent_ng_template_17_Template, 0, 0, "ng-template", null, 10, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", ctx.manifest);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.isPagedManifest || ctx.hasRecognizedTextContent);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("matTooltip", ctx.intl.contentsLabel);
        i0.ɵɵattribute("aria-label", ctx.intl.contentsLabel);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isContentSearchEnabled);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("matTooltip", ctx.intl.help.helpLabel);
        i0.ɵɵattribute("aria-label", ctx.intl.help.helpLabel);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isFullscreenEnabled);
    } }, dependencies: [i9.NgIf, i10.DefaultLayoutDirective, i10.DefaultLayoutAlignDirective, i10.DefaultFlexOffsetDirective, i10.DefaultFlexDirective, i11.MatToolbar, i12.MatIconButton, i13.MatIcon, i14.MatTooltip], styles: ["[_nghost-%COMP%]{max-height:64px}.header-container[_ngcontent-%COMP%]{width:100%}.label[_ngcontent-%COMP%]{font-size:17px;overflow:hidden;text-overflow:ellipsis}mat-toolbar[_ngcontent-%COMP%]{padding:0}.buttons-container[_ngcontent-%COMP%]{padding:0 16px}"], data: { animation: [
            trigger('headerState', [
                state('hide', style({
                    transform: 'translate(0, -100%)',
                })),
                state('show', style({
                    transform: 'translate(0px, 0px)',
                })),
                transition('hide => show', animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')),
                transition('show => hide', animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out')),
            ]),
        ] } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ViewerHeaderComponent, [{
        type: Component,
        args: [{ selector: 'mime-viewer-header', changeDetection: ChangeDetectionStrategy.Default, animations: [
                    trigger('headerState', [
                        state('hide', style({
                            transform: 'translate(0, -100%)',
                        })),
                        state('show', style({
                            transform: 'translate(0px, 0px)',
                        })),
                        transition('hide => show', animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')),
                        transition('show => hide', animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out')),
                    ]),
                ], template: "<mat-toolbar>\n  <div\n    class=\"header-container\"\n    fxLayout=\"row\"\n    fxLayoutAlign=\"space-between center\"\n  >\n    <div><ng-template #mimeHeaderBefore></ng-template></div>\n    <div\n      *ngIf=\"manifest\"\n      fxFlexOffset=\"16px\"\n      class=\"label\"\n      [matTooltip]=\"manifest.label\"\n      >{{ manifest.label }}</div\n    >\n    <div\n      fxFlex=\"noshrink\"\n      fxLayout=\"row\"\n      fxLayoutAlign=\"end center\"\n      class=\"buttons-container\"\n    >\n      <button\n        *ngIf=\"isPagedManifest || hasRecognizedTextContent\"\n        data-test-id=\"ngx-mime-view-menu-button\"\n        #viewMenu\n        mat-icon-button\n        [attr.aria-label]=\"intl.layoutMenuLabel\"\n        [matTooltip]=\"intl.layoutMenuLabel\"\n        (click)=\"toggleView()\"\n        ><mat-icon aria-hidden=\"true\">view_module</mat-icon></button\n      >\n      <button\n        id=\"ngx-mimeContentsDialogButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.contentsLabel\"\n        [matTooltip]=\"intl.contentsLabel\"\n        (click)=\"toggleContents()\"\n      >\n        <mat-icon aria-hidden=\"true\">list</mat-icon>\n      </button>\n      <button\n        id=\"ngx-mimeContentSearchDialogButton\"\n        *ngIf=\"isContentSearchEnabled\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.searchLabel\"\n        [matTooltip]=\"intl.searchLabel\"\n        (click)=\"toggleSearch()\"\n      >\n        <mat-icon aria-hidden=\"true\">search</mat-icon>\n      </button>\n      <button\n        id=\"ngx-mimeHelpDialogButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.help.helpLabel\"\n        [matTooltip]=\"intl.help.helpLabel\"\n        (click)=\"toggleHelp()\"\n      >\n        <mat-icon aria-hidden=\"true\">help</mat-icon>\n      </button>\n\n      <button\n        id=\"ngx-mimeFullscreenButton\"\n        *ngIf=\"isFullscreenEnabled\"\n        mat-icon-button\n        [attr.aria-label]=\"fullscreenLabel\"\n        [matTooltip]=\"fullscreenLabel\"\n        (click)=\"toggleFullscreen()\"\n      >\n        <mat-icon *ngIf=\"isInFullScreen\" aria-hidden=\"true\"\n          >fullscreen_exit</mat-icon\n        >\n        <mat-icon *ngIf=\"!isInFullScreen\" aria-hidden=\"true\"\n          >fullscreen</mat-icon\n        >\n      </button>\n    </div>\n    <div><ng-template #mimeHeaderAfter></ng-template></div>\n  </div>\n</mat-toolbar>\n", styles: [":host{max-height:64px}.header-container{width:100%}.label{font-size:17px;overflow:hidden;text-overflow:ellipsis}mat-toolbar{padding:0}.buttons-container{padding:0 16px}\n"] }]
    }], function () { return [{ type: i1.MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: i2.ContentsDialogService }, { type: i3.ContentSearchDialogService }, { type: i4.ViewDialogService }, { type: i5.HelpDialogService }, { type: i6.IiifManifestService }, { type: i7.FullscreenService }, { type: i8.MimeDomHelper }, { type: i0.ElementRef }]; }, { mimeHeaderBefore: [{
            type: ViewChild,
            args: ['mimeHeaderBefore', { read: ViewContainerRef, static: true }]
        }], mimeHeaderAfter: [{
            type: ViewChild,
            args: ['mimeHeaderAfter', { read: ViewContainerRef, static: true }]
        }], viewMenu: [{
            type: ViewChild,
            args: ['viewMenu', { read: ElementRef, static: true }]
        }], headerState: [{
            type: HostBinding,
            args: ['@headerState']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWhlYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1oZWFkZXIvdmlld2VyLWhlYWRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1oZWFkZXIvdmlld2VyLWhlYWRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUdYLFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDckYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUN6RyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUN4RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsbUJB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QyxDQUN2RTthQUNGLENBQUM7U0FDSDt1RkFFVSxxQkFBcUI7Y0E5QmpDLFNBQVM7MkJBQ0Usb0JBQW9CLG1CQUdiLHVCQUF1QixDQUFDLE9BQU8sY0FDcEM7b0JBQ1YsT0FBTyxDQUFDLGFBQWEsRUFBRTt3QkFDckIsS0FBSyxDQUNILE1BQU0sRUFDTixLQUFLLENBQUM7NEJBQ0osU0FBUyxFQUFFLHFCQUFxQjt5QkFDakMsQ0FBQyxDQUNIO3dCQUNELEtBQUssQ0FDSCxNQUFNLEVBQ04sS0FBSyxDQUFDOzRCQUNKLFNBQVMsRUFBRSxxQkFBcUI7eUJBQ2pDLENBQUMsQ0FDSDt3QkFDRCxVQUFVLENBQ1IsY0FBYyxFQUNkLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxDQUNyRTt3QkFDRCxVQUFVLENBQ1IsY0FBYyxFQUNkLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLG1CQUFtQixHQUFHLGFBQWEsQ0FBQyxDQUN2RTtxQkFDRixDQUFDO2lCQUNIO3FXQUlELGdCQUFnQjtrQkFEZixTQUFTO21CQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFHdkUsZUFBZTtrQkFEZCxTQUFTO21CQUFDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFHdEUsUUFBUTtrQkFEUCxTQUFTO21CQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQWdDckQsV0FBVztrQkFEZCxXQUFXO21CQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBhbmltYXRlLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWFuaWZlc3RVdGlscyB9IGZyb20gJy4uLy4uL2NvcmUvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3QtdXRpbHMnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uLy4uL2NvcmUvbWltZS1kb20taGVscGVyJztcbmltcG9ydCB7IFZpZXdlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy92aWV3ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBIZWxwRGlhbG9nU2VydmljZSB9IGZyb20gJy4uLy4uL2hlbHAtZGlhbG9nL2hlbHAtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld0RpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi92aWV3LWRpYWxvZy92aWV3LWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udGVudHNEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb250ZW50cy1kaWFsb2cvY29udGVudHMtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRnVsbHNjcmVlblNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL2NvcmUvZnVsbHNjcmVlbi1zZXJ2aWNlL2Z1bGxzY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLy4uLy4uL2NvcmUvaW50bCc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4vLi4vLi4vY29yZS9tb2RlbHMvbWFuaWZlc3QnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtaW1lLXZpZXdlci1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdmlld2VyLWhlYWRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3ZpZXdlci1oZWFkZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignaGVhZGVyU3RhdGUnLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2hpZGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDAsIC0xMDAlKScsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgICdzaG93JyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwcHgsIDBweCknLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdoaWRlID0+IHNob3cnLFxuICAgICAgICBhbmltYXRlKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMudG9vbGJhcnNFYXNlSW5UaW1lICsgJ21zIGVhc2UtaW4nKVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdzaG93ID0+IGhpZGUnLFxuICAgICAgICBhbmltYXRlKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMudG9vbGJhcnNFYXNlT3V0VGltZSArICdtcyBlYXNlLW91dCcpXG4gICAgICApLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBWaWV3ZXJIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ21pbWVIZWFkZXJCZWZvcmUnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBtaW1lSGVhZGVyQmVmb3JlITogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnbWltZUhlYWRlckFmdGVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgbWltZUhlYWRlckFmdGVyITogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgndmlld01lbnUnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICB2aWV3TWVudSE6IEVsZW1lbnRSZWY7XG4gIHB1YmxpYyBtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsID0gbnVsbDtcbiAgcHVibGljIHN0YXRlID0gJ2hpZGUnO1xuICBpc0NvbnRlbnRTZWFyY2hFbmFibGVkID0gZmFsc2U7XG4gIGlzRnVsbHNjcmVlbkVuYWJsZWQgPSBmYWxzZTtcbiAgaXNJbkZ1bGxzY3JlZW4gPSBmYWxzZTtcbiAgZnVsbHNjcmVlbkxhYmVsID0gJyc7XG4gIGlzUGFnZWRNYW5pZmVzdCA9IGZhbHNlO1xuICBoYXNSZWNvZ25pemVkVGV4dENvbnRlbnQgPSBmYWxzZTtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgY29udGVudHNEaWFsb2dTZXJ2aWNlOiBDb250ZW50c0RpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250ZW50U2VhcmNoRGlhbG9nU2VydmljZTogQ29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3RGlhbG9nU2VydmljZTogVmlld0RpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBoZWxwRGlhbG9nU2VydmljZTogSGVscERpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmTWFuaWZlc3RTZXJ2aWNlOiBJaWlmTWFuaWZlc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgZnVsbHNjcmVlblNlcnZpY2U6IEZ1bGxzY3JlZW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgbWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlcixcbiAgICBlbDogRWxlbWVudFJlZlxuICApIHtcbiAgICBjb250ZW50c0RpYWxvZ1NlcnZpY2UuZWwgPSBlbDtcbiAgICBjb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5lbCA9IGVsO1xuICAgIGhlbHBEaWFsb2dTZXJ2aWNlLmVsID0gZWw7XG4gICAgdmlld0RpYWxvZ1NlcnZpY2UuZWwgPSBlbDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnQGhlYWRlclN0YXRlJylcbiAgZ2V0IGhlYWRlclN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pc0Z1bGxzY3JlZW5FbmFibGVkID0gdGhpcy5mdWxsc2NyZWVuU2VydmljZS5pc0VuYWJsZWQoKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmludGwuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuZnVsbHNjcmVlblNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pc0luRnVsbHNjcmVlbiA9IHRoaXMuZnVsbHNjcmVlblNlcnZpY2UuaXNGdWxsc2NyZWVuKCk7XG4gICAgICAgIHRoaXMuZnVsbHNjcmVlbkxhYmVsID0gdGhpcy5pc0luRnVsbHNjcmVlblxuICAgICAgICAgID8gdGhpcy5pbnRsLmV4aXRGdWxsU2NyZWVuTGFiZWxcbiAgICAgICAgICA6IHRoaXMuaW50bC5mdWxsU2NyZWVuTGFiZWw7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5jdXJyZW50TWFuaWZlc3Quc3Vic2NyaWJlKFxuICAgICAgICAobWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCkgPT4ge1xuICAgICAgICAgIHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgICB0aGlzLmlzQ29udGVudFNlYXJjaEVuYWJsZWQgPVxuICAgICAgICAgICAgbWFuaWZlc3QgJiYgbWFuaWZlc3Quc2VydmljZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICB0aGlzLmlzUGFnZWRNYW5pZmVzdCA9IG1hbmlmZXN0XG4gICAgICAgICAgICA/IE1hbmlmZXN0VXRpbHMuaXNNYW5pZmVzdFBhZ2VkKG1hbmlmZXN0KVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgICB0aGlzLmhhc1JlY29nbml6ZWRUZXh0Q29udGVudCA9IG1hbmlmZXN0XG4gICAgICAgICAgICA/IE1hbmlmZXN0VXRpbHMuaGFzUmVjb2duaXplZFRleHRDb250ZW50KG1hbmlmZXN0KVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVWaWV3KCkge1xuICAgIHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgIHRoaXMuaGVscERpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICB0aGlzLnZpZXdEaWFsb2dTZXJ2aWNlLnRvZ2dsZSgpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUNvbnRlbnRzKCkge1xuICAgIHRoaXMudmlld0RpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgdGhpcy5oZWxwRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgIHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLnRvZ2dsZSgpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZVNlYXJjaCgpIHtcbiAgICB0aGlzLnZpZXdEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS50b2dnbGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVIZWxwKCkge1xuICAgIHRoaXMudmlld0RpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICB0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLnRvZ2dsZSgpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUZ1bGxzY3JlZW4oKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMubWltZURvbUhlbHBlci50b2dnbGVGdWxsc2NyZWVuKCk7XG4gIH1cblxuICBwdWJsaWMgaXNJbkZ1bGxTY3JlZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZnVsbHNjcmVlblNlcnZpY2UuaXNGdWxsc2NyZWVuKCk7XG4gIH1cbn1cbiIsIjxtYXQtdG9vbGJhcj5cbiAgPGRpdlxuICAgIGNsYXNzPVwiaGVhZGVyLWNvbnRhaW5lclwiXG4gICAgZnhMYXlvdXQ9XCJyb3dcIlxuICAgIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIGNlbnRlclwiXG4gID5cbiAgICA8ZGl2PjxuZy10ZW1wbGF0ZSAjbWltZUhlYWRlckJlZm9yZT48L25nLXRlbXBsYXRlPjwvZGl2PlxuICAgIDxkaXZcbiAgICAgICpuZ0lmPVwibWFuaWZlc3RcIlxuICAgICAgZnhGbGV4T2Zmc2V0PVwiMTZweFwiXG4gICAgICBjbGFzcz1cImxhYmVsXCJcbiAgICAgIFttYXRUb29sdGlwXT1cIm1hbmlmZXN0LmxhYmVsXCJcbiAgICAgID57eyBtYW5pZmVzdC5sYWJlbCB9fTwvZGl2XG4gICAgPlxuICAgIDxkaXZcbiAgICAgIGZ4RmxleD1cIm5vc2hyaW5rXCJcbiAgICAgIGZ4TGF5b3V0PVwicm93XCJcbiAgICAgIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCJcbiAgICAgIGNsYXNzPVwiYnV0dG9ucy1jb250YWluZXJcIlxuICAgID5cbiAgICAgIDxidXR0b25cbiAgICAgICAgKm5nSWY9XCJpc1BhZ2VkTWFuaWZlc3QgfHwgaGFzUmVjb2duaXplZFRleHRDb250ZW50XCJcbiAgICAgICAgZGF0YS10ZXN0LWlkPVwibmd4LW1pbWUtdmlldy1tZW51LWJ1dHRvblwiXG4gICAgICAgICN2aWV3TWVudVxuICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpbnRsLmxheW91dE1lbnVMYWJlbFwiXG4gICAgICAgIFttYXRUb29sdGlwXT1cImludGwubGF5b3V0TWVudUxhYmVsXCJcbiAgICAgICAgKGNsaWNrKT1cInRvZ2dsZVZpZXcoKVwiXG4gICAgICAgID48bWF0LWljb24gYXJpYS1oaWRkZW49XCJ0cnVlXCI+dmlld19tb2R1bGU8L21hdC1pY29uPjwvYnV0dG9uXG4gICAgICA+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGlkPVwibmd4LW1pbWVDb250ZW50c0RpYWxvZ0J1dHRvblwiXG4gICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImludGwuY29udGVudHNMYWJlbFwiXG4gICAgICAgIFttYXRUb29sdGlwXT1cImludGwuY29udGVudHNMYWJlbFwiXG4gICAgICAgIChjbGljayk9XCJ0b2dnbGVDb250ZW50cygpXCJcbiAgICAgID5cbiAgICAgICAgPG1hdC1pY29uIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPmxpc3Q8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGlkPVwibmd4LW1pbWVDb250ZW50U2VhcmNoRGlhbG9nQnV0dG9uXCJcbiAgICAgICAgKm5nSWY9XCJpc0NvbnRlbnRTZWFyY2hFbmFibGVkXCJcbiAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW50bC5zZWFyY2hMYWJlbFwiXG4gICAgICAgIFttYXRUb29sdGlwXT1cImludGwuc2VhcmNoTGFiZWxcIlxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlU2VhcmNoKClcIlxuICAgICAgPlxuICAgICAgICA8bWF0LWljb24gYXJpYS1oaWRkZW49XCJ0cnVlXCI+c2VhcmNoPC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBpZD1cIm5neC1taW1lSGVscERpYWxvZ0J1dHRvblwiXG4gICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImludGwuaGVscC5oZWxwTGFiZWxcIlxuICAgICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLmhlbHAuaGVscExhYmVsXCJcbiAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUhlbHAoKVwiXG4gICAgICA+XG4gICAgICAgIDxtYXQtaWNvbiBhcmlhLWhpZGRlbj1cInRydWVcIj5oZWxwPC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICA8YnV0dG9uXG4gICAgICAgIGlkPVwibmd4LW1pbWVGdWxsc2NyZWVuQnV0dG9uXCJcbiAgICAgICAgKm5nSWY9XCJpc0Z1bGxzY3JlZW5FbmFibGVkXCJcbiAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZnVsbHNjcmVlbkxhYmVsXCJcbiAgICAgICAgW21hdFRvb2x0aXBdPVwiZnVsbHNjcmVlbkxhYmVsXCJcbiAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUZ1bGxzY3JlZW4oKVwiXG4gICAgICA+XG4gICAgICAgIDxtYXQtaWNvbiAqbmdJZj1cImlzSW5GdWxsU2NyZWVuXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICA+ZnVsbHNjcmVlbl9leGl0PC9tYXQtaWNvblxuICAgICAgICA+XG4gICAgICAgIDxtYXQtaWNvbiAqbmdJZj1cIiFpc0luRnVsbFNjcmVlblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgICAgPmZ1bGxzY3JlZW48L21hdC1pY29uXG4gICAgICAgID5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXY+PG5nLXRlbXBsYXRlICNtaW1lSGVhZGVyQWZ0ZXI+PC9uZy10ZW1wbGF0ZT48L2Rpdj5cbiAgPC9kaXY+XG48L21hdC10b29sYmFyPlxuIl19