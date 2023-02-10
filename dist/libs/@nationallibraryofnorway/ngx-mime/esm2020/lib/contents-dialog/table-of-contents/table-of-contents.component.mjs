import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, } from '@angular/core';
import { Subscription } from 'rxjs';
import { CanvasService } from '../../core/canvas-service/canvas-service';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../core/intl';
import { ViewerService } from '../../core/viewer-service/viewer.service';
import * as i0 from "@angular/core";
import * as i1 from "../../core/intl";
import * as i2 from "../../core/iiif-manifest-service/iiif-manifest-service";
import * as i3 from "../../core/viewer-service/viewer.service";
import * as i4 from "../../core/canvas-service/canvas-service";
import * as i5 from "@angular/common";
import * as i6 from "@angular/flex-layout/flex";
function TocComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "a", 2);
    i0.ɵɵlistener("click", function TocComponent_div_1_Template_a_click_1_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r3); const structure_r1 = restoredCtx.$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToCanvas($event, structure_r1.canvasIndex)); });
    i0.ɵɵelementStart(2, "span", 3);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 4);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const structure_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("currentCanvasGroup", ctx_r0.currentCanvasGroupIndex === structure_r1.canvasIndex);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(structure_r1.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(structure_r1.canvasIndex + 1);
} }
export class TocComponent {
    constructor(intl, changeDetectorRef, iiifManifestService, viewerService, canvasService) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.iiifManifestService = iiifManifestService;
        this.viewerService = viewerService;
        this.canvasService = canvasService;
        this.canvasChanged = new EventEmitter();
        this.manifest = null;
        this.currentCanvasGroupIndex = 0;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
            this.currentCanvasGroupIndex =
                this.canvasService.currentCanvasGroupIndex;
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.viewerService.onCanvasGroupIndexChange.subscribe((canvasGroupIndex) => {
            this.currentCanvasGroupIndex = canvasGroupIndex;
            this.changeDetectorRef.detectChanges();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    goToCanvas(event, canvasIndex) {
        if (canvasIndex !== undefined) {
            event.preventDefault();
            this.viewerService.goToCanvas(canvasIndex, false);
            this.canvasChanged.emit(canvasIndex);
        }
    }
}
TocComponent.ɵfac = function TocComponent_Factory(t) { return new (t || TocComponent)(i0.ɵɵdirectiveInject(i1.MimeViewerIntl), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.IiifManifestService), i0.ɵɵdirectiveInject(i3.ViewerService), i0.ɵɵdirectiveInject(i4.CanvasService)); };
TocComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TocComponent, selectors: [["mime-toc"]], outputs: { canvasChanged: "canvasChanged" }, decls: 2, vars: 1, consts: [[1, "ngx-mime-toc-container"], [4, "ngFor", "ngForOf"], ["href", "", "fxLayout", "row", "fxLayoutAlign", "space-between center", 1, "toc-link", 3, "click"], [1, "label"], [1, "canvasGroupIndex"]], template: function TocComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, TocComponent_div_1_Template, 6, 4, "div", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.manifest == null ? null : ctx.manifest.structures);
    } }, dependencies: [i5.NgForOf, i6.DefaultLayoutDirective, i6.DefaultLayoutAlignDirective], styles: [".toc-link[_ngcontent-%COMP%]{text-decoration:none;font-size:14px!important;font-weight:400;margin-bottom:8px}.currentCanvasGroup[_ngcontent-%COMP%]{font-weight:700}"], changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TocComponent, [{
        type: Component,
        args: [{ selector: 'mime-toc', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ngx-mime-toc-container\">\n  <div *ngFor=\"let structure of manifest?.structures\">\n    <a\n      href=\"\"\n      class=\"toc-link\"\n      [class.currentCanvasGroup]=\"\n        currentCanvasGroupIndex === structure.canvasIndex\n      \"\n      (click)=\"goToCanvas($event, structure.canvasIndex)\"\n      fxLayout=\"row\"\n      fxLayoutAlign=\"space-between center\"\n    >\n      <span class=\"label\">{{ structure.label }}</span>\n      <span class=\"canvasGroupIndex\">{{ structure.canvasIndex + 1 }}</span>\n    </a>\n  </div>\n</div>\n", styles: [".toc-link{text-decoration:none;font-size:14px!important;font-weight:400;margin-bottom:8px}.currentCanvasGroup{font-weight:700}\n"] }]
    }], function () { return [{ type: i1.MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: i2.IiifManifestService }, { type: i3.ViewerService }, { type: i4.CanvasService }]; }, { canvasChanged: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtb2YtY29udGVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvbnRlbnRzLWRpYWxvZy90YWJsZS1vZi1jb250ZW50cy90YWJsZS1vZi1jb250ZW50cy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29udGVudHMtZGlhbG9nL3RhYmxlLW9mLWNvbnRlbnRzL3RhYmxlLW9mLWNvbnRlbnRzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBR1osTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQzdGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMENBQTBDLENBQUM7Ozs7Ozs7Ozs7SUNidkUsMkJBQW9ELFdBQUE7SUFPaEQsME5BQVMsZUFBQSxtREFBeUMsQ0FBQSxJQUFDO0lBSW5ELCtCQUFvQjtJQUFBLFlBQXFCO0lBQUEsaUJBQU87SUFDaEQsK0JBQStCO0lBQUEsWUFBK0I7SUFBQSxpQkFBTyxFQUFBLEVBQUE7Ozs7SUFSckUsZUFFQztJQUZELGlHQUVDO0lBS21CLGVBQXFCO0lBQXJCLHdDQUFxQjtJQUNWLGVBQStCO0lBQS9CLGtEQUErQjs7QURTcEUsTUFBTSxPQUFPLFlBQVk7SUFPdkIsWUFDUyxJQUFvQixFQUNuQixpQkFBb0MsRUFDcEMsbUJBQXdDLEVBQ3hDLGFBQTRCLEVBQzVCLGFBQTRCO1FBSjdCLFNBQUksR0FBSixJQUFJLENBQWdCO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQVZ0QyxrQkFBYSxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xELGFBQVEsR0FBb0IsSUFBSSxDQUFDO1FBQ2pDLDRCQUF1QixHQUFHLENBQUMsQ0FBQztRQUMzQixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFReEMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQ2hELENBQUMsUUFBeUIsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyx1QkFBdUI7Z0JBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUM7WUFDN0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pDLENBQUMsQ0FDRixDQUNGLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQ25ELENBQUMsZ0JBQXdCLEVBQUUsRUFBRTtZQUMzQixJQUFJLENBQUMsdUJBQXVCLEdBQUcsZ0JBQWdCLENBQUM7WUFDaEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pDLENBQUMsQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFZLEVBQUUsV0FBK0I7UUFDdEQsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO1lBQzdCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDOzt3RUEvQ1UsWUFBWTsrREFBWixZQUFZO1FDdEJ6Qiw4QkFBb0M7UUFDbEMsNkRBY007UUFDUixpQkFBTTs7UUFmdUIsZUFBdUI7UUFBdkIsK0VBQXVCOzt1RkRxQnZDLFlBQVk7Y0FOeEIsU0FBUzsyQkFDRSxVQUFVLG1CQUdILHVCQUF1QixDQUFDLE1BQU07MkxBSS9DLGFBQWE7a0JBRFosTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vLi4vY29yZS9pbnRsJztcbmltcG9ydCB7IE1hbmlmZXN0IH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgVmlld2VyU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvdmlld2VyLXNlcnZpY2Uvdmlld2VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtaW1lLXRvYycsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS1vZi1jb250ZW50cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLW9mLWNvbnRlbnRzLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBUb2NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoKVxuICBjYW52YXNDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIG1hbmlmZXN0OiBNYW5pZmVzdCB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgY3VycmVudENhbnZhc0dyb3VwSW5kZXggPSAwO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgaWlpZk1hbmlmZXN0U2VydmljZTogSWlpZk1hbmlmZXN0U2VydmljZSxcbiAgICBwcml2YXRlIHZpZXdlclNlcnZpY2U6IFZpZXdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5tYW5pZmVzdCA9IG1hbmlmZXN0O1xuICAgICAgICAgIHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXggPVxuICAgICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4O1xuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnZpZXdlclNlcnZpY2Uub25DYW52YXNHcm91cEluZGV4Q2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKGNhbnZhc0dyb3VwSW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXggPSBjYW52YXNHcm91cEluZGV4O1xuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgZ29Ub0NhbnZhcyhldmVudDogRXZlbnQsIGNhbnZhc0luZGV4OiBudW1iZXIgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAoY2FudmFzSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvQ2FudmFzKGNhbnZhc0luZGV4LCBmYWxzZSk7XG4gICAgICB0aGlzLmNhbnZhc0NoYW5nZWQuZW1pdChjYW52YXNJbmRleCk7XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibmd4LW1pbWUtdG9jLWNvbnRhaW5lclwiPlxuICA8ZGl2ICpuZ0Zvcj1cImxldCBzdHJ1Y3R1cmUgb2YgbWFuaWZlc3Q/LnN0cnVjdHVyZXNcIj5cbiAgICA8YVxuICAgICAgaHJlZj1cIlwiXG4gICAgICBjbGFzcz1cInRvYy1saW5rXCJcbiAgICAgIFtjbGFzcy5jdXJyZW50Q2FudmFzR3JvdXBdPVwiXG4gICAgICAgIGN1cnJlbnRDYW52YXNHcm91cEluZGV4ID09PSBzdHJ1Y3R1cmUuY2FudmFzSW5kZXhcbiAgICAgIFwiXG4gICAgICAoY2xpY2spPVwiZ29Ub0NhbnZhcygkZXZlbnQsIHN0cnVjdHVyZS5jYW52YXNJbmRleClcIlxuICAgICAgZnhMYXlvdXQ9XCJyb3dcIlxuICAgICAgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCJcbiAgICA+XG4gICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+e3sgc3RydWN0dXJlLmxhYmVsIH19PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjYW52YXNHcm91cEluZGV4XCI+e3sgc3RydWN0dXJlLmNhbnZhc0luZGV4ICsgMSB9fTwvc3Bhbj5cbiAgICA8L2E+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=