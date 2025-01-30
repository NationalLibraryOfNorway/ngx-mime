import * as OpenSeadragon from 'openseadragon';
import { ViewerOptions } from '../models/viewer-options';
export class OptionsFactory {
    static create(id, mimeViewerConfig) {
        let options = OpenSeadragon.DEFAULT_SETTINGS;
        return {
            ...options,
            id: id,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvdmlld2VyLXNlcnZpY2Uvb3B0aW9ucy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RCxNQUFNLE9BQU8sY0FBYztJQUNsQixNQUFNLENBQUMsTUFBTSxDQUNsQixFQUFVLEVBQ1YsZ0JBQWtDO1FBRWxDLElBQUksT0FBTyxHQUEwQixhQUFhLENBQUMsZ0JBQWdCLENBQUM7UUFFcEUsT0FBTztZQUNMLEdBQUcsT0FBTztZQUNWLEVBQUUsRUFBRSxFQUFFO1lBQ04sU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDOUIsV0FBVyxFQUFFLElBQUk7WUFDakIsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQixpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLHNCQUFzQixFQUFFLENBQUM7WUFDekIseUJBQXlCLEVBQUUsSUFBSTtZQUMvQixlQUFlLEVBQUUsQ0FBQztZQUNsQixxQkFBcUIsRUFBRSxLQUFLO1lBQzVCLGFBQWEsRUFBRSxhQUFhLENBQUMsV0FBVyxDQUFDLGdCQUFnQixHQUFHLElBQUk7WUFDaEUsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsZUFBZTtZQUNyRCxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxpQkFBaUI7WUFDckQsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUMsaUJBQWlCO1lBQ3JELFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXO1lBQ3pDLG9CQUFvQixFQUFFO2dCQUNwQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0I7Z0JBQy9CLFlBQVksRUFBRSxLQUFLO2dCQUNuQixXQUFXLEVBQUUsS0FBSzthQUNuQjtZQUNELG9CQUFvQixFQUFFO2dCQUNwQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0I7Z0JBQy9CLGNBQWMsRUFBRSxLQUFLO2dCQUNyQixXQUFXLEVBQUUsS0FBSztnQkFDbEIsWUFBWSxFQUFFLEtBQUs7YUFDcEI7WUFDRCxrQkFBa0IsRUFBRTtnQkFDbEIsR0FBRyxPQUFPLENBQUMsa0JBQWtCO2dCQUM3QixXQUFXLEVBQUUsS0FBSzthQUNuQjtZQUNELHNCQUFzQixFQUFFO2dCQUN0QixHQUFHLE9BQU8sQ0FBQyxzQkFBc0I7Z0JBQ2pDLFlBQVksRUFBRSxLQUFLO2dCQUNuQixjQUFjLEVBQUUsS0FBSztnQkFDckIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFlBQVksRUFBRSxLQUFLO2FBQ3BCO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTyxNQUFNLENBQUMsWUFBWTtRQUN6QixNQUFNLGFBQWEsR0FDakIsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1lBQ2pELENBQUMsU0FBUyxDQUFDLFFBQVEsS0FBSyxVQUFVO2dCQUNoQyxPQUFRLFNBQWlCLENBQUMsVUFBVSxLQUFLLFdBQVcsQ0FBQyxDQUFDO1FBRTFELE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDeEIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgT3BlblNlYWRyYWdvbiBmcm9tICdvcGVuc2VhZHJhZ29uJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJDb25maWcgfSBmcm9tICcuLi9taW1lLXZpZXdlci1jb25maWcnO1xuaW1wb3J0IHsgVmlld2VyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItb3B0aW9ucyc7XG5cbmV4cG9ydCBjbGFzcyBPcHRpb25zRmFjdG9yeSB7XG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgbWltZVZpZXdlckNvbmZpZzogTWltZVZpZXdlckNvbmZpZyxcbiAgKTogT3BlblNlYWRyYWdvbi5PcHRpb25zIHtcbiAgICBsZXQgb3B0aW9uczogT3BlblNlYWRyYWdvbi5PcHRpb25zID0gT3BlblNlYWRyYWdvbi5ERUZBVUxUX1NFVFRJTkdTO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBpZDogaWQsXG4gICAgICB1c2VDYW52YXM6IHRoaXMuY2FuVXNlQ2FudmFzKCksXG4gICAgICBwYW5WZXJ0aWNhbDogdHJ1ZSxcbiAgICAgIG1pblpvb21JbWFnZVJhdGlvOiAxLFxuICAgICAgbWF4Wm9vbVBpeGVsUmF0aW86IDUsXG4gICAgICBzbW9vdGhUaWxlRWRnZXNNaW5ab29tOiAxLFxuICAgICAgcHJlc2VydmVJbWFnZVNpemVPblJlc2l6ZTogdHJ1ZSxcbiAgICAgIHZpc2liaWxpdHlSYXRpbzogMCxcbiAgICAgIHNob3dOYXZpZ2F0aW9uQ29udHJvbDogZmFsc2UsXG4gICAgICBhbmltYXRpb25UaW1lOiBWaWV3ZXJPcHRpb25zLnRyYW5zaXRpb25zLk9TREFuaW1hdGlvblRpbWUgLyAxMDAwLFxuICAgICAgYWpheFdpdGhDcmVkZW50aWFsczogbWltZVZpZXdlckNvbmZpZy53aXRoQ3JlZGVudGlhbHMsXG4gICAgICBsb2FkVGlsZXNXaXRoQWpheDogbWltZVZpZXdlckNvbmZpZy5sb2FkVGlsZXNXaXRoQWpheCxcbiAgICAgIGNyb3NzT3JpZ2luUG9saWN5OiBtaW1lVmlld2VyQ29uZmlnLmNyb3NzT3JpZ2luUG9saWN5LFxuICAgICAgYWpheEhlYWRlcnM6IG1pbWVWaWV3ZXJDb25maWcuYWpheEhlYWRlcnMsXG4gICAgICBnZXN0dXJlU2V0dGluZ3NNb3VzZToge1xuICAgICAgICAuLi5vcHRpb25zLmdlc3R1cmVTZXR0aW5nc01vdXNlLFxuICAgICAgICBzY3JvbGxUb1pvb206IGZhbHNlLFxuICAgICAgICBjbGlja1RvWm9vbTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZ2VzdHVyZVNldHRpbmdzVG91Y2g6IHtcbiAgICAgICAgLi4ub3B0aW9ucy5nZXN0dXJlU2V0dGluZ3NUb3VjaCxcbiAgICAgICAgZGJsQ2xpY2tUb1pvb206IGZhbHNlLFxuICAgICAgICBwaW5jaFRvWm9vbTogZmFsc2UsXG4gICAgICAgIGZsaWNrRW5hYmxlZDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZ2VzdHVyZVNldHRpbmdzUGVuOiB7XG4gICAgICAgIC4uLm9wdGlvbnMuZ2VzdHVyZVNldHRpbmdzUGVuLFxuICAgICAgICBjbGlja1RvWm9vbTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZ2VzdHVyZVNldHRpbmdzVW5rbm93bjoge1xuICAgICAgICAuLi5vcHRpb25zLmdlc3R1cmVTZXR0aW5nc1Vua25vd24sXG4gICAgICAgIHNjcm9sbFRvWm9vbTogZmFsc2UsXG4gICAgICAgIGRibENsaWNrVG9ab29tOiBmYWxzZSxcbiAgICAgICAgcGluY2hUb1pvb206IGZhbHNlLFxuICAgICAgICBmbGlja0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY2FuVXNlQ2FudmFzKCkge1xuICAgIGNvbnN0IGlzSGFuZGhlbGRJT1MgPVxuICAgICAgL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtID8/ICcnKSB8fFxuICAgICAgKG5hdmlnYXRvci5wbGF0Zm9ybSA9PT0gJ01hY0ludGVsJyAmJlxuICAgICAgICB0eXBlb2YgKG5hdmlnYXRvciBhcyBhbnkpLnN0YW5kYWxvbmUgIT09ICd1bmRlZmluZWQnKTtcblxuICAgIHJldHVybiAhaXNIYW5kaGVsZElPUztcbiAgfVxufVxuIl19