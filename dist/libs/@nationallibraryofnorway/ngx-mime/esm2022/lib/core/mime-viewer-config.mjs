import { RecognizedTextMode, ViewerMode } from './models';
import { ViewerLayout } from './models/viewer-layout';
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
        this.initRecognizedTextContentMode = RecognizedTextMode.NONE;
        this.ignorePhysicalScale = false;
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
            this.initRecognizedTextContentMode =
                fields.initRecognizedTextContentMode !== undefined
                    ? fields.initRecognizedTextContentMode
                    : this.initRecognizedTextContentMode;
            this.ignorePhysicalScale =
                fields.ignorePhysicalScale !== undefined
                    ? fields.ignorePhysicalScale
                    : this.ignorePhysicalScale;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS12aWV3ZXItY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbWltZS12aWV3ZXItY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRELE1BQU0sT0FBTyxnQkFBZ0I7SUFvQjNCLFlBQVksTUFlWDtRQWxDTSw2QkFBd0IsR0FBSSxJQUFJLENBQUM7UUFDakMsaUNBQTRCLEdBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkMsNkJBQXdCLEdBQUksSUFBSSxDQUFDO1FBQ2pDLG1CQUFjLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUNqQyxxQkFBZ0IsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ3pDLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQixzQkFBaUIsR0FJUixLQUFLLENBQUM7UUFDZixnQkFBVyxHQUFRLElBQUksQ0FBQztRQUN4QixvQ0FBK0IsR0FBRyxLQUFLLENBQUM7UUFDeEMsa0NBQTZCLEdBQUcsS0FBSyxDQUFDO1FBQ3RDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGtDQUE2QixHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQUN4RCx3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFrQmpDLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLHdCQUF3QjtnQkFDM0IsTUFBTSxDQUFDLHdCQUF3QixLQUFLLFNBQVM7b0JBQzNDLENBQUMsQ0FBQyxNQUFNLENBQUMsd0JBQXdCO29CQUNqQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDO1lBRXBDLElBQUksQ0FBQyw0QkFBNEI7Z0JBQy9CLE1BQU0sQ0FBQyw0QkFBNEI7b0JBQ25DLElBQUksQ0FBQyw0QkFBNEIsQ0FBQztZQUVwQyxJQUFJLENBQUMsd0JBQXdCO2dCQUMzQixNQUFNLENBQUMsd0JBQXdCLEtBQUssU0FBUztvQkFDM0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0I7b0JBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUM7WUFFcEMsSUFBSSxDQUFDLGNBQWM7Z0JBQ2pCLE1BQU0sQ0FBQyxjQUFjLEtBQUssU0FBUztvQkFDakMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjO29CQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUUxQixJQUFJLENBQUMsZ0JBQWdCO2dCQUNuQixNQUFNLENBQUMsZ0JBQWdCLEtBQUssU0FBUztvQkFDbkMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0I7b0JBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFFNUIsSUFBSSxDQUFDLGVBQWU7Z0JBQ2xCLE1BQU0sQ0FBQyxlQUFlLEtBQUssU0FBUztvQkFDbEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlO29CQUN4QixDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUUzQixJQUFJLENBQUMsaUJBQWlCO2dCQUNwQixNQUFNLENBQUMsaUJBQWlCLEtBQUssU0FBUztvQkFDcEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUI7b0JBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFN0IsSUFBSSxDQUFDLGlCQUFpQjtnQkFDcEIsTUFBTSxDQUFDLGlCQUFpQixLQUFLLFNBQVM7b0JBQ3BDLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCO29CQUMxQixDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBRTdCLElBQUksQ0FBQyxXQUFXO2dCQUNkLE1BQU0sQ0FBQyxXQUFXLEtBQUssU0FBUztvQkFDOUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXO29CQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUV2QixJQUFJLENBQUMsK0JBQStCO2dCQUNsQyxNQUFNLENBQUMsK0JBQStCLEtBQUssU0FBUztvQkFDbEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQywrQkFBK0I7b0JBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUM7WUFFM0MsSUFBSSxDQUFDLDZCQUE2QjtnQkFDaEMsTUFBTSxDQUFDLDZCQUE2QixLQUFLLFNBQVM7b0JBQ2hELENBQUMsQ0FBQyxNQUFNLENBQUMsNkJBQTZCO29CQUN0QyxDQUFDLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDO1lBRXpDLElBQUksQ0FBQyxhQUFhO2dCQUNoQixNQUFNLENBQUMsYUFBYSxLQUFLLFNBQVM7b0JBQ2hDLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYTtvQkFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7WUFFekIsSUFBSSxDQUFDLDZCQUE2QjtnQkFDaEMsTUFBTSxDQUFDLDZCQUE2QixLQUFLLFNBQVM7b0JBQ2hELENBQUMsQ0FBQyxNQUFNLENBQUMsNkJBQTZCO29CQUN0QyxDQUFDLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDO1lBRXpDLElBQUksQ0FBQyxtQkFBbUI7Z0JBQ3RCLE1BQU0sQ0FBQyxtQkFBbUIsS0FBSyxTQUFTO29CQUN0QyxDQUFDLENBQUMsTUFBTSxDQUFDLG1CQUFtQjtvQkFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztTQUNoQztJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlY29nbml6ZWRUZXh0TW9kZSwgVmlld2VyTW9kZSB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IFZpZXdlckxheW91dCB9IGZyb20gJy4vbW9kZWxzL3ZpZXdlci1sYXlvdXQnO1xuXG5leHBvcnQgY2xhc3MgTWltZVZpZXdlckNvbmZpZyB7XG4gIHB1YmxpYyBhdHRyaWJ1dGlvbkRpYWxvZ0VuYWJsZWQ/ID0gdHJ1ZTtcbiAgcHVibGljIGF0dHJpYnV0aW9uRGlhbG9nSGlkZVRpbWVvdXQ/ID0gLTE7XG4gIHB1YmxpYyBuYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQ/ID0gdHJ1ZTtcbiAgcHVibGljIGluaXRWaWV3ZXJNb2RlID0gVmlld2VyTW9kZS5QQUdFO1xuICBwdWJsaWMgaW5pdFZpZXdlckxheW91dCA9IFZpZXdlckxheW91dC5UV09fUEFHRTtcbiAgcHVibGljIHdpdGhDcmVkZW50aWFscyA9IGZhbHNlO1xuICBwdWJsaWMgbG9hZFRpbGVzV2l0aEFqYXggPSBmYWxzZTtcbiAgcHVibGljIGNyb3NzT3JpZ2luUG9saWN5OlxuICAgIHwgJ0Fub255bW91cydcbiAgICB8ICd1c2UtY3JlZGVudGlhbHMnXG4gICAgfCBmYWxzZVxuICAgIHwgdW5kZWZpbmVkID0gZmFsc2U7XG4gIHB1YmxpYyBhamF4SGVhZGVyczogYW55ID0gbnVsbDtcbiAgcHVibGljIHByZXNlcnZlWm9vbU9uQ2FudmFzR3JvdXBDaGFuZ2UgPSBmYWxzZTtcbiAgcHVibGljIHN0YXJ0T25Ub3BPbkNhbnZhc0dyb3VwQ2hhbmdlID0gZmFsc2U7XG4gIHB1YmxpYyBpc0Ryb3BFbmFibGVkID0gZmFsc2U7XG4gIHB1YmxpYyBpbml0UmVjb2duaXplZFRleHRDb250ZW50TW9kZSA9IFJlY29nbml6ZWRUZXh0TW9kZS5OT05FO1xuICBwdWJsaWMgaWdub3JlUGh5c2ljYWxTY2FsZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGZpZWxkcz86IHtcbiAgICBhdHRyaWJ1dGlvbkRpYWxvZ0VuYWJsZWQ/OiBib29sZWFuO1xuICAgIGF0dHJpYnV0aW9uRGlhbG9nSGlkZVRpbWVvdXQ/OiBudW1iZXI7XG4gICAgbmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkPzogYm9vbGVhbjtcbiAgICBpbml0Vmlld2VyTW9kZT86IFZpZXdlck1vZGU7XG4gICAgaW5pdFZpZXdlckxheW91dD86IFZpZXdlckxheW91dDtcbiAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xuICAgIGxvYWRUaWxlc1dpdGhBamF4PzogYm9vbGVhbjtcbiAgICBjcm9zc09yaWdpblBvbGljeT86ICdBbm9ueW1vdXMnIHwgJ3VzZS1jcmVkZW50aWFscycgfCBmYWxzZSB8IHVuZGVmaW5lZDtcbiAgICBhamF4SGVhZGVycz86IGFueTtcbiAgICBwcmVzZXJ2ZVpvb21PbkNhbnZhc0dyb3VwQ2hhbmdlPzogYm9vbGVhbjtcbiAgICBzdGFydE9uVG9wT25DYW52YXNHcm91cENoYW5nZT86IGJvb2xlYW47XG4gICAgaXNEcm9wRW5hYmxlZD86IGJvb2xlYW47XG4gICAgaW5pdFJlY29nbml6ZWRUZXh0Q29udGVudE1vZGU/OiBSZWNvZ25pemVkVGV4dE1vZGU7XG4gICAgaWdub3JlUGh5c2ljYWxTY2FsZT86IGJvb2xlYW47XG4gIH0pIHtcbiAgICBpZiAoZmllbGRzKSB7XG4gICAgICB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nRW5hYmxlZCA9XG4gICAgICAgIGZpZWxkcy5hdHRyaWJ1dGlvbkRpYWxvZ0VuYWJsZWQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmF0dHJpYnV0aW9uRGlhbG9nRW5hYmxlZFxuICAgICAgICAgIDogdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ0VuYWJsZWQ7XG5cbiAgICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dIaWRlVGltZW91dCA9XG4gICAgICAgIGZpZWxkcy5hdHRyaWJ1dGlvbkRpYWxvZ0hpZGVUaW1lb3V0IHx8XG4gICAgICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dIaWRlVGltZW91dDtcblxuICAgICAgdGhpcy5uYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQgPVxuICAgICAgICBmaWVsZHMubmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5uYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWRcbiAgICAgICAgICA6IHRoaXMubmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkO1xuXG4gICAgICB0aGlzLmluaXRWaWV3ZXJNb2RlID1cbiAgICAgICAgZmllbGRzLmluaXRWaWV3ZXJNb2RlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5pbml0Vmlld2VyTW9kZVxuICAgICAgICAgIDogdGhpcy5pbml0Vmlld2VyTW9kZTtcblxuICAgICAgdGhpcy5pbml0Vmlld2VyTGF5b3V0ID1cbiAgICAgICAgZmllbGRzLmluaXRWaWV3ZXJMYXlvdXQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmluaXRWaWV3ZXJMYXlvdXRcbiAgICAgICAgICA6IHRoaXMuaW5pdFZpZXdlckxheW91dDtcblxuICAgICAgdGhpcy53aXRoQ3JlZGVudGlhbHMgPVxuICAgICAgICBmaWVsZHMud2l0aENyZWRlbnRpYWxzICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy53aXRoQ3JlZGVudGlhbHNcbiAgICAgICAgICA6IHRoaXMud2l0aENyZWRlbnRpYWxzO1xuXG4gICAgICB0aGlzLmxvYWRUaWxlc1dpdGhBamF4ID1cbiAgICAgICAgZmllbGRzLmxvYWRUaWxlc1dpdGhBamF4ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5sb2FkVGlsZXNXaXRoQWpheFxuICAgICAgICAgIDogdGhpcy5sb2FkVGlsZXNXaXRoQWpheDtcblxuICAgICAgdGhpcy5jcm9zc09yaWdpblBvbGljeSA9XG4gICAgICAgIGZpZWxkcy5jcm9zc09yaWdpblBvbGljeSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMuY3Jvc3NPcmlnaW5Qb2xpY3lcbiAgICAgICAgICA6IHRoaXMuY3Jvc3NPcmlnaW5Qb2xpY3k7XG5cbiAgICAgIHRoaXMuYWpheEhlYWRlcnMgPVxuICAgICAgICBmaWVsZHMuYWpheEhlYWRlcnMgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmFqYXhIZWFkZXJzXG4gICAgICAgICAgOiB0aGlzLmFqYXhIZWFkZXJzO1xuXG4gICAgICB0aGlzLnByZXNlcnZlWm9vbU9uQ2FudmFzR3JvdXBDaGFuZ2UgPVxuICAgICAgICBmaWVsZHMucHJlc2VydmVab29tT25DYW52YXNHcm91cENoYW5nZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMucHJlc2VydmVab29tT25DYW52YXNHcm91cENoYW5nZVxuICAgICAgICAgIDogdGhpcy5wcmVzZXJ2ZVpvb21PbkNhbnZhc0dyb3VwQ2hhbmdlO1xuXG4gICAgICB0aGlzLnN0YXJ0T25Ub3BPbkNhbnZhc0dyb3VwQ2hhbmdlID1cbiAgICAgICAgZmllbGRzLnN0YXJ0T25Ub3BPbkNhbnZhc0dyb3VwQ2hhbmdlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5zdGFydE9uVG9wT25DYW52YXNHcm91cENoYW5nZVxuICAgICAgICAgIDogdGhpcy5zdGFydE9uVG9wT25DYW52YXNHcm91cENoYW5nZTtcblxuICAgICAgdGhpcy5pc0Ryb3BFbmFibGVkID1cbiAgICAgICAgZmllbGRzLmlzRHJvcEVuYWJsZWQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmlzRHJvcEVuYWJsZWRcbiAgICAgICAgICA6IHRoaXMuaXNEcm9wRW5hYmxlZDtcblxuICAgICAgdGhpcy5pbml0UmVjb2duaXplZFRleHRDb250ZW50TW9kZSA9XG4gICAgICAgIGZpZWxkcy5pbml0UmVjb2duaXplZFRleHRDb250ZW50TW9kZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMuaW5pdFJlY29nbml6ZWRUZXh0Q29udGVudE1vZGVcbiAgICAgICAgICA6IHRoaXMuaW5pdFJlY29nbml6ZWRUZXh0Q29udGVudE1vZGU7XG5cbiAgICAgIHRoaXMuaWdub3JlUGh5c2ljYWxTY2FsZSA9XG4gICAgICAgIGZpZWxkcy5pZ25vcmVQaHlzaWNhbFNjYWxlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5pZ25vcmVQaHlzaWNhbFNjYWxlXG4gICAgICAgICAgOiB0aGlzLmlnbm9yZVBoeXNpY2FsU2NhbGU7XG4gICAgfVxuICB9XG59XG4iXX0=