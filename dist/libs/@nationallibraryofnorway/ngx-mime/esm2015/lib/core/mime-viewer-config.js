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
        this.initRecognizedTextContentToggle = false;
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
            this.initRecognizedTextContentToggle =
                fields.initRecognizedTextContentToggle !== undefined
                    ? fields.initRecognizedTextContentToggle
                    : this.initRecognizedTextContentToggle;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS12aWV3ZXItY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbWltZS12aWV3ZXItY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsTUFBTSxPQUFPLGdCQUFnQjtJQWUzQixZQUFZLE1BY1g7UUE1Qk0sNkJBQXdCLEdBQUksSUFBSSxDQUFDO1FBQ2pDLGlDQUE0QixHQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25DLDZCQUF3QixHQUFJLElBQUksQ0FBQztRQUNqQyxtQkFBYyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDakMscUJBQWdCLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUN6QyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsc0JBQWlCLEdBQXdELEtBQUssQ0FBQztRQUMvRSxnQkFBVyxHQUFRLElBQUksQ0FBQztRQUN4QixvQ0FBK0IsR0FBRyxLQUFLLENBQUM7UUFDeEMsa0NBQTZCLEdBQUcsS0FBSyxDQUFDO1FBQ3RDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLG9DQUErQixHQUFHLEtBQUssQ0FBQztRQWlCN0MsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsd0JBQXdCO2dCQUMzQixNQUFNLENBQUMsd0JBQXdCLEtBQUssU0FBUztvQkFDM0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0I7b0JBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUM7WUFFcEMsSUFBSSxDQUFDLDRCQUE0QjtnQkFDL0IsTUFBTSxDQUFDLDRCQUE0QjtvQkFDbkMsSUFBSSxDQUFDLDRCQUE0QixDQUFDO1lBRXBDLElBQUksQ0FBQyx3QkFBd0I7Z0JBQzNCLE1BQU0sQ0FBQyx3QkFBd0IsS0FBSyxTQUFTO29CQUMzQyxDQUFDLENBQUMsTUFBTSxDQUFDLHdCQUF3QjtvQkFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztZQUVwQyxJQUFJLENBQUMsY0FBYztnQkFDakIsTUFBTSxDQUFDLGNBQWMsS0FBSyxTQUFTO29CQUNqQyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWM7b0JBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBRTFCLElBQUksQ0FBQyxnQkFBZ0I7Z0JBQ25CLE1BQU0sQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTO29CQUNuQyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQjtvQkFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUU1QixJQUFJLENBQUMsZUFBZTtnQkFDbEIsTUFBTSxDQUFDLGVBQWUsS0FBSyxTQUFTO29CQUNsQyxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWU7b0JBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBRTNCLElBQUksQ0FBQyxpQkFBaUI7Z0JBQ3BCLE1BQU0sQ0FBQyxpQkFBaUIsS0FBSyxTQUFTO29CQUNwQyxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQjtvQkFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUU3QixJQUFJLENBQUMsaUJBQWlCO2dCQUNwQixNQUFNLENBQUMsaUJBQWlCLEtBQUssU0FBUztvQkFDcEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUI7b0JBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFN0IsSUFBSSxDQUFDLFdBQVc7Z0JBQ2QsTUFBTSxDQUFDLFdBQVcsS0FBSyxTQUFTO29CQUM5QixDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVc7b0JBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBRXZCLElBQUksQ0FBQywrQkFBK0I7Z0JBQ2xDLE1BQU0sQ0FBQywrQkFBK0IsS0FBSyxTQUFTO29CQUNsRCxDQUFDLENBQUMsTUFBTSxDQUFDLCtCQUErQjtvQkFDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQztZQUUzQyxJQUFJLENBQUMsNkJBQTZCO2dCQUNoQyxNQUFNLENBQUMsNkJBQTZCLEtBQUssU0FBUztvQkFDaEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyw2QkFBNkI7b0JBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUM7WUFFekMsSUFBSSxDQUFDLGFBQWE7Z0JBQ2hCLE1BQU0sQ0FBQyxhQUFhLEtBQUssU0FBUztvQkFDaEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhO29CQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUV6QixJQUFJLENBQUMsK0JBQStCO2dCQUNsQyxNQUFNLENBQUMsK0JBQStCLEtBQUssU0FBUztvQkFDbEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQywrQkFBK0I7b0JBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUM7U0FDNUM7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3ZXJMYXlvdXQgfSBmcm9tICcuL21vZGVscy92aWV3ZXItbGF5b3V0JztcbmltcG9ydCB7IFZpZXdlck1vZGUgfSBmcm9tICcuL21vZGVscy92aWV3ZXItbW9kZSc7XG5cbmV4cG9ydCBjbGFzcyBNaW1lVmlld2VyQ29uZmlnIHtcbiAgcHVibGljIGF0dHJpYnV0aW9uRGlhbG9nRW5hYmxlZD8gPSB0cnVlO1xuICBwdWJsaWMgYXR0cmlidXRpb25EaWFsb2dIaWRlVGltZW91dD8gPSAtMTtcbiAgcHVibGljIG5hdmlnYXRpb25Db250cm9sRW5hYmxlZD8gPSB0cnVlO1xuICBwdWJsaWMgaW5pdFZpZXdlck1vZGUgPSBWaWV3ZXJNb2RlLlBBR0U7XG4gIHB1YmxpYyBpbml0Vmlld2VyTGF5b3V0ID0gVmlld2VyTGF5b3V0LlRXT19QQUdFO1xuICBwdWJsaWMgd2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XG4gIHB1YmxpYyBsb2FkVGlsZXNXaXRoQWpheCA9IGZhbHNlO1xuICBwdWJsaWMgY3Jvc3NPcmlnaW5Qb2xpY3k6ICdBbm9ueW1vdXMnIHwgJ3VzZS1jcmVkZW50aWFscycgfCBmYWxzZSB8IHVuZGVmaW5lZCA9IGZhbHNlO1xuICBwdWJsaWMgYWpheEhlYWRlcnM6IGFueSA9IG51bGw7XG4gIHB1YmxpYyBwcmVzZXJ2ZVpvb21PbkNhbnZhc0dyb3VwQ2hhbmdlID0gZmFsc2U7XG4gIHB1YmxpYyBzdGFydE9uVG9wT25DYW52YXNHcm91cENoYW5nZSA9IGZhbHNlO1xuICBwdWJsaWMgaXNEcm9wRW5hYmxlZCA9IGZhbHNlO1xuICBwdWJsaWMgaW5pdFJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGZpZWxkcz86IHtcbiAgICBhdHRyaWJ1dGlvbkRpYWxvZ0VuYWJsZWQ/OiBib29sZWFuO1xuICAgIGF0dHJpYnV0aW9uRGlhbG9nSGlkZVRpbWVvdXQ/OiBudW1iZXI7XG4gICAgbmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkPzogYm9vbGVhbjtcbiAgICBpbml0Vmlld2VyTW9kZT86IFZpZXdlck1vZGU7XG4gICAgaW5pdFZpZXdlckxheW91dD86IFZpZXdlckxheW91dDtcbiAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xuICAgIGxvYWRUaWxlc1dpdGhBamF4PzogYm9vbGVhbjtcbiAgICBjcm9zc09yaWdpblBvbGljeT86ICdBbm9ueW1vdXMnIHwgJ3VzZS1jcmVkZW50aWFscycgfCBmYWxzZSB8IHVuZGVmaW5lZDtcbiAgICBhamF4SGVhZGVycz86IGFueTtcbiAgICBwcmVzZXJ2ZVpvb21PbkNhbnZhc0dyb3VwQ2hhbmdlPzogYm9vbGVhbjtcbiAgICBzdGFydE9uVG9wT25DYW52YXNHcm91cENoYW5nZT86IGJvb2xlYW47XG4gICAgaXNEcm9wRW5hYmxlZD86IGJvb2xlYW47XG4gICAgaW5pdFJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZT86IGJvb2xlYW47XG4gIH0pIHtcbiAgICBpZiAoZmllbGRzKSB7XG4gICAgICB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nRW5hYmxlZCA9XG4gICAgICAgIGZpZWxkcy5hdHRyaWJ1dGlvbkRpYWxvZ0VuYWJsZWQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmF0dHJpYnV0aW9uRGlhbG9nRW5hYmxlZFxuICAgICAgICAgIDogdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ0VuYWJsZWQ7XG5cbiAgICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dIaWRlVGltZW91dCA9XG4gICAgICAgIGZpZWxkcy5hdHRyaWJ1dGlvbkRpYWxvZ0hpZGVUaW1lb3V0IHx8XG4gICAgICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dIaWRlVGltZW91dDtcblxuICAgICAgdGhpcy5uYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQgPVxuICAgICAgICBmaWVsZHMubmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5uYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWRcbiAgICAgICAgICA6IHRoaXMubmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkO1xuXG4gICAgICB0aGlzLmluaXRWaWV3ZXJNb2RlID1cbiAgICAgICAgZmllbGRzLmluaXRWaWV3ZXJNb2RlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5pbml0Vmlld2VyTW9kZVxuICAgICAgICAgIDogdGhpcy5pbml0Vmlld2VyTW9kZTtcblxuICAgICAgdGhpcy5pbml0Vmlld2VyTGF5b3V0ID1cbiAgICAgICAgZmllbGRzLmluaXRWaWV3ZXJMYXlvdXQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmluaXRWaWV3ZXJMYXlvdXRcbiAgICAgICAgICA6IHRoaXMuaW5pdFZpZXdlckxheW91dDtcblxuICAgICAgdGhpcy53aXRoQ3JlZGVudGlhbHMgPVxuICAgICAgICBmaWVsZHMud2l0aENyZWRlbnRpYWxzICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy53aXRoQ3JlZGVudGlhbHNcbiAgICAgICAgICA6IHRoaXMud2l0aENyZWRlbnRpYWxzO1xuXG4gICAgICB0aGlzLmxvYWRUaWxlc1dpdGhBamF4ID1cbiAgICAgICAgZmllbGRzLmxvYWRUaWxlc1dpdGhBamF4ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5sb2FkVGlsZXNXaXRoQWpheFxuICAgICAgICAgIDogdGhpcy5sb2FkVGlsZXNXaXRoQWpheDtcblxuICAgICAgdGhpcy5jcm9zc09yaWdpblBvbGljeSA9XG4gICAgICAgIGZpZWxkcy5jcm9zc09yaWdpblBvbGljeSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMuY3Jvc3NPcmlnaW5Qb2xpY3lcbiAgICAgICAgICA6IHRoaXMuY3Jvc3NPcmlnaW5Qb2xpY3k7XG5cbiAgICAgIHRoaXMuYWpheEhlYWRlcnMgPVxuICAgICAgICBmaWVsZHMuYWpheEhlYWRlcnMgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmFqYXhIZWFkZXJzXG4gICAgICAgICAgOiB0aGlzLmFqYXhIZWFkZXJzO1xuXG4gICAgICB0aGlzLnByZXNlcnZlWm9vbU9uQ2FudmFzR3JvdXBDaGFuZ2UgPVxuICAgICAgICBmaWVsZHMucHJlc2VydmVab29tT25DYW52YXNHcm91cENoYW5nZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMucHJlc2VydmVab29tT25DYW52YXNHcm91cENoYW5nZVxuICAgICAgICAgIDogdGhpcy5wcmVzZXJ2ZVpvb21PbkNhbnZhc0dyb3VwQ2hhbmdlO1xuXG4gICAgICB0aGlzLnN0YXJ0T25Ub3BPbkNhbnZhc0dyb3VwQ2hhbmdlID1cbiAgICAgICAgZmllbGRzLnN0YXJ0T25Ub3BPbkNhbnZhc0dyb3VwQ2hhbmdlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5zdGFydE9uVG9wT25DYW52YXNHcm91cENoYW5nZVxuICAgICAgICAgIDogdGhpcy5zdGFydE9uVG9wT25DYW52YXNHcm91cENoYW5nZTtcblxuICAgICAgdGhpcy5pc0Ryb3BFbmFibGVkID1cbiAgICAgICAgZmllbGRzLmlzRHJvcEVuYWJsZWQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmlzRHJvcEVuYWJsZWRcbiAgICAgICAgICA6IHRoaXMuaXNEcm9wRW5hYmxlZDtcblxuICAgICAgdGhpcy5pbml0UmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlID1cbiAgICAgICAgZmllbGRzLmluaXRSZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmluaXRSZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGVcbiAgICAgICAgICA6IHRoaXMuaW5pdFJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==