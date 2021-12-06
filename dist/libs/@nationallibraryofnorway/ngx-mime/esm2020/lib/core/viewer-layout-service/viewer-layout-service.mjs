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
ViewerLayoutService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: ViewerLayoutService, deps: [{ token: i1.MediaObserver }], target: i0.ɵɵFactoryTarget.Injectable });
ViewerLayoutService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: ViewerLayoutService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: ViewerLayoutService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MediaObserver }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWxheW91dC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvdmlld2VyLWxheW91dC1zZXJ2aWNlL3ZpZXdlci1sYXlvdXQtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7QUFHdkQsTUFBTSxPQUFPLG1CQUFtQjtJQU05QixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUx4QyxlQUFVLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBRXBDLFlBQU8sR0FBa0MsSUFBSSxlQUFlLENBRWxFLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNlLENBQUM7SUFFcEQsSUFBSSxDQUFDLGVBQXlCO1FBQzVCLElBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsS0FBSyxZQUFZLENBQUMsUUFBUTtZQUMxRCxlQUFlO1lBQ2YsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQ2hCO1lBQ0EsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUyxDQUFDLFlBQTBCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxZQUFZLENBQUMsUUFBUSxFQUFFO1lBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRU8sTUFBTTtRQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU8sUUFBUTtRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Z0hBakRVLG1CQUFtQjtvSEFBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZWRpYU9ic2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJDb25maWcgfSBmcm9tICcuLi9taW1lLXZpZXdlci1jb25maWcnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0IH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdlci1sYXlvdXQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmlld2VyTGF5b3V0U2VydmljZSB7XG4gIHByaXZhdGUgbWltZUNvbmZpZyA9IG5ldyBNaW1lVmlld2VyQ29uZmlnKCk7XG4gIHByaXZhdGUgX2xheW91dCE6IFZpZXdlckxheW91dDtcbiAgcHJpdmF0ZSBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8Vmlld2VyTGF5b3V0PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8XG4gICAgVmlld2VyTGF5b3V0XG4gID4odGhpcy5taW1lQ29uZmlnLmluaXRWaWV3ZXJMYXlvdXQpO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1lZGlhT2JzZXJ2ZXI6IE1lZGlhT2JzZXJ2ZXIpIHt9XG5cbiAgaW5pdChpc1BhZ2VkTWFuaWZlc3Q/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5taW1lQ29uZmlnLmluaXRWaWV3ZXJMYXlvdXQgPT09IFZpZXdlckxheW91dC5UV09fUEFHRSAmJlxuICAgICAgaXNQYWdlZE1hbmlmZXN0ICYmXG4gICAgICAhdGhpcy5pc01vYmlsZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLl9sYXlvdXQgPSBWaWV3ZXJMYXlvdXQuVFdPX1BBR0U7XG4gICAgICB0aGlzLmNoYW5nZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9sYXlvdXQgPSBWaWV3ZXJMYXlvdXQuT05FX1BBR0U7XG4gICAgICB0aGlzLmNoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBvbkNoYW5nZSgpOiBPYnNlcnZhYmxlPFZpZXdlckxheW91dD4ge1xuICAgIHJldHVybiB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBsYXlvdXQoKTogVmlld2VyTGF5b3V0IHtcbiAgICByZXR1cm4gdGhpcy5fbGF5b3V0O1xuICB9XG5cbiAgc2V0TGF5b3V0KHZpZXdlckxheW91dDogVmlld2VyTGF5b3V0KSB7XG4gICAgdGhpcy5fbGF5b3V0ID0gdmlld2VyTGF5b3V0O1xuICAgIHRoaXMuY2hhbmdlKCk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuX2xheW91dCA9PT0gVmlld2VyTGF5b3V0LlRXT19QQUdFKSB7XG4gICAgICB0aGlzLnNldExheW91dChWaWV3ZXJMYXlvdXQuT05FX1BBR0UpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fbGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuT05FX1BBR0UpIHtcbiAgICAgIHRoaXMuc2V0TGF5b3V0KFZpZXdlckxheW91dC5UV09fUEFHRSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2UoKSB7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQodGhpcy5fbGF5b3V0KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNNb2JpbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWVkaWFPYnNlcnZlci5pc0FjdGl2ZSgnbHQtbWQnKTtcbiAgfVxufVxuIl19