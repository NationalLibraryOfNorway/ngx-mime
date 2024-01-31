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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: ClickService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: ClickService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: ClickService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2suc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2NsaWNrLXNlcnZpY2UvY2xpY2suc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUczQyxNQUFNLE9BQU8sWUFBWTtJQU12QjtRQUxRLHdCQUFtQixHQUFnQyxFQUFFLENBQUM7UUFDdEQsd0JBQW1CLEdBQWdDLEVBQUUsQ0FBQztRQUN0RCxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBOEJ2QixVQUFLLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUNyQixLQUFLLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO3dCQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNqQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO3FCQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDakMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUM7SUExQ2EsQ0FBQztJQUVoQixLQUFLO1FBQ0gsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxrQkFBd0M7UUFDNUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxrQkFBd0M7UUFDNUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxLQUFVO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtZQUNoRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sa0JBQWtCLENBQUMsS0FBVTtRQUNuQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUU7WUFDaEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs4R0EvQlUsWUFBWTtrSEFBWixZQUFZOzsyRkFBWixZQUFZO2tCQUR4QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2xpY2tTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBzaW5nbGVDbGlja0hhbmRsZXJzOiBBcnJheTwoZXZlbnQ6IGFueSkgPT4gdm9pZD4gPSBbXTtcbiAgcHJpdmF0ZSBkb3VibGVDbGlja0hhbmRsZXJzOiBBcnJheTwoZXZlbnQ6IGFueSkgPT4gdm9pZD4gPSBbXTtcbiAgcHJpdmF0ZSBjbGlja0NvdW50ID0gMDtcbiAgcHJpdmF0ZSBkYmxDbGlja1RpbWVPdXQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5zaW5nbGVDbGlja0hhbmRsZXJzID0gW107XG4gICAgdGhpcy5kb3VibGVDbGlja0hhbmRsZXJzID0gW107XG4gIH1cblxuICBhZGRTaW5nbGVDbGlja0hhbmRsZXIoc2luZ2xlQ2xpY2tIYW5kbGVyOiAoZXZlbnQ6IGFueSkgPT4gdm9pZCkge1xuICAgIHRoaXMuc2luZ2xlQ2xpY2tIYW5kbGVycy5wdXNoKHNpbmdsZUNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBhZGREb3VibGVDbGlja0hhbmRsZXIoZG91YmxlQ2xpY2tIYW5kbGVyOiAoZXZlbnQ6IGFueSkgPT4gdm9pZCkge1xuICAgIHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVycy5wdXNoKGRvdWJsZUNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBwcml2YXRlIHRyaWdnZXJTaW5nbGVDbGljayhldmVudDogYW55KSB7XG4gICAgdGhpcy5zaW5nbGVDbGlja0hhbmRsZXJzLmZvckVhY2goKGhhbmRsZXI6IGFueSkgPT4ge1xuICAgICAgaGFuZGxlcihldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHRyaWdnZXJEb3VibGVDbGljayhldmVudDogYW55KSB7XG4gICAgdGhpcy5kb3VibGVDbGlja0hhbmRsZXJzLmZvckVhY2goKGhhbmRsZXI6IGFueSkgPT4ge1xuICAgICAgaGFuZGxlcihldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICBjbGljayA9IChldmVudDogYW55KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHRBY3Rpb24gPSB0cnVlO1xuICAgIGlmIChldmVudC5xdWljaykge1xuICAgICAgdGhpcy5jbGlja0NvdW50Kys7XG4gICAgICBpZiAodGhpcy5jbGlja0NvdW50ID09PSAxKSB7XG4gICAgICAgIHRoaXMuZGJsQ2xpY2tUaW1lT3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jbGlja0NvdW50ID0gMDtcbiAgICAgICAgICB0aGlzLnRyaWdnZXJTaW5nbGVDbGljayhldmVudCk7XG4gICAgICAgIH0sIGV2ZW50LnRyYWNrZXIuZGJsQ2xpY2tUaW1lVGhyZXNob2xkKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jbGlja0NvdW50ID09PSAyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRibENsaWNrVGltZU91dCk7XG4gICAgICAgIHRoaXMuY2xpY2tDb3VudCA9IDA7XG4gICAgICAgIHRoaXMudHJpZ2dlckRvdWJsZUNsaWNrKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG4iXX0=