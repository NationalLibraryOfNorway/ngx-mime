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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS12aWV3ZXItY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbWltZS12aWV3ZXItY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRELE1BQU0sT0FBTyxnQkFBZ0I7SUFvQjNCLFlBQVksTUFlWDtRQWxDTSw2QkFBd0IsR0FBSSxJQUFJLENBQUM7UUFDakMsaUNBQTRCLEdBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkMsNkJBQXdCLEdBQUksSUFBSSxDQUFDO1FBQ2pDLG1CQUFjLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUNqQyxxQkFBZ0IsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ3pDLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQixzQkFBaUIsR0FJUixLQUFLLENBQUM7UUFDZixnQkFBVyxHQUFRLElBQUksQ0FBQztRQUN4QixvQ0FBK0IsR0FBRyxLQUFLLENBQUM7UUFDeEMsa0NBQTZCLEdBQUcsS0FBSyxDQUFDO1FBQ3RDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGtDQUE2QixHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQUN4RCx3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFrQmpDLElBQUksTUFBTSxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsd0JBQXdCO2dCQUMzQixNQUFNLENBQUMsd0JBQXdCLEtBQUssU0FBUztvQkFDM0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0I7b0JBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUM7WUFFcEMsSUFBSSxDQUFDLDRCQUE0QjtnQkFDL0IsTUFBTSxDQUFDLDRCQUE0QjtvQkFDbkMsSUFBSSxDQUFDLDRCQUE0QixDQUFDO1lBRXBDLElBQUksQ0FBQyx3QkFBd0I7Z0JBQzNCLE1BQU0sQ0FBQyx3QkFBd0IsS0FBSyxTQUFTO29CQUMzQyxDQUFDLENBQUMsTUFBTSxDQUFDLHdCQUF3QjtvQkFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztZQUVwQyxJQUFJLENBQUMsY0FBYztnQkFDakIsTUFBTSxDQUFDLGNBQWMsS0FBSyxTQUFTO29CQUNqQyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWM7b0JBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBRTFCLElBQUksQ0FBQyxnQkFBZ0I7Z0JBQ25CLE1BQU0sQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTO29CQUNuQyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQjtvQkFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUU1QixJQUFJLENBQUMsZUFBZTtnQkFDbEIsTUFBTSxDQUFDLGVBQWUsS0FBSyxTQUFTO29CQUNsQyxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWU7b0JBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBRTNCLElBQUksQ0FBQyxpQkFBaUI7Z0JBQ3BCLE1BQU0sQ0FBQyxpQkFBaUIsS0FBSyxTQUFTO29CQUNwQyxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQjtvQkFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUU3QixJQUFJLENBQUMsaUJBQWlCO2dCQUNwQixNQUFNLENBQUMsaUJBQWlCLEtBQUssU0FBUztvQkFDcEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUI7b0JBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFN0IsSUFBSSxDQUFDLFdBQVc7Z0JBQ2QsTUFBTSxDQUFDLFdBQVcsS0FBSyxTQUFTO29CQUM5QixDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVc7b0JBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBRXZCLElBQUksQ0FBQywrQkFBK0I7Z0JBQ2xDLE1BQU0sQ0FBQywrQkFBK0IsS0FBSyxTQUFTO29CQUNsRCxDQUFDLENBQUMsTUFBTSxDQUFDLCtCQUErQjtvQkFDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQztZQUUzQyxJQUFJLENBQUMsNkJBQTZCO2dCQUNoQyxNQUFNLENBQUMsNkJBQTZCLEtBQUssU0FBUztvQkFDaEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyw2QkFBNkI7b0JBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUM7WUFFekMsSUFBSSxDQUFDLGFBQWE7Z0JBQ2hCLE1BQU0sQ0FBQyxhQUFhLEtBQUssU0FBUztvQkFDaEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhO29CQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUV6QixJQUFJLENBQUMsNkJBQTZCO2dCQUNoQyxNQUFNLENBQUMsNkJBQTZCLEtBQUssU0FBUztvQkFDaEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyw2QkFBNkI7b0JBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUM7WUFFekMsSUFBSSxDQUFDLG1CQUFtQjtnQkFDdEIsTUFBTSxDQUFDLG1CQUFtQixLQUFLLFNBQVM7b0JBQ3RDLENBQUMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CO29CQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWNvZ25pemVkVGV4dE1vZGUsIFZpZXdlck1vZGUgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXQgfSBmcm9tICcuL21vZGVscy92aWV3ZXItbGF5b3V0JztcblxuZXhwb3J0IGNsYXNzIE1pbWVWaWV3ZXJDb25maWcge1xuICBwdWJsaWMgYXR0cmlidXRpb25EaWFsb2dFbmFibGVkPyA9IHRydWU7XG4gIHB1YmxpYyBhdHRyaWJ1dGlvbkRpYWxvZ0hpZGVUaW1lb3V0PyA9IC0xO1xuICBwdWJsaWMgbmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkPyA9IHRydWU7XG4gIHB1YmxpYyBpbml0Vmlld2VyTW9kZSA9IFZpZXdlck1vZGUuUEFHRTtcbiAgcHVibGljIGluaXRWaWV3ZXJMYXlvdXQgPSBWaWV3ZXJMYXlvdXQuVFdPX1BBR0U7XG4gIHB1YmxpYyB3aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcbiAgcHVibGljIGxvYWRUaWxlc1dpdGhBamF4ID0gZmFsc2U7XG4gIHB1YmxpYyBjcm9zc09yaWdpblBvbGljeTpcbiAgICB8ICdBbm9ueW1vdXMnXG4gICAgfCAndXNlLWNyZWRlbnRpYWxzJ1xuICAgIHwgZmFsc2VcbiAgICB8IHVuZGVmaW5lZCA9IGZhbHNlO1xuICBwdWJsaWMgYWpheEhlYWRlcnM6IGFueSA9IG51bGw7XG4gIHB1YmxpYyBwcmVzZXJ2ZVpvb21PbkNhbnZhc0dyb3VwQ2hhbmdlID0gZmFsc2U7XG4gIHB1YmxpYyBzdGFydE9uVG9wT25DYW52YXNHcm91cENoYW5nZSA9IGZhbHNlO1xuICBwdWJsaWMgaXNEcm9wRW5hYmxlZCA9IGZhbHNlO1xuICBwdWJsaWMgaW5pdFJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgPSBSZWNvZ25pemVkVGV4dE1vZGUuTk9ORTtcbiAgcHVibGljIGlnbm9yZVBoeXNpY2FsU2NhbGUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihmaWVsZHM/OiB7XG4gICAgYXR0cmlidXRpb25EaWFsb2dFbmFibGVkPzogYm9vbGVhbjtcbiAgICBhdHRyaWJ1dGlvbkRpYWxvZ0hpZGVUaW1lb3V0PzogbnVtYmVyO1xuICAgIG5hdmlnYXRpb25Db250cm9sRW5hYmxlZD86IGJvb2xlYW47XG4gICAgaW5pdFZpZXdlck1vZGU/OiBWaWV3ZXJNb2RlO1xuICAgIGluaXRWaWV3ZXJMYXlvdXQ/OiBWaWV3ZXJMYXlvdXQ7XG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgICBsb2FkVGlsZXNXaXRoQWpheD86IGJvb2xlYW47XG4gICAgY3Jvc3NPcmlnaW5Qb2xpY3k/OiAnQW5vbnltb3VzJyB8ICd1c2UtY3JlZGVudGlhbHMnIHwgZmFsc2UgfCB1bmRlZmluZWQ7XG4gICAgYWpheEhlYWRlcnM/OiBhbnk7XG4gICAgcHJlc2VydmVab29tT25DYW52YXNHcm91cENoYW5nZT86IGJvb2xlYW47XG4gICAgc3RhcnRPblRvcE9uQ2FudmFzR3JvdXBDaGFuZ2U/OiBib29sZWFuO1xuICAgIGlzRHJvcEVuYWJsZWQ/OiBib29sZWFuO1xuICAgIGluaXRSZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlPzogUmVjb2duaXplZFRleHRNb2RlO1xuICAgIGlnbm9yZVBoeXNpY2FsU2NhbGU/OiBib29sZWFuO1xuICB9KSB7XG4gICAgaWYgKGZpZWxkcykge1xuICAgICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ0VuYWJsZWQgPVxuICAgICAgICBmaWVsZHMuYXR0cmlidXRpb25EaWFsb2dFbmFibGVkICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5hdHRyaWJ1dGlvbkRpYWxvZ0VuYWJsZWRcbiAgICAgICAgICA6IHRoaXMuYXR0cmlidXRpb25EaWFsb2dFbmFibGVkO1xuXG4gICAgICB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nSGlkZVRpbWVvdXQgPVxuICAgICAgICBmaWVsZHMuYXR0cmlidXRpb25EaWFsb2dIaWRlVGltZW91dCB8fFxuICAgICAgICB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nSGlkZVRpbWVvdXQ7XG5cbiAgICAgIHRoaXMubmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkID1cbiAgICAgICAgZmllbGRzLm5hdmlnYXRpb25Db250cm9sRW5hYmxlZCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMubmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkXG4gICAgICAgICAgOiB0aGlzLm5hdmlnYXRpb25Db250cm9sRW5hYmxlZDtcblxuICAgICAgdGhpcy5pbml0Vmlld2VyTW9kZSA9XG4gICAgICAgIGZpZWxkcy5pbml0Vmlld2VyTW9kZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMuaW5pdFZpZXdlck1vZGVcbiAgICAgICAgICA6IHRoaXMuaW5pdFZpZXdlck1vZGU7XG5cbiAgICAgIHRoaXMuaW5pdFZpZXdlckxheW91dCA9XG4gICAgICAgIGZpZWxkcy5pbml0Vmlld2VyTGF5b3V0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5pbml0Vmlld2VyTGF5b3V0XG4gICAgICAgICAgOiB0aGlzLmluaXRWaWV3ZXJMYXlvdXQ7XG5cbiAgICAgIHRoaXMud2l0aENyZWRlbnRpYWxzID1cbiAgICAgICAgZmllbGRzLndpdGhDcmVkZW50aWFscyAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMud2l0aENyZWRlbnRpYWxzXG4gICAgICAgICAgOiB0aGlzLndpdGhDcmVkZW50aWFscztcblxuICAgICAgdGhpcy5sb2FkVGlsZXNXaXRoQWpheCA9XG4gICAgICAgIGZpZWxkcy5sb2FkVGlsZXNXaXRoQWpheCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMubG9hZFRpbGVzV2l0aEFqYXhcbiAgICAgICAgICA6IHRoaXMubG9hZFRpbGVzV2l0aEFqYXg7XG5cbiAgICAgIHRoaXMuY3Jvc3NPcmlnaW5Qb2xpY3kgPVxuICAgICAgICBmaWVsZHMuY3Jvc3NPcmlnaW5Qb2xpY3kgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmNyb3NzT3JpZ2luUG9saWN5XG4gICAgICAgICAgOiB0aGlzLmNyb3NzT3JpZ2luUG9saWN5O1xuXG4gICAgICB0aGlzLmFqYXhIZWFkZXJzID1cbiAgICAgICAgZmllbGRzLmFqYXhIZWFkZXJzICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5hamF4SGVhZGVyc1xuICAgICAgICAgIDogdGhpcy5hamF4SGVhZGVycztcblxuICAgICAgdGhpcy5wcmVzZXJ2ZVpvb21PbkNhbnZhc0dyb3VwQ2hhbmdlID1cbiAgICAgICAgZmllbGRzLnByZXNlcnZlWm9vbU9uQ2FudmFzR3JvdXBDaGFuZ2UgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLnByZXNlcnZlWm9vbU9uQ2FudmFzR3JvdXBDaGFuZ2VcbiAgICAgICAgICA6IHRoaXMucHJlc2VydmVab29tT25DYW52YXNHcm91cENoYW5nZTtcblxuICAgICAgdGhpcy5zdGFydE9uVG9wT25DYW52YXNHcm91cENoYW5nZSA9XG4gICAgICAgIGZpZWxkcy5zdGFydE9uVG9wT25DYW52YXNHcm91cENoYW5nZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMuc3RhcnRPblRvcE9uQ2FudmFzR3JvdXBDaGFuZ2VcbiAgICAgICAgICA6IHRoaXMuc3RhcnRPblRvcE9uQ2FudmFzR3JvdXBDaGFuZ2U7XG5cbiAgICAgIHRoaXMuaXNEcm9wRW5hYmxlZCA9XG4gICAgICAgIGZpZWxkcy5pc0Ryb3BFbmFibGVkICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGZpZWxkcy5pc0Ryb3BFbmFibGVkXG4gICAgICAgICAgOiB0aGlzLmlzRHJvcEVuYWJsZWQ7XG5cbiAgICAgIHRoaXMuaW5pdFJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgPVxuICAgICAgICBmaWVsZHMuaW5pdFJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLmluaXRSZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlXG4gICAgICAgICAgOiB0aGlzLmluaXRSZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlO1xuXG4gICAgICB0aGlzLmlnbm9yZVBoeXNpY2FsU2NhbGUgPVxuICAgICAgICBmaWVsZHMuaWdub3JlUGh5c2ljYWxTY2FsZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBmaWVsZHMuaWdub3JlUGh5c2ljYWxTY2FsZVxuICAgICAgICAgIDogdGhpcy5pZ25vcmVQaHlzaWNhbFNjYWxlO1xuICAgIH1cbiAgfVxufVxuIl19