import { ChangeDetectionStrategy, ChangeDetectorRef, Component, } from '@angular/core';
import { Subscription } from 'rxjs';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../../core/intl';
import * as i0 from "@angular/core";
import * as i1 from "./../../core/intl";
import * as i2 from "./../../core/iiif-manifest-service/iiif-manifest-service";
import * as i3 from "@angular/common";
function MetadataComponent_ng_container_0_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "div", 5);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "span", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const metadata_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(metadata_r5.label);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", metadata_r5.value, i0.ɵɵsanitizeHtml);
} }
function MetadataComponent_ng_container_0_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 5);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "span", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.intl.attributionLabel);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", ctx_r2.manifest.attribution, i0.ɵɵsanitizeHtml);
} }
function MetadataComponent_ng_container_0_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 5);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 8)(4, "a", 9);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.intl.licenseLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("href", ctx_r3.manifest.license, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r3.manifest.license);
} }
function MetadataComponent_ng_container_0_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "span");
    i0.ɵɵelement(2, "img", 11);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r4.manifest.logo, i0.ɵɵsanitizeUrl);
} }
function MetadataComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 1);
    i0.ɵɵtemplate(2, MetadataComponent_ng_container_0_div_2_Template, 4, 2, "div", 2);
    i0.ɵɵtemplate(3, MetadataComponent_ng_container_0_div_3_Template, 4, 2, "div", 0);
    i0.ɵɵtemplate(4, MetadataComponent_ng_container_0_div_4_Template, 6, 3, "div", 0);
    i0.ɵɵtemplate(5, MetadataComponent_ng_container_0_div_5_Template, 3, 1, "div", 3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.manifest.metadata);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.manifest.attribution);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.manifest.license);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.manifest.logo);
} }
export class MetadataComponent {
    constructor(intl, changeDetectorRef, iiifManifestService) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.iiifManifestService = iiifManifestService;
        this.manifest = null;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
            this.changeDetectorRef.markForCheck();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
MetadataComponent.ɵfac = function MetadataComponent_Factory(t) { return new (t || MetadataComponent)(i0.ɵɵdirectiveInject(i1.MimeViewerIntl), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.IiifManifestService)); };
MetadataComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MetadataComponent, selectors: [["mime-metadata"]], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "ngx-mime-metadata-container"], ["class", "metadata", 4, "ngFor", "ngForOf"], ["aria-hidden", "true", 4, "ngIf"], [1, "metadata"], [1, "title"], [1, "content", 3, "innerHTML"], [1, "content", "attribution", 3, "innerHTML"], [1, "content", "license"], ["target", "_blank", 3, "href"], ["aria-hidden", "true"], [1, "content", "logo", 3, "src"]], template: function MetadataComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, MetadataComponent_ng_container_0_Template, 6, 4, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.manifest);
    } }, dependencies: [i3.NgForOf, i3.NgIf], styles: [".title[_ngcontent-%COMP%]{font-size:14px!important;font-weight:400;margin-bottom:4px}.content[_ngcontent-%COMP%]{display:block;font-size:12px;word-break:break-all;margin-bottom:8px}.logo[_ngcontent-%COMP%]{max-width:300px;max-height:64px}"], changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MetadataComponent, [{
        type: Component,
        args: [{ selector: 'mime-metadata', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"manifest\">\n  <div class=\"ngx-mime-metadata-container\">\n    <div *ngFor=\"let metadata of manifest.metadata\" class=\"metadata\">\n      <div class=\"title\">{{ metadata.label }}</div>\n      <span class=\"content\" [innerHTML]=\"metadata.value\"></span>\n    </div>\n    <div *ngIf=\"manifest.attribution\">\n      <div class=\"title\">{{ intl.attributionLabel }}</div>\n      <span\n        class=\"content attribution\"\n        [innerHTML]=\"manifest.attribution\"\n      ></span>\n    </div>\n    <div *ngIf=\"manifest.license\">\n      <div class=\"title\">{{ intl.licenseLabel }}</div>\n      <span class=\"content license\"\n        ><a [href]=\"manifest.license\" target=\"_blank\">{{\n          manifest.license\n        }}</a></span\n      >\n    </div>\n    <div *ngIf=\"manifest.logo\" aria-hidden=\"true\">\n      <span><img class=\"content logo\" [src]=\"manifest.logo\" /></span>\n    </div>\n  </div>\n</ng-container>\n", styles: [".title{font-size:14px!important;font-weight:400;margin-bottom:4px}.content{display:block;font-size:12px;word-break:break-all;margin-bottom:8px}.logo{max-width:300px;max-height:64px}\n"] }]
    }], function () { return [{ type: i1.MimeViewerIntl }, { type: i0.ChangeDetectorRef }, { type: i2.IiifManifestService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvbnRlbnRzLWRpYWxvZy9tZXRhZGF0YS9tZXRhZGF0YS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29udGVudHMtZGlhbG9nL21ldGFkYXRhL21ldGFkYXRhLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsR0FHVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7O0lDUC9DLDhCQUFpRSxhQUFBO0lBQzVDLFlBQW9CO0lBQUEsaUJBQU07SUFDN0MsMEJBQTBEO0lBQzVELGlCQUFNOzs7SUFGZSxlQUFvQjtJQUFwQix1Q0FBb0I7SUFDakIsZUFBNEI7SUFBNUIsZ0VBQTRCOzs7SUFFcEQsMkJBQWtDLGFBQUE7SUFDYixZQUEyQjtJQUFBLGlCQUFNO0lBQ3BELDBCQUdRO0lBQ1YsaUJBQU07OztJQUxlLGVBQTJCO0lBQTNCLGtEQUEyQjtJQUc1QyxlQUFrQztJQUFsQywwRUFBa0M7OztJQUd0QywyQkFBOEIsYUFBQTtJQUNULFlBQXVCO0lBQUEsaUJBQU07SUFDaEQsK0JBQ0csV0FBQTtJQUE2QyxZQUU1QztJQUFBLGlCQUFJLEVBQUEsRUFBQTs7O0lBSlcsZUFBdUI7SUFBdkIsOENBQXVCO0lBRXBDLGVBQXlCO0lBQXpCLGdFQUF5QjtJQUFpQixlQUU1QztJQUY0Qyw2Q0FFNUM7OztJQUdOLCtCQUE4QyxXQUFBO0lBQ3RDLDBCQUFrRDtJQUFBLGlCQUFPLEVBQUE7OztJQUEvQixlQUFxQjtJQUFyQiw0REFBcUI7OztJQXRCM0QsNkJBQStCO0lBQzdCLDhCQUF5QztJQUN2QyxpRkFHTTtJQUNOLGlGQU1NO0lBQ04saUZBT007SUFDTixpRkFFTTtJQUNSLGlCQUFNO0lBQ1IsMEJBQWU7OztJQXZCZSxlQUFvQjtJQUFwQixrREFBb0I7SUFJeEMsZUFBMEI7SUFBMUIsa0RBQTBCO0lBTzFCLGVBQXNCO0lBQXRCLDhDQUFzQjtJQVF0QixlQUFtQjtJQUFuQiwyQ0FBbUI7O0FESDdCLE1BQU0sT0FBTyxpQkFBaUI7SUFJNUIsWUFDUyxJQUFvQixFQUNuQixpQkFBb0MsRUFDcEMsbUJBQXdDO1FBRnpDLFNBQUksR0FBSixJQUFJLENBQWdCO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQU4zQyxhQUFRLEdBQW9CLElBQUksQ0FBQztRQUNoQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFNeEMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQ2hELENBQUMsUUFBeUIsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QyxDQUFDLENBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7O2tGQXZCVSxpQkFBaUI7b0VBQWpCLGlCQUFpQjtRQ2xCOUIsb0ZBeUJlOztRQXpCQSxtQ0FBYzs7dUZEa0JoQixpQkFBaUI7Y0FON0IsU0FBUzsyQkFDRSxlQUFlLG1CQUdSLHVCQUF1QixDQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLy4uLy4uL2NvcmUvaW50bCc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4vLi4vLi4vY29yZS9tb2RlbHMvbWFuaWZlc3QnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtaW1lLW1ldGFkYXRhJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21ldGFkYXRhLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWV0YWRhdGEuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1ldGFkYXRhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwdWJsaWMgbWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBpaWlmTWFuaWZlc3RTZXJ2aWNlOiBJaWlmTWFuaWZlc3RTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5tYW5pZmVzdCA9IG1hbmlmZXN0O1xuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJtYW5pZmVzdFwiPlxuICA8ZGl2IGNsYXNzPVwibmd4LW1pbWUtbWV0YWRhdGEtY29udGFpbmVyXCI+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgbWV0YWRhdGEgb2YgbWFuaWZlc3QubWV0YWRhdGFcIiBjbGFzcz1cIm1ldGFkYXRhXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57eyBtZXRhZGF0YS5sYWJlbCB9fTwvZGl2PlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb250ZW50XCIgW2lubmVySFRNTF09XCJtZXRhZGF0YS52YWx1ZVwiPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwibWFuaWZlc3QuYXR0cmlidXRpb25cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPnt7IGludGwuYXR0cmlidXRpb25MYWJlbCB9fTwvZGl2PlxuICAgICAgPHNwYW5cbiAgICAgICAgY2xhc3M9XCJjb250ZW50IGF0dHJpYnV0aW9uXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJtYW5pZmVzdC5hdHRyaWJ1dGlvblwiXG4gICAgICA+PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJtYW5pZmVzdC5saWNlbnNlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57eyBpbnRsLmxpY2Vuc2VMYWJlbCB9fTwvZGl2PlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb250ZW50IGxpY2Vuc2VcIlxuICAgICAgICA+PGEgW2hyZWZdPVwibWFuaWZlc3QubGljZW5zZVwiIHRhcmdldD1cIl9ibGFua1wiPnt7XG4gICAgICAgICAgbWFuaWZlc3QubGljZW5zZVxuICAgICAgICB9fTwvYT48L3NwYW5cbiAgICAgID5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwibWFuaWZlc3QubG9nb1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgPHNwYW4+PGltZyBjbGFzcz1cImNvbnRlbnQgbG9nb1wiIFtzcmNdPVwibWFuaWZlc3QubG9nb1wiIC8+PC9zcGFuPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuIl19