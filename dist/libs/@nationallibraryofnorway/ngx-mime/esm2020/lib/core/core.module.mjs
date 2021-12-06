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
import * as i0 from "@angular/core";
export class CoreModule {
}
CoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: CoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: CoreModule });
CoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: CoreModule, providers: [
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
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: CoreModule, decorators: [{
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
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sa0ZBQWtGLENBQUM7QUFDbEksT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBcUJoRSxNQUFNLE9BQU8sVUFBVTs7dUdBQVYsVUFBVTt3R0FBVixVQUFVO3dHQUFWLFVBQVUsYUFsQlY7UUFDVCxjQUFjO1FBQ2QsbUJBQW1CO1FBQ25CLHdCQUF3QjtRQUN4QixpQkFBaUI7UUFDakIsaUJBQWlCO1FBQ2pCLGFBQWE7UUFDYixZQUFZO1FBQ1osYUFBYTtRQUNiLFdBQVc7UUFDWCxjQUFjO1FBQ2QsaUJBQWlCO1FBQ2pCLG1CQUFtQjtRQUNuQiw4QkFBOEI7UUFDOUIsWUFBWTtRQUNaLFdBQVc7S0FDWjsyRkFFVSxVQUFVO2tCQW5CdEIsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1QsY0FBYzt3QkFDZCxtQkFBbUI7d0JBQ25CLHdCQUF3Qjt3QkFDeEIsaUJBQWlCO3dCQUNqQixpQkFBaUI7d0JBQ2pCLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLG1CQUFtQjt3QkFDbkIsOEJBQThCO3dCQUM5QixZQUFZO3dCQUNaLFdBQVc7cUJBQ1o7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWNjZXNzS2V5c1NlcnZpY2UgfSBmcm9tICcuL2FjY2Vzcy1rZXlzLWhhbmRsZXItc2VydmljZS9hY2Nlc3Mta2V5cy5zZXJ2aWNlJztcbmltcG9ydCB7IEFsdG9TZXJ2aWNlIH0gZnJvbSAnLi9hbHRvLXNlcnZpY2UvYWx0by5zZXJ2aWNlJztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuL2NhbnZhcy1zZXJ2aWNlL2NhbnZhcy1zZXJ2aWNlJztcbmltcG9ydCB7IENsaWNrU2VydmljZSB9IGZyb20gJy4vY2xpY2stc2VydmljZS9jbGljay5zZXJ2aWNlJztcbmltcG9ydCB7IEZ1bGxzY3JlZW5TZXJ2aWNlIH0gZnJvbSAnLi9mdWxsc2NyZWVuLXNlcnZpY2UvZnVsbHNjcmVlbi5zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZDb250ZW50U2VhcmNoU2VydmljZSB9IGZyb20gJy4vaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi9pbnRsL3ZpZXdlci1pbnRsJztcbmltcG9ydCB7IE1pbWVSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi9taW1lLXJlc2l6ZS1zZXJ2aWNlL21pbWUtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kZVNlcnZpY2UgfSBmcm9tICcuL21vZGUtc2VydmljZS9tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL2NvbnRlbnQtc2VhcmNoLW5hdmlnYXRpb24tc2VydmljZS9jb250ZW50LXNlYXJjaC1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Bpbm5lclNlcnZpY2UgfSBmcm9tICcuL3NwaW5uZXItc2VydmljZS9zcGlubmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi9zdHlsZS1zZXJ2aWNlL3N0eWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0U2VydmljZSB9IGZyb20gJy4vdmlld2VyLWxheW91dC1zZXJ2aWNlL3ZpZXdlci1sYXlvdXQtc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIE1pbWVWaWV3ZXJJbnRsLFxuICAgIElpaWZNYW5pZmVzdFNlcnZpY2UsXG4gICAgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLFxuICAgIE1pbWVSZXNpemVTZXJ2aWNlLFxuICAgIEZ1bGxzY3JlZW5TZXJ2aWNlLFxuICAgIFZpZXdlclNlcnZpY2UsXG4gICAgQ2xpY2tTZXJ2aWNlLFxuICAgIENhbnZhc1NlcnZpY2UsXG4gICAgTW9kZVNlcnZpY2UsXG4gICAgU3Bpbm5lclNlcnZpY2UsXG4gICAgQWNjZXNzS2V5c1NlcnZpY2UsXG4gICAgVmlld2VyTGF5b3V0U2VydmljZSxcbiAgICBDb250ZW50U2VhcmNoTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgU3R5bGVTZXJ2aWNlLFxuICAgIEFsdG9TZXJ2aWNlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb3JlTW9kdWxlIHt9XG4iXX0=