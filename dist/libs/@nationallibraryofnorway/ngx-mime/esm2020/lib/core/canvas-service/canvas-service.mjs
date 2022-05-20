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
}
CanvasService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: CanvasService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CanvasService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: CanvasService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: CanvasService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR3pELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOztBQUs5RSxNQUFNLE9BQU8sYUFBYTtJQVN4QjtRQVJVLGlDQUE0QixHQUNwQyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLDZCQUF3QixHQUNoQyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVmLGlCQUFZLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO0lBRWpCLENBQUM7SUFFaEIsTUFBTSxDQUFDLFdBQW1CLEVBQUUsTUFBb0I7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDM0MsTUFBTSxtQkFBbUIsR0FBRywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFlBQVksR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELEtBQUs7UUFDSCxJ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LEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsT0FBTyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0lBRUQseUJBQXlCLENBQUMsV0FBbUI7UUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCO1lBQ3hDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxhQUFhLENBQUMsV0FBbUI7UUFDL0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQseUJBQXlCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxnQkFBd0I7UUFDekMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pELENBQUM7OzBHQTdKVSxhQUFhOzhHQUFiLGFBQWEsY0FGWixNQUFNOzJGQUVQLGFBQWE7a0JBSHpCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFZpZXdlckxheW91dCB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItbGF5b3V0JztcbmltcG9ydCB7IENhbnZhc0dyb3VwcyB9IGZyb20gJy4vLi4vbW9kZWxzL2NhbnZhcy1ncm91cHMnO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLy4uL21vZGVscy9wb2ludCc7XG5pbXBvcnQgeyBSZWN0IH0gZnJvbSAnLi8uLi9tb2RlbHMvcmVjdCc7XG5pbXBvcnQgeyBDYW52YXNHcm91cFN0cmF0ZWd5RmFjdG9yeSB9IGZyb20gJy4vY2FudmFzLWdyb3Vwcy1zdHJhdGVneS5mYWN0b3J5JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENhbnZhc1NlcnZpY2Uge1xuICBwcm90ZWN0ZWQgX2N1cnJlbnROdW1iZXJPZkNhbnZhc0dyb3VwczogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIHByb3RlY3RlZCBfY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0KDApO1xuXG4gIHByb3RlY3RlZCBjYW52YXNHcm91cHM6IENhbnZhc0dyb3VwcyA9IG5ldyBDYW52YXNHcm91cHMoKTtcbiAgcHJvdGVjdGVkIF9udW1iZXJPZkNhbnZhc2VzID0gMDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgYWRkQWxsKGNhbnZhc1JlY3RzOiBSZWN0W10sIGxheW91dDogVmlld2VyTGF5b3V0KSB7XG4gICAgdGhpcy5udW1iZXJPZkNhbnZhc2VzID0gY2FudmFzUmVjdHMubGVuZ3RoO1xuICAgIGNvbnN0IGNhbnZhc0dyb3VwU3RyYXRlZ3kgPSBDYW52YXNHcm91cFN0cmF0ZWd5RmFjdG9yeS5jcmVhdGUobGF5b3V0KTtcbiAgICB0aGlzLmNhbnZhc0dyb3VwcyA9IGNhbnZhc0dyb3VwU3RyYXRlZ3kuYWRkQWxsKGNhbnZhc1JlY3RzKTtcbiAgICB0aGlzLl9jdXJyZW50TnVtYmVyT2ZDYW52YXNHcm91cHMubmV4dCh0aGlzLmNhbnZhc0dyb3Vwcy5sZW5ndGgoKSk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLm51bWJlck9mQ2FudmFzZXMgPSAwO1xuICAgIHRoaXMuX2N1cnJlbnRDYW52YXNHcm91cEluZGV4Lm5leHQoMCk7XG4gICAgdGhpcy5jYW52YXNHcm91cHMgPSBuZXcgQ2FudmFzR3JvdXBzKCk7XG4gIH1cblxuICBnZXQgb25DYW52YXNHcm91cEluZGV4Q2hhbmdlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IG9uTnVtYmVyT2ZDYW52YXNHcm91cHNDaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudE51bWJlck9mQ2FudmFzR3JvdXBzXG4gICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgc2V0IGN1cnJlbnRDYW52YXNHcm91cEluZGV4KGN1cnJlbnRDYW52YXNHcm91cEluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuaXNXaXRoaW5Cb3VuZHMoY3VycmVudENhbnZhc0dyb3VwSW5kZXgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRDYW52YXNHcm91cEluZGV4Lm5leHQoY3VycmVudENhbnZhc0dyb3VwSW5kZXgpO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRDYW52YXNHcm91cEluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRDYW52YXNHcm91cEluZGV4LnZhbHVlO1xuICB9XG5cbiAgZ2V0IG51bWJlck9mQ2FudmFzZXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZDYW52YXNlcztcbiAgfVxuXG4gIHNldCBudW1iZXJPZkNhbnZhc2VzKG51bWJlck9mQ2FudmFzZXM6IG51bWJlcikge1xuICAgIHRoaXMuX251bWJlck9mQ2FudmFzZXMgPSBudW1iZXJPZkNhbnZhc2VzO1xuICB9XG5cbiAgZ2V0IG51bWJlck9mQ2FudmFzR3JvdXBzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzR3JvdXBzLmxlbmd0aCgpO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRDYW52YXNJbmRleCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGNhbnZhc2VzID1cbiAgICAgIHRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXBbdGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleF07XG4gICAgcmV0dXJuIGNhbnZhc2VzICYmIGNhbnZhc2VzLmxlbmd0aCA+PSAxID8gY2FudmFzZXNbMF0gOiAwO1xuICB9XG5cbiAgaXNXaXRoaW5Cb3VuZHMoY2FudmFzR3JvdXBJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXggPiAtMSAmJiBjYW52YXNHcm91cEluZGV4IDw9IHRoaXMubnVtYmVyT2ZDYW52YXNHcm91cHMgLSAxXG4gICAgKTtcbiAgfVxuXG4gIGlzQ3VycmVudENhbnZhc0dyb3VwVmFsaWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNXaXRoaW5Cb3VuZHModGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCk7XG4gIH1cblxuICAvLyBSZXR1cm5zIC0xIGlmIG5leHQgY2FudmFzIGluZGV4IGlzIG91dCBvZiBib3VuZHNcbiAgZ2V0TmV4dENhbnZhc0dyb3VwSW5kZXgoKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuaXNXaXRoaW5Cb3VuZHModGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCArIDEpKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXgrKztcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleDtcbiAgfVxuXG4gIC8vIFJldHVybnMgLTEgaWYgcHJldmlvdXMgY2FudmFzIGluZGV4IGlzIG91dCBvZiBib3VuZHNcbiAgZ2V0UHJldkNhbnZhc0dyb3VwSW5kZXgoKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuaXNXaXRoaW5Cb3VuZHModGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCAtIDEpKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXgtLTtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleDtcbiAgfVxuXG4gIGNvbnN0cmFpblRvUmFuZ2UoY2FudmFzR3JvdXBzSW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKGNhbnZhc0dyb3Vwc0luZGV4IDwgMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIGlmIChjYW52YXNHcm91cHNJbmRleCA+PSB0aGlzLm51bWJlck9mQ2FudmFzR3JvdXBzIC0gMSkge1xuICAgICAgcmV0dXJuIHRoaXMubnVtYmVyT2ZDYW52YXNHcm91cHMgLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2FudmFzR3JvdXBzSW5kZXg7XG4gICAgfVxuICB9XG5cbiAgZmluZENsb3Nlc3RDYW52YXNHcm91cEluZGV4KHBvaW50OiBQb2ludCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzR3JvdXBzLmZpbmRDbG9zZXN0SW5kZXgocG9pbnQpO1xuICB9XG5cbiAgZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChjYW52YXNJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNHcm91cHMuY2FudmFzZXNQZXJDYW52YXNHcm91cC5maW5kSW5kZXgoZnVuY3Rpb24gKFxuICAgICAgY2FudmFzRm9yQ2FudmFzR3JvdXA6IG51bWJlcltdXG4gICAgKSB7XG4gICAgICByZXR1cm4gY2FudmFzRm9yQ2FudmFzR3JvdXAuaW5kZXhPZihjYW52YXNJbmRleCkgPj0gMDtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRDYW52YXNCeUNhbnZhc0luZGV4KGNhbnZhc0luZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc0dyb3Vwcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwLmxlbmd0aCA9PT0gMFxuICAgICAgPyAtMVxuICAgICAgOiB0aGlzLmNhbnZhc0dyb3Vwcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwW2NhbnZhc0luZGV4XVswXTtcbiAgfVxuXG4gIGdldENhbnZhc0dyb3VwTGFiZWwoY2FudmFzR3JvdXBJbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5jYW52YXNHcm91cHMuY2FudmFzR3JvdXBSZWN0cyB8fFxuICAgICAgdGhpcy5jYW52YXNHcm91cHMuY2FudmFzZXNQZXJDYW52YXNHcm91cC5sZW5ndGggPT09IDBcbiAgICApIHtcbiAgICAgIHJldHVybiAnMSc7XG4gICAgfVxuXG4gICAgY29uc3QgY2FudmFzR3JvdXAgPVxuICAgICAgdGhpcy5jYW52YXNHcm91cHMuY2FudmFzZXNQZXJDYW52YXNHcm91cFtjYW52YXNHcm91cEluZGV4XTtcbiAgICBsZXQgY2FudmFzR3JvdXBMYWJlbCA9ICcnICsgKGNhbnZhc0dyb3VwWzBdICsgMSk7XG5cbiAgICBpZiAoY2FudmFzR3JvdXAubGVuZ3RoID4gMSkge1xuICAgICAgY2FudmFzR3JvdXBMYWJlbCA9XG4gICAgICAgIGNhbnZhc0dyb3VwTGFiZWwgKyAnLScgKyAoY2FudmFzR3JvdXBbY2FudmFzR3JvdXAubGVuZ3RoIC0gMV0gKyAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2FudmFzR3JvdXBMYWJlbDtcbiAgfVxuXG4gIGdldENhbnZhc2VzUGVyQ2FudmFzR3JvdXAoY2FudmFzSW5kZXg6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICByZXR1cm4gIXRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc0dyb3VwUmVjdHNcbiAgICAgID8gWzBdXG4gICAgICA6IHRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXBbY2FudmFzSW5kZXhdO1xuICB9XG5cbiAgZ2V0Q2FudmFzUmVjdChjYW52YXNJbmRleDogbnVtYmVyKTogUmVjdCB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc1JlY3RzW2NhbnZhc0luZGV4XTtcbiAgfVxuXG4gIGdldEN1cnJlbnRDYW52YXNHcm91cFJlY3QoKTogUmVjdCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FudmFzR3JvdXBSZWN0KHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXgpO1xuICB9XG5cbiAgZ2V0Q2FudmFzR3JvdXBSZWN0KGNhbnZhc0dyb3VwSW5kZXg6IG51bWJlcik6IFJlY3Qge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc0dyb3Vwcy5nZXQoY2FudmFzR3JvdXBJbmRleCk7XG4gIH1cbn1cbiJdfQ==