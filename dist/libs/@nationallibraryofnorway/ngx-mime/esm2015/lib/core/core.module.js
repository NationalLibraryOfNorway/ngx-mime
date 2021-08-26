import { NgModule } from '@angular/core';
import { AccessKeysService } from './access-keys-handler-service/access-keys.service';
import { AltoService } from './alto-service/alto.service';
import { CanvasService } from './canvas-service/canvas-service';
import { ClickService } from './click-service/click.service';
import { FullscreenService } from './fullscreen-service/fullscreen.service';
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
export class CoreModule {
}
CoreModule.decorators = [
    { type: NgModule, args: [{
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
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sa0ZBQWtGLENBQUM7QUFDbEksT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFxQmhFLE1BQU0sT0FBTyxVQUFVOzs7WUFuQnRCLFFBQVEsU0FBQztnQkFDUixTQUFTLEVBQUU7b0JBQ1QsY0FBYztvQkFDZCxtQkFBbUI7b0JBQ25CLHdCQUF3QjtvQkFDeEIsaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixhQUFhO29CQUNiLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxpQkFBaUI7b0JBQ2pCLG1CQUFtQjtvQkFDbkIsOEJBQThCO29CQUM5QixZQUFZO29CQUNaLFdBQVc7aUJBQ1o7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY2Nlc3NLZXlzU2VydmljZSB9IGZyb20gJy4vYWNjZXNzLWtleXMtaGFuZGxlci1zZXJ2aWNlL2FjY2Vzcy1rZXlzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWx0b1NlcnZpY2UgfSBmcm9tICcuL2FsdG8tc2VydmljZS9hbHRvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FudmFzU2VydmljZSB9IGZyb20gJy4vY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpY2tTZXJ2aWNlIH0gZnJvbSAnLi9jbGljay1zZXJ2aWNlL2NsaWNrLnNlcnZpY2UnO1xuaW1wb3J0IHsgRnVsbHNjcmVlblNlcnZpY2UgfSBmcm9tICcuL2Z1bGxzY3JlZW4tc2VydmljZS9mdWxsc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi9paWlmLWNvbnRlbnQtc2VhcmNoLXNlcnZpY2UvaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZNYW5pZmVzdFNlcnZpY2UgfSBmcm9tICcuL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuL2ludGwvdmlld2VyLWludGwnO1xuaW1wb3J0IHsgTWltZVJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuL21pbWUtcmVzaXplLXNlcnZpY2UvbWltZS1yZXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBNb2RlU2VydmljZSB9IGZyb20gJy4vbW9kZS1zZXJ2aWNlL21vZGUuc2VydmljZSc7XG5pbXBvcnQgeyBDb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL25hdmlnYXRpb24vY29udGVudC1zZWFyY2gtbmF2aWdhdGlvbi1zZXJ2aWNlL2NvbnRlbnQtc2VhcmNoLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBTcGlubmVyU2VydmljZSB9IGZyb20gJy4vc3Bpbm5lci1zZXJ2aWNlL3NwaW5uZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuL3N0eWxlLXNlcnZpY2Uvc3R5bGUuc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi92aWV3ZXItbGF5b3V0LXNlcnZpY2Uvdmlld2VyLWxheW91dC1zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdlclNlcnZpY2UgfSBmcm9tICcuL3ZpZXdlci1zZXJ2aWNlL3ZpZXdlci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgTWltZVZpZXdlckludGwsXG4gICAgSWlpZk1hbmlmZXN0U2VydmljZSxcbiAgICBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UsXG4gICAgTWltZVJlc2l6ZVNlcnZpY2UsXG4gICAgRnVsbHNjcmVlblNlcnZpY2UsXG4gICAgVmlld2VyU2VydmljZSxcbiAgICBDbGlja1NlcnZpY2UsXG4gICAgQ2FudmFzU2VydmljZSxcbiAgICBNb2RlU2VydmljZSxcbiAgICBTcGlubmVyU2VydmljZSxcbiAgICBBY2Nlc3NLZXlzU2VydmljZSxcbiAgICBWaWV3ZXJMYXlvdXRTZXJ2aWNlLFxuICAgIENvbnRlbnRTZWFyY2hOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBTdHlsZVNlcnZpY2UsXG4gICAgQWx0b1NlcnZpY2UsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvcmVNb2R1bGUge31cbiJdfQ==