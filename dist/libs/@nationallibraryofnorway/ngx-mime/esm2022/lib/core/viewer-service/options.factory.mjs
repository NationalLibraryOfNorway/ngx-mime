import * as OpenSeadragon from 'openseadragon';
import { ViewerOptions } from '../models/viewer-options';
import { getDrawerType } from './drawer-utils';
export class OptionsFactory {
    static create(id, mimeViewerConfig) {
        let options = OpenSeadragon.DEFAULT_SETTINGS;
        return {
            ...options,
            id: id,
            panVertical: true,
            drawer: getDrawerType(),
            minZoomImageRatio: 1,
            maxZoomPixelRatio: 5,
            smoothTileEdgesMinZoom: 1,
            preserveImageSizeOnResize: true,
            visibilityRatio: 0,
            showNavigationControl: false,
            animationTime: ViewerOptions.transitions.OSDAnimationTime / 1000,
            ajaxWithCredentials: mimeViewerConfig.withCredentials,
            loadTilesWithAjax: mimeViewerConfig.loadTilesWithAjax,
            crossOriginPolicy: mimeViewerConfig.crossOriginPolicy,
            ajaxHeaders: mimeViewerConfig.ajaxHeaders,
            gestureSettingsMouse: {
                ...options.gestureSettingsMouse,
                scrollToZoom: false,
                clickToZoom: false,
            },
            gestureSettingsTouch: {
                ...options.gestureSettingsTouch,
                dblClickToZoom: false,
                pinchToZoom: false,
                flickEnabled: false,
            },
            gestureSettingsPen: {
                ...options.gestureSettingsPen,
                clickToZoom: false,
            },
            gestureSettingsUnknown: {
                ...options.gestureSettingsUnknown,
                scrollToZoom: false,
                dblClickToZoom: false,
                pinchToZoom: false,
                flickEnabled: false,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvdmlld2VyLXNlcnZpY2Uvb3B0aW9ucy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsTUFBTSxPQUFPLGNBQWM7SUFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FDbEIsRUFBVSxFQUNWLGdCQUFrQztRQUVsQyxJQUFJLE9BQU8sR0FBMEIsYUFBYSxDQUFDLGdCQUFnQixDQUFDO1FBRXBFLE9BQVk7WUFDVixHQUFHLE9BQU87WUFDVixFQUFFLEVBQUUsRUFBRTtZQUNOLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE1BQU0sRUFBRSxhQUFhLEVBQUU7WUFDdkIsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQixpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLHNCQUFzQixFQUFFLENBQUM7WUFDekIseUJBQXlCLEVBQUUsSUFBSTtZQUMvQixlQUFlLEVBQUUsQ0FBQztZQUNsQixxQkFBcUIsRUFBRSxLQUFLO1lBQzVCLGFBQWEsRUFBRSxhQUFhLENBQUMsV0FBVyxDQUFDLGdCQUFnQixHQUFHLElBQUk7WUFDaEUsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsZUFBZTtZQUNyRCxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxpQkFBaUI7WUFDckQsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUMsaUJBQWlCO1lBQ3JELFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXO1lBQ3pDLG9CQUFvQixFQUFFO2dCQUNwQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0I7Z0JBQy9CLFlBQVksRUFBRSxLQUFLO2dCQUNuQixXQUFXLEVBQUUsS0FBSzthQUNuQjtZQUNELG9CQUFvQixFQUFFO2dCQUNwQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0I7Z0JBQy9CLGNBQWMsRUFBRSxLQUFLO2dCQUNyQixXQUFXLEVBQUUsS0FBSztnQkFDbEIsWUFBWSxFQUFFLEtBQUs7YUFDcEI7WUFDRCxrQkFBa0IsRUFBRTtnQkFDbEIsR0FBRyxPQUFPLENBQUMsa0JBQWtCO2dCQUM3QixXQUFXLEVBQUUsS0FBSzthQUNuQjtZQUNELHNCQUFzQixFQUFFO2dCQUN0QixHQUFHLE9BQU8sQ0FBQyxzQkFBc0I7Z0JBQ2pDLFlBQVksRUFBRSxLQUFLO2dCQUNuQixjQUFjLEVBQUUsS0FBSztnQkFDckIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFlBQVksRUFBRSxLQUFLO2FBQ3BCO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE9wZW5TZWFkcmFnb24gZnJvbSAnb3BlbnNlYWRyYWdvbic7XG5pbXBvcnQgeyBNaW1lVmlld2VyQ29uZmlnIH0gZnJvbSAnLi4vbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7IFZpZXdlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvdmlld2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgZ2V0RHJhd2VyVHlwZSB9IGZyb20gJy4vZHJhd2VyLXV0aWxzJztcblxuZXhwb3J0IGNsYXNzIE9wdGlvbnNGYWN0b3J5IHtcbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoXG4gICAgaWQ6IHN0cmluZyxcbiAgICBtaW1lVmlld2VyQ29uZmlnOiBNaW1lVmlld2VyQ29uZmlnLFxuICApOiBPcGVuU2VhZHJhZ29uLk9wdGlvbnMge1xuICAgIGxldCBvcHRpb25zOiBPcGVuU2VhZHJhZ29uLk9wdGlvbnMgPSBPcGVuU2VhZHJhZ29uLkRFRkFVTFRfU0VUVElOR1M7XG5cbiAgICByZXR1cm4gPGFueT57XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgaWQ6IGlkLFxuICAgICAgcGFuVmVydGljYWw6IHRydWUsXG4gICAgICBkcmF3ZXI6IGdldERyYXdlclR5cGUoKSxcbiAgICAgIG1pblpvb21JbWFnZVJhdGlvOiAxLFxuICAgICAgbWF4Wm9vbVBpeGVsUmF0aW86IDUsXG4gICAgICBzbW9vdGhUaWxlRWRnZXNNaW5ab29tOiAxLFxuICAgICAgcHJlc2VydmVJbWFnZVNpemVPblJlc2l6ZTogdHJ1ZSxcbiAgICAgIHZpc2liaWxpdHlSYXRpbzogMCxcbiAgICAgIHNob3dOYXZpZ2F0aW9uQ29udHJvbDogZmFsc2UsXG4gICAgICBhbmltYXRpb25UaW1lOiBWaWV3ZXJPcHRpb25zLnRyYW5zaXRpb25zLk9TREFuaW1hdGlvblRpbWUgLyAxMDAwLFxuICAgICAgYWpheFdpdGhDcmVkZW50aWFsczogbWltZVZpZXdlckNvbmZpZy53aXRoQ3JlZGVudGlhbHMsXG4gICAgICBsb2FkVGlsZXNXaXRoQWpheDogbWltZVZpZXdlckNvbmZpZy5sb2FkVGlsZXNXaXRoQWpheCxcbiAgICAgIGNyb3NzT3JpZ2luUG9saWN5OiBtaW1lVmlld2VyQ29uZmlnLmNyb3NzT3JpZ2luUG9saWN5LFxuICAgICAgYWpheEhlYWRlcnM6IG1pbWVWaWV3ZXJDb25maWcuYWpheEhlYWRlcnMsXG4gICAgICBnZXN0dXJlU2V0dGluZ3NNb3VzZToge1xuICAgICAgICAuLi5vcHRpb25zLmdlc3R1cmVTZXR0aW5nc01vdXNlLFxuICAgICAgICBzY3JvbGxUb1pvb206IGZhbHNlLFxuICAgICAgICBjbGlja1RvWm9vbTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZ2VzdHVyZVNldHRpbmdzVG91Y2g6IHtcbiAgICAgICAgLi4ub3B0aW9ucy5nZXN0dXJlU2V0dGluZ3NUb3VjaCxcbiAgICAgICAgZGJsQ2xpY2tUb1pvb206IGZhbHNlLFxuICAgICAgICBwaW5jaFRvWm9vbTogZmFsc2UsXG4gICAgICAgIGZsaWNrRW5hYmxlZDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZ2VzdHVyZVNldHRpbmdzUGVuOiB7XG4gICAgICAgIC4uLm9wdGlvbnMuZ2VzdHVyZVNldHRpbmdzUGVuLFxuICAgICAgICBjbGlja1RvWm9vbTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZ2VzdHVyZVNldHRpbmdzVW5rbm93bjoge1xuICAgICAgICAuLi5vcHRpb25zLmdlc3R1cmVTZXR0aW5nc1Vua25vd24sXG4gICAgICAgIHNjcm9sbFRvWm9vbTogZmFsc2UsXG4gICAgICAgIGRibENsaWNrVG9ab29tOiBmYWxzZSxcbiAgICAgICAgcGluY2hUb1pvb206IGZhbHNlLFxuICAgICAgICBmbGlja0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG59XG4iXX0=