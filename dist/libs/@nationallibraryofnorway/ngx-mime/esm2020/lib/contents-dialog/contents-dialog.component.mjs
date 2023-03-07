import { ChangeDetectionStrategy, ChangeDetectorRef, Component, } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import * as i0 from "@angular/core";
import * as i1 from "../core/intl";
import * as i2 from "@angular/flex-layout";
import * as i3 from "@angular/material/dialog";
import * as i4 from "../core/iiif-manifest-service/iiif-manifest-service";
import * as i5 from "../core/mime-resize-service/mime-resize.service";
import * as i6 from "@angular/common";
import * as i7 from "@angular/flex-layout/flex";
import * as i8 from "@angular/flex-layout/extended";
import * as i9 from "@angular/material/toolbar";
import * as i10 from "@angular/material/button";
import * as i11 from "@angular/material/icon";
import * as i12 from "@angular/material/tooltip";
import * as i13 from "@angular/material/tabs";
import * as i14 from "./metadata/metadata.component";
import * as i15 from "./table-of-contents/table-of-contents.component";
function ContentsDialogComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "mat-toolbar", 9)(2, "div", 10)(3, "button", 11)(4, "mat-icon");
    i0.ɵɵtext(5, "close");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h1", 12);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("aria-label", ctx_r0.intl.closeLabel)("matTooltip", ctx_r0.intl.closeLabel)("matDialogClose", true);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.intl.contentsLabel);
} }
function ContentsDialogComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "mat-toolbar", 13)(2, "div", 14)(3, "h1", 12);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 11)(6, "mat-icon");
    i0.ɵɵtext(7, "close");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.intl.contentsLabel);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("aria-label", ctx_r1.intl.closeLabel)("matTooltip", ctx_r1.intl.closeLabel)("matDialogClose", true);
} }
function ContentsDialogComponent_mat_tab_9_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-tab", 6)(1, "div", 7)(2, "mime-toc", 15);
    i0.ɵɵlistener("canvasChanged", function ContentsDialogComponent_mat_tab_9_Template_mime_toc_canvasChanged_2_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onCanvasChanged()); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("label", ctx_r2.intl.tocLabel);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngStyle", ctx_r2.tabHeight);
} }
export class ContentsDialogComponent {
    constructor(intl, mediaObserver, cdr, dialogRef, changeDetectorRef, iiifManifestService, mimeResizeService) {
        this.intl = intl;
        this.mediaObserver = mediaObserver;
        this.cdr = cdr;
        this.dialogRef = dialogRef;
        this.changeDetectorRef = changeDetectorRef;
        this.iiifManifestService = iiifManifestService;
        this.manifest = null;
        this.tabHeight = {};
        this.showToc = false;
        this.selectedIndex = 0;
        this.mimeHeight = 0;
        this.subscriptions = new Subscription();
        this.subscriptions.add(mimeResizeService.onResize.subscribe((dimensions) => {
            this.mimeHeight = dimensions.height;
            this.resizeTabHeight();
        }));
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
            this.showToc =
                this.manifest !== null &&
                    this.manifest.structures !== undefined &&
                    this.manifest.structures.length > 0;
        }));
        this.resizeTabHeight();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    onCanvasChanged() {
        if (this.mediaObserver.isActive('lt-md')) {
            this.dialogRef.close();
        }
    }
    resizeTabHeight() {
        let height = this.mimeHeight;
        if (this.mediaObserver.isActive('lt-md')) {
            this.tabHeight = {
                maxHeight: window.innerHeight - 128 + 'px',
            };
        }
        else {
            height -= 278;
            this.tabHeight = {
                maxHeight: height + 'px',
            };
        }
        this.changeDetectorRef.detectChanges();
    }
}
ContentsDialogComponent.ɵfac = function ContentsDialogComponent_Factory(t) { return new (t || ContentsDialogComponent)(i0.ɵɵdirectiveInject(i1.MimeViewerIntl), i0.ɵɵdirectiveInject(i2.MediaObserver), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i3.MatDialogRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i4.IiifManifestService), i0.ɵɵdirectiveInject(i5.MimeResizeService)); };
ContentsDialogComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ContentsDialogComponent, selectors: [["mime-contents"]], decls: 10, vars: 6, consts: [[1, "contents-container"], [3, "ngSwitch"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], ["mat-dialog-content", ""], [3, "selectedIndex", "selectedIndexChange"], [3, "label"], [1, "tab-container", 3, "ngStyle"], [3, "label", 4, "ngIf"], ["color", "primary", "data-test-id", "mobile-toolbar"], ["fxLayout", "row", "fxLayoutAlign", "start center"], ["mat-icon-button", "", 3, "aria-label", "matTooltip", "matDialogClose"], ["mat-dialog-title", ""], ["data-test-id", "desktop-toolbar"], ["fxLayout", "row", "fxLayoutAlign", "space-between center", "fxFlex", ""], [3, "canvasChanged"]], template: function ContentsDialogComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementContainerStart(1, 1);
        i0.ɵɵtemplate(2, ContentsDialogComponent_ng_container_2_Template, 8, 4, "ng-container", 2);
        i0.ɵɵtemplate(3, ContentsDialogComponent_ng_container_3_Template, 8, 4, "ng-container", 3);
        i0.ɵɵelementContainerEnd();
        i0.ɵɵelementStart(4, "div", 4)(5, "mat-tab-group", 5);
        i0.ɵɵlistener("selectedIndexChange", function ContentsDialogComponent_Template_mat_tab_group_selectedIndexChange_5_listener($event) { return ctx.selectedIndex = $event; });
        i0.ɵɵelementStart(6, "mat-tab", 6)(7, "div", 7);
        i0.ɵɵelement(8, "mime-metadata");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(9, ContentsDialogComponent_mat_tab_9_Template, 3, 2, "mat-tab", 8);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitch", ctx.mediaObserver.isActive("lt-md"));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", true);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("selectedIndex", ctx.selectedIndex);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("label", ctx.intl.metadataLabel);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngStyle", ctx.tabHeight);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.showToc);
    } }, dependencies: [i6.NgIf, i6.NgStyle, i6.NgSwitch, i6.NgSwitchCase, i6.NgSwitchDefault, i7.DefaultLayoutDirective, i7.DefaultLayoutAlignDirective, i7.DefaultFlexDirective, i8.DefaultStyleDirective, i9.MatToolbar, i10.MatIconButton, i11.MatIcon, i12.MatTooltip, i3.MatDialogClose, i3.MatDialogTitle, i3.MatDialogContent, i13.MatTab, i13.MatTabGroup, i14.MetadataComponent, i15.TocComponent], styles: [".mat-mdc-dialog-title[_ngcontent-%COMP%]{color:inherit;padding:0 2px 16px}  .contents-panel>.mat-mdc-dialog-container{padding:0!important;overflow:initial}  .contents-container>div>div>.mat-toolbar{padding:0!important}.tab-container[_ngcontent-%COMP%]{overflow:auto;padding:8px 16px}.mat-mdc-dialog-content[_ngcontent-%COMP%]{max-height:none;padding:0}"], changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContentsDialogComponent, [{
        type: Component,
        args: [{ selector: 'mime-contents', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"contents-container\">\n  <ng-container [ngSwitch]=\"mediaObserver.isActive('lt-md')\">\n    <ng-container *ngSwitchCase=\"true\">\n      <mat-toolbar color=\"primary\" data-test-id=\"mobile-toolbar\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n          <button\n            mat-icon-button\n            [aria-label]=\"intl.closeLabel\"\n            [matTooltip]=\"intl.closeLabel\"\n            [matDialogClose]=\"true\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n          <h1 mat-dialog-title>{{ intl.contentsLabel }}</h1>\n        </div>\n      </mat-toolbar>\n    </ng-container>\n    <ng-container *ngSwitchDefault>\n      <mat-toolbar data-test-id=\"desktop-toolbar\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex>\n          <h1 mat-dialog-title>{{ intl.contentsLabel }}</h1>\n          <button\n            mat-icon-button\n            [aria-label]=\"intl.closeLabel\"\n            [matTooltip]=\"intl.closeLabel\"\n            [matDialogClose]=\"true\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n        </div>\n      </mat-toolbar>\n    </ng-container>\n  </ng-container>\n  <div mat-dialog-content>\n    <mat-tab-group [(selectedIndex)]=\"selectedIndex\">\n      <mat-tab [label]=\"intl.metadataLabel\">\n        <div class=\"tab-container\" [ngStyle]=\"tabHeight\">\n          <mime-metadata></mime-metadata>\n        </div>\n      </mat-tab>\n      <mat-tab *ngIf=\"showToc\" [label]=\"intl.tocLabel\">\n        <div class=\"tab-container\" [ngStyle]=\"tabHeight\">\n          <mime-toc (canvasChanged)=\"onCanvasChanged()\"></mime-toc>\n        </div>\n      </mat-tab>\n    </mat-tab-group>\n  </div>\n</div>\n", styles: [".mat-mdc-dialog-title{color:inherit;padding:0 2px 16px}::ng-deep .contents-panel>.mat-mdc-dialog-container{padding:0!important;overflow:initial}::ng-deep .contents-container>div>div>.mat-toolbar{padding:0!important}.tab-container{overflow:auto;padding:8px 16px}.mat-mdc-dialog-content{max-height:none;padding:0}\n"] }]
    }], function () { return [{ type: i1.MimeViewerIntl }, { type: i2.MediaObserver }, { type: i0.ChangeDetectorRef }, { type: i3.MatDialogRef }, { type: i0.ChangeDetectorRef }, { type: i4.IiifManifestService }, { type: i5.MimeResizeService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudHMtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb250ZW50cy1kaWFsb2cvY29udGVudHMtZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb250ZW50cy1kaWFsb2cvY29udGVudHMtZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsR0FHVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDMUYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDVmhGLDZCQUFtQztJQUNqQyxzQ0FBMkQsY0FBQSxpQkFBQSxlQUFBO0lBUTNDLHFCQUFLO0lBQUEsaUJBQVcsRUFBQTtJQUU1Qiw4QkFBcUI7SUFBQSxZQUF3QjtJQUFBLGlCQUFLLEVBQUEsRUFBQTtJQUd4RCwwQkFBZTs7O0lBVFAsZUFBOEI7SUFBOUIsbURBQThCLHNDQUFBLHdCQUFBO0lBTVgsZUFBd0I7SUFBeEIsK0NBQXdCOzs7SUFJbkQsNkJBQStCO0lBQzdCLHVDQUE0QyxjQUFBLGFBQUE7SUFFbkIsWUFBd0I7SUFBQSxpQkFBSztJQUNsRCxrQ0FLQyxlQUFBO0lBQ1cscUJB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QXVCOzBFQUF2Qix1QkFBdUI7UUN0QnBDLDhCQUFnQztRQUM5QixnQ0FBMkQ7UUFDekQsMEZBY2U7UUFDZiwwRkFjZTtRQUNqQiwwQkFBZTtRQUNmLDhCQUF3Qix1QkFBQTtRQUNQLDJLQUFpQztRQUM5QyxrQ0FBc0MsYUFBQTtRQUVsQyxnQ0FBK0I7UUFDakMsaUJBQU0sRUFBQTtRQUVSLGdGQUlVO1FBQ1osaUJBQWdCLEVBQUEsRUFBQTs7UUE1Q0osZUFBNEM7UUFBNUMsOERBQTRDO1FBQ3pDLGVBQWtCO1FBQWxCLG1DQUFrQjtRQWdDbEIsZUFBaUM7UUFBakMsaURBQWlDO1FBQ3JDLGVBQTRCO1FBQTVCLDhDQUE0QjtRQUNSLGVBQXFCO1FBQXJCLHVDQUFxQjtRQUl4QyxlQUFhO1FBQWIsa0NBQWE7O3VGRGxCaEIsdUJBQXVCO2NBTm5DLFNBQVM7MkJBQ0UsZUFBZSxtQkFHUix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1lZGlhT2JzZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vY29yZS9pbnRsJztcbmltcG9ydCB7IE1pbWVSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9taW1lLXJlc2l6ZS1zZXJ2aWNlL21pbWUtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL2RpbWVuc2lvbnMnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLy4uL2NvcmUvbW9kZWxzL21hbmlmZXN0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS1jb250ZW50cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb250ZW50cy1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb250ZW50cy1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvbnRlbnRzRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwdWJsaWMgbWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCA9IG51bGw7XG4gIHB1YmxpYyB0YWJIZWlnaHQgPSB7fTtcbiAgcHVibGljIHNob3dUb2MgPSBmYWxzZTtcbiAgcHVibGljIHNlbGVjdGVkSW5kZXggPSAwO1xuICBwcml2YXRlIG1pbWVIZWlnaHQgPSAwO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHB1YmxpYyBtZWRpYU9ic2VydmVyOiBNZWRpYU9ic2VydmVyLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENvbnRlbnRzRGlhbG9nQ29tcG9uZW50PixcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGlpaWZNYW5pZmVzdFNlcnZpY2U6IElpaWZNYW5pZmVzdFNlcnZpY2UsXG4gICAgbWltZVJlc2l6ZVNlcnZpY2U6IE1pbWVSZXNpemVTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBtaW1lUmVzaXplU2VydmljZS5vblJlc2l6ZS5zdWJzY3JpYmUoKGRpbWVuc2lvbnM6IERpbWVuc2lvbnMpID0+IHtcbiAgICAgICAgdGhpcy5taW1lSGVpZ2h0ID0gZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgIHRoaXMucmVzaXplVGFiSGVpZ2h0KCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5tYW5pZmVzdCA9IG1hbmlmZXN0O1xuICAgICAgICAgIHRoaXMuc2hvd1RvYyA9XG4gICAgICAgICAgICB0aGlzLm1hbmlmZXN0ICE9PSBudWxsICYmXG4gICAgICAgICAgICB0aGlzLm1hbmlmZXN0LnN0cnVjdHVyZXMgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC5zdHJ1Y3R1cmVzLmxlbmd0aCA+IDA7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5yZXNpemVUYWJIZWlnaHQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgb25DYW52YXNDaGFuZ2VkKCkge1xuICAgIGlmICh0aGlzLm1lZGlhT2JzZXJ2ZXIuaXNBY3RpdmUoJ2x0LW1kJykpIHtcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNpemVUYWJIZWlnaHQoKTogdm9pZCB7XG4gICAgbGV0IGhlaWdodCA9IHRoaXMubWltZUhlaWdodDtcblxuICAgIGlmICh0aGlzLm1lZGlhT2JzZXJ2ZXIuaXNBY3RpdmUoJ2x0LW1kJykpIHtcbiAgICAgIHRoaXMudGFiSGVpZ2h0ID0ge1xuICAgICAgICBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDEyOCArICdweCcsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWlnaHQgLT0gMjc4O1xuICAgICAgdGhpcy50YWJIZWlnaHQgPSB7XG4gICAgICAgIG1heEhlaWdodDogaGVpZ2h0ICsgJ3B4JyxcbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY29udGVudHMtY29udGFpbmVyXCI+XG4gIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIm1lZGlhT2JzZXJ2ZXIuaXNBY3RpdmUoJ2x0LW1kJylcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+XG4gICAgICA8bWF0LXRvb2xiYXIgY29sb3I9XCJwcmltYXJ5XCIgZGF0YS10ZXN0LWlkPVwibW9iaWxlLXRvb2xiYXJcIj5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgIFthcmlhLWxhYmVsXT1cImludGwuY2xvc2VMYWJlbFwiXG4gICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLmNsb3NlTGFiZWxcIlxuICAgICAgICAgICAgW21hdERpYWxvZ0Nsb3NlXT1cInRydWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGgxIG1hdC1kaWFsb2ctdGl0bGU+e3sgaW50bC5jb250ZW50c0xhYmVsIH19PC9oMT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L21hdC10b29sYmFyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoRGVmYXVsdD5cbiAgICAgIDxtYXQtdG9vbGJhciBkYXRhLXRlc3QtaWQ9XCJkZXNrdG9wLXRvb2xiYXJcIj5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIGNlbnRlclwiIGZ4RmxleD5cbiAgICAgICAgICA8aDEgbWF0LWRpYWxvZy10aXRsZT57eyBpbnRsLmNvbnRlbnRzTGFiZWwgfX08L2gxPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgW2FyaWEtbGFiZWxdPVwiaW50bC5jbG9zZUxhYmVsXCJcbiAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwuY2xvc2VMYWJlbFwiXG4gICAgICAgICAgICBbbWF0RGlhbG9nQ2xvc2VdPVwidHJ1ZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L21hdC10b29sYmFyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPGRpdiBtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gICAgPG1hdC10YWItZ3JvdXAgWyhzZWxlY3RlZEluZGV4KV09XCJzZWxlY3RlZEluZGV4XCI+XG4gICAgICA8bWF0LXRhYiBbbGFiZWxdPVwiaW50bC5tZXRhZGF0YUxhYmVsXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItY29udGFpbmVyXCIgW25nU3R5bGVdPVwidGFiSGVpZ2h0XCI+XG4gICAgICAgICAgPG1pbWUtbWV0YWRhdGE+PC9taW1lLW1ldGFkYXRhPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbWF0LXRhYj5cbiAgICAgIDxtYXQtdGFiICpuZ0lmPVwic2hvd1RvY1wiIFtsYWJlbF09XCJpbnRsLnRvY0xhYmVsXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItY29udGFpbmVyXCIgW25nU3R5bGVdPVwidGFiSGVpZ2h0XCI+XG4gICAgICAgICAgPG1pbWUtdG9jIChjYW52YXNDaGFuZ2VkKT1cIm9uQ2FudmFzQ2hhbmdlZCgpXCI+PC9taW1lLXRvYz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L21hdC10YWI+XG4gICAgPC9tYXQtdGFiLWdyb3VwPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19