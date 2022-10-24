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
ClickService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ClickService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ClickService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2suc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2NsaWNrLXNlcnZpY2UvY2xpY2suc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUczQyxNQUFNLE9BQU8sWUFBWTtJQU12QjtRQUxRLHdCQUFtQixHQUFnQyxFQUFFLENBQUM7UUFDdEQsd0JBQW1CLEdBQWdDLEVBQUUsQ0FBQztRQUN0RCxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBOEJ2QixVQUFLLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUNyQixLQUFLLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDZixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTt3QkFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztpQkFDekM7cUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsRUFBRTtvQkFDaEMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDaEM7YUFDRjtRQUNILENBQUMsQ0FBQztJQTFDYSxDQUFDO0lBRWhCLEtBQUs7UUFDSCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELHFCQUFxQixDQUFDLGtCQUF3QztRQUM1RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELHFCQUFxQixDQUFDLGtCQUF3QztRQUM1RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVPLGtCQUFrQixDQUFDLEtBQVU7UUFDbkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxLQUFVO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtZQUNoRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzt5R0EvQlUsWUFBWTs2R0FBWixZQUFZOzJGQUFaLFlBQVk7a0JBRHhCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDbGlja1NlcnZpY2Uge1xuICBwcml2YXRlIHNpbmdsZUNsaWNrSGFuZGxlcnM6IEFycmF5PChldmVudDogYW55KSA9PiB2b2lkPiA9IFtdO1xuICBwcml2YXRlIGRvdWJsZUNsaWNrSGFuZGxlcnM6IEFycmF5PChldmVudDogYW55KSA9PiB2b2lkPiA9IFtdO1xuICBwcml2YXRlIGNsaWNrQ291bnQgPSAwO1xuICBwcml2YXRlIGRibENsaWNrVGltZU91dDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnNpbmdsZUNsaWNrSGFuZGxlcnMgPSBbXTtcbiAgICB0aGlzLmRvdWJsZUNsaWNrSGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIGFkZFNpbmdsZUNsaWNrSGFuZGxlcihzaW5nbGVDbGlja0hhbmRsZXI6IChldmVudDogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5zaW5nbGVDbGlja0hhbmRsZXJzLnB1c2goc2luZ2xlQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIGFkZERvdWJsZUNsaWNrSGFuZGxlcihkb3VibGVDbGlja0hhbmRsZXI6IChldmVudDogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5kb3VibGVDbGlja0hhbmRsZXJzLnB1c2goZG91YmxlQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgdHJpZ2dlclNpbmdsZUNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnNpbmdsZUNsaWNrSGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlcjogYW55KSA9PiB7XG4gICAgICBoYW5kbGVyKGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdHJpZ2dlckRvdWJsZUNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmRvdWJsZUNsaWNrSGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlcjogYW55KSA9PiB7XG4gICAgICBoYW5kbGVyKGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsaWNrID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdEFjdGlvbiA9IHRydWU7XG4gICAgaWYgKGV2ZW50LnF1aWNrKSB7XG4gICAgICB0aGlzLmNsaWNrQ291bnQrKztcbiAgICAgIGlmICh0aGlzLmNsaWNrQ291bnQgPT09IDEpIHtcbiAgICAgICAgdGhpcy5kYmxDbGlja1RpbWVPdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmNsaWNrQ291bnQgPSAwO1xuICAgICAgICAgIHRoaXMudHJpZ2dlclNpbmdsZUNsaWNrKGV2ZW50KTtcbiAgICAgICAgfSwgZXZlbnQudHJhY2tlci5kYmxDbGlja1RpbWVUaHJlc2hvbGQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmNsaWNrQ291bnQgPT09IDIpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZGJsQ2xpY2tUaW1lT3V0KTtcbiAgICAgICAgdGhpcy5jbGlja0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy50cmlnZ2VyRG91YmxlQ2xpY2soZXZlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiJdfQ==