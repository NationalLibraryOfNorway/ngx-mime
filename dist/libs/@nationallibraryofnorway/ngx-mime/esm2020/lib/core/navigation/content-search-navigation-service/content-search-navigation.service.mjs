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
ContentSearchNavigationService.ɵfac = function ContentSearchNavigationService_Factory(t) { return new (t || ContentSearchNavigationService)(i0.ɵɵinject(i1.CanvasService), i0.ɵɵinject(i2.IiifContentSearchService)); };
ContentSearchNavigationService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ContentSearchNavigationService, factory: ContentSearchNavigationService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContentSearchNavigationService, [{
        type: Injectable
    }], function () { return [{ type: i1.CanvasService }, { type: i2.IiifContentSearchService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbmF2aWdhdGlvbi9jb250ZW50LXNlYXJjaC1uYXZpZ2F0aW9uLXNlcnZpY2UvY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDOzs7O0FBS3pHLE1BQU0sT0FBTyw4QkFBOEI7SUFVekMsWUFDVSxhQUE0QixFQUM1Qix3QkFBa0Q7UUFEbEQsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQVhwRCxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQiw2QkFBd0IsR0FBRyxLQUFLLENBQUM7UUFDakMsZUFBVSxHQUFlLElBQUksQ0FBQztRQUM5QiwyQkFBc0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsaUJBQVksR0FBd0IsSUFBSSxDQUFDO1FBRXpDLHdCQUFtQixHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBTW5FLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQzlDLENBQUMsTUFBb0IsRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUMsQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELE1BQU0sQ0FBQyxnQkFBd0I7UUFDN0IsSUFBSSxDQUFDLHNCQUFzQjtZQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU8sdUJBQXVCO1FBQzdCLElBQUksSUFBSSxDQUFDLGdDQUFnQyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNuQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO2FBQzNCO1NBQ0Y7UUFDRCxJQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtZQUNqQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDMUI7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFRCx5QkFBeUI7UUFDdkIsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUM7SUFDdkMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFO1lBQzNDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1NBQ2pDO2FBQU07WUFDTCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsRUFBRTtZQUMzQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztTQUNyQzthQUFNO1lBQ0wsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVE7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUMxQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTyx3QkFBd0I7UUFDOUIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDeEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDeEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN6RDtTQUNGO0lBQ0gsQ0FBQztJQUVPLDRCQUE0QjtRQUNsQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN4QyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN4QyxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvRDtTQUNGO0lBQ0gsQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxPQUF3QixDQUFDO1lBQzdCLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNMLElBQUksSUFBSSxDQUFDLHdCQUF3QixFQUFFO29CQUNqQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNuQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUN0QyxDQUFDO2lCQUNIO3FCQUFNO29CQUNMLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDekQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FDakUsT0FBTyxDQUFDLEtBQUssQ0FDZCxDQUFDO29CQUNGLE1BQU0sc0JBQXNCLEdBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzVELE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUN2RCxzQkFBc0IsQ0FDdkIsQ0FBQztvQkFDRixPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNuQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FDdEMsQ0FBQztpQkFDSDthQUNGO1lBQ0QsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN4QjtTQUNGO0lBQ0gsQ0FBQztJQUVPLHFCQUFxQjtRQUMzQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7YUFDMUQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzthQUMxRDtTQUNGO0lBQ0gsQ0FBQztJQUVPLDBCQUEwQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxDQUNMLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQy9DLElBQUksQ0FBQyxDQUNQLENBQUM7SUFDSixDQUFDO0lBRU8sbUJBQW1CLENBQUMsa0JBQTRCO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDWDtRQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksa0JBQWtCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlDLE9BQU8sQ0FBQyxDQUFDO2FBQ1Y7WUFDRCxJQUFJLEdBQUcsQ0FBQyxLQUFLLElBQUksa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ1gsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDWDtxQkFBTTtvQkFDTCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzFDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUNyQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUNoQyxDQUFDO2lCQUNIO2FBQ0Y7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVPLGdCQUFnQixDQUFDLGtCQUE0QjtRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ1g7UUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQ3hDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUMzQyxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU8sdUJBQXVCLENBQUMsc0JBQWdDO1FBQzlELE9BQU8sc0JBQXNCLENBQUMsTUFBTSxLQUFLLENBQUM7WUFDeEMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVPLGdDQUFnQztRQUN0QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FDakUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FDdEMsQ0FBQztZQUNGLE1BQU0sc0JBQXNCLEdBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUQsT0FBTyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNyRTthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7OzRHQS9NVSw4QkFBOEI7b0ZBQTlCLDhCQUE4QixXQUE5Qiw4QkFBOEI7dUZBQTlCLDhCQUE4QjtjQUQxQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi8uLi9paWlmLWNvbnRlbnQtc2VhcmNoLXNlcnZpY2UvaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IEhpdCB9IGZyb20gJy4uLy4uL21vZGVscy9oaXQnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3NlYXJjaC1yZXN1bHQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjdXJyZW50SW5kZXggPSAwO1xuICBwcml2YXRlIGxhc3RIaXRJbmRleCA9IDA7XG4gIHByaXZhdGUgaXNIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwID0gZmFsc2U7XG4gIHByaXZhdGUgY3VycmVudEhpdDogSGl0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgY2FudmFzZXNQZXJDYW52YXNHcm91cCA9IFstMV07XG4gIHByaXZhdGUgc2VhcmNoUmVzdWx0OiBTZWFyY2hSZXN1bHQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zITogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9jdXJyZW50SGl0Q291bnRlciQ6IFN1YmplY3Q8bnVtYmVyPiA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhbnZhc1NlcnZpY2U6IENhbnZhc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmQ29udGVudFNlYXJjaFNlcnZpY2U6IElpaWZDb250ZW50U2VhcmNoU2VydmljZVxuICApIHtcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgIChyZXN1bHQ6IFNlYXJjaFJlc3VsdCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgIHRoaXMuY3VycmVudEhpdCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHVwZGF0ZShjYW52YXNHcm91cEluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXAgPVxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc2VzUGVyQ2FudmFzR3JvdXAoY2FudmFzR3JvdXBJbmRleCk7XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLmZpbmRDdXJyZW50SGl0SW5kZXgodGhpcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwKTtcbiAgICB0aGlzLmxhc3RIaXRJbmRleCA9IHRoaXMuZmluZExhc3RIaXRJbmRleCh0aGlzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXApO1xuICAgIHRoaXMuaXNIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwID0gdGhpcy5maW5kSGl0T25BY3RpdmVDYW52YXNHcm91cCgpO1xuICAgIHRoaXMuX2N1cnJlbnRIaXRDb3VudGVyJC5uZXh0KHRoaXMudXBkYXRlQ3VycmVudEhpdENvdW50ZXIoKSk7XG4gIH1cblxuICBnZXQgY3VycmVudEhpdENvdW50ZXIoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEhpdENvdW50ZXIkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUN1cnJlbnRIaXRDb3VudGVyKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuaXNDdXJyZW50SGl0T25DdXJyZW50Q2FudmFzR3JvdXAoKSkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudEhpdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50SGl0LmlkO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5pc0hpdE9uQWN0aXZlQ2FudmFzR3JvdXApIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRJbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubGFzdEhpdEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIGdldEhpdE9uQWN0aXZlQ2FudmFzR3JvdXAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwO1xuICB9XG5cbiAgZ29Ub05leHRIaXQoKSB7XG4gICAgaWYgKHRoaXMuaXNDdXJyZW50SGl0T25DdXJyZW50Q2FudmFzR3JvdXAoKSkge1xuICAgICAgdGhpcy5nb1RvTmV4dEN1cnJlbnRDYW52YXNIaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nb1RvTmV4dENhbnZhc0hpdCgpO1xuICAgIH1cbiAgfVxuXG4gIGdvVG9QcmV2aW91c0hpdCgpIHtcbiAgICBpZiAodGhpcy5pc0N1cnJlbnRIaXRPbkN1cnJlbnRDYW52YXNHcm91cCgpKSB7XG4gICAgICB0aGlzLmdvVG9QcmV2aW91c0N1cnJlbnRDYW52YXNIaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nb1RvUHJldmlvdXNDYW52YXNIaXQoKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RlZChoaXQ6IEhpdCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudEhpdCA9IGhpdDtcbiAgICB0aGlzLl9jdXJyZW50SGl0Q291bnRlciQubmV4dCh0aGlzLmN1cnJlbnRIaXQuaWQpO1xuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5jdXJyZW50SGl0LmluZGV4O1xuICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLnNlbGVjdGVkKGhpdCk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9OZXh0Q3VycmVudENhbnZhc0hpdCgpIHtcbiAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHQgJiYgdGhpcy5jdXJyZW50SGl0KSB7XG4gICAgICBjb25zdCBjdXJyZW50SGl0SWQgPSB0aGlzLmN1cnJlbnRIaXQuaWQ7XG4gICAgICBpZiAoY3VycmVudEhpdElkIDwgdGhpcy5zZWFyY2hSZXN1bHQuaGl0cy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQodGhpcy5zZWFyY2hSZXN1bHQuaGl0c1tjdXJyZW50SGl0SWQgKyAxXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnb1RvUHJldmlvdXNDdXJyZW50Q2FudmFzSGl0KCkge1xuICAgIGlmICh0aGlzLnNlYXJjaFJlc3VsdCAmJiB0aGlzLmN1cnJlbnRIaXQpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRIaXRJZCA9IHRoaXMuY3VycmVudEhpdC5pZDtcbiAgICAgIGlmIChjdXJyZW50SGl0SWQgPiAwKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQodGhpcy5zZWFyY2hSZXN1bHQuaGl0c1t0aGlzLmN1cnJlbnRIaXQuaWQgLSAxXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnb1RvTmV4dENhbnZhc0hpdCgpIHtcbiAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHQpIHtcbiAgICAgIGxldCBuZXh0SGl0OiBIaXQgfCB1bmRlZmluZWQ7XG4gICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPT09IC0xKSB7XG4gICAgICAgIG5leHRIaXQgPSB0aGlzLnNlYXJjaFJlc3VsdC5nZXQoMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5pc0hpdE9uQWN0aXZlQ2FudmFzR3JvdXApIHtcbiAgICAgICAgICBuZXh0SGl0ID0gdGhpcy5zZWFyY2hSZXN1bHQuaGl0cy5maW5kKFxuICAgICAgICAgICAgKGhpdCkgPT4gaGl0LmlkID09PSB0aGlzLmN1cnJlbnRJbmRleFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuc2VhcmNoUmVzdWx0LmdldCh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgY29uc3QgY2FudmFzR3JvdXAgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChcbiAgICAgICAgICAgIGN1cnJlbnQuaW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IGNhbnZhc2VzUGVyQ2FudmFzR3JvdXAgPVxuICAgICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc2VzUGVyQ2FudmFzR3JvdXAoY2FudmFzR3JvdXApO1xuICAgICAgICAgIGNvbnN0IGxhc3RDYW52YXNHcm91cEluZGV4ID0gdGhpcy5nZXRMYXN0Q2FudmFzR3JvdXBJbmRleChcbiAgICAgICAgICAgIGNhbnZhc2VzUGVyQ2FudmFzR3JvdXBcbiAgICAgICAgICApO1xuICAgICAgICAgIG5leHRIaXQgPSB0aGlzLnNlYXJjaFJlc3VsdC5oaXRzLmZpbmQoXG4gICAgICAgICAgICAoaCkgPT4gaC5pbmRleCA+IGxhc3RDYW52YXNHcm91cEluZGV4XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG5leHRIaXQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZChuZXh0SGl0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdvVG9QcmV2aW91c0NhbnZhc0hpdCgpIHtcbiAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHQpIHtcbiAgICAgIGlmICh0aGlzLmlzSGl0T25BY3RpdmVDYW52YXNHcm91cCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkKHRoaXMuc2VhcmNoUmVzdWx0LmhpdHNbdGhpcy5jdXJyZW50SW5kZXhdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQodGhpcy5zZWFyY2hSZXN1bHQuaGl0c1t0aGlzLmxhc3RIaXRJbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZEhpdE9uQWN0aXZlQ2FudmFzR3JvdXAoKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLnNlYXJjaFJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwLmluZGV4T2YoXG4gICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0LmdldCh0aGlzLmN1cnJlbnRJbmRleCkuaW5kZXhcbiAgICAgICkgPj0gMFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGZpbmRDdXJyZW50SGl0SW5kZXgoY2FudmFzR3JvdXBJbmRleGVzOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLnNlYXJjaFJlc3VsdCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWFyY2hSZXN1bHQuc2l6ZSgpOyBpKyspIHtcbiAgICAgIGNvbnN0IGhpdCA9IHRoaXMuc2VhcmNoUmVzdWx0LmdldChpKTtcbiAgICAgIGlmIChjYW52YXNHcm91cEluZGV4ZXMuaW5kZXhPZihoaXQuaW5kZXgpID49IDApIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgICBpZiAoaGl0LmluZGV4ID49IGNhbnZhc0dyb3VwSW5kZXhlc1tjYW52YXNHcm91cEluZGV4ZXMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcGhpdCA9IHRoaXMuc2VhcmNoUmVzdWx0LmdldChpIC0gMSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoUmVzdWx0LmhpdHMuZmluZEluZGV4KFxuICAgICAgICAgICAgKHNyKSA9PiBzci5pbmRleCA9PT0gcGhpdC5pbmRleFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoUmVzdWx0LnNpemUoKSAtIDE7XG4gIH1cblxuICBwcml2YXRlIGZpbmRMYXN0SGl0SW5kZXgoY2FudmFzR3JvdXBJbmRleGVzOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLnNlYXJjaFJlc3VsdCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBjb25zdCBoaXRzID0gdGhpcy5zZWFyY2hSZXN1bHQuaGl0cy5maWx0ZXIoXG4gICAgICAoaGl0KSA9PiBoaXQuaW5kZXggPCBjYW52YXNHcm91cEluZGV4ZXNbMF1cbiAgICApO1xuICAgIHJldHVybiBoaXRzLmxlbmd0aCA+IDAgPyBoaXRzW2hpdHMubGVuZ3RoIC0gMV0uaWQgOiAtMTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TGFzdENhbnZhc0dyb3VwSW5kZXgoY2FudmFzZXNQZXJDYW52YXNHcm91cDogbnVtYmVyW10pIHtcbiAgICByZXR1cm4gY2FudmFzZXNQZXJDYW52YXNHcm91cC5sZW5ndGggPT09IDFcbiAgICAgID8gY2FudmFzZXNQZXJDYW52YXNHcm91cFswXVxuICAgICAgOiBjYW52YXNlc1BlckNhbnZhc0dyb3VwWzFdO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0N1cnJlbnRIaXRPbkN1cnJlbnRDYW52YXNHcm91cCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5jdXJyZW50SGl0KSB7XG4gICAgICBjb25zdCBjYW52YXNHcm91cCA9IHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KFxuICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0luZGV4XG4gICAgICApO1xuICAgICAgY29uc3QgY2FudmFzZXNQZXJDYW52YXNHcm91cCA9XG4gICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5nZXRDYW52YXNlc1BlckNhbnZhc0dyb3VwKGNhbnZhc0dyb3VwKTtcbiAgICAgIHJldHVybiBjYW52YXNlc1BlckNhbnZhc0dyb3VwLmluZGV4T2YodGhpcy5jdXJyZW50SGl0LmluZGV4KSAhPT0gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==