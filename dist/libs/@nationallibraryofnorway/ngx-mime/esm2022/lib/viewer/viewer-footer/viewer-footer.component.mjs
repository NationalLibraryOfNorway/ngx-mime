import { animate, state, style, transition, trigger, } from '@angular/animations';
import { BreakpointObserver, Breakpoints, } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, HostBinding, ViewChild, ViewContainerRef, } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewerOptions } from '../../core/models/viewer-options';
import { IiifContentSearchService } from './../../core/iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from './../../core/models/search-result';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/layout";
import * as i2 from "./../../core/iiif-content-search-service/iiif-content-search.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/material/toolbar";
import * as i5 from "@angular/material/divider";
import * as i6 from "./canvas-group-navigator/canvas-group-navigator.component";
import * as i7 from "./content-search-navigator/content-search-navigator.component";
export class ViewerFooterComponent {
    constructor(breakpointObserver, changeDetectorRef, iiifContentSearchService) {
        this.breakpointObserver = breakpointObserver;
        this.changeDetectorRef = changeDetectorRef;
        this.iiifContentSearchService = iiifContentSearchService;
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
        this.setupContentSearchObserver();
        this.setupBreakpointObserver();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    setupContentSearchObserver() {
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((sr) => {
            this.searchResult = sr;
            this.showContentSearchNavigator = this.searchResult.size() > 0;
            this.updateShowPageNavigator();
            this.changeDetectorRef.detectChanges();
        }));
    }
    setupBreakpointObserver() {
        this.subscriptions.add(this.breakpointObserver
            .observe([Breakpoints.XSmall])
            .subscribe((value) => {
            this.showPageNavigator = value.matches
                ? this.searchResult.size() === 0
                : true;
            this.changeDetectorRef.detectChanges();
        }));
    }
    updateShowPageNavigator() {
        this.showPageNavigator =
            this.searchResult.size() === 0 || !this.isHandsetPortrait();
    }
    isHandsetPortrait() {
        return this.breakpointObserver.isMatched(Breakpoints.HandsetPortrait);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: ViewerFooterComponent, deps: [{ token: i1.BreakpointObserver }, { token: i0.ChangeDetectorRef }, { token: i2.IiifContentSearchService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.9", type: ViewerFooterComponent, selector: "mime-viewer-footer", host: { properties: { "@footerState": "this.footerState" } }, viewQueries: [{ propertyName: "mimeFooterBefore", first: true, predicate: ["mimeFooterBefore"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "mimeFooterAfter", first: true, predicate: ["mimeFooterAfter"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: "<mat-toolbar class=\"footer-toolbar\">\n  <ng-template #mimeFooterBefore></ng-template>\n  @if (showContentSearchNavigator) {\n    <mime-content-search-navigator\n      [ngClass]=\"{ 'w-full': !showPageNavigator }\"\n      [searchResult]=\"searchResult\"\n    ></mime-content-search-navigator>\n    <mat-divider class=\"h-full\" vertical></mat-divider>\n  }\n  <mime-page-navigator\n    class=\"w-full\"\n    [hidden]=\"!showPageNavigator\"\n    [searchResult]=\"searchResult\"\n  ></mime-page-navigator>\n  <ng-template #mimeFooterAfter></ng-template>\n</mat-toolbar>\n", styles: [":host{display:block;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.footer-toolbar{padding:0}[hidden]{display:none}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: i4.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { kind: "component", type: i5.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "component", type: i6.CanvasGroupNavigatorComponent, selector: "mime-page-navigator", inputs: ["searchResult"] }, { kind: "component", type: i7.ContentSearchNavigatorComponent, selector: "mime-content-search-navigator", inputs: ["searchResult"] }], animations: [
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
        ] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: ViewerFooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-viewer-footer', animations: [
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
                    ], template: "<mat-toolbar class=\"footer-toolbar\">\n  <ng-template #mimeFooterBefore></ng-template>\n  @if (showContentSearchNavigator) {\n    <mime-content-search-navigator\n      [ngClass]=\"{ 'w-full': !showPageNavigator }\"\n      [searchResult]=\"searchResult\"\n    ></mime-content-search-navigator>\n    <mat-divider class=\"h-full\" vertical></mat-divider>\n  }\n  <mime-page-navigator\n    class=\"w-full\"\n    [hidden]=\"!showPageNavigator\"\n    [searchResult]=\"searchResult\"\n  ></mime-page-navigator>\n  <ng-template #mimeFooterAfter></ng-template>\n</mat-toolbar>\n", styles: [":host{display:block;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.footer-toolbar{padding:0}[hidden]{display:none}\n"] }]
        }], ctorParameters: () => [{ type: i1.BreakpointObserver }, { type: i0.ChangeDetectorRef }, { type: i2.IiifContentSearchService }], propDecorators: { mimeFooterBefore: [{
                type: ViewChild,
                args: ['mimeFooterBefore', { read: ViewContainerRef, static: true }]
            }], mimeFooterAfter: [{
                type: ViewChild,
                args: ['mimeFooterAfter', { read: ViewContainerRef, static: true }]
            }], footerState: [{
                type: HostBinding,
                args: ['@footerState']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWZvb3Rlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1mb290ZXIvdmlld2VyLWZvb3Rlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1mb290ZXIvdmlld2VyLWZvb3Rlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFDTCxrQkFBa0IsRUFFbEIsV0FBVyxHQUNaLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsV0FBVyxFQUdYLFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFDaEgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7Ozs7QUErQmpFLE1BQU0sT0FBTyxxQkFBcUI7SUFjaEMsWUFDVSxrQkFBc0MsRUFDdEMsaUJBQW9DLEVBQ3BDLHdCQUFrRDtRQUZsRCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQVhyRCxVQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ2YsMEJBQXFC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LEVBQ04sS0FBSyxDQUFDO2dDQUNKLFNBQVMsRUFBRSxvQkFBb0I7NkJBQ2hDLENBQUMsQ0FDSDs0QkFDRCxLQUFLLENBQ0gsTUFBTSxFQUNOLEtBQUssQ0FBQztnQ0FDSixTQUFTLEVBQUUsaUJBQWlCOzZCQUM3QixDQUFDLENBQ0g7NEJBQ0QsVUFBVSxDQUNSLGNBQWMsRUFDZCxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsR0FBRyxZQUFZLENBQUMsQ0FDckU7NEJBQ0QsVUFBVSxDQUNSLGNBQWMsRUFDZCxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsR0FBRyxhQUFhLENBQUMsQ0FDdkU7eUJBQ0YsQ0FBQztxQkFDSDs4SkFJRCxnQkFBZ0I7c0JBRGYsU0FBUzt1QkFBQyxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUd2RSxlQUFlO3NCQURkLFNBQVM7dUJBQUMsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFrQmxFLFdBQVc7c0JBRGQsV0FBVzt1QkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIEJyZWFrcG9pbnRPYnNlcnZlcixcbiAgQnJlYWtwb2ludFN0YXRlLFxuICBCcmVha3BvaW50cyxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFZpZXdlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy92aWV3ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL2NvcmUvaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLy4uLy4uL2NvcmUvbW9kZWxzL3NlYXJjaC1yZXN1bHQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtaW1lLXZpZXdlci1mb290ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdmlld2VyLWZvb3Rlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3ZpZXdlci1mb290ZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2Zvb3RlclN0YXRlJywgW1xuICAgICAgc3RhdGUoXG4gICAgICAgICdoaWRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLCAxMDAlKScsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgICdzaG93JyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLCAwKScsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbihcbiAgICAgICAgJ2hpZGUgPT4gc2hvdycsXG4gICAgICAgIGFuaW1hdGUoVmlld2VyT3B0aW9ucy50cmFuc2l0aW9ucy50b29sYmFyc0Vhc2VJblRpbWUgKyAnbXMgZWFzZS1pbicpXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbihcbiAgICAgICAgJ3Nob3cgPT4gaGlkZScsXG4gICAgICAgIGFuaW1hdGUoVmlld2VyT3B0aW9ucy50cmFuc2l0aW9ucy50b29sYmFyc0Vhc2VPdXRUaW1lICsgJ21zIGVhc2Utb3V0JylcbiAgICAgICksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFZpZXdlckZvb3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnbWltZUZvb3RlckJlZm9yZScsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIG1pbWVGb290ZXJCZWZvcmUhOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdtaW1lRm9vdGVyQWZ0ZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBtaW1lRm9vdGVyQWZ0ZXIhOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHB1YmxpYyBzdGF0ZSA9ICdoaWRlJztcbiAgcHVibGljIHNob3dOYXZpZ2F0aW9uVG9vbGJhciA9IHRydWU7XG4gIHB1YmxpYyBzZWFyY2hSZXN1bHQ6IFNlYXJjaFJlc3VsdCA9IG5ldyBTZWFyY2hSZXN1bHQoKTtcbiAgcHVibGljIHNob3dQYWdlTmF2aWdhdG9yID0gdHJ1ZTtcbiAgcHVibGljIHNob3dDb250ZW50U2VhcmNoTmF2aWdhdG9yID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYnJlYWtwb2ludE9ic2VydmVyOiBCcmVha3BvaW50T2JzZXJ2ZXIsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBpaWlmQ29udGVudFNlYXJjaFNlcnZpY2U6IElpaWZDb250ZW50U2VhcmNoU2VydmljZVxuICApIHt9XG5cbiAgQEhvc3RCaW5kaW5nKCdAZm9vdGVyU3RhdGUnKVxuICBnZXQgZm9vdGVyU3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNldHVwQ29udGVudFNlYXJjaE9ic2VydmVyKCk7XG4gICAgdGhpcy5zZXR1cEJyZWFrcG9pbnRPYnNlcnZlcigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwQ29udGVudFNlYXJjaE9ic2VydmVyKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoKHNyOiBTZWFyY2hSZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHQgPSBzcjtcbiAgICAgICAgdGhpcy5zaG93Q29udGVudFNlYXJjaE5hdmlnYXRvciA9IHRoaXMuc2VhcmNoUmVzdWx0LnNpemUoKSA+IDA7XG4gICAgICAgIHRoaXMudXBkYXRlU2hvd1BhZ2VOYXZpZ2F0b3IoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwQnJlYWtwb2ludE9ic2VydmVyKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmJyZWFrcG9pbnRPYnNlcnZlclxuICAgICAgICAub2JzZXJ2ZShbQnJlYWtwb2ludHMuWFNtYWxsXSlcbiAgICAgICAgLnN1YnNjcmliZSgodmFsdWU6IEJyZWFrcG9pbnRTdGF0ZSkgPT4ge1xuICAgICAgICAgIHRoaXMuc2hvd1BhZ2VOYXZpZ2F0b3IgPSB2YWx1ZS5tYXRjaGVzXG4gICAgICAgICAgICA/IHRoaXMuc2VhcmNoUmVzdWx0LnNpemUoKSA9PT0gMFxuICAgICAgICAgICAgOiB0cnVlO1xuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVNob3dQYWdlTmF2aWdhdG9yKCkge1xuICAgIHRoaXMuc2hvd1BhZ2VOYXZpZ2F0b3IgPVxuICAgICAgdGhpcy5zZWFyY2hSZXN1bHQuc2l6ZSgpID09PSAwIHx8ICF0aGlzLmlzSGFuZHNldFBvcnRyYWl0KCk7XG4gIH1cblxuICBwcml2YXRlIGlzSGFuZHNldFBvcnRyYWl0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmJyZWFrcG9pbnRPYnNlcnZlci5pc01hdGNoZWQoQnJlYWtwb2ludHMuSGFuZHNldFBvcnRyYWl0KTtcbiAgfVxufVxuIiwiPG1hdC10b29sYmFyIGNsYXNzPVwiZm9vdGVyLXRvb2xiYXJcIj5cbiAgPG5nLXRlbXBsYXRlICNtaW1lRm9vdGVyQmVmb3JlPjwvbmctdGVtcGxhdGU+XG4gIEBpZiAoc2hvd0NvbnRlbnRTZWFyY2hOYXZpZ2F0b3IpIHtcbiAgICA8bWltZS1jb250ZW50LXNlYXJjaC1uYXZpZ2F0b3JcbiAgICAgIFtuZ0NsYXNzXT1cInsgJ3ctZnVsbCc6ICFzaG93UGFnZU5hdmlnYXRvciB9XCJcbiAgICAgIFtzZWFyY2hSZXN1bHRdPVwic2VhcmNoUmVzdWx0XCJcbiAgICA+PC9taW1lLWNvbnRlbnQtc2VhcmNoLW5hdmlnYXRvcj5cbiAgICA8bWF0LWRpdmlkZXIgY2xhc3M9XCJoLWZ1bGxcIiB2ZXJ0aWNhbD48L21hdC1kaXZpZGVyPlxuICB9XG4gIDxtaW1lLXBhZ2UtbmF2aWdhdG9yXG4gICAgY2xhc3M9XCJ3LWZ1bGxcIlxuICAgIFtoaWRkZW5dPVwiIXNob3dQYWdlTmF2aWdhdG9yXCJcbiAgICBbc2VhcmNoUmVzdWx0XT1cInNlYXJjaFJlc3VsdFwiXG4gID48L21pbWUtcGFnZS1uYXZpZ2F0b3I+XG4gIDxuZy10ZW1wbGF0ZSAjbWltZUZvb3RlckFmdGVyPjwvbmctdGVtcGxhdGU+XG48L21hdC10b29sYmFyPlxuIl19