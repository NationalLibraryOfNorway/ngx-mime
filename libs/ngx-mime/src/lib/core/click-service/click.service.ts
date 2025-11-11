import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClickService {
  private singleClickHandlers: Array<(event: any) => void> = [];
  private doubleClickHandlers: Array<(event: any) => void> = [];
  private clickCount = 0;
  private dblClickTimeOut: any;

  constructor() {}

  reset(): void {
    this.singleClickHandlers = [];
    this.doubleClickHandlers = [];
  }

  addSingleClickHandler(singleClickHandler: (event: any) => void) {
    this.singleClickHandlers.push(singleClickHandler);
  }

  addDoubleClickHandler(doubleClickHandler: (event: any) => void) {
    this.doubleClickHandlers.push(doubleClickHandler);
  }

  click = (event: any) => {
    event.preventDefaultAction = true;
    if (event.quick) {
      this.clickCount++;
      if (this.clickCount === 1) {
        this.dblClickTimeOut = setTimeout(() => {
          this.clickCount = 0;
          this.triggerSingleClick(event);
        }, event.tracker.dblClickTimeThreshold);
      } else if (this.clickCount === 2) {
        clearTimeout(this.dblClickTimeOut);
        this.clickCount = 0;
        this.triggerDoubleClick(event);
      }
    }
  };

  private triggerSingleClick(event: any) {
    this.singleClickHandlers.forEach((handler: any) => {
      handler(event);
    });
  }

  private triggerDoubleClick(event: any) {
    this.doubleClickHandlers.forEach((handler: any) => {
      handler(event);
    });
  }
}
