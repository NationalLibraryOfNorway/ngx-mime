import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
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
ViewerLayoutService.ɵfac = function ViewerLayoutService_Factory(t) { return new (t || ViewerLayoutService)(i0.ɵɵinject(i1.MediaObserver)); };
ViewerLayoutService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ViewerLayoutService, factory: ViewerLayoutService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ViewerLayoutService, [{
        type: Injectable
    }], function () { return [{ type: i1.MediaObserver }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWxheW91dC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvdmlld2VyLWxheW91dC1zZXJ2aWNlL3ZpZXdlci1sYXlvdXQtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBR3ZELE1BQU0sT0FBTyxtQkFBbUI7SUFLOUIsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFKeEMsZUFBVSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUVwQyxZQUFPLEdBQ2IsSUFBSSxlQUFlLENBQWUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFcEQsSUFBSSxDQUFDLGVBQXlCO1FBQzVCLElBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsS0FBSyxZQUFZLENBQUMsUUFBUTtZQUMxRCxlQUFlO1lBQ2YsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQ2hCO1lBQ0EsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUyxDQUFDLFlBQTBCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxZQUFZLENBQUMsUUFBUSxFQUFFO1lBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRU8sTUFBTTtRQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU8sUUFBUTtRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7c0ZBaERVLG1CQUFtQjt5RUFBbkIsbUJBQW1CLFdBQW5CLG1CQUFtQjt1RkFBbkIsbUJBQW1CO2NBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZWRpYU9ic2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJDb25maWcgfSBmcm9tICcuLi9taW1lLXZpZXdlci1jb25maWcnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0IH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdlci1sYXlvdXQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmlld2VyTGF5b3V0U2VydmljZSB7XG4gIHByaXZhdGUgbWltZUNvbmZpZyA9IG5ldyBNaW1lVmlld2VyQ29uZmlnKCk7XG4gIHByaXZhdGUgX2xheW91dCE6IFZpZXdlckxheW91dDtcbiAgcHJpdmF0ZSBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8Vmlld2VyTGF5b3V0PiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxWaWV3ZXJMYXlvdXQ+KHRoaXMubWltZUNvbmZpZy5pbml0Vmlld2VyTGF5b3V0KTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtZWRpYU9ic2VydmVyOiBNZWRpYU9ic2VydmVyKSB7fVxuXG4gIGluaXQoaXNQYWdlZE1hbmlmZXN0PzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMubWltZUNvbmZpZy5pbml0Vmlld2VyTGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuVFdPX1BBR0UgJiZcbiAgICAgIGlzUGFnZWRNYW5pZmVzdCAmJlxuICAgICAgIXRoaXMuaXNNb2JpbGUoKVxuICAgICkge1xuICAgICAgdGhpcy5fbGF5b3V0ID0gVmlld2VyTGF5b3V0LlRXT19QQUdFO1xuICAgICAgdGhpcy5jaGFuZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGF5b3V0ID0gVmlld2VyTGF5b3V0Lk9ORV9QQUdFO1xuICAgICAgdGhpcy5jaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgb25DaGFuZ2UoKTogT2JzZXJ2YWJsZTxWaWV3ZXJMYXlvdXQ+IHtcbiAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gIH1cblxuICBnZXQgbGF5b3V0KCk6IFZpZXdlckxheW91dCB7XG4gICAgcmV0dXJuIHRoaXMuX2xheW91dDtcbiAgfVxuXG4gIHNldExheW91dCh2aWV3ZXJMYXlvdXQ6IFZpZXdlckxheW91dCkge1xuICAgIHRoaXMuX2xheW91dCA9IHZpZXdlckxheW91dDtcbiAgICB0aGlzLmNoYW5nZSgpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLl9sYXlvdXQgPT09IFZpZXdlckxheW91dC5UV09fUEFHRSkge1xuICAgICAgdGhpcy5zZXRMYXlvdXQoVmlld2VyTGF5b3V0Lk9ORV9QQUdFKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2xheW91dCA9PT0gVmlld2VyTGF5b3V0Lk9ORV9QQUdFKSB7XG4gICAgICB0aGlzLnNldExheW91dChWaWV3ZXJMYXlvdXQuVFdPX1BBR0UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlKCkge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRoaXMuX2xheW91dCk7XG4gIH1cblxuICBwcml2YXRlIGlzTW9iaWxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1lZGlhT2JzZXJ2ZXIuaXNBY3RpdmUoJ2x0LW1kJyk7XG4gIH1cbn1cbiJdfQ==