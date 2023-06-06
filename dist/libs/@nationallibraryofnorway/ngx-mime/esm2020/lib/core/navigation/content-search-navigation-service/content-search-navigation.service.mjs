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
        if (!this.searchResult) {
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
}
ContentSearchNavigationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ContentSearchNavigationService, deps: [{ token: i1.CanvasService }, { token: i2.IiifContentSearchService }], target: i0.ɵɵFactoryTarget.Injectable });
ContentSearchNavigationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ContentSearchNavigationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ContentSearchNavigationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CanvasService }, { type: i2.IiifContentSearchService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbmF2aWdhdGlvbi9jb250ZW50LXNlYXJjaC1uYXZpZ2F0aW9uLXNlcnZpY2UvY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDOzs7O0FBS3pHLE1BQU0sT0FBTyw4QkFBOEI7SUFVekMsWUFDVSxhQUE0QixFQUM1Qix3QkFBa0Q7UUFEbEQsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQVhwRCxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQiw2QkFBd0IsR0FBRyxLQUFLLENBQUM7UUFDakMsZUFBVSxHQUFlLElBQUksQ0FBQztRQUM5QiwyQkFBc0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsaUJBQVksR0FBd0IsSUFBSSxDQUFDO1FBRXpDLHdCQUFtQixHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBTW5FLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FB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QUNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FDeEMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQzNDLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTyx1QkFBdUIsQ0FBQyxzQkFBZ0M7UUFDOUQsT0FBTyxzQkFBc0IsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUN4QyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU8sZ0NBQWdDO1FBQ3RDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUN0QyxDQUFDO1lBQ0YsTUFBTSxzQkFBc0IsR0FDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1RCxPQUFPLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7MkhBbE5VLDhCQUE4QjsrSEFBOUIsOEJBQThCOzJGQUE5Qiw4QkFBOEI7a0JBRDFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2FudmFzU2VydmljZSB9IGZyb20gJy4uLy4uL2NhbnZhcy1zZXJ2aWNlL2NhbnZhcy1zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZDb250ZW50U2VhcmNoU2VydmljZSB9IGZyb20gJy4uLy4uL2lpaWYtY29udGVudC1zZWFyY2gtc2VydmljZS9paWlmLWNvbnRlbnQtc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGl0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2hpdCc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi8uLi9tb2RlbHMvc2VhcmNoLXJlc3VsdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2Uge1xuICBwcml2YXRlIGN1cnJlbnRJbmRleCA9IDA7XG4gIHByaXZhdGUgbGFzdEhpdEluZGV4ID0gMDtcbiAgcHJpdmF0ZSBpc0hpdE9uQWN0aXZlQ2FudmFzR3JvdXAgPSBmYWxzZTtcbiAgcHJpdmF0ZSBjdXJyZW50SGl0OiBIaXQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBjYW52YXNlc1BlckNhbnZhc0dyb3VwID0gWy0xXTtcbiAgcHJpdmF0ZSBzZWFyY2hSZXN1bHQ6IFNlYXJjaFJlc3VsdCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMhOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgX2N1cnJlbnRIaXRDb3VudGVyJDogU3ViamVjdDxudW1iZXI+ID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZDb250ZW50U2VhcmNoU2VydmljZTogSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKHJlc3VsdDogU2VhcmNoUmVzdWx0KSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgdGhpcy5jdXJyZW50SGl0ID0gbnVsbDtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXgpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICB1cGRhdGUoY2FudmFzR3JvdXBJbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwID1cbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNlc1BlckNhbnZhc0dyb3VwKGNhbnZhc0dyb3VwSW5kZXgpO1xuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5maW5kQ3VycmVudEhpdEluZGV4KHRoaXMuY2FudmFzZXNQZXJDYW52YXNHcm91cCk7XG4gICAgdGhpcy5sYXN0SGl0SW5kZXggPSB0aGlzLmZpbmRMYXN0SGl0SW5kZXgodGhpcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwKTtcbiAgICB0aGlzLmlzSGl0T25BY3RpdmVDYW52YXNHcm91cCA9IHRoaXMuZmluZEhpdE9uQWN0aXZlQ2FudmFzR3JvdXAoKTtcbiAgICB0aGlzLl9jdXJyZW50SGl0Q291bnRlciQubmV4dCh0aGlzLnVwZGF0ZUN1cnJlbnRIaXRDb3VudGVyKCkpO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRIaXRDb3VudGVyKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRIaXRDb3VudGVyJC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0SGl0T25BY3RpdmVDYW52YXNHcm91cCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0hpdE9uQWN0aXZlQ2FudmFzR3JvdXA7XG4gIH1cblxuICBnb1RvTmV4dEhpdCgpIHtcbiAgICBpZiAodGhpcy5pc0N1cnJlbnRIaXRPbkN1cnJlbnRDYW52YXNHcm91cCgpKSB7XG4gICAgICB0aGlzLmdvVG9OZXh0Q3VycmVudENhbnZhc0hpdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdvVG9OZXh0Q2FudmFzSGl0KCk7XG4gICAgfVxuICB9XG5cbiAgZ29Ub1ByZXZpb3VzSGl0KCkge1xuICAgIGlmICh0aGlzLmlzQ3VycmVudEhpdE9uQ3VycmVudENhbnZhc0dyb3VwKCkpIHtcbiAgICAgIHRoaXMuZ29Ub1ByZXZpb3VzQ3VycmVudENhbnZhc0hpdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdvVG9QcmV2aW91c0NhbnZhc0hpdCgpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdGVkKGhpdDogSGl0KTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50SGl0ID0gaGl0O1xuICAgIHRoaXMuX2N1cnJlbnRIaXRDb3VudGVyJC5uZXh0KHRoaXMuY3VycmVudEhpdC5pZCk7XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLmN1cnJlbnRIaXQuaW5kZXg7XG4gICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uuc2VsZWN0ZWQoaGl0KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ3VycmVudEhpdENvdW50ZXIoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5pc0N1cnJlbnRIaXRPbkN1cnJlbnRDYW52YXNHcm91cCgpKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50SGl0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRIaXQuaWQ7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmlzSGl0T25BY3RpdmVDYW52YXNHcm91cCkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5sYXN0SGl0SW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnb1RvTmV4dEN1cnJlbnRDYW52YXNIaXQoKSB7XG4gICAgaWYgKHRoaXMuc2VhcmNoUmVzdWx0ICYmIHRoaXMuY3VycmVudEhpdCkge1xuICAgICAgY29uc3QgY3VycmVudEhpdElkID0gdGhpcy5jdXJyZW50SGl0LmlkO1xuICAgICAgaWYgKGN1cnJlbnRIaXRJZCA8IHRoaXMuc2VhcmNoUmVzdWx0LmhpdHMubGVuZ3RoIC0gMSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkKHRoaXMuc2VhcmNoUmVzdWx0LmhpdHNbY3VycmVudEhpdElkICsgMV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ29Ub1ByZXZpb3VzQ3VycmVudENhbnZhc0hpdCgpIHtcbiAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHQgJiYgdGhpcy5jdXJyZW50SGl0KSB7XG4gICAgICBjb25zdCBjdXJyZW50SGl0SWQgPSB0aGlzLmN1cnJlbnRIaXQuaWQ7XG4gICAgICBpZiAoY3VycmVudEhpdElkID4gMCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkKHRoaXMuc2VhcmNoUmVzdWx0LmhpdHNbdGhpcy5jdXJyZW50SGl0LmlkIC0gMV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ29Ub05leHRDYW52YXNIaXQoKSB7XG4gICAgaWYgKHRoaXMuc2VhcmNoUmVzdWx0KSB7XG4gICAgICBsZXQgbmV4dEhpdDogSGl0IHwgdW5kZWZpbmVkO1xuICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID09PSAtMSkge1xuICAgICAgICBuZXh0SGl0ID0gdGhpcy5zZWFyY2hSZXN1bHQuZ2V0KDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuaXNIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwKSB7XG4gICAgICAgICAgbmV4dEhpdCA9IHRoaXMuc2VhcmNoUmVzdWx0LmhpdHMuZmluZChcbiAgICAgICAgICAgIChoaXQpID0+IGhpdC5pZCA9PT0gdGhpcy5jdXJyZW50SW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLnNlYXJjaFJlc3VsdC5nZXQodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGNhbnZhc0dyb3VwID0gdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoXG4gICAgICAgICAgICBjdXJyZW50LmluZGV4XG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBjYW52YXNlc1BlckNhbnZhc0dyb3VwID1cbiAgICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNlc1BlckNhbnZhc0dyb3VwKGNhbnZhc0dyb3VwKTtcbiAgICAgICAgICBjb25zdCBsYXN0Q2FudmFzR3JvdXBJbmRleCA9IHRoaXMuZ2V0TGFzdENhbnZhc0dyb3VwSW5kZXgoXG4gICAgICAgICAgICBjYW52YXNlc1BlckNhbnZhc0dyb3VwXG4gICAgICAgICAgKTtcbiAgICAgICAgICBuZXh0SGl0ID0gdGhpcy5zZWFyY2hSZXN1bHQuaGl0cy5maW5kKFxuICAgICAgICAgICAgKGgpID0+IGguaW5kZXggPiBsYXN0Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChuZXh0SGl0KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQobmV4dEhpdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnb1RvUHJldmlvdXNDYW52YXNIaXQoKSB7XG4gICAgaWYgKHRoaXMuc2VhcmNoUmVzdWx0KSB7XG4gICAgICBpZiAodGhpcy5pc0hpdE9uQWN0aXZlQ2FudmFzR3JvdXApIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCh0aGlzLnNlYXJjaFJlc3VsdC5oaXRzW3RoaXMuY3VycmVudEluZGV4XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbGVjdGVkKHRoaXMuc2VhcmNoUmVzdWx0LmhpdHNbdGhpcy5sYXN0SGl0SW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbmRIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5zZWFyY2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuY2FudmFzZXNQZXJDYW52YXNHcm91cD8uaW5kZXhPZihcbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHQuZ2V0KHRoaXMuY3VycmVudEluZGV4KS5pbmRleFxuICAgICAgKSA+PSAwXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZEN1cnJlbnRIaXRJbmRleChjYW52YXNHcm91cEluZGV4ZXM6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuc2VhcmNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgaWYgKGNhbnZhc0dyb3VwSW5kZXhlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlYXJjaFJlc3VsdC5zaXplKCk7IGkrKykge1xuICAgICAgICBjb25zdCBoaXQgPSB0aGlzLnNlYXJjaFJlc3VsdC5nZXQoaSk7XG4gICAgICAgIGlmIChjYW52YXNHcm91cEluZGV4ZXMuaW5kZXhPZihoaXQuaW5kZXgpID49IDApIHtcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGl0LmluZGV4ID49IGNhbnZhc0dyb3VwSW5kZXhlc1tjYW52YXNHcm91cEluZGV4ZXMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBwaGl0ID0gdGhpcy5zZWFyY2hSZXN1bHQuZ2V0KGkgLSAxKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFJlc3VsdC5oaXRzLmZpbmRJbmRleChcbiAgICAgICAgICAgICAgKHNyKSA9PiBzci5pbmRleCA9PT0gcGhpdC5pbmRleFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoUmVzdWx0LnNpemUoKSAtIDE7XG4gIH1cblxuICBwcml2YXRlIGZpbmRMYXN0SGl0SW5kZXgoY2FudmFzR3JvdXBJbmRleGVzOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLnNlYXJjaFJlc3VsdCB8fCAhY2FudmFzR3JvdXBJbmRleGVzKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGNvbnN0IGhpdHMgPSB0aGlzLnNlYXJjaFJlc3VsdC5oaXRzLmZpbHRlcihcbiAgICAgIChoaXQpID0+IGhpdC5pbmRleCA8IGNhbnZhc0dyb3VwSW5kZXhlc1swXVxuICAgICk7XG4gICAgcmV0dXJuIGhpdHMubGVuZ3RoID4gMCA/IGhpdHNbaGl0cy5sZW5ndGggLSAxXS5pZCA6IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRMYXN0Q2FudmFzR3JvdXBJbmRleChjYW52YXNlc1BlckNhbnZhc0dyb3VwOiBudW1iZXJbXSkge1xuICAgIHJldHVybiBjYW52YXNlc1BlckNhbnZhc0dyb3VwLmxlbmd0aCA9PT0gMVxuICAgICAgPyBjYW52YXNlc1BlckNhbnZhc0dyb3VwWzBdXG4gICAgICA6IGNhbnZhc2VzUGVyQ2FudmFzR3JvdXBbMV07XG4gIH1cblxuICBwcml2YXRlIGlzQ3VycmVudEhpdE9uQ3VycmVudENhbnZhc0dyb3VwKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmN1cnJlbnRIaXQpIHtcbiAgICAgIGNvbnN0IGNhbnZhc0dyb3VwID0gdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoXG4gICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzSW5kZXhcbiAgICAgICk7XG4gICAgICBjb25zdCBjYW52YXNlc1BlckNhbnZhc0dyb3VwID1cbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc2VzUGVyQ2FudmFzR3JvdXAoY2FudmFzR3JvdXApO1xuICAgICAgcmV0dXJuIGNhbnZhc2VzUGVyQ2FudmFzR3JvdXAuaW5kZXhPZih0aGlzLmN1cnJlbnRIaXQuaW5kZXgpICE9PSAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl19