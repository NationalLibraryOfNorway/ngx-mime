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
}
ModeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ModeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ModeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ModeService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ModeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbW9kZS1zZXJ2aWNlL21vZGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7O0FBR3BELE1BQU0sT0FBTyxXQUFXO0lBTXRCO1FBRlEsZ0JBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBR3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLElBQWdCO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUM7SUFDMUMsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUF3QjtRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztTQUM3QjthQUFNLElBQ0wsSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsSUFBSTtZQUM3QixJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxXQUFXLEVBQ3BDO1lBQ0EsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLFdBQVcsQ0FBQztJQUM5QyxDQUFDO0lBRU8sTUFBTTtRQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1FBQy9ELElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztZQUMxQixHQUFHLElBQUksQ0FBQyxXQUFXO1NBQ3BCLENBQUMsQ0FBQztJQUNMLENBQUM7O3dHQXhEVSxXQUFXOzRHQUFYLFdBQVc7MkZBQVgsV0FBVztrQkFEdkIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNaW1lVmlld2VyQ29uZmlnIH0gZnJvbSAnLi4vbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7IE1vZGVDaGFuZ2VzLCBWaWV3ZXJNb2RlIH0gZnJvbSAnLi4vbW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vZGVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb25maWchOiBNaW1lVmlld2VyQ29uZmlnO1xuICBwcml2YXRlIF9tb2RlITogVmlld2VyTW9kZTtcbiAgcHJpdmF0ZSB0b2dnbGVNb2RlU3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PE1vZGVDaGFuZ2VzPjtcbiAgcHJpdmF0ZSBtb2RlQ2hhbmdlcyA9IG5ldyBNb2RlQ2hhbmdlcygpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudG9nZ2xlTW9kZVN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG5ldyBNb2RlQ2hhbmdlcygpKTtcbiAgfVxuXG4gIGdldCBvbkNoYW5nZSgpOiBPYnNlcnZhYmxlPE1vZGVDaGFuZ2VzPiB7XG4gICAgcmV0dXJuIHRoaXMudG9nZ2xlTW9kZVN1YmplY3QuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIHNldCBtb2RlKG1vZGU6IFZpZXdlck1vZGUpIHtcbiAgICB0aGlzLl9tb2RlID0gbW9kZTtcbiAgICB0aGlzLmNoYW5nZSgpO1xuICB9XG5cbiAgZ2V0IG1vZGUoKTogVmlld2VyTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGU7XG4gIH1cblxuICBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIHRoaXMubW9kZSA9IHRoaXMuY29uZmlnPy5pbml0Vmlld2VyTW9kZTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5tb2RlID0gdGhpcy5jb25maWc/LmluaXRWaWV3ZXJNb2RlO1xuICB9XG5cbiAgc2V0Q29uZmlnKGNvbmZpZzogTWltZVZpZXdlckNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgdG9nZ2xlTW9kZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCkge1xuICAgICAgdGhpcy5tb2RlID0gVmlld2VyTW9kZS5QQUdFO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSB8fFxuICAgICAgdGhpcy5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0VfWk9PTUVEXG4gICAgKSB7XG4gICAgICB0aGlzLm1vZGUgPSBWaWV3ZXJNb2RlLkRBU0hCT0FSRDtcbiAgICB9XG4gIH1cblxuICBpc1BhZ2Vab29tZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFX1pPT01FRDtcbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlKCkge1xuICAgIHRoaXMubW9kZUNoYW5nZXMucHJldmlvdXNWYWx1ZSA9IHRoaXMubW9kZUNoYW5nZXMuY3VycmVudFZhbHVlO1xuICAgIHRoaXMubW9kZUNoYW5nZXMuY3VycmVudFZhbHVlID0gdGhpcy5fbW9kZTtcbiAgICB0aGlzLnRvZ2dsZU1vZGVTdWJqZWN0Lm5leHQoe1xuICAgICAgLi4udGhpcy5tb2RlQ2hhbmdlcyxcbiAgICB9KTtcbiAgfVxufVxuIl19