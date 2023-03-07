import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChild, ViewChildren, } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ContentSearchNavigationService } from '../core/navigation/content-search-navigation-service/content-search-navigation.service';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../core/intl';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "./../core/intl";
import * as i3 from "@angular/flex-layout";
import * as i4 from "./../core/mime-resize-service/mime-resize.service";
import * as i5 from "./../core/iiif-manifest-service/iiif-manifest-service";
import * as i6 from "./../core/iiif-content-search-service/iiif-content-search.service";
import * as i7 from "../core/navigation/content-search-navigation-service/content-search-navigation.service";
import * as i8 from "@angular/common";
import * as i9 from "@angular/flex-layout/flex";
import * as i10 from "@angular/flex-layout/extended";
import * as i11 from "@angular/forms";
import * as i12 from "@angular/material/toolbar";
import * as i13 from "@angular/material/button";
import * as i14 from "@angular/material/icon";
import * as i15 from "@angular/material/tooltip";
import * as i16 from "@angular/material/divider";
import * as i17 from "@angular/material/input";
import * as i18 from "@angular/material/form-field";
import * as i19 from "@angular/material/progress-bar";
const _c0 = ["contentSearchResult"];
const _c1 = ["query"];
const _c2 = ["hitButton"];
function ContentSearchDialogComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "mat-toolbar", 16)(2, "div", 17)(3, "button", 18)(4, "mat-icon");
    i0.ɵɵtext(5, "close");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h1", 19);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("aria-label", ctx_r0.intl.closeLabel)("matTooltip", ctx_r0.intl.closeLabel)("matDialogClose", true);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.intl.searchLabel);
} }
function ContentSearchDialogComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "mat-toolbar")(2, "div", 20)(3, "h1", 21);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 18)(6, "mat-icon");
    i0.ɵɵtext(7, "close");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.intl.searchLabel);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("aria-label", ctx_r1.intl.closeLabel)("matTooltip", ctx_r1.intl.closeLabel)("matDialogClose", true);
} }
function ContentSearchDialogComponent_button_14_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function ContentSearchDialogComponent_button_14_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r8.clear()); });
    i0.ɵɵelementStart(1, "mat-icon", 9);
    i0.ɵɵtext(2, "clear");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("matTooltip", ctx_r4.intl.clearSearchLabel)("disabled", ctx_r4.isSearching);
    i0.ɵɵattribute("aria-label", ctx_r4.intl.clearSearchLabel);
} }
function ContentSearchDialogComponent_div_17_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 28);
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("innerHTML", ctx_r12.intl.resultsFoundLabel(ctx_r12.numberOfHits, ctx_r12.currentSearch), i0.ɵɵsanitizeHtml);
} }
function ContentSearchDialogComponent_div_17_div_2_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 28);
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("innerHTML", ctx_r13.intl.noResultsFoundLabel(ctx_r13.currentSearch), i0.ɵɵsanitizeHtml);
} }
function ContentSearchDialogComponent_div_17_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, ContentSearchDialogComponent_div_17_div_2_div_1_Template, 1, 1, "div", 27);
    i0.ɵɵtemplate(2, ContentSearchDialogComponent_div_17_div_2_div_2_Template, 1, 1, "div", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r10.numberOfHits > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r10.numberOfHits === 0);
} }
function ContentSearchDialogComponent_div_17_ng_container_3_mat_divider_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-divider");
} }
function ContentSearchDialogComponent_div_17_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 29, 30);
    i0.ɵɵlistener("click", function ContentSearchDialogComponent_div_17_ng_container_3_Template_button_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r19); const hit_r14 = restoredCtx.$implicit; const ctx_r18 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r18.goToHit(hit_r14)); })("keydown.enter", function ContentSearchDialogComponent_div_17_ng_container_3_Template_button_keydown_enter_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r19); const hit_r14 = restoredCtx.$implicit; const ctx_r20 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r20.goToHit(hit_r14)); });
    i0.ɵɵelementStart(3, "div", 31)(4, "div", 32);
    i0.ɵɵtext(5);
    i0.ɵɵelementStart(6, "em");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 33);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(11, ContentSearchDialogComponent_div_17_ng_container_3_mat_divider_11_Template, 1, 0, "mat-divider", 25);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const hit_r14 = ctx.$implicit;
    const last_r15 = ctx.last;
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("color", ctx_r11.currentHit && hit_r14.id === ctx_r11.currentHit.id ? "accent" : null)("ngClass", "hit");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", hit_r14.before, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(hit_r14.match);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", hit_r14.after, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(hit_r14.index + 1);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !last_r15);
} }
function ContentSearchDialogComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵelement(1, "input", 24);
    i0.ɵɵtemplate(2, ContentSearchDialogComponent_div_17_div_2_Template, 3, 2, "div", 25);
    i0.ɵɵtemplate(3, ContentSearchDialogComponent_div_17_ng_container_3_Template, 12, 7, "ng-container", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", ctx_r6.numberOfHits);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.currentSearch && ctx_r6.currentSearch.length > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r6.hits);
} }
function ContentSearchDialogComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵelement(1, "mat-progress-bar", 34);
    i0.ɵɵelementEnd();
} }
export class ContentSearchDialogComponent {
    constructor(dialogRef, intl, mediaObserver, cdr, mimeResizeService, iiifManifestService, iiifContentSearchService, contentSearchNavigationService) {
        this.dialogRef = dialogRef;
        this.intl = intl;
        this.mediaObserver = mediaObserver;
        this.cdr = cdr;
        this.mimeResizeService = mimeResizeService;
        this.iiifManifestService = iiifManifestService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.contentSearchNavigationService = contentSearchNavigationService;
        this.q = '';
        this.hits = [];
        this.currentHit = null;
        this.currentSearch = null;
        this.numberOfHits = 0;
        this.isSearching = false;
        this.tabHeight = { maxHeight: '100px' };
        this.manifest = null;
        this.mimeHeight = 0;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.mimeResizeService.onResize.subscribe((dimensions) => {
            this.mimeHeight = dimensions.height;
            this.resizeTabHeight();
        }));
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
        }));
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((sr) => {
            this.hits = sr.hits;
            this.currentSearch = sr.q ? sr.q : '';
            this.q = sr.q;
            this.numberOfHits = sr.size();
            if (this.resultContainer !== null && this.numberOfHits > 0) {
                this.resultContainer.nativeElement.focus();
            }
            else if (this.q.length === 0 || this.numberOfHits === 0) {
                this.qEl.nativeElement.focus();
            }
        }));
        this.subscriptions.add(this.iiifContentSearchService.isSearching.subscribe((s) => {
            this.isSearching = s;
        }));
        this.subscriptions.add(this.iiifContentSearchService.onSelected.subscribe((hit) => {
            if (hit === null) {
                this.currentHit = hit;
            }
            else {
                if (!this.currentHit || this.currentHit.id !== hit.id) {
                    this.currentHit = hit;
                    this.scrollCurrentHitIntoView();
                }
            }
        }));
        this.resizeTabHeight();
    }
    ngAfterViewInit() {
        this.scrollCurrentHitIntoView();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    onSubmit(event) {
        event.preventDefault();
        this.search();
    }
    clear() {
        this.q = '';
        this.search();
    }
    goToHit(hit) {
        this.currentHit = hit;
        this.contentSearchNavigationService.selected(hit);
        if (this.mediaObserver.isActive('lt-md')) {
            this.dialogRef.close();
        }
    }
    search() {
        this.currentSearch = this.q;
        if (this.manifest) {
            this.iiifContentSearchService.search(this.manifest, this.q);
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
            height -= 272;
            this.tabHeight = {
                maxHeight: height + 'px',
            };
        }
        this.cdr.detectChanges();
    }
    scrollCurrentHitIntoView() {
        this.iiifContentSearchService.onSelected
            .pipe(take(1))
            .subscribe((hit) => {
            if (hit !== null) {
                const selected = this.findSelected(hit);
                if (selected) {
                    selected.nativeElement.focus();
                }
            }
        });
    }
    findSelected(selectedHit) {
        if (this.hitList) {
            const selectedList = this.hitList.filter((item, index) => index === selectedHit.id);
            return selectedList.length > 0 ? selectedList[0] : null;
        }
        else {
            return null;
        }
    }
}
ContentSearchDialogComponent.ɵfac = function ContentSearchDialogComponent_Factory(t) { return new (t || ContentSearchDialogComponent)(i0.ɵɵdirectiveInject(i1.MatDialogRef), i0.ɵɵdirectiveInject(i2.MimeViewerIntl), i0.ɵɵdirectiveInject(i3.MediaObserver), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i4.MimeResizeService), i0.ɵɵdirectiveInject(i5.IiifManifestService), i0.ɵɵdirectiveInject(i6.IiifContentSearchService), i0.ɵɵdirectiveInject(i7.ContentSearchNavigationService)); };
ContentSearchDialogComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ContentSearchDialogComponent, selectors: [["mime-search"]], viewQuery: function ContentSearchDialogComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 7);
        i0.ɵɵviewQuery(_c1, 7);
        i0.ɵɵviewQuery(_c2, 5, ElementRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.resultContainer = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.qEl = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.hitList = _t);
    } }, decls: 19, vars: 10, consts: [[1, "content-search-container"], [3, "ngSwitch"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], [1, "content-search-form"], [3, "ngSubmit"], ["searchForm", "ngForm"], [1, "content-search-box"], ["type", "submit", "matPrefix", "", "mat-icon-button", "", 3, "matTooltip"], [1, "icon"], ["cdkFocusInitial", "", "matInput", "", "name", "q", "autocomplete", "off", 1, "content-search-input", 3, "ngModel", "ngModelChange"], ["query", ""], ["type", "button", "class", "clearSearchButton", "matSuffix", "", "mat-icon-button", "", 3, "matTooltip", "disabled", "click", 4, "ngIf"], [1, "content-search-result-container", 3, "ngStyle"], ["contentSearchResult", ""], ["class", "content-search-result", "fxLayout", "column", 4, "ngIf"], ["color", "primary"], ["fxLayout", "row", "fxLayoutAlign", "start center"], ["mat-icon-button", "", 1, "close-content-search-dialog-button", 3, "aria-label", "matTooltip", "matDialogClose"], ["mat-dialog-title", "", 1, "heading"], ["fxLayout", "row", "fxLayoutAlign", "space-between center", "fxFlex", ""], ["mat-dialog-title", "", 1, "heading", "heading-desktop"], ["type", "button", "matSuffix", "", "mat-icon-button", "", 1, "clearSearchButton", 3, "matTooltip", "disabled", "click"], ["fxLayout", "column", 1, "content-search-result"], ["type", "hidden", 1, "numberOfHits", 3, "value"], [4, "ngIf"], [4, "ngFor", "ngForOf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"], ["mat-button", "", 3, "color", "ngClass", "click", "keydown.enter"], ["hitButton", ""], ["fxLayout", "row", "fxLayoutAlign", "space-between start"], ["fxFlex", "", 1, "summary"], ["fxFlex", "40px", 1, "canvasGroup"], ["mode", "indeterminate"]], template: function ContentSearchDialogComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
        i0.ɵɵtemplate(2, ContentSearchDialogComponent_div_2_Template, 8, 4, "div", 2);
        i0.ɵɵtemplate(3, ContentSearchDialogComponent_div_3_Template, 8, 4, "div", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "mat-dialog-content")(5, "div", 4)(6, "form", 5, 6);
        i0.ɵɵlistener("ngSubmit", function ContentSearchDialogComponent_Template_form_ngSubmit_6_listener($event) { return ctx.onSubmit($event); });
        i0.ɵɵelementStart(8, "mat-form-field", 7)(9, "button", 8)(10, "mat-icon", 9);
        i0.ɵɵtext(11, "search");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(12, "input", 10, 11);
        i0.ɵɵlistener("ngModelChange", function ContentSearchDialogComponent_Template_input_ngModelChange_12_listener($event) { return ctx.q = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(14, ContentSearchDialogComponent_button_14_Template, 3, 3, "button", 12);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(15, "div", 13, 14);
        i0.ɵɵtemplate(17, ContentSearchDialogComponent_div_17_Template, 4, 3, "div", 15);
        i0.ɵɵtemplate(18, ContentSearchDialogComponent_div_18_Template, 2, 0, "div", 15);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitch", ctx.mediaObserver.isActive("lt-md"));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", true);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("matTooltip", ctx.intl.searchLabel);
        i0.ɵɵattribute("aria-label", ctx.intl.searchLabel);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngModel", ctx.q);
        i0.ɵɵattribute("aria-label", ctx.intl.searchLabel);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.q);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngStyle", ctx.tabHeight);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !ctx.isSearching);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isSearching);
    } }, dependencies: [i8.NgClass, i8.NgForOf, i8.NgIf, i8.NgStyle, i8.NgSwitch, i8.NgSwitchCase, i8.NgSwitchDefault, i9.DefaultLayoutDirective, i9.DefaultLayoutAlignDirective, i9.DefaultFlexDirective, i10.DefaultClassDirective, i10.DefaultStyleDirective, i11.ɵNgNoValidate, i11.DefaultValueAccessor, i11.NgControlStatus, i11.NgControlStatusGroup, i11.NgModel, i11.NgForm, i12.MatToolbar, i13.MatButton, i13.MatIconButton, i14.MatIcon, i15.MatTooltip, i1.MatDialogClose, i1.MatDialogTitle, i1.MatDialogContent, i16.MatDivider, i17.MatInput, i18.MatFormField, i18.MatPrefix, i18.MatSuffix, i19.MatProgressBar], styles: [".mat-mdc-dialog-title[_ngcontent-%COMP%]{color:inherit;padding:0 2px 16px}  mat-form-field .mdc-text-field{background:transparent!important}.content-search-box[_ngcontent-%COMP%]{width:100%}.content-search-input[_ngcontent-%COMP%]{font-size:20px}.content-search-result-container[_ngcontent-%COMP%]{font-family:Roboto,Helvetica Neue,sans-serif;overflow:auto;margin-bottom:8px}.content-search-result[_ngcontent-%COMP%]{padding:8px 16px}.content-search-result[_ngcontent-%COMP%]   .mat-mdc-button[_ngcontent-%COMP%]{line-height:initial;height:auto;white-space:initial;word-wrap:initial;max-width:none;padding:8px 0;text-align:left;font-size:14px}  .content-search-container .current-content-search{font-weight:700}em[_ngcontent-%COMP%]{font-weight:700}.canvasGroupLabel[_ngcontent-%COMP%]{text-align:right;opacity:.54}.mat-mdc-dialog-content[_ngcontent-%COMP%]{max-height:none;padding:8px;margin:0}  .content-search-container>.mat-mdc-dialog-container{padding:0!important;overflow:initial}input[_ngcontent-%COMP%]{font-family:Roboto,Helvetica Neue,sans-serif}.icon[_ngcontent-%COMP%]{font-size:22px!important}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContentSearchDialogComponent, [{
        type: Component,
        args: [{ selector: 'mime-search', template: "<div class=\"content-search-container\">\n  <div [ngSwitch]=\"mediaObserver.isActive('lt-md')\">\n    <div *ngSwitchCase=\"true\">\n      <mat-toolbar color=\"primary\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n          <button\n            mat-icon-button\n            class=\"close-content-search-dialog-button\"\n            [aria-label]=\"intl.closeLabel\"\n            [matTooltip]=\"intl.closeLabel\"\n            [matDialogClose]=\"true\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n          <h1 mat-dialog-title class=\"heading\">{{ intl.searchLabel }}</h1>\n        </div>\n      </mat-toolbar>\n    </div>\n    <div *ngSwitchDefault>\n      <mat-toolbar>\n        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex>\n          <h1 mat-dialog-title class=\"heading heading-desktop\">{{\n            intl.searchLabel\n          }}</h1>\n          <button\n            mat-icon-button\n            class=\"close-content-search-dialog-button\"\n            [aria-label]=\"intl.closeLabel\"\n            [matTooltip]=\"intl.closeLabel\"\n            [matDialogClose]=\"true\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n        </div>\n      </mat-toolbar>\n    </div>\n  </div>\n  <mat-dialog-content>\n    <div class=\"content-search-form\">\n      <form (ngSubmit)=\"onSubmit($event)\" #searchForm=\"ngForm\">\n        <mat-form-field class=\"content-search-box\">\n          <button\n            type=\"submit\"\n            matPrefix\n            mat-icon-button\n            [attr.aria-label]=\"intl.searchLabel\"\n            [matTooltip]=\"intl.searchLabel\"\n          >\n            <mat-icon class=\"icon\">search</mat-icon>\n          </button>\n          <input\n            #query\n            cdkFocusInitial\n            matInput\n            class=\"content-search-input\"\n            [(ngModel)]=\"q\"\n            [attr.aria-label]=\"intl.searchLabel\"\n            name=\"q\"\n            autocomplete=\"off\"\n          />\n          <button\n            *ngIf=\"q\"\n            type=\"button\"\n            class=\"clearSearchButton\"\n            matSuffix\n            mat-icon-button\n            [attr.aria-label]=\"intl.clearSearchLabel\"\n            [matTooltip]=\"intl.clearSearchLabel\"\n            [disabled]=\"isSearching\"\n            (click)=\"clear()\"\n          >\n            <mat-icon class=\"icon\">clear</mat-icon>\n          </button>\n        </mat-form-field>\n      </form>\n    </div>\n    <div\n      #contentSearchResult\n      class=\"content-search-result-container\"\n      [ngStyle]=\"tabHeight\"\n    >\n      <div *ngIf=\"!isSearching\" class=\"content-search-result\" fxLayout=\"column\">\n        <input type=\"hidden\" class=\"numberOfHits\" [value]=\"numberOfHits\" />\n        <div *ngIf=\"currentSearch && currentSearch.length > 0\">\n          <div\n            *ngIf=\"numberOfHits > 0\"\n            [innerHTML]=\"intl.resultsFoundLabel(numberOfHits, currentSearch)\"\n          ></div>\n          <div\n            *ngIf=\"numberOfHits === 0\"\n            [innerHTML]=\"intl.noResultsFoundLabel(currentSearch)\"\n          ></div>\n        </div>\n        <ng-container *ngFor=\"let hit of hits; let last = last\">\n          <button\n            #hitButton\n            mat-button\n            [color]=\"currentHit && hit.id === currentHit.id ? 'accent' : null\"\n            [ngClass]=\"'hit'\"\n            (click)=\"goToHit(hit)\"\n            (keydown.enter)=\"goToHit(hit)\"\n          >\n            <div fxLayout=\"row\" fxLayoutAlign=\"space-between start\">\n              <div fxFlex class=\"summary\">\n                {{ hit.before }} <em>{{ hit.match }}</em> {{ hit.after }}\n              </div>\n              <div fxFlex=\"40px\" class=\"canvasGroup\">{{ hit.index + 1 }}</div>\n            </div>\n          </button>\n          <mat-divider *ngIf=\"!last\"></mat-divider>\n        </ng-container>\n      </div>\n      <div *ngIf=\"isSearching\" class=\"content-search-result\" fxLayout=\"column\">\n        <mat-progress-bar mode=\"indeterminate\"></mat-progress-bar>\n      </div>\n    </div>\n  </mat-dialog-content>\n</div>\n", styles: [".mat-mdc-dialog-title{color:inherit;padding:0 2px 16px}::ng-deep mat-form-field .mdc-text-field{background:transparent!important}.content-search-box{width:100%}.content-search-input{font-size:20px}.content-search-result-container{font-family:Roboto,Helvetica Neue,sans-serif;overflow:auto;margin-bottom:8px}.content-search-result{padding:8px 16px}.content-search-result .mat-mdc-button{line-height:initial;height:auto;white-space:initial;word-wrap:initial;max-width:none;padding:8px 0;text-align:left;font-size:14px}::ng-deep .content-search-container .current-content-search{font-weight:700}em{font-weight:700}.canvasGroupLabel{text-align:right;opacity:.54}.mat-mdc-dialog-content{max-height:none;padding:8px;margin:0}::ng-deep .content-search-container>.mat-mdc-dialog-container{padding:0!important;overflow:initial}input{font-family:Roboto,Helvetica Neue,sans-serif}.icon{font-size:22px!important}\n"] }]
    }], function () { return [{ type: i1.MatDialogRef }, { type: i2.MimeViewerIntl }, { type: i3.MediaObserver }, { type: i0.ChangeDetectorRef }, { type: i4.MimeResizeService }, { type: i5.IiifManifestService }, { type: i6.IiifContentSearchService }, { type: i7.ContentSearchNavigationService }]; }, { resultContainer: [{
            type: ViewChild,
            args: ['contentSearchResult', { static: true }]
        }], qEl: [{
            type: ViewChild,
            args: ['query', { static: true }]
        }], hitList: [{
            type: ViewChildren,
            args: ['hitButton', { read: ElementRef }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFHVixTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHdGQUF3RixDQUFDO0FBQ3hJLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG1FQUFtRSxDQUFDO0FBQzdHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQzVGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ2pCbEYsMkJBQTBCLHNCQUFBLGNBQUEsaUJBQUEsZUFBQTtJQVVSLHFCQUFLO0lBQUEsaUJBQVcsRUFBQTtJQUU1Qiw4QkFBcUM7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QTs7UUFsSEgsZUFBNEM7UUFBNUMsOERBQTRDO1FBQ3pDLGVBQWtCO1FBQWxCLG1DQUFrQjtRQTRDaEIsZUFBK0I7UUFBL0IsaURBQStCO1FBRC9CLGtEQUFvQztRQVVwQyxlQUFlO1FBQWYsK0JBQWU7UUFDZixrREFBb0M7UUFLbkMsZUFBTztRQUFQLDRCQUFPO1FBa0JkLGVBQXFCO1FBQXJCLHVDQUFxQjtRQUVmLGVBQWtCO1FBQWxCLHVDQUFrQjtRQStCbEIsZUFBaUI7UUFBakIsc0NBQWlCOzt1RkRsRmhCLDRCQUE0QjtjQUx4QyxTQUFTOzJCQUNFLGFBQWE7OFNBa0J2QixlQUFlO2tCQURkLFNBQVM7bUJBQUMscUJBQXFCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBRVosR0FBRztrQkFBeEMsU0FBUzttQkFBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBRXBDLE9BQU87a0JBRE4sWUFBWTttQkFBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVkaWFPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL25hdmlnYXRpb24vY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi1zZXJ2aWNlL2NvbnRlbnQtc2VhcmNoLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLy4uL2NvcmUvaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi8uLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLy4uL2NvcmUvaW50bCc7XG5pbXBvcnQgeyBNaW1lUmVzaXplU2VydmljZSB9IGZyb20gJy4vLi4vY29yZS9taW1lLXJlc2l6ZS1zZXJ2aWNlL21pbWUtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4vLi4vY29yZS9tb2RlbHMvZGltZW5zaW9ucyc7XG5pbXBvcnQgeyBIaXQgfSBmcm9tICcuLy4uL2NvcmUvbW9kZWxzL2hpdCc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4vLi4vY29yZS9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi9jb3JlL21vZGVscy9zZWFyY2gtcmVzdWx0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS1zZWFyY2gnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29udGVudC1zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29udGVudC1zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIENvbnRlbnRTZWFyY2hEaWFsb2dDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveVxue1xuICBwdWJsaWMgcSA9ICcnO1xuICBwdWJsaWMgaGl0czogSGl0W10gPSBbXTtcbiAgcHVibGljIGN1cnJlbnRIaXQ6IEhpdCB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgY3VycmVudFNlYXJjaDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIHB1YmxpYyBudW1iZXJPZkhpdHMgPSAwO1xuICBwdWJsaWMgaXNTZWFyY2hpbmcgPSBmYWxzZTtcbiAgcHVibGljIHRhYkhlaWdodCA9IHsgbWF4SGVpZ2h0OiAnMTAwcHgnIH07XG4gIHByaXZhdGUgbWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbWltZUhlaWdodCA9IDA7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgQFZpZXdDaGlsZCgnY29udGVudFNlYXJjaFJlc3VsdCcsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHJlc3VsdENvbnRhaW5lciE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3F1ZXJ5JywgeyBzdGF0aWM6IHRydWUgfSkgcUVsITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZHJlbignaGl0QnV0dG9uJywgeyByZWFkOiBFbGVtZW50UmVmIH0pXG4gIGhpdExpc3QhOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENvbnRlbnRTZWFyY2hEaWFsb2dDb21wb25lbnQ+LFxuICAgIHB1YmxpYyBpbnRsOiBNaW1lVmlld2VySW50bCxcbiAgICBwdWJsaWMgbWVkaWFPYnNlcnZlcjogTWVkaWFPYnNlcnZlcixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBtaW1lUmVzaXplU2VydmljZTogTWltZVJlc2l6ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmTWFuaWZlc3RTZXJ2aWNlOiBJaWlmTWFuaWZlc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlOiBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2U6IENvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMubWltZVJlc2l6ZVNlcnZpY2Uub25SZXNpemUuc3Vic2NyaWJlKChkaW1lbnNpb25zOiBEaW1lbnNpb25zKSA9PiB7XG4gICAgICAgIHRoaXMubWltZUhlaWdodCA9IGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICB0aGlzLnJlc2l6ZVRhYkhlaWdodCgpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5jdXJyZW50TWFuaWZlc3Quc3Vic2NyaWJlKFxuICAgICAgICAobWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCkgPT4ge1xuICAgICAgICAgIHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChzcjogU2VhcmNoUmVzdWx0KSA9PiB7XG4gICAgICAgIHRoaXMuaGl0cyA9IHNyLmhpdHM7XG4gICAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IHNyLnEgPyBzci5xIDogJyc7XG4gICAgICAgIHRoaXMucSA9IHNyLnE7XG4gICAgICAgIHRoaXMubnVtYmVyT2ZIaXRzID0gc3Iuc2l6ZSgpO1xuICAgICAgICBpZiAodGhpcy5yZXN1bHRDb250YWluZXIgIT09IG51bGwgJiYgdGhpcy5udW1iZXJPZkhpdHMgPiAwKSB7XG4gICAgICAgICAgdGhpcy5yZXN1bHRDb250YWluZXIubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucS5sZW5ndGggPT09IDAgfHwgdGhpcy5udW1iZXJPZkhpdHMgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnFFbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5pc1NlYXJjaGluZy5zdWJzY3JpYmUoKHM6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgdGhpcy5pc1NlYXJjaGluZyA9IHM7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25TZWxlY3RlZC5zdWJzY3JpYmUoKGhpdDogSGl0IHwgbnVsbCkgPT4ge1xuICAgICAgICBpZiAoaGl0ID09PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50SGl0ID0gaGl0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghdGhpcy5jdXJyZW50SGl0IHx8IHRoaXMuY3VycmVudEhpdC5pZCAhPT0gaGl0LmlkKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRIaXQgPSBoaXQ7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEN1cnJlbnRIaXRJbnRvVmlldygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5yZXNpemVUYWJIZWlnaHQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnNjcm9sbEN1cnJlbnRIaXRJbnRvVmlldygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBvblN1Ym1pdChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZWFyY2goKTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMucSA9ICcnO1xuICAgIHRoaXMuc2VhcmNoKCk7XG4gIH1cblxuICBnb1RvSGl0KGhpdDogSGl0KTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50SGl0ID0gaGl0O1xuICAgIHRoaXMuY29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkKGhpdCk7XG4gICAgaWYgKHRoaXMubWVkaWFPYnNlcnZlci5pc0FjdGl2ZSgnbHQtbWQnKSkge1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlYXJjaCgpIHtcbiAgICB0aGlzLmN1cnJlbnRTZWFyY2ggPSB0aGlzLnE7XG4gICAgaWYgKHRoaXMubWFuaWZlc3QpIHtcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLnNlYXJjaCh0aGlzLm1hbmlmZXN0LCB0aGlzLnEpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzaXplVGFiSGVpZ2h0KCk6IHZvaWQge1xuICAgIGxldCBoZWlnaHQgPSB0aGlzLm1pbWVIZWlnaHQ7XG5cbiAgICBpZiAodGhpcy5tZWRpYU9ic2VydmVyLmlzQWN0aXZlKCdsdC1tZCcpKSB7XG4gICAgICB0aGlzLnRhYkhlaWdodCA9IHtcbiAgICAgICAgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAxMjggKyAncHgnLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVpZ2h0IC09IDI3MjtcbiAgICAgIHRoaXMudGFiSGVpZ2h0ID0ge1xuICAgICAgICBtYXhIZWlnaHQ6IGhlaWdodCArICdweCcsXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbEN1cnJlbnRIaXRJbnRvVmlldygpIHtcbiAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5vblNlbGVjdGVkXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoaGl0OiBIaXQgfCBudWxsKSA9PiB7XG4gICAgICAgIGlmIChoaXQgIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuZmluZFNlbGVjdGVkKGhpdCk7XG4gICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICBzZWxlY3RlZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZFNlbGVjdGVkKHNlbGVjdGVkSGl0OiBIaXQpOiBFbGVtZW50UmVmIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuaGl0TGlzdCkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRMaXN0ID0gdGhpcy5oaXRMaXN0LmZpbHRlcihcbiAgICAgICAgKGl0ZW06IEVsZW1lbnRSZWYsIGluZGV4OiBudW1iZXIpID0+IGluZGV4ID09PSBzZWxlY3RlZEhpdC5pZFxuICAgICAgKTtcbiAgICAgIHJldHVybiBzZWxlY3RlZExpc3QubGVuZ3RoID4gMCA/IHNlbGVjdGVkTGlzdFswXSA6IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImNvbnRlbnQtc2VhcmNoLWNvbnRhaW5lclwiPlxuICA8ZGl2IFtuZ1N3aXRjaF09XCJtZWRpYU9ic2VydmVyLmlzQWN0aXZlKCdsdC1tZCcpXCI+XG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPlxuICAgICAgPG1hdC10b29sYmFyIGNvbG9yPVwicHJpbWFyeVwiPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgY2xhc3M9XCJjbG9zZS1jb250ZW50LXNlYXJjaC1kaWFsb2ctYnV0dG9uXCJcbiAgICAgICAgICAgIFthcmlhLWxhYmVsXT1cImludGwuY2xvc2VMYWJlbFwiXG4gICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLmNsb3NlTGFiZWxcIlxuICAgICAgICAgICAgW21hdERpYWxvZ0Nsb3NlXT1cInRydWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGgxIG1hdC1kaWFsb2ctdGl0bGUgY2xhc3M9XCJoZWFkaW5nXCI+e3sgaW50bC5zZWFyY2hMYWJlbCB9fTwvaDE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9tYXQtdG9vbGJhcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ1N3aXRjaERlZmF1bHQ+XG4gICAgICA8bWF0LXRvb2xiYXI+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIiBmeEZsZXg+XG4gICAgICAgICAgPGgxIG1hdC1kaWFsb2ctdGl0bGUgY2xhc3M9XCJoZWFkaW5nIGhlYWRpbmctZGVza3RvcFwiPnt7XG4gICAgICAgICAgICBpbnRsLnNlYXJjaExhYmVsXG4gICAgICAgICAgfX08L2gxPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgY2xhc3M9XCJjbG9zZS1jb250ZW50LXNlYXJjaC1kaWFsb2ctYnV0dG9uXCJcbiAgICAgICAgICAgIFthcmlhLWxhYmVsXT1cImludGwuY2xvc2VMYWJlbFwiXG4gICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJpbnRsLmNsb3NlTGFiZWxcIlxuICAgICAgICAgICAgW21hdERpYWxvZ0Nsb3NlXT1cInRydWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9tYXQtdG9vbGJhcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtc2VhcmNoLWZvcm1cIj5cbiAgICAgIDxmb3JtIChuZ1N1Ym1pdCk9XCJvblN1Ym1pdCgkZXZlbnQpXCIgI3NlYXJjaEZvcm09XCJuZ0Zvcm1cIj5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiY29udGVudC1zZWFyY2gtYm94XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICBtYXRQcmVmaXhcbiAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpbnRsLnNlYXJjaExhYmVsXCJcbiAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwuc2VhcmNoTGFiZWxcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImljb25cIj5zZWFyY2g8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgI3F1ZXJ5XG4gICAgICAgICAgICBjZGtGb2N1c0luaXRpYWxcbiAgICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgICBjbGFzcz1cImNvbnRlbnQtc2VhcmNoLWlucHV0XCJcbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwicVwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImludGwuc2VhcmNoTGFiZWxcIlxuICAgICAgICAgICAgbmFtZT1cInFcIlxuICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICpuZ0lmPVwicVwiXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiY2xlYXJTZWFyY2hCdXR0b25cIlxuICAgICAgICAgICAgbWF0U3VmZml4XG4gICAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW50bC5jbGVhclNlYXJjaExhYmVsXCJcbiAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImludGwuY2xlYXJTZWFyY2hMYWJlbFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNTZWFyY2hpbmdcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImNsZWFyKClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImljb25cIj5jbGVhcjwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG4gICAgPGRpdlxuICAgICAgI2NvbnRlbnRTZWFyY2hSZXN1bHRcbiAgICAgIGNsYXNzPVwiY29udGVudC1zZWFyY2gtcmVzdWx0LWNvbnRhaW5lclwiXG4gICAgICBbbmdTdHlsZV09XCJ0YWJIZWlnaHRcIlxuICAgID5cbiAgICAgIDxkaXYgKm5nSWY9XCIhaXNTZWFyY2hpbmdcIiBjbGFzcz1cImNvbnRlbnQtc2VhcmNoLXJlc3VsdFwiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgY2xhc3M9XCJudW1iZXJPZkhpdHNcIiBbdmFsdWVdPVwibnVtYmVyT2ZIaXRzXCIgLz5cbiAgICAgICAgPGRpdiAqbmdJZj1cImN1cnJlbnRTZWFyY2ggJiYgY3VycmVudFNlYXJjaC5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgKm5nSWY9XCJudW1iZXJPZkhpdHMgPiAwXCJcbiAgICAgICAgICAgIFtpbm5lckhUTUxdPVwiaW50bC5yZXN1bHRzRm91bmRMYWJlbChudW1iZXJPZkhpdHMsIGN1cnJlbnRTZWFyY2gpXCJcbiAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgKm5nSWY9XCJudW1iZXJPZkhpdHMgPT09IDBcIlxuICAgICAgICAgICAgW2lubmVySFRNTF09XCJpbnRsLm5vUmVzdWx0c0ZvdW5kTGFiZWwoY3VycmVudFNlYXJjaClcIlxuICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGhpdCBvZiBoaXRzOyBsZXQgbGFzdCA9IGxhc3RcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAjaGl0QnV0dG9uXG4gICAgICAgICAgICBtYXQtYnV0dG9uXG4gICAgICAgICAgICBbY29sb3JdPVwiY3VycmVudEhpdCAmJiBoaXQuaWQgPT09IGN1cnJlbnRIaXQuaWQgPyAnYWNjZW50JyA6IG51bGxcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiJ2hpdCdcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImdvVG9IaXQoaGl0KVwiXG4gICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJnb1RvSGl0KGhpdClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBzdGFydFwiPlxuICAgICAgICAgICAgICA8ZGl2IGZ4RmxleCBjbGFzcz1cInN1bW1hcnlcIj5cbiAgICAgICAgICAgICAgICB7eyBoaXQuYmVmb3JlIH19IDxlbT57eyBoaXQubWF0Y2ggfX08L2VtPiB7eyBoaXQuYWZ0ZXIgfX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgZnhGbGV4PVwiNDBweFwiIGNsYXNzPVwiY2FudmFzR3JvdXBcIj57eyBoaXQuaW5kZXggKyAxIH19PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8bWF0LWRpdmlkZXIgKm5nSWY9XCIhbGFzdFwiPjwvbWF0LWRpdmlkZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICpuZ0lmPVwiaXNTZWFyY2hpbmdcIiBjbGFzcz1cImNvbnRlbnQtc2VhcmNoLXJlc3VsdFwiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgIDxtYXQtcHJvZ3Jlc3MtYmFyIG1vZGU9XCJpbmRldGVybWluYXRlXCI+PC9tYXQtcHJvZ3Jlc3MtYmFyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvbWF0LWRpYWxvZy1jb250ZW50PlxuPC9kaXY+XG4iXX0=