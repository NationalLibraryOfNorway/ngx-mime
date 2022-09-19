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
ContentSearchNavigationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentSearchNavigationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentSearchNavigationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CanvasService }, { type: i2.IiifContentSearchService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbmF2aWdhdGlvbi9jb250ZW50LXNlYXJjaC1uYXZpZ2F0aW9uLXNlcnZpY2UvY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFPdEQsTUFBTSxPQUFPLDhCQUE4QjtJQVV6QyxZQUNVLGFBQTRCLEVBQzVCLHdCQUFrRDtRQURsRCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1Qiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBWHBELGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQyxlQUFVLEdBQWUsSUFBSSxDQUFDO1FBQzlCLDJCQUFzQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixpQkFBWSxHQUF3QixJQUFJLENBQUM7UUFFekMsd0JBQW1CLEdBQW9CLElBQUksT0FBTyxFQUFVLENBQUM7UUFNbkUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FDOUMsQ0FBQyxNQUFvQixFQUFFLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQyxDQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsTUFBTSxDQUFDLGdCQUF3QjtRQUM3QixJQUFJLENBQUMsc0JBQXNCO1lBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxJQUFJLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTyx1QkFBdUI7UUFDN0IsSUFBSSxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsRUFBRTtZQUMzQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7YUFDM0I7U0FDRjtRQUNELElBQUksSUFBSSxDQUFDLHdCQUF3QixFQUFFO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVELHlCQUF5QjtRQUN2QixPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGdDQUFnQyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDakM7YUFBTTtZQUNMLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFO1lBQzNDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1NBQ3JDO2FBQU07WUFDTCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsR0FBUTtRQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQzFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVPLHdCQUF3QjtRQUM5QixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN4QyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN4QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3pEO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sNEJBQTRCO1FBQ2xDLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3hDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQ3hDLElBQUksWUFBWSxHQUFHLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQy9EO1NBQ0Y7SUFDSCxDQUFDO0lBRU8saUJBQWlCO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLE9BQXdCLENBQUM7WUFDN0IsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUM1QixPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEM7aUJBQU07Z0JBQ0wsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7b0JBQ2pDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ25DLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQ3RDLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN6RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUNqRSxPQUFPLENBQUMsS0FBSyxDQUNkLENBQUM7b0JBQ0YsTUFBTSxzQkFBc0IsR0FDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDNUQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQ3ZELHNCQUFzQixDQUN2QixDQUFDO29CQUNGLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ25DLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUN0QyxDQUFDO2lCQUNIO2FBQ0Y7WUFDRCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3hCO1NBQ0Y7SUFDSCxDQUFDO0lBRU8scUJBQXFCO1FBQzNCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzthQUMxRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2FBQzFEO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sMEJBQTBCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLENBQ0wsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FDL0MsSUFBSSxDQUFDLENBQ1AsQ0FBQztJQUNKLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxrQkFBNEI7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNYO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUMsT0FBTyxDQUFDLENBQUM7YUFDVjtZQUNELElBQUksR0FBRyxDQUFDLEtBQUssSUFBSSxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDWCxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUNYO3FCQUFNO29CQUNMLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDMUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQ3JDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQ2hDLENBQUM7aUJBQ0g7YUFDRjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsa0JBQTRCO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDWDtRQUNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FDeEMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQzNDLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTyx1QkFBdUIsQ0FBQyxzQkFBZ0M7UUFDOUQsT0FBTyxzQkFBc0IsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUN4QyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU8sZ0NBQWdDO1FBQ3RDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUN0QyxDQUFDO1lBQ0YsTUFBTSxzQkFBc0IsR0FDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1RCxPQUFPLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7MkhBL01VLDhCQUE4QjsrSEFBOUIsOEJBQThCOzJGQUE5Qiw4QkFBOEI7a0JBRDFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2FudmFzU2VydmljZSB9IGZyb20gJy4uLy4uL2NhbnZhcy1zZXJ2aWNlL2NhbnZhcy1zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZDb250ZW50U2VhcmNoU2VydmljZSB9IGZyb20gJy4uLy4uL2lpaWYtY29udGVudC1zZWFyY2gtc2VydmljZS9paWlmLWNvbnRlbnQtc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGl0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2hpdCc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi8uLi9tb2RlbHMvc2VhcmNoLXJlc3VsdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2Uge1xuICBwcml2YXRlIGN1cnJlbnRJbmRleCA9IDA7XG4gIHByaXZhdGUgbGFzdEhpdEluZGV4ID0gMDtcbiAgcHJpdmF0ZSBpc0hpdE9uQWN0aXZlQ2FudmFzR3JvdXAgPSBmYWxzZTtcbiAgcHJpdmF0ZSBjdXJyZW50SGl0OiBIaXQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBjYW52YXNlc1BlckNhbnZhc0dyb3VwID0gWy0xXTtcbiAgcHJpdmF0ZSBzZWFyY2hSZXN1bHQ6IFNlYXJjaFJlc3VsdCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMhOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgX2N1cnJlbnRIaXRDb3VudGVyJDogU3ViamVjdDxudW1iZXI+ID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZDb250ZW50U2VhcmNoU2VydmljZTogSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKHJlc3VsdDogU2VhcmNoUmVzdWx0KSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgdGhpcy5jdXJyZW50SGl0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgdXBkYXRlKGNhbnZhc0dyb3VwSW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuY2FudmFzZXNQZXJDYW52YXNHcm91cCA9XG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzZXNQZXJDYW52YXNHcm91cChjYW52YXNHcm91cEluZGV4KTtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuZmluZEN1cnJlbnRIaXRJbmRleCh0aGlzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXApO1xuICAgIHRoaXMubGFzdEhpdEluZGV4ID0gdGhpcy5maW5kTGFzdEhpdEluZGV4KHRoaXMuY2FudmFzZXNQZXJDYW52YXNHcm91cCk7XG4gICAgdGhpcy5pc0hpdE9uQWN0aXZlQ2FudmFzR3JvdXAgPSB0aGlzLmZpbmRIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwKCk7XG4gICAgdGhpcy5fY3VycmVudEhpdENvdW50ZXIkLm5leHQodGhpcy51cGRhdGVDdXJyZW50SGl0Q291bnRlcigpKTtcbiAgfVxuXG4gIGdldCBjdXJyZW50SGl0Q291bnRlcigpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50SGl0Q291bnRlciQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ3VycmVudEhpdENvdW50ZXIoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5pc0N1cnJlbnRIaXRPbkN1cnJlbnRDYW52YXNHcm91cCgpKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50SGl0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRIaXQuaWQ7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmlzSGl0T25BY3RpdmVDYW52YXNHcm91cCkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5sYXN0SGl0SW5kZXg7XG4gICAgfVxuICB9XG5cbiAgZ2V0SGl0T25BY3RpdmVDYW52YXNHcm91cCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0hpdE9uQWN0aXZlQ2FudmFzR3JvdXA7XG4gIH1cblxuICBnb1RvTmV4dEhpdCgpIHtcbiAgICBpZiAodGhpcy5pc0N1cnJlbnRIaXRPbkN1cnJlbnRDYW52YXNHcm91cCgpKSB7XG4gICAgICB0aGlzLmdvVG9OZXh0Q3VycmVudENhbnZhc0hpdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdvVG9OZXh0Q2FudmFzSGl0KCk7XG4gICAgfVxuICB9XG5cbiAgZ29Ub1ByZXZpb3VzSGl0KCkge1xuICAgIGlmICh0aGlzLmlzQ3VycmVudEhpdE9uQ3VycmVudENhbnZhc0dyb3VwKCkpIHtcbiAgICAgIHRoaXMuZ29Ub1ByZXZpb3VzQ3VycmVudENhbnZhc0hpdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdvVG9QcmV2aW91c0NhbnZhc0hpdCgpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdGVkKGhpdDogSGl0KTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50SGl0ID0gaGl0O1xuICAgIHRoaXMuX2N1cnJlbnRIaXRDb3VudGVyJC5uZXh0KHRoaXMuY3VycmVudEhpdC5pZCk7XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLmN1cnJlbnRIaXQuaW5kZXg7XG4gICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uuc2VsZWN0ZWQoaGl0KTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ub05leHRDdXJyZW50Q2FudmFzSGl0KCkge1xuICAgIGlmICh0aGlzLnNlYXJjaFJlc3VsdCAmJiB0aGlzLmN1cnJlbnRIaXQpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRIaXRJZCA9IHRoaXMuY3VycmVudEhpdC5pZDtcbiAgICAgIGlmIChjdXJyZW50SGl0SWQgPCB0aGlzLnNlYXJjaFJlc3VsdC5oaXRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCh0aGlzLnNlYXJjaFJlc3VsdC5oaXRzW2N1cnJlbnRIaXRJZCArIDFdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdvVG9QcmV2aW91c0N1cnJlbnRDYW52YXNIaXQoKSB7XG4gICAgaWYgKHRoaXMuc2VhcmNoUmVzdWx0ICYmIHRoaXMuY3VycmVudEhpdCkge1xuICAgICAgY29uc3QgY3VycmVudEhpdElkID0gdGhpcy5jdXJyZW50SGl0LmlkO1xuICAgICAgaWYgKGN1cnJlbnRIaXRJZCA+IDApIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCh0aGlzLnNlYXJjaFJlc3VsdC5oaXRzW3RoaXMuY3VycmVudEhpdC5pZCAtIDFdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdvVG9OZXh0Q2FudmFzSGl0KCkge1xuICAgIGlmICh0aGlzLnNlYXJjaFJlc3VsdCkge1xuICAgICAgbGV0IG5leHRIaXQ6IEhpdCB8IHVuZGVmaW5lZDtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgbmV4dEhpdCA9IHRoaXMuc2VhcmNoUmVzdWx0LmdldCgwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmlzSGl0T25BY3RpdmVDYW52YXNHcm91cCkge1xuICAgICAgICAgIG5leHRIaXQgPSB0aGlzLnNlYXJjaFJlc3VsdC5oaXRzLmZpbmQoXG4gICAgICAgICAgICAoaGl0KSA9PiBoaXQuaWQgPT09IHRoaXMuY3VycmVudEluZGV4XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5zZWFyY2hSZXN1bHQuZ2V0KHRoaXMuY3VycmVudEluZGV4KTtcbiAgICAgICAgICBjb25zdCBjYW52YXNHcm91cCA9IHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KFxuICAgICAgICAgICAgY3VycmVudC5pbmRleFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgY2FudmFzZXNQZXJDYW52YXNHcm91cCA9XG4gICAgICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzZXNQZXJDYW52YXNHcm91cChjYW52YXNHcm91cCk7XG4gICAgICAgICAgY29uc3QgbGFzdENhbnZhc0dyb3VwSW5kZXggPSB0aGlzLmdldExhc3RDYW52YXNHcm91cEluZGV4KFxuICAgICAgICAgICAgY2FudmFzZXNQZXJDYW52YXNHcm91cFxuICAgICAgICAgICk7XG4gICAgICAgICAgbmV4dEhpdCA9IHRoaXMuc2VhcmNoUmVzdWx0LmhpdHMuZmluZChcbiAgICAgICAgICAgIChoKSA9PiBoLmluZGV4ID4gbGFzdENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobmV4dEhpdCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkKG5leHRIaXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ29Ub1ByZXZpb3VzQ2FudmFzSGl0KCkge1xuICAgIGlmICh0aGlzLnNlYXJjaFJlc3VsdCkge1xuICAgICAgaWYgKHRoaXMuaXNIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQodGhpcy5zZWFyY2hSZXN1bHQuaGl0c1t0aGlzLmN1cnJlbnRJbmRleF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCh0aGlzLnNlYXJjaFJlc3VsdC5oaXRzW3RoaXMubGFzdEhpdEluZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmaW5kSGl0T25BY3RpdmVDYW52YXNHcm91cCgpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuc2VhcmNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXAuaW5kZXhPZihcbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHQuZ2V0KHRoaXMuY3VycmVudEluZGV4KS5pbmRleFxuICAgICAgKSA+PSAwXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZEN1cnJlbnRIaXRJbmRleChjYW52YXNHcm91cEluZGV4ZXM6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuc2VhcmNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlYXJjaFJlc3VsdC5zaXplKCk7IGkrKykge1xuICAgICAgY29uc3QgaGl0ID0gdGhpcy5zZWFyY2hSZXN1bHQuZ2V0KGkpO1xuICAgICAgaWYgKGNhbnZhc0dyb3VwSW5kZXhlcy5pbmRleE9mKGhpdC5pbmRleCkgPj0gMCkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICAgIGlmIChoaXQuaW5kZXggPj0gY2FudmFzR3JvdXBJbmRleGVzW2NhbnZhc0dyb3VwSW5kZXhlcy5sZW5ndGggLSAxXSkge1xuICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBwaGl0ID0gdGhpcy5zZWFyY2hSZXN1bHQuZ2V0KGkgLSAxKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hSZXN1bHQuaGl0cy5maW5kSW5kZXgoXG4gICAgICAgICAgICAoc3IpID0+IHNyLmluZGV4ID09PSBwaGl0LmluZGV4XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zZWFyY2hSZXN1bHQuc2l6ZSgpIC0gMTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZExhc3RIaXRJbmRleChjYW52YXNHcm91cEluZGV4ZXM6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuc2VhcmNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGNvbnN0IGhpdHMgPSB0aGlzLnNlYXJjaFJlc3VsdC5oaXRzLmZpbHRlcihcbiAgICAgIChoaXQpID0+IGhpdC5pbmRleCA8IGNhbnZhc0dyb3VwSW5kZXhlc1swXVxuICAgICk7XG4gICAgcmV0dXJuIGhpdHMubGVuZ3RoID4gMCA/IGhpdHNbaGl0cy5sZW5ndGggLSAxXS5pZCA6IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRMYXN0Q2FudmFzR3JvdXBJbmRleChjYW52YXNlc1BlckNhbnZhc0dyb3VwOiBudW1iZXJbXSkge1xuICAgIHJldHVybiBjYW52YXNlc1BlckNhbnZhc0dyb3VwLmxlbmd0aCA9PT0gMVxuICAgICAgPyBjYW52YXNlc1BlckNhbnZhc0dyb3VwWzBdXG4gICAgICA6IGNhbnZhc2VzUGVyQ2FudmFzR3JvdXBbMV07XG4gIH1cblxuICBwcml2YXRlIGlzQ3VycmVudEhpdE9uQ3VycmVudENhbnZhc0dyb3VwKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmN1cnJlbnRIaXQpIHtcbiAgICAgIGNvbnN0IGNhbnZhc0dyb3VwID0gdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNHcm91cEJ5Q2FudmFzSW5kZXgoXG4gICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzSW5kZXhcbiAgICAgICk7XG4gICAgICBjb25zdCBjYW52YXNlc1BlckNhbnZhc0dyb3VwID1cbiAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmdldENhbnZhc2VzUGVyQ2FudmFzR3JvdXAoY2FudmFzR3JvdXApO1xuICAgICAgcmV0dXJuIGNhbnZhc2VzUGVyQ2FudmFzR3JvdXAuaW5kZXhPZih0aGlzLmN1cnJlbnRIaXQuaW5kZXgpICE9PSAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl19