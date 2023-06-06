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
}
StyleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StyleService, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
StyleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StyleService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StyleService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL3N0eWxlLXNlcnZpY2Uvc3R5bGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekUsT0FBTyxFQUFhLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHOUUsTUFBTSxPQUFPLFlBQVk7SUFLdkIsWUFBb0IsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFIeEIsaUJBQVksR0FBc0MsSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUczQyxDQUFDO0lBRXBDLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQzFDLE1BQU0sQ0FBQyxDQUFDLEtBQXlCLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsRUFDckQsb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDO2lCQUNYLElBQUksQ0FDSCxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUNQLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDOUMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLGdCQUFnQixLQUFLLGVBQWUsRUFBRTtvQkFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUN6QztZQUNILENBQUMsQ0FBQyxDQUNIO2lCQUNBLFNBQVMsRUFBRSxDQUNmLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRU0sYUFBYSxDQUFDLFFBQWdCLEVBQUUsT0FBZTtRQUNwRCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFTywwQkFBMEIsQ0FBQyxPQUFlO1FBQ2hELE1BQU0sZ0JBQWdCLEdBQ3BCLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUN2RCx1QkFBdUIsQ0FDeEIsQ0FBQztRQUVGLElBQUksZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3ZFO2FBQU0sSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDMUU7YUFBTTtZQUNMLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUVPLGdCQUFnQixDQUFDLEVBQU8sRUFBRSxRQUFnQjtRQUNoRCxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7eUdBNURVLFlBQVk7NkdBQVosWUFBWTsyRkFBWixZQUFZO2tCQUR4QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpbnRlcnZhbCwgUmVwbGF5U3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRhcCwgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0eWxlU2VydmljZSB7XG4gIHByaXZhdGUgY3VycmVudFJnYkNvbG9yOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgY29sb3JTdWJqZWN0OiBSZXBsYXlTdWJqZWN0PHN0cmluZyB8IHVuZGVmaW5lZD4gPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMhOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHt9XG5cbiAgZ2V0IG9uQ2hhbmdlKCk6IE9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuY29sb3JTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgICBmaWx0ZXIoKGNvbG9yOiBzdHJpbmcgfCB1bmRlZmluZWQpID0+IGNvbG9yICE9PSBudWxsKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICApO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgIGludGVydmFsKDEwMDApXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBwcmV2aW91c1JnYkNvbG9yID0gdGhpcy5jdXJyZW50UmdiQ29sb3I7XG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRSZ2JDb2xvciA9IHRoaXMuZ2V0Q29tcHV0ZWRCYWNrZ3JvdW5kQ29sb3IoMSk7XG4gICAgICAgICAgICAgIGlmIChwcmV2aW91c1JnYkNvbG9yICE9PSBjdXJyZW50UmdiQ29sb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRSZ2JDb2xvciA9IGN1cnJlbnRSZ2JDb2xvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yU3ViamVjdC5uZXh0KGN1cnJlbnRSZ2JDb2xvcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgY29udmVydFRvUmdiYShyZ2JDb2xvcjogc3RyaW5nLCBvcGFjaXR5OiBudW1iZXIpIHtcbiAgICByZXR1cm4gcmdiQ29sb3IucmVwbGFjZSgvcmdiL2ksICdyZ2JhJykucmVwbGFjZSgvXFwpL2ksIGAsJHtvcGFjaXR5fSlgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29tcHV0ZWRCYWNrZ3JvdW5kQ29sb3Iob3BhY2l0eTogbnVtYmVyKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBtYXRBcHBCYWNrZ3JvdW5kID1cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21hdC1hcHAtYmFja2dyb3VuZCcpO1xuICAgIGNvbnN0IG1hdFNpZGVuYXZDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcbiAgICAgICdtYXQtc2lkZW5hdi1jb250YWluZXInXG4gICAgKTtcblxuICAgIGlmIChtYXRBcHBCYWNrZ3JvdW5kLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldENvbXB1dGVkU3R5bGUobWF0QXBwQmFja2dyb3VuZFswXSwgJ2JhY2tncm91bmQtY29sb3InKTtcbiAgICB9IGVsc2UgaWYgKG1hdFNpZGVuYXZDb250YWluZXIubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tcHV0ZWRTdHlsZShtYXRTaWRlbmF2Q29udGFpbmVyWzBdLCAnYmFja2dyb3VuZC1jb2xvcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29tcHV0ZWRTdHlsZShlbDogYW55LCBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcbiAgfVxufVxuIl19