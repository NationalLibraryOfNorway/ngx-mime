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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: MimeResizeService, deps: [{ token: i1.ViewerService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: MimeResizeService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: MimeResizeService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.ViewerService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS1yZXNpemUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL21pbWUtcmVzaXplLXNlcnZpY2UvbWltZS1yZXNpemUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBYyxhQUFhLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7OztBQUdqRSxNQUFNLE9BQU8saUJBQWlCO0lBSzVCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBSHhDLGtCQUFhLEdBQW1DLElBQUksYUFBYSxFQUFFLENBQUM7SUFHekIsQ0FBQztJQUVwRCxJQUFJLEVBQUUsQ0FBQyxFQUFjO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQzVCLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsR0FBRyxDQUFDLENBQUMsV0FBNEIsRUFBRSxFQUFFO1lBQ25DLE9BQU87Z0JBQ0wsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNO2dCQUMxQixNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU07Z0JBQzFCLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTtnQkFDdEIsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLO2dCQUN4QixHQUFHLEVBQUUsV0FBVyxDQUFDLEdBQUc7Z0JBQ3BCLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSzthQUN6QixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMseUJBQXlCLEVBQUUsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2xDLENBQUM7SUFDSCxDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVPLHlCQUF5QjtRQUMvQixPQUFPLGdCQUFnQixJQUFJLE1BQU0sQ0FBQztJQUNwQyxDQUFDO0lBRU8sd0JBQXdCO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxjQUFjLENBQUMsQ0FBQyxPQUE4QixFQUFFLEVBQUU7WUFDcEUsS0FBSyxNQUFNLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sRUFBRSxHQUFtQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQzVELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsQ0FDNUIsQ0FBQztRQUVGLElBQUksRUFBRSxFQUFFLENBQUM7WUFDUCxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixDQUFDO0lBQ0gsQ0FBQztJQUVPLGlCQUFpQixDQUFDLEtBQTBCO1FBQ2xELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QyxDQUFDOzhHQS9EVSxpQkFBaUI7a0hBQWpCLGlCQUFpQjs7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QsIGRlYm91bmNlVGltZSwgbWFwIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEaW1lbnNpb25zIH0gZnJvbSAnLi4vbW9kZWxzL2RpbWVuc2lvbnMnO1xuaW1wb3J0IHsgVmlld2VyU2VydmljZSB9IGZyb20gJy4uL3ZpZXdlci1zZXJ2aWNlL3ZpZXdlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1pbWVSZXNpemVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfZWwhOiBFbGVtZW50UmVmO1xuICBwcml2YXRlIHJlc2l6ZVN1YmplY3Q6IFJlcGxheVN1YmplY3Q8RE9NUmVjdFJlYWRPbmx5PiA9IG5ldyBSZXBsYXlTdWJqZWN0KCk7XG4gIHByaXZhdGUgb2JzZXJ2ZXIhOiBSZXNpemVPYnNlcnZlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdlclNlcnZpY2U6IFZpZXdlclNlcnZpY2UpIHt9XG5cbiAgc2V0IGVsKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fZWwgPSBlbDtcbiAgfVxuXG4gIGdldCBlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZWw7XG4gIH1cblxuICBnZXQgb25SZXNpemUoKTogT2JzZXJ2YWJsZTxEaW1lbnNpb25zPiB7XG4gICAgcmV0dXJuIHRoaXMucmVzaXplU3ViamVjdC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDIwMCksXG4gICAgICBtYXAoKGNvbnRlbnRSZWN0OiBET01SZWN0UmVhZE9ubHkpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBib3R0b206IGNvbnRlbnRSZWN0LmJvdHRvbSxcbiAgICAgICAgICBoZWlnaHQ6IGNvbnRlbnRSZWN0LmhlaWdodCxcbiAgICAgICAgICBsZWZ0OiBjb250ZW50UmVjdC5sZWZ0LFxuICAgICAgICAgIHJpZ2h0OiBjb250ZW50UmVjdC5yaWdodCxcbiAgICAgICAgICB0b3A6IGNvbnRlbnRSZWN0LnRvcCxcbiAgICAgICAgICB3aWR0aDogY29udGVudFJlY3Qud2lkdGgsXG4gICAgICAgIH07XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICBpZiAodGhpcy5pc1Jlc2l6ZU9ic2VydmVyU3VwcG9ydGVkKCkpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZVJlc2l6ZU9ic2VydmVyKCk7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLm9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG4gIH1cblxuICBwcml2YXRlIGlzUmVzaXplT2JzZXJ2ZXJTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICdSZXNpemVPYnNlcnZlcicgaW4gd2luZG93O1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplUmVzaXplT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoZW50cmllczogUmVzaXplT2JzZXJ2ZXJFbnRyeVtdKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXNpemVFbnRyeShlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBlbDogRWxlbWVudCB8IG51bGwgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAjJHt0aGlzLnZpZXdlclNlcnZpY2UuaWR9YCxcbiAgICApO1xuXG4gICAgaWYgKGVsKSB7XG4gICAgICB0aGlzLm9ic2VydmVyPy5vYnNlcnZlKGVsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVJlc2l6ZUVudHJ5KGVudHJ5OiBSZXNpemVPYnNlcnZlckVudHJ5KTogdm9pZCB7XG4gICAgdGhpcy5yZXNpemVTdWJqZWN0Lm5leHQoZW50cnkuY29udGVudFJlY3QpO1xuICB9XG59XG4iXX0=