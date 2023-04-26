import { Injectable } from '@angular/core';
import { Dimensions } from './models/dimensions';
import * as i0 from "@angular/core";
import * as i1 from "./fullscreen-service/fullscreen.service";
import * as i2 from "./viewer-service/viewer.service";
export class MimeDomHelper {
    constructor(fullscreen, viewerService) {
        this.fullscreen = fullscreen;
        this.viewerService = viewerService;
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
        const el = this.getViewerElement();
        if (el && this.fullscreen.isEnabled()) {
            this.fullscreen.toggle(el);
        }
    }
    setFocusOnViewer() {
        const el = this.getViewerElement();
        if (el) {
            el.focus();
        }
    }
    getViewerElement() {
        return document.querySelector(`#${this.viewerService.id}`);
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
MimeDomHelper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeDomHelper, deps: [{ token: i1.FullscreenService }, { token: i2.ViewerService }], target: i0.ɵɵFactoryTarget.Injectable });
MimeDomHelper.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeDomHelper });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeDomHelper, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FullscreenService }, { type: i2.ViewerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS1kb20taGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbWltZS1kb20taGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7O0FBSWpELE1BQU0sT0FBTyxhQUFhO0lBQ3hCLFlBQ1UsVUFBNkIsRUFDN0IsYUFBNEI7UUFENUIsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFDN0Isa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDbkMsQ0FBQztJQUVHLHFCQUFxQixDQUFDLEVBQWM7UUFDekMsSUFBSTtZQUNGLElBQ0UsSUFBSSxDQUFDLDBCQUEwQixFQUFFO2dCQUNqQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsS0FBSyxhQUFhLEVBQzNDO2dCQUNBLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzVDO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sSUFBSSxVQUFVLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFFTSwwQkFBMEI7UUFDL0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDbkMsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDbkMsSUFBSSxFQUFFLEVBQUU7WUFDTixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDWjtJQUNILENBQUM7SUFFTyxnQkFBZ0I7UUFDdEIsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTywwQkFBMEIsQ0FBQyxFQUFjO1FBQy9DLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM1RCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMxQyxPQUFPLElBQUksVUFBVSxDQUFDO1lBQ3BCLEdBQUcsVUFBVTtZQUNiLEdBQUcsRUFBRSxDQUFDO1lBQ04sTUFBTSxFQUFFLE1BQU07WUFDZCxLQUFLLEVBQUUsS0FBSztZQUNaLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLENBQUM7WUFDUCxLQUFLLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxFQUFjO1FBQ3JDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM1RCxPQUFPLElBQUksVUFBVSxDQUFDO1lBQ3BCLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRztZQUNuQixNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU07WUFDekIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO1lBQ3ZCLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTTtZQUN6QixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7WUFDckIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO1NBQ3hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsT0FBTyxDQUNMLE1BQU0sQ0FBQyxVQUFVO1lBQ2pCLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVztZQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FDMUIsQ0FBQztJQUNKLENBQUM7SUFFTyxtQkFBbUI7UUFDekIsT0FBTyxDQUNMLE1BQU0sQ0FBQyxXQUFXO1lBQ2xCLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWTtZQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FDM0IsQ0FBQztJQUNKLENBQUM7OzBHQXBGVSxhQUFhOzhHQUFiLGFBQWE7MkZBQWIsYUFBYTtrQkFEekIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZ1bGxzY3JlZW5TZXJ2aWNlIH0gZnJvbSAnLi9mdWxsc2NyZWVuLXNlcnZpY2UvZnVsbHNjcmVlbi5zZXJ2aWNlJztcbmltcG9ydCB7IERpbWVuc2lvbnMgfSBmcm9tICcuL21vZGVscy9kaW1lbnNpb25zJztcbmltcG9ydCB7IFZpZXdlclNlcnZpY2UgfSBmcm9tICcuL3ZpZXdlci1zZXJ2aWNlL3ZpZXdlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1pbWVEb21IZWxwZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZ1bGxzY3JlZW46IEZ1bGxzY3JlZW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgdmlld2VyU2VydmljZTogVmlld2VyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbDogRWxlbWVudFJlZik6IERpbWVuc2lvbnMge1xuICAgIHRyeSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuaXNEb2N1bWVudEluRnVsbFNjcmVlbk1vZGUoKSAmJlxuICAgICAgICBlbC5uYXRpdmVFbGVtZW50Lm5vZGVOYW1lID09PSAnTUlNRS1WSUVXRVInXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRnVsbHNjcmVlbkRpbWVuc2lvbnMoZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRGltZW5zaW9ucyhlbCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIG5ldyBEaW1lbnNpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzRG9jdW1lbnRJbkZ1bGxTY3JlZW5Nb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZ1bGxzY3JlZW4uaXNGdWxsc2NyZWVuKCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlRnVsbHNjcmVlbigpOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZ2V0Vmlld2VyRWxlbWVudCgpO1xuICAgIGlmIChlbCAmJiB0aGlzLmZ1bGxzY3JlZW4uaXNFbmFibGVkKCkpIHtcbiAgICAgIHRoaXMuZnVsbHNjcmVlbi50b2dnbGUoZWwpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRGb2N1c09uVmlld2VyKCk6IHZvaWQge1xuICAgIGNvbnN0IGVsID0gdGhpcy5nZXRWaWV3ZXJFbGVtZW50KCk7XG4gICAgaWYgKGVsKSB7XG4gICAgICBlbC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0Vmlld2VyRWxlbWVudCgpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0aGlzLnZpZXdlclNlcnZpY2UuaWR9YCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUZ1bGxzY3JlZW5EaW1lbnNpb25zKGVsOiBFbGVtZW50UmVmKTogRGltZW5zaW9ucyB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IGVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmdldEZ1bGxzY3JlZW5XaWR0aCgpO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZ2V0RnVsbHNjcmVlbkhlaWdodCgpO1xuICAgIHJldHVybiBuZXcgRGltZW5zaW9ucyh7XG4gICAgICAuLi5kaW1lbnNpb25zLFxuICAgICAgdG9wOiAwLFxuICAgICAgYm90dG9tOiBoZWlnaHQsXG4gICAgICB3aWR0aDogd2lkdGgsXG4gICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICByaWdodDogd2lkdGgsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZURpbWVuc2lvbnMoZWw6IEVsZW1lbnRSZWYpOiBEaW1lbnNpb25zIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gbmV3IERpbWVuc2lvbnMoe1xuICAgICAgdG9wOiBkaW1lbnNpb25zLnRvcCxcbiAgICAgIGJvdHRvbTogZGltZW5zaW9ucy5ib3R0b20sXG4gICAgICB3aWR0aDogZGltZW5zaW9ucy53aWR0aCxcbiAgICAgIGhlaWdodDogZGltZW5zaW9ucy5oZWlnaHQsXG4gICAgICBsZWZ0OiBkaW1lbnNpb25zLmxlZnQsXG4gICAgICByaWdodDogZGltZW5zaW9ucy5yaWdodCxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RnVsbHNjcmVlbldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIChcbiAgICAgIHdpbmRvdy5pbm5lcldpZHRoIHx8XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHxcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGhcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGdWxsc2NyZWVuSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIChcbiAgICAgIHdpbmRvdy5pbm5lckhlaWdodCB8fFxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fFxuICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHRcbiAgICApO1xuICB9XG59XG4iXX0=