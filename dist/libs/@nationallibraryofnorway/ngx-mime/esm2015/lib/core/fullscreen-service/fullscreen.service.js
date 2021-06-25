import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
export class FullscreenService {
    constructor() {
        this.changeSubject = new ReplaySubject();
        this.onchange();
    }
    get onChange() {
        return this.changeSubject.asObservable();
    }
    isEnabled() {
        const d = document;
        return (d.fullscreenEnabled ||
            d.webkitFullscreenEnabled ||
            d.mozFullScreenEnabled ||
            d.msFullscreenEnabled);
    }
    isFullscreen() {
        const d = document;
        return (d.fullscreenElement ||
            d.webkitFullscreenElement ||
            d.mozFullScreenElement ||
            d.msFullscreenElement);
    }
    toggle(el) {
        this.isFullscreen() ? this.closeFullscreen(el) : this.openFullscreen(el);
    }
    onchange() {
        const d = document;
        const func = () => {
            this.changeSubject.next(true);
        };
        if (d.fullscreenEnabled) {
            document.addEventListener('fullscreenchange', func);
        }
        else if (d.webkitFullscreenEnabled) {
            document.addEventListener('webkitfullscreenchange', func);
        }
        else if (d.mozFullScreenEnabled) {
            document.addEventListener('mozfullscreenchange', func);
        }
        else if (d.msFullscreenEnabled) {
            document.addEventListener('msfullscreenchange', func);
        }
    }
    openFullscreen(elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        }
        else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
        else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }
    closeFullscreen(elem) {
        const d = document;
        if (d.exitFullscreen) {
            d.exitFullscreen();
        }
        else if (d.mozCancelFullScreen) {
            d.mozCancelFullScreen();
        }
        else if (d.webkitExitFullscreen) {
            d.webkitExitFullscreen();
        }
        else if (d.msExitFullscreen) {
            d.msExitFullscreen();
        }
    }
}
FullscreenService.decorators = [
    { type: Injectable }
];
FullscreenService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbHNjcmVlbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvZnVsbHNjcmVlbi1zZXJ2aWNlL2Z1bGxzY3JlZW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHakQsTUFBTSxPQUFPLGlCQUFpQjtJQUc1QjtRQUZRLGtCQUFhLEdBQTJCLElBQUksYUFBYSxFQUFFLENBQUM7UUFHbEUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVNLFNBQVM7UUFDZCxNQUFNLENBQUMsR0FBUSxRQUFRLENBQUM7UUFDeEIsT0FBTyxDQUNMLENBQUMsQ0FBQyxpQkFBaUI7WUFDbkIsQ0FBQyxDQUFDLHVCQUF1QjtZQUN6QixDQUFDLENBQUMsb0JBQW9CO1lBQ3RCLENBQUMsQ0FBQyxtQkFBbUIsQ0FDdEIsQ0FBQztJQUNKLENBQUM7SUFFTSxZQUFZO1FBQ2pCLE1BQU0sQ0FBQyxHQUFRLFFBQVEsQ0FBQztRQUN4QixPQUFPLENBQ0wsQ0FBQyxDQUFDLGlCQUFpQjtZQUNuQixDQUFDLENBQUMsdUJBQXVCO1lBQ3pCLENBQUMsQ0FBQyxvQkFBb0I7WUFDdEIsQ0FBQyxDQUFDLG1CQUFtQixDQUN0QixDQUFDO0lBQ0osQ0FBQztJQUVNLE1BQU0sQ0FBQyxFQUFlO1FBQzNCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRU0sUUFBUTtRQUNiLE1BQU0sQ0FBQyxHQUFRLFFBQVEsQ0FBQztRQUV4QixNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7WUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLENBQUMsaUJBQWlCLEVBQUU7WUFDdkIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JEO2FBQU0sSUFBSSxDQUFDLENBQUMsdUJBQXVCLEVBQUU7WUFDcEMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzNEO2FBQU0sSUFBSSxDQUFDLENBQUMsb0JBQW9CLEVBQUU7WUFDakMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3hEO2FBQU0sSUFBSSxDQUFDLENBQUMsbUJBQW1CLEVBQUU7WUFDaEMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQztJQUVPLGNBQWMsQ0FBQyxJQUFTO1FBQzlCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO2FBQU0sSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDcEMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7YUFBTSxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUN2QyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztTQUNoQzthQUFNLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQ25DLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVPLGVBQWUsQ0FBQyxJQUFTO1FBQy9CLE1BQU0sQ0FBQyxHQUFRLFFBQVEsQ0FBQztRQUN4QixJQUFJLENBQUMsQ0FBQyxjQUFjLEVBQUU7WUFDcEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3BCO2FBQU0sSUFBSSxDQUFDLENBQUMsbUJBQW1CLEVBQUU7WUFDaEMsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDekI7YUFBTSxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsRUFBRTtZQUNqQyxDQUFDLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUMxQjthQUFNLElBQUksQ0FBQyxDQUFDLGdCQUFnQixFQUFFO1lBQzdCLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQzs7O1lBN0VGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGdWxsc2NyZWVuU2VydmljZSB7XG4gIHByaXZhdGUgY2hhbmdlU3ViamVjdDogUmVwbGF5U3ViamVjdDxib29sZWFuPiA9IG5ldyBSZXBsYXlTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vbmNoYW5nZSgpO1xuICB9XG5cbiAgZ2V0IG9uQ2hhbmdlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmNoYW5nZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgaXNFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGQ6IGFueSA9IGRvY3VtZW50O1xuICAgIHJldHVybiAoXG4gICAgICBkLmZ1bGxzY3JlZW5FbmFibGVkIHx8XG4gICAgICBkLndlYmtpdEZ1bGxzY3JlZW5FbmFibGVkIHx8XG4gICAgICBkLm1vekZ1bGxTY3JlZW5FbmFibGVkIHx8XG4gICAgICBkLm1zRnVsbHNjcmVlbkVuYWJsZWRcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGlzRnVsbHNjcmVlbigpOiBib29sZWFuIHtcbiAgICBjb25zdCBkOiBhbnkgPSBkb2N1bWVudDtcbiAgICByZXR1cm4gKFxuICAgICAgZC5mdWxsc2NyZWVuRWxlbWVudCB8fFxuICAgICAgZC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCB8fFxuICAgICAgZC5tb3pGdWxsU2NyZWVuRWxlbWVudCB8fFxuICAgICAgZC5tc0Z1bGxzY3JlZW5FbGVtZW50XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGUoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5pc0Z1bGxzY3JlZW4oKSA/IHRoaXMuY2xvc2VGdWxsc2NyZWVuKGVsKSA6IHRoaXMub3BlbkZ1bGxzY3JlZW4oZWwpO1xuICB9XG5cbiAgcHVibGljIG9uY2hhbmdlKCkge1xuICAgIGNvbnN0IGQ6IGFueSA9IGRvY3VtZW50O1xuXG4gICAgY29uc3QgZnVuYyA9ICgpID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlU3ViamVjdC5uZXh0KHRydWUpO1xuICAgIH07XG5cbiAgICBpZiAoZC5mdWxsc2NyZWVuRW5hYmxlZCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNjcmVlbmNoYW5nZScsIGZ1bmMpO1xuICAgIH0gZWxzZSBpZiAoZC53ZWJraXRGdWxsc2NyZWVuRW5hYmxlZCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIGZ1bmMpO1xuICAgIH0gZWxzZSBpZiAoZC5tb3pGdWxsU2NyZWVuRW5hYmxlZCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW96ZnVsbHNjcmVlbmNoYW5nZScsIGZ1bmMpO1xuICAgIH0gZWxzZSBpZiAoZC5tc0Z1bGxzY3JlZW5FbmFibGVkKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtc2Z1bGxzY3JlZW5jaGFuZ2UnLCBmdW5jKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9wZW5GdWxsc2NyZWVuKGVsZW06IGFueSkge1xuICAgIGlmIChlbGVtLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICBlbGVtLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgfSBlbHNlIGlmIChlbGVtLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICBlbGVtLm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgfSBlbHNlIGlmIChlbGVtLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICBlbGVtLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgfSBlbHNlIGlmIChlbGVtLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGVsZW0ubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VGdWxsc2NyZWVuKGVsZW06IGFueSkge1xuICAgIGNvbnN0IGQgPSA8YW55PmRvY3VtZW50O1xuICAgIGlmIChkLmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICBkLmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgfSBlbHNlIGlmIChkLm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgIGQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgIH0gZWxzZSBpZiAoZC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgICAgZC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICAgIH0gZWxzZSBpZiAoZC5tc0V4aXRGdWxsc2NyZWVuKSB7XG4gICAgICBkLm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==