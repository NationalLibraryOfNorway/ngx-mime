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
            this.initRecognizedTextContentToggle =
                fields.initRecognizedTextContentToggle !== undefined
                    ? fields.initRecognizedTextContentToggle
                    : this.initRecognizedTextContentToggle;
            this.ignorePhysicalScale =
                fields.ignorePhysicalScale !== undefined
                    ? fields.ignorePhysicalScale
                    : this.ignorePhysicalScale;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS12aWV3ZXItY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbWltZS12aWV3ZXItY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsTUFBTSxPQUFPLGdCQUFnQjtJQW9CM0IsWUFBWSxNQWVYO1FBbENNLDZCQUF3QixHQUFJLElBQUksQ0FBQztRQUNqQyxpQ0FBNEIsR0FBSSxDQUFDLENBQUMsQ0FBQztRQUNuQyw2QkFBd0IsR0FBSSxJQUFJLENBQUM7UUFDakMsbUJBQWMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ2pDLHFCQUFnQixHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDekMsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLHNCQUFpQixHQUlSLEtBQUssQ0FBQztRQUNmLGdCQUFXLEdBQVEsSUFBSSxDQUFDO1FBQ3hCLG9DQUErQixHQUFHLEtBQUssQ0FBQztRQUN4QyxrQ0FBNkIsR0FBRyxLQUFLLENBQUM7UUFDdEMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsb0NBQStCLEdBQUcsS0FBSyxDQUFDO1FBQ3hDLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQWtCakMsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsd0JBQXdCO2dCQUMzQixNQUFNLENBQUMsd0JBQXdCLEtBQUssU0FBUztvQkFDM0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0I7b0JBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUM7WUFFcEMsSUFBSSxDQUFDLDRCQUE0QjtnQkFDL0IsTUFBTSxDQUFDLDRCQUE0QjtvQkFDbkMsSUFBSSxDQUFDLDRCQUE0QixDQUFDO1lBRXBDLElBQUksQ0FBQyx3QkFBd0I7Z0JBQzNCLE1BQU0sQ0FBQyx3QkFBd0IsS0FBSyxTQUFTO29CQUMzQyxDQUFDLENBQUMsTUFBTSxDQUFDLHdCQUF3QjtvQkFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztZQUVwQyxJQUFJLENBQUMsY0FBYztnQkFDakIsTUFBTSxDQUFDLGNBQWMsS0FBSyxTQUFTO29CQUNqQyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWM7b0JBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBRTFCLElBQUksQ0FBQyxnQkFBZ0I7Z0JBQ25CLE1BQU0sQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTO29CQUNuQyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQjtvQkFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUU1QixJQUFJLENBQUMsZUFBZTtnQkFDbEIsTUFBTSxDQUFDLGVBQWUsS0FBSyxTQUFTO29CQUNsQyxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWU7b0JBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBRTNCLElBQUksQ0FBQyxpQkFBaUI7Z0JBQ3BCLE1BQU0sQ0FBQyxpQkFBaUIsS0FBSyxTQUFTO29CQUNwQyxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQjtvQkFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUU3QixJQUFJLENBQUMsaUJBQWlCO2dCQUNwQixNQUFNLENBQUMsaUJBQWlCLEtBQUssU0FBUztvQkFDcEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUI7b0JBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFN0IsSUFBSSxDQUFDLFdBQVc7Z0JBQ2QsTUFBTSxDQUFDLFdBQVcsS0FBSyxTQUFTO29CQUM5QixDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVc7b0JBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBRXZCLElBQUksQ0FBQywrQkFBK0I7Z0JBQ2xDLE1BQU0sQ0FBQywrQkFBK0IsS0FBSyxTQUFTO29CQUNsRCxDQUFDLENBQUMsTUFBTSxDQUFDLCtCQUErQjtvQkFDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQztZQUUzQyxJQUFJLENBQUMsNkJBQTZCO2dCQUNoQyxNQUFNLENBQUMsNkJBQTZCLEtBQUssU0FBUztvQkFDaEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyw2QkFBNkI7b0JBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUM7WUFFekMsSUFBSSxDQUFDLGFBQWE7Z0JBQ2hCLE1BQU0sQ0FBQyxhQUFhLEtBQUssU0FBUztvQkFDaEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhO29CQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUV6QixJQUFJLENBQUMsK0JBQStCO2dCQUNsQyxNQUFNLENBQUMsK0JBQStCLEtBQUssU0FBUztvQkFDbEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQywrQkFBK0I7b0JBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUM7WUFFM0MsSUFBSSxDQUFDLG1CQUFtQjtnQkFDdEIsTUFBTSxDQUFDLG1CQUFtQixLQUFLLFNBQVM7b0JBQ3RDLENBQUMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CO29CQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlld2VyTGF5b3V0IH0gZnJvbSAnLi9tb2RlbHMvdmlld2VyLWxheW91dCc7XG5pbXBvcnQgeyBWaWV3ZXJNb2RlIH0gZnJvbSAnLi9tb2RlbHMvdmlld2VyLW1vZGUnO1xuXG5leHBvcnQgY2xhc3MgTWltZVZpZXdlckNvbmZpZyB7XG4gIHB1YmxpYyBhdHRyaWJ1dGlvbkRpYWxvZ0VuYWJsZWQ/ID0gdHJ1ZTtcbiAgcHVibGljIGF0dHJpYnV0aW9uRGlhbG9nSGlkZVRpbWVvdXQ/ID0gLTE7XG4gIHB1YmxpYyBuYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQ/ID0gdHJ1ZTtcbiAgcHVibGljIGluaXRWaWV3ZXJNb2RlID0gVmlld2VyTW9kZS5QQUdFO1xuICBwdWJsaWMgaW5pdFZpZXdlckxheW91dCA9IFZpZXdlckxheW91dC5UV09fUEFHRTtcbiAgcHVibGljIHdpdGhDcmVkZW50aWFscyA9IGZhbHNlO1xuICBwdWJsaWMgbG9hZFRpbGVzV2l0aEFqYXggPSBmYWxzZTtcbiAgcHVibGljIGNyb3NzT3JpZ2luUG9saWN5OlxuICAgIHwgJ0Fub255bW91cydcbiAgICB8ICd1c2UtY3JlZGVudGlhbHMnXG4gICAgfCBmYWxzZVxuICAgIHwgdW5kZWZpbmVkID0gZmFsc2U7XG4gIHB1YmxpYyBhamF4SGVhZGVyczogYW55ID0gbnVsbDtcbiAgcHVibGljIHByZXNlcnZlWm9vbU9uQ2FudmFzR3JvdXBDaGFuZ2UgPSBmYWxzZTtcbiAgcHVibGljIHN0YXJ0T25Ub3BPbkNhbnZhc0dyb3VwQ2hhbmdlID0gZmFsc2U7XG4gIHB1YmxpYyBpc0Ryb3BFbmFibGVkID0gZmFsc2U7XG4gIHB1YmxpYyBpbml0UmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlID0gZmFsc2U7XG4gIHB1YmxpYyBpZ25vcmVQaHlzaWNhbFNjYWxlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZmllbGRzPzoge1xuICAgIGF0dHJpYnV0aW9uRGlhbG9nRW5hYmxlZD86IGJvb2xlYW47XG4gICAgYXR0cmlidXRpb25EaWFsb2dIaWRlVGltZW91dD86IG51bWJlcjtcbiAgICBuYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQ/OiBib29sZWFuO1xuICAgIGluaXRWaWV3ZXJNb2RlPzogVmlld2VyTW9kZTtcbiAgICBpbml0Vmlld2VyTGF5b3V0PzogVmlld2VyTGF5b3V0O1xuICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XG4gICAgbG9hZFRpbGVzV2l0aEFqYXg/OiBib29sZWFuO1xuICAgIGNyb3NzT3JpZ2luUG9saWN5PzogJ0Fub255bW91cycgfCAndXNlLWNyZWRlbnRpYWxzJyB8IGZhbHNlIHwgdW5kZWZpbmVkO1xuICAgIGFqYXhIZWFkZXJzPzogYW55O1xuICAgIHByZXNlcnZlWm9vbU9uQ2FudmFzR3JvdXBDaGFuZ2U/OiBib29sZWFuO1xuICAgIHN0YXJ0T25Ub3BPbkNhbnZhc0dyb3VwQ2hhbmdlPzogYm9vbGVhbjtcbiAgICBpc0Ryb3BFbmFibGVkPzogYm9vbGVhbjtcbiAgICBpbml0UmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlPzogYm9vbGVhbjtcbiAgICBpZ25vcmVQaHlzaWNhbFNjYWxlPzogYm9vbGVhbjtcbiAgfSkge1xuICAgIGlmIChmaWVsZHMpIHtcbiAgICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dFbmFibGVkID1cbiAgICAgICAgZmllbGRzLmF0dHJpYnV0aW9uRGlhbG9nRW5hYmxlZCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMuYXR0cmlidXRpb25EaWFsb2dFbmFibGVkXG4gICAgICAgICAgOiB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nRW5hYmxlZDtcblxuICAgICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ0hpZGVUaW1lb3V0ID1cbiAgICAgICAgZmllbGRzLmF0dHJpYnV0aW9uRGlhbG9nSGlkZVRpbWVvdXQgfHxcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ0hpZGVUaW1lb3V0O1xuXG4gICAgICB0aGlzLm5hdmlnYXRpb25Db250cm9sRW5hYmxlZCA9XG4gICAgICAgIGZpZWxkcy5uYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLm5hdmlnYXRpb25Db250cm9sRW5hYmxlZFxuICAgICAgICAgIDogdGhpcy5uYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQ7XG5cbiAgICAgIHRoaXMuaW5pdFZpZXdlck1vZGUgPVxuICAgICAgICBmaWVsZHMuaW5pdFZpZXdlck1vZGUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmluaXRWaWV3ZXJNb2RlXG4gICAgICAgICAgOiB0aGlzLmluaXRWaWV3ZXJNb2RlO1xuXG4gICAgICB0aGlzLmluaXRWaWV3ZXJMYXlvdXQgPVxuICAgICAgICBmaWVsZHMuaW5pdFZpZXdlckxheW91dCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMuaW5pdFZpZXdlckxheW91dFxuICAgICAgICAgIDogdGhpcy5pbml0Vmlld2VyTGF5b3V0O1xuXG4gICAgICB0aGlzLndpdGhDcmVkZW50aWFscyA9XG4gICAgICAgIGZpZWxkcy53aXRoQ3JlZGVudGlhbHMgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLndpdGhDcmVkZW50aWFsc1xuICAgICAgICAgIDogdGhpcy53aXRoQ3JlZGVudGlhbHM7XG5cbiAgICAgIHRoaXMubG9hZFRpbGVzV2l0aEFqYXggPVxuICAgICAgICBmaWVsZHMubG9hZFRpbGVzV2l0aEFqYXggIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmxvYWRUaWxlc1dpdGhBamF4XG4gICAgICAgICAgOiB0aGlzLmxvYWRUaWxlc1dpdGhBamF4O1xuXG4gICAgICB0aGlzLmNyb3NzT3JpZ2luUG9saWN5ID1cbiAgICAgICAgZmllbGRzLmNyb3NzT3JpZ2luUG9saWN5ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5jcm9zc09yaWdpblBvbGljeVxuICAgICAgICAgIDogdGhpcy5jcm9zc09yaWdpblBvbGljeTtcblxuICAgICAgdGhpcy5hamF4SGVhZGVycyA9XG4gICAgICAgIGZpZWxkcy5hamF4SGVhZGVycyAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMuYWpheEhlYWRlcnNcbiAgICAgICAgICA6IHRoaXMuYWpheEhlYWRlcnM7XG5cbiAgICAgIHRoaXMucHJlc2VydmVab29tT25DYW52YXNHcm91cENoYW5nZSA9XG4gICAgICAgIGZpZWxkcy5wcmVzZXJ2ZVpvb21PbkNhbnZhc0dyb3VwQ2hhbmdlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5wcmVzZXJ2ZVpvb21PbkNhbnZhc0dyb3VwQ2hhbmdlXG4gICAgICAgICAgOiB0aGlzLnByZXNlcnZlWm9vbU9uQ2FudmFzR3JvdXBDaGFuZ2U7XG5cbiAgICAgIHRoaXMuc3RhcnRPblRvcE9uQ2FudmFzR3JvdXBDaGFuZ2UgPVxuICAgICAgICBmaWVsZHMuc3RhcnRPblRvcE9uQ2FudmFzR3JvdXBDaGFuZ2UgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLnN0YXJ0T25Ub3BPbkNhbnZhc0dyb3VwQ2hhbmdlXG4gICAgICAgICAgOiB0aGlzLnN0YXJ0T25Ub3BPbkNhbnZhc0dyb3VwQ2hhbmdlO1xuXG4gICAgICB0aGlzLmlzRHJvcEVuYWJsZWQgPVxuICAgICAgICBmaWVsZHMuaXNEcm9wRW5hYmxlZCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMuaXNEcm9wRW5hYmxlZFxuICAgICAgICAgIDogdGhpcy5pc0Ryb3BFbmFibGVkO1xuXG4gICAgICB0aGlzLmluaXRSZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGUgPVxuICAgICAgICBmaWVsZHMuaW5pdFJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMuaW5pdFJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZVxuICAgICAgICAgIDogdGhpcy5pbml0UmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlO1xuXG4gICAgICB0aGlzLmlnbm9yZVBoeXNpY2FsU2NhbGUgPVxuICAgICAgICBmaWVsZHMuaWdub3JlUGh5c2ljYWxTY2FsZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMuaWdub3JlUGh5c2ljYWxTY2FsZVxuICAgICAgICAgIDogdGhpcy5pZ25vcmVQaHlzaWNhbFNjYWxlO1xuICAgIH1cbiAgfVxufVxuIl19