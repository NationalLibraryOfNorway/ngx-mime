import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { AltoService } from '../../core/alto-service/alto.service';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { HighlightService } from '../../core/highlight-service/highlight.service';
import { MimeViewerIntl } from '../../core/intl';
import * as i0 from "@angular/core";
import * as i1 from "../../core/intl";
import * as i2 from "../../core/canvas-service/canvas-service";
import * as i3 from "../../core/alto-service/alto.service";
import * as i4 from "../../core/iiif-manifest-service/iiif-manifest-service";
import * as i5 from "../../core/iiif-content-search-service/iiif-content-search.service";
import * as i6 from "../../core/highlight-service/highlight.service";
import * as i7 from "@angular/common";
import * as i8 from "@angular/flex-layout/flex";
const _c0 = ["recognizedTextContentContainer"];
function RecognizedTextContentComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r1.error);
} }
function RecognizedTextContentComponent_ng_container_3_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 7);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r3.firstCanvasRecognizedTextContent, i0.ɵɵsanitizeHtml);
} }
function RecognizedTextContentComponent_ng_container_3_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 8);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r4.secondCanvasRecognizedTextContent, i0.ɵɵsanitizeHtml);
} }
function RecognizedTextContentComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, RecognizedTextContentComponent_ng_container_3_div_1_Template, 1, 1, "div", 5);
    i0.ɵɵtemplate(2, RecognizedTextContentComponent_ng_container_3_div_2_Template, 1, 1, "div", 6);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.firstCanvasRecognizedTextContent);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.secondCanvasRecognizedTextContent);
} }
export class RecognizedTextContentComponent {
    constructor(intl, cdr, canvasService, altoService, iiifManifestService, iiifContentSearchService, highlightService) {
        this.intl = intl;
        this.cdr = cdr;
        this.canvasService = canvasService;
        this.altoService = altoService;
        this.iiifManifestService = iiifManifestService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.highlightService = highlightService;
        this.isLoading = false;
        this.error = undefined;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((sr) => {
            this.altoService.initialize(sr.hits);
        }));
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe(() => {
            this.clearRecognizedText();
            this.cdr.detectChanges();
        }));
        this.subscriptions.add(this.iiifContentSearchService.onSelected.subscribe((hit) => {
            if (hit) {
                this.selectedHit = hit.id;
                this.highlightService.highlightSelectedHit(this.selectedHit);
            }
        }));
        this.subscriptions.add(this.altoService.onTextContentReady$.subscribe(async () => {
            this.clearRecognizedText();
            this.scrollToTop();
            await this.updateRecognizedText();
            this.cdr.detectChanges();
        }));
        this.subscriptions.add(this.altoService.isLoading$.subscribe((isLoading) => {
            this.isLoading = isLoading;
            this.cdr.detectChanges();
        }));
        this.subscriptions.add(this.altoService.hasErrors$.subscribe((error) => {
            this.error = error;
            this.cdr.detectChanges();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.altoService.destroy();
    }
    clearRecognizedText() {
        this.firstCanvasRecognizedTextContent = '';
        this.secondCanvasRecognizedTextContent = '';
    }
    scrollToTop() {
        this.recognizedTextContentContainer.nativeElement.scrollTop = 0;
    }
    async updateRecognizedText() {
        const canvases = this.canvasService.getCanvasesPerCanvasGroup(this.canvasService.currentCanvasGroupIndex);
        await this.updateCanvases(canvases);
        if (this.selectedHit !== undefined) {
            this.highlightService.highlightSelectedHit(this.selectedHit);
        }
    }
    async updateCanvases(canvases) {
        this.firstCanvasRecognizedTextContent = this.altoService.getHtml(canvases[0]);
        if (canvases.length === 2) {
            this.secondCanvasRecognizedTextContent = this.altoService.getHtml(canvases[1]);
        }
    }
}
RecognizedTextContentComponent.ɵfac = function RecognizedTextContentComponent_Factory(t) { return new (t || RecognizedTextContentComponent)(i0.ɵɵdirectiveInject(i1.MimeViewerIntl), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.CanvasService), i0.ɵɵdirectiveInject(i3.AltoService), i0.ɵɵdirectiveInject(i4.IiifManifestService), i0.ɵɵdirectiveInject(i5.IiifContentSearchService), i0.ɵɵdirectiveInject(i6.HighlightService)); };
RecognizedTextContentComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RecognizedTextContentComponent, selectors: [["mime-recognized-text-content"]], viewQuery: function RecognizedTextContentComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5, ElementRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.recognizedTextContentContainer = _t.first);
    } }, decls: 4, vars: 2, consts: [["aria-live", "polite", "fxLayout", "column", "fxLayoutAlign", "start center", 1, "recognized-text-content-container"], ["recognizedTextContentContainer", ""], ["data-test-id", "error", 4, "ngIf"], [4, "ngIf"], ["data-test-id", "error"], ["class", "content", "data-test-id", "firstCanvasRecognizedTextContent", 3, "innerHTML", 4, "ngIf"], ["class", "content", "data-test-id", "secondCanvasRecognizedTextContent", 3, "innerHTML", 4, "ngIf"], ["data-test-id", "firstCanvasRecognizedTextContent", 1, "content", 3, "innerHTML"], ["data-test-id", "secondCanvasRecognizedTextContent", 1, "content", 3, "innerHTML"]], template: function RecognizedTextContentComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0, 1);
        i0.ɵɵtemplate(2, RecognizedTextContentComponent_div_2_Template, 2, 1, "div", 2);
        i0.ɵɵtemplate(3, RecognizedTextContentComponent_ng_container_3_Template, 3, 2, "ng-container", 3);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.error);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading);
    } }, dependencies: [i7.NgIf, i8.DefaultLayoutDirective, i8.DefaultLayoutAlignDirective], styles: [".recognized-text-content-container[_ngcontent-%COMP%]{height:100%;overflow:auto}.recognized-text-content-container[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{padding:1em}  .selectedHit{background:rgba(255,137,0,.61);outline:2px solid rgb(97,52,0)}  mark{background:rgba(255,255,0,.61)}"], changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RecognizedTextContentComponent, [{
        type: Component,
        args: [{ selector: 'mime-recognized-text-content', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  #recognizedTextContentContainer\n  class=\"recognized-text-content-container\"\n  aria-live=\"polite\"\n  fxLayout=\"column\"\n  fxLayoutAlign=\"start center\"\n>\n  <div *ngIf=\"error\" data-test-id=\"error\">{{ error }}</div>\n  <ng-container *ngIf=\"!isLoading\">\n    <div\n      *ngIf=\"firstCanvasRecognizedTextContent\"\n      class=\"content\"\n      data-test-id=\"firstCanvasRecognizedTextContent\"\n      [innerHTML]=\"firstCanvasRecognizedTextContent\"\n    >\n    </div>\n    <div\n      *ngIf=\"secondCanvasRecognizedTextContent\"\n      class=\"content\"\n      data-test-id=\"secondCanvasRecognizedTextContent\"\n      [innerHTML]=\"secondCanvasRecognizedTextContent\"\n    >\n    </div>\n  </ng-container>\n</div>\n", styles: [".recognized-text-content-container{height:100%;overflow:auto}.recognized-text-content-container>div{padding:1em}::ng-deep .selectedHit{background:rgba(255,137,0,.61);outline:2px solid rgb(97,52,0)}::ng-deep mark{background:rgba(255,255,0,.61)}\n"] }]
    }], function () { return [{ type: i1.MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: i2.CanvasService }, { type: i3.AltoService }, { type: i4.IiifManifestService }, { type: i5.IiifContentSearchService }, { type: i6.HighlightService }]; }, { recognizedTextContentContainer: [{
            type: ViewChild,
            args: ['recognizedTextContentContainer', { read: ElementRef }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb2duaXplZC10ZXh0LWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXdlci9yZWNvZ25pemVkLXRleHQtY29udGVudC9yZWNvZ25pemVkLXRleHQtY29udGVudC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3JlY29nbml6ZWQtdGV4dC1jb250ZW50L3JlY29nbml6ZWQtdGV4dC1jb250ZW50LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBR1YsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUM3RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUM5RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUVsRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7OztJQ1YvQyw4QkFBd0M7SUFBQSxZQUFXO0lBQUEsaUJBQU07OztJQUFqQixlQUFXO0lBQVgsa0NBQVc7OztJQUVqRCx5QkFNTTs7O0lBRkosc0ZBQThDOzs7SUFHaEQseUJBTU07OztJQUZKLHVGQUErQzs7O0lBWm5ELDZCQUFpQztJQUMvQiw4RkFNTTtJQUNOLDhGQU1NO0lB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R0FlZTtRQUNqQixpQkFBTTs7UUFqQkUsZUFBVztRQUFYLGdDQUFXO1FBQ0YsZUFBZ0I7UUFBaEIscUNBQWdCOzt1RkRrQnBCLDhCQUE4QjtjQU4xQyxTQUFTOzJCQUNFLDhCQUE4QixtQkFHdkIsdUJBQXVCLENBQUMsTUFBTTsrUEFJL0MsOEJBQThCO2tCQUQ3QixTQUFTO21CQUFDLGdDQUFnQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFsdG9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9hbHRvLXNlcnZpY2UvYWx0by5zZXJ2aWNlJztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL2NhbnZhcy1zZXJ2aWNlL2NhbnZhcy1zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZNYW5pZmVzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9paWlmLWNvbnRlbnQtc2VhcmNoLXNlcnZpY2UvaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IEhpZ2hsaWdodFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL2hpZ2hsaWdodC1zZXJ2aWNlL2hpZ2hsaWdodC5zZXJ2aWNlJztcbmltcG9ydCB7IEhpdCB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL2hpdCc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4uLy4uL2NvcmUvaW50bCc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy9zZWFyY2gtcmVzdWx0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS1yZWNvZ25pemVkLXRleHQtY29udGVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZWNvZ25pemVkLXRleHQtY29udGVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3JlY29nbml6ZWQtdGV4dC1jb250ZW50LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBSZWNvZ25pemVkVGV4dENvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ3JlY29nbml6ZWRUZXh0Q29udGVudENvbnRhaW5lcicsIHsgcmVhZDogRWxlbWVudFJlZiB9KVxuICByZWNvZ25pemVkVGV4dENvbnRlbnRDb250YWluZXIhOiBFbGVtZW50UmVmO1xuICBmaXJzdENhbnZhc1JlY29nbml6ZWRUZXh0Q29udGVudDogU2FmZUh0bWwgfCB1bmRlZmluZWQ7XG4gIHNlY29uZENhbnZhc1JlY29nbml6ZWRUZXh0Q29udGVudDogU2FmZUh0bWwgfCB1bmRlZmluZWQ7XG4gIGlzTG9hZGluZyA9IGZhbHNlO1xuICBlcnJvcjogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBzZWxlY3RlZEhpdDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwcml2YXRlIGFsdG9TZXJ2aWNlOiBBbHRvU2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZNYW5pZmVzdFNlcnZpY2U6IElpaWZNYW5pZmVzdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmQ29udGVudFNlYXJjaFNlcnZpY2U6IElpaWZDb250ZW50U2VhcmNoU2VydmljZSxcbiAgICBwcml2YXRlIGhpZ2hsaWdodFNlcnZpY2U6IEhpZ2hsaWdodFNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoKHNyOiBTZWFyY2hSZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy5hbHRvU2VydmljZS5pbml0aWFsaXplKHNyLmhpdHMpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5jdXJyZW50TWFuaWZlc3Quc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclJlY29nbml6ZWRUZXh0KCk7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5vblNlbGVjdGVkLnN1YnNjcmliZSgoaGl0OiBIaXQgfCBudWxsKSA9PiB7XG4gICAgICAgIGlmIChoaXQpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSGl0ID0gaGl0LmlkO1xuICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0U2VydmljZS5oaWdobGlnaHRTZWxlY3RlZEhpdCh0aGlzLnNlbGVjdGVkSGl0KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuYWx0b1NlcnZpY2Uub25UZXh0Q29udGVudFJlYWR5JC5zdWJzY3JpYmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyUmVjb2duaXplZFRleHQoKTtcbiAgICAgICAgdGhpcy5zY3JvbGxUb1RvcCgpO1xuICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZVJlY29nbml6ZWRUZXh0KCk7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5hbHRvU2VydmljZS5pc0xvYWRpbmckLnN1YnNjcmliZSgoaXNMb2FkaW5nOiBib29sZWFuKSA9PiB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gaXNMb2FkaW5nO1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuYWx0b1NlcnZpY2UuaGFzRXJyb3JzJC5zdWJzY3JpYmUoKGVycm9yOiBzdHJpbmcgfCB1bmRlZmluZWQpID0+IHtcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmFsdG9TZXJ2aWNlLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJSZWNvZ25pemVkVGV4dCgpIHtcbiAgICB0aGlzLmZpcnN0Q2FudmFzUmVjb2duaXplZFRleHRDb250ZW50ID0gJyc7XG4gICAgdGhpcy5zZWNvbmRDYW52YXNSZWNvZ25pemVkVGV4dENvbnRlbnQgPSAnJztcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG9Ub3AoKSB7XG4gICAgdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRDb250YWluZXIubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB1cGRhdGVSZWNvZ25pemVkVGV4dCgpIHtcbiAgICBjb25zdCBjYW52YXNlcyA9IHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNlc1BlckNhbnZhc0dyb3VwKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLnVwZGF0ZUNhbnZhc2VzKGNhbnZhc2VzKTtcbiAgICBpZiAodGhpcy5zZWxlY3RlZEhpdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodFNlcnZpY2UuaGlnaGxpZ2h0U2VsZWN0ZWRIaXQodGhpcy5zZWxlY3RlZEhpdCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdXBkYXRlQ2FudmFzZXMoY2FudmFzZXM6IG51bWJlcltdKSB7XG4gICAgdGhpcy5maXJzdENhbnZhc1JlY29nbml6ZWRUZXh0Q29udGVudCA9IHRoaXMuYWx0b1NlcnZpY2UuZ2V0SHRtbChcbiAgICAgIGNhbnZhc2VzWzBdXG4gICAgKTtcblxuICAgIGlmIChjYW52YXNlcy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHRoaXMuc2Vjb25kQ2FudmFzUmVjb2duaXplZFRleHRDb250ZW50ID0gdGhpcy5hbHRvU2VydmljZS5nZXRIdG1sKFxuICAgICAgICBjYW52YXNlc1sxXVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXZcbiAgI3JlY29nbml6ZWRUZXh0Q29udGVudENvbnRhaW5lclxuICBjbGFzcz1cInJlY29nbml6ZWQtdGV4dC1jb250ZW50LWNvbnRhaW5lclwiXG4gIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gIGZ4TGF5b3V0PVwiY29sdW1uXCJcbiAgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiXG4+XG4gIDxkaXYgKm5nSWY9XCJlcnJvclwiIGRhdGEtdGVzdC1pZD1cImVycm9yXCI+e3sgZXJyb3IgfX08L2Rpdj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc0xvYWRpbmdcIj5cbiAgICA8ZGl2XG4gICAgICAqbmdJZj1cImZpcnN0Q2FudmFzUmVjb2duaXplZFRleHRDb250ZW50XCJcbiAgICAgIGNsYXNzPVwiY29udGVudFwiXG4gICAgICBkYXRhLXRlc3QtaWQ9XCJmaXJzdENhbnZhc1JlY29nbml6ZWRUZXh0Q29udGVudFwiXG4gICAgICBbaW5uZXJIVE1MXT1cImZpcnN0Q2FudmFzUmVjb2duaXplZFRleHRDb250ZW50XCJcbiAgICA+XG4gICAgPC9kaXY+XG4gICAgPGRpdlxuICAgICAgKm5nSWY9XCJzZWNvbmRDYW52YXNSZWNvZ25pemVkVGV4dENvbnRlbnRcIlxuICAgICAgY2xhc3M9XCJjb250ZW50XCJcbiAgICAgIGRhdGEtdGVzdC1pZD1cInNlY29uZENhbnZhc1JlY29nbml6ZWRUZXh0Q29udGVudFwiXG4gICAgICBbaW5uZXJIVE1MXT1cInNlY29uZENhbnZhc1JlY29nbml6ZWRUZXh0Q29udGVudFwiXG4gICAgPlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuIl19