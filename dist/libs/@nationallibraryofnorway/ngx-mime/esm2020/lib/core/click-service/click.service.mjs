import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ClickService {
    constructor() {
        this.singleClickHandlers = [];
        this.doubleClickHandlers = [];
        this.clickCount = 0;
        this.click = (event) => {
            event.preventDefaultAction = true;
            if (event.quick) {
                this.clickCount++;
                if (this.clickCount === 1) {
                    this.dblClickTimeOut = setTimeout(() => {
                        this.clickCount = 0;
                        this.triggerSingleClick(event);
                    }, event.tracker.dblClickTimeThreshold);
                }
                else if (this.clickCount === 2) {
                    clearTimeout(this.dblClickTimeOut);
                    this.clickCount = 0;
                    this.triggerDoubleClick(event);
                }
            }
        };
    }
    reset() {
        this.singleClickHandlers = [];
        this.doubleClickHandlers = [];
    }
    addSingleClickHandler(singleClickHandler) {
        this.singleClickHandlers.push(singleClickHandler);
    }
    addDoubleClickHandler(doubleClickHandler) {
        this.doubleClickHandlers.push(doubleClickHandler);
    }
    triggerSingleClick(event) {
        this.singleClickHandlers.forEach((handler) => {
            handler(event);
        });
    }
    triggerDoubleClick(event) {
        this.doubleClickHandlers.forEach((handler) => {
            handler(event);
        });
    }
}
ClickService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ClickService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ClickService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ClickService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ClickService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2suc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2NsaWNrLXNlcnZpY2UvY2xpY2suc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszQyxNQUFNLE9BQU8sWUFBWTtJQU12QjtRQUxRLHdCQUFtQixHQUFnQyxFQUFFLENBQUM7UUFDdEQsd0JBQW1CLEdBQWdDLEVBQUUsQ0FBQztRQUN0RCxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBOEJ2QixVQUFLLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUNyQixLQUFLLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDZixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTt3QkFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztpQkFDekM7cUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsRUFBRTtvQkFDaEMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDaEM7YUFDRjtRQUNILENBQUMsQ0FBQztJQTFDYSxDQUFDO0lBRWhCLEtBQUs7UUFDSCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELHFCQUFxQixDQUFDLGtCQUF3QztRQUM1RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELHFCQUFxQixDQUFDLGtCQUF3QztRQUM1RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVPLGtCQUFrQixDQUFDLEtBQVU7UUFDbkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxLQUFVO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtZQUNoRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzt5R0EvQlUsWUFBWTs2R0FBWixZQUFZLGNBRlgsTUFBTTsyRkFFUCxZQUFZO2tCQUh4QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENsaWNrU2VydmljZSB7XG4gIHByaXZhdGUgc2luZ2xlQ2xpY2tIYW5kbGVyczogQXJyYXk8KGV2ZW50OiBhbnkpID0+IHZvaWQ+ID0gW107XG4gIHByaXZhdGUgZG91YmxlQ2xpY2tIYW5kbGVyczogQXJyYXk8KGV2ZW50OiBhbnkpID0+IHZvaWQ+ID0gW107XG4gIHByaXZhdGUgY2xpY2tDb3VudCA9IDA7XG4gIHByaXZhdGUgZGJsQ2xpY2tUaW1lT3V0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc2luZ2xlQ2xpY2tIYW5kbGVycyA9IFtdO1xuICAgIHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVycyA9IFtdO1xuICB9XG5cbiAgYWRkU2luZ2xlQ2xpY2tIYW5kbGVyKHNpbmdsZUNsaWNrSGFuZGxlcjogKGV2ZW50OiBhbnkpID0+IHZvaWQpIHtcbiAgICB0aGlzLnNpbmdsZUNsaWNrSGFuZGxlcnMucHVzaChzaW5nbGVDbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgYWRkRG91YmxlQ2xpY2tIYW5kbGVyKGRvdWJsZUNsaWNrSGFuZGxlcjogKGV2ZW50OiBhbnkpID0+IHZvaWQpIHtcbiAgICB0aGlzLmRvdWJsZUNsaWNrSGFuZGxlcnMucHVzaChkb3VibGVDbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmlnZ2VyU2luZ2xlQ2xpY2soZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuc2luZ2xlQ2xpY2tIYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyOiBhbnkpID0+IHtcbiAgICAgIGhhbmRsZXIoZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmlnZ2VyRG91YmxlQ2xpY2soZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyOiBhbnkpID0+IHtcbiAgICAgIGhhbmRsZXIoZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xpY2sgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0QWN0aW9uID0gdHJ1ZTtcbiAgICBpZiAoZXZlbnQucXVpY2spIHtcbiAgICAgIHRoaXMuY2xpY2tDb3VudCsrO1xuICAgICAgaWYgKHRoaXMuY2xpY2tDb3VudCA9PT0gMSkge1xuICAgICAgICB0aGlzLmRibENsaWNrVGltZU91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2xpY2tDb3VudCA9IDA7XG4gICAgICAgICAgdGhpcy50cmlnZ2VyU2luZ2xlQ2xpY2soZXZlbnQpO1xuICAgICAgICB9LCBldmVudC50cmFja2VyLmRibENsaWNrVGltZVRocmVzaG9sZCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY2xpY2tDb3VudCA9PT0gMikge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5kYmxDbGlja1RpbWVPdXQpO1xuICAgICAgICB0aGlzLmNsaWNrQ291bnQgPSAwO1xuICAgICAgICB0aGlzLnRyaWdnZXJEb3VibGVDbGljayhldmVudCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl19