import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
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
        if (!this.searchResult) {
            return false;
        }
        return (this.canvasesPerCanvasGroup.indexOf(this.searchResult.get(this.currentIndex).index) >= 0);
    }
    findCurrentHitIndex(canvasGroupIndexes) {
        if (!this.searchResult) {
            return -1;
        }
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
        return this.searchResult.size() - 1;
    }
    findLastHitIndex(canvasGroupIndexes) {
        if (!this.searchResult) {
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
}
ContentSearchNavigationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentSearchNavigationService, deps: [{ token: i1.CanvasService }, { token: i2.IiifContentSearchService }], target: i0.ɵɵFactoryTarget.Injectable });
ContentSearchNavigationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentSearchNavigationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentSearchNavigationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CanvasService }, { type: i2.IiifContentSearchService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbmF2aWdhdGlvbi9jb250ZW50LXNlYXJjaC1uYXZpZ2F0aW9uLXNlcnZpY2UvY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFTdEQsTUFBTSxPQUFPLDhCQUE4QjtJQVV6QyxZQUNVLGFBQTRCLEVBQzVCLHdCQUFrRDtRQURsRCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1Qiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBWHBELGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQyxlQUFVLEdBQWUsSUFBSSxDQUFDO1FBQzlCLDJCQUFzQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixpQkFBWSxHQUF3QixJQUFJLENBQUM7UUFFekMsd0JBQW1CLEdBQW9CLElBQUksT0FBTyxFQUFVLENBQUM7UUFNbkUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FDOUMsQ0FBQyxN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SSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTyx1QkFBdUIsQ0FBQyxzQkFBZ0M7UUFDOUQsT0FBTyxzQkFBc0IsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUN4QyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU8sZ0NBQWdDO1FBQ3RDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUN0QyxDQUFDO1lBQ0YsTUFBTSxzQkFBc0IsR0FDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1RCxPQUFPLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7MkhBL01VLDhCQUE4QjsrSEFBOUIsOEJBQThCLGNBRjdCLE1BQU07MkZBRVAsOEJBQThCO2tCQUgxQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBIaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvaGl0JztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uLy4uL21vZGVscy9zZWFyY2gtcmVzdWx0JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZSB7XG4gIHByaXZhdGUgY3VycmVudEluZGV4ID0gMDtcbiAgcHJpdmF0ZSBsYXN0SGl0SW5kZXggPSAwO1xuICBwcml2YXRlIGlzSGl0T25BY3RpdmVDYW52YXNHcm91cCA9IGZhbHNlO1xuICBwcml2YXRlIGN1cnJlbnRIaXQ6IEhpdCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGNhbnZhc2VzUGVyQ2FudmFzR3JvdXAgPSBbLTFdO1xuICBwcml2YXRlIHNlYXJjaFJlc3VsdDogU2VhcmNoUmVzdWx0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyE6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfY3VycmVudEhpdENvdW50ZXIkOiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlOiBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAocmVzdWx0OiBTZWFyY2hSZXN1bHQpID0+IHtcbiAgICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRIaXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICB1cGRhdGUoY2FudmFzR3JvdXBJbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwID1cbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNlc1BlckNhbnZhc0dyb3VwKGNhbnZhc0dyb3VwSW5kZXgpO1xuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5maW5kQ3VycmVudEhpdEluZGV4KHRoaXMuY2FudmFzZXNQZXJDYW52YXNHcm91cCk7XG4gICAgdGhpcy5sYXN0SGl0SW5kZXggPSB0aGlzLmZpbmRMYXN0SGl0SW5kZXgodGhpcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwKTtcbiAgICB0aGlzLmlzSGl0T25BY3RpdmVDYW52YXNHcm91cCA9IHRoaXMuZmluZEhpdE9uQWN0aXZlQ2FudmFzR3JvdXAoKTtcbiAgICB0aGlzLl9jdXJyZW50SGl0Q291bnRlciQubmV4dCh0aGlzLnVwZGF0ZUN1cnJlbnRIaXRDb3VudGVyKCkpO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRIaXRDb3VudGVyKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRIaXRDb3VudGVyJC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDdXJyZW50SGl0Q291bnRlcigpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmlzQ3VycmVudEhpdE9uQ3VycmVudENhbnZhc0dyb3VwKCkpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRIaXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEhpdC5pZDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaXNIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50SW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmxhc3RIaXRJbmRleDtcbiAgICB9XG4gIH1cblxuICBnZXRIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzSGl0T25BY3RpdmVDYW52YXNHcm91cDtcbiAgfVxuXG4gIGdvVG9OZXh0SGl0KCkge1xuICAgIGlmICh0aGlzLmlzQ3VycmVudEhpdE9uQ3VycmVudENhbnZhc0dyb3VwKCkpIHtcbiAgICAgIHRoaXMuZ29Ub05leHRDdXJyZW50Q2FudmFzSGl0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ29Ub05leHRDYW52YXNIaXQoKTtcbiAgICB9XG4gIH1cblxuICBnb1RvUHJldmlvdXNIaXQoKSB7XG4gICAgaWYgKHRoaXMuaXNDdXJyZW50SGl0T25DdXJyZW50Q2FudmFzR3JvdXAoKSkge1xuICAgICAgdGhpcy5nb1RvUHJldmlvdXNDdXJyZW50Q2FudmFzSGl0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ29Ub1ByZXZpb3VzQ2FudmFzSGl0KCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0ZWQoaGl0OiBIaXQpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRIaXQgPSBoaXQ7XG4gICAgdGhpcy5fY3VycmVudEhpdENvdW50ZXIkLm5leHQodGhpcy5jdXJyZW50SGl0LmlkKTtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuY3VycmVudEhpdC5pbmRleDtcbiAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5zZWxlY3RlZChoaXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvTmV4dEN1cnJlbnRDYW52YXNIaXQoKSB7XG4gICAgaWYgKHRoaXMuc2VhcmNoUmVzdWx0ICYmIHRoaXMuY3VycmVudEhpdCkge1xuICAgICAgY29uc3QgY3VycmVudEhpdElkID0gdGhpcy5jdXJyZW50SGl0LmlkO1xuICAgICAgaWYgKGN1cnJlbnRIaXRJZCA8IHRoaXMuc2VhcmNoUmVzdWx0LmhpdHMubGVuZ3RoIC0gMSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkKHRoaXMuc2VhcmNoUmVzdWx0LmhpdHNbY3VycmVudEhpdElkICsgMV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ29Ub1ByZXZpb3VzQ3VycmVudENhbnZhc0hpdCgpIHtcbiAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHQgJiYgdGhpcy5jdXJyZW50SGl0KSB7XG4gICAgICBjb25zdCBjdXJyZW50SGl0SWQgPSB0aGlzLmN1cnJlbnRIaXQuaWQ7XG4gICAgICBpZiAoY3VycmVudEhpdElkID4gMCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkKHRoaXMuc2VhcmNoUmVzdWx0LmhpdHNbdGhpcy5jdXJyZW50SGl0LmlkIC0gMV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ29Ub05leHRDYW52YXNIaXQoKSB7XG4gICAgaWYgKHRoaXMuc2VhcmNoUmVzdWx0KSB7XG4gICAgICBsZXQgbmV4dEhpdDogSGl0IHwgdW5kZWZpbmVkO1xuICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID09PSAtMSkge1xuICAgICAgICBuZXh0SGl0ID0gdGhpcy5zZWFyY2hSZXN1bHQuZ2V0KDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuaXNIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwKSB7XG4gICAgICAgICAgbmV4dEhpdCA9IHRoaXMuc2VhcmNoUmVzdWx0LmhpdHMuZmluZChcbiAgICAgICAgICAgIChoaXQpID0+IGhpdC5pZCA9PT0gdGhpcy5jdXJyZW50SW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLnNlYXJjaFJlc3VsdC5nZXQodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGNhbnZhc0dyb3VwID0gdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoXG4gICAgICAgICAgICBjdXJyZW50LmluZGV4XG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBjYW52YXNlc1BlckNhbnZhc0dyb3VwID1cbiAgICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNlc1BlckNhbnZhc0dyb3VwKGNhbnZhc0dyb3VwKTtcbiAgICAgICAgICBjb25zdCBsYXN0Q2FudmFzR3JvdXBJbmRleCA9IHRoaXMuZ2V0TGFzdENhbnZhc0dyb3VwSW5kZXgoXG4gICAgICAgICAgICBjYW52YXNlc1BlckNhbnZhc0dyb3VwXG4gICAgICAgICAgKTtcbiAgICAgICAgICBuZXh0SGl0ID0gdGhpcy5zZWFyY2hSZXN1bHQuaGl0cy5maW5kKFxuICAgICAgICAgICAgKGgpID0+IGguaW5kZXggPiBsYXN0Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChuZXh0SGl0KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQobmV4dEhpdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnb1RvUHJldmlvdXNDYW52YXNIaXQoKSB7XG4gICAgaWYgKHRoaXMuc2VhcmNoUmVzdWx0KSB7XG4gICAgICBpZiAodGhpcy5pc0hpdE9uQWN0aXZlQ2FudmFzR3JvdXApIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCh0aGlzLnNlYXJjaFJlc3VsdC5oaXRzW3RoaXMuY3VycmVudEluZGV4XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbGVjdGVkKHRoaXMuc2VhcmNoUmVzdWx0LmhpdHNbdGhpcy5sYXN0SGl0SW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbmRIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5zZWFyY2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuY2FudmFzZXNQZXJDYW52YXNHcm91cC5pbmRleE9mKFxuICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdC5nZXQodGhpcy5jdXJyZW50SW5kZXgpLmluZGV4XG4gICAgICApID49IDBcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kQ3VycmVudEhpdEluZGV4KGNhbnZhc0dyb3VwSW5kZXhlczogbnVtYmVyW10pOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5zZWFyY2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VhcmNoUmVzdWx0LnNpemUoKTsgaSsrKSB7XG4gICAgICBjb25zdCBoaXQgPSB0aGlzLnNlYXJjaFJlc3VsdC5nZXQoaSk7XG4gICAgICBpZiAoY2FudmFzR3JvdXBJbmRleGVzLmluZGV4T2YoaGl0LmluZGV4KSA+PSAwKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgICAgaWYgKGhpdC5pbmRleCA+PSBjYW52YXNHcm91cEluZGV4ZXNbY2FudmFzR3JvdXBJbmRleGVzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHBoaXQgPSB0aGlzLnNlYXJjaFJlc3VsdC5nZXQoaSAtIDEpO1xuICAgICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFJlc3VsdC5oaXRzLmZpbmRJbmRleChcbiAgICAgICAgICAgIChzcikgPT4gc3IuaW5kZXggPT09IHBoaXQuaW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNlYXJjaFJlc3VsdC5zaXplKCkgLSAxO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kTGFzdEhpdEluZGV4KGNhbnZhc0dyb3VwSW5kZXhlczogbnVtYmVyW10pOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5zZWFyY2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgY29uc3QgaGl0cyA9IHRoaXMuc2VhcmNoUmVzdWx0LmhpdHMuZmlsdGVyKFxuICAgICAgKGhpdCkgPT4gaGl0LmluZGV4IDwgY2FudmFzR3JvdXBJbmRleGVzWzBdXG4gICAgKTtcbiAgICByZXR1cm4gaGl0cy5sZW5ndGggPiAwID8gaGl0c1toaXRzLmxlbmd0aCAtIDFdLmlkIDogLTE7XG4gIH1cblxuICBwcml2YXRlIGdldExhc3RDYW52YXNHcm91cEluZGV4KGNhbnZhc2VzUGVyQ2FudmFzR3JvdXA6IG51bWJlcltdKSB7XG4gICAgcmV0dXJuIGNhbnZhc2VzUGVyQ2FudmFzR3JvdXAubGVuZ3RoID09PSAxXG4gICAgICA/IGNhbnZhc2VzUGVyQ2FudmFzR3JvdXBbMF1cbiAgICAgIDogY2FudmFzZXNQZXJDYW52YXNHcm91cFsxXTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDdXJyZW50SGl0T25DdXJyZW50Q2FudmFzR3JvdXAoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuY3VycmVudEhpdCkge1xuICAgICAgY29uc3QgY2FudmFzR3JvdXAgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChcbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNJbmRleFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGNhbnZhc2VzUGVyQ2FudmFzR3JvdXAgPVxuICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzZXNQZXJDYW52YXNHcm91cChjYW52YXNHcm91cCk7XG4gICAgICByZXR1cm4gY2FudmFzZXNQZXJDYW52YXNHcm91cC5pbmRleE9mKHRoaXMuY3VycmVudEhpdC5pbmRleCkgIT09IC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=