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
import * as i5 from "./canvas-group-navigator/canvas-group-navigator.component";
import * as i6 from "./content-search-navigator/content-search-navigator.component";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerFooterComponent, deps: [{ token: i1.BreakpointObserver }, { token: i0.ChangeDetectorRef }, { token: i2.IiifContentSearchService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: ViewerFooterComponent, selector: "mime-viewer-footer", host: { properties: { "@footerState": "this.footerState" } }, viewQueries: [{ propertyName: "mimeFooterBefore", first: true, predicate: ["mimeFooterBefore"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "mimeFooterAfter", first: true, predicate: ["mimeFooterAfter"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: "<mat-toolbar class=\"footer-toolbar\">\n  <ng-template #mimeFooterBefore></ng-template>\n  <mime-content-search-navigator\n    *ngIf=\"showContentSearchNavigator\"\n    [ngClass]=\"{ 'w-full': !showPageNavigator }\"\n    [searchResult]=\"searchResult\"\n  ></mime-content-search-navigator>\n  <mime-page-navigator\n    class=\"w-full\"\n    [hidden]=\"!showPageNavigator\"\n    [searchResult]=\"searchResult\"\n  ></mime-page-navigator>\n  <ng-template #mimeFooterAfter></ng-template>\n</mat-toolbar>\n", styles: [":host{display:block;width:100%;-webkit-user-select:none;user-select:none}.footer-toolbar{padding:0}[hidden]{display:none}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { kind: "component", type: i5.CanvasGroupNavigatorComponent, selector: "mime-page-navigator", inputs: ["searchResult"] }, { kind: "component", type: i6.ContentSearchNavigatorComponent, selector: "mime-content-search-navigator", inputs: ["searchResult"] }], animations: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerFooterComponent, decorators: [{
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
                    ], template: "<mat-toolbar class=\"footer-toolbar\">\n  <ng-template #mimeFooterBefore></ng-template>\n  <mime-content-search-navigator\n    *ngIf=\"showContentSearchNavigator\"\n    [ngClass]=\"{ 'w-full': !showPageNavigator }\"\n    [searchResult]=\"searchResult\"\n  ></mime-content-search-navigator>\n  <mime-page-navigator\n    class=\"w-full\"\n    [hidden]=\"!showPageNavigator\"\n    [searchResult]=\"searchResult\"\n  ></mime-page-navigator>\n  <ng-template #mimeFooterAfter></ng-template>\n</mat-toolbar>\n", styles: [":host{display:block;width:100%;-webkit-user-select:none;user-select:none}.footer-toolbar{padding:0}[hidden]{display:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.BreakpointObserver }, { type: i0.ChangeDetectorRef }, { type: i2.IiifContentSearchService }]; }, propDecorators: { mimeFooterBefore: [{
                type: ViewChild,
                args: ['mimeFooterBefore', { read: ViewContainerRef, static: true }]
            }], mimeFooterAfter: [{
                type: ViewChild,
                args: ['mimeFooterAfter', { read: ViewContainerRef, static: true }]
            }], footerState: [{
                type: HostBinding,
                args: ['@footerState']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWZvb3Rlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1mb290ZXIvdmlld2VyLWZvb3Rlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1mb290ZXIvdmlld2VyLWZvb3Rlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFDTCxrQkFBa0IsRUFFbEIsV0FBVyxHQUNaLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsV0FBVyxFQUdYLFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFDaEgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7OztBQStCakUsTUFBTSxPQUFPLHFCQUFxQjtJQWNoQyxZQUNVLGtCQUFzQyxFQUN0QyxpQkFBb0MsRUFDcEMsd0JBQWtEO1FBRmxELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBWHJELFVBQUssR0FBRyxNQUFNLENBQUM7UUFDZiwwQkFBcUIs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QUNOLEtBQUssQ0FBQztnQ0FDSixTQUFTLEVBQUUsb0JBQW9COzZCQUNoQyxDQUFDLENBQ0g7NEJBQ0QsS0FBSyxDQUNILE1BQU0sRUFDTixLQUFLLENBQUM7Z0NBQ0osU0FBUyxFQUFFLGlCQUFpQjs2QkFDN0IsQ0FBQyxDQUNIOzRCQUNELFVBQVUsQ0FDUixjQUFjLEVBQ2QsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDLENBQ3JFOzRCQUNELFVBQVUsQ0FDUixjQUFjLEVBQ2QsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEdBQUcsYUFBYSxDQUFDLENBQ3ZFO3lCQUNGLENBQUM7cUJBQ0g7Z0xBSUQsZ0JBQWdCO3NCQURmLFNBQVM7dUJBQUMsa0JBQWtCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFHdkUsZUFBZTtzQkFEZCxTQUFTO3VCQUFDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBa0JsRSxXQUFXO3NCQURkLFdBQVc7dUJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGFuaW1hdGUsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgdHJpZ2dlcixcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBCcmVha3BvaW50T2JzZXJ2ZXIsXG4gIEJyZWFrcG9pbnRTdGF0ZSxcbiAgQnJlYWtwb2ludHMsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9sYXlvdXQnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSG9zdEJpbmRpbmcsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBWaWV3ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvdmlld2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb3JlL2lpaWYtY29udGVudC1zZWFyY2gtc2VydmljZS9paWlmLWNvbnRlbnQtc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi8uLi9jb3JlL21vZGVscy9zZWFyY2gtcmVzdWx0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS12aWV3ZXItZm9vdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ZpZXdlci1mb290ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi92aWV3ZXItZm9vdGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdmb290ZXJTdGF0ZScsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnaGlkZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwgMTAwJSknLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAnc2hvdycsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwgMCknLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdoaWRlID0+IHNob3cnLFxuICAgICAgICBhbmltYXRlKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMudG9vbGJhcnNFYXNlSW5UaW1lICsgJ21zIGVhc2UtaW4nKVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdzaG93ID0+IGhpZGUnLFxuICAgICAgICBhbmltYXRlKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMudG9vbGJhcnNFYXNlT3V0VGltZSArICdtcyBlYXNlLW91dCcpXG4gICAgICApLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBWaWV3ZXJGb290ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ21pbWVGb290ZXJCZWZvcmUnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBtaW1lRm9vdGVyQmVmb3JlITogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnbWltZUZvb3RlckFmdGVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgbWltZUZvb3RlckFmdGVyITogVmlld0NvbnRhaW5lclJlZjtcblxuICBwdWJsaWMgc3RhdGUgPSAnaGlkZSc7XG4gIHB1YmxpYyBzaG93TmF2aWdhdGlvblRvb2xiYXIgPSB0cnVlO1xuICBwdWJsaWMgc2VhcmNoUmVzdWx0OiBTZWFyY2hSZXN1bHQgPSBuZXcgU2VhcmNoUmVzdWx0KCk7XG4gIHB1YmxpYyBzaG93UGFnZU5hdmlnYXRvciA9IHRydWU7XG4gIHB1YmxpYyBzaG93Q29udGVudFNlYXJjaE5hdmlnYXRvciA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGJyZWFrcG9pbnRPYnNlcnZlcjogQnJlYWtwb2ludE9ic2VydmVyLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlOiBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2VcbiAgKSB7fVxuXG4gIEBIb3N0QmluZGluZygnQGZvb3RlclN0YXRlJylcbiAgZ2V0IGZvb3RlclN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZXR1cENvbnRlbnRTZWFyY2hPYnNlcnZlcigpO1xuICAgIHRoaXMuc2V0dXBCcmVha3BvaW50T2JzZXJ2ZXIoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cENvbnRlbnRTZWFyY2hPYnNlcnZlcigpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChzcjogU2VhcmNoUmVzdWx0KSA9PiB7XG4gICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0ID0gc3I7XG4gICAgICAgIHRoaXMuc2hvd0NvbnRlbnRTZWFyY2hOYXZpZ2F0b3IgPSB0aGlzLnNlYXJjaFJlc3VsdC5zaXplKCkgPiAwO1xuICAgICAgICB0aGlzLnVwZGF0ZVNob3dQYWdlTmF2aWdhdG9yKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cEJyZWFrcG9pbnRPYnNlcnZlcigpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5icmVha3BvaW50T2JzZXJ2ZXJcbiAgICAgICAgLm9ic2VydmUoW0JyZWFrcG9pbnRzLlhTbWFsbF0pXG4gICAgICAgIC5zdWJzY3JpYmUoKHZhbHVlOiBCcmVha3BvaW50U3RhdGUpID0+IHtcbiAgICAgICAgICB0aGlzLnNob3dQYWdlTmF2aWdhdG9yID0gdmFsdWUubWF0Y2hlc1xuICAgICAgICAgICAgPyB0aGlzLnNlYXJjaFJlc3VsdC5zaXplKCkgPT09IDBcbiAgICAgICAgICAgIDogdHJ1ZTtcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTaG93UGFnZU5hdmlnYXRvcigpIHtcbiAgICB0aGlzLnNob3dQYWdlTmF2aWdhdG9yID1cbiAgICAgIHRoaXMuc2VhcmNoUmVzdWx0LnNpemUoKSA9PT0gMCB8fCAhdGhpcy5pc0hhbmRzZXRQb3J0cmFpdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0hhbmRzZXRQb3J0cmFpdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5icmVha3BvaW50T2JzZXJ2ZXIuaXNNYXRjaGVkKEJyZWFrcG9pbnRzLkhhbmRzZXRQb3J0cmFpdCk7XG4gIH1cbn1cbiIsIjxtYXQtdG9vbGJhciBjbGFzcz1cImZvb3Rlci10b29sYmFyXCI+XG4gIDxuZy10ZW1wbGF0ZSAjbWltZUZvb3RlckJlZm9yZT48L25nLXRlbXBsYXRlPlxuICA8bWltZS1jb250ZW50LXNlYXJjaC1uYXZpZ2F0b3JcbiAgICAqbmdJZj1cInNob3dDb250ZW50U2VhcmNoTmF2aWdhdG9yXCJcbiAgICBbbmdDbGFzc109XCJ7ICd3LWZ1bGwnOiAhc2hvd1BhZ2VOYXZpZ2F0b3IgfVwiXG4gICAgW3NlYXJjaFJlc3VsdF09XCJzZWFyY2hSZXN1bHRcIlxuICA+PC9taW1lLWNvbnRlbnQtc2VhcmNoLW5hdmlnYXRvcj5cbiAgPG1pbWUtcGFnZS1uYXZpZ2F0b3JcbiAgICBjbGFzcz1cInctZnVsbFwiXG4gICAgW2hpZGRlbl09XCIhc2hvd1BhZ2VOYXZpZ2F0b3JcIlxuICAgIFtzZWFyY2hSZXN1bHRdPVwic2VhcmNoUmVzdWx0XCJcbiAgPjwvbWltZS1wYWdlLW5hdmlnYXRvcj5cbiAgPG5nLXRlbXBsYXRlICNtaW1lRm9vdGVyQWZ0ZXI+PC9uZy10ZW1wbGF0ZT5cbjwvbWF0LXRvb2xiYXI+XG4iXX0=