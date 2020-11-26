import { Injectable } from '@angular/core';
export class ClickService {
    constructor() {
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
        this.reset();
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
ClickService.decorators = [
    { type: Injectable }
];
ClickService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2suc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9yb25ueW0vVGVtcC9uZ3gtbWltZS9saWJzL25neC1taW1lL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2NsaWNrLXNlcnZpY2UvY2xpY2suc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU0sT0FBTyxZQUFZO0lBTXZCO1FBSFEsZUFBVSxHQUFHLENBQUMsQ0FBQztRQWdDdkIsVUFBSyxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDckIsS0FBSyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztZQUNsQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxFQUFFO29CQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ3JDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO3dCQUNwQixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2pDLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7aUJBQ3pDO3FCQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUU7b0JBQ2hDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2hDO2FBQ0Y7UUFDSCxDQUFDLENBQUM7UUEzQ0EsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELHFCQUFxQixDQUFDLGtCQUF3QztRQUM1RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELHFCQUFxQixDQUFDLGtCQUF3QztRQUM1RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVPLGtCQUFrQixDQUFDLEtBQVU7UUFDbkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxLQUFVO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtZQUNoRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFsQ0YsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENsaWNrU2VydmljZSB7XG4gIHByaXZhdGUgc2luZ2xlQ2xpY2tIYW5kbGVyczogQXJyYXk8KGV2ZW50OiBhbnkpID0+IHZvaWQ+O1xuICBwcml2YXRlIGRvdWJsZUNsaWNrSGFuZGxlcnM6IEFycmF5PChldmVudDogYW55KSA9PiB2b2lkPjtcbiAgcHJpdmF0ZSBjbGlja0NvdW50ID0gMDtcbiAgcHJpdmF0ZSBkYmxDbGlja1RpbWVPdXQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnNpbmdsZUNsaWNrSGFuZGxlcnMgPSBbXTtcbiAgICB0aGlzLmRvdWJsZUNsaWNrSGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIGFkZFNpbmdsZUNsaWNrSGFuZGxlcihzaW5nbGVDbGlja0hhbmRsZXI6IChldmVudDogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5zaW5nbGVDbGlja0hhbmRsZXJzLnB1c2goc2luZ2xlQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIGFkZERvdWJsZUNsaWNrSGFuZGxlcihkb3VibGVDbGlja0hhbmRsZXI6IChldmVudDogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5kb3VibGVDbGlja0hhbmRsZXJzLnB1c2goZG91YmxlQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgdHJpZ2dlclNpbmdsZUNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnNpbmdsZUNsaWNrSGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlcjogYW55KSA9PiB7XG4gICAgICBoYW5kbGVyKGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdHJpZ2dlckRvdWJsZUNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmRvdWJsZUNsaWNrSGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlcjogYW55KSA9PiB7XG4gICAgICBoYW5kbGVyKGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsaWNrID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdEFjdGlvbiA9IHRydWU7XG4gICAgaWYgKGV2ZW50LnF1aWNrKSB7XG4gICAgICB0aGlzLmNsaWNrQ291bnQrKztcbiAgICAgIGlmICh0aGlzLmNsaWNrQ291bnQgPT09IDEpIHtcbiAgICAgICAgdGhpcy5kYmxDbGlja1RpbWVPdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmNsaWNrQ291bnQgPSAwO1xuICAgICAgICAgIHRoaXMudHJpZ2dlclNpbmdsZUNsaWNrKGV2ZW50KTtcbiAgICAgICAgfSwgZXZlbnQudHJhY2tlci5kYmxDbGlja1RpbWVUaHJlc2hvbGQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmNsaWNrQ291bnQgPT09IDIpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZGJsQ2xpY2tUaW1lT3V0KTtcbiAgICAgICAgdGhpcy5jbGlja0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy50cmlnZ2VyRG91YmxlQ2xpY2soZXZlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiJdfQ==