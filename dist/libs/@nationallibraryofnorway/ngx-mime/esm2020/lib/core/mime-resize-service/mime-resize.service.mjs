import { Injectable } from '@angular/core';
import { ReplaySubject, debounceTime, map } from 'rxjs';
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
MimeResizeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeResizeService, deps: [{ token: i1.ViewerService }], target: i0.ɵɵFactoryTarget.Injectable });
MimeResizeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeResizeService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeResizeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ViewerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS1yZXNpemUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL21pbWUtcmVzaXplLXNlcnZpY2UvbWltZS1yZXNpemUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBYyxhQUFhLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBS3BFLE1BQU0sT0FBTyxpQkFBaUI7SUFLNUIsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFIeEMsa0JBQWEsR0FBbUMsSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUd6QixDQUFDO0lBRXBELElBQUksRUFBRSxDQUFDLEVBQWM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELElBQUksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDNUIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixHQUFHLENBQUMsQ0FBQyxXQUE0QixFQUFFLEVBQUU7WUFDbkMsT0FBTztnQkFDTCxNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU07Z0JBQzFCLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTTtnQkFDMUIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO2dCQUN0QixLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUs7Z0JBQ3hCLEdBQUcsRUFBRSxXQUFXLENBQUMsR0FBRztnQkFDcEIsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLO2FBQ3pCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDN0MsS0FBSyxNQUFNLEtBQUssSUFBSSxPQUFPLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUM1QztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxFQUFFLEdBQVksSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUNyRCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQzVCLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7OEdBakRVLGlCQUFpQjtrSEFBakIsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBRDdCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0LCBkZWJvdW5jZVRpbWUsIG1hcCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4uL21vZGVscy9kaW1lbnNpb25zJztcbmltcG9ydCB7IFZpZXdlclNlcnZpY2UgfSBmcm9tICcuLi92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNaW1lUmVzaXplU2VydmljZSB7XG4gIHByaXZhdGUgX2VsITogRWxlbWVudFJlZjtcbiAgcHJpdmF0ZSByZXNpemVTdWJqZWN0OiBSZXBsYXlTdWJqZWN0PERPTVJlY3RSZWFkT25seT4gPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xuICBwcml2YXRlIG9ic2VydmVyITogUmVzaXplT2JzZXJ2ZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3ZXJTZXJ2aWNlOiBWaWV3ZXJTZXJ2aWNlKSB7fVxuXG4gIHNldCBlbChlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2VsID0gZWw7XG4gIH1cblxuICBnZXQgZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsO1xuICB9XG5cbiAgZ2V0IG9uUmVzaXplKCk6IE9ic2VydmFibGU8RGltZW5zaW9ucz4ge1xuICAgIHJldHVybiB0aGlzLnJlc2l6ZVN1YmplY3QucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSgyMDApLFxuICAgICAgbWFwKChjb250ZW50UmVjdDogRE9NUmVjdFJlYWRPbmx5KSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYm90dG9tOiBjb250ZW50UmVjdC5ib3R0b20sXG4gICAgICAgICAgaGVpZ2h0OiBjb250ZW50UmVjdC5oZWlnaHQsXG4gICAgICAgICAgbGVmdDogY29udGVudFJlY3QubGVmdCxcbiAgICAgICAgICByaWdodDogY29udGVudFJlY3QucmlnaHQsXG4gICAgICAgICAgdG9wOiBjb250ZW50UmVjdC50b3AsXG4gICAgICAgICAgd2lkdGg6IGNvbnRlbnRSZWN0LndpZHRoLFxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICAgICAgdGhpcy5yZXNpemVTdWJqZWN0Lm5leHQoZW50cnkuY29udGVudFJlY3QpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZWw6IEVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAjJHt0aGlzLnZpZXdlclNlcnZpY2UuaWR9YFxuICAgICk7XG5cbiAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUoZWwpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG59XG4iXX0=