import { Injectable, NgZone } from '@angular/core';
import { interval, ReplaySubject, Subscription } from 'rxjs';
import { tap, distinctUntilChanged, filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class StyleService {
    constructor(zone) {
        this.zone = zone;
        this.colorSubject = new ReplaySubject();
    }
    get onChange() {
        return this.colorSubject.asObservable().pipe(filter((color) => color !== null), distinctUntilChanged());
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.zone.runOutsideAngular(() => {
            this.subscriptions.add(interval(1000)
                .pipe(tap(() => {
                const previousRgbColor = this.currentRgbColor;
                const currentRgbColor = this.getComputedBackgroundColor(1);
                if (previousRgbColor !== currentRgbColor) {
                    this.currentRgbColor = currentRgbColor;
                    this.colorSubject.next(currentRgbColor);
                }
            }))
                .subscribe());
        });
    }
    destroy() {
        this.subscriptions.unsubscribe();
    }
    convertToRgba(rgbColor, opacity) {
        return rgbColor.replace(/rgb/i, 'rgba').replace(/\)/i, `,${opacity})`);
    }
    getComputedBackgroundColor(opacity) {
        const matAppBackground = document.getElementsByClassName('mat-app-background');
        const matSidenavContainer = document.getElementsByTagName('mat-sidenav-container');
        if (matAppBackground.length > 0) {
            return this.getComputedStyle(matAppBackground[0], 'background-color');
        }
        else if (matSidenavContainer.length > 0) {
            return this.getComputedStyle(matSidenavContainer[0], 'background-color');
        }
        else {
            return undefined;
        }
    }
    getComputedStyle(el, property) {
        return window.getComputedStyle(el, null).getPropertyValue(property);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: StyleService, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: StyleService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: StyleService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i0.NgZone }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL3N0eWxlLXNlcnZpY2Uvc3R5bGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekUsT0FBTyxFQUFhLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHOUUsTUFBTSxPQUFPLFlBQVk7SUFLdkIsWUFBb0IsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFIeEIsaUJBQVksR0FBc0MsSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUczQyxDQUFDO0lBRXBDLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQzFDLE1BQU0sQ0FBQyxDQUFDLEtBQXlCLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsRUFDckQsb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDO2lCQUNYLElBQUksQ0FDSCxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUNQLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDOUMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLGdCQUFnQixLQUFLLGVBQWUsRUFBRSxDQUFDO29CQUN6QyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzFDLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FDSDtpQkFDQSxTQUFTLEVBQUUsQ0FDZixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVNLGFBQWEsQ0FBQyxRQUFnQixFQUFFLE9BQWU7UUFDcEQsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRU8sMEJBQTBCLENBQUMsT0FBZTtRQUNoRCxNQUFNLGdCQUFnQixHQUNwQixRQUFRLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN4RCxNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FDdkQsdUJBQXVCLENBQ3hCLENBQUM7UUFFRixJQUFJLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNoQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7YUFBTSxJQUFJLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMxQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQzNFLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQztJQUNILENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxFQUFPLEVBQUUsUUFBZ0I7UUFDaEQsT0FBTyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7OEdBNURVLFlBQVk7a0hBQVosWUFBWTs7MkZBQVosWUFBWTtrQkFEeEIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaW50ZXJ2YWwsIFJlcGxheVN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCB0YXAsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdHlsZVNlcnZpY2Uge1xuICBwcml2YXRlIGN1cnJlbnRSZ2JDb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIGNvbG9yU3ViamVjdDogUmVwbGF5U3ViamVjdDxzdHJpbmcgfCB1bmRlZmluZWQ+ID0gbmV3IFJlcGxheVN1YmplY3QoKTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zITogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lKSB7fVxuXG4gIGdldCBvbkNoYW5nZSgpOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmNvbG9yU3ViamVjdC5hc09ic2VydmFibGUoKS5waXBlKFxuICAgICAgZmlsdGVyKChjb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiBjb2xvciAhPT0gbnVsbCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgICBpbnRlcnZhbCgxMDAwKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNSZ2JDb2xvciA9IHRoaXMuY3VycmVudFJnYkNvbG9yO1xuICAgICAgICAgICAgICBjb25zdCBjdXJyZW50UmdiQ29sb3IgPSB0aGlzLmdldENvbXB1dGVkQmFja2dyb3VuZENvbG9yKDEpO1xuICAgICAgICAgICAgICBpZiAocHJldmlvdXNSZ2JDb2xvciAhPT0gY3VycmVudFJnYkNvbG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UmdiQ29sb3IgPSBjdXJyZW50UmdiQ29sb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvclN1YmplY3QubmV4dChjdXJyZW50UmdiQ29sb3IpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKClcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIGNvbnZlcnRUb1JnYmEocmdiQ29sb3I6IHN0cmluZywgb3BhY2l0eTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHJnYkNvbG9yLnJlcGxhY2UoL3JnYi9pLCAncmdiYScpLnJlcGxhY2UoL1xcKS9pLCBgLCR7b3BhY2l0eX0pYCk7XG4gIH1cblxuICBwcml2YXRlIGdldENvbXB1dGVkQmFja2dyb3VuZENvbG9yKG9wYWNpdHk6IG51bWJlcik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgbWF0QXBwQmFja2dyb3VuZCA9XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtYXQtYXBwLWJhY2tncm91bmQnKTtcbiAgICBjb25zdCBtYXRTaWRlbmF2Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXG4gICAgICAnbWF0LXNpZGVuYXYtY29udGFpbmVyJ1xuICAgICk7XG5cbiAgICBpZiAobWF0QXBwQmFja2dyb3VuZC5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRDb21wdXRlZFN0eWxlKG1hdEFwcEJhY2tncm91bmRbMF0sICdiYWNrZ3JvdW5kLWNvbG9yJyk7XG4gICAgfSBlbHNlIGlmIChtYXRTaWRlbmF2Q29udGFpbmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldENvbXB1dGVkU3R5bGUobWF0U2lkZW5hdkNvbnRhaW5lclswXSwgJ2JhY2tncm91bmQtY29sb3InKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldENvbXB1dGVkU3R5bGUoZWw6IGFueSwgcHJvcGVydHk6IHN0cmluZykge1xuICAgIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSk7XG4gIH1cbn1cbiJdfQ==