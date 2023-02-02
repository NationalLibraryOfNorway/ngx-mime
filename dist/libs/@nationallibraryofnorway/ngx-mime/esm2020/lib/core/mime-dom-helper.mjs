import { Dimensions } from './models/dimensions';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./fullscreen-service/fullscreen.service";
export class MimeDomHelper {
    constructor(fullscreen) {
        this.fullscreen = fullscreen;
    }
    getBoundingClientRect(el) {
        try {
            if (this.isDocumentInFullScreenMode() &&
                el.nativeElement.nodeName === 'MIME-VIEWER') {
                return this.createFullscreenDimensions(el);
            }
            else {
                return this.createDimensions(el);
            }
        }
        catch (e) {
            return new Dimensions();
        }
    }
    isDocumentInFullScreenMode() {
        return this.fullscreen.isFullscreen();
    }
    toggleFullscreen() {
        const el = document.getElementById('ngx-mime-mimeViewer');
        if (this.fullscreen.isEnabled()) {
            this.fullscreen.toggle(el);
        }
    }
    setFocusOnViewer() {
        const el = document.getElementById('ngx-mime-mimeViewer');
        if (el) {
            el.focus();
        }
    }
    createFullscreenDimensions(el) {
        const dimensions = el.nativeElement.getBoundingClientRect();
        const width = this.getFullscreenWidth();
        const height = this.getFullscreenHeight();
        return new Dimensions({
            ...dimensions,
            top: 0,
            bottom: height,
            width: width,
            height: height,
            left: 0,
            right: width,
        });
    }
    createDimensions(el) {
        const dimensions = el.nativeElement.getBoundingClientRect();
        return new Dimensions({
            top: dimensions.top,
            bottom: dimensions.bottom,
            width: dimensions.width,
            height: dimensions.height,
            left: dimensions.left,
            right: dimensions.right,
        });
    }
    getFullscreenWidth() {
        return (window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth);
    }
    getFullscreenHeight() {
        return (window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight);
    }
}
MimeDomHelper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeDomHelper, deps: [{ token: i1.FullscreenService }], target: i0.ɵɵFactoryTarget.Injectable });
MimeDomHelper.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeDomHelper });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeDomHelper, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FullscreenService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS1kb20taGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbWltZS1kb20taGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFHdkQsTUFBTSxPQUFPLGFBQWE7SUFDeEIsWUFBb0IsVUFBNkI7UUFBN0IsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7SUFBRyxDQUFDO0lBRTlDLHFCQUFxQixDQUFDLEVBQWM7UUFDekMsSUFBSTtZQUNGLElBQ0UsSUFBSSxDQUFDLDBCQUEwQixFQUFFO2dCQUNqQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsS0FBSyxhQUFhLEVBQzNDO2dCQUNBLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzVDO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sSUFBSSxVQUFVLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFFTSwwQkFBMEI7UUFDL0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsTUFBTSxFQUFFLEdBQVEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQy9ELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsTUFBTSxFQUFFLEdBQXVCLFFBQVEsQ0FBQyxjQUFjLENBQ3BELHFCQUFxQixDQUN0QixDQUFDO1FBQ0YsSUFBSSxFQUFFLEVBQUU7WUFDTixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDWjtJQUNILENBQUM7SUFFTywwQkFBMEIsQ0FBQyxFQUFjO1FBQy9DLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM1RCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMxQyxPQUFPLElBQUksVUFBVSxDQUFDO1lBQ3BCLEdBQUcsVUFBVTtZQUNiLEdBQUcsRUFBRSxDQUFDO1lBQ04sTUFBTSxFQUFFLE1BQU07WUFDZCxLQUFLLEVBQUUsS0FBSztZQUNaLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLENBQUM7WUFDUCxLQUFLLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxFQUFjO1FBQ3JDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM1RCxPQUFPLElBQUksVUFBVSxDQUFDO1lBQ3BCLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRztZQUNuQixNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU07WUFDekIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO1lBQ3ZCLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTTtZQUN6QixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7WUFDckIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO1NBQ3hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsT0FBTyxDQUNMLE1BQU0sQ0FBQyxVQUFVO1lBQ2pCLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVztZQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FDMUIsQ0FBQztJQUNKLENBQUM7SUFFTyxtQkFBbUI7UUFDekIsT0FBTyxDQUNMLE1BQU0sQ0FBQyxXQUFXO1lBQ2xCLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWTtZQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FDM0IsQ0FBQztJQUNKLENBQUM7OzBHQS9FVSxhQUFhOzhHQUFiLGFBQWE7MkZBQWIsYUFBYTtrQkFEekIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZ1bGxzY3JlZW5TZXJ2aWNlIH0gZnJvbSAnLi9mdWxsc2NyZWVuLXNlcnZpY2UvZnVsbHNjcmVlbi5zZXJ2aWNlJztcbmltcG9ydCB7IERpbWVuc2lvbnMgfSBmcm9tICcuL21vZGVscy9kaW1lbnNpb25zJztcbmltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1pbWVEb21IZWxwZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZ1bGxzY3JlZW46IEZ1bGxzY3JlZW5TZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWw6IEVsZW1lbnRSZWYpOiBEaW1lbnNpb25zIHtcbiAgICB0cnkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmlzRG9jdW1lbnRJbkZ1bGxTY3JlZW5Nb2RlKCkgJiZcbiAgICAgICAgZWwubmF0aXZlRWxlbWVudC5ub2RlTmFtZSA9PT0gJ01JTUUtVklFV0VSJ1xuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUZ1bGxzY3JlZW5EaW1lbnNpb25zKGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZURpbWVuc2lvbnMoZWwpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBuZXcgRGltZW5zaW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0RvY3VtZW50SW5GdWxsU2NyZWVuTW9kZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5mdWxsc2NyZWVuLmlzRnVsbHNjcmVlbigpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUZ1bGxzY3JlZW4oKTogdm9pZCB7XG4gICAgY29uc3QgZWwgPSA8YW55PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZ3gtbWltZS1taW1lVmlld2VyJyk7XG4gICAgaWYgKHRoaXMuZnVsbHNjcmVlbi5pc0VuYWJsZWQoKSkge1xuICAgICAgdGhpcy5mdWxsc2NyZWVuLnRvZ2dsZShlbCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldEZvY3VzT25WaWV3ZXIoKTogdm9pZCB7XG4gICAgY29uc3QgZWw6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgJ25neC1taW1lLW1pbWVWaWV3ZXInXG4gICAgKTtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVGdWxsc2NyZWVuRGltZW5zaW9ucyhlbDogRWxlbWVudFJlZik6IERpbWVuc2lvbnMge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5nZXRGdWxsc2NyZWVuV2lkdGgoKTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmdldEZ1bGxzY3JlZW5IZWlnaHQoKTtcbiAgICByZXR1cm4gbmV3IERpbWVuc2lvbnMoe1xuICAgICAgLi4uZGltZW5zaW9ucyxcbiAgICAgIHRvcDogMCxcbiAgICAgIGJvdHRvbTogaGVpZ2h0LFxuICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IHdpZHRoLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVEaW1lbnNpb25zKGVsOiBFbGVtZW50UmVmKTogRGltZW5zaW9ucyB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IGVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIG5ldyBEaW1lbnNpb25zKHtcbiAgICAgIHRvcDogZGltZW5zaW9ucy50b3AsXG4gICAgICBib3R0b206IGRpbWVuc2lvbnMuYm90dG9tLFxuICAgICAgd2lkdGg6IGRpbWVuc2lvbnMud2lkdGgsXG4gICAgICBoZWlnaHQ6IGRpbWVuc2lvbnMuaGVpZ2h0LFxuICAgICAgbGVmdDogZGltZW5zaW9ucy5sZWZ0LFxuICAgICAgcmlnaHQ6IGRpbWVuc2lvbnMucmlnaHQsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldEZ1bGxzY3JlZW5XaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiAoXG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCB8fFxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8XG4gICAgICBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RnVsbHNjcmVlbkhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiAoXG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgfHxcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHxcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0XG4gICAgKTtcbiAgfVxufVxuIl19