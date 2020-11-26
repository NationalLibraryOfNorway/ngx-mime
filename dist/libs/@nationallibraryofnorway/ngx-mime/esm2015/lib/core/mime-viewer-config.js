import { ViewerLayout } from './models/viewer-layout';
import { ViewerMode } from './models/viewer-mode';
export class MimeViewerConfig {
    constructor(fields) {
        this.attributionDialogEnabled = true;
        this.attributionDialogHideTimeout = -1;
        this.navigationControlEnabled = true;
        this.initViewerMode = ViewerMode.PAGE;
        this.initViewerLayout = ViewerLayout.TWO_PAGE;
        this.withCredentials = false;
        this.loadTilesWithAjax = false;
        this.crossOriginPolicy = false;
        this.ajaxHeaders = null;
        this.preserveZoomOnCanvasGroupChange = false;
        this.startOnTopOnCanvasGroupChange = false;
        this.isDropEnabled = false;
        if (fields) {
            this.attributionDialogEnabled =
                fields.attributionDialogEnabled !== undefined
                    ? fields.attributionDialogEnabled
                    : this.attributionDialogEnabled;
            this.attributionDialogHideTimeout =
                fields.attributionDialogHideTimeout ||
                    this.attributionDialogHideTimeout;
            this.navigationControlEnabled =
                fields.navigationControlEnabled !== undefined
                    ? fields.navigationControlEnabled
                    : this.navigationControlEnabled;
            this.initViewerMode =
                fields.initViewerMode !== undefined
                    ? fields.initViewerMode
                    : this.initViewerMode;
            this.initViewerLayout =
                fields.initViewerLayout !== undefined
                    ? fields.initViewerLayout
                    : this.initViewerLayout;
            this.withCredentials =
                fields.withCredentials !== undefined
                    ? fields.withCredentials
                    : this.withCredentials;
            this.loadTilesWithAjax =
                fields.loadTilesWithAjax !== undefined
                    ? fields.loadTilesWithAjax
                    : this.loadTilesWithAjax;
            this.crossOriginPolicy =
                fields.crossOriginPolicy !== undefined
                    ? fields.crossOriginPolicy
                    : this.crossOriginPolicy;
            this.ajaxHeaders =
                fields.ajaxHeaders !== undefined
                    ? fields.ajaxHeaders
                    : this.ajaxHeaders;
            this.preserveZoomOnCanvasGroupChange =
                fields.preserveZoomOnCanvasGroupChange !== undefined
                    ? fields.preserveZoomOnCanvasGroupChange
                    : this.preserveZoomOnCanvasGroupChange;
            this.startOnTopOnCanvasGroupChange =
                fields.startOnTopOnCanvasGroupChange !== undefined
                    ? fields.startOnTopOnCanvasGroupChange
                    : this.startOnTopOnCanvasGroupChange;
            this.isDropEnabled =
                fields.isDropEnabled !== undefined
                    ? fields.isDropEnabled
                    : this.isDropEnabled;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS12aWV3ZXItY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3Jvbm55bS9UZW1wL25neC1taW1lL2xpYnMvbmd4LW1pbWUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvcmUvbWltZS12aWV3ZXItY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsTUFBTSxPQUFPLGdCQUFnQjtJQWMzQixZQUFZLE1BYVg7UUExQk0sNkJBQXdCLEdBQUksSUFBSSxDQUFDO1FBQ2pDLGlDQUE0QixHQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25DLDZCQUF3QixHQUFJLElBQUksQ0FBQztRQUNqQyxtQkFBYyxHQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDbEMscUJBQWdCLEdBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUMxQyxvQkFBZSxHQUFJLEtBQUssQ0FBQztRQUN6QixzQkFBaUIsR0FBSSxLQUFLLENBQUM7UUFDM0Isc0JBQWlCLEdBQXNCLEtBQUssQ0FBQztRQUM3QyxnQkFBVyxHQUFTLElBQUksQ0FBQztRQUN6QixvQ0FBK0IsR0FBSSxLQUFLLENBQUM7UUFDekMsa0NBQTZCLEdBQUksS0FBSyxDQUFDO1FBQ3ZDLGtCQUFhLEdBQUksS0FBSyxDQUFDO1FBZ0I1QixJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyx3QkFBd0I7Z0JBQzNCLE1BQU0sQ0FBQyx3QkFBd0IsS0FBSyxTQUFTO29CQUMzQyxDQUFDLENBQUMsTUFBTSxDQUFDLHdCQUF3QjtvQkFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztZQUVwQyxJQUFJLENBQUMsNEJBQTRCO2dCQUMvQixNQUFNLENBQUMsNEJBQTRCO29CQUNuQyxJQUFJLENBQUMsNEJBQTRCLENBQUM7WUFFcEMsSUFBSSxDQUFDLHdCQUF3QjtnQkFDM0IsTUFBTSxDQUFDLHdCQUF3QixLQUFLLFNBQVM7b0JBQzNDLENBQUMsQ0FBQyxNQUFNLENBQUMsd0JBQXdCO29CQUNqQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDO1lBRXBDLElBQUksQ0FBQyxjQUFjO2dCQUNqQixNQUFNLENBQUMsY0FBYyxLQUFLLFNBQVM7b0JBQ2pDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYztvQkFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7WUFFMUIsSUFBSSxDQUFDLGdCQUFnQjtnQkFDbkIsTUFBTSxDQUFDLGdCQUFnQixLQUFLLFNBQVM7b0JBQ25DLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCO29CQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBRTVCLElBQUksQ0FBQyxlQUFlO2dCQUNsQixNQUFNLENBQUMsZUFBZSxLQUFLLFNBQVM7b0JBQ2xDLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZTtvQkFDeEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7WUFFM0IsSUFBSSxDQUFDLGlCQUFpQjtnQkFDcEIsTUFBTSxDQUFDLGlCQUFpQixLQUFLLFNBQVM7b0JBQ3BDLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCO29CQUMxQixDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBRTdCLElBQUksQ0FBQyxpQkFBaUI7Z0JBQ3BCLE1BQU0sQ0FBQyxpQkFBaUIsS0FBSyxTQUFTO29CQUNwQyxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQjtvQkFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUU3QixJQUFJLENBQUMsV0FBVztnQkFDZCxNQUFNLENBQUMsV0FBVyxLQUFLLFNBQVM7b0JBQzlCLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVztvQkFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7WUFFdkIsSUFBSSxDQUFDLCtCQUErQjtnQkFDbEMsTUFBTSxDQUFDLCtCQUErQixLQUFLLFNBQVM7b0JBQ2xELENBQUMsQ0FBQyxNQUFNLENBQUMsK0JBQStCO29CQUN4QyxDQUFDLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDO1lBRTNDLElBQUksQ0FBQyw2QkFBNkI7Z0JBQ2hDLE1BQU0sQ0FBQyw2QkFBNkIsS0FBSyxTQUFTO29CQUNoRCxDQUFDLENBQUMsTUFBTSxDQUFDLDZCQUE2QjtvQkFDdEMsQ0FBQyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQztZQUV6QyxJQUFJLENBQUMsYUFBYTtnQkFDaEIsTUFBTSxDQUFDLGFBQWEsS0FBSyxTQUFTO29CQUNoQyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWE7b0JBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlld2VyTGF5b3V0IH0gZnJvbSAnLi9tb2RlbHMvdmlld2VyLWxheW91dCc7XG5pbXBvcnQgeyBWaWV3ZXJNb2RlIH0gZnJvbSAnLi9tb2RlbHMvdmlld2VyLW1vZGUnO1xuXG5leHBvcnQgY2xhc3MgTWltZVZpZXdlckNvbmZpZyB7XG4gIHB1YmxpYyBhdHRyaWJ1dGlvbkRpYWxvZ0VuYWJsZWQ/ID0gdHJ1ZTtcbiAgcHVibGljIGF0dHJpYnV0aW9uRGlhbG9nSGlkZVRpbWVvdXQ/ID0gLTE7XG4gIHB1YmxpYyBuYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQ/ID0gdHJ1ZTtcbiAgcHVibGljIGluaXRWaWV3ZXJNb2RlPyA9IFZpZXdlck1vZGUuUEFHRTtcbiAgcHVibGljIGluaXRWaWV3ZXJMYXlvdXQ/ID0gVmlld2VyTGF5b3V0LlRXT19QQUdFO1xuICBwdWJsaWMgd2l0aENyZWRlbnRpYWxzPyA9IGZhbHNlO1xuICBwdWJsaWMgbG9hZFRpbGVzV2l0aEFqYXg/ID0gZmFsc2U7XG4gIHB1YmxpYyBjcm9zc09yaWdpblBvbGljeT86IHN0cmluZyB8IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGFqYXhIZWFkZXJzPzogYW55ID0gbnVsbDtcbiAgcHVibGljIHByZXNlcnZlWm9vbU9uQ2FudmFzR3JvdXBDaGFuZ2U/ID0gZmFsc2U7XG4gIHB1YmxpYyBzdGFydE9uVG9wT25DYW52YXNHcm91cENoYW5nZT8gPSBmYWxzZTtcbiAgcHVibGljIGlzRHJvcEVuYWJsZWQ/ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZmllbGRzPzoge1xuICAgIGF0dHJpYnV0aW9uRGlhbG9nRW5hYmxlZD86IGJvb2xlYW47XG4gICAgYXR0cmlidXRpb25EaWFsb2dIaWRlVGltZW91dD86IG51bWJlcjtcbiAgICBuYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQ/OiBib29sZWFuO1xuICAgIGluaXRWaWV3ZXJNb2RlPzogVmlld2VyTW9kZTtcbiAgICBpbml0Vmlld2VyTGF5b3V0PzogVmlld2VyTGF5b3V0O1xuICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XG4gICAgbG9hZFRpbGVzV2l0aEFqYXg/OiBib29sZWFuO1xuICAgIGNyb3NzT3JpZ2luUG9saWN5Pzogc3RyaW5nIHwgYm9vbGVhbjtcbiAgICBhamF4SGVhZGVycz86IGFueTtcbiAgICBwcmVzZXJ2ZVpvb21PbkNhbnZhc0dyb3VwQ2hhbmdlPzogYm9vbGVhbjtcbiAgICBzdGFydE9uVG9wT25DYW52YXNHcm91cENoYW5nZT86IGJvb2xlYW47XG4gICAgaXNEcm9wRW5hYmxlZD86IGJvb2xlYW47XG4gIH0pIHtcbiAgICBpZiAoZmllbGRzKSB7XG4gICAgICB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nRW5hYmxlZCA9XG4gICAgICAgIGZpZWxkcy5hdHRyaWJ1dGlvbkRpYWxvZ0VuYWJsZWQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmF0dHJpYnV0aW9uRGlhbG9nRW5hYmxlZFxuICAgICAgICAgIDogdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ0VuYWJsZWQ7XG5cbiAgICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dIaWRlVGltZW91dCA9XG4gICAgICAgIGZpZWxkcy5hdHRyaWJ1dGlvbkRpYWxvZ0hpZGVUaW1lb3V0IHx8XG4gICAgICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dIaWRlVGltZW91dDtcblxuICAgICAgdGhpcy5uYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQgPVxuICAgICAgICBmaWVsZHMubmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5uYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWRcbiAgICAgICAgICA6IHRoaXMubmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkO1xuXG4gICAgICB0aGlzLmluaXRWaWV3ZXJNb2RlID1cbiAgICAgICAgZmllbGRzLmluaXRWaWV3ZXJNb2RlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5pbml0Vmlld2VyTW9kZVxuICAgICAgICAgIDogdGhpcy5pbml0Vmlld2VyTW9kZTtcblxuICAgICAgdGhpcy5pbml0Vmlld2VyTGF5b3V0ID1cbiAgICAgICAgZmllbGRzLmluaXRWaWV3ZXJMYXlvdXQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmluaXRWaWV3ZXJMYXlvdXRcbiAgICAgICAgICA6IHRoaXMuaW5pdFZpZXdlckxheW91dDtcblxuICAgICAgdGhpcy53aXRoQ3JlZGVudGlhbHMgPVxuICAgICAgICBmaWVsZHMud2l0aENyZWRlbnRpYWxzICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy53aXRoQ3JlZGVudGlhbHNcbiAgICAgICAgICA6IHRoaXMud2l0aENyZWRlbnRpYWxzO1xuXG4gICAgICB0aGlzLmxvYWRUaWxlc1dpdGhBamF4ID1cbiAgICAgICAgZmllbGRzLmxvYWRUaWxlc1dpdGhBamF4ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5sb2FkVGlsZXNXaXRoQWpheFxuICAgICAgICAgIDogdGhpcy5sb2FkVGlsZXNXaXRoQWpheDtcblxuICAgICAgdGhpcy5jcm9zc09yaWdpblBvbGljeSA9XG4gICAgICAgIGZpZWxkcy5jcm9zc09yaWdpblBvbGljeSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMuY3Jvc3NPcmlnaW5Qb2xpY3lcbiAgICAgICAgICA6IHRoaXMuY3Jvc3NPcmlnaW5Qb2xpY3k7XG5cbiAgICAgIHRoaXMuYWpheEhlYWRlcnMgPVxuICAgICAgICBmaWVsZHMuYWpheEhlYWRlcnMgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmFqYXhIZWFkZXJzXG4gICAgICAgICAgOiB0aGlzLmFqYXhIZWFkZXJzO1xuXG4gICAgICB0aGlzLnByZXNlcnZlWm9vbU9uQ2FudmFzR3JvdXBDaGFuZ2UgPVxuICAgICAgICBmaWVsZHMucHJlc2VydmVab29tT25DYW52YXNHcm91cENoYW5nZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMucHJlc2VydmVab29tT25DYW52YXNHcm91cENoYW5nZVxuICAgICAgICAgIDogdGhpcy5wcmVzZXJ2ZVpvb21PbkNhbnZhc0dyb3VwQ2hhbmdlO1xuXG4gICAgICB0aGlzLnN0YXJ0T25Ub3BPbkNhbnZhc0dyb3VwQ2hhbmdlID1cbiAgICAgICAgZmllbGRzLnN0YXJ0T25Ub3BPbkNhbnZhc0dyb3VwQ2hhbmdlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5zdGFydE9uVG9wT25DYW52YXNHcm91cENoYW5nZVxuICAgICAgICAgIDogdGhpcy5zdGFydE9uVG9wT25DYW52YXNHcm91cENoYW5nZTtcblxuICAgICAgdGhpcy5pc0Ryb3BFbmFibGVkID1cbiAgICAgICAgZmllbGRzLmlzRHJvcEVuYWJsZWQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmlzRHJvcEVuYWJsZWRcbiAgICAgICAgICA6IHRoaXMuaXNEcm9wRW5hYmxlZDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==