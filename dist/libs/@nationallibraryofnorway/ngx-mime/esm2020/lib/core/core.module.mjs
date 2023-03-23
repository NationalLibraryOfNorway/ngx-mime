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
CoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: CoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.1.2", ngImport: i0, type: CoreModule });
CoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: CoreModule, providers: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: CoreModule, decorators: [{
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
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sa0ZBQWtGLENBQUM7QUFDbEksT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBdUJoRSxNQUFNLE9BQU8sVUFBVTs7dUdBQVYsVUFBVTt3R0FBVixVQUFVO3dHQUFWLFVBQVUsYUFwQlY7UUFDVCxjQUFjO1FBQ2QsbUJBQW1CO1FBQ25CLHdCQUF3QjtRQUN4QixpQkFBaUI7UUFDakIsaUJBQWlCO1FBQ2pCLGFBQWE7UUFDYixZQUFZO1FBQ1osYUFBYTtRQUNiLFdBQVc7UUFDWCxjQUFjO1FBQ2QsaUJBQWlCO1FBQ2pCLG1CQUFtQjtRQUNuQiw4QkFBOEI7UUFDOUIsWUFBWTtRQUNaLFdBQVc7UUFDWCxnQkFBZ0I7UUFDaEIsZ0JBQWdCO0tBQ2pCOzJGQUVVLFVBQVU7a0JBckJ0QixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVCxjQUFjO3dCQUNkLG1CQUFtQjt3QkFDbkIsd0JBQXdCO3dCQUN4QixpQkFBaUI7d0JBQ2pCLGlCQUFpQjt3QkFDakIsYUFBYTt3QkFDYixZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsV0FBVzt3QkFDWCxjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsbUJBQW1CO3dCQUNuQiw4QkFBOEI7d0JBQzlCLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxnQkFBZ0I7d0JBQ2hCLGdCQUFnQjtxQkFDakI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlld0RpYWxvZ01vZHVsZSB9IGZyb20gJy4uL3ZpZXctZGlhbG9nL3ZpZXctZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQgeyBBY2Nlc3NLZXlzU2VydmljZSB9IGZyb20gJy4vYWNjZXNzLWtleXMtaGFuZGxlci1zZXJ2aWNlL2FjY2Vzcy1rZXlzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWx0b1NlcnZpY2UgfSBmcm9tICcuL2FsdG8tc2VydmljZS9hbHRvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FudmFzU2VydmljZSB9IGZyb20gJy4vY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpY2tTZXJ2aWNlIH0gZnJvbSAnLi9jbGljay1zZXJ2aWNlL2NsaWNrLnNlcnZpY2UnO1xuaW1wb3J0IHsgRnVsbHNjcmVlblNlcnZpY2UgfSBmcm9tICcuL2Z1bGxzY3JlZW4tc2VydmljZS9mdWxsc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGlnaGxpZ2h0U2VydmljZSB9IGZyb20gJy4vaGlnaGxpZ2h0LXNlcnZpY2UvaGlnaGxpZ2h0LnNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi9paWlmLWNvbnRlbnQtc2VhcmNoLXNlcnZpY2UvaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZNYW5pZmVzdFNlcnZpY2UgfSBmcm9tICcuL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuL2ludGwvdmlld2VyLWludGwnO1xuaW1wb3J0IHsgTWltZVJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuL21pbWUtcmVzaXplLXNlcnZpY2UvbWltZS1yZXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBNb2RlU2VydmljZSB9IGZyb20gJy4vbW9kZS1zZXJ2aWNlL21vZGUuc2VydmljZSc7XG5pbXBvcnQgeyBDb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL25hdmlnYXRpb24vY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi1zZXJ2aWNlL2NvbnRlbnQtc2VhcmNoLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBTcGlubmVyU2VydmljZSB9IGZyb20gJy4vc3Bpbm5lci1zZXJ2aWNlL3NwaW5uZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuL3N0eWxlLXNlcnZpY2Uvc3R5bGUuc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi92aWV3ZXItbGF5b3V0LXNlcnZpY2Uvdmlld2VyLWxheW91dC1zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdlclNlcnZpY2UgfSBmcm9tICcuL3ZpZXdlci1zZXJ2aWNlL3ZpZXdlci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgTWltZVZpZXdlckludGwsXG4gICAgSWlpZk1hbmlmZXN0U2VydmljZSxcbiAgICBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UsXG4gICAgTWltZVJlc2l6ZVNlcnZpY2UsXG4gICAgRnVsbHNjcmVlblNlcnZpY2UsXG4gICAgVmlld2VyU2VydmljZSxcbiAgICBDbGlja1NlcnZpY2UsXG4gICAgQ2FudmFzU2VydmljZSxcbiAgICBNb2RlU2VydmljZSxcbiAgICBTcGlubmVyU2VydmljZSxcbiAgICBBY2Nlc3NLZXlzU2VydmljZSxcbiAgICBWaWV3ZXJMYXlvdXRTZXJ2aWNlLFxuICAgIENvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBTdHlsZVNlcnZpY2UsXG4gICAgQWx0b1NlcnZpY2UsXG4gICAgVmlld0RpYWxvZ01vZHVsZSxcbiAgICBIaWdobGlnaHRTZXJ2aWNlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb3JlTW9kdWxlIHt9XG4iXX0=