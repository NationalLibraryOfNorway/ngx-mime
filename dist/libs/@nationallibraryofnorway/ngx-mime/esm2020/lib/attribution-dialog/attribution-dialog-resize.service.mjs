import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
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
AttributionDialogResizeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: AttributionDialogResizeService, deps: [{ token: i1.MimeDomHelper }], target: i0.ɵɵFactoryTarget.Injectable });
AttributionDialogResizeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: AttributionDialogResizeService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: AttributionDialogResizeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MimeDomHelper }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRpb24tZGlhbG9nLXJlc2l6ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2F0dHJpYnV0aW9uLWRpYWxvZy9hdHRyaWJ1dGlvbi1kaWFsb2ctcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQWMsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR2pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBR3pELE1BQU0sT0FBTyw4QkFBOEI7SUFLekMsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFKeEMsUUFBRyxHQUFzQixJQUFJLENBQUM7UUFDOUIsa0JBQWEsR0FBOEIsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUMvRCxlQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUVhLENBQUM7SUFFcEQsSUFBSSxFQUFFLENBQUMsRUFBcUI7UUFDMUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELElBQUksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1gsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckUsSUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsTUFBTTtnQkFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLE1BQU07Z0JBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxJQUFJO2dCQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsS0FBSztnQkFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDLEdBQUc7Z0JBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQyxLQUFLLEVBQzFDO2dCQUNBLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO2dCQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7YUFDakQ7U0FDRjtJQUNILENBQUM7OzJIQWxDVSw4QkFBOEI7K0hBQTlCLDhCQUE4QjsyRkFBOUIsOEJBQThCO2tCQUQxQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNaW1lRG9tSGVscGVyIH0gZnJvbSAnLi8uLi9jb3JlL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQgeyBEaW1lbnNpb25zIH0gZnJvbSAnLi8uLi9jb3JlL21vZGVscy9kaW1lbnNpb25zJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF0dHJpYnV0aW9uRGlhbG9nUmVzaXplU2VydmljZSB7XG4gIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgcmVzaXplU3ViamVjdDogUmVwbGF5U3ViamVjdDxEaW1lbnNpb25zPiA9IG5ldyBSZXBsYXlTdWJqZWN0KCk7XG4gIHByaXZhdGUgZGltZW5zaW9ucyA9IG5ldyBEaW1lbnNpb25zKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtaW1lRG9tSGVscGVyOiBNaW1lRG9tSGVscGVyKSB7fVxuXG4gIHNldCBlbChlbDogRWxlbWVudFJlZiB8IG51bGwpIHtcbiAgICB0aGlzLl9lbCA9IGVsO1xuICB9XG5cbiAgZ2V0IGVsKCk6IEVsZW1lbnRSZWYgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fZWw7XG4gIH1cblxuICBnZXQgb25SZXNpemUoKTogT2JzZXJ2YWJsZTxEaW1lbnNpb25zPiB7XG4gICAgcmV0dXJuIHRoaXMucmVzaXplU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIG1hcmtGb3JDaGVjaygpIHtcbiAgICBpZiAodGhpcy5lbCkge1xuICAgICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMubWltZURvbUhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QodGhpcy5lbCk7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuZGltZW5zaW9ucy5ib3R0b20gIT09IGRpbWVuc2lvbnMuYm90dG9tIHx8XG4gICAgICAgIHRoaXMuZGltZW5zaW9ucy5oZWlnaHQgIT09IGRpbWVuc2lvbnMuaGVpZ2h0IHx8XG4gICAgICAgIHRoaXMuZGltZW5zaW9ucy5sZWZ0ICE9PSBkaW1lbnNpb25zLmxlZnQgfHxcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zLnJpZ2h0ICE9PSBkaW1lbnNpb25zLnJpZ2h0IHx8XG4gICAgICAgIHRoaXMuZGltZW5zaW9ucy50b3AgIT09IGRpbWVuc2lvbnMudG9wIHx8XG4gICAgICAgIHRoaXMuZGltZW5zaW9ucy53aWR0aCAhPT0gZGltZW5zaW9ucy53aWR0aFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuZGltZW5zaW9ucyA9IGRpbWVuc2lvbnM7XG4gICAgICAgIHRoaXMucmVzaXplU3ViamVjdC5uZXh0KHsgLi4udGhpcy5kaW1lbnNpb25zIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19