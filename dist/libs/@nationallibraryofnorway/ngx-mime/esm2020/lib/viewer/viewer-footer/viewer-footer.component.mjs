import { animate, state, style, transition, trigger, } from '@angular/animations';
import { ChangeDetectorRef, Component, HostBinding, ViewChild, ViewContainerRef, } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { ViewerOptions } from '../../core/models/viewer-options';
import { IiifContentSearchService } from './../../core/iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from './../../core/models/search-result';
import * as i0 from "@angular/core";
import * as i1 from "./../../core/iiif-content-search-service/iiif-content-search.service";
import * as i2 from "@angular/flex-layout";
import * as i3 from "@angular/common";
import * as i4 from "@angular/flex-layout/flex";
import * as i5 from "@angular/material/toolbar";
import * as i6 from "./content-search-navigator/content-search-navigator.component";
import * as i7 from "./canvas-group-navigator/canvas-group-navigator.component";
const _c0 = ["mimeFooterBefore"];
const _c1 = ["mimeFooterAfter"];
function ViewerFooterComponent_ng_template_3_Template(rf, ctx) { }
function ViewerFooterComponent_div_5_mime_content_search_navigator_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mime-content-search-navigator", 5);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("searchResult", ctx_r5.searchResult);
} }
function ViewerFooterComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtemplate(1, ViewerFooterComponent_div_5_mime_content_search_navigator_1_Template, 1, 1, "mime-content-search-navigator", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.showContentSearchNavigator);
} }
function ViewerFooterComponent_ng_template_9_Template(rf, ctx) { }
export class ViewerFooterComponent {
    constructor(iiifContentSearchService, mediaObserver, changeDetectorRef) {
        this.iiifContentSearchService = iiifContentSearchService;
        this.mediaObserver = mediaObserver;
        this.changeDetectorRef = changeDetectorRef;
        this.state = 'hide';
        this.showNavigationToolbar = true;
        this.searchResult = new SearchResult();
        this.showPageNavigator = true;
        this.showContentSearchNavigator = false;
        this.subscriptions = new Subscription();
    }
    get footerState() {
        return this.state;
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((sr) => {
            this.searchResult = sr;
            this.showContentSearchNavigator = this.searchResult.size() > 0;
            this.showPageNavigator =
                this.searchResult.size() === 0 || !this.isMobile();
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.mediaObserver.asObservable().subscribe((changes) => {
            this.showPageNavigator =
                this.searchResult.size() === 0 || !this.isMobile();
            this.changeDetectorRef.detectChanges();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    isMobile() {
        return this.mediaObserver.isActive('lt-md');
    }
}
ViewerFooterComponent.ɵfac = function ViewerFooterComponent_Factory(t) { return new (t || ViewerFooterComponent)(i0.ɵɵdirectiveInject(i1.IiifContentSearchService), i0.ɵɵdirectiveInject(i2.MediaObserver), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
ViewerFooterComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ViewerFooterComponent, selectors: [["mime-viewer-footer"]], viewQuery: function ViewerFooterComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 7, ViewContainerRef);
        i0.ɵɵviewQuery(_c1, 7, ViewContainerRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.mimeFooterBefore = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.mimeFooterAfter = _t.first);
    } }, hostVars: 1, hostBindings: function ViewerFooterComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵsyntheticHostProperty("@footerState", ctx.footerState);
    } }, decls: 11, vars: 3, consts: [[1, "footer-toolbar"], ["fxLayout", "row", "fxFlex", "", "fxLayoutAlign", "start center"], ["mimeFooterBefore", ""], ["fxFlex", "250px", "fxFlex.lt-md", "100%", 4, "ngIf"], ["fxFlex", "", 3, "hidden"], [3, "searchResult"], ["mimeFooterAfter", ""], ["fxFlex", "250px", "fxFlex.lt-md", "100%"], [3, "searchResult", 4, "ngIf"]], template: function ViewerFooterComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-toolbar", 0)(1, "div", 1)(2, "div");
        i0.ɵɵtemplate(3, ViewerFooterComponent_ng_template_3_Template, 0, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(5, ViewerFooterComponent_div_5_Template, 2, 1, "div", 3);
        i0.ɵɵelementStart(6, "div", 4);
        i0.ɵɵelement(7, "mime-page-navigator", 5);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(8, "div");
        i0.ɵɵtemplate(9, ViewerFooterComponent_ng_template_9_Template, 0, 0, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", ctx.searchResult.size() > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("hidden", !ctx.showPageNavigator);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("searchResult", ctx.searchResult);
    } }, dependencies: [i3.NgIf, i4.DefaultLayoutDirective, i4.DefaultLayoutAlignDirective, i4.DefaultFlexDirective, i5.MatToolbar, i6.ContentSearchNavigatorComponent, i7.CanvasGroupNavigatorComponent], styles: ["[_nghost-%COMP%]{display:block;width:100%;-webkit-user-select:none;user-select:none}.footer-toolbar[_ngcontent-%COMP%]{padding:0}[hidden][_ngcontent-%COMP%]{display:none}"], data: { animation: [
            trigger('footerState', [
                state('hide', style({
                    transform: 'translate(0, 100%)',
                })),
                state('show', style({
                    transform: 'translate(0, 0)',
                })),
                transition('hide => show', animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')),
                transition('show => hide', animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out')),
            ]),
        ] } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ViewerFooterComponent, [{
        type: Component,
        args: [{ selector: 'mime-viewer-footer', animations: [
                    trigger('footerState', [
                        state('hide', style({
                            transform: 'translate(0, 100%)',
                        })),
                        state('show', style({
                            transform: 'translate(0, 0)',
                        })),
                        transition('hide => show', animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')),
                        transition('show => hide', animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out')),
                    ]),
                ], template: "<mat-toolbar class=\"footer-toolbar\">\n  <div fxLayout=\"row\" fxFlex fxLayoutAlign=\"start center\">\n    <div><ng-template #mimeFooterBefore></ng-template></div>\n    <div fxFlex=\"250px\" fxFlex.lt-md=\"100%\" *ngIf=\"searchResult.size() > 0\">\n      <mime-content-search-navigator\n        *ngIf=\"showContentSearchNavigator\"\n        [searchResult]=\"searchResult\"\n      ></mime-content-search-navigator>\n    </div>\n    <div fxFlex [hidden]=\"!showPageNavigator\">\n      <mime-page-navigator [searchResult]=\"searchResult\"></mime-page-navigator>\n    </div>\n  </div>\n  <div><ng-template #mimeFooterAfter></ng-template></div>\n</mat-toolbar>\n", styles: [":host{display:block;width:100%;-webkit-user-select:none;user-select:none}.footer-toolbar{padding:0}[hidden]{display:none}\n"] }]
    }], function () { return [{ type: i1.IiifContentSearchService }, { type: i2.MediaObserver }, { type: i0.ChangeDetectorRef }]; }, { mimeFooterBefore: [{
            type: ViewChild,
            args: ['mimeFooterBefore', { read: ViewContainerRef, static: true }]
        }], mimeFooterAfter: [{
            type: ViewChild,
            args: ['mimeFooterAfter', { read: ViewContainerRef, static: true }]
        }], footerState: [{
            type: HostBinding,
            args: ['@footerState']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWZvb3Rlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1mb290ZXIvdmlld2VyLWZvb3Rlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1mb290ZXIvdmlld2VyLWZvb3Rlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFdBQVcsRUFHWCxTQUFTLEVBQ1QsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzRUFBc0UsQ0FBQztBQUNoSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7Ozs7Ozs7Ozs7SUNoQjNELG1EQUdpQzs7O0lBRC9CLGtEQUE2Qjs7O0lBSGpDLDhCQUF3RTtJQUN0RSxnSUFHaUM7SUFDbkMsaUJBQU07OztJQUhELGVBQWdDO0lBQWhDLHdEQUFnQzs7O0FEOEN6QyxNQUFNLE9BQU8scUJBQXFCO0lBWWhDLFlBQ1Usd0JBQWtELEVBQ25ELGFBQTRCLEVBQzNCLGlCQUFvQztRQUZwQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ25ELGtCQUFhLEdB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bEI7b0JBQ1YsT0FBTyxDQUFDLGFBQWEsRUFBRTt3QkFDckIsS0FBSyxDQUNILE1BQU0sRUFDTixLQUFLLENBQUM7NEJBQ0osU0FBUyxFQUFFLG9CQUFvQjt5QkFDaEMsQ0FBQyxDQUNIO3dCQUNELEtBQUssQ0FDSCxNQUFNLEVBQ04sS0FBSyxDQUFDOzRCQUNKLFNBQVMsRUFBRSxpQkFBaUI7eUJBQzdCLENBQUMsQ0FDSDt3QkFDRCxVQUFVLENBQ1IsY0FBYyxFQUNkLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxDQUNyRTt3QkFDRCxVQUFVLENBQ1IsY0FBYyxFQUNkLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLG1CQUFtQixHQUFHLGFBQWEsQ0FBQyxDQUN2RTtxQkFDRixDQUFDO2lCQUNIO3VJQUlELGdCQUFnQjtrQkFEZixTQUFTO21CQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFHdkUsZUFBZTtrQkFEZCxTQUFTO21CQUFDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFnQmxFLFdBQVc7a0JBRGQsV0FBVzttQkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1lZGlhQ2hhbmdlLCBNZWRpYU9ic2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBWaWV3ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvdmlld2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb3JlL2lpaWYtY29udGVudC1zZWFyY2gtc2VydmljZS9paWlmLWNvbnRlbnQtc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi8uLi9jb3JlL21vZGVscy9zZWFyY2gtcmVzdWx0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS12aWV3ZXItZm9vdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ZpZXdlci1mb290ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi92aWV3ZXItZm9vdGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdmb290ZXJTdGF0ZScsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnaGlkZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwgMTAwJSknLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAnc2hvdycsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwgMCknLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdoaWRlID0+IHNob3cnLFxuICAgICAgICBhbmltYXRlKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMudG9vbGJhcnNFYXNlSW5UaW1lICsgJ21zIGVhc2UtaW4nKVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdzaG93ID0+IGhpZGUnLFxuICAgICAgICBhbmltYXRlKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMudG9vbGJhcnNFYXNlT3V0VGltZSArICdtcyBlYXNlLW91dCcpXG4gICAgICApLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBWaWV3ZXJGb290ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ21pbWVGb290ZXJCZWZvcmUnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBtaW1lRm9vdGVyQmVmb3JlITogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnbWltZUZvb3RlckFmdGVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgbWltZUZvb3RlckFmdGVyITogVmlld0NvbnRhaW5lclJlZjtcbiAgcHVibGljIHN0YXRlID0gJ2hpZGUnO1xuICBwdWJsaWMgc2hvd05hdmlnYXRpb25Ub29sYmFyID0gdHJ1ZTtcbiAgcHVibGljIHNlYXJjaFJlc3VsdDogU2VhcmNoUmVzdWx0ID0gbmV3IFNlYXJjaFJlc3VsdCgpO1xuICBwdWJsaWMgc2hvd1BhZ2VOYXZpZ2F0b3IgPSB0cnVlO1xuICBwdWJsaWMgc2hvd0NvbnRlbnRTZWFyY2hOYXZpZ2F0b3IgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlOiBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UsXG4gICAgcHVibGljIG1lZGlhT2JzZXJ2ZXI6IE1lZGlhT2JzZXJ2ZXIsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIEBIb3N0QmluZGluZygnQGZvb3RlclN0YXRlJylcbiAgZ2V0IGZvb3RlclN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZSgoc3I6IFNlYXJjaFJlc3VsdCkgPT4ge1xuICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdCA9IHNyO1xuICAgICAgICB0aGlzLnNob3dDb250ZW50U2VhcmNoTmF2aWdhdG9yID0gdGhpcy5zZWFyY2hSZXN1bHQuc2l6ZSgpID4gMDtcbiAgICAgICAgdGhpcy5zaG93UGFnZU5hdmlnYXRvciA9XG4gICAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHQuc2l6ZSgpID09PSAwIHx8ICF0aGlzLmlzTW9iaWxlKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMubWVkaWFPYnNlcnZlci5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKGNoYW5nZXM6IE1lZGlhQ2hhbmdlW10pID0+IHtcbiAgICAgICAgdGhpcy5zaG93UGFnZU5hdmlnYXRvciA9XG4gICAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHQuc2l6ZSgpID09PSAwIHx8ICF0aGlzLmlzTW9iaWxlKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIGlzTW9iaWxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1lZGlhT2JzZXJ2ZXIuaXNBY3RpdmUoJ2x0LW1kJyk7XG4gIH1cbn1cbiIsIjxtYXQtdG9vbGJhciBjbGFzcz1cImZvb3Rlci10b29sYmFyXCI+XG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeEZsZXggZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgIDxkaXY+PG5nLXRlbXBsYXRlICNtaW1lRm9vdGVyQmVmb3JlPjwvbmctdGVtcGxhdGU+PC9kaXY+XG4gICAgPGRpdiBmeEZsZXg9XCIyNTBweFwiIGZ4RmxleC5sdC1tZD1cIjEwMCVcIiAqbmdJZj1cInNlYXJjaFJlc3VsdC5zaXplKCkgPiAwXCI+XG4gICAgICA8bWltZS1jb250ZW50LXNlYXJjaC1uYXZpZ2F0b3JcbiAgICAgICAgKm5nSWY9XCJzaG93Q29udGVudFNlYXJjaE5hdmlnYXRvclwiXG4gICAgICAgIFtzZWFyY2hSZXN1bHRdPVwic2VhcmNoUmVzdWx0XCJcbiAgICAgID48L21pbWUtY29udGVudC1zZWFyY2gtbmF2aWdhdG9yPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgZnhGbGV4IFtoaWRkZW5dPVwiIXNob3dQYWdlTmF2aWdhdG9yXCI+XG4gICAgICA8bWltZS1wYWdlLW5hdmlnYXRvciBbc2VhcmNoUmVzdWx0XT1cInNlYXJjaFJlc3VsdFwiPjwvbWltZS1wYWdlLW5hdmlnYXRvcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXY+PG5nLXRlbXBsYXRlICNtaW1lRm9vdGVyQWZ0ZXI+PC9uZy10ZW1wbGF0ZT48L2Rpdj5cbjwvbWF0LXRvb2xiYXI+XG4iXX0=