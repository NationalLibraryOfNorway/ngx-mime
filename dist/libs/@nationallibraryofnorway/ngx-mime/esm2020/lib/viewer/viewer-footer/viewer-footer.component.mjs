import { animate, state, style, transition, trigger, } from '@angular/animations';
import { Component, HostBinding, ViewChild, ViewContainerRef, } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewerOptions } from '../../core/models/viewer-options';
import { SearchResult } from './../../core/models/search-result';
import * as i0 from "@angular/core";
import * as i1 from "./../../core/iiif-content-search-service/iiif-content-search.service";
import * as i2 from "@angular/flex-layout";
import * as i3 from "@angular/common";
import * as i4 from "@angular/flex-layout/flex";
import * as i5 from "@angular/material/toolbar";
import * as i6 from "./content-search-navigator/content-search-navigator.component";
import * as i7 from "./canvas-group-navigator/canvas-group-navigator.component";
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
ViewerFooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ViewerFooterComponent, deps: [{ token: i1.IiifContentSearchService }, { token: i2.MediaObserver }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ViewerFooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.1.2", type: ViewerFooterComponent, selector: "mime-viewer-footer", host: { properties: { "@footerState": "this.footerState" } }, viewQueries: [{ propertyName: "mimeFooterBefore", first: true, predicate: ["mimeFooterBefore"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "mimeFooterAfter", first: true, predicate: ["mimeFooterAfter"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: "<mat-toolbar class=\"footer-toolbar\">\n  <div fxLayout=\"row\" fxFlex fxLayoutAlign=\"start center\">\n    <div><ng-template #mimeFooterBefore></ng-template></div>\n    <div fxFlex=\"250px\" fxFlex.lt-md=\"100%\" *ngIf=\"searchResult.size() > 0\">\n      <mime-content-search-navigator\n        *ngIf=\"showContentSearchNavigator\"\n        [searchResult]=\"searchResult\"\n      ></mime-content-search-navigator>\n    </div>\n    <div fxFlex [hidden]=\"!showPageNavigator\">\n      <mime-page-navigator [searchResult]=\"searchResult\"></mime-page-navigator>\n    </div>\n  </div>\n  <div><ng-template #mimeFooterAfter></ng-template></div>\n</mat-toolbar>\n", styles: [":host{display:block;width:100%;-webkit-user-select:none;user-select:none}.footer-toolbar{padding:0}[hidden]{display:none}\n"], dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.DefaultLayoutDirective, selector: "  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],  [fxLayout.gt-md], [fxLayout.gt-lg]", inputs: ["fxLayout", "fxLayout.xs", "fxLayout.sm", "fxLayout.md", "fxLayout.lg", "fxLayout.xl", "fxLayout.lt-sm", "fxLayout.lt-md", "fxLayout.lt-lg", "fxLayout.lt-xl", "fxLayout.gt-xs", "fxLayout.gt-sm", "fxLayout.gt-md", "fxLayout.gt-lg"] }, { kind: "directive", type: i4.DefaultLayoutAlignDirective, selector: "  [fxLayoutAlign], [fxLayoutAlign.xs], [fxLayoutAlign.sm], [fxLayoutAlign.md],  [fxLayoutAlign.lg], [fxLayoutAlign.xl], [fxLayoutAlign.lt-sm], [fxLayoutAlign.lt-md],  [fxLayoutAlign.lt-lg], [fxLayoutAlign.lt-xl], [fxLayoutAlign.gt-xs], [fxLayoutAlign.gt-sm],  [fxLayoutAlign.gt-md], [fxLayoutAlign.gt-lg]", inputs: ["fxLayoutAlign", "fxLayoutAlign.xs", "fxLayoutAlign.sm", "fxLayoutAlign.md", "fxLayoutAlign.lg", "fxLayoutAlign.xl", "fxLayoutAlign.lt-sm", "fxLayoutAlign.lt-md", "fxLayoutAlign.lt-lg", "fxLayoutAlign.lt-xl", "fxLayoutAlign.gt-xs", "fxLayoutAlign.gt-sm", "fxLayoutAlign.gt-md", "fxLayoutAlign.gt-lg"] }, { kind: "directive", type: i4.DefaultFlexDirective, selector: "  [fxFlex], [fxFlex.xs], [fxFlex.sm], [fxFlex.md],  [fxFlex.lg], [fxFlex.xl], [fxFlex.lt-sm], [fxFlex.lt-md],  [fxFlex.lt-lg], [fxFlex.lt-xl], [fxFlex.gt-xs], [fxFlex.gt-sm],  [fxFlex.gt-md], [fxFlex.gt-lg]", inputs: ["fxFlex", "fxFlex.xs", "fxFlex.sm", "fxFlex.md", "fxFlex.lg", "fxFlex.xl", "fxFlex.lt-sm", "fxFlex.lt-md", "fxFlex.lt-lg", "fxFlex.lt-xl", "fxFlex.gt-xs", "fxFlex.gt-sm", "fxFlex.gt-md", "fxFlex.gt-lg"] }, { kind: "component", type: i5.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { kind: "component", type: i6.ContentSearchNavigatorComponent, selector: "mime-content-search-navigator", inputs: ["searchResult"] }, { kind: "component", type: i7.CanvasGroupNavigatorComponent, selector: "mime-page-navigator", inputs: ["searchResult"] }], animations: [
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
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ViewerFooterComponent, decorators: [{
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
                    ], template: "<mat-toolbar class=\"footer-toolbar\">\n  <div fxLayout=\"row\" fxFlex fxLayoutAlign=\"start center\">\n    <div><ng-template #mimeFooterBefore></ng-template></div>\n    <div fxFlex=\"250px\" fxFlex.lt-md=\"100%\" *ngIf=\"searchResult.size() > 0\">\n      <mime-content-search-navigator\n        *ngIf=\"showContentSearchNavigator\"\n        [searchResult]=\"searchResult\"\n      ></mime-content-search-navigator>\n    </div>\n    <div fxFlex [hidden]=\"!showPageNavigator\">\n      <mime-page-navigator [searchResult]=\"searchResult\"></mime-page-navigator>\n    </div>\n  </div>\n  <div><ng-template #mimeFooterAfter></ng-template></div>\n</mat-toolbar>\n", styles: [":host{display:block;width:100%;-webkit-user-select:none;user-select:none}.footer-toolbar{padding:0}[hidden]{display:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.IiifContentSearchService }, { type: i2.MediaObserver }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { mimeFooterBefore: [{
                type: ViewChild,
                args: ['mimeFooterBefore', { read: ViewContainerRef, static: true }]
            }], mimeFooterAfter: [{
                type: ViewChild,
                args: ['mimeFooterAfter', { read: ViewContainerRef, static: true }]
            }], footerState: [{
                type: HostBinding,
                args: ['@footerState']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWZvb3Rlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1mb290ZXIvdmlld2VyLWZvb3Rlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1mb290ZXIvdmlld2VyLWZvb3Rlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFFTCxTQUFTLEVBQ1QsV0FBVyxFQUdYLFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7Ozs7QUErQmpFLE1BQU0sT0FBTyxxQkFBcUI7SUFZaEMsWUFDVSx3QkFBa0QsRUFDbkQsYUFBNEIsRUFDM0IsaUJBQW9DO1FBRnBDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbkQsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQVZ2QyxVQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ2YsMEJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLGlCQUFZLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLCtCQUEwQixHQUFHLEtBQUssQ0FBQztRQUNsQyxrQkFB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QUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUd2RSxlQUFlO3NCQURkLFNBQVM7dUJBQUMsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFnQmxFLFdBQVc7c0JBRGQsV0FBVzt1QkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1lZGlhQ2hhbmdlLCBNZWRpYU9ic2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBWaWV3ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvdmlld2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb3JlL2lpaWYtY29udGVudC1zZWFyY2gtc2VydmljZS9paWlmLWNvbnRlbnQtc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi8uLi9jb3JlL21vZGVscy9zZWFyY2gtcmVzdWx0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS12aWV3ZXItZm9vdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ZpZXdlci1mb290ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi92aWV3ZXItZm9vdGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdmb290ZXJTdGF0ZScsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnaGlkZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwgMTAwJSknLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAnc2hvdycsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwgMCknLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdoaWRlID0+IHNob3cnLFxuICAgICAgICBhbmltYXRlKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMudG9vbGJhcnNFYXNlSW5UaW1lICsgJ21zIGVhc2UtaW4nKVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdzaG93ID0+IGhpZGUnLFxuICAgICAgICBhbmltYXRlKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMudG9vbGJhcnNFYXNlT3V0VGltZSArICdtcyBlYXNlLW91dCcpXG4gICAgICApLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBWaWV3ZXJGb290ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ21pbWVGb290ZXJCZWZvcmUnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBtaW1lRm9vdGVyQmVmb3JlITogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnbWltZUZvb3RlckFmdGVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgbWltZUZvb3RlckFmdGVyITogVmlld0NvbnRhaW5lclJlZjtcbiAgcHVibGljIHN0YXRlID0gJ2hpZGUnO1xuICBwdWJsaWMgc2hvd05hdmlnYXRpb25Ub29sYmFyID0gdHJ1ZTtcbiAgcHVibGljIHNlYXJjaFJlc3VsdDogU2VhcmNoUmVzdWx0ID0gbmV3IFNlYXJjaFJlc3VsdCgpO1xuICBwdWJsaWMgc2hvd1BhZ2VOYXZpZ2F0b3IgPSB0cnVlO1xuICBwdWJsaWMgc2hvd0NvbnRlbnRTZWFyY2hOYXZpZ2F0b3IgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlOiBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UsXG4gICAgcHVibGljIG1lZGlhT2JzZXJ2ZXI6IE1lZGlhT2JzZXJ2ZXIsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIEBIb3N0QmluZGluZygnQGZvb3RlclN0YXRlJylcbiAgZ2V0IGZvb3RlclN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZSgoc3I6IFNlYXJjaFJlc3VsdCkgPT4ge1xuICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdCA9IHNyO1xuICAgICAgICB0aGlzLnNob3dDb250ZW50U2VhcmNoTmF2aWdhdG9yID0gdGhpcy5zZWFyY2hSZXN1bHQuc2l6ZSgpID4gMDtcbiAgICAgICAgdGhpcy5zaG93UGFnZU5hdmlnYXRvciA9XG4gICAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHQuc2l6ZSgpID09PSAwIHx8ICF0aGlzLmlzTW9iaWxlKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMubWVkaWFPYnNlcnZlci5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKGNoYW5nZXM6IE1lZGlhQ2hhbmdlW10pID0+IHtcbiAgICAgICAgdGhpcy5zaG93UGFnZU5hdmlnYXRvciA9XG4gICAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHQuc2l6ZSgpID09PSAwIHx8ICF0aGlzLmlzTW9iaWxlKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIGlzTW9iaWxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1lZGlhT2JzZXJ2ZXIuaXNBY3RpdmUoJ2x0LW1kJyk7XG4gIH1cbn1cbiIsIjxtYXQtdG9vbGJhciBjbGFzcz1cImZvb3Rlci10b29sYmFyXCI+XG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeEZsZXggZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgIDxkaXY+PG5nLXRlbXBsYXRlICNtaW1lRm9vdGVyQmVmb3JlPjwvbmctdGVtcGxhdGU+PC9kaXY+XG4gICAgPGRpdiBmeEZsZXg9XCIyNTBweFwiIGZ4RmxleC5sdC1tZD1cIjEwMCVcIiAqbmdJZj1cInNlYXJjaFJlc3VsdC5zaXplKCkgPiAwXCI+XG4gICAgICA8bWltZS1jb250ZW50LXNlYXJjaC1uYXZpZ2F0b3JcbiAgICAgICAgKm5nSWY9XCJzaG93Q29udGVudFNlYXJjaE5hdmlnYXRvclwiXG4gICAgICAgIFtzZWFyY2hSZXN1bHRdPVwic2VhcmNoUmVzdWx0XCJcbiAgICAgID48L21pbWUtY29udGVudC1zZWFyY2gtbmF2aWdhdG9yPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgZnhGbGV4IFtoaWRkZW5dPVwiIXNob3dQYWdlTmF2aWdhdG9yXCI+XG4gICAgICA8bWltZS1wYWdlLW5hdmlnYXRvciBbc2VhcmNoUmVzdWx0XT1cInNlYXJjaFJlc3VsdFwiPjwvbWltZS1wYWdlLW5hdmlnYXRvcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXY+PG5nLXRlbXBsYXRlICNtaW1lRm9vdGVyQWZ0ZXI+PC9uZy10ZW1wbGF0ZT48L2Rpdj5cbjwvbWF0LXRvb2xiYXI+XG4iXX0=