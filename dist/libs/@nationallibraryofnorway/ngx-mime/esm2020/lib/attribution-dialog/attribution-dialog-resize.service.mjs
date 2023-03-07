import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MimeDomHelper } from './../core/mime-dom-helper';
import { Dimensions } from './../core/models/dimensions';
import * as i0 from "@angular/core";
import * as i1 from "./../core/mime-dom-helper";
export class AttributionDialogResizeService {
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
        this._el = null;
        this.resizeSubject = new ReplaySubject();
        this.dimensions = new Dimensions();
    }
    set el(el) {
        this._el = el;
    }
    get el() {
        return this._el;
    }
    get onResize() {
        return this.resizeSubject.asObservable();
    }
    markForCheck() {
        if (this.el) {
            const dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
            if (this.dimensions.bottom !== dimensions.bottom ||
                this.dimensions.height !== dimensions.height ||
                this.dimensions.left !== dimensions.left ||
                this.dimensions.right !== dimensions.right ||
                this.dimensions.top !== dimensions.top ||
                this.dimensions.width !== dimensions.width) {
                this.dimensions = dimensions;
                this.resizeSubject.next({ ...this.dimensions });
            }
        }
    }
}
AttributionDialogResizeService.ɵfac = function AttributionDialogResizeService_Factory(t) { return new (t || AttributionDialogResizeService)(i0.ɵɵinject(i1.MimeDomHelper)); };
AttributionDialogResizeService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AttributionDialogResizeService, factory: AttributionDialogResizeService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AttributionDialogResizeService, [{
        type: Injectable
    }], function () { return [{ type: i1.MimeDomHelper }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRpb24tZGlhbG9nLXJlc2l6ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2F0dHJpYnV0aW9uLWRpYWxvZy9hdHRyaWJ1dGlvbi1kaWFsb2ctcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQWMsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7OztBQUd6RCxNQUFNLE9BQU8sOEJBQThCO0lBS3pDLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBSnhDLFFBQUcsR0FBc0IsSUFBSSxDQUFDO1FBQzlCLGtCQUFhLEdBQThCLElBQUksYUFBYSxFQUFFLENBQUM7UUFDL0QsZUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7SUFFYSxDQUFDO0lBRXBELElBQUksRUFBRSxDQUFDLEVBQXFCO1FBQzFCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNYLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLElBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLE1BQU07Z0JBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxNQUFNO2dCQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsSUFBSTtnQkFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDLEtBQUs7Z0JBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLFVBQVUsQ0FBQyxHQUFHO2dCQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsS0FBSyxFQUMxQztnQkFDQSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2FBQ2pEO1NBQ0Y7SUFDSCxDQUFDOzs0R0FsQ1UsOEJBQThCO29GQUE5Qiw4QkFBOEIsV0FBOUIsOEJBQThCO3VGQUE5Qiw4QkFBOEI7Y0FEMUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4vLi4vY29yZS9taW1lLWRvbS1oZWxwZXInO1xuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4vLi4vY29yZS9tb2RlbHMvZGltZW5zaW9ucyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGlvbkRpYWxvZ1Jlc2l6ZVNlcnZpY2Uge1xuICBwcml2YXRlIF9lbDogRWxlbWVudFJlZiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHJlc2l6ZVN1YmplY3Q6IFJlcGxheVN1YmplY3Q8RGltZW5zaW9ucz4gPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xuICBwcml2YXRlIGRpbWVuc2lvbnMgPSBuZXcgRGltZW5zaW9ucygpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlcikge31cblxuICBzZXQgZWwoZWw6IEVsZW1lbnRSZWYgfCBudWxsKSB7XG4gICAgdGhpcy5fZWwgPSBlbDtcbiAgfVxuXG4gIGdldCBlbCgpOiBFbGVtZW50UmVmIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2VsO1xuICB9XG5cbiAgZ2V0IG9uUmVzaXplKCk6IE9ic2VydmFibGU8RGltZW5zaW9ucz4ge1xuICAgIHJldHVybiB0aGlzLnJlc2l6ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBtYXJrRm9yQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMuZWwpIHtcbiAgICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLm1pbWVEb21IZWxwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KHRoaXMuZWwpO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmRpbWVuc2lvbnMuYm90dG9tICE9PSBkaW1lbnNpb25zLmJvdHRvbSB8fFxuICAgICAgICB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0ICE9PSBkaW1lbnNpb25zLmhlaWdodCB8fFxuICAgICAgICB0aGlzLmRpbWVuc2lvbnMubGVmdCAhPT0gZGltZW5zaW9ucy5sZWZ0IHx8XG4gICAgICAgIHRoaXMuZGltZW5zaW9ucy5yaWdodCAhPT0gZGltZW5zaW9ucy5yaWdodCB8fFxuICAgICAgICB0aGlzLmRpbWVuc2lvbnMudG9wICE9PSBkaW1lbnNpb25zLnRvcCB8fFxuICAgICAgICB0aGlzLmRpbWVuc2lvbnMud2lkdGggIT09IGRpbWVuc2lvbnMud2lkdGhcbiAgICAgICkge1xuICAgICAgICB0aGlzLmRpbWVuc2lvbnMgPSBkaW1lbnNpb25zO1xuICAgICAgICB0aGlzLnJlc2l6ZVN1YmplY3QubmV4dCh7IC4uLnRoaXMuZGltZW5zaW9ucyB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==