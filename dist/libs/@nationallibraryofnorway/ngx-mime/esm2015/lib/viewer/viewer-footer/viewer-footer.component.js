import { animate, state, style, transition, trigger, } from '@angular/animations';
import { ChangeDetectorRef, Component, HostBinding, ViewChild, ViewContainerRef, } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { ViewerOptions } from '../../core/models/viewer-options';
import { IiifContentSearchService } from './../../core/iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from './../../core/models/search-result';
export class ViewerFooterComponent {
    constructor(iiifContentSearchService, mediaObserver, changeDetectorRef) {
        this.iiifContentSearchService = iiifContentSearchService;
        this.mediaObserver = mediaObserver;
        this.changeDetectorRef = changeDetectorRef;
        this.state = 'hide';
        this.showNavigationToolbar = true;
        this.searchResult = new SearchResult();
        this.showPageNavigator = true;
        this.showContentSearchNavigator = false;
        this.subscriptions = new Subscription();
    }
    get footerState() {
        return this.state;
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((sr) => {
            this.searchResult = sr;
            this.showContentSearchNavigator = this.searchResult.size() > 0;
            this.showPageNavigator =
                this.searchResult.size() === 0 || !this.isMobile();
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.mediaObserver.asObservable().subscribe((changes) => {
            this.showPageNavigator =
                this.searchResult.size() === 0 || !this.isMobile();
            this.changeDetectorRef.detectChanges();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    isMobile() {
        return this.mediaObserver.isActive('lt-md');
    }
}
ViewerFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'mime-viewer-footer',
                template: "<mat-toolbar class=\"footer-toolbar\">\n  <div fxLayout=\"row\" fxFlex fxLayoutAlign=\"start center\">\n    <div><ng-template #mimeFooterBefore></ng-template></div>\n    <div fxFlex=\"250px\" fxFlex.lt-md=\"100%\" *ngIf=\"searchResult.size() > 0\">\n      <mime-content-search-navigator\n        *ngIf=\"showContentSearchNavigator\"\n        [searchResult]=\"searchResult\"\n      ></mime-content-search-navigator>\n    </div>\n    <div fxFlex [hidden]=\"!showPageNavigator\">\n      <mime-page-navigator [searchResult]=\"searchResult\"></mime-page-navigator>\n    </div>\n  </div>\n  <div><ng-template #mimeFooterAfter></ng-template></div>\n</mat-toolbar>\n",
                animations: [
                    trigger('footerState', [
                        state('hide', style({
                            transform: 'translate(0, 100%)',
                        })),
                        state('show', style({
                            transform: 'translate(0, 0)',
                        })),
                        transition('hide => show', animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')),
                        transition('show => hide', animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out')),
                    ]),
                ],
                styles: [":host{display:block;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.footer-toolbar{padding:0}[hidden]{display:none}"]
            },] }
];
ViewerFooterComponent.ctorParameters = () => [
    { type: IiifContentSearchService },
    { type: MediaObserver },
    { type: ChangeDetectorRef }
];
ViewerFooterComponent.propDecorators = {
    mimeFooterBefore: [{ type: ViewChild, args: ['mimeFooterBefore', { read: ViewContainerRef, static: true },] }],
    mimeFooterAfter: [{ type: ViewChild, args: ['mimeFooterAfter', { read: ViewContainerRef, static: true },] }],
    footerState: [{ type: HostBinding, args: ['@footerState',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWZvb3Rlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1mb290ZXIvdmlld2VyLWZvb3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEdBQ1IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxXQUFXLEVBR1gsU0FBUyxFQUNULGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFDaEgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBK0JqRSxNQUFNLE9BQU8scUJBQXFCO0lBWWhDLFlBQ1Usd0JBQWtELEVBQ25ELGFBQTRCLEVBQzNCLGlCQUFvQztRQUZwQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ25ELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzNCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFWdkMsVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUNmLDBCQUFxQixHQUFHLElBQUksQ0FBQztRQUM3QixpQkFBWSxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QiwrQkFBMEIsR0FBRyxLQUFLLENBQUM7UUFDbEMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBTXhDLENBQUM7SUFFSixJQUNJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFnQixFQUFFLEVBQUU7WUFDcEUsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxpQkFBaUI7Z0JBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3JELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBc0IsRUFBRSxFQUFFO1lBQ3JFLElBQUksQ0FBQyxpQkFBaUI7Z0JBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3JELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFTyxRQUFRO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7WUE5RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLDhwQkFBNkM7Z0JBRTdDLFVBQVUsRUFBRTtvQkFDVixPQUFPLENBQUMsYUFBYSxFQUFFO3dCQUNyQixLQUFLLENBQ0gsTUFBTSxFQUNOLEtBQUssQ0FBQzs0QkFDSixTQUFTLEVBQUUsb0JBQW9CO3lCQUNoQyxDQUFDLENBQ0g7d0JBQ0QsS0FBSyxDQUNILE1BQU0sRUFDTixLQUFLLENBQUM7NEJBQ0osU0FBUyxFQUFFLGlCQUFpQjt5QkFDN0IsQ0FBQyxDQUNIO3dCQUNELFVBQVUsQ0FDUixjQUFjLEVBQ2QsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDLENBQ3JFO3dCQUNELFVBQVUsQ0FDUixjQUFjLEVBQ2QsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEdBQUcsYUFBYSxDQUFDLENBQ3ZFO3FCQUNGLENBQUM7aUJBQ0g7O2FBQ0Y7OztZQS9CUSx3QkFBd0I7WUFIWCxhQUFhO1lBUmpDLGlCQUFpQjs7OytCQTRDaEIsU0FBUyxTQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7OEJBRXRFLFNBQVMsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzBCQWVyRSxXQUFXLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGFuaW1hdGUsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgdHJpZ2dlcixcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZWRpYUNoYW5nZSwgTWVkaWFPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVmlld2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL3ZpZXdlci1vcHRpb25zJztcbmltcG9ydCB7IElpaWZDb250ZW50U2VhcmNoU2VydmljZSB9IGZyb20gJy4vLi4vLi4vY29yZS9paWlmLWNvbnRlbnQtc2VhcmNoLXNlcnZpY2UvaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4vLi4vLi4vY29yZS9tb2RlbHMvc2VhcmNoLXJlc3VsdCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21pbWUtdmlld2VyLWZvb3RlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi92aWV3ZXItZm9vdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdmlld2VyLWZvb3Rlci5jb21wb25lbnQuc2NzcyddLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZm9vdGVyU3RhdGUnLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2hpZGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDAsIDEwMCUpJyxcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ3Nob3cnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDAsIDApJyxcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKFxuICAgICAgICAnaGlkZSA9PiBzaG93JyxcbiAgICAgICAgYW5pbWF0ZShWaWV3ZXJPcHRpb25zLnRyYW5zaXRpb25zLnRvb2xiYXJzRWFzZUluVGltZSArICdtcyBlYXNlLWluJylcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKFxuICAgICAgICAnc2hvdyA9PiBoaWRlJyxcbiAgICAgICAgYW5pbWF0ZShWaWV3ZXJPcHRpb25zLnRyYW5zaXRpb25zLnRvb2xiYXJzRWFzZU91dFRpbWUgKyAnbXMgZWFzZS1vdXQnKVxuICAgICAgKSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVmlld2VyRm9vdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdtaW1lRm9vdGVyQmVmb3JlJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgbWltZUZvb3RlckJlZm9yZSE6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ21pbWVGb290ZXJBZnRlcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIG1pbWVGb290ZXJBZnRlciE6IFZpZXdDb250YWluZXJSZWY7XG4gIHB1YmxpYyBzdGF0ZSA9ICdoaWRlJztcbiAgcHVibGljIHNob3dOYXZpZ2F0aW9uVG9vbGJhciA9IHRydWU7XG4gIHB1YmxpYyBzZWFyY2hSZXN1bHQ6IFNlYXJjaFJlc3VsdCA9IG5ldyBTZWFyY2hSZXN1bHQoKTtcbiAgcHVibGljIHNob3dQYWdlTmF2aWdhdG9yID0gdHJ1ZTtcbiAgcHVibGljIHNob3dDb250ZW50U2VhcmNoTmF2aWdhdG9yID0gZmFsc2U7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGlpaWZDb250ZW50U2VhcmNoU2VydmljZTogSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLFxuICAgIHB1YmxpYyBtZWRpYU9ic2VydmVyOiBNZWRpYU9ic2VydmVyLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBASG9zdEJpbmRpbmcoJ0Bmb290ZXJTdGF0ZScpXG4gIGdldCBmb290ZXJTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoKHNyOiBTZWFyY2hSZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHQgPSBzcjtcbiAgICAgICAgdGhpcy5zaG93Q29udGVudFNlYXJjaE5hdmlnYXRvciA9IHRoaXMuc2VhcmNoUmVzdWx0LnNpemUoKSA+IDA7XG4gICAgICAgIHRoaXMuc2hvd1BhZ2VOYXZpZ2F0b3IgPVxuICAgICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0LnNpemUoKSA9PT0gMCB8fCAhdGhpcy5pc01vYmlsZSgpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm1lZGlhT2JzZXJ2ZXIuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKChjaGFuZ2VzOiBNZWRpYUNoYW5nZVtdKSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd1BhZ2VOYXZpZ2F0b3IgPVxuICAgICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0LnNpemUoKSA9PT0gMCB8fCAhdGhpcy5pc01vYmlsZSgpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc01vYmlsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tZWRpYU9ic2VydmVyLmlzQWN0aXZlKCdsdC1tZCcpO1xuICB9XG59XG4iXX0=