import { Injectable } from '@angular/core';
import { debounceTime, map, ReplaySubject } from 'rxjs';
import * as i0 from "@angular/core";
export class MimeResizeService {
    constructor() {
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
        const el = this.el.nativeElement.querySelector('#ngx-mime-mimeViewer');
        this.observer.observe(el);
    }
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
MimeResizeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeResizeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MimeResizeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeResizeService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeResizeService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS1yZXNpemUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL21pbWUtcmVzaXplLXNlcnZpY2UvbWltZS1yZXNpemUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFjLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFJcEUsTUFBTSxPQUFPLGlCQUFpQjtJQUQ5QjtRQUdVLGtCQUFhLEdBQW1DLElBQUksYUFBYSxFQUFFLENBQUM7S0E0QzdFO0lBekNDLElBQUksRUFBRSxDQUFDLEVBQWM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELElBQUksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDNUIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixHQUFHLENBQUMsQ0FBQyxXQUE0QixFQUFFLEVBQUU7WUFDbkMsT0FBTztnQkFDTCxNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU07Z0JBQzFCLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTTtnQkFDMUIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO2dCQUN0QixLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUs7Z0JBQ3hCLEdBQUcsRUFBRSxXQUFXLENBQUMsR0FBRztnQkFDcEIsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLO2FBQ3pCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDN0MsS0FBSyxNQUFNLEtBQUssSUFBSSxPQUFPLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUM1QztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxFQUFFLEdBQVksSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUNyRCxzQkFBc0IsQ0FDdkIsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDOzs4R0E3Q1UsaUJBQWlCO2tIQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgbWFwLCBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEaW1lbnNpb25zIH0gZnJvbSAnLi4vbW9kZWxzL2RpbWVuc2lvbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWltZVJlc2l6ZVNlcnZpY2Uge1xuICBwcml2YXRlIF9lbCE6IEVsZW1lbnRSZWY7XG4gIHByaXZhdGUgcmVzaXplU3ViamVjdDogUmVwbGF5U3ViamVjdDxET01SZWN0UmVhZE9ubHk+ID0gbmV3IFJlcGxheVN1YmplY3QoKTtcbiAgcHJpdmF0ZSBvYnNlcnZlciE6IFJlc2l6ZU9ic2VydmVyO1xuXG4gIHNldCBlbChlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2VsID0gZWw7XG4gIH1cblxuICBnZXQgZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsO1xuICB9XG5cbiAgZ2V0IG9uUmVzaXplKCk6IE9ic2VydmFibGU8RGltZW5zaW9ucz4ge1xuICAgIHJldHVybiB0aGlzLnJlc2l6ZVN1YmplY3QucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSgyMDApLFxuICAgICAgbWFwKChjb250ZW50UmVjdDogRE9NUmVjdFJlYWRPbmx5KSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYm90dG9tOiBjb250ZW50UmVjdC5ib3R0b20sXG4gICAgICAgICAgaGVpZ2h0OiBjb250ZW50UmVjdC5oZWlnaHQsXG4gICAgICAgICAgbGVmdDogY29udGVudFJlY3QubGVmdCxcbiAgICAgICAgICByaWdodDogY29udGVudFJlY3QucmlnaHQsXG4gICAgICAgICAgdG9wOiBjb250ZW50UmVjdC50b3AsXG4gICAgICAgICAgd2lkdGg6IGNvbnRlbnRSZWN0LndpZHRoLFxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICAgICAgdGhpcy5yZXNpemVTdWJqZWN0Lm5leHQoZW50cnkuY29udGVudFJlY3QpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGVsOiBFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnI25neC1taW1lLW1pbWVWaWV3ZXInXG4gICAgKTtcbiAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUoZWwpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG59XG4iXX0=