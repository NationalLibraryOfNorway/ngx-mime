import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { CanvasGroups } from './../models/canvas-groups';
import { CanvasGroupStrategyFactory } from './canvas-groups-strategy.factory';
import * as i0 from "@angular/core";
export class CanvasService {
    constructor() {
        this._currentNumberOfCanvasGroups = new BehaviorSubject(0);
        this._currentCanvasGroupIndex = new BehaviorSubject(0);
        this.canvasGroups = new CanvasGroups();
        this._numberOfCanvases = 0;
    }
    addAll(canvasRects, layout) {
        this.numberOfCanvases = canvasRects.length;
        const canvasGroupStrategy = CanvasGroupStrategyFactory.create(layout);
        this.canvasGroups = canvasGroupStrategy.addAll(canvasRects);
        this._currentNumberOfCanvasGroups.next(this.canvasGroups.length());
    }
    reset() {
        this.numberOfCanvases = 0;
        this._currentCanvasGroupIndex.next(0);
        this.canvasGroups = new CanvasGroups();
    }
    get onCanvasGroupIndexChange() {
        return this._currentCanvasGroupIndex
            .asObservable()
            .pipe(distinctUntilChanged());
    }
    get onNumberOfCanvasGroupsChange() {
        return this._currentNumberOfCanvasGroups
            .asObservable()
            .pipe(distinctUntilChanged());
    }
    set currentCanvasGroupIndex(currentCanvasGroupIndex) {
        if (!this.isWithinBounds(currentCanvasGroupIndex)) {
            return;
        }
        this._currentCanvasGroupIndex.next(currentCanvasGroupIndex);
    }
    get currentCanvasGroupIndex() {
        return this._currentCanvasGroupIndex.value;
    }
    get numberOfCanvases() {
        return this._numberOfCanvases;
    }
    set numberOfCanvases(numberOfCanvases) {
        this._numberOfCanvases = numberOfCanvases;
    }
    get numberOfCanvasGroups() {
        return this.canvasGroups.length();
    }
    get currentCanvasIndex() {
        const canvases = this.canvasGroups.canvasesPerCanvasGroup[this.currentCanvasGroupIndex];
        return canvases && canvases.length >= 1 ? canvases[0] : 0;
    }
    isWithinBounds(canvasGroupIndex) {
        return (canvasGroupIndex > -1 && canvasGroupIndex <= this.numberOfCanvasGroups - 1);
    }
    isCurrentCanvasGroupValid() {
        return this.isWithinBounds(this.currentCanvasGroupIndex);
    }
    // Returns -1 if next canvas index is out of bounds
    getNextCanvasGroupIndex() {
        if (!this.isWithinBounds(this.currentCanvasGroupIndex + 1)) {
            return -1;
        }
        this.currentCanvasGroupIndex++;
        return this.currentCanvasGroupIndex;
    }
    // Returns -1 if previous canvas index is out of bounds
    getPrevCanvasGroupIndex() {
        if (!this.isWithinBounds(this.currentCanvasGroupIndex - 1)) {
            return -1;
        }
        this.currentCanvasGroupIndex--;
        return this.currentCanvasGroupIndex;
    }
    constrainToRange(canvasGroupsIndex) {
        if (canvasGroupsIndex < 0) {
            return 0;
        }
        else if (canvasGroupsIndex >= this.numberOfCanvasGroups - 1) {
            return this.numberOfCanvasGroups - 1;
        }
        else {
            return canvasGroupsIndex;
        }
    }
    findClosestCanvasGroupIndex(point) {
        return this.canvasGroups.findClosestIndex(point);
    }
    findCanvasGroupByCanvasIndex(canvasIndex) {
        return this.canvasGroups.canvasesPerCanvasGroup.findIndex(function (canvasForCanvasGroup) {
            return canvasForCanvasGroup.indexOf(canvasIndex) >= 0;
        });
    }
    findCanvasByCanvasIndex(canvasIndex) {
        return this.canvasGroups.canvasesPerCanvasGroup.length === 0
            ? -1
            : this.canvasGroups.canvasesPerCanvasGroup[canvasIndex][0];
    }
    getCanvasGroupLabel(canvasGroupIndex) {
        if (!this.canvasGroups.canvasGroupRects ||
            this.canvasGroups.canvasesPerCanvasGroup.length === 0) {
            return '1';
        }
        const canvasGroup = this.canvasGroups.canvasesPerCanvasGroup[canvasGroupIndex];
        let canvasGroupLabel = '' + (canvasGroup[0] + 1);
        if (canvasGroup.length > 1) {
            canvasGroupLabel =
                canvasGroupLabel + '-' + (canvasGroup[canvasGroup.length - 1] + 1);
        }
        return canvasGroupLabel;
    }
    getCanvasesPerCanvasGroup(canvasIndex) {
        return !this.canvasGroups.canvasGroupRects
            ? [0]
            : this.canvasGroups.canvasesPerCanvasGroup[canvasIndex];
    }
    getCanvasRect(canvasIndex) {
        return this.canvasGroups.canvasRects[canvasIndex];
    }
    getCurrentCanvasGroupRect() {
        return this.getCanvasGroupRect(this.currentCanvasGroupIndex);
    }
    getCanvasGroupRect(canvasGroupIndex) {
        return this.canvasGroups.get(canvasGroupIndex);
    }
    getMaxHeight() {
        return this.canvasGroups.getMaxHeight();
    }
    getMaxWidth() {
        return this.canvasGroups.getMaxWidth();
    }
}
CanvasService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: CanvasService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CanvasService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: CanvasService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: CanvasService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBSXpELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOztBQUc5RSxNQUFNLE9BQU8sYUFBYTtJQVd4QjtRQVZVLGlDQUE0QixHQUVsQyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQiw2QkFBd0IsR0FFOUIsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakIsaUJBQVksR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoRCxzQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFFakIsQ0FBQztJQUVoQixNQUFNLENBQUMsV0FBbUIsRUFBRSxNQUFvQjtRQUM5QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUMzQyxNQUFNLG1CQUFtQixHQUFHLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsWUFBWSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsS0FBSztRQUNI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R0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN0RTtRQUVELE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQztJQUVELHlCQUF5QixDQUFDLFdBQW1CO1FBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQjtZQUN4QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsYUFBYSxDQUFDLFdBQW1CO1FBQy9CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELHlCQUF5QjtRQUN2QixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsZ0JBQXdCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDOzswR0F6S1UsYUFBYTs4R0FBYixhQUFhOzJGQUFiLGFBQWE7a0JBRHpCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBDYW52YXNHcm91cHMgfSBmcm9tICcuLy4uL21vZGVscy9jYW52YXMtZ3JvdXBzJztcbmltcG9ydCB7IFZpZXdlckxheW91dCB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItbGF5b3V0JztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi8uLi9tb2RlbHMvcG9pbnQnO1xuaW1wb3J0IHsgUmVjdCB9IGZyb20gJy4vLi4vbW9kZWxzL3JlY3QnO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBTdHJhdGVneUZhY3RvcnkgfSBmcm9tICcuL2NhbnZhcy1ncm91cHMtc3RyYXRlZ3kuZmFjdG9yeSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYW52YXNTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIF9jdXJyZW50TnVtYmVyT2ZDYW52YXNHcm91cHM6IEJlaGF2aW9yU3ViamVjdDxcbiAgICBudW1iZXJcbiAgPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIHByb3RlY3RlZCBfY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IEJlaGF2aW9yU3ViamVjdDxcbiAgICBudW1iZXJcbiAgPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG5cbiAgcHJvdGVjdGVkIGNhbnZhc0dyb3VwczogQ2FudmFzR3JvdXBzID0gbmV3IENhbnZhc0dyb3VwcygpO1xuICBwcm90ZWN0ZWQgX251bWJlck9mQ2FudmFzZXMgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBhZGRBbGwoY2FudmFzUmVjdHM6IFJlY3RbXSwgbGF5b3V0OiBWaWV3ZXJMYXlvdXQpIHtcbiAgICB0aGlzLm51bWJlck9mQ2FudmFzZXMgPSBjYW52YXNSZWN0cy5sZW5ndGg7XG4gICAgY29uc3QgY2FudmFzR3JvdXBTdHJhdGVneSA9IENhbnZhc0dyb3VwU3RyYXRlZ3lGYWN0b3J5LmNyZWF0ZShsYXlvdXQpO1xuICAgIHRoaXMuY2FudmFzR3JvdXBzID0gY2FudmFzR3JvdXBTdHJhdGVneS5hZGRBbGwoY2FudmFzUmVjdHMpO1xuICAgIHRoaXMuX2N1cnJlbnROdW1iZXJPZkNhbnZhc0dyb3Vwcy5uZXh0KHRoaXMuY2FudmFzR3JvdXBzLmxlbmd0aCgpKTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMubnVtYmVyT2ZDYW52YXNlcyA9IDA7XG4gICAgdGhpcy5fY3VycmVudENhbnZhc0dyb3VwSW5kZXgubmV4dCgwKTtcbiAgICB0aGlzLmNhbnZhc0dyb3VwcyA9IG5ldyBDYW52YXNHcm91cHMoKTtcbiAgfVxuXG4gIGdldCBvbkNhbnZhc0dyb3VwSW5kZXhDaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gIH1cblxuICBnZXQgb25OdW1iZXJPZkNhbnZhc0dyb3Vwc0NoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50TnVtYmVyT2ZDYW52YXNHcm91cHNcbiAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gIH1cblxuICBzZXQgY3VycmVudENhbnZhc0dyb3VwSW5kZXgoY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5pc1dpdGhpbkJvdW5kcyhjdXJyZW50Q2FudmFzR3JvdXBJbmRleCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudENhbnZhc0dyb3VwSW5kZXgubmV4dChjdXJyZW50Q2FudmFzR3JvdXBJbmRleCk7XG4gIH1cblxuICBnZXQgY3VycmVudENhbnZhc0dyb3VwSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudENhbnZhc0dyb3VwSW5kZXgudmFsdWU7XG4gIH1cblxuICBnZXQgbnVtYmVyT2ZDYW52YXNlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9udW1iZXJPZkNhbnZhc2VzO1xuICB9XG5cbiAgc2V0IG51bWJlck9mQ2FudmFzZXMobnVtYmVyT2ZDYW52YXNlczogbnVtYmVyKSB7XG4gICAgdGhpcy5fbnVtYmVyT2ZDYW52YXNlcyA9IG51bWJlck9mQ2FudmFzZXM7XG4gIH1cblxuICBnZXQgbnVtYmVyT2ZDYW52YXNHcm91cHMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNHcm91cHMubGVuZ3RoKCk7XG4gIH1cblxuICBnZXQgY3VycmVudENhbnZhc0luZGV4KCk6IG51bWJlciB7XG4gICAgY29uc3QgY2FudmFzZXMgPSB0aGlzLmNhbnZhc0dyb3Vwcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwW1xuICAgICAgdGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgIF1cbiAgICByZXR1cm4gY2FudmFzZXMgJiYgY2FudmFzZXMubGVuZ3RoID49IDEgPyBjYW52YXNlc1swXSA6IDA7XG4gIH1cblxuICBpc1dpdGhpbkJvdW5kcyhjYW52YXNHcm91cEluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgY2FudmFzR3JvdXBJbmRleCA+IC0xICYmIGNhbnZhc0dyb3VwSW5kZXggPD0gdGhpcy5udW1iZXJPZkNhbnZhc0dyb3VwcyAtIDFcbiAgICApO1xuICB9XG5cbiAgaXNDdXJyZW50Q2FudmFzR3JvdXBWYWxpZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc1dpdGhpbkJvdW5kcyh0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4KTtcbiAgfVxuXG4gIC8vIFJldHVybnMgLTEgaWYgbmV4dCBjYW52YXMgaW5kZXggaXMgb3V0IG9mIGJvdW5kc1xuICBnZXROZXh0Q2FudmFzR3JvdXBJbmRleCgpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5pc1dpdGhpbkJvdW5kcyh0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4ICsgMSkpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCsrO1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4O1xuICB9XG5cbiAgLy8gUmV0dXJucyAtMSBpZiBwcmV2aW91cyBjYW52YXMgaW5kZXggaXMgb3V0IG9mIGJvdW5kc1xuICBnZXRQcmV2Q2FudmFzR3JvdXBJbmRleCgpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5pc1dpdGhpbkJvdW5kcyh0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4IC0gMSkpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleC0tO1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4O1xuICB9XG5cbiAgY29uc3RyYWluVG9SYW5nZShjYW52YXNHcm91cHNJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoY2FudmFzR3JvdXBzSW5kZXggPCAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2UgaWYgKGNhbnZhc0dyb3Vwc0luZGV4ID49IHRoaXMubnVtYmVyT2ZDYW52YXNHcm91cHMgLSAxKSB7XG4gICAgICByZXR1cm4gdGhpcy5udW1iZXJPZkNhbnZhc0dyb3VwcyAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjYW52YXNHcm91cHNJbmRleDtcbiAgICB9XG4gIH1cblxuICBmaW5kQ2xvc2VzdENhbnZhc0dyb3VwSW5kZXgocG9pbnQ6IFBvaW50KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNHcm91cHMuZmluZENsb3Nlc3RJbmRleChwb2ludCk7XG4gIH1cblxuICBmaW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KGNhbnZhc0luZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc0dyb3Vwcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwLmZpbmRJbmRleChmdW5jdGlvbihcbiAgICAgIGNhbnZhc0ZvckNhbnZhc0dyb3VwOiBudW1iZXJbXVxuICAgICkge1xuICAgICAgcmV0dXJuIGNhbnZhc0ZvckNhbnZhc0dyb3VwLmluZGV4T2YoY2FudmFzSW5kZXgpID49IDA7XG4gICAgfSk7XG4gIH1cblxuICBmaW5kQ2FudmFzQnlDYW52YXNJbmRleChjYW52YXNJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNHcm91cHMuY2FudmFzZXNQZXJDYW52YXNHcm91cC5sZW5ndGggPT09IDBcbiAgICAgID8gLTFcbiAgICAgIDogdGhpcy5jYW52YXNHcm91cHMuY2FudmFzZXNQZXJDYW52YXNHcm91cFtjYW52YXNJbmRleF1bMF07XG4gIH1cblxuICBnZXRDYW52YXNHcm91cExhYmVsKGNhbnZhc0dyb3VwSW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc0dyb3VwUmVjdHMgfHxcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXAubGVuZ3RoID09PSAwXG4gICAgKSB7XG4gICAgICByZXR1cm4gJzEnO1xuICAgIH1cblxuICAgIGNvbnN0IGNhbnZhc0dyb3VwID0gdGhpcy5jYW52YXNHcm91cHMuY2FudmFzZXNQZXJDYW52YXNHcm91cFtcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXhcbiAgICBdO1xuICAgIGxldCBjYW52YXNHcm91cExhYmVsID0gJycgKyAoY2FudmFzR3JvdXBbMF0gKyAxKTtcblxuICAgIGlmIChjYW52YXNHcm91cC5sZW5ndGggPiAxKSB7XG4gICAgICBjYW52YXNHcm91cExhYmVsID1cbiAgICAgICAgY2FudmFzR3JvdXBMYWJlbCArICctJyArIChjYW52YXNHcm91cFtjYW52YXNHcm91cC5sZW5ndGggLSAxXSArIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBjYW52YXNHcm91cExhYmVsO1xuICB9XG5cbiAgZ2V0Q2FudmFzZXNQZXJDYW52YXNHcm91cChjYW52YXNJbmRleDogbnVtYmVyKTogbnVtYmVyW10ge1xuICAgIHJldHVybiAhdGhpcy5jYW52YXNHcm91cHMuY2FudmFzR3JvdXBSZWN0c1xuICAgICAgPyBbMF1cbiAgICAgIDogdGhpcy5jYW52YXNHcm91cHMuY2FudmFzZXNQZXJDYW52YXNHcm91cFtjYW52YXNJbmRleF07XG4gIH1cblxuICBnZXRDYW52YXNSZWN0KGNhbnZhc0luZGV4OiBudW1iZXIpOiBSZWN0IHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNHcm91cHMuY2FudmFzUmVjdHNbY2FudmFzSW5kZXhdO1xuICB9XG5cbiAgZ2V0Q3VycmVudENhbnZhc0dyb3VwUmVjdCgpOiBSZWN0IHtcbiAgICByZXR1cm4gdGhpcy5nZXRDYW52YXNHcm91cFJlY3QodGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCk7XG4gIH1cblxuICBnZXRDYW52YXNHcm91cFJlY3QoY2FudmFzR3JvdXBJbmRleDogbnVtYmVyKTogUmVjdCB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzR3JvdXBzLmdldChjYW52YXNHcm91cEluZGV4KTtcbiAgfVxuXG4gIGdldE1heEhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc0dyb3Vwcy5nZXRNYXhIZWlnaHQoKTtcbiAgfVxuXG4gIGdldE1heFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzR3JvdXBzLmdldE1heFdpZHRoKCk7XG4gIH1cbn1cbiJdfQ==