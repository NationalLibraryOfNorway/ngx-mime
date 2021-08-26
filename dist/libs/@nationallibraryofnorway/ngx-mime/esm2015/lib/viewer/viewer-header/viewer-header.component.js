import { animate, state, style, transition, trigger, } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, ViewChild, ViewContainerRef, } from '@angular/core';
import { Subscription } from 'rxjs';
import { AltoService } from '../../core/alto-service/alto.service';
import { ManifestUtils } from '../../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeDomHelper } from '../../core/mime-dom-helper';
import { ViewerLayout } from '../../core/models/viewer-layout';
import { ViewerOptions } from '../../core/models/viewer-options';
import { ViewerLayoutService } from '../../core/viewer-layout-service/viewer-layout-service';
import { HelpDialogService } from '../../help-dialog/help-dialog.service';
import { ContentSearchDialogService } from './../../content-search-dialog/content-search-dialog.service';
import { ContentsDialogService } from './../../contents-dialog/contents-dialog.service';
import { FullscreenService } from './../../core/fullscreen-service/fullscreen.service';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../../core/intl/viewer-intl';
export class ViewerHeaderComponent {
    constructor(intl, changeDetectorRef, contentsDialogService, contentSearchDialogService, helpDialogService, iiifManifestService, fullscreenService, mimeDomHelper, viewerLayoutService, altoService, el) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.contentsDialogService = contentsDialogService;
        this.contentSearchDialogService = contentSearchDialogService;
        this.helpDialogService = helpDialogService;
        this.iiifManifestService = iiifManifestService;
        this.fullscreenService = fullscreenService;
        this.mimeDomHelper = mimeDomHelper;
        this.viewerLayoutService = viewerLayoutService;
        this.altoService = altoService;
        this.manifest = null;
        this.state = 'hide';
        this.isContentSearchEnabled = false;
        this.isFullscreenEnabled = false;
        this.isInFullscreen = false;
        this.fullscreenLabel = this.intl.fullScreenLabel;
        this.isPagedManifest = false;
        this.hasRecognizedTextContent = false;
        this.viewerLayout = ViewerLayout.ONE_PAGE;
        this.ViewerLayout = ViewerLayout; // enables parsing of enum in template
        this.subscriptions = new Subscription();
        contentsDialogService.el = el;
        contentSearchDialogService.el = el;
        helpDialogService.el = el;
    }
    get headerState() {
        return this.state;
    }
    ngOnInit() {
        this.isFullscreenEnabled = this.fullscreenService.isEnabled();
        this.subscriptions.add(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
        this.subscriptions.add(this.fullscreenService.onChange.subscribe(() => {
            this.isInFullscreen = this.fullscreenService.isFullscreen();
            this.fullscreenLabel = this.isInFullscreen
                ? this.intl.exitFullScreenLabel
                : this.intl.fullScreenLabel;
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            this.manifest = manifest;
            this.isContentSearchEnabled =
                manifest && manifest.service ? true : false;
            this.isPagedManifest = manifest
                ? ManifestUtils.isManifestPaged(manifest)
                : false;
            this.hasRecognizedTextContent = manifest ? ManifestUtils.hasRecognizedTextContent(manifest) : false;
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.viewerLayoutService.onChange.subscribe((viewerLayout) => {
            this.viewerLayout = viewerLayout;
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    toggleRecognizedTextContent() {
        this.altoService.toggle();
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
                template: "<mat-toolbar>\n  <div\n    class=\"header-container\"\n    fxLayout=\"row\"\n    fxLayoutAlign=\"space-between center\"\n  >\n    <div><ng-template #mimeHeaderBefore></ng-template></div>\n    <div *ngIf=\"manifest\" fxFlexOffset=\"16px\" class=\"label\" [matTooltip]=\"manifest.label\">{{\n      manifest.label\n    }}</div>\n    <div\n      fxFlex=\"noshrink\"\n      fxLayout=\"row\"\n      fxLayoutAlign=\"end center\"\n      class=\"buttons-container\"\n    >\n      <button\n        *ngIf=\"hasRecognizedTextContent\"\n        mat-icon-button\n        data-test-id=\"ngx-mimeRecognizedTextContentButton\"\n        [attr.aria-label]=\"intl.recognizedTextContentLabel\"\n        [matTooltip]=\"intl.recognizedTextContentLabel\"\n        (click)=\"toggleRecognizedTextContent()\"\n      >\n        <mat-icon>notes</mat-icon>\n      </button>\n      <button\n        *ngIf=\"isPagedManifest\"\n        mat-icon-button\n        [id]=\"\n          viewerLayout === ViewerLayout.ONE_PAGE\n            ? 'toggleTwoPageViewButton'\n            : 'toggleSinglePageViewButton'\n        \"\n        [attr.aria-label]=\"\n          viewerLayout === ViewerLayout.ONE_PAGE\n            ? intl.twoPageViewLabel\n            : intl.singlePageViewLabel\n        \"\n        [matTooltip]=\"\n          viewerLayout === ViewerLayout.ONE_PAGE\n            ? intl.twoPageViewLabel\n            : intl.singlePageViewLabel\n        \"\n        (click)=\"toggleViewerLayout()\"\n      >\n        <mime-icon\n          [iconName]=\"\n            viewerLayout === ViewerLayout.ONE_PAGE\n              ? 'two_page_display'\n              : 'single_page_display'\n          \"\n        >\n        </mime-icon>\n      </button>\n      <button\n        id=\"ngx-mimeContentsDialogButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.contentsLabel\"\n        [matTooltip]=\"intl.contentsLabel\"\n        (click)=\"toggleContents()\"\n      >\n        <mat-icon aria-hidden=\"true\">list</mat-icon>\n      </button>\n      <button\n        id=\"ngx-mimeContentSearchDialogButton\"\n        *ngIf=\"isContentSearchEnabled\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.searchLabel\"\n        [matTooltip]=\"intl.searchLabel\"\n        (click)=\"toggleSearch()\"\n      >\n        <mat-icon aria-hidden=\"true\">search</mat-icon>\n      </button>\n      <button\n        id=\"ngx-mimeHelpDialogButton\"\n        mat-icon-button\n        [attr.aria-label]=\"intl.help.helpLabel\"\n        [matTooltip]=\"intl.help.helpLabel\"\n        (click)=\"toggleHelp()\"\n      >\n        <mat-icon aria-hidden=\"true\">help</mat-icon>\n      </button>\n\n      <button\n        id=\"ngx-mimeFullscreenButton\"\n        *ngIf=\"isFullscreenEnabled\"\n        mat-icon-button\n        [attr.aria-label]=\"fullscreenLabel\"\n        [matTooltip]=\"fullscreenLabel\"\n        (click)=\"toggleFullscreen()\"\n      >\n        <mat-icon *ngIf=\"isInFullScreen\" aria-hidden=\"true\"\n          >fullscreen_exit</mat-icon\n        >\n        <mat-icon *ngIf=\"!isInFullScreen\" aria-hidden=\"true\"\n          >fullscreen</mat-icon\n        >\n      </button>\n    </div>\n    <div><ng-template #mimeHeaderAfter></ng-template></div>\n  </div>\n</mat-toolbar>\n",
                changeDetection: ChangeDetectionStrategy.Default,
                animations: [
                    trigger('headerState', [
                        state('hide', style({
                            transform: 'translate(0, -100%)',
                        })),
                        state('show', style({
                            transform: 'translate(0px, 0px)',
                        })),
                        transition('hide => show', animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')),
                        transition('show => hide', animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out')),
                    ]),
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
    { type: ViewerLayoutService },
    { type: AltoService },
    { type: ElementRef }
];
ViewerHeaderComponent.propDecorators = {
    mimeHeaderBefore: [{ type: ViewChild, args: ['mimeHeaderBefore', { read: ViewContainerRef, static: true },] }],
    mimeHeaderAfter: [{ type: ViewChild, args: ['mimeHeaderAfter', { read: ViewContainerRef, static: true },] }],
    headerState: [{ type: HostBinding, args: ['@headerState',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLWhlYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1oZWFkZXIvdmlld2VyLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEdBQ1IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFHWCxTQUFTLEVBQ1QsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNyRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUM3RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUN6RyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUN4RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFB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V0FBVyxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxDQUNyRTt3QkFDRCxVQUFVLENBQ1IsY0FBYyxFQUNkLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLG1CQUFtQixHQUFHLGFBQWEsQ0FBQyxDQUN2RTtxQkFDRixDQUFDO2lCQUNIOzthQUNGOzs7WUFoQ1EsY0FBYztZQXJCckIsaUJBQWlCO1lBa0JWLHFCQUFxQjtZQURyQiwwQkFBMEI7WUFEMUIsaUJBQWlCO1lBSWpCLG1CQUFtQjtZQURuQixpQkFBaUI7WUFQakIsYUFBYTtZQUdiLG1CQUFtQjtZQUxuQixXQUFXO1lBUmxCLFVBQVU7OzsrQkFxRFQsU0FBUyxTQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7OEJBRXRFLFNBQVMsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzBCQWlDckUsV0FBVyxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBhbmltYXRlLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWx0b1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL2FsdG8tc2VydmljZS9hbHRvLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFuaWZlc3RVdGlscyB9IGZyb20gJy4uLy4uL2NvcmUvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3QtdXRpbHMnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uLy4uL2NvcmUvbWltZS1kb20taGVscGVyJztcbmltcG9ydCB7IFZpZXdlckxheW91dCB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL3ZpZXdlci1sYXlvdXQnO1xuaW1wb3J0IHsgVmlld2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL3ZpZXdlci1vcHRpb25zJztcbmltcG9ydCB7IFZpZXdlckxheW91dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3ZpZXdlci1sYXlvdXQtc2VydmljZS92aWV3ZXItbGF5b3V0LXNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9oZWxwLWRpYWxvZy9oZWxwLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udGVudHNEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb250ZW50cy1kaWFsb2cvY29udGVudHMtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRnVsbHNjcmVlblNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL2NvcmUvZnVsbHNjcmVlbi1zZXJ2aWNlL2Z1bGxzY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLy4uLy4uL2NvcmUvaW50bC92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4vLi4vLi4vY29yZS9tb2RlbHMvbWFuaWZlc3QnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtaW1lLXZpZXdlci1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdmlld2VyLWhlYWRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3ZpZXdlci1oZWFkZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignaGVhZGVyU3RhdGUnLCBbXG4gICAgICBzdGF0ZShcbiAgICAgICAgJ2hpZGUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDAsIC0xMDAlKScsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgICdzaG93JyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwcHgsIDBweCknLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdoaWRlID0+IHNob3cnLFxuICAgICAgICBhbmltYXRlKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMudG9vbGJhcnNFYXNlSW5UaW1lICsgJ21zIGVhc2UtaW4nKVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdzaG93ID0+IGhpZGUnLFxuICAgICAgICBhbmltYXRlKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMudG9vbGJhcnNFYXNlT3V0VGltZSArICdtcyBlYXNlLW91dCcpXG4gICAgICApLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBWaWV3ZXJIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ21pbWVIZWFkZXJCZWZvcmUnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBtaW1lSGVhZGVyQmVmb3JlITogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnbWltZUhlYWRlckFmdGVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgbWltZUhlYWRlckFmdGVyITogVmlld0NvbnRhaW5lclJlZjtcbiAgcHVibGljIG1hbmlmZXN0OiBNYW5pZmVzdCB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgc3RhdGUgPSAnaGlkZSc7XG4gIGlzQ29udGVudFNlYXJjaEVuYWJsZWQgPSBmYWxzZTtcbiAgaXNGdWxsc2NyZWVuRW5hYmxlZCA9IGZhbHNlO1xuICBpc0luRnVsbHNjcmVlbiA9IGZhbHNlO1xuICBmdWxsc2NyZWVuTGFiZWwgPSB0aGlzLmludGwuZnVsbFNjcmVlbkxhYmVsO1xuICBpc1BhZ2VkTWFuaWZlc3QgPSBmYWxzZTtcbiAgaGFzUmVjb2duaXplZFRleHRDb250ZW50ID0gZmFsc2U7XG4gIHZpZXdlckxheW91dDogVmlld2VyTGF5b3V0ID0gVmlld2VyTGF5b3V0Lk9ORV9QQUdFO1xuXG4gIFZpZXdlckxheW91dDogdHlwZW9mIFZpZXdlckxheW91dCA9IFZpZXdlckxheW91dDsgLy8gZW5hYmxlcyBwYXJzaW5nIG9mIGVudW0gaW4gdGVtcGxhdGVcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpbnRsOiBNaW1lVmlld2VySW50bCxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGNvbnRlbnRzRGlhbG9nU2VydmljZTogQ29udGVudHNEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2U6IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgaGVscERpYWxvZ1NlcnZpY2U6IEhlbHBEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZk1hbmlmZXN0U2VydmljZTogSWlpZk1hbmlmZXN0U2VydmljZSxcbiAgICBwcml2YXRlIGZ1bGxzY3JlZW5TZXJ2aWNlOiBGdWxsc2NyZWVuU2VydmljZSxcbiAgICBwcml2YXRlIG1pbWVEb21IZWxwZXI6IE1pbWVEb21IZWxwZXIsXG4gICAgcHJpdmF0ZSB2aWV3ZXJMYXlvdXRTZXJ2aWNlOiBWaWV3ZXJMYXlvdXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgYWx0b1NlcnZpY2U6IEFsdG9TZXJ2aWNlLFxuICAgIGVsOiBFbGVtZW50UmVmXG4gICkge1xuICAgIGNvbnRlbnRzRGlhbG9nU2VydmljZS5lbCA9IGVsO1xuICAgIGNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmVsID0gZWw7XG4gICAgaGVscERpYWxvZ1NlcnZpY2UuZWwgPSBlbDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnQGhlYWRlclN0YXRlJylcbiAgZ2V0IGhlYWRlclN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pc0Z1bGxzY3JlZW5FbmFibGVkID0gdGhpcy5mdWxsc2NyZWVuU2VydmljZS5pc0VuYWJsZWQoKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmludGwuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuZnVsbHNjcmVlblNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pc0luRnVsbHNjcmVlbiA9IHRoaXMuZnVsbHNjcmVlblNlcnZpY2UuaXNGdWxsc2NyZWVuKCk7XG4gICAgICAgIHRoaXMuZnVsbHNjcmVlbkxhYmVsID0gdGhpcy5pc0luRnVsbHNjcmVlblxuICAgICAgICAgID8gdGhpcy5pbnRsLmV4aXRGdWxsU2NyZWVuTGFiZWxcbiAgICAgICAgICA6IHRoaXMuaW50bC5mdWxsU2NyZWVuTGFiZWw7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5jdXJyZW50TWFuaWZlc3Quc3Vic2NyaWJlKFxuICAgICAgICAobWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCkgPT4ge1xuICAgICAgICAgIHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgICB0aGlzLmlzQ29udGVudFNlYXJjaEVuYWJsZWQgPVxuICAgICAgICAgICAgbWFuaWZlc3QgJiYgbWFuaWZlc3Quc2VydmljZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICB0aGlzLmlzUGFnZWRNYW5pZmVzdCA9IG1hbmlmZXN0XG4gICAgICAgICAgICA/IE1hbmlmZXN0VXRpbHMuaXNNYW5pZmVzdFBhZ2VkKG1hbmlmZXN0KVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgICB0aGlzLmhhc1JlY29nbml6ZWRUZXh0Q29udGVudCA9IG1hbmlmZXN0ID8gTWFuaWZlc3RVdGlscy5oYXNSZWNvZ25pemVkVGV4dENvbnRlbnQobWFuaWZlc3QpIDogZmFsc2U7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgICh2aWV3ZXJMYXlvdXQ6IFZpZXdlckxheW91dCkgPT4ge1xuICAgICAgICAgIHRoaXMudmlld2VyTGF5b3V0ID0gdmlld2VyTGF5b3V0O1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgdG9nZ2xlUmVjb2duaXplZFRleHRDb250ZW50KCk6IHZvaWQge1xuICAgIHRoaXMuYWx0b1NlcnZpY2UudG9nZ2xlKCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlQ29udGVudHMoKSB7XG4gICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgIHRoaXMuaGVscERpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICB0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS50b2dnbGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVTZWFyY2goKSB7XG4gICAgdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS50b2dnbGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVIZWxwKCkge1xuICAgIHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgIHRoaXMuaGVscERpYWxvZ1NlcnZpY2UudG9nZ2xlKCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlRnVsbHNjcmVlbigpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5taW1lRG9tSGVscGVyLnRvZ2dsZUZ1bGxzY3JlZW4oKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0luRnVsbFNjcmVlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5mdWxsc2NyZWVuU2VydmljZS5pc0Z1bGxzY3JlZW4oKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVWaWV3ZXJMYXlvdXQoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLnRvZ2dsZSgpO1xuICB9XG5cbiAgcHVibGljIHNldExheW91dE9uZVBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLnNldExheW91dChWaWV3ZXJMYXlvdXQuT05FX1BBR0UpO1xuICB9XG5cbiAgcHVibGljIHNldExheW91dFR3b1BhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLnNldExheW91dChWaWV3ZXJMYXlvdXQuVFdPX1BBR0UpO1xuICB9XG59XG4iXX0=