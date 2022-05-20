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
ViewerLayoutService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ViewerLayoutService, deps: [{ token: i1.MediaObserver }], target: i0.ɵɵFactoryTarget.Injectable });
ViewerLayoutService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ViewerLayoutService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ViewerLayoutService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.MediaObserver }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWxheW91dC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvdmlld2VyLWxheW91dC1zZXJ2aWNlL3ZpZXdlci1sYXlvdXQtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7QUFLdkQsTUFBTSxPQUFPLG1CQUFtQjtJQUs5QixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUp4QyxlQUFVLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBRXBDLFlBQU8sR0FDYixJQUFJLGVBQWUsQ0FBZSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVwRCxJQUFJLENBQUMsZUFBeUI7UUFDNUIsSUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixLQUFLLFlBQVksQ0FBQyxRQUFRO1lBQzFELGVBQWU7WUFDZixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFDaEI7WUFDQSxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUNyQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtJQUNILENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTLENBQUMsWUFBMEI7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7YUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssWUFBWSxDQUFDLFFBQVEsRUFBRTtZQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7SUFFTyxNQUFNO1FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTyxRQUFRO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDOztnSEFoRFUsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FGbEIsTUFBTTsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVkaWFPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNaW1lVmlld2VyQ29uZmlnIH0gZnJvbSAnLi4vbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7IFZpZXdlckxheW91dCB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItbGF5b3V0JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFZpZXdlckxheW91dFNlcnZpY2Uge1xuICBwcml2YXRlIG1pbWVDb25maWcgPSBuZXcgTWltZVZpZXdlckNvbmZpZygpO1xuICBwcml2YXRlIF9sYXlvdXQhOiBWaWV3ZXJMYXlvdXQ7XG4gIHByaXZhdGUgc3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PFZpZXdlckxheW91dD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8Vmlld2VyTGF5b3V0Pih0aGlzLm1pbWVDb25maWcuaW5pdFZpZXdlckxheW91dCk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWVkaWFPYnNlcnZlcjogTWVkaWFPYnNlcnZlcikge31cblxuICBpbml0KGlzUGFnZWRNYW5pZmVzdD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLm1pbWVDb25maWcuaW5pdFZpZXdlckxheW91dCA9PT0gVmlld2VyTGF5b3V0LlRXT19QQUdFICYmXG4gICAgICBpc1BhZ2VkTWFuaWZlc3QgJiZcbiAgICAgICF0aGlzLmlzTW9iaWxlKClcbiAgICApIHtcbiAgICAgIHRoaXMuX2xheW91dCA9IFZpZXdlckxheW91dC5UV09fUEFHRTtcbiAgICAgIHRoaXMuY2hhbmdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xheW91dCA9IFZpZXdlckxheW91dC5PTkVfUEFHRTtcbiAgICAgIHRoaXMuY2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG9uQ2hhbmdlKCk6IE9ic2VydmFibGU8Vmlld2VyTGF5b3V0PiB7XG4gICAgcmV0dXJuIHRoaXMuc3ViamVjdC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9XG5cbiAgZ2V0IGxheW91dCgpOiBWaWV3ZXJMYXlvdXQge1xuICAgIHJldHVybiB0aGlzLl9sYXlvdXQ7XG4gIH1cblxuICBzZXRMYXlvdXQodmlld2VyTGF5b3V0OiBWaWV3ZXJMYXlvdXQpIHtcbiAgICB0aGlzLl9sYXlvdXQgPSB2aWV3ZXJMYXlvdXQ7XG4gICAgdGhpcy5jaGFuZ2UoKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICBpZiAodGhpcy5fbGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuVFdPX1BBR0UpIHtcbiAgICAgIHRoaXMuc2V0TGF5b3V0KFZpZXdlckxheW91dC5PTkVfUEFHRSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9sYXlvdXQgPT09IFZpZXdlckxheW91dC5PTkVfUEFHRSkge1xuICAgICAgdGhpcy5zZXRMYXlvdXQoVmlld2VyTGF5b3V0LlRXT19QQUdFKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZSgpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0aGlzLl9sYXlvdXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc01vYmlsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tZWRpYU9ic2VydmVyLmlzQWN0aXZlKCdsdC1tZCcpO1xuICB9XG59XG4iXX0=