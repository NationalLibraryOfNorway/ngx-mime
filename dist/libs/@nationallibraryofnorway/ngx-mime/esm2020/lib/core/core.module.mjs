import { NgModule } from '@angular/core';
import { ViewDialogModule } from '../view-dialog/view-dialog.module';
import { AccessKeysService } from './access-keys-handler-service/access-keys.service';
import { AltoService } from './alto-service/alto.service';
import { CanvasService } from './canvas-service/canvas-service';
import { ClickService } from './click-service/click.service';
import { FullscreenService } from './fullscreen-service/fullscreen.service';
import { HighlightService } from './highlight-service/highlight.service';
import { IiifContentSearchService } from './iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from './iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './intl/viewer-intl';
import { MimeResizeService } from './mime-resize-service/mime-resize.service';
import { ModeService } from './mode-service/mode.service';
import { ContentSearchNavigationService } from './navigation/content-search-navigation-service/content-search-navigation.service';
import { SpinnerService } from './spinner-service/spinner.service';
import { StyleService } from './style-service/style.service';
import { ViewerLayoutService } from './viewer-layout-service/viewer-layout-service';
import { ViewerService } from './viewer-service/viewer.service';
import * as i0 from "@angular/core";
export class CoreModule {
}
CoreModule.ɵfac = function CoreModule_Factory(t) { return new (t || CoreModule)(); };
CoreModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: CoreModule });
CoreModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        MimeViewerIntl,
        IiifManifestService,
        IiifContentSearchService,
        MimeResizeService,
        FullscreenService,
        ViewerService,
        ClickService,
        CanvasService,
        ModeService,
        SpinnerService,
        AccessKeysService,
        ViewerLayoutService,
        ContentSearchNavigationService,
        StyleService,
        AltoService,
        ViewDialogModule,
        HighlightService,
    ] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CoreModule, [{
        type: NgModule,
        args: [{
                providers: [
                    MimeViewerIntl,
                    IiifManifestService,
                    IiifContentSearchService,
                    MimeResizeService,
                    FullscreenService,
                    ViewerService,
                    ClickService,
                    CanvasService,
                    ModeService,
                    SpinnerService,
                    AccessKeysService,
                    ViewerLayoutService,
                    ContentSearchNavigationService,
                    StyleService,
                    AltoService,
                    ViewDialogModule,
                    HighlightService,
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sa0ZBQWtGLENBQUM7QUFDbEksT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBdUJoRSxNQUFNLE9BQU8sVUFBVTs7b0VBQVYsVUFBVTs0REFBVixVQUFVO2lFQXBCVjtRQUNULGNBQWM7UUFDZCxtQkFBbUI7UUFDbkIsd0JBQXdCO1FBQ3hCLGlCQUFpQjtRQUNqQixpQkFBaUI7UUFDakIsYUFBYTtRQUNiLFlBQVk7UUFDWixhQUFhO1FBQ2IsV0FBVztRQUNYLGNBQWM7UUFDZCxpQkFBaUI7UUFDakIsbUJBQW1CO1FBQ25CLDhCQUE4QjtRQUM5QixZQUFZO1FBQ1osV0FBVztRQUNYLGdCQUFnQjtRQUNoQixnQkFBZ0I7S0FDakI7dUZBRVUsVUFBVTtjQXJCdEIsUUFBUTtlQUFDO2dCQUNSLFNBQVMsRUFBRTtvQkFDVCxjQUFjO29CQUNkLG1CQUFtQjtvQkFDbkIsd0JBQXdCO29CQUN4QixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFDakIsYUFBYTtvQkFDYixZQUFZO29CQUNaLGFBQWE7b0JBQ2IsV0FBVztvQkFDWCxjQUFjO29CQUNkLGlCQUFpQjtvQkFDakIsbUJBQW1CO29CQUNuQiw4QkFBOEI7b0JBQzlCLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtpQkFDakI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWaWV3RGlhbG9nTW9kdWxlIH0gZnJvbSAnLi4vdmlldy1kaWFsb2cvdmlldy1kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IEFjY2Vzc0tleXNTZXJ2aWNlIH0gZnJvbSAnLi9hY2Nlc3Mta2V5cy1oYW5kbGVyLXNlcnZpY2UvYWNjZXNzLWtleXMuc2VydmljZSc7XG5pbXBvcnQgeyBBbHRvU2VydmljZSB9IGZyb20gJy4vYWx0by1zZXJ2aWNlL2FsdG8uc2VydmljZSc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBDbGlja1NlcnZpY2UgfSBmcm9tICcuL2NsaWNrLXNlcnZpY2UvY2xpY2suc2VydmljZSc7XG5pbXBvcnQgeyBGdWxsc2NyZWVuU2VydmljZSB9IGZyb20gJy4vZnVsbHNjcmVlbi1zZXJ2aWNlL2Z1bGxzY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBIaWdobGlnaHRTZXJ2aWNlIH0gZnJvbSAnLi9oaWdobGlnaHQtc2VydmljZS9oaWdobGlnaHQuc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuL2lpaWYtY29udGVudC1zZWFyY2gtc2VydmljZS9paWlmLWNvbnRlbnQtc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZk1hbmlmZXN0U2VydmljZSB9IGZyb20gJy4vaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3Qtc2VydmljZSc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4vaW50bC92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBNaW1lUmVzaXplU2VydmljZSB9IGZyb20gJy4vbWltZS1yZXNpemUtc2VydmljZS9taW1lLXJlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1vZGVTZXJ2aWNlIH0gZnJvbSAnLi9tb2RlLXNlcnZpY2UvbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vbmF2aWdhdGlvbi9jb250ZW50LXNlYXJjaC1uYXZpZ2F0aW9uLXNlcnZpY2UvY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFNwaW5uZXJTZXJ2aWNlIH0gZnJvbSAnLi9zcGlubmVyLXNlcnZpY2Uvc3Bpbm5lci5zZXJ2aWNlJztcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4vc3R5bGUtc2VydmljZS9zdHlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdlckxheW91dFNlcnZpY2UgfSBmcm9tICcuL3ZpZXdlci1sYXlvdXQtc2VydmljZS92aWV3ZXItbGF5b3V0LXNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2VyU2VydmljZSB9IGZyb20gJy4vdmlld2VyLXNlcnZpY2Uvdmlld2VyLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBNaW1lVmlld2VySW50bCxcbiAgICBJaWlmTWFuaWZlc3RTZXJ2aWNlLFxuICAgIElpaWZDb250ZW50U2VhcmNoU2VydmljZSxcbiAgICBNaW1lUmVzaXplU2VydmljZSxcbiAgICBGdWxsc2NyZWVuU2VydmljZSxcbiAgICBWaWV3ZXJTZXJ2aWNlLFxuICAgIENsaWNrU2VydmljZSxcbiAgICBDYW52YXNTZXJ2aWNlLFxuICAgIE1vZGVTZXJ2aWNlLFxuICAgIFNwaW5uZXJTZXJ2aWNlLFxuICAgIEFjY2Vzc0tleXNTZXJ2aWNlLFxuICAgIFZpZXdlckxheW91dFNlcnZpY2UsXG4gICAgQ29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIFN0eWxlU2VydmljZSxcbiAgICBBbHRvU2VydmljZSxcbiAgICBWaWV3RGlhbG9nTW9kdWxlLFxuICAgIEhpZ2hsaWdodFNlcnZpY2UsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvcmVNb2R1bGUge31cbiJdfQ==