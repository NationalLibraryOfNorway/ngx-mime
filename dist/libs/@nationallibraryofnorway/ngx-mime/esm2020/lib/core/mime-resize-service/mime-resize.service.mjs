import { Injectable } from '@angular/core';
import { ReplaySubject, debounceTime, map } from 'rxjs';
import { ViewerService } from '../viewer-service/viewer.service';
import * as i0 from "@angular/core";
import * as i1 from "../viewer-service/viewer.service";
export class MimeResizeService {
    constructor(viewerService) {
        this.viewerService = viewerService;
        this.resizeSubject = new ReplaySubject();
    }
    set el(el) {
        this._el = el;
    }
    get el() {
        return this._el;
    }
    get onResize() {
        return this.resizeSubject.pipe(debounceTime(200), map((contentRect) => {
            return {
                bottom: contentRect.bottom,
                height: contentRect.height,
                left: contentRect.left,
                right: contentRect.right,
                top: contentRect.top,
                width: contentRect.width,
            };
        }));
    }
    initialize() {
        if (this.isResizeObserverSupported()) {
            this.initializeResizeObserver();
        }
    }
    destroy() {
        this.observer?.disconnect();
    }
    isResizeObserverSupported() {
        return 'ResizeObserver' in window;
    }
    initializeResizeObserver() {
        this.observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                this.handleResizeEntry(entry);
            }
        });
        const el = this.el.nativeElement.querySelector(`#${this.viewerService.id}`);
        if (el) {
            this.observer?.observe(el);
        }
    }
    handleResizeEntry(entry) {
        this.resizeSubject.next(entry.contentRect);
    }
}
MimeResizeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MimeResizeService, deps: [{ token: i1.ViewerService }], target: i0.ɵɵFactoryTarget.Injectable });
MimeResizeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MimeResizeService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MimeResizeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ViewerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS1yZXNpemUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL21pbWUtcmVzaXplLXNlcnZpY2UvbWltZS1yZXNpemUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBYyxhQUFhLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7OztBQUdqRSxNQUFNLE9BQU8saUJBQWlCO0lBSzVCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBSHhDLGtCQUFhLEdBQW1DLElBQUksYUFBYSxFQUFFLENBQUM7SUFHekIsQ0FBQztJQUVwRCxJQUFJLEVBQUUsQ0FBQyxFQUFjO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQzVCLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsR0FBRyxDQUFDLENBQUMsV0FBNEIsRUFBRSxFQUFFO1lBQ25DLE9BQU87Z0JBQ0wsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNO2dCQUMxQixNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU07Z0JBQzFCLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTtnQkFDdEIsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLO2dCQUN4QixHQUFHLEVBQUUsV0FBVyxDQUFDLEdBQUc7Z0JBQ3BCLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSzthQUN6QixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMseUJBQXlCLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztTQUNqQztJQUNILENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU8seUJBQXlCO1FBQy9CLE9BQU8sZ0JBQWdCLElBQUksTUFBTSxDQUFDO0lBQ3BDLENBQUM7SUFFTyx3QkFBd0I7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxDQUFDLE9BQThCLEVBQUUsRUFBRTtZQUNwRSxLQUFLLE1BQU0sS0FBSyxJQUFJLE9BQU8sRUFBRTtnQkFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLEVBQUUsR0FBbUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUM1RCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQzVCLENBQUM7UUFFRixJQUFJLEVBQUUsRUFBRTtZQUNOLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVPLGlCQUFpQixDQUFDLEtBQTBCO1FBQ2xELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs4R0EvRFUsaUJBQWlCO2tIQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QsIGRlYm91bmNlVGltZSwgbWFwIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEaW1lbnNpb25zIH0gZnJvbSAnLi4vbW9kZWxzL2RpbWVuc2lvbnMnO1xuaW1wb3J0IHsgVmlld2VyU2VydmljZSB9IGZyb20gJy4uL3ZpZXdlci1zZXJ2aWNlL3ZpZXdlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1pbWVSZXNpemVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfZWwhOiBFbGVtZW50UmVmO1xuICBwcml2YXRlIHJlc2l6ZVN1YmplY3Q6IFJlcGxheVN1YmplY3Q8RE9NUmVjdFJlYWRPbmx5PiA9IG5ldyBSZXBsYXlTdWJqZWN0KCk7XG4gIHByaXZhdGUgb2JzZXJ2ZXIhOiBSZXNpemVPYnNlcnZlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdlclNlcnZpY2U6IFZpZXdlclNlcnZpY2UpIHt9XG5cbiAgc2V0IGVsKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fZWwgPSBlbDtcbiAgfVxuXG4gIGdldCBlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZWw7XG4gIH1cblxuICBnZXQgb25SZXNpemUoKTogT2JzZXJ2YWJsZTxEaW1lbnNpb25zPiB7XG4gICAgcmV0dXJuIHRoaXMucmVzaXplU3ViamVjdC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDIwMCksXG4gICAgICBtYXAoKGNvbnRlbnRSZWN0OiBET01SZWN0UmVhZE9ubHkpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBib3R0b206IGNvbnRlbnRSZWN0LmJvdHRvbSxcbiAgICAgICAgICBoZWlnaHQ6IGNvbnRlbnRSZWN0LmhlaWdodCxcbiAgICAgICAgICBsZWZ0OiBjb250ZW50UmVjdC5sZWZ0LFxuICAgICAgICAgIHJpZ2h0OiBjb250ZW50UmVjdC5yaWdodCxcbiAgICAgICAgICB0b3A6IGNvbnRlbnRSZWN0LnRvcCxcbiAgICAgICAgICB3aWR0aDogY29udGVudFJlY3Qud2lkdGgsXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIGlmICh0aGlzLmlzUmVzaXplT2JzZXJ2ZXJTdXBwb3J0ZWQoKSkge1xuICAgICAgdGhpcy5pbml0aWFsaXplUmVzaXplT2JzZXJ2ZXIoKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMub2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNSZXNpemVPYnNlcnZlclN1cHBvcnRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gJ1Jlc2l6ZU9ic2VydmVyJyBpbiB3aW5kb3c7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVSZXNpemVPYnNlcnZlcigpOiB2b2lkIHtcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzOiBSZXNpemVPYnNlcnZlckVudHJ5W10pID0+IHtcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc2l6ZUVudHJ5KGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGVsOiBFbGVtZW50IHwgbnVsbCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYCMke3RoaXMudmlld2VyU2VydmljZS5pZH1gXG4gICAgKTtcblxuICAgIGlmIChlbCkge1xuICAgICAgdGhpcy5vYnNlcnZlcj8ub2JzZXJ2ZShlbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVSZXNpemVFbnRyeShlbnRyeTogUmVzaXplT2JzZXJ2ZXJFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMucmVzaXplU3ViamVjdC5uZXh0KGVudHJ5LmNvbnRlbnRSZWN0KTtcbiAgfVxufVxuIl19