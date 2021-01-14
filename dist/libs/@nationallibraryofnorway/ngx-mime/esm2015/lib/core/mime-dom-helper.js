import { FullscreenService } from './fullscreen-service/fullscreen.service';
import { Dimensions } from './models/dimensions';
import { Injectable } from '@angular/core';
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
        const el = document.getElementById('mimeViewer');
        if (this.fullscreen.isEnabled()) {
            this.fullscreen.toggle(el);
        }
    }
    setFocusOnViewer() {
        const el = document.getElementById('mimeViewer');
        if (el) {
            el.focus();
        }
    }
    createFullscreenDimensions(el) {
        const dimensions = el.nativeElement.getBoundingClientRect();
        const width = this.getFullscreenWidth();
        const height = this.getFullscreenHeight();
        return new Dimensions(Object.assign(Object.assign({}, dimensions), { top: 0, bottom: height, width: width, height: height, left: 0, right: width }));
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
MimeDomHelper.decorators = [
    { type: Injectable }
];
MimeDomHelper.ctorParameters = () => [
    { type: FullscreenService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS1kb20taGVscGVyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvcmUvbWltZS1kb20taGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3ZELE1BQU0sT0FBTyxhQUFhO0lBQ3hCLFlBQW9CLFVBQTZCO1FBQTdCLGVBQVUsR0FBVixVQUFVLENBQW1CO0lBQUcsQ0FBQztJQUU5QyxxQkFBcUIsQ0FBQyxFQUFjO1FBQ3pDLElBQUk7WUFDRixJQUNFLElBQUksQ0FBQywwQkFBMEIsRUFBRTtnQkFDakMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssYUFBYSxFQUMzQztnQkFDQSxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNsQztTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLElBQUksVUFBVSxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRU0sMEJBQTBCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRU0sZ0JBQWdCO1FBQ3JCLE1BQU0sRUFBRSxHQUFRLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVNLGdCQUFnQjtRQUNyQixNQUFNLEVBQUUsR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5RCxJQUFJLEVBQUUsRUFBRTtZQUNOLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNaO0lBQ0gsQ0FBQztJQUVPLDBCQUEwQixDQUFDLEVBQWM7UUFDL0MsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzFDLE9BQU8sSUFBSSxVQUFVLGlDQUNoQixVQUFVLEtBQ2IsR0FBRyxFQUFFLENBQUMsRUFDTixNQUFNLEVBQUUsTUFBTSxFQUNkLEtBQUssRUFBRSxLQUFLLEVBQ1osTUFBTSxFQUFFLE1BQU0sRUFDZCxJQUFJLEVBQUUsQ0FBQyxFQUNQLEtBQUssRUFBRSxLQUFLLElBQ1osQ0FBQztJQUNMLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxFQUFjO1FBQ3JDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM1RCxPQUFPLElBQUksVUFBVSxDQUFDO1lBQ3BCLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRztZQUNuQixNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU07WUFDekIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO1lBQ3ZCLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTTtZQUN6QixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7WUFDckIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO1NBQ3hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsT0FBTyxDQUNMLE1BQU0sQ0FBQyxVQUFVO1lBQ2pCLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVztZQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FDMUIsQ0FBQztJQUNKLENBQUM7SUFFTyxtQkFBbUI7UUFDekIsT0FBTyxDQUNMLE1BQU0sQ0FBQyxXQUFXO1lBQ2xCLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWTtZQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FDM0IsQ0FBQztJQUNKLENBQUM7OztZQTlFRixVQUFVOzs7WUFKRixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdWxsc2NyZWVuU2VydmljZSB9IGZyb20gJy4vZnVsbHNjcmVlbi1zZXJ2aWNlL2Z1bGxzY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBEaW1lbnNpb25zIH0gZnJvbSAnLi9tb2RlbHMvZGltZW5zaW9ucyc7XG5pbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNaW1lRG9tSGVscGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmdWxsc2NyZWVuOiBGdWxsc2NyZWVuU2VydmljZSkge31cblxuICBwdWJsaWMgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsOiBFbGVtZW50UmVmKTogRGltZW5zaW9ucyB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5pc0RvY3VtZW50SW5GdWxsU2NyZWVuTW9kZSgpICYmXG4gICAgICAgIGVsLm5hdGl2ZUVsZW1lbnQubm9kZU5hbWUgPT09ICdNSU1FLVZJRVdFUidcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVGdWxsc2NyZWVuRGltZW5zaW9ucyhlbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVEaW1lbnNpb25zKGVsKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gbmV3IERpbWVuc2lvbnMoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNEb2N1bWVudEluRnVsbFNjcmVlbk1vZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZnVsbHNjcmVlbi5pc0Z1bGxzY3JlZW4oKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVGdWxsc2NyZWVuKCk6IHZvaWQge1xuICAgIGNvbnN0IGVsID0gPGFueT5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWltZVZpZXdlcicpO1xuICAgIGlmICh0aGlzLmZ1bGxzY3JlZW4uaXNFbmFibGVkKCkpIHtcbiAgICAgIHRoaXMuZnVsbHNjcmVlbi50b2dnbGUoZWwpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRGb2N1c09uVmlld2VyKCk6IHZvaWQge1xuICAgIGNvbnN0IGVsOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW1lVmlld2VyJyk7XG4gICAgaWYgKGVsKSB7XG4gICAgICBlbC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRnVsbHNjcmVlbkRpbWVuc2lvbnMoZWw6IEVsZW1lbnRSZWYpOiBEaW1lbnNpb25zIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuZ2V0RnVsbHNjcmVlbldpZHRoKCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5nZXRGdWxsc2NyZWVuSGVpZ2h0KCk7XG4gICAgcmV0dXJuIG5ldyBEaW1lbnNpb25zKHtcbiAgICAgIC4uLmRpbWVuc2lvbnMsXG4gICAgICB0b3A6IDAsXG4gICAgICBib3R0b206IGhlaWdodCxcbiAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgbGVmdDogMCxcbiAgICAgIHJpZ2h0OiB3aWR0aFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVEaW1lbnNpb25zKGVsOiBFbGVtZW50UmVmKTogRGltZW5zaW9ucyB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IGVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIG5ldyBEaW1lbnNpb25zKHtcbiAgICAgIHRvcDogZGltZW5zaW9ucy50b3AsXG4gICAgICBib3R0b206IGRpbWVuc2lvbnMuYm90dG9tLFxuICAgICAgd2lkdGg6IGRpbWVuc2lvbnMud2lkdGgsXG4gICAgICBoZWlnaHQ6IGRpbWVuc2lvbnMuaGVpZ2h0LFxuICAgICAgbGVmdDogZGltZW5zaW9ucy5sZWZ0LFxuICAgICAgcmlnaHQ6IGRpbWVuc2lvbnMucmlnaHRcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RnVsbHNjcmVlbldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIChcbiAgICAgIHdpbmRvdy5pbm5lcldpZHRoIHx8XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHxcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGhcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGdWxsc2NyZWVuSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIChcbiAgICAgIHdpbmRvdy5pbm5lckhlaWdodCB8fFxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fFxuICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHRcbiAgICApO1xuICB9XG59XG4iXX0=