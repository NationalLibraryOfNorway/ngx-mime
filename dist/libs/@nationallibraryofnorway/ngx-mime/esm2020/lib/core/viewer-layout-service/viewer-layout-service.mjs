import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerLayout } from '../models/viewer-layout';
import * as i0 from "@angular/core";
import * as i1 from "@angular/flex-layout";
export class ViewerLayoutService {
    constructor(mediaObserver) {
        this.mediaObserver = mediaObserver;
        this.mimeConfig = new MimeViewerConfig();
        this.subject = new BehaviorSubject(this.mimeConfig.initViewerLayout);
    }
    init(isPagedManifest) {
        if (this.mimeConfig.initViewerLayout === ViewerLayout.TWO_PAGE &&
            isPagedManifest &&
            !this.isMobile()) {
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
    isMobile() {
        return this.mediaObserver.isActive('lt-md');
    }
}
ViewerLayoutService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ViewerLayoutService, deps: [{ token: i1.MediaObserver }], target: i0.ɵɵFactoryTarget.Injectable });
ViewerLayoutService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ViewerLayoutService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ViewerLayoutService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MediaObserver }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWxheW91dC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvdmlld2VyLWxheW91dC1zZXJ2aWNlL3ZpZXdlci1sYXlvdXQtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7QUFHdkQsTUFBTSxPQUFPLG1CQUFtQjtJQUs5QixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUp4QyxlQUFVLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBRXBDLFlBQU8sR0FDYixJQUFJLGVBQWUsQ0FBZSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVwRCxJQUFJLENBQUMsZUFBeUI7UUFDNUIsSUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixLQUFLLFlBQVksQ0FBQyxRQUFRO1lBQzFELGVBQWU7WUFDZixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFDaEI7WUFDQSxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUNyQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtJQUNILENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTLENBQUMsWUFBMEI7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7YUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssWUFBWSxDQUFDLFFBQVEsRUFBRTtZQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7SUFFTyxNQUFNO1FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTyxRQUFRO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDOztnSEFoRFUsbUJBQW1CO29IQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1lZGlhT2JzZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWltZVZpZXdlckNvbmZpZyB9IGZyb20gJy4uL21pbWUtdmlld2VyLWNvbmZpZyc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXQgfSBmcm9tICcuLi9tb2RlbHMvdmlld2VyLWxheW91dCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWaWV3ZXJMYXlvdXRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBtaW1lQ29uZmlnID0gbmV3IE1pbWVWaWV3ZXJDb25maWcoKTtcbiAgcHJpdmF0ZSBfbGF5b3V0ITogVmlld2VyTGF5b3V0O1xuICBwcml2YXRlIHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxWaWV3ZXJMYXlvdXQ+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PFZpZXdlckxheW91dD4odGhpcy5taW1lQ29uZmlnLmluaXRWaWV3ZXJMYXlvdXQpO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1lZGlhT2JzZXJ2ZXI6IE1lZGlhT2JzZXJ2ZXIpIHt9XG5cbiAgaW5pdChpc1BhZ2VkTWFuaWZlc3Q/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5taW1lQ29uZmlnLmluaXRWaWV3ZXJMYXlvdXQgPT09IFZpZXdlckxheW91dC5UV09fUEFHRSAmJlxuICAgICAgaXNQYWdlZE1hbmlmZXN0ICYmXG4gICAgICAhdGhpcy5pc01vYmlsZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLl9sYXlvdXQgPSBWaWV3ZXJMYXlvdXQuVFdPX1BBR0U7XG4gICAgICB0aGlzLmNoYW5nZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9sYXlvdXQgPSBWaWV3ZXJMYXlvdXQuT05FX1BBR0U7XG4gICAgICB0aGlzLmNoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBvbkNoYW5nZSgpOiBPYnNlcnZhYmxlPFZpZXdlckxheW91dD4ge1xuICAgIHJldHVybiB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBsYXlvdXQoKTogVmlld2VyTGF5b3V0IHtcbiAgICByZXR1cm4gdGhpcy5fbGF5b3V0O1xuICB9XG5cbiAgc2V0TGF5b3V0KHZpZXdlckxheW91dDogVmlld2VyTGF5b3V0KSB7XG4gICAgdGhpcy5fbGF5b3V0ID0gdmlld2VyTGF5b3V0O1xuICAgIHRoaXMuY2hhbmdlKCk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuX2xheW91dCA9PT0gVmlld2VyTGF5b3V0LlRXT19QQUdFKSB7XG4gICAgICB0aGlzLnNldExheW91dChWaWV3ZXJMYXlvdXQuT05FX1BBR0UpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fbGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuT05FX1BBR0UpIHtcbiAgICAgIHRoaXMuc2V0TGF5b3V0KFZpZXdlckxheW91dC5UV09fUEFHRSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2UoKSB7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQodGhpcy5fbGF5b3V0KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNNb2JpbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWVkaWFPYnNlcnZlci5pc0FjdGl2ZSgnbHQtbWQnKTtcbiAgfVxufVxuIl19