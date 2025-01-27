import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { CanvasService } from '../../canvas-service/canvas-service';
import { IiifContentSearchService } from '../../iiif-content-search-service/iiif-content-search.service';
import * as i0 from "@angular/core";
import * as i1 from "../../canvas-service/canvas-service";
import * as i2 from "../../iiif-content-search-service/iiif-content-search.service";
export class ContentSearchNavigationService {
    constructor(canvasService, iiifContentSearchService) {
        this.canvasService = canvasService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.currentIndex = 0;
        this.lastHitIndex = 0;
        this.isHitOnActiveCanvasGroup = false;
        this.currentHit = null;
        this.canvasesPerCanvasGroup = [-1];
        this.searchResult = null;
        this._currentHitCounter$ = new Subject();
        this.initialize();
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((result) => {
            this.searchResult = result;
            this.currentHit = null;
            this.update(this.canvasService.currentCanvasGroupIndex);
        }));
    }
    destroy() {
        this.subscriptions.unsubscribe();
    }
    update(canvasGroupIndex) {
        this.canvasesPerCanvasGroup =
            this.canvasService.getCanvasesPerCanvasGroup(canvasGroupIndex);
        this.currentIndex = this.findCurrentHitIndex(this.canvasesPerCanvasGroup);
        this.lastHitIndex = this.findLastHitIndex(this.canvasesPerCanvasGroup);
        this.isHitOnActiveCanvasGroup = this.findHitOnActiveCanvasGroup();
        this._currentHitCounter$.next(this.updateCurrentHitCounter());
    }
    get currentHitCounter() {
        return this._currentHitCounter$.pipe(distinctUntilChanged());
    }
    getHitOnActiveCanvasGroup() {
        return this.isHitOnActiveCanvasGroup;
    }
    goToNextHit() {
        if (this.isCurrentHitOnCurrentCanvasGroup()) {
            this.goToNextCurrentCanvasHit();
        }
        else {
            this.goToNextCanvasHit();
        }
    }
    goToPreviousHit() {
        if (this.isCurrentHitOnCurrentCanvasGroup()) {
            this.goToPreviousCurrentCanvasHit();
        }
        else {
            this.goToPreviousCanvasHit();
        }
    }
    selected(hit) {
        this.currentHit = hit;
        this._currentHitCounter$.next(this.currentHit.id);
        this.currentIndex = this.currentHit.index;
        this.iiifContentSearchService.selected(hit);
    }
    updateCurrentHitCounter() {
        if (this.isCurrentHitOnCurrentCanvasGroup()) {
            if (this.currentHit) {
                return this.currentHit.id;
            }
        }
        if (this.isHitOnActiveCanvasGroup) {
            return this.currentIndex;
        }
        else {
            return this.lastHitIndex;
        }
    }
    goToNextCurrentCanvasHit() {
        if (this.searchResult && this.currentHit) {
            const currentHitId = this.currentHit.id;
            if (currentHitId < this.searchResult.hits.length - 1) {
                this.selected(this.searchResult.hits[currentHitId + 1]);
            }
        }
    }
    goToPreviousCurrentCanvasHit() {
        if (this.searchResult && this.currentHit) {
            const currentHitId = this.currentHit.id;
            if (currentHitId > 0) {
                this.selected(this.searchResult.hits[this.currentHit.id - 1]);
            }
        }
    }
    goToNextCanvasHit() {
        if (this.searchResult) {
            let nextHit;
            if (this.currentIndex === -1) {
                nextHit = this.searchResult.get(0);
            }
            else {
                if (this.isHitOnActiveCanvasGroup) {
                    nextHit = this.searchResult.hits.find((hit) => hit.id === this.currentIndex);
                }
                else {
                    const current = this.searchResult.get(this.currentIndex);
                    const canvasGroup = this.canvasService.findCanvasGroupByCanvasIndex(current.index);
                    const canvasesPerCanvasGroup = this.canvasService.getCanvasesPerCanvasGroup(canvasGroup);
                    const lastCanvasGroupIndex = this.getLastCanvasGroupIndex(canvasesPerCanvasGroup);
                    nextHit = this.searchResult.hits.find((h) => h.index > lastCanvasGroupIndex);
                }
            }
            if (nextHit) {
                this.selected(nextHit);
            }
        }
    }
    goToPreviousCanvasHit() {
        if (this.searchResult) {
            if (this.isHitOnActiveCanvasGroup) {
                this.selected(this.searchResult.hits[this.currentIndex]);
            }
            else {
                this.selected(this.searchResult.hits[this.lastHitIndex]);
            }
        }
    }
    findHitOnActiveCanvasGroup() {
        if (!this.searchResult || this.currentIndex === -1) {
            return false;
        }
        return (this.canvasesPerCanvasGroup?.indexOf(this.searchResult.get(this.currentIndex).index) >= 0);
    }
    findCurrentHitIndex(canvasGroupIndexes) {
        if (!this.searchResult) {
            return -1;
        }
        if (canvasGroupIndexes) {
            for (let i = 0; i < this.searchResult.size(); i++) {
                const hit = this.searchResult.get(i);
                if (canvasGroupIndexes.indexOf(hit.index) >= 0) {
                    return i;
                }
                if (hit.index >= canvasGroupIndexes[canvasGroupIndexes.length - 1]) {
                    if (i === 0) {
                        return -1;
                    }
                    else {
                        const phit = this.searchResult.get(i - 1);
                        return this.searchResult.hits.findIndex((sr) => sr.index === phit.index);
                    }
                }
            }
        }
        return this.searchResult.size() - 1;
    }
    findLastHitIndex(canvasGroupIndexes) {
        if (!this.searchResult || !canvasGroupIndexes) {
            return -1;
        }
        const hits = this.searchResult.hits.filter((hit) => hit.index < canvasGroupIndexes[0]);
        return hits.length > 0 ? hits[hits.length - 1].id : -1;
    }
    getLastCanvasGroupIndex(canvasesPerCanvasGroup) {
        return canvasesPerCanvasGroup.length === 1
            ? canvasesPerCanvasGroup[0]
            : canvasesPerCanvasGroup[1];
    }
    isCurrentHitOnCurrentCanvasGroup() {
        if (this.currentHit) {
            const canvasGroup = this.canvasService.findCanvasGroupByCanvasIndex(this.canvasService.currentCanvasIndex);
            const canvasesPerCanvasGroup = this.canvasService.getCanvasesPerCanvasGroup(canvasGroup);
            return canvasesPerCanvasGroup.indexOf(this.currentHit.index) !== -1;
        }
        else {
            return false;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: ContentSearchNavigationService, deps: [{ token: i1.CanvasService }, { token: i2.IiifContentSearchService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: ContentSearchNavigationService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: ContentSearchNavigationService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.CanvasService }, { type: i2.IiifContentSearchService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbmF2aWdhdGlvbi9jb250ZW50LXNlYXJjaC1uYXZpZ2F0aW9uLXNlcnZpY2UvY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDOzs7O0FBS3pHLE1BQU0sT0FBTyw4QkFBOEI7SUFVekMsWUFDVSxhQUE0QixFQUM1Qix3QkFBa0Q7UUFEbEQsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQVhwRCxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQiw2QkFBd0IsR0FBRyxLQUFLLENBQUM7UUFDakMsZUFBVSxHQUFlLElBQUksQ0FBQztRQUM5QiwyQkFBc0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsaUJBQVksR0FBd0IsSUFBSSxDQUFDO1FBRXpDLHdCQUFtQixHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBTW5FLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FB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dEMsQ0FBQztZQUNGLE1BQU0sc0JBQXNCLEdBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUQsT0FBTyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN0RSxDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7OEdBbE5VLDhCQUE4QjtrSEFBOUIsOEJBQThCOzsyRkFBOUIsOEJBQThCO2tCQUQxQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi8uLi9paWlmLWNvbnRlbnQtc2VhcmNoLXNlcnZpY2UvaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IEhpdCB9IGZyb20gJy4uLy4uL21vZGVscy9oaXQnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3NlYXJjaC1yZXN1bHQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjdXJyZW50SW5kZXggPSAwO1xuICBwcml2YXRlIGxhc3RIaXRJbmRleCA9IDA7XG4gIHByaXZhdGUgaXNIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwID0gZmFsc2U7XG4gIHByaXZhdGUgY3VycmVudEhpdDogSGl0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgY2FudmFzZXNQZXJDYW52YXNHcm91cCA9IFstMV07XG4gIHByaXZhdGUgc2VhcmNoUmVzdWx0OiBTZWFyY2hSZXN1bHQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zITogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9jdXJyZW50SGl0Q291bnRlciQ6IFN1YmplY3Q8bnVtYmVyPiA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhbnZhc1NlcnZpY2U6IENhbnZhc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmQ29udGVudFNlYXJjaFNlcnZpY2U6IElpaWZDb250ZW50U2VhcmNoU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAocmVzdWx0OiBTZWFyY2hSZXN1bHQpID0+IHtcbiAgICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRIaXQgPSBudWxsO1xuICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCk7XG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgdXBkYXRlKGNhbnZhc0dyb3VwSW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuY2FudmFzZXNQZXJDYW52YXNHcm91cCA9XG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzZXNQZXJDYW52YXNHcm91cChjYW52YXNHcm91cEluZGV4KTtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuZmluZEN1cnJlbnRIaXRJbmRleCh0aGlzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXApO1xuICAgIHRoaXMubGFzdEhpdEluZGV4ID0gdGhpcy5maW5kTGFzdEhpdEluZGV4KHRoaXMuY2FudmFzZXNQZXJDYW52YXNHcm91cCk7XG4gICAgdGhpcy5pc0hpdE9uQWN0aXZlQ2FudmFzR3JvdXAgPSB0aGlzLmZpbmRIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwKCk7XG4gICAgdGhpcy5fY3VycmVudEhpdENvdW50ZXIkLm5leHQodGhpcy51cGRhdGVDdXJyZW50SGl0Q291bnRlcigpKTtcbiAgfVxuXG4gIGdldCBjdXJyZW50SGl0Q291bnRlcigpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50SGl0Q291bnRlciQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldEhpdE9uQWN0aXZlQ2FudmFzR3JvdXAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwO1xuICB9XG5cbiAgZ29Ub05leHRIaXQoKSB7XG4gICAgaWYgKHRoaXMuaXNDdXJyZW50SGl0T25DdXJyZW50Q2FudmFzR3JvdXAoKSkge1xuICAgICAgdGhpcy5nb1RvTmV4dEN1cnJlbnRDYW52YXNIaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nb1RvTmV4dENhbnZhc0hpdCgpO1xuICAgIH1cbiAgfVxuXG4gIGdvVG9QcmV2aW91c0hpdCgpIHtcbiAgICBpZiAodGhpcy5pc0N1cnJlbnRIaXRPbkN1cnJlbnRDYW52YXNHcm91cCgpKSB7XG4gICAgICB0aGlzLmdvVG9QcmV2aW91c0N1cnJlbnRDYW52YXNIaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nb1RvUHJldmlvdXNDYW52YXNIaXQoKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RlZChoaXQ6IEhpdCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudEhpdCA9IGhpdDtcbiAgICB0aGlzLl9jdXJyZW50SGl0Q291bnRlciQubmV4dCh0aGlzLmN1cnJlbnRIaXQuaWQpO1xuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5jdXJyZW50SGl0LmluZGV4O1xuICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLnNlbGVjdGVkKGhpdCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUN1cnJlbnRIaXRDb3VudGVyKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuaXNDdXJyZW50SGl0T25DdXJyZW50Q2FudmFzR3JvdXAoKSkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudEhpdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50SGl0LmlkO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5pc0hpdE9uQWN0aXZlQ2FudmFzR3JvdXApIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRJbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubGFzdEhpdEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ29Ub05leHRDdXJyZW50Q2FudmFzSGl0KCkge1xuICAgIGlmICh0aGlzLnNlYXJjaFJlc3VsdCAmJiB0aGlzLmN1cnJlbnRIaXQpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRIaXRJZCA9IHRoaXMuY3VycmVudEhpdC5pZDtcbiAgICAgIGlmIChjdXJyZW50SGl0SWQgPCB0aGlzLnNlYXJjaFJlc3VsdC5oaXRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCh0aGlzLnNlYXJjaFJlc3VsdC5oaXRzW2N1cnJlbnRIaXRJZCArIDFdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdvVG9QcmV2aW91c0N1cnJlbnRDYW52YXNIaXQoKSB7XG4gICAgaWYgKHRoaXMuc2VhcmNoUmVzdWx0ICYmIHRoaXMuY3VycmVudEhpdCkge1xuICAgICAgY29uc3QgY3VycmVudEhpdElkID0gdGhpcy5jdXJyZW50SGl0LmlkO1xuICAgICAgaWYgKGN1cnJlbnRIaXRJZCA+IDApIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCh0aGlzLnNlYXJjaFJlc3VsdC5oaXRzW3RoaXMuY3VycmVudEhpdC5pZCAtIDFdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdvVG9OZXh0Q2FudmFzSGl0KCkge1xuICAgIGlmICh0aGlzLnNlYXJjaFJlc3VsdCkge1xuICAgICAgbGV0IG5leHRIaXQ6IEhpdCB8IHVuZGVmaW5lZDtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgbmV4dEhpdCA9IHRoaXMuc2VhcmNoUmVzdWx0LmdldCgwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmlzSGl0T25BY3RpdmVDYW52YXNHcm91cCkge1xuICAgICAgICAgIG5leHRIaXQgPSB0aGlzLnNlYXJjaFJlc3VsdC5oaXRzLmZpbmQoXG4gICAgICAgICAgICAoaGl0KSA9PiBoaXQuaWQgPT09IHRoaXMuY3VycmVudEluZGV4LFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuc2VhcmNoUmVzdWx0LmdldCh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgY29uc3QgY2FudmFzR3JvdXAgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChcbiAgICAgICAgICAgIGN1cnJlbnQuaW5kZXgsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBjYW52YXNlc1BlckNhbnZhc0dyb3VwID1cbiAgICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNlc1BlckNhbnZhc0dyb3VwKGNhbnZhc0dyb3VwKTtcbiAgICAgICAgICBjb25zdCBsYXN0Q2FudmFzR3JvdXBJbmRleCA9IHRoaXMuZ2V0TGFzdENhbnZhc0dyb3VwSW5kZXgoXG4gICAgICAgICAgICBjYW52YXNlc1BlckNhbnZhc0dyb3VwLFxuICAgICAgICAgICk7XG4gICAgICAgICAgbmV4dEhpdCA9IHRoaXMuc2VhcmNoUmVzdWx0LmhpdHMuZmluZChcbiAgICAgICAgICAgIChoKSA9PiBoLmluZGV4ID4gbGFzdENhbnZhc0dyb3VwSW5kZXgsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG5leHRIaXQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZChuZXh0SGl0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdvVG9QcmV2aW91c0NhbnZhc0hpdCgpIHtcbiAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHQpIHtcbiAgICAgIGlmICh0aGlzLmlzSGl0T25BY3RpdmVDYW52YXNHcm91cCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkKHRoaXMuc2VhcmNoUmVzdWx0LmhpdHNbdGhpcy5jdXJyZW50SW5kZXhdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQodGhpcy5zZWFyY2hSZXN1bHQuaGl0c1t0aGlzLmxhc3RIaXRJbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZEhpdE9uQWN0aXZlQ2FudmFzR3JvdXAoKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLnNlYXJjaFJlc3VsdCB8fCB0aGlzLmN1cnJlbnRJbmRleCA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuY2FudmFzZXNQZXJDYW52YXNHcm91cD8uaW5kZXhPZihcbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHQuZ2V0KHRoaXMuY3VycmVudEluZGV4KS5pbmRleCxcbiAgICAgICkgPj0gMFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGZpbmRDdXJyZW50SGl0SW5kZXgoY2FudmFzR3JvdXBJbmRleGVzOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLnNlYXJjaFJlc3VsdCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGlmIChjYW52YXNHcm91cEluZGV4ZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWFyY2hSZXN1bHQuc2l6ZSgpOyBpKyspIHtcbiAgICAgICAgY29uc3QgaGl0ID0gdGhpcy5zZWFyY2hSZXN1bHQuZ2V0KGkpO1xuICAgICAgICBpZiAoY2FudmFzR3JvdXBJbmRleGVzLmluZGV4T2YoaGl0LmluZGV4KSA+PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhpdC5pbmRleCA+PSBjYW52YXNHcm91cEluZGV4ZXNbY2FudmFzR3JvdXBJbmRleGVzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcGhpdCA9IHRoaXMuc2VhcmNoUmVzdWx0LmdldChpIC0gMSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hSZXN1bHQuaGl0cy5maW5kSW5kZXgoXG4gICAgICAgICAgICAgIChzcikgPT4gc3IuaW5kZXggPT09IHBoaXQuaW5kZXgsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zZWFyY2hSZXN1bHQuc2l6ZSgpIC0gMTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZExhc3RIaXRJbmRleChjYW52YXNHcm91cEluZGV4ZXM6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuc2VhcmNoUmVzdWx0IHx8ICFjYW52YXNHcm91cEluZGV4ZXMpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgY29uc3QgaGl0cyA9IHRoaXMuc2VhcmNoUmVzdWx0LmhpdHMuZmlsdGVyKFxuICAgICAgKGhpdCkgPT4gaGl0LmluZGV4IDwgY2FudmFzR3JvdXBJbmRleGVzWzBdLFxuICAgICk7XG4gICAgcmV0dXJuIGhpdHMubGVuZ3RoID4gMCA/IGhpdHNbaGl0cy5sZW5ndGggLSAxXS5pZCA6IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRMYXN0Q2FudmFzR3JvdXBJbmRleChjYW52YXNlc1BlckNhbnZhc0dyb3VwOiBudW1iZXJbXSkge1xuICAgIHJldHVybiBjYW52YXNlc1BlckNhbnZhc0dyb3VwLmxlbmd0aCA9PT0gMVxuICAgICAgPyBjYW52YXNlc1BlckNhbnZhc0dyb3VwWzBdXG4gICAgICA6IGNhbnZhc2VzUGVyQ2FudmFzR3JvdXBbMV07XG4gIH1cblxuICBwcml2YXRlIGlzQ3VycmVudEhpdE9uQ3VycmVudENhbnZhc0dyb3VwKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmN1cnJlbnRIaXQpIHtcbiAgICAgIGNvbnN0IGNhbnZhc0dyb3VwID0gdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoXG4gICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzSW5kZXgsXG4gICAgICApO1xuICAgICAgY29uc3QgY2FudmFzZXNQZXJDYW52YXNHcm91cCA9XG4gICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNlc1BlckNhbnZhc0dyb3VwKGNhbnZhc0dyb3VwKTtcbiAgICAgIHJldHVybiBjYW52YXNlc1BlckNhbnZhc0dyb3VwLmluZGV4T2YodGhpcy5jdXJyZW50SGl0LmluZGV4KSAhPT0gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==