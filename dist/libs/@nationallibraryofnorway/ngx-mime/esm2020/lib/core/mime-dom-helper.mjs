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
            right: width
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
            right: dimensions.right
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
MimeDomHelper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeDomHelper, deps: [{ token: i1.FullscreenService }], target: i0.ɵɵFactoryTarget.Injectable });
MimeDomHelper.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeDomHelper });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeDomHelper, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FullscreenService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS1kb20taGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbWltZS1kb20taGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFHdkQsTUFBTSxPQUFPLGFBQWE7SUFDeEIsWUFBb0IsVUFBNkI7UUFBN0IsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7SUFBRyxDQUFDO0lBRTlDLHFCQUFxQixDQUFDLEVBQWM7UUFDekMsSUFBSTtZQUNGLElBQ0UsSUFBSSxDQUFDLDBCQUEwQixFQUFFO2dCQUNqQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsS0FBSyxhQUFhLEVBQzNDO2dCQUNBLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzVDO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sSUFBSSxVQUFVLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFFTSwwQkFBMEI7UUFDL0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsTUFBTSxFQUFFLEdBQVEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQy9ELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsTUFBTSxFQUFFLEdBQXVCLFFBQVEsQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUM5RSxJQUFJLEVBQUUsRUFBRTtZQUNOLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNaO0lBQ0gsQ0FBQztJQUVPLDBCQUEwQixDQUFDLEVBQWM7UUFDL0MsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzFDLE9BQU8sSUFBSSxVQUFVLENBQUM7WUFDcEIsR0FBRyxVQUFVO1lBQ2IsR0FBRyxFQUFFLENBQUM7WUFDTixNQUFNLEVBQUUsTUFBTTtZQUNkLEtBQUssRUFBRSxLQUFLO1lBQ1osTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsQ0FBQztZQUNQLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGdCQUFnQixDQUFDLEVBQWM7UUFDckMsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzVELE9BQU8sSUFBSSxVQUFVLENBQUM7WUFDcEIsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHO1lBQ25CLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTTtZQUN6QixLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUs7WUFDdkIsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNO1lBQ3pCLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTtZQUNyQixLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUs7U0FDeEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixPQUFPLENBQ0wsTUFBTSxDQUFDLFVBQVU7WUFDakIsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXO1lBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUMxQixDQUFDO0lBQ0osQ0FBQztJQUVPLG1CQUFtQjtRQUN6QixPQUFPLENBQ0wsTUFBTSxDQUFDLFdBQVc7WUFDbEIsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZO1lBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUMzQixDQUFDO0lBQ0osQ0FBQzs7MEdBN0VVLGFBQWE7OEdBQWIsYUFBYTsyRkFBYixhQUFhO2tCQUR6QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnVsbHNjcmVlblNlcnZpY2UgfSBmcm9tICcuL2Z1bGxzY3JlZW4tc2VydmljZS9mdWxsc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4vbW9kZWxzL2RpbWVuc2lvbnMnO1xuaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWltZURvbUhlbHBlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnVsbHNjcmVlbjogRnVsbHNjcmVlblNlcnZpY2UpIHt9XG5cbiAgcHVibGljIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbDogRWxlbWVudFJlZik6IERpbWVuc2lvbnMge1xuICAgIHRyeSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuaXNEb2N1bWVudEluRnVsbFNjcmVlbk1vZGUoKSAmJlxuICAgICAgICBlbC5uYXRpdmVFbGVtZW50Lm5vZGVOYW1lID09PSAnTUlNRS1WSUVXRVInXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRnVsbHNjcmVlbkRpbWVuc2lvbnMoZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRGltZW5zaW9ucyhlbCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIG5ldyBEaW1lbnNpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzRG9jdW1lbnRJbkZ1bGxTY3JlZW5Nb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZ1bGxzY3JlZW4uaXNGdWxsc2NyZWVuKCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlRnVsbHNjcmVlbigpOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IDxhbnk+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25neC1taW1lLW1pbWVWaWV3ZXInKTtcbiAgICBpZiAodGhpcy5mdWxsc2NyZWVuLmlzRW5hYmxlZCgpKSB7XG4gICAgICB0aGlzLmZ1bGxzY3JlZW4udG9nZ2xlKGVsKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0Rm9jdXNPblZpZXdlcigpOiB2b2lkIHtcbiAgICBjb25zdCBlbDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25neC1taW1lLW1pbWVWaWV3ZXInKTtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVGdWxsc2NyZWVuRGltZW5zaW9ucyhlbDogRWxlbWVudFJlZik6IERpbWVuc2lvbnMge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5nZXRGdWxsc2NyZWVuV2lkdGgoKTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmdldEZ1bGxzY3JlZW5IZWlnaHQoKTtcbiAgICByZXR1cm4gbmV3IERpbWVuc2lvbnMoe1xuICAgICAgLi4uZGltZW5zaW9ucyxcbiAgICAgIHRvcDogMCxcbiAgICAgIGJvdHRvbTogaGVpZ2h0LFxuICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IHdpZHRoXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZURpbWVuc2lvbnMoZWw6IEVsZW1lbnRSZWYpOiBEaW1lbnNpb25zIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gbmV3IERpbWVuc2lvbnMoe1xuICAgICAgdG9wOiBkaW1lbnNpb25zLnRvcCxcbiAgICAgIGJvdHRvbTogZGltZW5zaW9ucy5ib3R0b20sXG4gICAgICB3aWR0aDogZGltZW5zaW9ucy53aWR0aCxcbiAgICAgIGhlaWdodDogZGltZW5zaW9ucy5oZWlnaHQsXG4gICAgICBsZWZ0OiBkaW1lbnNpb25zLmxlZnQsXG4gICAgICByaWdodDogZGltZW5zaW9ucy5yaWdodFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGdWxsc2NyZWVuV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgd2luZG93LmlubmVyV2lkdGggfHxcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fFxuICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldEZ1bGxzY3JlZW5IZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgd2luZG93LmlubmVySGVpZ2h0IHx8XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8XG4gICAgICBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodFxuICAgICk7XG4gIH1cbn1cbiJdfQ==