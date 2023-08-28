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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvdmlld2VyLXNlcnZpY2Uvb3B0aW9ucy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RCxNQUFNLE9BQU8sY0FBYztJQUNsQixNQUFNLENBQUMsTUFBTSxDQUNsQixFQUFVLEVBQ1YsZ0JBQWtDO1FBRWxDLElBQUksT0FBTyxHQUEwQixhQUFhLENBQUMsZ0JBQWdCLENBQUM7UUFFcEUsT0FBTztZQUNMLEdBQUcsT0FBTztZQUNWLEVBQUUsRUFBRSxFQUFFO1lBQ04sU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDOUIsV0FBVyxFQUFFLElBQUk7WUFDakIsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQixpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLHNCQUFzQixFQUFFLENBQUM7WUFDekIseUJBQXlCLEVBQUUsSUFBSTtZQUMvQixlQUFlLEVBQUUsQ0FBQztZQUNsQixxQkFBcUIsRUFBRSxLQUFLO1lBQzVCLGFBQWEsRUFBRSxhQUFhLENBQUMsV0FBVyxDQUFDLGdCQUFnQixHQUFHLElBQUk7WUFDaEUsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsZUFBZTtZQUNyRCxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxpQkFBaUI7WUFDckQsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUMsaUJBQWlCO1lBQ3JELFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXO1lBQ3pDLG9CQUFvQixFQUFFO2dCQUNwQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0I7Z0JBQy9CLFlBQVksRUFBRSxLQUFLO2dCQUNuQixXQUFXLEVBQUUsS0FBSzthQUNuQjtZQUNELG9CQUFvQixFQUFFO2dCQUNwQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0I7Z0JBQy9CLGNBQWMsRUFBRSxLQUFLO2dCQUNyQixXQUFXLEVBQUUsS0FBSztnQkFDbEIsWUFBWSxFQUFFLEtBQUs7YUFDcEI7WUFDRCxrQkFBa0IsRUFBRTtnQkFDbEIsR0FBRyxPQUFPLENBQUMsa0JBQWtCO2dCQUM3QixXQUFXLEVBQUUsS0FBSzthQUNuQjtZQUNELHNCQUFzQixFQUFFO2dCQUN0QixHQUFHLE9BQU8sQ0FBQyxzQkFBc0I7Z0JBQ2pDLFlBQVksRUFBRSxLQUFLO2dCQUNuQixjQUFjLEVBQUUsS0FBSztnQkFDckIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFlBQVksRUFBRSxLQUFLO2FBQ3BCO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTyxNQUFNLENBQUMsWUFBWTtRQUN6QixNQUFNLGFBQWEsR0FDakIsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1lBQ2pELENBQUMsU0FBUyxDQUFDLFFBQVEsS0FBSyxVQUFVO2dCQUNoQyxPQUFRLFNBQWlCLENBQUMsVUFBVSxLQUFLLFdBQVcsQ0FBQyxDQUFDO1FBRTFELE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDeEIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgT3BlblNlYWRyYWdvbiBmcm9tICdvcGVuc2VhZHJhZ29uJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJDb25maWcgfSBmcm9tICcuLi9taW1lLXZpZXdlci1jb25maWcnO1xuaW1wb3J0IHsgVmlld2VyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItb3B0aW9ucyc7XG5cbmV4cG9ydCBjbGFzcyBPcHRpb25zRmFjdG9yeSB7XG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgbWltZVZpZXdlckNvbmZpZzogTWltZVZpZXdlckNvbmZpZ1xuICApOiBPcGVuU2VhZHJhZ29uLk9wdGlvbnMge1xuICAgIGxldCBvcHRpb25zOiBPcGVuU2VhZHJhZ29uLk9wdGlvbnMgPSBPcGVuU2VhZHJhZ29uLkRFRkFVTFRfU0VUVElOR1M7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIGlkOiBpZCxcbiAgICAgIHVzZUNhbnZhczogdGhpcy5jYW5Vc2VDYW52YXMoKSxcbiAgICAgIHBhblZlcnRpY2FsOiB0cnVlLFxuICAgICAgbWluWm9vbUltYWdlUmF0aW86IDEsXG4gICAgICBtYXhab29tUGl4ZWxSYXRpbzogNSxcbiAgICAgIHNtb290aFRpbGVFZGdlc01pblpvb206IDEsXG4gICAgICBwcmVzZXJ2ZUltYWdlU2l6ZU9uUmVzaXplOiB0cnVlLFxuICAgICAgdmlzaWJpbGl0eVJhdGlvOiAwLFxuICAgICAgc2hvd05hdmlnYXRpb25Db250cm9sOiBmYWxzZSxcbiAgICAgIGFuaW1hdGlvblRpbWU6IFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMuT1NEQW5pbWF0aW9uVGltZSAvIDEwMDAsXG4gICAgICBhamF4V2l0aENyZWRlbnRpYWxzOiBtaW1lVmlld2VyQ29uZmlnLndpdGhDcmVkZW50aWFscyxcbiAgICAgIGxvYWRUaWxlc1dpdGhBamF4OiBtaW1lVmlld2VyQ29uZmlnLmxvYWRUaWxlc1dpdGhBamF4LFxuICAgICAgY3Jvc3NPcmlnaW5Qb2xpY3k6IG1pbWVWaWV3ZXJDb25maWcuY3Jvc3NPcmlnaW5Qb2xpY3ksXG4gICAgICBhamF4SGVhZGVyczogbWltZVZpZXdlckNvbmZpZy5hamF4SGVhZGVycyxcbiAgICAgIGdlc3R1cmVTZXR0aW5nc01vdXNlOiB7XG4gICAgICAgIC4uLm9wdGlvbnMuZ2VzdHVyZVNldHRpbmdzTW91c2UsXG4gICAgICAgIHNjcm9sbFRvWm9vbTogZmFsc2UsXG4gICAgICAgIGNsaWNrVG9ab29tOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBnZXN0dXJlU2V0dGluZ3NUb3VjaDoge1xuICAgICAgICAuLi5vcHRpb25zLmdlc3R1cmVTZXR0aW5nc1RvdWNoLFxuICAgICAgICBkYmxDbGlja1RvWm9vbTogZmFsc2UsXG4gICAgICAgIHBpbmNoVG9ab29tOiBmYWxzZSxcbiAgICAgICAgZmxpY2tFbmFibGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBnZXN0dXJlU2V0dGluZ3NQZW46IHtcbiAgICAgICAgLi4ub3B0aW9ucy5nZXN0dXJlU2V0dGluZ3NQZW4sXG4gICAgICAgIGNsaWNrVG9ab29tOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBnZXN0dXJlU2V0dGluZ3NVbmtub3duOiB7XG4gICAgICAgIC4uLm9wdGlvbnMuZ2VzdHVyZVNldHRpbmdzVW5rbm93bixcbiAgICAgICAgc2Nyb2xsVG9ab29tOiBmYWxzZSxcbiAgICAgICAgZGJsQ2xpY2tUb1pvb206IGZhbHNlLFxuICAgICAgICBwaW5jaFRvWm9vbTogZmFsc2UsXG4gICAgICAgIGZsaWNrRW5hYmxlZDogZmFsc2UsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjYW5Vc2VDYW52YXMoKSB7XG4gICAgY29uc3QgaXNIYW5kaGVsZElPUyA9XG4gICAgICAvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0gPz8gJycpIHx8XG4gICAgICAobmF2aWdhdG9yLnBsYXRmb3JtID09PSAnTWFjSW50ZWwnICYmXG4gICAgICAgIHR5cGVvZiAobmF2aWdhdG9yIGFzIGFueSkuc3RhbmRhbG9uZSAhPT0gJ3VuZGVmaW5lZCcpO1xuXG4gICAgcmV0dXJuICFpc0hhbmRoZWxkSU9TO1xuICB9XG59XG4iXX0=