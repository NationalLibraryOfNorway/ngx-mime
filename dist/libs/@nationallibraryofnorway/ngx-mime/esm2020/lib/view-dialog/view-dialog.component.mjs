import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AltoService } from '../core/alto-service/alto.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ManifestUtils } from '../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { RecognizedTextMode } from '../core/models';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/flex-layout";
import * as i2 from "../core/intl";
import * as i3 from "../core/viewer-layout-service/viewer-layout-service";
import * as i4 from "../core/iiif-manifest-service/iiif-manifest-service";
import * as i5 from "../core/alto-service/alto.service";
import * as i6 from "../core/mime-resize-service/mime-resize.service";
import * as i7 from "@angular/common";
import * as i8 from "@angular/flex-layout/flex";
import * as i9 from "@angular/flex-layout/extended";
import * as i10 from "@angular/material/toolbar";
import * as i11 from "@angular/material/button";
import * as i12 from "@angular/material/button-toggle";
import * as i13 from "@angular/material/icon";
import * as i14 from "@angular/material/tooltip";
import * as i15 from "@angular/material/dialog";
import * as i16 from "@angular/material/divider";
import * as i17 from "./icon/icon.component";
function ViewDialogComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "mat-toolbar", 5)(2, "div", 6)(3, "button", 7)(4, "mat-icon");
    i0.ɵɵtext(5, "close");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h1", 8);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("aria-label", ctx_r0.intl.closeLabel)("matTooltip", ctx_r0.intl.closeLabel)("matDialogClose", true);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.intl.layoutMenuLabel);
} }
function ViewDialogComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "mat-toolbar", 9)(2, "div", 10)(3, "h1", 11);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 7)(6, "mat-icon");
    i0.ɵɵtext(7, "close");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.intl.layoutMenuLabel);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("aria-label", ctx_r1.intl.closeLabel)("matTooltip", ctx_r1.intl.closeLabel)("matDialogClose", true);
} }
function ViewDialogComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "section", 12)(2, "h2");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 13)(5, "div", 6)(6, "mat-button-toggle-group", 14)(7, "mat-button-toggle", 15);
    i0.ɵɵlistener("click", function ViewDialogComponent_ng_container_4_Template_mat_button_toggle_click_7_listener() { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.setLayoutOnePage()); });
    i0.ɵɵelement(8, "mime-icon", 16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 17);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 6)(12, "mat-button-toggle-group", 14)(13, "mat-button-toggle", 18);
    i0.ɵɵlistener("click", function ViewDialogComponent_ng_container_4_Template_mat_button_toggle_click_13_listener() { i0.ɵɵrestoreView(_r5); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.setLayoutTwoPage()); });
    i0.ɵɵelement(14, "mime-icon", 16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 17);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.intl.pageLayoutLabel);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", ctx_r2.viewerLayout);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("aria-label", ctx_r2.intl.singlePageViewLabel)("value", ctx_r2.ViewerLayout.ONE_PAGE);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("iconName", "single_page_display");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.intl.singlePageViewLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r2.viewerLayout);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("aria-label", ctx_r2.intl.twoPageViewLabel)("value", ctx_r2.ViewerLayout.TWO_PAGE);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("iconName", "two_page_display");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.intl.twoPageViewLabel);
} }
function ViewDialogComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "mat-divider");
    i0.ɵɵelementStart(2, "section", 19)(3, "h2");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 13)(6, "div", 6)(7, "mat-button-toggle-group", 14)(8, "mat-button-toggle", 20);
    i0.ɵɵlistener("click", function ViewDialogComponent_ng_container_5_Template_mat_button_toggle_click_8_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.closeRecognizedTextContent()); });
    i0.ɵɵelementStart(9, "mat-icon");
    i0.ɵɵtext(10, "hide_source");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 17);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 6)(14, "mat-button-toggle-group", 14)(15, "mat-button-toggle", 21);
    i0.ɵɵlistener("click", function ViewDialogComponent_ng_container_5_Template_mat_button_toggle_click_15_listener() { i0.ɵɵrestoreView(_r8); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.showRecognizedTextContentInSplitView()); });
    i0.ɵɵelementStart(16, "mat-icon");
    i0.ɵɵtext(17, "view_sidebar");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "div", 17);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 6)(21, "mat-button-toggle-group", 14)(22, "mat-button-toggle", 22);
    i0.ɵɵlistener("click", function ViewDialogComponent_ng_container_5_Template_mat_button_toggle_click_22_listener() { i0.ɵɵrestoreView(_r8); const ctx_r10 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r10.showRecognizedTextContentOnly()); });
    i0.ɵɵelementStart(23, "mat-icon");
    i0.ɵɵtext(24, "article");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "div", 17);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r3.intl.digitalTextLabel);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", ctx_r3.recognizedTextMode);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("aria-label", ctx_r3.intl.recognizedTextContentCloseLabel)("value", ctx_r3.RecognizedTextMode.NONE);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r3.intl.recognizedTextContentCloseLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r3.recognizedTextMode);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("aria-label", ctx_r3.intl.recognizedTextContentInSplitViewLabel)("value", ctx_r3.RecognizedTextMode.SPLIT);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r3.intl.recognizedTextContentInSplitViewLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r3.recognizedTextMode);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("aria-label", ctx_r3.intl.showRecognizedTextContentLabel)("value", ctx_r3.RecognizedTextMode.ONLY);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r3.intl.showRecognizedTextContentLabel);
} }
export class ViewDialogComponent {
    constructor(mediaObserver, intl, cdr, viewerLayoutService, iiifManifestService, altoService, mimeResizeService) {
        this.mediaObserver = mediaObserver;
        this.intl = intl;
        this.cdr = cdr;
        this.viewerLayoutService = viewerLayoutService;
        this.iiifManifestService = iiifManifestService;
        this.altoService = altoService;
        this.mimeResizeService = mimeResizeService;
        this.viewerLayout = ViewerLayout.ONE_PAGE;
        this.ViewerLayout = ViewerLayout;
        this.isPagedManifest = false;
        this.hasRecognizedTextContent = false;
        this.recognizedTextMode = RecognizedTextMode.NONE;
        this.RecognizedTextMode = RecognizedTextMode;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.viewerLayoutService.onChange.subscribe((viewerLayout) => {
            this.viewerLayout = viewerLayout;
        }));
        this.subscriptions.add(this.altoService.onRecognizedTextContentModeChange$.subscribe((recognizedTextModeChanges) => {
            this.recognizedTextMode = recognizedTextModeChanges.currentValue;
        }));
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.isPagedManifest = manifest
                ? ManifestUtils.isManifestPaged(manifest)
                : false;
            this.hasRecognizedTextContent = manifest
                ? ManifestUtils.hasRecognizedTextContent(manifest)
                : false;
        }));
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe((rect) => {
            this.resizeHeight(rect);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    setLayoutOnePage() {
        this.viewerLayoutService.setLayout(ViewerLayout.ONE_PAGE);
    }
    setLayoutTwoPage() {
        this.viewerLayoutService.setLayout(ViewerLayout.TWO_PAGE);
    }
    closeRecognizedTextContent() {
        this.altoService.closeRecognizedTextContent();
    }
    showRecognizedTextContentInSplitView() {
        this.altoService.showRecognizedTextContentInSplitView();
    }
    showRecognizedTextContentOnly() {
        this.altoService.showRecognizedTextContentOnly();
    }
    resizeHeight(rect) {
        let maxHeight = rect.height - 192 + 'px';
        if (this.mediaObserver.isActive('lt-md')) {
            maxHeight = rect.height + 'px';
        }
        this.contentStyle = {
            maxHeight,
        };
        this.cdr.detectChanges();
    }
}
ViewDialogComponent.ɵfac = function ViewDialogComponent_Factory(t) { return new (t || ViewDialogComponent)(i0.ɵɵdirectiveInject(i1.MediaObserver), i0.ɵɵdirectiveInject(i2.MimeViewerIntl), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i3.ViewerLayoutService), i0.ɵɵdirectiveInject(i4.IiifManifestService), i0.ɵɵdirectiveInject(i5.AltoService), i0.ɵɵdirectiveInject(i6.MimeResizeService)); };
ViewDialogComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ViewDialogComponent, selectors: [["mime-view-dialog"]], decls: 6, vars: 5, consts: [[3, "ngSwitch"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], [3, "ngStyle"], [4, "ngIf"], ["color", "primary", "data-test-id", "mobile-toolbar"], ["fxLayout", "row", "fxLayoutAlign", "start center"], ["data-test-id", "ngx-mime-view-dialog-close-button", "mat-icon-button", "", 3, "aria-label", "matTooltip", "matDialogClose"], ["mat-dialog-title", ""], ["data-test-id", "desktop-toolbar"], ["fxLayout", "row", "fxLayoutAlign", "space-between center", "fxFlex", ""], ["mat-dialog-title", "", "data-test-id", "ngx-mime-heading-desktop"], ["data-test-id", "page-layout"], ["fxLayout", "column", "fxLayoutGap", "8px"], [3, "value"], ["data-test-id", "ngx-mime-single-page-view-button", 3, "aria-label", "value", "click"], [3, "iconName"], [1, "label"], ["data-test-id", "ngx-mime-two-page-view-button", 3, "aria-label", "value", "click"], ["data-test-id", "recognized-text-content"], ["data-test-id", "ngx-mime-recognized-text-content-close-button", 3, "aria-label", "value", "click"], ["data-test-id", "ngx-mime-recognized-text-content-split-view-button", 3, "aria-label", "value", "click"], ["data-test-id", "ngx-mime-recognized-text-content-only-button", 3, "aria-label", "value", "click"]], template: function ViewDialogComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementContainerStart(0, 0);
        i0.ɵɵtemplate(1, ViewDialogComponent_ng_container_1_Template, 8, 4, "ng-container", 1);
        i0.ɵɵtemplate(2, ViewDialogComponent_ng_container_2_Template, 8, 4, "ng-container", 2);
        i0.ɵɵelementContainerEnd();
        i0.ɵɵelementStart(3, "mat-dialog-content", 3);
        i0.ɵɵtemplate(4, ViewDialogComponent_ng_container_4_Template, 17, 11, "ng-container", 4);
        i0.ɵɵtemplate(5, ViewDialogComponent_ng_container_5_Template, 27, 13, "ng-container", 4);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngSwitch", ctx.mediaObserver.isActive("lt-md"));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", true);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngStyle", ctx.contentStyle);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isPagedManifest);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.hasRecognizedTextContent);
    } }, dependencies: [i7.NgIf, i7.NgStyle, i7.NgSwitch, i7.NgSwitchCase, i7.NgSwitchDefault, i8.DefaultLayoutDirective, i8.DefaultLayoutGapDirective, i8.DefaultLayoutAlignDirective, i8.DefaultFlexDirective, i9.DefaultStyleDirective, i10.MatToolbar, i11.MatIconButton, i12.MatButtonToggleGroup, i12.MatButtonToggle, i13.MatIcon, i14.MatTooltip, i15.MatDialogClose, i15.MatDialogTitle, i15.MatDialogContent, i16.MatDivider, i17.IconComponent], styles: [".mat-mdc-dialog-title[_ngcontent-%COMP%]{color:inherit;padding:0 2px 16px}  .view-panel>.mat-mdc-dialog-container{padding:0!important;overflow:initial}section[_ngcontent-%COMP%]{padding:16px 0}.label[_ngcontent-%COMP%]{margin-left:16px}.mat-mdc-dialog-content[_ngcontent-%COMP%]{margin:0;padding:0 16px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ViewDialogComponent, [{
        type: Component,
        args: [{ selector: 'mime-view-dialog', template: "<ng-container [ngSwitch]=\"mediaObserver.isActive('lt-md')\">\n  <ng-container *ngSwitchCase=\"true\">\n    <mat-toolbar color=\"primary\" data-test-id=\"mobile-toolbar\">\n      <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n        <button\n          data-test-id=\"ngx-mime-view-dialog-close-button\"\n          mat-icon-button\n          [aria-label]=\"intl.closeLabel\"\n          [matTooltip]=\"intl.closeLabel\"\n          [matDialogClose]=\"true\"\n        >\n          <mat-icon>close</mat-icon>\n        </button>\n        <h1 mat-dialog-title>{{ intl.layoutMenuLabel }}</h1>\n      </div>\n    </mat-toolbar>\n  </ng-container>\n  <ng-container *ngSwitchDefault>\n    <mat-toolbar data-test-id=\"desktop-toolbar\">\n      <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex>\n        <h1 mat-dialog-title data-test-id=\"ngx-mime-heading-desktop\">{{\n          intl.layoutMenuLabel\n        }}</h1>\n        <button\n          data-test-id=\"ngx-mime-view-dialog-close-button\"\n          mat-icon-button\n          [aria-label]=\"intl.closeLabel\"\n          [matTooltip]=\"intl.closeLabel\"\n          [matDialogClose]=\"true\"\n        >\n          <mat-icon>close</mat-icon>\n        </button>\n      </div>\n    </mat-toolbar>\n  </ng-container>\n</ng-container>\n<mat-dialog-content [ngStyle]=\"contentStyle\">\n  <ng-container *ngIf=\"isPagedManifest\">\n    <section data-test-id=\"page-layout\">\n      <h2>{{ intl.pageLayoutLabel }}</h2>\n      <div fxLayout=\"column\" fxLayoutGap=\"8px\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n          <mat-button-toggle-group [value]=\"viewerLayout\">\n            <mat-button-toggle\n              data-test-id=\"ngx-mime-single-page-view-button\"\n              [aria-label]=\"intl.singlePageViewLabel\"\n              [value]=\"ViewerLayout.ONE_PAGE\"\n              (click)=\"setLayoutOnePage()\"\n            >\n              <mime-icon [iconName]=\"'single_page_display'\"> </mime-icon>\n            </mat-button-toggle>\n          </mat-button-toggle-group>\n          <div class=\"label\">{{ intl.singlePageViewLabel }}</div>\n        </div>\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n          <mat-button-toggle-group [value]=\"viewerLayout\">\n            <mat-button-toggle\n              data-test-id=\"ngx-mime-two-page-view-button\"\n              [aria-label]=\"intl.twoPageViewLabel\"\n              [value]=\"ViewerLayout.TWO_PAGE\"\n              (click)=\"setLayoutTwoPage()\"\n            >\n              <mime-icon [iconName]=\"'two_page_display'\"> </mime-icon>\n            </mat-button-toggle>\n          </mat-button-toggle-group>\n          <div class=\"label\">{{ intl.twoPageViewLabel }}</div>\n        </div>\n      </div>\n    </section>\n  </ng-container>\n  <ng-container *ngIf=\"hasRecognizedTextContent\">\n    <mat-divider></mat-divider>\n    <section data-test-id=\"recognized-text-content\">\n      <h2>{{ intl.digitalTextLabel }}</h2>\n      <div fxLayout=\"column\" fxLayoutGap=\"8px\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n          <mat-button-toggle-group [value]=\"recognizedTextMode\">\n            <mat-button-toggle\n              data-test-id=\"ngx-mime-recognized-text-content-close-button\"\n              [aria-label]=\"intl.recognizedTextContentCloseLabel\"\n              [value]=\"RecognizedTextMode.NONE\"\n              (click)=\"closeRecognizedTextContent()\"\n            >\n              <mat-icon>hide_source</mat-icon>\n            </mat-button-toggle>\n          </mat-button-toggle-group>\n          <div class=\"label\">{{ intl.recognizedTextContentCloseLabel }}</div>\n        </div>\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n          <mat-button-toggle-group [value]=\"recognizedTextMode\">\n            <mat-button-toggle\n              data-test-id=\"ngx-mime-recognized-text-content-split-view-button\"\n              [aria-label]=\"intl.recognizedTextContentInSplitViewLabel\"\n              [value]=\"RecognizedTextMode.SPLIT\"\n              (click)=\"showRecognizedTextContentInSplitView()\"\n            >\n              <mat-icon>view_sidebar</mat-icon>\n            </mat-button-toggle>\n          </mat-button-toggle-group>\n          <div class=\"label\">{{\n            intl.recognizedTextContentInSplitViewLabel\n          }}</div>\n        </div>\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n          <mat-button-toggle-group [value]=\"recognizedTextMode\">\n            <mat-button-toggle\n              data-test-id=\"ngx-mime-recognized-text-content-only-button\"\n              [aria-label]=\"intl.showRecognizedTextContentLabel\"\n              [value]=\"RecognizedTextMode.ONLY\"\n              (click)=\"showRecognizedTextContentOnly()\"\n            >\n              <mat-icon>article</mat-icon>\n            </mat-button-toggle>\n          </mat-button-toggle-group>\n          <div class=\"label\">{{ intl.showRecognizedTextContentLabel }}</div>\n        </div>\n      </div>\n    </section>\n  </ng-container>\n</mat-dialog-content>\n", styles: [".mat-mdc-dialog-title{color:inherit;padding:0 2px 16px}::ng-deep .view-panel>.mat-mdc-dialog-container{padding:0!important;overflow:initial}section{padding:16px 0}.label{margin-left:16px}.mat-mdc-dialog-content{margin:0;padding:0 16px}\n"] }]
    }], function () { return [{ type: i1.MediaObserver }, { type: i2.MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: i3.ViewerLayoutService }, { type: i4.IiifManifestService }, { type: i5.AltoService }, { type: i6.MimeResizeService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXctZGlhbG9nL3ZpZXctZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3LWRpYWxvZy92aWV3LWRpYWxvZy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDMUYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDcEYsT0FBTyxFQUFFLGtCQUFrQixFQUE2QixNQUFNLGdCQUFnQixDQUFDO0FBRy9FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxREFBcUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNYeEYsNkJBQW1DO0lBQ2pDLHNDQUEyRCxhQUFBLGdCQUFBLGVBQUE7SUFTM0MscUJBQUs7SUFBQSxpQkFBVyxFQUFBO0lBRTVCLDZCQUFxQjtJQUFBLFlBQTBCO0lBQUEsaUJBQUssRUFBQSxFQUFBO0lBRzFELDBCQUFlOzs7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LE9BQU8sQ0FBQyxFQUFFO1lBQ3hDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNoQztRQUNELElBQUksQ0FBQyxZQUFZLEdBQUc7WUFDbEIsU0FBUztTQUNWLENBQUM7UUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7O3NGQXZGVSxtQkFBbUI7c0VBQW5CLG1CQUFtQjtRQ25CaEMsZ0NBQTJEO1FBQ3pELHNGQWVlO1FBQ2Ysc0ZBaUJlO1FBQ2pCLDBCQUFlO1FBQ2YsNkNBQTZDO1FBQzNDLHdGQWdDZTtRQUNmLHdGQWdEZTtRQUNqQixpQkFBcUI7O1FBdkhQLDhEQUE0QztRQUN6QyxlQUFrQjtRQUFsQixtQ0FBa0I7UUFtQ2YsZUFBd0I7UUFBeEIsMENBQXdCO1FBQzNCLGVBQXFCO1FBQXJCLDBDQUFxQjtRQWlDckIsZUFBOEI7UUFBOUIsbURBQThCOzt1RkRuRGxDLG1CQUFtQjtjQUwvQixTQUFTOzJCQUNFLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZWRpYU9ic2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBbHRvU2VydmljZSB9IGZyb20gJy4uL2NvcmUvYWx0by1zZXJ2aWNlL2FsdG8uc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1hbmlmZXN0VXRpbHMgfSBmcm9tICcuLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXV0aWxzJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vY29yZS9pbnRsJztcbmltcG9ydCB7IE1pbWVSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9taW1lLXJlc2l6ZS1zZXJ2aWNlL21pbWUtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjb2duaXplZFRleHRNb2RlLCBSZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzIH0gZnJvbSAnLi4vY29yZS9tb2RlbHMnO1xuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL2RpbWVuc2lvbnMnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLi9jb3JlL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXQgfSBmcm9tICcuLi9jb3JlL21vZGVscy92aWV3ZXItbGF5b3V0JztcbmltcG9ydCB7IFZpZXdlckxheW91dFNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3ZpZXdlci1sYXlvdXQtc2VydmljZS92aWV3ZXItbGF5b3V0LXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtaW1lLXZpZXctZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ZpZXctZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdmlldy1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgVmlld0RpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgdmlld2VyTGF5b3V0OiBWaWV3ZXJMYXlvdXQgPSBWaWV3ZXJMYXlvdXQuT05FX1BBR0U7XG4gIFZpZXdlckxheW91dDogdHlwZW9mIFZpZXdlckxheW91dCA9IFZpZXdlckxheW91dDtcbiAgaXNQYWdlZE1hbmlmZXN0ID0gZmFsc2U7XG4gIGhhc1JlY29nbml6ZWRUZXh0Q29udGVudCA9IGZhbHNlO1xuICByZWNvZ25pemVkVGV4dE1vZGUgPSBSZWNvZ25pemVkVGV4dE1vZGUuTk9ORTtcbiAgUmVjb2duaXplZFRleHRNb2RlOiB0eXBlb2YgUmVjb2duaXplZFRleHRNb2RlID0gUmVjb2duaXplZFRleHRNb2RlO1xuICBjb250ZW50U3R5bGU6IGFueTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBtZWRpYU9ic2VydmVyOiBNZWRpYU9ic2VydmVyLFxuICAgIHB1YmxpYyBpbnRsOiBNaW1lVmlld2VySW50bCxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSB2aWV3ZXJMYXlvdXRTZXJ2aWNlOiBWaWV3ZXJMYXlvdXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZk1hbmlmZXN0U2VydmljZTogSWlpZk1hbmlmZXN0U2VydmljZSxcbiAgICBwcml2YXRlIGFsdG9TZXJ2aWNlOiBBbHRvU2VydmljZSxcbiAgICBwcml2YXRlIG1pbWVSZXNpemVTZXJ2aWNlOiBNaW1lUmVzaXplU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgICh2aWV3ZXJMYXlvdXQ6IFZpZXdlckxheW91dCkgPT4ge1xuICAgICAgICAgIHRoaXMudmlld2VyTGF5b3V0ID0gdmlld2VyTGF5b3V0O1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5hbHRvU2VydmljZS5vblJlY29nbml6ZWRUZXh0Q29udGVudE1vZGVDaGFuZ2UkLnN1YnNjcmliZShcbiAgICAgICAgKHJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXM6IFJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXMpID0+IHtcbiAgICAgICAgICB0aGlzLnJlY29nbml6ZWRUZXh0TW9kZSA9IHJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXMuY3VycmVudFZhbHVlO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5pc1BhZ2VkTWFuaWZlc3QgPSBtYW5pZmVzdFxuICAgICAgICAgICAgPyBNYW5pZmVzdFV0aWxzLmlzTWFuaWZlc3RQYWdlZChtYW5pZmVzdClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgICAgdGhpcy5oYXNSZWNvZ25pemVkVGV4dENvbnRlbnQgPSBtYW5pZmVzdFxuICAgICAgICAgICAgPyBNYW5pZmVzdFV0aWxzLmhhc1JlY29nbml6ZWRUZXh0Q29udGVudChtYW5pZmVzdClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm1pbWVSZXNpemVTZXJ2aWNlLm9uUmVzaXplLnN1YnNjcmliZSgocmVjdCkgPT4ge1xuICAgICAgICB0aGlzLnJlc2l6ZUhlaWdodChyZWN0KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgc2V0TGF5b3V0T25lUGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2Uuc2V0TGF5b3V0KFZpZXdlckxheW91dC5PTkVfUEFHRSk7XG4gIH1cblxuICBzZXRMYXlvdXRUd29QYWdlKCk6IHZvaWQge1xuICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5zZXRMYXlvdXQoVmlld2VyTGF5b3V0LlRXT19QQUdFKTtcbiAgfVxuXG4gIGNsb3NlUmVjb2duaXplZFRleHRDb250ZW50KCk6IHZvaWQge1xuICAgIHRoaXMuYWx0b1NlcnZpY2UuY2xvc2VSZWNvZ25pemVkVGV4dENvbnRlbnQoKTtcbiAgfVxuXG4gIHNob3dSZWNvZ25pemVkVGV4dENvbnRlbnRJblNwbGl0VmlldygpOiB2b2lkIHtcbiAgICB0aGlzLmFsdG9TZXJ2aWNlLnNob3dSZWNvZ25pemVkVGV4dENvbnRlbnRJblNwbGl0VmlldygpO1xuICB9XG5cbiAgc2hvd1JlY29nbml6ZWRUZXh0Q29udGVudE9ubHkoKTogdm9pZCB7XG4gICAgdGhpcy5hbHRvU2VydmljZS5zaG93UmVjb2duaXplZFRleHRDb250ZW50T25seSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNpemVIZWlnaHQocmVjdDogRGltZW5zaW9ucyk6IHZvaWQge1xuICAgIGxldCBtYXhIZWlnaHQgPSByZWN0LmhlaWdodCAtIDE5MiArICdweCc7XG4gICAgaWYgKHRoaXMubWVkaWFPYnNlcnZlci5pc0FjdGl2ZSgnbHQtbWQnKSkge1xuICAgICAgbWF4SGVpZ2h0ID0gcmVjdC5oZWlnaHQgKyAncHgnO1xuICAgIH1cbiAgICB0aGlzLmNvbnRlbnRTdHlsZSA9IHtcbiAgICAgIG1heEhlaWdodCxcbiAgICB9O1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwibWVkaWFPYnNlcnZlci5pc0FjdGl2ZSgnbHQtbWQnKVwiPlxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+XG4gICAgPG1hdC10b29sYmFyIGNvbG9yPVwicHJpbWFyeVwiIGRhdGEtdGVzdC1pZD1cIm1vYmlsZS10b29sYmFyXCI+XG4gICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgZGF0YS10ZXN0LWlkPVwibmd4LW1pbWUtdmlldy1kaWFsb2ctY2xvc2UtYnV0dG9uXCJcbiAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICBbYXJpYS1sYWJlbF09XCJpbnRsLmNsb3NlTGFiZWxcIlxuICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwuY2xvc2VMYWJlbFwiXG4gICAgICAgICAgW21hdERpYWxvZ0Nsb3NlXT1cInRydWVcIlxuICAgICAgICA+XG4gICAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxoMSBtYXQtZGlhbG9nLXRpdGxlPnt7IGludGwubGF5b3V0TWVudUxhYmVsIH19PC9oMT5cbiAgICAgIDwvZGl2PlxuICAgIDwvbWF0LXRvb2xiYXI+XG4gIDwvbmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaERlZmF1bHQ+XG4gICAgPG1hdC10b29sYmFyIGRhdGEtdGVzdC1pZD1cImRlc2t0b3AtdG9vbGJhclwiPlxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIGNlbnRlclwiIGZ4RmxleD5cbiAgICAgICAgPGgxIG1hdC1kaWFsb2ctdGl0bGUgZGF0YS10ZXN0LWlkPVwibmd4LW1pbWUtaGVhZGluZy1kZXNrdG9wXCI+e3tcbiAgICAgICAgICBpbnRsLmxheW91dE1lbnVMYWJlbFxuICAgICAgICB9fTwvaDE+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBkYXRhLXRlc3QtaWQ9XCJuZ3gtbWltZS12aWV3LWRpYWxvZy1jbG9zZS1idXR0b25cIlxuICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgIFthcmlhLWxhYmVsXT1cImludGwuY2xvc2VMYWJlbFwiXG4gICAgICAgICAgW21hdFRvb2x0aXBdPVwiaW50bC5jbG9zZUxhYmVsXCJcbiAgICAgICAgICBbbWF0RGlhbG9nQ2xvc2VdPVwidHJ1ZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbWF0LXRvb2xiYXI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9uZy1jb250YWluZXI+XG48bWF0LWRpYWxvZy1jb250ZW50IFtuZ1N0eWxlXT1cImNvbnRlbnRTdHlsZVwiPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNQYWdlZE1hbmlmZXN0XCI+XG4gICAgPHNlY3Rpb24gZGF0YS10ZXN0LWlkPVwicGFnZS1sYXlvdXRcIj5cbiAgICAgIDxoMj57eyBpbnRsLnBhZ2VMYXlvdXRMYWJlbCB9fTwvaDI+XG4gICAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIj5cbiAgICAgICAgICA8bWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXAgW3ZhbHVlXT1cInZpZXdlckxheW91dFwiPlxuICAgICAgICAgICAgPG1hdC1idXR0b24tdG9nZ2xlXG4gICAgICAgICAgICAgIGRhdGEtdGVzdC1pZD1cIm5neC1taW1lLXNpbmdsZS1wYWdlLXZpZXctYnV0dG9uXCJcbiAgICAgICAgICAgICAgW2FyaWEtbGFiZWxdPVwiaW50bC5zaW5nbGVQYWdlVmlld0xhYmVsXCJcbiAgICAgICAgICAgICAgW3ZhbHVlXT1cIlZpZXdlckxheW91dC5PTkVfUEFHRVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJzZXRMYXlvdXRPbmVQYWdlKClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8bWltZS1pY29uIFtpY29uTmFtZV09XCInc2luZ2xlX3BhZ2VfZGlzcGxheSdcIj4gPC9taW1lLWljb24+XG4gICAgICAgICAgICA8L21hdC1idXR0b24tdG9nZ2xlPlxuICAgICAgICAgIDwvbWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXA+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+e3sgaW50bC5zaW5nbGVQYWdlVmlld0xhYmVsIH19PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgICAgICAgIDxtYXQtYnV0dG9uLXRvZ2dsZS1ncm91cCBbdmFsdWVdPVwidmlld2VyTGF5b3V0XCI+XG4gICAgICAgICAgICA8bWF0LWJ1dHRvbi10b2dnbGVcbiAgICAgICAgICAgICAgZGF0YS10ZXN0LWlkPVwibmd4LW1pbWUtdHdvLXBhZ2Utdmlldy1idXR0b25cIlxuICAgICAgICAgICAgICBbYXJpYS1sYWJlbF09XCJpbnRsLnR3b1BhZ2VWaWV3TGFiZWxcIlxuICAgICAgICAgICAgICBbdmFsdWVdPVwiVmlld2VyTGF5b3V0LlRXT19QQUdFXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cInNldExheW91dFR3b1BhZ2UoKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxtaW1lLWljb24gW2ljb25OYW1lXT1cIid0d29fcGFnZV9kaXNwbGF5J1wiPiA8L21pbWUtaWNvbj5cbiAgICAgICAgICAgIDwvbWF0LWJ1dHRvbi10b2dnbGU+XG4gICAgICAgICAgPC9tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj57eyBpbnRsLnR3b1BhZ2VWaWV3TGFiZWwgfX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gIDwvbmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiaGFzUmVjb2duaXplZFRleHRDb250ZW50XCI+XG4gICAgPG1hdC1kaXZpZGVyPjwvbWF0LWRpdmlkZXI+XG4gICAgPHNlY3Rpb24gZGF0YS10ZXN0LWlkPVwicmVjb2duaXplZC10ZXh0LWNvbnRlbnRcIj5cbiAgICAgIDxoMj57eyBpbnRsLmRpZ2l0YWxUZXh0TGFiZWwgfX08L2gyPlxuICAgICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICAgICAgPG1hdC1idXR0b24tdG9nZ2xlLWdyb3VwIFt2YWx1ZV09XCJyZWNvZ25pemVkVGV4dE1vZGVcIj5cbiAgICAgICAgICAgIDxtYXQtYnV0dG9uLXRvZ2dsZVxuICAgICAgICAgICAgICBkYXRhLXRlc3QtaWQ9XCJuZ3gtbWltZS1yZWNvZ25pemVkLXRleHQtY29udGVudC1jbG9zZS1idXR0b25cIlxuICAgICAgICAgICAgICBbYXJpYS1sYWJlbF09XCJpbnRsLnJlY29nbml6ZWRUZXh0Q29udGVudENsb3NlTGFiZWxcIlxuICAgICAgICAgICAgICBbdmFsdWVdPVwiUmVjb2duaXplZFRleHRNb2RlLk5PTkVcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwiY2xvc2VSZWNvZ25pemVkVGV4dENvbnRlbnQoKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxtYXQtaWNvbj5oaWRlX3NvdXJjZTwvbWF0LWljb24+XG4gICAgICAgICAgICA8L21hdC1idXR0b24tdG9nZ2xlPlxuICAgICAgICAgIDwvbWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXA+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+e3sgaW50bC5yZWNvZ25pemVkVGV4dENvbnRlbnRDbG9zZUxhYmVsIH19PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgICAgICAgIDxtYXQtYnV0dG9uLXRvZ2dsZS1ncm91cCBbdmFsdWVdPVwicmVjb2duaXplZFRleHRNb2RlXCI+XG4gICAgICAgICAgICA8bWF0LWJ1dHRvbi10b2dnbGVcbiAgICAgICAgICAgICAgZGF0YS10ZXN0LWlkPVwibmd4LW1pbWUtcmVjb2duaXplZC10ZXh0LWNvbnRlbnQtc3BsaXQtdmlldy1idXR0b25cIlxuICAgICAgICAgICAgICBbYXJpYS1sYWJlbF09XCJpbnRsLnJlY29nbml6ZWRUZXh0Q29udGVudEluU3BsaXRWaWV3TGFiZWxcIlxuICAgICAgICAgICAgICBbdmFsdWVdPVwiUmVjb2duaXplZFRleHRNb2RlLlNQTElUXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cInNob3dSZWNvZ25pemVkVGV4dENvbnRlbnRJblNwbGl0VmlldygpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPG1hdC1pY29uPnZpZXdfc2lkZWJhcjwvbWF0LWljb24+XG4gICAgICAgICAgICA8L21hdC1idXR0b24tdG9nZ2xlPlxuICAgICAgICAgIDwvbWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXA+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+e3tcbiAgICAgICAgICAgIGludGwucmVjb2duaXplZFRleHRDb250ZW50SW5TcGxpdFZpZXdMYWJlbFxuICAgICAgICAgIH19PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgICAgICAgIDxtYXQtYnV0dG9uLXRvZ2dsZS1ncm91cCBbdmFsdWVdPVwicmVjb2duaXplZFRleHRNb2RlXCI+XG4gICAgICAgICAgICA8bWF0LWJ1dHRvbi10b2dnbGVcbiAgICAgICAgICAgICAgZGF0YS10ZXN0LWlkPVwibmd4LW1pbWUtcmVjb2duaXplZC10ZXh0LWNvbnRlbnQtb25seS1idXR0b25cIlxuICAgICAgICAgICAgICBbYXJpYS1sYWJlbF09XCJpbnRsLnNob3dSZWNvZ25pemVkVGV4dENvbnRlbnRMYWJlbFwiXG4gICAgICAgICAgICAgIFt2YWx1ZV09XCJSZWNvZ25pemVkVGV4dE1vZGUuT05MWVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJzaG93UmVjb2duaXplZFRleHRDb250ZW50T25seSgpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPG1hdC1pY29uPmFydGljbGU8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9tYXQtYnV0dG9uLXRvZ2dsZT5cbiAgICAgICAgICA8L21hdC1idXR0b24tdG9nZ2xlLWdyb3VwPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPnt7IGludGwuc2hvd1JlY29nbml6ZWRUZXh0Q29udGVudExhYmVsIH19PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbWF0LWRpYWxvZy1jb250ZW50PlxuIl19