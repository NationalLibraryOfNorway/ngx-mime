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
MimeResizeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MimeResizeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MimeResizeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MimeResizeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MimeResizeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS1yZXNpemUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL21pbWUtcmVzaXplLXNlcnZpY2UvbWltZS1yZXNpemUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFjLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFNcEUsTUFBTSxPQUFPLGlCQUFpQjtJQUg5QjtRQUtVLGtCQUFhLEdBQW1DLElBQUksYUFBYSxFQUFFLENBQUM7S0E0QzdFO0lBekNDLElBQUksRUFBRSxDQUFDLEVBQWM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELElBQUksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDNUIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixHQUFHLENBQUMsQ0FBQyxXQUE0QixFQUFFLEVBQUU7WUFDbkMsT0FBTztnQkFDTCxNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU07Z0JBQzFCLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTTtnQkFDMUIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO2dCQUN0QixLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUs7Z0JBQ3hCLEdBQUcsRUFBRSxXQUFXLENBQUMsR0FBRztnQkFDcEIsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLO2FBQ3pCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDN0MsS0FBSyxNQUFNLEtBQUssSUFBSSxPQUFPLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUM1QztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxFQUFFLEdBQVksSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUNyRCxzQkFBc0IsQ0FDdkIsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDOzs4R0E3Q1UsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FGaEIsTUFBTTsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBtYXAsIE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERpbWVuc2lvbnMgfSBmcm9tICcuLi9tb2RlbHMvZGltZW5zaW9ucyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBNaW1lUmVzaXplU2VydmljZSB7XG4gIHByaXZhdGUgX2VsITogRWxlbWVudFJlZjtcbiAgcHJpdmF0ZSByZXNpemVTdWJqZWN0OiBSZXBsYXlTdWJqZWN0PERPTVJlY3RSZWFkT25seT4gPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xuICBwcml2YXRlIG9ic2VydmVyITogUmVzaXplT2JzZXJ2ZXI7XG5cbiAgc2V0IGVsKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fZWwgPSBlbDtcbiAgfVxuXG4gIGdldCBlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZWw7XG4gIH1cblxuICBnZXQgb25SZXNpemUoKTogT2JzZXJ2YWJsZTxEaW1lbnNpb25zPiB7XG4gICAgcmV0dXJuIHRoaXMucmVzaXplU3ViamVjdC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDIwMCksXG4gICAgICBtYXAoKGNvbnRlbnRSZWN0OiBET01SZWN0UmVhZE9ubHkpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBib3R0b206IGNvbnRlbnRSZWN0LmJvdHRvbSxcbiAgICAgICAgICBoZWlnaHQ6IGNvbnRlbnRSZWN0LmhlaWdodCxcbiAgICAgICAgICBsZWZ0OiBjb250ZW50UmVjdC5sZWZ0LFxuICAgICAgICAgIHJpZ2h0OiBjb250ZW50UmVjdC5yaWdodCxcbiAgICAgICAgICB0b3A6IGNvbnRlbnRSZWN0LnRvcCxcbiAgICAgICAgICB3aWR0aDogY29udGVudFJlY3Qud2lkdGgsXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgICB0aGlzLnJlc2l6ZVN1YmplY3QubmV4dChlbnRyeS5jb250ZW50UmVjdCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgZWw6IEVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcjbmd4LW1pbWUtbWltZVZpZXdlcidcbiAgICApO1xuICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZShlbCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==