import { Injectable } from '@angular/core';
import { FullscreenService } from './fullscreen-service/fullscreen.service';
import { Dimensions } from './models/dimensions';
import { ViewerService } from './viewer-service/viewer.service';
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
MimeDomHelper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MimeDomHelper, deps: [{ token: i1.FullscreenService }, { token: i2.ViewerService }], target: i0.ɵɵFactoryTarget.Injectable });
MimeDomHelper.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MimeDomHelper });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MimeDomHelper, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FullscreenService }, { type: i2.ViewerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS1kb20taGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbWltZS1kb20taGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7OztBQUdoRSxNQUFNLE9BQU8sYUFBYTtJQUN4QixZQUNVLFVBQTZCLEVBQzdCLGFBQTRCO1FBRDVCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBQzdCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ25DLENBQUM7SUFFRyxxQkFBcUIsQ0FBQyxFQUFjO1FBQ3pDLElBQUk7WUFDRixJQUNFLElBQUksQ0FBQywwQkFBMEIsRUFBRTtnQkFDakMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssYUFBYSxFQUMzQztnQkFDQSxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNsQztTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLElBQUksVUFBVSxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRU0sMEJBQTBCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRU0sZ0JBQWdCO1FBQ3JCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ25DLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRU0sZ0JBQWdCO1FBQ3JCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ25DLElBQUksRUFBRSxFQUFFO1lBQ04sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ1o7SUFDSCxDQUFDO0lBRU8sZ0JBQWdCO1FBQ3RCLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRU8sMEJBQTBCLENBQUMsRUFBYztRQUMvQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDNUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDeEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDMUMsT0FBTyxJQUFJLFVBQVUsQ0FBQztZQUNwQixHQUFHLFVBQVU7WUFDYixHQUFHLEVBQUUsQ0FBQztZQUNOLE1BQU0sRUFBRSxNQUFNO1lBQ2QsS0FBSyxFQUFFLEtBQUs7WUFDWixNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsRUFBYztRQUNyQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDNUQsT0FBTyxJQUFJLFVBQVUsQ0FBQztZQUNwQixHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUc7WUFDbkIsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNO1lBQ3pCLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU07WUFDekIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO1lBQ3JCLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSztTQUN4QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLE9BQU8sQ0FDTCxNQUFNLENBQUMsVUFBVTtZQUNqQixRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVc7WUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQzFCLENBQUM7SUFDSixDQUFDO0lBRU8sbUJBQW1CO1FBQ3pCLE9BQU8sQ0FDTCxNQUFNLENBQUMsV0FBVztZQUNsQixRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVk7WUFDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQzNCLENBQUM7SUFDSixDQUFDOzswR0FwRlUsYUFBYTs4R0FBYixhQUFhOzJGQUFiLGFBQWE7a0JBRHpCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGdWxsc2NyZWVuU2VydmljZSB9IGZyb20gJy4vZnVsbHNjcmVlbi1zZXJ2aWNlL2Z1bGxzY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBEaW1lbnNpb25zIH0gZnJvbSAnLi9tb2RlbHMvZGltZW5zaW9ucyc7XG5pbXBvcnQgeyBWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNaW1lRG9tSGVscGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmdWxsc2NyZWVuOiBGdWxsc2NyZWVuU2VydmljZSxcbiAgICBwcml2YXRlIHZpZXdlclNlcnZpY2U6IFZpZXdlclNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWw6IEVsZW1lbnRSZWYpOiBEaW1lbnNpb25zIHtcbiAgICB0cnkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmlzRG9jdW1lbnRJbkZ1bGxTY3JlZW5Nb2RlKCkgJiZcbiAgICAgICAgZWwubmF0aXZlRWxlbWVudC5ub2RlTmFtZSA9PT0gJ01JTUUtVklFV0VSJ1xuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUZ1bGxzY3JlZW5EaW1lbnNpb25zKGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZURpbWVuc2lvbnMoZWwpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBuZXcgRGltZW5zaW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0RvY3VtZW50SW5GdWxsU2NyZWVuTW9kZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5mdWxsc2NyZWVuLmlzRnVsbHNjcmVlbigpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUZ1bGxzY3JlZW4oKTogdm9pZCB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmdldFZpZXdlckVsZW1lbnQoKTtcbiAgICBpZiAoZWwgJiYgdGhpcy5mdWxsc2NyZWVuLmlzRW5hYmxlZCgpKSB7XG4gICAgICB0aGlzLmZ1bGxzY3JlZW4udG9nZ2xlKGVsKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0Rm9jdXNPblZpZXdlcigpOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZ2V0Vmlld2VyRWxlbWVudCgpO1xuICAgIGlmIChlbCkge1xuICAgICAgZWwuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFZpZXdlckVsZW1lbnQoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy52aWV3ZXJTZXJ2aWNlLmlkfWApO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVGdWxsc2NyZWVuRGltZW5zaW9ucyhlbDogRWxlbWVudFJlZik6IERpbWVuc2lvbnMge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5nZXRGdWxsc2NyZWVuV2lkdGgoKTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmdldEZ1bGxzY3JlZW5IZWlnaHQoKTtcbiAgICByZXR1cm4gbmV3IERpbWVuc2lvbnMoe1xuICAgICAgLi4uZGltZW5zaW9ucyxcbiAgICAgIHRvcDogMCxcbiAgICAgIGJvdHRvbTogaGVpZ2h0LFxuICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IHdpZHRoLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVEaW1lbnNpb25zKGVsOiBFbGVtZW50UmVmKTogRGltZW5zaW9ucyB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IGVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIG5ldyBEaW1lbnNpb25zKHtcbiAgICAgIHRvcDogZGltZW5zaW9ucy50b3AsXG4gICAgICBib3R0b206IGRpbWVuc2lvbnMuYm90dG9tLFxuICAgICAgd2lkdGg6IGRpbWVuc2lvbnMud2lkdGgsXG4gICAgICBoZWlnaHQ6IGRpbWVuc2lvbnMuaGVpZ2h0LFxuICAgICAgbGVmdDogZGltZW5zaW9ucy5sZWZ0LFxuICAgICAgcmlnaHQ6IGRpbWVuc2lvbnMucmlnaHQsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldEZ1bGxzY3JlZW5XaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiAoXG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCB8fFxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8XG4gICAgICBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RnVsbHNjcmVlbkhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiAoXG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgfHxcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHxcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0XG4gICAgKTtcbiAgfVxufVxuIl19