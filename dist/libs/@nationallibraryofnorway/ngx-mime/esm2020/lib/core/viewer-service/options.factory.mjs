import * as OpenSeadragon from 'openseadragon';
import { ViewerOptions } from '../models/viewer-options';
export class OptionsFactory {
    static create(mimeViewerConfig) {
        let options = OpenSeadragon.DEFAULT_SETTINGS;
        return {
            ...options,
            id: 'openseadragon',
            useCanvas: this.canUseCanvas(),
            panVertical: true,
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
    static canUseCanvas() {
        const isHandheldIOS = /iPad|iPhone|iPod/.test(navigator.platform ?? '') ||
            (navigator.platform === 'MacIntel' &&
                typeof navigator.standalone !== 'undefined');
        return !isHandheldIOS;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvdmlld2VyLXNlcnZpY2Uvb3B0aW9ucy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RCxNQUFNLE9BQU8sY0FBYztJQUNsQixNQUFNLENBQUMsTUFBTSxDQUNsQixnQkFBa0M7UUFFbEMsSUFBSSxPQUFPLEdBQTBCLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztRQUVwRSxPQUFPO1lBQ0wsR0FBRyxPQUFPO1lBQ1YsRUFBRSxFQUFFLGVBQWU7WUFDbkIsU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDOUIsV0FBVyxFQUFFLElBQUk7WUFDakIsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQixpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLHNCQUFzQixFQUFFLENBQUM7WUFDekIseUJBQXlCLEVBQUUsSUFBSTtZQUMvQixlQUFlLEVBQUUsQ0FBQztZQUNsQixxQkFBcUIsRUFBRSxLQUFLO1lBQzVCLGFBQWEsRUFBRSxhQUFhLENBQUMsV0FBVyxDQUFDLGdCQUFnQixHQUFHLElBQUk7WUFDaEUsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsZUFBZTtZQUNyRCxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxpQkFBaUI7WUFDckQsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUMsaUJBQWlCO1lBQ3JELFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXO1lBQ3pDLG9CQUFvQixFQUFFO2dCQUNwQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0I7Z0JBQy9CLFlBQVksRUFBRSxLQUFLO2dCQUNuQixXQUFXLEVBQUUsS0FBSzthQUNuQjtZQUNELG9CQUFvQixFQUFFO2dCQUNwQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0I7Z0JBQy9CLGNBQWMsRUFBRSxLQUFLO2dCQUNyQixXQUFXLEVBQUUsS0FBSztnQkFDbEIsWUFBWSxFQUFFLEtBQUs7YUFDcEI7WUFDRCxrQkFBa0IsRUFBRTtnQkFDbEIsR0FBRyxPQUFPLENBQUMsa0JBQWtCO2dCQUM3QixXQUFXLEVBQUUsS0FBSzthQUNuQjtZQUNELHNCQUFzQixFQUFFO2dCQUN0QixHQUFHLE9BQU8sQ0FBQyxzQkFBc0I7Z0JBQ2pDLFlBQVksRUFBRSxLQUFLO2dCQUNuQixjQUFjLEVBQUUsS0FBSztnQkFDckIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFlBQVksRUFBRSxLQUFLO2FBQ3BCO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTyxNQUFNLENBQUMsWUFBWTtRQUN6QixNQUFNLGFBQWEsR0FDakIsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1lBQ2pELENBQUMsU0FBUyxDQUFDLFFBQVEsS0FBSyxVQUFVO2dCQUNoQyxPQUFRLFNBQWlCLENBQUMsVUFBVSxLQUFLLFdBQVcsQ0FBQyxDQUFDO1FBRTFELE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDeEIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgT3BlblNlYWRyYWdvbiBmcm9tICdvcGVuc2VhZHJhZ29uJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJDb25maWcgfSBmcm9tICcuLi9taW1lLXZpZXdlci1jb25maWcnO1xuaW1wb3J0IHsgVmlld2VyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItb3B0aW9ucyc7XG5cbmV4cG9ydCBjbGFzcyBPcHRpb25zRmFjdG9yeSB7XG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKFxuICAgIG1pbWVWaWV3ZXJDb25maWc6IE1pbWVWaWV3ZXJDb25maWdcbiAgKTogT3BlblNlYWRyYWdvbi5PcHRpb25zIHtcbiAgICBsZXQgb3B0aW9uczogT3BlblNlYWRyYWdvbi5PcHRpb25zID0gT3BlblNlYWRyYWdvbi5ERUZBVUxUX1NFVFRJTkdTO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBpZDogJ29wZW5zZWFkcmFnb24nLFxuICAgICAgdXNlQ2FudmFzOiB0aGlzLmNhblVzZUNhbnZhcygpLFxuICAgICAgcGFuVmVydGljYWw6IHRydWUsXG4gICAgICBtaW5ab29tSW1hZ2VSYXRpbzogMSxcbiAgICAgIG1heFpvb21QaXhlbFJhdGlvOiA1LFxuICAgICAgc21vb3RoVGlsZUVkZ2VzTWluWm9vbTogMSxcbiAgICAgIHByZXNlcnZlSW1hZ2VTaXplT25SZXNpemU6IHRydWUsXG4gICAgICB2aXNpYmlsaXR5UmF0aW86IDAsXG4gICAgICBzaG93TmF2aWdhdGlvbkNvbnRyb2w6IGZhbHNlLFxuICAgICAgYW5pbWF0aW9uVGltZTogVmlld2VyT3B0aW9ucy50cmFuc2l0aW9ucy5PU0RBbmltYXRpb25UaW1lIC8gMTAwMCxcbiAgICAgIGFqYXhXaXRoQ3JlZGVudGlhbHM6IG1pbWVWaWV3ZXJDb25maWcud2l0aENyZWRlbnRpYWxzLFxuICAgICAgbG9hZFRpbGVzV2l0aEFqYXg6IG1pbWVWaWV3ZXJDb25maWcubG9hZFRpbGVzV2l0aEFqYXgsXG4gICAgICBjcm9zc09yaWdpblBvbGljeTogbWltZVZpZXdlckNvbmZpZy5jcm9zc09yaWdpblBvbGljeSxcbiAgICAgIGFqYXhIZWFkZXJzOiBtaW1lVmlld2VyQ29uZmlnLmFqYXhIZWFkZXJzLFxuICAgICAgZ2VzdHVyZVNldHRpbmdzTW91c2U6IHtcbiAgICAgICAgLi4ub3B0aW9ucy5nZXN0dXJlU2V0dGluZ3NNb3VzZSxcbiAgICAgICAgc2Nyb2xsVG9ab29tOiBmYWxzZSxcbiAgICAgICAgY2xpY2tUb1pvb206IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGdlc3R1cmVTZXR0aW5nc1RvdWNoOiB7XG4gICAgICAgIC4uLm9wdGlvbnMuZ2VzdHVyZVNldHRpbmdzVG91Y2gsXG4gICAgICAgIGRibENsaWNrVG9ab29tOiBmYWxzZSxcbiAgICAgICAgcGluY2hUb1pvb206IGZhbHNlLFxuICAgICAgICBmbGlja0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGdlc3R1cmVTZXR0aW5nc1Blbjoge1xuICAgICAgICAuLi5vcHRpb25zLmdlc3R1cmVTZXR0aW5nc1BlbixcbiAgICAgICAgY2xpY2tUb1pvb206IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGdlc3R1cmVTZXR0aW5nc1Vua25vd246IHtcbiAgICAgICAgLi4ub3B0aW9ucy5nZXN0dXJlU2V0dGluZ3NVbmtub3duLFxuICAgICAgICBzY3JvbGxUb1pvb206IGZhbHNlLFxuICAgICAgICBkYmxDbGlja1RvWm9vbTogZmFsc2UsXG4gICAgICAgIHBpbmNoVG9ab29tOiBmYWxzZSxcbiAgICAgICAgZmxpY2tFbmFibGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNhblVzZUNhbnZhcygpIHtcbiAgICBjb25zdCBpc0hhbmRoZWxkSU9TID1cbiAgICAgIC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybSA/PyAnJykgfHxcbiAgICAgIChuYXZpZ2F0b3IucGxhdGZvcm0gPT09ICdNYWNJbnRlbCcgJiZcbiAgICAgICAgdHlwZW9mIChuYXZpZ2F0b3IgYXMgYW55KS5zdGFuZGFsb25lICE9PSAndW5kZWZpbmVkJyk7XG5cbiAgICByZXR1cm4gIWlzSGFuZGhlbGRJT1M7XG4gIH1cbn1cbiJdfQ==