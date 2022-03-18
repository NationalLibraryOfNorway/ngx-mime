import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ModeChanges } from '../models/modeChanges';
import { ViewerMode } from '../models/viewer-mode';
import * as i0 from "@angular/core";
export class ModeService {
    constructor() {
        this.modeChanges = new ModeChanges();
        const mimeConfig = new MimeViewerConfig();
        this.toggleModeSubject = new BehaviorSubject(new ModeChanges());
        this._initialMode = mimeConfig.initViewerMode;
        this._mode = this._initialMode;
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
    set initialMode(mode) {
        this._initialMode = mode;
        this.mode = mode;
    }
    get initialMode() {
        return this._initialMode;
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
    destroy() {
        this.mode = this._initialMode;
    }
    change() {
        this.modeChanges.previousValue = this.modeChanges.currentValue;
        this.modeChanges.currentValue = this._mode;
        this.toggleModeSubject.next({
            ...this.modeChanges,
        });
    }
}
ModeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: ModeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ModeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: ModeService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: ModeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbW9kZS1zZXJ2aWNlL21vZGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFHbkQsTUFBTSxPQUFPLFdBQVc7SUFNdEI7UUFGUSxnQkFBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFHdEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDO1FBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUMsSUFBZ0I7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksV0FBVyxDQUFDLElBQWdCO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLFNBQVMsRUFBRTtZQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7U0FDN0I7YUFBTSxJQUNMLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLElBQUk7WUFDN0IsSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsV0FBVyxFQUNwQztZQUNBLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxXQUFXLENBQUM7SUFDOUMsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDaEMsQ0FBQztJQUVPLE1BQU07UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztRQUMvRCxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7WUFDMUIsR0FBRyxJQUFJLENBQUMsV0FBVztTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDOzt3R0E1RFUsV0FBVzs0R0FBWCxXQUFXOzJGQUFYLFdBQVc7a0JBRHZCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWltZVZpZXdlckNvbmZpZyB9IGZyb20gJy4uL21pbWUtdmlld2VyLWNvbmZpZyc7XG5pbXBvcnQgeyBNb2RlQ2hhbmdlcyB9IGZyb20gJy4uL21vZGVscy9tb2RlQ2hhbmdlcyc7XG5pbXBvcnQgeyBWaWV3ZXJNb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdlci1tb2RlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vZGVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfaW5pdGlhbE1vZGU6IFZpZXdlck1vZGU7XG4gIHByaXZhdGUgX21vZGU6IFZpZXdlck1vZGU7XG4gIHByaXZhdGUgdG9nZ2xlTW9kZVN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxNb2RlQ2hhbmdlcz47XG4gIHByaXZhdGUgbW9kZUNoYW5nZXMgPSBuZXcgTW9kZUNoYW5nZXMoKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBtaW1lQ29uZmlnID0gbmV3IE1pbWVWaWV3ZXJDb25maWcoKTtcbiAgICB0aGlzLnRvZ2dsZU1vZGVTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChuZXcgTW9kZUNoYW5nZXMoKSk7XG4gICAgdGhpcy5faW5pdGlhbE1vZGUgPSBtaW1lQ29uZmlnLmluaXRWaWV3ZXJNb2RlO1xuICAgIHRoaXMuX21vZGUgPSB0aGlzLl9pbml0aWFsTW9kZTtcbiAgfVxuXG4gIGdldCBvbkNoYW5nZSgpOiBPYnNlcnZhYmxlPE1vZGVDaGFuZ2VzPiB7XG4gICAgcmV0dXJuIHRoaXMudG9nZ2xlTW9kZVN1YmplY3QuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIHNldCBtb2RlKG1vZGU6IFZpZXdlck1vZGUpIHtcbiAgICB0aGlzLl9tb2RlID0gbW9kZTtcbiAgICB0aGlzLmNoYW5nZSgpO1xuICB9XG5cbiAgZ2V0IG1vZGUoKTogVmlld2VyTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGU7XG4gIH1cblxuICBzZXQgaW5pdGlhbE1vZGUobW9kZTogVmlld2VyTW9kZSkge1xuICAgIHRoaXMuX2luaXRpYWxNb2RlID0gbW9kZTtcbiAgICB0aGlzLm1vZGUgPSBtb2RlO1xuICB9XG5cbiAgZ2V0IGluaXRpYWxNb2RlKCk6IFZpZXdlck1vZGUge1xuICAgIHJldHVybiB0aGlzLl9pbml0aWFsTW9kZTtcbiAgfVxuXG4gIHRvZ2dsZU1vZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQpIHtcbiAgICAgIHRoaXMubW9kZSA9IFZpZXdlck1vZGUuUEFHRTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UgfHxcbiAgICAgIHRoaXMubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFX1pPT01FRFxuICAgICkge1xuICAgICAgdGhpcy5tb2RlID0gVmlld2VyTW9kZS5EQVNIQk9BUkQ7XG4gICAgfVxuICB9XG5cbiAgaXNQYWdlWm9vbWVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRV9aT09NRUQ7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMubW9kZSA9IHRoaXMuX2luaXRpYWxNb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2UoKSB7XG4gICAgdGhpcy5tb2RlQ2hhbmdlcy5wcmV2aW91c1ZhbHVlID0gdGhpcy5tb2RlQ2hhbmdlcy5jdXJyZW50VmFsdWU7XG4gICAgdGhpcy5tb2RlQ2hhbmdlcy5jdXJyZW50VmFsdWUgPSB0aGlzLl9tb2RlO1xuICAgIHRoaXMudG9nZ2xlTW9kZVN1YmplY3QubmV4dCh7XG4gICAgICAuLi50aGlzLm1vZGVDaGFuZ2VzLFxuICAgIH0pO1xuICB9XG59XG4iXX0=