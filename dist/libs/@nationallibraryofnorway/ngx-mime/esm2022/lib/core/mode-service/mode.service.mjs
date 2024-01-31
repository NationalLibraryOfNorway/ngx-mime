import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ModeChanges, ViewerMode } from '../models';
import * as i0 from "@angular/core";
export class ModeService {
    constructor() {
        this.modeChanges = new ModeChanges();
        this.toggleModeSubject = new BehaviorSubject(new ModeChanges());
    }
    get onChange() {
        return this.toggleModeSubject.asObservable().pipe(distinctUntilChanged());
    }
    set mode(mode) {
        this._mode = mode;
        this.change();
    }
    get mode() {
        return this._mode;
    }
    initialize() {
        this.mode = this.config?.initViewerMode;
    }
    destroy() {
        this.mode = this.config?.initViewerMode;
    }
    setConfig(config) {
        this.config = config;
    }
    toggleMode() {
        if (this.mode === ViewerMode.DASHBOARD) {
            this.mode = ViewerMode.PAGE;
        }
        else if (this.mode === ViewerMode.PAGE ||
            this.mode === ViewerMode.PAGE_ZOOMED) {
            this.mode = ViewerMode.DASHBOARD;
        }
    }
    isPageZoomed() {
        return this.mode === ViewerMode.PAGE_ZOOMED;
    }
    change() {
        this.modeChanges.previousValue = this.modeChanges.currentValue;
        this.modeChanges.currentValue = this._mode;
        this.toggleModeSubject.next({
            ...this.modeChanges,
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: ModeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: ModeService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: ModeService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbW9kZS1zZXJ2aWNlL21vZGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7O0FBR3BELE1BQU0sT0FBTyxXQUFXO0lBTXRCO1FBRlEsZ0JBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBR3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLElBQWdCO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUM7SUFDMUMsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUF3QjtRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzlCLENBQUM7YUFBTSxJQUNMLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLElBQUk7WUFDN0IsSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsV0FBVyxFQUNwQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQ25DLENBQUM7SUFDSCxDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsV0FBVyxDQUFDO0lBQzlDLENBQUM7SUFFTyxNQUFNO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7UUFDL0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1lBQzFCLEdBQUcsSUFBSSxDQUFDLFdBQVc7U0FDcEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs4R0F4RFUsV0FBVztrSEFBWCxXQUFXOzsyRkFBWCxXQUFXO2tCQUR2QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJDb25maWcgfSBmcm9tICcuLi9taW1lLXZpZXdlci1jb25maWcnO1xuaW1wb3J0IHsgTW9kZUNoYW5nZXMsIFZpZXdlck1vZGUgfSBmcm9tICcuLi9tb2RlbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9kZVNlcnZpY2Uge1xuICBwcml2YXRlIGNvbmZpZyE6IE1pbWVWaWV3ZXJDb25maWc7XG4gIHByaXZhdGUgX21vZGUhOiBWaWV3ZXJNb2RlO1xuICBwcml2YXRlIHRvZ2dsZU1vZGVTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8TW9kZUNoYW5nZXM+O1xuICBwcml2YXRlIG1vZGVDaGFuZ2VzID0gbmV3IE1vZGVDaGFuZ2VzKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50b2dnbGVNb2RlU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3QobmV3IE1vZGVDaGFuZ2VzKCkpO1xuICB9XG5cbiAgZ2V0IG9uQ2hhbmdlKCk6IE9ic2VydmFibGU8TW9kZUNoYW5nZXM+IHtcbiAgICByZXR1cm4gdGhpcy50b2dnbGVNb2RlU3ViamVjdC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgc2V0IG1vZGUobW9kZTogVmlld2VyTW9kZSkge1xuICAgIHRoaXMuX21vZGUgPSBtb2RlO1xuICAgIHRoaXMuY2hhbmdlKCk7XG4gIH1cblxuICBnZXQgbW9kZSgpOiBWaWV3ZXJNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgdGhpcy5tb2RlID0gdGhpcy5jb25maWc/LmluaXRWaWV3ZXJNb2RlO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLm1vZGUgPSB0aGlzLmNvbmZpZz8uaW5pdFZpZXdlck1vZGU7XG4gIH1cblxuICBzZXRDb25maWcoY29uZmlnOiBNaW1lVmlld2VyQ29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gIH1cblxuICB0b2dnbGVNb2RlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEKSB7XG4gICAgICB0aGlzLm1vZGUgPSBWaWV3ZXJNb2RlLlBBR0U7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFIHx8XG4gICAgICB0aGlzLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRURcbiAgICApIHtcbiAgICAgIHRoaXMubW9kZSA9IFZpZXdlck1vZGUuREFTSEJPQVJEO1xuICAgIH1cbiAgfVxuXG4gIGlzUGFnZVpvb21lZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2UoKSB7XG4gICAgdGhpcy5tb2RlQ2hhbmdlcy5wcmV2aW91c1ZhbHVlID0gdGhpcy5tb2RlQ2hhbmdlcy5jdXJyZW50VmFsdWU7XG4gICAgdGhpcy5tb2RlQ2hhbmdlcy5jdXJyZW50VmFsdWUgPSB0aGlzLl9tb2RlO1xuICAgIHRoaXMudG9nZ2xlTW9kZVN1YmplY3QubmV4dCh7XG4gICAgICAuLi50aGlzLm1vZGVDaGFuZ2VzLFxuICAgIH0pO1xuICB9XG59XG4iXX0=