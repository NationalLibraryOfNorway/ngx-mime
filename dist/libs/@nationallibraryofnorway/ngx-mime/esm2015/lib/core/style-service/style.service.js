import { Injectable, NgZone } from '@angular/core';
import { interval, ReplaySubject } from 'rxjs';
import { tap, distinctUntilChanged, filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class StyleService {
    constructor(zone) {
        this.zone = zone;
        this.colorSubject = new ReplaySubject();
    }
    get onChange() {
        return this.colorSubject.asObservable().pipe(filter(c => c !== null), distinctUntilChanged());
    }
    init() {
        this.zone.runOutsideAngular(() => {
            interval(1000)
                .pipe(tap(() => {
                const previousRgbColor = this.currentRgbColor;
                const currentRgbColor = this.getComputedBackgroundColor(1);
                if (previousRgbColor !== currentRgbColor) {
                    this.currentRgbColor = currentRgbColor;
                    this.colorSubject.next(currentRgbColor);
                }
            }))
                .subscribe();
        });
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
            return null;
        }
    }
    getComputedStyle(el, property) {
        return window.getComputedStyle(el, null).getPropertyValue(property);
    }
}
StyleService.ɵprov = i0.ɵɵdefineInjectable({ factory: function StyleService_Factory() { return new StyleService(i0.ɵɵinject(i0.NgZone)); }, token: StyleService, providedIn: "root" });
StyleService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
StyleService.ctorParameters = () => [
    { type: NgZone }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL3N0eWxlLXNlcnZpY2Uvc3R5bGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQWEsR0FBRyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUs5RSxNQUFNLE9BQU8sWUFBWTtJQUl2QixZQUFvQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQUZ4QixpQkFBWSxHQUEwQixJQUFJLGFBQWEsRUFBRSxDQUFDO0lBRS9CLENBQUM7SUFFcEMsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FDMUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUN2QixvQkFBb0IsRUFBRSxDQUN2QixDQUFDO0lBQ0osQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUMvQixRQUFRLENBQUMsSUFBSSxDQUFDO2lCQUNYLElBQUksQ0FDSCxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUNQLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDOUMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLGdCQUFnQixLQUFLLGVBQWUsRUFBRTtvQkFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUN6QztZQUNILENBQUMsQ0FBQyxDQUNIO2lCQUNBLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLGFBQWEsQ0FBQyxRQUFnQixFQUFFLE9BQWU7UUFDcEQsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRU8sMEJBQTBCLENBQUMsT0FBZTtRQUNoRCxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FDdEQsb0JBQW9CLENBQ3JCLENBQUM7UUFDRixNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FDdkQsdUJBQXVCLENBQ3hCLENBQUM7UUFFRixJQUFJLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztTQUN2RTthQUFNLElBQUksbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1NBQzFFO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVPLGdCQUFnQixDQUFDLEVBQU8sRUFBRSxRQUFnQjtRQUNoRCxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7OztZQXhERixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQU5vQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpbnRlcnZhbCwgUmVwbGF5U3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCB0YXAsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFN0eWxlU2VydmljZSB7XG4gIHByaXZhdGUgY3VycmVudFJnYkNvbG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgY29sb3JTdWJqZWN0OiBSZXBsYXlTdWJqZWN0PHN0cmluZz4gPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lKSB7fVxuXG4gIGdldCBvbkNoYW5nZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmNvbG9yU3ViamVjdC5hc09ic2VydmFibGUoKS5waXBlKFxuICAgICAgZmlsdGVyKGMgPT4gYyAhPT0gbnVsbCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGludGVydmFsKDEwMDApXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1JnYkNvbG9yID0gdGhpcy5jdXJyZW50UmdiQ29sb3I7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UmdiQ29sb3IgPSB0aGlzLmdldENvbXB1dGVkQmFja2dyb3VuZENvbG9yKDEpO1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzUmdiQ29sb3IgIT09IGN1cnJlbnRSZ2JDb2xvcikge1xuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRSZ2JDb2xvciA9IGN1cnJlbnRSZ2JDb2xvcjtcbiAgICAgICAgICAgICAgdGhpcy5jb2xvclN1YmplY3QubmV4dChjdXJyZW50UmdiQ29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNvbnZlcnRUb1JnYmEocmdiQ29sb3I6IHN0cmluZywgb3BhY2l0eTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHJnYkNvbG9yLnJlcGxhY2UoL3JnYi9pLCAncmdiYScpLnJlcGxhY2UoL1xcKS9pLCBgLCR7b3BhY2l0eX0pYCk7XG4gIH1cblxuICBwcml2YXRlIGdldENvbXB1dGVkQmFja2dyb3VuZENvbG9yKG9wYWNpdHk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgbWF0QXBwQmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXG4gICAgICAnbWF0LWFwcC1iYWNrZ3JvdW5kJ1xuICAgICk7XG4gICAgY29uc3QgbWF0U2lkZW5hdkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFxuICAgICAgJ21hdC1zaWRlbmF2LWNvbnRhaW5lcidcbiAgICApO1xuXG4gICAgaWYgKG1hdEFwcEJhY2tncm91bmQubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tcHV0ZWRTdHlsZShtYXRBcHBCYWNrZ3JvdW5kWzBdLCAnYmFja2dyb3VuZC1jb2xvcicpO1xuICAgIH0gZWxzZSBpZiAobWF0U2lkZW5hdkNvbnRhaW5lci5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRDb21wdXRlZFN0eWxlKG1hdFNpZGVuYXZDb250YWluZXJbMF0sICdiYWNrZ3JvdW5kLWNvbG9yJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29tcHV0ZWRTdHlsZShlbDogYW55LCBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcbiAgfVxufVxuIl19