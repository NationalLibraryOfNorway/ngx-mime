import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../canvas-service/canvas-service";
import * as i2 from "../../iiif-content-search-service/iiif-content-search.service";
export class ContentSearchNavigationService {
    constructor(canvasService, iiifContentSearchService) {
        this.canvasService = canvasService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.currentIndex = 0;
        this.isHitOnActiveCanvasGroup = false;
        this._isFirstHitOnCanvasGroup = false;
        this._isLastHitOnCanvasGroup = false;
        this.canvasesPerCanvasGroup = [-1];
        this.searchResult = null;
        this.initialize();
    }
    initialize() {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((result) => {
            this.searchResult = result;
        }));
    }
    destroy() {
        this.subscriptions.unsubscribe();
    }
    update(canvasGroupIndex) {
        this.canvasesPerCanvasGroup = this.canvasService.getCanvasesPerCanvasGroup(canvasGroupIndex);
        this.currentIndex = this.findCurrentHitIndex(this.canvasesPerCanvasGroup);
        this.isHitOnActiveCanvasGroup = this.findHitOnActiveCanvasGroup();
        this._isFirstHitOnCanvasGroup = this.isFirstHitOnCanvasGroup();
        this._isLastHitOnCanvasGroup = this.findLastHitOnCanvasGroup();
    }
    getCurrentIndex() {
        return this.currentIndex;
    }
    getHitOnActiveCanvasGroup() {
        return this.isHitOnActiveCanvasGroup;
    }
    getFirstHitCanvasGroup() {
        return this._isFirstHitOnCanvasGroup;
    }
    getLastHitCanvasGroup() {
        return this._isLastHitOnCanvasGroup;
    }
    goToNextCanvasGroupHit() {
        if (this.searchResult && !this._isLastHitOnCanvasGroup) {
            let nextHit;
            if (this.currentIndex === -1) {
                nextHit = this.searchResult.get(0);
            }
            else {
                const current = this.searchResult.get(this.currentIndex);
                const canvasGroup = this.canvasService.findCanvasGroupByCanvasIndex(current.index);
                const canvasesPerCanvasGroup = this.canvasService.getCanvasesPerCanvasGroup(canvasGroup);
                const lastCanvasGroupIndex = this.getLastCanvasGroupIndex(canvasesPerCanvasGroup);
                nextHit = this.searchResult.hits.find((h) => h.index > lastCanvasGroupIndex);
            }
            if (nextHit) {
                this.goToCanvasIndex(nextHit);
            }
        }
    }
    goToPreviousCanvasGroupHit() {
        const previousIndex = this.isHitOnActiveCanvasGroup
            ? this.currentIndex - 1
            : this.currentIndex;
        const previousHit = this.findFirstHitOnCanvasGroup(previousIndex);
        if (previousHit) {
            this.goToCanvasIndex(previousHit);
        }
    }
    goToCanvasIndex(hit) {
        this.currentIndex = this.findCurrentHitIndex([hit.index]);
        this.iiifContentSearchService.selected(hit);
    }
    findLastHitOnCanvasGroup() {
        if (!this.searchResult) {
            return false;
        }
        const lastCanvasIndex = this.searchResult.get(this.searchResult.size() - 1)
            .index;
        const currentHit = this.searchResult.get(this.currentIndex);
        return currentHit.index === lastCanvasIndex;
    }
    findFirstHitOnCanvasGroup(previousIndex) {
        if (!this.searchResult) {
            return;
        }
        let previousHit = this.searchResult.get(previousIndex);
        const canvasGroupIndex = this.canvasService.findCanvasGroupByCanvasIndex(previousHit.index);
        const canvasesPerCanvasGroup = this.canvasService.getCanvasesPerCanvasGroup(canvasGroupIndex);
        const leftCanvas = canvasesPerCanvasGroup[0];
        const leftCanvasHit = this.searchResult.hits.find((h) => h.index === leftCanvas);
        if (leftCanvasHit) {
            previousHit = leftCanvasHit;
        }
        else if (canvasesPerCanvasGroup.length === 2) {
            const rightCanvas = canvasesPerCanvasGroup[1];
            previousHit = this.searchResult.hits.find((h) => h.index === rightCanvas);
        }
        return previousHit;
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
    isFirstHitOnCanvasGroup() {
        return this.currentIndex <= 0;
    }
    getLastCanvasGroupIndex(canvasesPerCanvasGroup) {
        return canvasesPerCanvasGroup.length === 1
            ? canvasesPerCanvasGroup[0]
            : canvasesPerCanvasGroup[1];
    }
}
ContentSearchNavigationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: ContentSearchNavigationService, deps: [{ token: i1.CanvasService }, { token: i2.IiifContentSearchService }], target: i0.ɵɵFactoryTarget.Injectable });
ContentSearchNavigationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: ContentSearchNavigationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: ContentSearchNavigationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CanvasService }, { type: i2.IiifContentSearchService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbmF2aWdhdGlvbi9jb250ZW50LXNlYXJjaC1uYXZpZ2F0aW9uLXNlcnZpY2UvY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQUdwQyxNQUFNLE9BQU8sOEJBQThCO0lBU3pDLFlBQ1UsYUFBNEIsRUFDNUIsd0JBQWtEO1FBRGxELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFWcEQsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsNkJBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQyw0QkFBdUIsR0FBRyxLQUFLLENBQUM7UUFDaEMsMkJBQXNCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLGlCQUFZLEdBQXdCLElBQUksQ0FBQztRQU8vQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUM5QyxDQUFDLE1BQW9CLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUM3QixDQUFDLENBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxNQUFNLENBQUMsZ0JBQXdCO1FBQzdCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUN4RSxnQkFBZ0IsQ0FDakIsQ0FBQztRQUNGLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNsRSxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0QsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFFRCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRCx5QkFBeUI7UUFDdkIsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUM7SUFDdkMsQ0FBQztJQUVELHNCQUFzQjtRQUNwQixPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztJQUN2QyxDQUFDO0lBRUQscUJBQXFCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDO0lBQ3RDLENBQUM7SUFFRCxzQkFBc0I7UUFDcEIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ3RELElBQUksT0FBd0IsQ0FBQztZQUM3QixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQztpQkFBTTtnQkFDTCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3pELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQ2pFLE9BQU8sQ0FBQyxLQUFLLENBQ2QsQ0FBQztnQkFDRixNQUFNLHNCQUFzQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQ3pFLFdBQVcsQ0FDWixDQUFDO2dCQUNGLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUN2RCxzQkFBc0IsQ0FDdkIsQ0FBQztnQkFDRixPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNuQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FDdEMsQ0FBQzthQUNIO1lBQ0QsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMvQjtTQUNGO0lBQ0gsQ0FBQztJQUVELDBCQUEwQjtRQUN4QixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsd0JBQXdCO1lBQ2pELENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUM7WUFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDdEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xFLElBQUksV0FBVyxFQUFFO1lBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUM7SUFFTyxlQUFlLENBQUMsR0FBUTtRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVPLHdCQUF3QjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDeEUsS0FBSyxDQUFDO1FBQ1QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVELE9BQU8sVUFBVSxDQUFDLEtBQUssS0FBSyxlQUFlLENBQUM7SUFDOUMsQ0FBQztJQUVPLHlCQUF5QixDQUFDLGFBQXFCO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLE9BQU87U0FDUjtRQUNELElBQUksV0FBVyxHQUFvQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RSxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQ3RFLFdBQVcsQ0FBQyxLQUFLLENBQ2xCLENBQUM7UUFDRixNQUFNLHNCQUFzQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQ3pFLGdCQUFnQixDQUNqQixDQUFDO1FBQ0YsTUFBTSxVQUFVLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUMvQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxVQUFVLENBQzlCLENBQUM7UUFDRixJQUFJLGFBQWEsRUFBRTtZQUNqQixXQUFXLEdBQUcsYUFBYSxDQUFDO1NBQzdCO2FBQU0sSUFBSSxzQkFBc0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzlDLE1BQU0sV0FBVyxHQUFHLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssV0FBVyxDQUFDLENBQUM7U0FDM0U7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRU8sMEJBQTBCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLENBQ0wsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FDL0MsSUFBSSxDQUFDLENBQ1AsQ0FBQztJQUNKLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxrQkFBNEI7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNYO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUMsT0FBTyxDQUFDLENBQUM7YUFDVjtZQUNELElBQUksR0FBRyxDQUFDLEtBQUssSUFBSSxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDWCxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUNYO3FCQUFNO29CQUNMLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDMUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQ3JDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQ2hDLENBQUM7aUJBQ0g7YUFDRjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU8sdUJBQXVCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVPLHVCQUF1QixDQUFDLHNCQUFnQztRQUM5RCxPQUFPLHNCQUFzQixDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7OzJIQS9LVSw4QkFBOEI7K0hBQTlCLDhCQUE4QjsyRkFBOUIsOEJBQThCO2tCQUQxQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi8uLi9tb2RlbHMvc2VhcmNoLXJlc3VsdCc7XG5pbXBvcnQgeyBIaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvaGl0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjdXJyZW50SW5kZXggPSAwO1xuICBwcml2YXRlIGlzSGl0T25BY3RpdmVDYW52YXNHcm91cCA9IGZhbHNlO1xuICBwcml2YXRlIF9pc0ZpcnN0SGl0T25DYW52YXNHcm91cCA9IGZhbHNlO1xuICBwcml2YXRlIF9pc0xhc3RIaXRPbkNhbnZhc0dyb3VwID0gZmFsc2U7XG4gIHByaXZhdGUgY2FudmFzZXNQZXJDYW52YXNHcm91cCA9IFstMV07XG4gIHByaXZhdGUgc2VhcmNoUmVzdWx0OiBTZWFyY2hSZXN1bHQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zITogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZDb250ZW50U2VhcmNoU2VydmljZTogSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKHJlc3VsdDogU2VhcmNoUmVzdWx0KSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHVwZGF0ZShjYW52YXNHcm91cEluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXAgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzZXNQZXJDYW52YXNHcm91cChcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXhcbiAgICApO1xuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5maW5kQ3VycmVudEhpdEluZGV4KHRoaXMuY2FudmFzZXNQZXJDYW52YXNHcm91cCk7XG4gICAgdGhpcy5pc0hpdE9uQWN0aXZlQ2FudmFzR3JvdXAgPSB0aGlzLmZpbmRIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwKCk7XG4gICAgdGhpcy5faXNGaXJzdEhpdE9uQ2FudmFzR3JvdXAgPSB0aGlzLmlzRmlyc3RIaXRPbkNhbnZhc0dyb3VwKCk7XG4gICAgdGhpcy5faXNMYXN0SGl0T25DYW52YXNHcm91cCA9IHRoaXMuZmluZExhc3RIaXRPbkNhbnZhc0dyb3VwKCk7XG4gIH1cblxuICBnZXRDdXJyZW50SW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50SW5kZXg7XG4gIH1cblxuICBnZXRIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzSGl0T25BY3RpdmVDYW52YXNHcm91cDtcbiAgfVxuXG4gIGdldEZpcnN0SGl0Q2FudmFzR3JvdXAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzRmlyc3RIaXRPbkNhbnZhc0dyb3VwO1xuICB9XG5cbiAgZ2V0TGFzdEhpdENhbnZhc0dyb3VwKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0xhc3RIaXRPbkNhbnZhc0dyb3VwO1xuICB9XG5cbiAgZ29Ub05leHRDYW52YXNHcm91cEhpdCgpIHtcbiAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHQgJiYgIXRoaXMuX2lzTGFzdEhpdE9uQ2FudmFzR3JvdXApIHtcbiAgICAgIGxldCBuZXh0SGl0OiBIaXQgfCB1bmRlZmluZWQ7XG4gICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPT09IC0xKSB7XG4gICAgICAgIG5leHRIaXQgPSB0aGlzLnNlYXJjaFJlc3VsdC5nZXQoMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5zZWFyY2hSZXN1bHQuZ2V0KHRoaXMuY3VycmVudEluZGV4KTtcbiAgICAgICAgY29uc3QgY2FudmFzR3JvdXAgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChcbiAgICAgICAgICBjdXJyZW50LmluZGV4XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGNhbnZhc2VzUGVyQ2FudmFzR3JvdXAgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzZXNQZXJDYW52YXNHcm91cChcbiAgICAgICAgICBjYW52YXNHcm91cFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBsYXN0Q2FudmFzR3JvdXBJbmRleCA9IHRoaXMuZ2V0TGFzdENhbnZhc0dyb3VwSW5kZXgoXG4gICAgICAgICAgY2FudmFzZXNQZXJDYW52YXNHcm91cFxuICAgICAgICApO1xuICAgICAgICBuZXh0SGl0ID0gdGhpcy5zZWFyY2hSZXN1bHQuaGl0cy5maW5kKFxuICAgICAgICAgIChoKSA9PiBoLmluZGV4ID4gbGFzdENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZXh0SGl0KSB7XG4gICAgICAgIHRoaXMuZ29Ub0NhbnZhc0luZGV4KG5leHRIaXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdvVG9QcmV2aW91c0NhbnZhc0dyb3VwSGl0KCkge1xuICAgIGNvbnN0IHByZXZpb3VzSW5kZXggPSB0aGlzLmlzSGl0T25BY3RpdmVDYW52YXNHcm91cFxuICAgICAgPyB0aGlzLmN1cnJlbnRJbmRleCAtIDFcbiAgICAgIDogdGhpcy5jdXJyZW50SW5kZXg7XG4gICAgY29uc3QgcHJldmlvdXNIaXQgPSB0aGlzLmZpbmRGaXJzdEhpdE9uQ2FudmFzR3JvdXAocHJldmlvdXNJbmRleCk7XG4gICAgaWYgKHByZXZpb3VzSGl0KSB7XG4gICAgICB0aGlzLmdvVG9DYW52YXNJbmRleChwcmV2aW91c0hpdCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnb1RvQ2FudmFzSW5kZXgoaGl0OiBIaXQpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuZmluZEN1cnJlbnRIaXRJbmRleChbaGl0LmluZGV4XSk7XG4gICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uuc2VsZWN0ZWQoaGl0KTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZExhc3RIaXRPbkNhbnZhc0dyb3VwKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5zZWFyY2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgbGFzdENhbnZhc0luZGV4ID0gdGhpcy5zZWFyY2hSZXN1bHQuZ2V0KHRoaXMuc2VhcmNoUmVzdWx0LnNpemUoKSAtIDEpXG4gICAgICAuaW5kZXg7XG4gICAgY29uc3QgY3VycmVudEhpdCA9IHRoaXMuc2VhcmNoUmVzdWx0LmdldCh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgcmV0dXJuIGN1cnJlbnRIaXQuaW5kZXggPT09IGxhc3RDYW52YXNJbmRleDtcbiAgfVxuXG4gIHByaXZhdGUgZmluZEZpcnN0SGl0T25DYW52YXNHcm91cChwcmV2aW91c0luZGV4OiBudW1iZXIpOiBIaXQgfCB1bmRlZmluZWQge1xuICAgIGlmICghdGhpcy5zZWFyY2hSZXN1bHQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHByZXZpb3VzSGl0OiBIaXQgfCB1bmRlZmluZWQgPSB0aGlzLnNlYXJjaFJlc3VsdC5nZXQocHJldmlvdXNJbmRleCk7XG4gICAgY29uc3QgY2FudmFzR3JvdXBJbmRleCA9IHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzR3JvdXBCeUNhbnZhc0luZGV4KFxuICAgICAgcHJldmlvdXNIaXQuaW5kZXhcbiAgICApO1xuICAgIGNvbnN0IGNhbnZhc2VzUGVyQ2FudmFzR3JvdXAgPSB0aGlzLmNhbnZhc1NlcnZpY2UuZ2V0Q2FudmFzZXNQZXJDYW52YXNHcm91cChcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXhcbiAgICApO1xuICAgIGNvbnN0IGxlZnRDYW52YXMgPSBjYW52YXNlc1BlckNhbnZhc0dyb3VwWzBdO1xuICAgIGNvbnN0IGxlZnRDYW52YXNIaXQgPSB0aGlzLnNlYXJjaFJlc3VsdC5oaXRzLmZpbmQoXG4gICAgICAoaCkgPT4gaC5pbmRleCA9PT0gbGVmdENhbnZhc1xuICAgICk7XG4gICAgaWYgKGxlZnRDYW52YXNIaXQpIHtcbiAgICAgIHByZXZpb3VzSGl0ID0gbGVmdENhbnZhc0hpdDtcbiAgICB9IGVsc2UgaWYgKGNhbnZhc2VzUGVyQ2FudmFzR3JvdXAubGVuZ3RoID09PSAyKSB7XG4gICAgICBjb25zdCByaWdodENhbnZhcyA9IGNhbnZhc2VzUGVyQ2FudmFzR3JvdXBbMV07XG4gICAgICBwcmV2aW91c0hpdCA9IHRoaXMuc2VhcmNoUmVzdWx0LmhpdHMuZmluZCgoaCkgPT4gaC5pbmRleCA9PT0gcmlnaHRDYW52YXMpO1xuICAgIH1cbiAgICByZXR1cm4gcHJldmlvdXNIaXQ7XG4gIH1cblxuICBwcml2YXRlIGZpbmRIaXRPbkFjdGl2ZUNhbnZhc0dyb3VwKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5zZWFyY2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuY2FudmFzZXNQZXJDYW52YXNHcm91cC5pbmRleE9mKFxuICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdC5nZXQodGhpcy5jdXJyZW50SW5kZXgpLmluZGV4XG4gICAgICApID49IDBcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kQ3VycmVudEhpdEluZGV4KGNhbnZhc0dyb3VwSW5kZXhlczogbnVtYmVyW10pOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5zZWFyY2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VhcmNoUmVzdWx0LnNpemUoKTsgaSsrKSB7XG4gICAgICBjb25zdCBoaXQgPSB0aGlzLnNlYXJjaFJlc3VsdC5nZXQoaSk7XG4gICAgICBpZiAoY2FudmFzR3JvdXBJbmRleGVzLmluZGV4T2YoaGl0LmluZGV4KSA+PSAwKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgICAgaWYgKGhpdC5pbmRleCA+PSBjYW52YXNHcm91cEluZGV4ZXNbY2FudmFzR3JvdXBJbmRleGVzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHBoaXQgPSB0aGlzLnNlYXJjaFJlc3VsdC5nZXQoaSAtIDEpO1xuICAgICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFJlc3VsdC5oaXRzLmZpbmRJbmRleChcbiAgICAgICAgICAgIChzcikgPT4gc3IuaW5kZXggPT09IHBoaXQuaW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNlYXJjaFJlc3VsdC5zaXplKCkgLSAxO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0ZpcnN0SGl0T25DYW52YXNHcm91cCgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50SW5kZXggPD0gMDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TGFzdENhbnZhc0dyb3VwSW5kZXgoY2FudmFzZXNQZXJDYW52YXNHcm91cDogbnVtYmVyW10pIHtcbiAgICByZXR1cm4gY2FudmFzZXNQZXJDYW52YXNHcm91cC5sZW5ndGggPT09IDFcbiAgICAgID8gY2FudmFzZXNQZXJDYW52YXNHcm91cFswXVxuICAgICAgOiBjYW52YXNlc1BlckNhbnZhc0dyb3VwWzFdO1xuICB9XG59XG4iXX0=