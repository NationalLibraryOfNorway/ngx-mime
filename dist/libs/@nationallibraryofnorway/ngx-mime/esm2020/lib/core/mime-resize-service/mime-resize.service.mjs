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
        this.observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                this.resizeSubject.next(entry.contentRect);
            }
        });
        const el = this.el.nativeElement.querySelector(`#${this.viewerService.id}`);
        this.observer.observe(el);
    }
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
MimeResizeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MimeResizeService, deps: [{ token: i1.ViewerService }], target: i0.ɵɵFactoryTarget.Injectable });
MimeResizeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MimeResizeService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MimeResizeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ViewerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS1yZXNpemUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL21pbWUtcmVzaXplLXNlcnZpY2UvbWltZS1yZXNpemUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBYyxhQUFhLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7OztBQUdqRSxNQUFNLE9BQU8saUJBQWlCO0lBSzVCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBSHhDLGtCQUFhLEdBQW1DLElBQUksYUFBYSxFQUFFLENBQUM7SUFHekIsQ0FBQztJQUVwRCxJQUFJLEVBQUUsQ0FBQyxFQUFjO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQzVCLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsR0FBRyxDQUFDLENBQUMsV0FBNEIsRUFBRSxFQUFFO1lBQ25DLE9BQU87Z0JBQ0wsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNO2dCQUMxQixNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU07Z0JBQzFCLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTtnQkFDdEIsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLO2dCQUN4QixHQUFHLEVBQUUsV0FBVyxDQUFDLEdBQUc7Z0JBQ3BCLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSzthQUN6QixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzdDLEtBQUssTUFBTSxLQUFLLElBQUksT0FBTyxFQUFFO2dCQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDNUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sRUFBRSxHQUFZLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FDckQsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUM1QixDQUFDO1FBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7OzhHQWpEVSxpQkFBaUI7a0hBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUQ3QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCwgZGVib3VuY2VUaW1lLCBtYXAgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERpbWVuc2lvbnMgfSBmcm9tICcuLi9tb2RlbHMvZGltZW5zaW9ucyc7XG5pbXBvcnQgeyBWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdmlld2VyLXNlcnZpY2Uvdmlld2VyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWltZVJlc2l6ZVNlcnZpY2Uge1xuICBwcml2YXRlIF9lbCE6IEVsZW1lbnRSZWY7XG4gIHByaXZhdGUgcmVzaXplU3ViamVjdDogUmVwbGF5U3ViamVjdDxET01SZWN0UmVhZE9ubHk+ID0gbmV3IFJlcGxheVN1YmplY3QoKTtcbiAgcHJpdmF0ZSBvYnNlcnZlciE6IFJlc2l6ZU9ic2VydmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld2VyU2VydmljZTogVmlld2VyU2VydmljZSkge31cblxuICBzZXQgZWwoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9lbCA9IGVsO1xuICB9XG5cbiAgZ2V0IGVsKCkge1xuICAgIHJldHVybiB0aGlzLl9lbDtcbiAgfVxuXG4gIGdldCBvblJlc2l6ZSgpOiBPYnNlcnZhYmxlPERpbWVuc2lvbnM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXNpemVTdWJqZWN0LnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMjAwKSxcbiAgICAgIG1hcCgoY29udGVudFJlY3Q6IERPTVJlY3RSZWFkT25seSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGJvdHRvbTogY29udGVudFJlY3QuYm90dG9tLFxuICAgICAgICAgIGhlaWdodDogY29udGVudFJlY3QuaGVpZ2h0LFxuICAgICAgICAgIGxlZnQ6IGNvbnRlbnRSZWN0LmxlZnQsXG4gICAgICAgICAgcmlnaHQ6IGNvbnRlbnRSZWN0LnJpZ2h0LFxuICAgICAgICAgIHRvcDogY29udGVudFJlY3QudG9wLFxuICAgICAgICAgIHdpZHRoOiBjb250ZW50UmVjdC53aWR0aCxcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICAgIHRoaXMucmVzaXplU3ViamVjdC5uZXh0KGVudHJ5LmNvbnRlbnRSZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGVsOiBFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgIyR7dGhpcy52aWV3ZXJTZXJ2aWNlLmlkfWBcbiAgICApO1xuXG4gICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKGVsKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfVxufVxuIl19