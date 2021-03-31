import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ManifestUtils } from '../../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeDomHelper } from '../../core/mime-dom-helper';
import { ViewerLayout } from '../../core/models/viewer-layout';
import { ViewerOptions } from '../../core/models/viewer-options';
import { ViewerLayoutService } from '../../core/viewer-layout-service/viewer-layout-service';
import { ContentSearchDialogService } from './../../content-search-dialog/content-search-dialog.service';
import { ContentsDialogService } from './../../contents-dialog/contents-dialog.service';
import { FullscreenService } from './../../core/fullscreen-service/fullscreen.service';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../../core/intl/viewer-intl';
import { HelpDialogService } from '../../help-dialog/help-dialog.service';
export class ViewerHeaderComponent {
    constructor(intl, changeDetectorRef, contentsDialogService, contentSearchDialogService, helpDialogService, iiifManifestService, fullscreenService, mimeDomHelper, viewerLayoutService) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.contentsDialogService = contentsDialogService;
        this.contentSearchDialogService = contentSearchDialogService;
        this.helpDialogService = helpDialogService;
        this.iiifManifestService = iiifManifestService;
        this.fullscreenService = fullscreenService;
        this.mimeDomHelper = mimeDomHelper;
        this.viewerLayoutService = viewerLayoutService;
        this.state = 'hide';
        this.isContentSearchEnabled = false;
        this.isFullscreenEnabled = false;
        this.isInFullscreen = false;
        this.fullscreenLabel = this.intl.fullScreenLabel;
        this.isPagedManifest = false;
        this.viewerLayout = ViewerLayout.ONE_PAGE;
        this.ViewerLayout = ViewerLayout; // enables parsing of enum in template
        this.destroyed = new Subject();
    }
    get headerState() {
        return this.state;
    }
    ngOnInit() {
        this.isFullscreenEnabled = this.fullscreenService.isEnabled();
        this.intl.changes
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => this.changeDetectorRef.markForCheck());
        this.fullscreenService.onChange
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => {
            this.isInFullscreen = this.fullscreenService.isFullscreen();
            this.fullscreenLabel = this.isInFullscreen
                ? this.intl.exitFullScreenLabel
                : this.intl.fullScreenLabel;
            this.changeDetectorRef.detectChanges();
        });
        this.iiifManifestService.currentManifest
            .pipe(takeUntil(this.destroyed))
            .subscribe((manifest) => {
            this.manifest = manifest;
            this.isContentSearchEnabled = manifest.service ? true : false;
            this.isPagedManifest = ManifestUtils.isManifestPaged(manifest);
            this.changeDetectorRef.detectChanges();
        });
        this.viewerLayoutService.onChange
            .pipe(takeUntil(this.destroyed))
            .subscribe((viewerLayout) => {
            this.viewerLayout = viewerLayout;
        });
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    toggleContents() {
        this.contentSearchDialogService.close();
        this.helpDialogService.close();
        this.contentsDialogService.toggle();
    }
    toggleSearch() {
        this.contentsDialogService.close();
        this.helpDialogService.close();
        this.contentSearchDialogService.toggle();
    }
    toggleHelp() {
        this.contentsDialogService.close();
        this.contentSearchDialogService.close();
        this.helpDialogService.toggle();
    }
    toggleFullscreen() {
        return this.mimeDomHelper.toggleFullscreen();
    }
    isInFullScreen() {
        return this.fullscreenService.isFullscreen();
    }
    toggleViewerLayout() {
        this.viewerLayoutService.toggle();
    }
    setLayoutOnePage() {
        this.viewerLayoutService.setLayout(ViewerLayout.ONE_PAGE);
    }
    setLayoutTwoPage() {
        this.viewerLayoutService.setLayout(ViewerLayout.TWO_PAGE);
    }
}
ViewerHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'mime-viewer-header',
                template: "<mat-toolbar>\n  <div\n    class=\"header-container\"\n    fxLayout=\"row\"\n    fxLayoutAlign=\"space-between center\"\n  >\n    <div><ng-template #mimeHeaderBefore></ng-template></div>\n    <div fxFlexOffset=\"16px\" class=\"label\" [matTooltip]=\"manifest?.label\">{{\n      manifest?.label\n    }}</div>\n    <div\n      fxFlex=\"noshrink\"\n      fxLayout=\"row\"\n      fxLayoutAlign=\"end center\"\n      class=\"buttons-container\"\n    >\n      <button\n        *ngIf=\"isPagedManifest\"\n        mat-icon-button\n        [id]=\"\n          viewerLayout === ViewerLayout.ONE_PAGE\n            ? 'toggleTwoPageViewButton'\n            : 'toggleSinglePageViewButton'\n        \"\n        [attr.aria-label]=\"\n          viewerLayout === ViewerLayout.ONE_PAGE\n            ? intl.twoPageViewLabel\n            : intl.singlePageViewLabel\n        \"\n        [matTooltip]=\"\n          viewerLayout === ViewerLayout.ONE_PAGE\n            ? intl.twoPageViewLabel\n            : intl.singlePageViewLabel\n        \"\n        (click)=\"toggleViewerLayout()\"\n      >\n        <mime-icon\n          [iconName]=\"\n            viewerLayout === ViewerLayout.ONE_PAGE\n              ? 'two_page_display'\n              : 'single_page_display'\n          \"\n        >\n        </mime-icon>\n      </button>\n      <button\n        id=\"ngx-mimeContentsDialogButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.contentsLabel\"\n        [matTooltip]=\"intl.contentsLabel\"\n        (click)=\"toggleContents()\"\n      >\n        <mat-icon aria-hidden=\"true\">list</mat-icon>\n      </button>\n      <button\n        id=\"ngx-mimeContentSearchDialogButton\"\n        *ngIf=\"isContentSearchEnabled\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.searchLabel\"\n        [matTooltip]=\"intl.searchLabel\"\n        (click)=\"toggleSearch()\"\n      >\n        <mat-icon aria-hidden=\"true\">search</mat-icon>\n      </button>\n      <button\n        id=\"ngx-mimeHelpDialogButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.help.helpLabel\"\n        [matTooltip]=\"intl.help.helpLabel\"\n        (click)=\"toggleHelp()\"\n      >\n        <mat-icon aria-hidden=\"true\">help</mat-icon>\n      </button>\n\n      <button\n        id=\"ngx-mimeFullscreenButton\"\n        *ngIf=\"isFullscreenEnabled\"\n        mat-icon-button\n        [attr.aria-label]=\"fullscreenLabel\"\n        [matTooltip]=\"fullscreenLabel\"\n        (click)=\"toggleFullscreen()\"\n      >\n        <mat-icon *ngIf=\"isInFullScreen\" aria-hidden=\"true\"\n          >fullscreen_exit</mat-icon\n        >\n        <mat-icon *ngIf=\"!isInFullScreen\" aria-hidden=\"true\"\n          >fullscreen</mat-icon\n        >\n      </button>\n    </div>\n    <div><ng-template #mimeHeaderAfter></ng-template></div>\n  </div>\n</mat-toolbar>\n",
                changeDetection: ChangeDetectionStrategy.Default,
                animations: [
                    trigger('headerState', [
                        state('hide', style({
                            transform: 'translate(0, -100%)'
                        })),
                        state('show', style({
                            transform: 'translate(0px, 0px)'
                        })),
                        transition('hide => show', animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')),
                        transition('show => hide', animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out'))
                    ])
                ],
                styles: [":host{max-height:64px}.header-container{width:100%}.label{font-size:17px;overflow:hidden;text-overflow:ellipsis}mat-toolbar{padding:0}.buttons-container{padding:0 16px}"]
            },] }
];
ViewerHeaderComponent.ctorParameters = () => [
    { type: MimeViewerIntl },
    { type: ChangeDetectorRef },
    { type: ContentsDialogService },
    { type: ContentSearchDialogService },
    { type: HelpDialogService },
    { type: IiifManifestService },
    { type: FullscreenService },
    { type: MimeDomHelper },
    { type: ViewerLayoutService }
];
ViewerHeaderComponent.propDecorators = {
    mimeHeaderBefore: [{ type: ViewChild, args: ['mimeHeaderBefore', { read: ViewContainerRef, static: true },] }],
    mimeHeaderAfter: [{ type: ViewChild, args: ['mimeHeaderAfter', { read: ViewContainerRef, static: true },] }],
    headerState: [{ type: HostBinding, args: ['@headerState',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWhlYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvIiwic291cmNlcyI6WyJsaWIvdmlld2VyL3ZpZXdlci1oZWFkZXIvdmlld2VyLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEVBQ1IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsV0FBVyxFQUdYLFNBQVMsRUFDVCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDL0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQzdGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUvRCxP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aUIsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzBCQTBCckUsV0FBVyxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBhbmltYXRlLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSG9zdEJpbmRpbmcsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYW5pZmVzdFV0aWxzIH0gZnJvbSAnLi4vLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC11dGlscyc7XG5pbXBvcnQgeyBNaW1lRG9tSGVscGVyIH0gZnJvbSAnLi4vLi4vY29yZS9taW1lLWRvbS1oZWxwZXInO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0IH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvdmlld2VyLWxheW91dCc7XG5pbXBvcnQgeyBWaWV3ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvdmlld2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0U2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvdmlld2VyLWxheW91dC1zZXJ2aWNlL3ZpZXdlci1sYXlvdXQtc2VydmljZSc7XG5pbXBvcnQgeyBDb250ZW50U2VhcmNoRGlhbG9nU2VydmljZSB9IGZyb20gJy4vLi4vLi4vY29udGVudC1zZWFyY2gtZGlhbG9nL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRlbnRzRGlhbG9nU2VydmljZSB9IGZyb20gJy4vLi4vLi4vY29udGVudHMtZGlhbG9nL2NvbnRlbnRzLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IEZ1bGxzY3JlZW5TZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb3JlL2Z1bGxzY3JlZW4tc2VydmljZS9mdWxsc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZk1hbmlmZXN0U2VydmljZSB9IGZyb20gJy4vLi4vLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi8uLi8uLi9jb3JlL2ludGwvdmlld2VyLWludGwnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLy4uLy4uL2NvcmUvbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IEhlbHBEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vaGVscC1kaWFsb2cvaGVscC1kaWFsb2cuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21pbWUtdmlld2VyLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi92aWV3ZXItaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdmlld2VyLWhlYWRlci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdoZWFkZXJTdGF0ZScsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnaGlkZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwgLTEwMCUpJ1xuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHN0YXRlKFxuICAgICAgICAnc2hvdycsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMHB4LCAwcHgpJ1xuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdoaWRlID0+IHNob3cnLFxuICAgICAgICBhbmltYXRlKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMudG9vbGJhcnNFYXNlSW5UaW1lICsgJ21zIGVhc2UtaW4nKVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdzaG93ID0+IGhpZGUnLFxuICAgICAgICBhbmltYXRlKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMudG9vbGJhcnNFYXNlT3V0VGltZSArICdtcyBlYXNlLW91dCcpXG4gICAgICApXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBWaWV3ZXJIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ21pbWVIZWFkZXJCZWZvcmUnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBtaW1lSGVhZGVyQmVmb3JlOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdtaW1lSGVhZGVyQWZ0ZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBtaW1lSGVhZGVyQWZ0ZXI6IFZpZXdDb250YWluZXJSZWY7XG4gIHB1YmxpYyBtYW5pZmVzdDogTWFuaWZlc3Q7XG4gIHB1YmxpYyBzdGF0ZSA9ICdoaWRlJztcbiAgaXNDb250ZW50U2VhcmNoRW5hYmxlZCA9IGZhbHNlO1xuICBpc0Z1bGxzY3JlZW5FbmFibGVkID0gZmFsc2U7XG4gIGlzSW5GdWxsc2NyZWVuID0gZmFsc2U7XG4gIGZ1bGxzY3JlZW5MYWJlbCA9IHRoaXMuaW50bC5mdWxsU2NyZWVuTGFiZWw7XG4gIGlzUGFnZWRNYW5pZmVzdCA9IGZhbHNlO1xuICB2aWV3ZXJMYXlvdXQ6IFZpZXdlckxheW91dCA9IFZpZXdlckxheW91dC5PTkVfUEFHRTtcblxuICBWaWV3ZXJMYXlvdXQ6IHR5cGVvZiBWaWV3ZXJMYXlvdXQgPSBWaWV3ZXJMYXlvdXQ7IC8vIGVuYWJsZXMgcGFyc2luZyBvZiBlbnVtIGluIHRlbXBsYXRlXG4gIHByaXZhdGUgZGVzdHJveWVkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBjb250ZW50c0RpYWxvZ1NlcnZpY2U6IENvbnRlbnRzRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlOiBDb250ZW50U2VhcmNoRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGhlbHBEaWFsb2dTZXJ2aWNlOiBIZWxwRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZNYW5pZmVzdFNlcnZpY2U6IElpaWZNYW5pZmVzdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBmdWxsc2NyZWVuU2VydmljZTogRnVsbHNjcmVlblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBtaW1lRG9tSGVscGVyOiBNaW1lRG9tSGVscGVyLFxuICAgIHByaXZhdGUgdmlld2VyTGF5b3V0U2VydmljZTogVmlld2VyTGF5b3V0U2VydmljZVxuICApIHt9XG5cbiAgQEhvc3RCaW5kaW5nKCdAaGVhZGVyU3RhdGUnKVxuICBnZXQgaGVhZGVyU3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmlzRnVsbHNjcmVlbkVuYWJsZWQgPSB0aGlzLmZ1bGxzY3JlZW5TZXJ2aWNlLmlzRW5hYmxlZCgpO1xuXG4gICAgdGhpcy5pbnRsLmNoYW5nZXNcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuXG4gICAgdGhpcy5mdWxsc2NyZWVuU2VydmljZS5vbkNoYW5nZVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmlzSW5GdWxsc2NyZWVuID0gdGhpcy5mdWxsc2NyZWVuU2VydmljZS5pc0Z1bGxzY3JlZW4oKTtcbiAgICAgICAgdGhpcy5mdWxsc2NyZWVuTGFiZWwgPSB0aGlzLmlzSW5GdWxsc2NyZWVuXG4gICAgICAgICAgPyB0aGlzLmludGwuZXhpdEZ1bGxTY3JlZW5MYWJlbFxuICAgICAgICAgIDogdGhpcy5pbnRsLmZ1bGxTY3JlZW5MYWJlbDtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KTtcblxuICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5jdXJyZW50TWFuaWZlc3RcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAuc3Vic2NyaWJlKChtYW5pZmVzdDogTWFuaWZlc3QpID0+IHtcbiAgICAgICAgdGhpcy5tYW5pZmVzdCA9IG1hbmlmZXN0O1xuICAgICAgICB0aGlzLmlzQ29udGVudFNlYXJjaEVuYWJsZWQgPSBtYW5pZmVzdC5zZXJ2aWNlID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUGFnZWRNYW5pZmVzdCA9IE1hbmlmZXN0VXRpbHMuaXNNYW5pZmVzdFBhZ2VkKG1hbmlmZXN0KTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KTtcblxuICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5vbkNoYW5nZVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgIC5zdWJzY3JpYmUoKHZpZXdlckxheW91dDogVmlld2VyTGF5b3V0KSA9PiB7XG4gICAgICAgIHRoaXMudmlld2VyTGF5b3V0ID0gdmlld2VyTGF5b3V0O1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVDb250ZW50cygpIHtcbiAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgdGhpcy5oZWxwRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgIHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLnRvZ2dsZSgpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZVNlYXJjaCgpIHtcbiAgICB0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgIHRoaXMuaGVscERpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLnRvZ2dsZSgpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUhlbHAoKSB7XG4gICAgdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgdGhpcy5oZWxwRGlhbG9nU2VydmljZS50b2dnbGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVGdWxsc2NyZWVuKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLm1pbWVEb21IZWxwZXIudG9nZ2xlRnVsbHNjcmVlbigpO1xuICB9XG5cbiAgcHVibGljIGlzSW5GdWxsU2NyZWVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZ1bGxzY3JlZW5TZXJ2aWNlLmlzRnVsbHNjcmVlbigpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZVZpZXdlckxheW91dCgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2UudG9nZ2xlKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0TGF5b3V0T25lUGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2Uuc2V0TGF5b3V0KFZpZXdlckxheW91dC5PTkVfUEFHRSk7XG4gIH1cblxuICBwdWJsaWMgc2V0TGF5b3V0VHdvUGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2Uuc2V0TGF5b3V0KFZpZXdlckxheW91dC5UV09fUEFHRSk7XG4gIH1cbn1cbiJdfQ==