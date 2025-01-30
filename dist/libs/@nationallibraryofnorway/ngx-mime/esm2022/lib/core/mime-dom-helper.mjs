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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: MimeDomHelper, deps: [{ token: i1.FullscreenService }, { token: i2.ViewerService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: MimeDomHelper }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: MimeDomHelper, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.FullscreenService }, { type: i2.ViewerService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS1kb20taGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbWltZS1kb20taGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7OztBQUdoRSxNQUFNLE9BQU8sYUFBYTtJQUN4QixZQUNVLFVBQTZCLEVBQzdCLGFBQTRCO1FBRDVCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBQzdCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ25DLENBQUM7SUFFRyxxQkFBcUIsQ0FBQyxFQUFjO1FBQ3pDLElBQUksQ0FBQztZQUNILElBQ0UsSUFBSSxDQUFDLDBCQUEwQixFQUFFO2dCQUNqQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsS0FBSyxhQUFhLEVBQzNDLENBQUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0MsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNYLE9BQU8sSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUVNLDBCQUEwQjtRQUMvQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVNLGdCQUFnQjtRQUNyQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsQ0FBQztJQUNILENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDbkMsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNQLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLENBQUM7SUFDSCxDQUFDO0lBRU8sZ0JBQWdCO1FBQ3RCLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRU8sMEJBQTBCLENBQUMsRUFBYztRQUMvQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDNUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDeEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDMUMsT0FBTyxJQUFJLFVBQVUsQ0FBQztZQUNwQixHQUFHLFVBQVU7WUFDYixHQUFHLEVBQUUsQ0FBQztZQUNOLE1BQU0sRUFBRSxNQUFNO1lBQ2QsS0FBSyxFQUFFLEtBQUs7WUFDWixNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsRUFBYztRQUNyQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDNUQsT0FBTyxJQUFJLFVBQVUsQ0FBQztZQUNwQixHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUc7WUFDbkIsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNO1lBQ3pCLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU07WUFDekIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO1lBQ3JCLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSztTQUN4QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLE9BQU8sQ0FDTCxNQUFNLENBQUMsVUFBVTtZQUNqQixRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVc7WUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQzFCLENBQUM7SUFDSixDQUFDO0lBRU8sbUJBQW1CO1FBQ3pCLE9BQU8sQ0FDTCxNQUFNLENBQUMsV0FBVztZQUNsQixRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVk7WUFDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQzNCLENBQUM7SUFDSixDQUFDOzhHQXBGVSxhQUFhO2tIQUFiLGFBQWE7OzJGQUFiLGFBQWE7a0JBRHpCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGdWxsc2NyZWVuU2VydmljZSB9IGZyb20gJy4vZnVsbHNjcmVlbi1zZXJ2aWNlL2Z1bGxzY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBEaW1lbnNpb25zIH0gZnJvbSAnLi9tb2RlbHMvZGltZW5zaW9ucyc7XG5pbXBvcnQgeyBWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNaW1lRG9tSGVscGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmdWxsc2NyZWVuOiBGdWxsc2NyZWVuU2VydmljZSxcbiAgICBwcml2YXRlIHZpZXdlclNlcnZpY2U6IFZpZXdlclNlcnZpY2UsXG4gICkge31cblxuICBwdWJsaWMgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsOiBFbGVtZW50UmVmKTogRGltZW5zaW9ucyB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5pc0RvY3VtZW50SW5GdWxsU2NyZWVuTW9kZSgpICYmXG4gICAgICAgIGVsLm5hdGl2ZUVsZW1lbnQubm9kZU5hbWUgPT09ICdNSU1FLVZJRVdFUidcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVGdWxsc2NyZWVuRGltZW5zaW9ucyhlbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVEaW1lbnNpb25zKGVsKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gbmV3IERpbWVuc2lvbnMoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNEb2N1bWVudEluRnVsbFNjcmVlbk1vZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZnVsbHNjcmVlbi5pc0Z1bGxzY3JlZW4oKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVGdWxsc2NyZWVuKCk6IHZvaWQge1xuICAgIGNvbnN0IGVsID0gdGhpcy5nZXRWaWV3ZXJFbGVtZW50KCk7XG4gICAgaWYgKGVsICYmIHRoaXMuZnVsbHNjcmVlbi5pc0VuYWJsZWQoKSkge1xuICAgICAgdGhpcy5mdWxsc2NyZWVuLnRvZ2dsZShlbCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldEZvY3VzT25WaWV3ZXIoKTogdm9pZCB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmdldFZpZXdlckVsZW1lbnQoKTtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRWaWV3ZXJFbGVtZW50KCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RoaXMudmlld2VyU2VydmljZS5pZH1gKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRnVsbHNjcmVlbkRpbWVuc2lvbnMoZWw6IEVsZW1lbnRSZWYpOiBEaW1lbnNpb25zIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuZ2V0RnVsbHNjcmVlbldpZHRoKCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5nZXRGdWxsc2NyZWVuSGVpZ2h0KCk7XG4gICAgcmV0dXJuIG5ldyBEaW1lbnNpb25zKHtcbiAgICAgIC4uLmRpbWVuc2lvbnMsXG4gICAgICB0b3A6IDAsXG4gICAgICBib3R0b206IGhlaWdodCxcbiAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgbGVmdDogMCxcbiAgICAgIHJpZ2h0OiB3aWR0aCxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRGltZW5zaW9ucyhlbDogRWxlbWVudFJlZik6IERpbWVuc2lvbnMge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiBuZXcgRGltZW5zaW9ucyh7XG4gICAgICB0b3A6IGRpbWVuc2lvbnMudG9wLFxuICAgICAgYm90dG9tOiBkaW1lbnNpb25zLmJvdHRvbSxcbiAgICAgIHdpZHRoOiBkaW1lbnNpb25zLndpZHRoLFxuICAgICAgaGVpZ2h0OiBkaW1lbnNpb25zLmhlaWdodCxcbiAgICAgIGxlZnQ6IGRpbWVuc2lvbnMubGVmdCxcbiAgICAgIHJpZ2h0OiBkaW1lbnNpb25zLnJpZ2h0LFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGdWxsc2NyZWVuV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgd2luZG93LmlubmVyV2lkdGggfHxcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fFxuICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldEZ1bGxzY3JlZW5IZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgd2luZG93LmlubmVySGVpZ2h0IHx8XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8XG4gICAgICBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodFxuICAgICk7XG4gIH1cbn1cbiJdfQ==