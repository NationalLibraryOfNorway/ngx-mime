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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: ContentSearchNavigationService, deps: [{ token: i1.CanvasService }, { token: i2.IiifContentSearchService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: ContentSearchNavigationService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: ContentSearchNavigationService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.CanvasService }, { type: i2.IiifContentSearchService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbmF2aWdhdGlvbi9jb250ZW50LXNlYXJjaC1uYXZpZ2F0aW9uLXNlcnZpY2UvY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDOzs7O0FBS3pHLE1BQU0sT0FBTyw4QkFBOEI7SUFVekMsWUFDVSxhQUE0QixFQUM1Qix3QkFBa0Q7UUFEbEQsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQVhwRCxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQiw2QkFBd0IsR0FBRyxLQUFLLENBQUM7UUFDakMsZUFBVSxHQUFlLElBQUksQ0FBQztRQUM5QiwyQkFBc0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsaUJBQVksR0FBd0IsSUFBSSxDQUFDO1FBRXpDLHdCQUFtQixHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBTW5FLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FB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LENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzVELE9BQU8sc0JBQXNCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDOzhHQWxOVSw4QkFBOEI7a0hBQTlCLDhCQUE4Qjs7MkZBQTlCLDhCQUE4QjtrQkFEMUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBIaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvaGl0JztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uLy4uL21vZGVscy9zZWFyY2gtcmVzdWx0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZSB7XG4gIHByaXZhdGUgY3VycmVudEluZGV4ID0gMDtcbiAgcHJpdmF0ZSBsYXN0SGl0SW5kZXggPSAwO1xuICBwcml2YXRlIGlzSGl0T25BY3RpdmVDYW52YXNHcm91cCA9IGZhbHNlO1xuICBwcml2YXRlIGN1cnJlbnRIaXQ6IEhpdCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGNhbnZhc2VzUGVyQ2FudmFzR3JvdXAgPSBbLTFdO1xuICBwcml2YXRlIHNlYXJjaFJlc3VsdDogU2VhcmNoUmVzdWx0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyE6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfY3VycmVudEhpdENvdW50ZXIkOiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlOiBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAocmVzdWx0OiBTZWFyY2hSZXN1bHQpID0+IHtcbiAgICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRIaXQgPSBudWxsO1xuICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHVwZGF0ZShjYW52YXNHcm91cEluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXAgPVxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc2VzUGVyQ2FudmFzR3JvdXAoY2FudmFzR3JvdXBJbmRleCk7XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLmZpbmRDdXJyZW50SGl0SW5kZXgodGhpcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwKTtcbiAgICB0aGlzLmxhc3RIaXRJbmRleCA9IHRoaXMuZmluZExhc3RIaXRJbmRleCh0aGlzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXApO1xuICAgIHRoaXMuaXNIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwID0gdGhpcy5maW5kSGl0T25BY3RpdmVDYW52YXNHcm91cCgpO1xuICAgIHRoaXMuX2N1cnJlbnRIaXRDb3VudGVyJC5uZXh0KHRoaXMudXBkYXRlQ3VycmVudEhpdENvdW50ZXIoKSk7XG4gIH1cblxuICBnZXQgY3VycmVudEhpdENvdW50ZXIoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEhpdENvdW50ZXIkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gIH1cblxuICBnZXRIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzSGl0T25BY3RpdmVDYW52YXNHcm91cDtcbiAgfVxuXG4gIGdvVG9OZXh0SGl0KCkge1xuICAgIGlmICh0aGlzLmlzQ3VycmVudEhpdE9uQ3VycmVudENhbnZhc0dyb3VwKCkpIHtcbiAgICAgIHRoaXMuZ29Ub05leHRDdXJyZW50Q2FudmFzSGl0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ29Ub05leHRDYW52YXNIaXQoKTtcbiAgICB9XG4gIH1cblxuICBnb1RvUHJldmlvdXNIaXQoKSB7XG4gICAgaWYgKHRoaXMuaXNDdXJyZW50SGl0T25DdXJyZW50Q2FudmFzR3JvdXAoKSkge1xuICAgICAgdGhpcy5nb1RvUHJldmlvdXNDdXJyZW50Q2FudmFzSGl0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ29Ub1ByZXZpb3VzQ2FudmFzSGl0KCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0ZWQoaGl0OiBIaXQpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRIaXQgPSBoaXQ7XG4gICAgdGhpcy5fY3VycmVudEhpdENvdW50ZXIkLm5leHQodGhpcy5jdXJyZW50SGl0LmlkKTtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuY3VycmVudEhpdC5pbmRleDtcbiAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5zZWxlY3RlZChoaXQpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDdXJyZW50SGl0Q291bnRlcigpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmlzQ3VycmVudEhpdE9uQ3VycmVudENhbnZhc0dyb3VwKCkpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRIaXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEhpdC5pZDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaXNIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50SW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmxhc3RIaXRJbmRleDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdvVG9OZXh0Q3VycmVudENhbnZhc0hpdCgpIHtcbiAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHQgJiYgdGhpcy5jdXJyZW50SGl0KSB7XG4gICAgICBjb25zdCBjdXJyZW50SGl0SWQgPSB0aGlzLmN1cnJlbnRIaXQuaWQ7XG4gICAgICBpZiAoY3VycmVudEhpdElkIDwgdGhpcy5zZWFyY2hSZXN1bHQuaGl0cy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQodGhpcy5zZWFyY2hSZXN1bHQuaGl0c1tjdXJyZW50SGl0SWQgKyAxXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnb1RvUHJldmlvdXNDdXJyZW50Q2FudmFzSGl0KCkge1xuICAgIGlmICh0aGlzLnNlYXJjaFJlc3VsdCAmJiB0aGlzLmN1cnJlbnRIaXQpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRIaXRJZCA9IHRoaXMuY3VycmVudEhpdC5pZDtcbiAgICAgIGlmIChjdXJyZW50SGl0SWQgPiAwKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQodGhpcy5zZWFyY2hSZXN1bHQuaGl0c1t0aGlzLmN1cnJlbnRIaXQuaWQgLSAxXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnb1RvTmV4dENhbnZhc0hpdCgpIHtcbiAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHQpIHtcbiAgICAgIGxldCBuZXh0SGl0OiBIaXQgfCB1bmRlZmluZWQ7XG4gICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPT09IC0xKSB7XG4gICAgICAgIG5leHRIaXQgPSB0aGlzLnNlYXJjaFJlc3VsdC5nZXQoMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5pc0hpdE9uQWN0aXZlQ2FudmFzR3JvdXApIHtcbiAgICAgICAgICBuZXh0SGl0ID0gdGhpcy5zZWFyY2hSZXN1bHQuaGl0cy5maW5kKFxuICAgICAgICAgICAgKGhpdCkgPT4gaGl0LmlkID09PSB0aGlzLmN1cnJlbnRJbmRleFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuc2VhcmNoUmVzdWx0LmdldCh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgY29uc3QgY2FudmFzR3JvdXAgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChcbiAgICAgICAgICAgIGN1cnJlbnQuaW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IGNhbnZhc2VzUGVyQ2FudmFzR3JvdXAgPVxuICAgICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc2VzUGVyQ2FudmFzR3JvdXAoY2FudmFzR3JvdXApO1xuICAgICAgICAgIGNvbnN0IGxhc3RDYW52YXNHcm91cEluZGV4ID0gdGhpcy5nZXRMYXN0Q2FudmFzR3JvdXBJbmRleChcbiAgICAgICAgICAgIGNhbnZhc2VzUGVyQ2FudmFzR3JvdXBcbiAgICAgICAgICApO1xuICAgICAgICAgIG5leHRIaXQgPSB0aGlzLnNlYXJjaFJlc3VsdC5oaXRzLmZpbmQoXG4gICAgICAgICAgICAoaCkgPT4gaC5pbmRleCA+IGxhc3RDYW52YXNHcm91cEluZGV4XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG5leHRIaXQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZChuZXh0SGl0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdvVG9QcmV2aW91c0NhbnZhc0hpdCgpIHtcbiAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHQpIHtcbiAgICAgIGlmICh0aGlzLmlzSGl0T25BY3RpdmVDYW52YXNHcm91cCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkKHRoaXMuc2VhcmNoUmVzdWx0LmhpdHNbdGhpcy5jdXJyZW50SW5kZXhdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQodGhpcy5zZWFyY2hSZXN1bHQuaGl0c1t0aGlzLmxhc3RIaXRJbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZEhpdE9uQWN0aXZlQ2FudmFzR3JvdXAoKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLnNlYXJjaFJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwPy5pbmRleE9mKFxuICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdC5nZXQodGhpcy5jdXJyZW50SW5kZXgpLmluZGV4XG4gICAgICApID49IDBcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kQ3VycmVudEhpdEluZGV4KGNhbnZhc0dyb3VwSW5kZXhlczogbnVtYmVyW10pOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5zZWFyY2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBpZiAoY2FudmFzR3JvdXBJbmRleGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VhcmNoUmVzdWx0LnNpemUoKTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGhpdCA9IHRoaXMuc2VhcmNoUmVzdWx0LmdldChpKTtcbiAgICAgICAgaWYgKGNhbnZhc0dyb3VwSW5kZXhlcy5pbmRleE9mKGhpdC5pbmRleCkgPj0gMCkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoaXQuaW5kZXggPj0gY2FudmFzR3JvdXBJbmRleGVzW2NhbnZhc0dyb3VwSW5kZXhlcy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHBoaXQgPSB0aGlzLnNlYXJjaFJlc3VsdC5nZXQoaSAtIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoUmVzdWx0LmhpdHMuZmluZEluZGV4KFxuICAgICAgICAgICAgICAoc3IpID0+IHNyLmluZGV4ID09PSBwaGl0LmluZGV4XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zZWFyY2hSZXN1bHQuc2l6ZSgpIC0gMTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZExhc3RIaXRJbmRleChjYW52YXNHcm91cEluZGV4ZXM6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuc2VhcmNoUmVzdWx0IHx8ICFjYW52YXNHcm91cEluZGV4ZXMpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgY29uc3QgaGl0cyA9IHRoaXMuc2VhcmNoUmVzdWx0LmhpdHMuZmlsdGVyKFxuICAgICAgKGhpdCkgPT4gaGl0LmluZGV4IDwgY2FudmFzR3JvdXBJbmRleGVzWzBdXG4gICAgKTtcbiAgICByZXR1cm4gaGl0cy5sZW5ndGggPiAwID8gaGl0c1toaXRzLmxlbmd0aCAtIDFdLmlkIDogLTE7XG4gIH1cblxuICBwcml2YXRlIGdldExhc3RDYW52YXNHcm91cEluZGV4KGNhbnZhc2VzUGVyQ2FudmFzR3JvdXA6IG51bWJlcltdKSB7XG4gICAgcmV0dXJuIGNhbnZhc2VzUGVyQ2FudmFzR3JvdXAubGVuZ3RoID09PSAxXG4gICAgICA/IGNhbnZhc2VzUGVyQ2FudmFzR3JvdXBbMF1cbiAgICAgIDogY2FudmFzZXNQZXJDYW52YXNHcm91cFsxXTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDdXJyZW50SGl0T25DdXJyZW50Q2FudmFzR3JvdXAoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuY3VycmVudEhpdCkge1xuICAgICAgY29uc3QgY2FudmFzR3JvdXAgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChcbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNJbmRleFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGNhbnZhc2VzUGVyQ2FudmFzR3JvdXAgPVxuICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzZXNQZXJDYW52YXNHcm91cChjYW52YXNHcm91cCk7XG4gICAgICByZXR1cm4gY2FudmFzZXNQZXJDYW52YXNHcm91cC5pbmRleE9mKHRoaXMuY3VycmVudEhpdC5pbmRleCkgIT09IC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=