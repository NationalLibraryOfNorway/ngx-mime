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
        if (typeof navigator !== 'object') {
            return false;
        }
        const userAgent = navigator.userAgent;
        if (typeof userAgent !== 'string') {
            return false;
        }
        return !(userAgent.indexOf('iPhone') !== -1 ||
            userAgent.indexOf('iPad') !== -1 ||
            userAgent.indexOf('iPod') !== -1 ||
            userAgent.indexOf('Macintosh') !== -1);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvdmlld2VyLXNlcnZpY2Uvb3B0aW9ucy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RCxNQUFNLE9BQU8sY0FBYztJQUNsQixNQUFNLENBQUMsTUFBTSxDQUNsQixnQkFBa0M7UUFFbEMsSUFBSSxPQUFPLEdBQTBCLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztRQUVwRSxPQUFPO1lBQ0wsR0FBRyxPQUFPO1lBQ1YsRUFBRSxFQUFFLGVBQWU7WUFDbkIsU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDOUIsV0FBVyxFQUFFLElBQUk7WUFDakIsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQixpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLHNCQUFzQixFQUFFLENBQUM7WUFDekIseUJBQXlCLEVBQUUsSUFBSTtZQUMvQixlQUFlLEVBQUUsQ0FBQztZQUNsQixxQkFBcUIsRUFBRSxLQUFLO1lBQzVCLGFBQWEsRUFBRSxhQUFhLENBQUMsV0FBVyxDQUFDLGdCQUFnQixHQUFHLElBQUk7WUFDaEUsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsZUFBZTtZQUNyRCxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxpQkFBaUI7WUFDckQsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUMsaUJBQWlCO1lBQ3JELFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXO1lBQ3pDLG9CQUFvQixFQUFFO2dCQUNwQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0I7Z0JBQy9CLFlBQVksRUFBRSxLQUFLO2dCQUNuQixXQUFXLEVBQUUsS0FBSzthQUNuQjtZQUNELG9CQUFvQixFQUFFO2dCQUNwQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0I7Z0JBQy9CLGNBQWMsRUFBRSxLQUFLO2dCQUNyQixXQUFXLEVBQUUsS0FBSztnQkFDbEIsWUFBWSxFQUFFLEtBQUs7YUFDcEI7WUFDRCxrQkFBa0IsRUFBRTtnQkFDbEIsR0FBRyxPQUFPLENBQUMsa0JBQWtCO2dCQUM3QixXQUFXLEVBQUUsS0FBSzthQUNuQjtZQUNELHNCQUFzQixFQUFFO2dCQUN0QixHQUFHLE9BQU8sQ0FBQyxzQkFBc0I7Z0JBQ2pDLFlBQVksRUFBRSxLQUFLO2dCQUNuQixjQUFjLEVBQUUsS0FBSztnQkFDckIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFlBQVksRUFBRSxLQUFLO2FBQ3BCO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTyxNQUFNLENBQUMsWUFBWTtRQUN6QixJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUNqQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUN0QyxJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUNqQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxDQUFDLENBQ04sU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDdEMsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE9wZW5TZWFkcmFnb24gZnJvbSAnb3BlbnNlYWRyYWdvbic7XG5pbXBvcnQgeyBNaW1lVmlld2VyQ29uZmlnIH0gZnJvbSAnLi4vbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7IFZpZXdlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvdmlld2VyLW9wdGlvbnMnO1xuXG5leHBvcnQgY2xhc3MgT3B0aW9uc0ZhY3Rvcnkge1xuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShcbiAgICBtaW1lVmlld2VyQ29uZmlnOiBNaW1lVmlld2VyQ29uZmlnXG4gICk6IE9wZW5TZWFkcmFnb24uT3B0aW9ucyB7XG4gICAgbGV0IG9wdGlvbnM6IE9wZW5TZWFkcmFnb24uT3B0aW9ucyA9IE9wZW5TZWFkcmFnb24uREVGQVVMVF9TRVRUSU5HUztcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgaWQ6ICdvcGVuc2VhZHJhZ29uJyxcbiAgICAgIHVzZUNhbnZhczogdGhpcy5jYW5Vc2VDYW52YXMoKSxcbiAgICAgIHBhblZlcnRpY2FsOiB0cnVlLFxuICAgICAgbWluWm9vbUltYWdlUmF0aW86IDEsXG4gICAgICBtYXhab29tUGl4ZWxSYXRpbzogNSxcbiAgICAgIHNtb290aFRpbGVFZGdlc01pblpvb206IDEsXG4gICAgICBwcmVzZXJ2ZUltYWdlU2l6ZU9uUmVzaXplOiB0cnVlLFxuICAgICAgdmlzaWJpbGl0eVJhdGlvOiAwLFxuICAgICAgc2hvd05hdmlnYXRpb25Db250cm9sOiBmYWxzZSxcbiAgICAgIGFuaW1hdGlvblRpbWU6IFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMuT1NEQW5pbWF0aW9uVGltZSAvIDEwMDAsXG4gICAgICBhamF4V2l0aENyZWRlbnRpYWxzOiBtaW1lVmlld2VyQ29uZmlnLndpdGhDcmVkZW50aWFscyxcbiAgICAgIGxvYWRUaWxlc1dpdGhBamF4OiBtaW1lVmlld2VyQ29uZmlnLmxvYWRUaWxlc1dpdGhBamF4LFxuICAgICAgY3Jvc3NPcmlnaW5Qb2xpY3k6IG1pbWVWaWV3ZXJDb25maWcuY3Jvc3NPcmlnaW5Qb2xpY3ksXG4gICAgICBhamF4SGVhZGVyczogbWltZVZpZXdlckNvbmZpZy5hamF4SGVhZGVycyxcbiAgICAgIGdlc3R1cmVTZXR0aW5nc01vdXNlOiB7XG4gICAgICAgIC4uLm9wdGlvbnMuZ2VzdHVyZVNldHRpbmdzTW91c2UsXG4gICAgICAgIHNjcm9sbFRvWm9vbTogZmFsc2UsXG4gICAgICAgIGNsaWNrVG9ab29tOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBnZXN0dXJlU2V0dGluZ3NUb3VjaDoge1xuICAgICAgICAuLi5vcHRpb25zLmdlc3R1cmVTZXR0aW5nc1RvdWNoLFxuICAgICAgICBkYmxDbGlja1RvWm9vbTogZmFsc2UsXG4gICAgICAgIHBpbmNoVG9ab29tOiBmYWxzZSxcbiAgICAgICAgZmxpY2tFbmFibGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBnZXN0dXJlU2V0dGluZ3NQZW46IHtcbiAgICAgICAgLi4ub3B0aW9ucy5nZXN0dXJlU2V0dGluZ3NQZW4sXG4gICAgICAgIGNsaWNrVG9ab29tOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBnZXN0dXJlU2V0dGluZ3NVbmtub3duOiB7XG4gICAgICAgIC4uLm9wdGlvbnMuZ2VzdHVyZVNldHRpbmdzVW5rbm93bixcbiAgICAgICAgc2Nyb2xsVG9ab29tOiBmYWxzZSxcbiAgICAgICAgZGJsQ2xpY2tUb1pvb206IGZhbHNlLFxuICAgICAgICBwaW5jaFRvWm9vbTogZmFsc2UsXG4gICAgICAgIGZsaWNrRW5hYmxlZDogZmFsc2UsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjYW5Vc2VDYW52YXMoKSB7XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgaWYgKHR5cGVvZiB1c2VyQWdlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAhKFxuICAgICAgdXNlckFnZW50LmluZGV4T2YoJ2lQaG9uZScpICE9PSAtMSB8fFxuICAgICAgdXNlckFnZW50LmluZGV4T2YoJ2lQYWQnKSAhPT0gLTEgfHxcbiAgICAgIHVzZXJBZ2VudC5pbmRleE9mKCdpUG9kJykgIT09IC0xIHx8XG4gICAgICB1c2VyQWdlbnQuaW5kZXhPZignTWFjaW50b3NoJykgIT09IC0xXG4gICAgKTtcbiAgfVxufVxuIl19