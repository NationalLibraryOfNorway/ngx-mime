import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerLayout } from '../models/viewer-layout';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/layout";
export class ViewerLayoutService {
    constructor(breakpointObserver) {
        this.breakpointObserver = breakpointObserver;
        this.config = new MimeViewerConfig();
        this.subject = new BehaviorSubject(this.config.initViewerLayout);
    }
    init(isPagedManifest) {
        if (this.config.initViewerLayout === ViewerLayout.TWO_PAGE &&
            isPagedManifest &&
            !this.isHandsetOrTabletInPortrait()) {
            this._layout = ViewerLayout.TWO_PAGE;
            this.change();
        }
        else {
            this._layout = ViewerLayout.ONE_PAGE;
            this.change();
        }
    }
    get onChange() {
        return this.subject.asObservable().pipe(distinctUntilChanged());
    }
    get layout() {
        return this._layout;
    }
    setConfig(config) {
        this.config = config;
    }
    setLayout(viewerLayout) {
        this._layout = viewerLayout;
        this.change();
    }
    toggle() {
        if (this._layout === ViewerLayout.TWO_PAGE) {
            this.setLayout(ViewerLayout.ONE_PAGE);
        }
        else if (this._layout === ViewerLayout.ONE_PAGE) {
            this.setLayout(ViewerLayout.TWO_PAGE);
        }
    }
    change() {
        this.subject.next(this._layout);
    }
    isHandsetOrTabletInPortrait() {
        return this.breakpointObserver.isMatched([
            Breakpoints.Handset,
            Breakpoints.TabletPortrait,
        ]);
    }
}
ViewerLayoutService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ViewerLayoutService, deps: [{ token: i1.BreakpointObserver }], target: i0.ɵɵFactoryTarget.Injectable });
ViewerLayoutService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ViewerLayoutService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ViewerLayoutService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.BreakpointObserver }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWxheW91dC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvdmlld2VyLWxheW91dC1zZXJ2aWNlL3ZpZXdlci1sYXlvdXQtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBR3ZELE1BQU0sT0FBTyxtQkFBbUI7SUFNOUIsWUFBb0Isa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFMbEQsV0FBTSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUVoQyxZQUFPLEdBQ2IsSUFBSSxlQUFlLENBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRUwsQ0FBQztJQUU5RCxJQUFJLENBQUMsZUFBeUI7UUFDNUIsSUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixLQUFLLFlBQVksQ0FBQyxRQUFRO1lBQ3RELGVBQWU7WUFDZixDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxFQUNuQztZQUNBLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUNyQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO0lBQ0gsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUF3QjtRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsU0FBUyxDQUFDLFlBQTBCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxZQUFZLENBQUMsUUFBUSxFQUFFO1lBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRU8sTUFBTTtRQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU8sMkJBQTJCO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztZQUN2QyxXQUFXLENBQUMsT0FBTztZQUNuQixXQUFXLENBQUMsY0FBYztTQUMzQixDQUFDLENBQUM7SUFDTCxDQUFDOztnSEF4RFUsbUJBQW1CO29IQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJyZWFrcG9pbnRPYnNlcnZlciwgQnJlYWtwb2ludHMgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNaW1lVmlld2VyQ29uZmlnIH0gZnJvbSAnLi4vbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7IFZpZXdlckxheW91dCB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItbGF5b3V0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZpZXdlckxheW91dFNlcnZpY2Uge1xuICBwcml2YXRlIGNvbmZpZyA9IG5ldyBNaW1lVmlld2VyQ29uZmlnKCk7XG4gIHByaXZhdGUgX2xheW91dCE6IFZpZXdlckxheW91dDtcbiAgcHJpdmF0ZSBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8Vmlld2VyTGF5b3V0PiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxWaWV3ZXJMYXlvdXQ+KHRoaXMuY29uZmlnLmluaXRWaWV3ZXJMYXlvdXQpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJlYWtwb2ludE9ic2VydmVyOiBCcmVha3BvaW50T2JzZXJ2ZXIpIHt9XG5cbiAgaW5pdChpc1BhZ2VkTWFuaWZlc3Q/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcuaW5pdFZpZXdlckxheW91dCA9PT0gVmlld2VyTGF5b3V0LlRXT19QQUdFICYmXG4gICAgICBpc1BhZ2VkTWFuaWZlc3QgJiZcbiAgICAgICF0aGlzLmlzSGFuZHNldE9yVGFibGV0SW5Qb3J0cmFpdCgpXG4gICAgKSB7XG4gICAgICB0aGlzLl9sYXlvdXQgPSBWaWV3ZXJMYXlvdXQuVFdPX1BBR0U7XG4gICAgICB0aGlzLmNoYW5nZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9sYXlvdXQgPSBWaWV3ZXJMYXlvdXQuT05FX1BBR0U7XG4gICAgICB0aGlzLmNoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBvbkNoYW5nZSgpOiBPYnNlcnZhYmxlPFZpZXdlckxheW91dD4ge1xuICAgIHJldHVybiB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBsYXlvdXQoKTogVmlld2VyTGF5b3V0IHtcbiAgICByZXR1cm4gdGhpcy5fbGF5b3V0O1xuICB9XG5cbiAgc2V0Q29uZmlnKGNvbmZpZzogTWltZVZpZXdlckNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgc2V0TGF5b3V0KHZpZXdlckxheW91dDogVmlld2VyTGF5b3V0KSB7XG4gICAgdGhpcy5fbGF5b3V0ID0gdmlld2VyTGF5b3V0O1xuICAgIHRoaXMuY2hhbmdlKCk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuX2xheW91dCA9PT0gVmlld2VyTGF5b3V0LlRXT19QQUdFKSB7XG4gICAgICB0aGlzLnNldExheW91dChWaWV3ZXJMYXlvdXQuT05FX1BBR0UpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fbGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuT05FX1BBR0UpIHtcbiAgICAgIHRoaXMuc2V0TGF5b3V0KFZpZXdlckxheW91dC5UV09fUEFHRSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2UoKSB7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQodGhpcy5fbGF5b3V0KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNIYW5kc2V0T3JUYWJsZXRJblBvcnRyYWl0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmJyZWFrcG9pbnRPYnNlcnZlci5pc01hdGNoZWQoW1xuICAgICAgQnJlYWtwb2ludHMuSGFuZHNldCxcbiAgICAgIEJyZWFrcG9pbnRzLlRhYmxldFBvcnRyYWl0LFxuICAgIF0pO1xuICB9XG59XG4iXX0=