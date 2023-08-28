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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: CanvasService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: CanvasService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: CanvasService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR3pELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOztBQUc5RSxNQUFNLE9BQU8sYUFBYTtJQVN4QjtRQVJVLGlDQUE0QixHQUNwQyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLDZCQUF3QixHQUNoQyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVmLGlCQUFZLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO0lBRWpCLENBQUM7SUFFaEIsTUFBTSxDQUFDLFdBQW1CLEVBQUUsTUFBb0I7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDM0MsTUFBTSxtQkFBbUIsR0FBRywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFlBQVksR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELEtBQUs7UUFDSCxJ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LEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsT0FBTyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0lBRUQseUJBQXlCLENBQUMsV0FBbUI7UUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCO1lBQ3hDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxhQUFhLENBQUMsV0FBbUI7UUFDL0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQseUJBQXlCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxnQkFBd0I7UUFDekMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pELENBQUM7OEdBN0pVLGFBQWE7a0hBQWIsYUFBYTs7MkZBQWIsYUFBYTtrQkFEekIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXQgfSBmcm9tICcuLi9tb2RlbHMvdmlld2VyLWxheW91dCc7XG5pbXBvcnQgeyBDYW52YXNHcm91cHMgfSBmcm9tICcuLy4uL21vZGVscy9jYW52YXMtZ3JvdXBzJztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi8uLi9tb2RlbHMvcG9pbnQnO1xuaW1wb3J0IHsgUmVjdCB9IGZyb20gJy4vLi4vbW9kZWxzL3JlY3QnO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBTdHJhdGVneUZhY3RvcnkgfSBmcm9tICcuL2NhbnZhcy1ncm91cHMtc3RyYXRlZ3kuZmFjdG9yeSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYW52YXNTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIF9jdXJyZW50TnVtYmVyT2ZDYW52YXNHcm91cHM6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0KDApO1xuICBwcm90ZWN0ZWQgX2N1cnJlbnRDYW52YXNHcm91cEluZGV4OiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcblxuICBwcm90ZWN0ZWQgY2FudmFzR3JvdXBzOiBDYW52YXNHcm91cHMgPSBuZXcgQ2FudmFzR3JvdXBzKCk7XG4gIHByb3RlY3RlZCBfbnVtYmVyT2ZDYW52YXNlcyA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGFkZEFsbChjYW52YXNSZWN0czogUmVjdFtdLCBsYXlvdXQ6IFZpZXdlckxheW91dCkge1xuICAgIHRoaXMubnVtYmVyT2ZDYW52YXNlcyA9IGNhbnZhc1JlY3RzLmxlbmd0aDtcbiAgICBjb25zdCBjYW52YXNHcm91cFN0cmF0ZWd5ID0gQ2FudmFzR3JvdXBTdHJhdGVneUZhY3RvcnkuY3JlYXRlKGxheW91dCk7XG4gICAgdGhpcy5jYW52YXNHcm91cHMgPSBjYW52YXNHcm91cFN0cmF0ZWd5LmFkZEFsbChjYW52YXNSZWN0cyk7XG4gICAgdGhpcy5fY3VycmVudE51bWJlck9mQ2FudmFzR3JvdXBzLm5leHQodGhpcy5jYW52YXNHcm91cHMubGVuZ3RoKCkpO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5udW1iZXJPZkNhbnZhc2VzID0gMDtcbiAgICB0aGlzLl9jdXJyZW50Q2FudmFzR3JvdXBJbmRleC5uZXh0KDApO1xuICAgIHRoaXMuY2FudmFzR3JvdXBzID0gbmV3IENhbnZhc0dyb3VwcygpO1xuICB9XG5cbiAgZ2V0IG9uQ2FudmFzR3JvdXBJbmRleENoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbk51bWJlck9mQ2FudmFzR3JvdXBzQ2hhbmdlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnROdW1iZXJPZkNhbnZhc0dyb3Vwc1xuICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIHNldCBjdXJyZW50Q2FudmFzR3JvdXBJbmRleChjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLmlzV2l0aGluQm91bmRzKGN1cnJlbnRDYW52YXNHcm91cEluZGV4KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50Q2FudmFzR3JvdXBJbmRleC5uZXh0KGN1cnJlbnRDYW52YXNHcm91cEluZGV4KTtcbiAgfVxuXG4gIGdldCBjdXJyZW50Q2FudmFzR3JvdXBJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Q2FudmFzR3JvdXBJbmRleC52YWx1ZTtcbiAgfVxuXG4gIGdldCBudW1iZXJPZkNhbnZhc2VzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX251bWJlck9mQ2FudmFzZXM7XG4gIH1cblxuICBzZXQgbnVtYmVyT2ZDYW52YXNlcyhudW1iZXJPZkNhbnZhc2VzOiBudW1iZXIpIHtcbiAgICB0aGlzLl9udW1iZXJPZkNhbnZhc2VzID0gbnVtYmVyT2ZDYW52YXNlcztcbiAgfVxuXG4gIGdldCBudW1iZXJPZkNhbnZhc0dyb3VwcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc0dyb3Vwcy5sZW5ndGgoKTtcbiAgfVxuXG4gIGdldCBjdXJyZW50Q2FudmFzSW5kZXgoKTogbnVtYmVyIHtcbiAgICBjb25zdCBjYW52YXNlcyA9XG4gICAgICB0aGlzLmNhbnZhc0dyb3Vwcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwW3RoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXhdO1xuICAgIHJldHVybiBjYW52YXNlcyAmJiBjYW52YXNlcy5sZW5ndGggPj0gMSA/IGNhbnZhc2VzWzBdIDogMDtcbiAgfVxuXG4gIGlzV2l0aGluQm91bmRzKGNhbnZhc0dyb3VwSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBjYW52YXNHcm91cEluZGV4ID4gLTEgJiYgY2FudmFzR3JvdXBJbmRleCA8PSB0aGlzLm51bWJlck9mQ2FudmFzR3JvdXBzIC0gMVxuICAgICk7XG4gIH1cblxuICBpc0N1cnJlbnRDYW52YXNHcm91cFZhbGlkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzV2l0aGluQm91bmRzKHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXgpO1xuICB9XG5cbiAgLy8gUmV0dXJucyAtMSBpZiBuZXh0IGNhbnZhcyBpbmRleCBpcyBvdXQgb2YgYm91bmRzXG4gIGdldE5leHRDYW52YXNHcm91cEluZGV4KCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLmlzV2l0aGluQm91bmRzKHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXggKyAxKSkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4Kys7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXg7XG4gIH1cblxuICAvLyBSZXR1cm5zIC0xIGlmIHByZXZpb3VzIGNhbnZhcyBpbmRleCBpcyBvdXQgb2YgYm91bmRzXG4gIGdldFByZXZDYW52YXNHcm91cEluZGV4KCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLmlzV2l0aGluQm91bmRzKHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXggLSAxKSkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4LS07XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXg7XG4gIH1cblxuICBjb25zdHJhaW5Ub1JhbmdlKGNhbnZhc0dyb3Vwc0luZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChjYW52YXNHcm91cHNJbmRleCA8IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSBpZiAoY2FudmFzR3JvdXBzSW5kZXggPj0gdGhpcy5udW1iZXJPZkNhbnZhc0dyb3VwcyAtIDEpIHtcbiAgICAgIHJldHVybiB0aGlzLm51bWJlck9mQ2FudmFzR3JvdXBzIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNhbnZhc0dyb3Vwc0luZGV4O1xuICAgIH1cbiAgfVxuXG4gIGZpbmRDbG9zZXN0Q2FudmFzR3JvdXBJbmRleChwb2ludDogUG9pbnQpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc0dyb3Vwcy5maW5kQ2xvc2VzdEluZGV4KHBvaW50KTtcbiAgfVxuXG4gIGZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoY2FudmFzSW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXAuZmluZEluZGV4KGZ1bmN0aW9uIChcbiAgICAgIGNhbnZhc0ZvckNhbnZhc0dyb3VwOiBudW1iZXJbXVxuICAgICkge1xuICAgICAgcmV0dXJuIGNhbnZhc0ZvckNhbnZhc0dyb3VwLmluZGV4T2YoY2FudmFzSW5kZXgpID49IDA7XG4gICAgfSk7XG4gIH1cblxuICBmaW5kQ2FudmFzQnlDYW52YXNJbmRleChjYW52YXNJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNHcm91cHMuY2FudmFzZXNQZXJDYW52YXNHcm91cC5sZW5ndGggPT09IDBcbiAgICAgID8gLTFcbiAgICAgIDogdGhpcy5jYW52YXNHcm91cHMuY2FudmFzZXNQZXJDYW52YXNHcm91cFtjYW52YXNJbmRleF1bMF07XG4gIH1cblxuICBnZXRDYW52YXNHcm91cExhYmVsKGNhbnZhc0dyb3VwSW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc0dyb3VwUmVjdHMgfHxcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXAubGVuZ3RoID09PSAwXG4gICAgKSB7XG4gICAgICByZXR1cm4gJzEnO1xuICAgIH1cblxuICAgIGNvbnN0IGNhbnZhc0dyb3VwID1cbiAgICAgIHRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXBbY2FudmFzR3JvdXBJbmRleF07XG4gICAgbGV0IGNhbnZhc0dyb3VwTGFiZWwgPSAnJyArIChjYW52YXNHcm91cFswXSArIDEpO1xuXG4gICAgaWYgKGNhbnZhc0dyb3VwLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNhbnZhc0dyb3VwTGFiZWwgPVxuICAgICAgICBjYW52YXNHcm91cExhYmVsICsgJy0nICsgKGNhbnZhc0dyb3VwW2NhbnZhc0dyb3VwLmxlbmd0aCAtIDFdICsgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbnZhc0dyb3VwTGFiZWw7XG4gIH1cblxuICBnZXRDYW52YXNlc1BlckNhbnZhc0dyb3VwKGNhbnZhc0luZGV4OiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuICF0aGlzLmNhbnZhc0dyb3Vwcy5jYW52YXNHcm91cFJlY3RzXG4gICAgICA/IFswXVxuICAgICAgOiB0aGlzLmNhbnZhc0dyb3Vwcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwW2NhbnZhc0luZGV4XTtcbiAgfVxuXG4gIGdldENhbnZhc1JlY3QoY2FudmFzSW5kZXg6IG51bWJlcik6IFJlY3Qge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc0dyb3Vwcy5jYW52YXNSZWN0c1tjYW52YXNJbmRleF07XG4gIH1cblxuICBnZXRDdXJyZW50Q2FudmFzR3JvdXBSZWN0KCk6IFJlY3Qge1xuICAgIHJldHVybiB0aGlzLmdldENhbnZhc0dyb3VwUmVjdCh0aGlzLmN1cnJlbnRDYW52YXNHcm91cEluZGV4KTtcbiAgfVxuXG4gIGdldENhbnZhc0dyb3VwUmVjdChjYW52YXNHcm91cEluZGV4OiBudW1iZXIpOiBSZWN0IHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNHcm91cHMuZ2V0KGNhbnZhc0dyb3VwSW5kZXgpO1xuICB9XG59XG4iXX0=