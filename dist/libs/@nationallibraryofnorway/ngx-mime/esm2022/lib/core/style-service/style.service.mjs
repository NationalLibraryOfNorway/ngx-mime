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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL3N0eWxlLXNlcnZpY2Uvc3R5bGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekUsT0FBTyxFQUFhLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHOUUsTUFBTSxPQUFPLFlBQVk7SUFLdkIsWUFBb0IsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFIeEIsaUJBQVksR0FBc0MsSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUczQyxDQUFDO0lBRXBDLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQzFDLE1BQU0sQ0FBQyxDQUFDLEtBQXlCLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsRUFDckQsb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDO2lCQUNYLElBQUksQ0FDSCxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUNQLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDOUMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLGdCQUFnQixLQUFLLGVBQWUsRUFBRSxDQUFDO29CQUN6QyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzFDLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FDSDtpQkFDQSxTQUFTLEVBQUUsQ0FDZixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVNLGFBQWEsQ0FBQyxRQUFnQixFQUFFLE9BQWU7UUFDcEQsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRU8sMEJBQTBCLENBQUMsT0FBZTtRQUNoRCxNQUFNLGdCQUFnQixHQUNwQixRQUFRLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN4RCxNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FDdkQsdUJBQXVCLENBQ3hCLENBQUM7UUFFRixJQUFJLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNoQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7YUFBTSxJQUFJLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMxQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQzNFLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQztJQUNILENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxFQUFPLEVBQUUsUUFBZ0I7UUFDaEQsT0FBTyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7OEdBNURVLFlBQVk7a0hBQVosWUFBWTs7MkZBQVosWUFBWTtrQkFEeEIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaW50ZXJ2YWwsIFJlcGxheVN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCB0YXAsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdHlsZVNlcnZpY2Uge1xuICBwcml2YXRlIGN1cnJlbnRSZ2JDb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIGNvbG9yU3ViamVjdDogUmVwbGF5U3ViamVjdDxzdHJpbmcgfCB1bmRlZmluZWQ+ID0gbmV3IFJlcGxheVN1YmplY3QoKTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zITogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lKSB7fVxuXG4gIGdldCBvbkNoYW5nZSgpOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmNvbG9yU3ViamVjdC5hc09ic2VydmFibGUoKS5waXBlKFxuICAgICAgZmlsdGVyKChjb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiBjb2xvciAhPT0gbnVsbCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICk7XG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgICAgaW50ZXJ2YWwoMTAwMClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzUmdiQ29sb3IgPSB0aGlzLmN1cnJlbnRSZ2JDb2xvcjtcbiAgICAgICAgICAgICAgY29uc3QgY3VycmVudFJnYkNvbG9yID0gdGhpcy5nZXRDb21wdXRlZEJhY2tncm91bmRDb2xvcigxKTtcbiAgICAgICAgICAgICAgaWYgKHByZXZpb3VzUmdiQ29sb3IgIT09IGN1cnJlbnRSZ2JDb2xvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFJnYkNvbG9yID0gY3VycmVudFJnYkNvbG9yO1xuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JTdWJqZWN0Lm5leHQoY3VycmVudFJnYkNvbG9yKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIGNvbnZlcnRUb1JnYmEocmdiQ29sb3I6IHN0cmluZywgb3BhY2l0eTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHJnYkNvbG9yLnJlcGxhY2UoL3JnYi9pLCAncmdiYScpLnJlcGxhY2UoL1xcKS9pLCBgLCR7b3BhY2l0eX0pYCk7XG4gIH1cblxuICBwcml2YXRlIGdldENvbXB1dGVkQmFja2dyb3VuZENvbG9yKG9wYWNpdHk6IG51bWJlcik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgbWF0QXBwQmFja2dyb3VuZCA9XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtYXQtYXBwLWJhY2tncm91bmQnKTtcbiAgICBjb25zdCBtYXRTaWRlbmF2Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXG4gICAgICAnbWF0LXNpZGVuYXYtY29udGFpbmVyJyxcbiAgICApO1xuXG4gICAgaWYgKG1hdEFwcEJhY2tncm91bmQubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tcHV0ZWRTdHlsZShtYXRBcHBCYWNrZ3JvdW5kWzBdLCAnYmFja2dyb3VuZC1jb2xvcicpO1xuICAgIH0gZWxzZSBpZiAobWF0U2lkZW5hdkNvbnRhaW5lci5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRDb21wdXRlZFN0eWxlKG1hdFNpZGVuYXZDb250YWluZXJbMF0sICdiYWNrZ3JvdW5kLWNvbG9yJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb21wdXRlZFN0eWxlKGVsOiBhbnksIHByb3BlcnR5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpO1xuICB9XG59XG4iXX0=