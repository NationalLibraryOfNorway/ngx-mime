import { Dimensions } from '../core/models/dimensions';
export class MobileViewDialogConfigStrategy {
    getConfig(elementRef, viewContainerRef) {
        return {
            hasBackdrop: false,
            autoFocus: false,
            width: '100%',
            height: '100%',
            maxWidth: '100% !important',
            panelClass: 'view-panel',
            viewContainerRef: viewContainerRef,
        };
    }
}
export class DesktopViewDialogConfigStrategy {
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
    }
    getConfig(el, viewContainerRef) {
        const dimensions = this.getPosition(el);
        return {
            hasBackdrop: false,
            autoFocus: true,
            width: `${DesktopViewDialogConfigStrategy.dialogWidth}px`,
            position: {
                top: dimensions.top + 'px',
                left: dimensions.left + 'px',
            },
            panelClass: 'view-panel',
            maxWidth: '100% !important',
            viewContainerRef: viewContainerRef,
        };
    }
    getPosition(el) {
        const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
        return new Dimensions({
            top: dimensions.top + 64,
            left: dimensions.right -
                DesktopViewDialogConfigStrategy.dialogWidth -
                DesktopViewDialogConfigStrategy.paddingRight,
        });
    }
}
DesktopViewDialogConfigStrategy.dialogWidth = 250;
DesktopViewDialogConfigStrategy.paddingRight = 20;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXctZGlhbG9nL3ZpZXctZGlhbG9nLWNvbmZpZy1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFTdkQsTUFBTSxPQUFPLDhCQUE4QjtJQUdsQyxTQUFTLENBQ2QsVUFBc0IsRUFDdEIsZ0JBQWtDO1FBRWxDLE9BQU87WUFDTCxXQUFXLEVBQUUsS0FBSztZQUNsQixTQUFTLEVBQUUsS0FBSztZQUNoQixLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixVQUFVLEVBQUUsWUFBWTtZQUN4QixnQkFBZ0IsRUFBRSxnQkFBZ0I7U0FDbkMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTywrQkFBK0I7SUFPMUMsWUFBWSxhQUE0QjtRQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBRU0sU0FBUyxDQUNkLEVBQWMsRUFDZCxnQkFBa0M7UUFFbEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QyxPQUFPO1lBQ0wsV0FBVyxFQUFFLEtBQUs7WUFDbEIsU0FBUyxFQUFFLElBQUk7WUFDZixLQUFLLEVBQUUsR0FBRywrQkFBK0IsQ0FBQyxXQUFXLElBQUk7WUFDekQsUUFBUSxFQUFFO2dCQUNSLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxHQUFHLElBQUk7Z0JBQzFCLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUk7YUFDN0I7WUFDRCxVQUFVLEVBQUUsWUFBWTtZQUN4QixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLGdCQUFnQixFQUFFLGdCQUFnQjtTQUNuQyxDQUFDO0lBQ0osQ0FBQztJQUVPLFdBQVcsQ0FBQyxFQUFjO1FBQ2hDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLFVBQVUsQ0FBQztZQUNwQixHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUcsR0FBRyxFQUFFO1lBQ3hCLElBQUksRUFDRixVQUFVLENBQUMsS0FBSztnQkFDaEIsK0JBQStCLENBQUMsV0FBVztnQkFDM0MsK0JBQStCLENBQUMsWUFBWTtTQUMvQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQXBDc0IsMkNBQVcsR0FBRyxHQUFHLENBQUM7QUFDbEIsNENBQVksR0FBRyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dDb25maWcgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL2NvcmUvbWltZS1kb20taGVscGVyJztcbmltcG9ydCB7IERpbWVuc2lvbnMgfSBmcm9tICcuLi9jb3JlL21vZGVscy9kaW1lbnNpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3kge1xuICBnZXRDb25maWcoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZiB8IG51bGwsXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZlxuICApOiBNYXREaWFsb2dDb25maWc7XG59XG5cbmV4cG9ydCBjbGFzcyBNb2JpbGVWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3lcbiAgaW1wbGVtZW50cyBWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3lcbntcbiAgcHVibGljIGdldENvbmZpZyhcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWZcbiAgKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIG1heFdpZHRoOiAnMTAwJSAhaW1wb3J0YW50JyxcbiAgICAgIHBhbmVsQ2xhc3M6ICd2aWV3LXBhbmVsJyxcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHZpZXdDb250YWluZXJSZWYsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVza3RvcFZpZXdEaWFsb2dDb25maWdTdHJhdGVneVxuICBpbXBsZW1lbnRzIFZpZXdEaWFsb2dDb25maWdTdHJhdGVneVxue1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRpYWxvZ1dpZHRoID0gMjUwO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHBhZGRpbmdSaWdodCA9IDIwO1xuICBwcml2YXRlIG1pbWVEb21IZWxwZXI6IE1pbWVEb21IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IobWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlcikge1xuICAgIHRoaXMubWltZURvbUhlbHBlciA9IG1pbWVEb21IZWxwZXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29uZmlnKFxuICAgIGVsOiBFbGVtZW50UmVmLFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWZcbiAgKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5nZXRQb3NpdGlvbihlbCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcbiAgICAgIHdpZHRoOiBgJHtEZXNrdG9wVmlld0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5LmRpYWxvZ1dpZHRofXB4YCxcbiAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIHRvcDogZGltZW5zaW9ucy50b3AgKyAncHgnLFxuICAgICAgICBsZWZ0OiBkaW1lbnNpb25zLmxlZnQgKyAncHgnLFxuICAgICAgfSxcbiAgICAgIHBhbmVsQ2xhc3M6ICd2aWV3LXBhbmVsJyxcbiAgICAgIG1heFdpZHRoOiAnMTAwJSAhaW1wb3J0YW50JyxcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHZpZXdDb250YWluZXJSZWYsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UG9zaXRpb24oZWw6IEVsZW1lbnRSZWYpOiBEaW1lbnNpb25zIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5taW1lRG9tSGVscGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdChlbCk7XG4gICAgcmV0dXJuIG5ldyBEaW1lbnNpb25zKHtcbiAgICAgIHRvcDogZGltZW5zaW9ucy50b3AgKyA2NCxcbiAgICAgIGxlZnQ6XG4gICAgICAgIGRpbWVuc2lvbnMucmlnaHQgLVxuICAgICAgICBEZXNrdG9wVmlld0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5LmRpYWxvZ1dpZHRoIC1cbiAgICAgICAgRGVza3RvcFZpZXdEaWFsb2dDb25maWdTdHJhdGVneS5wYWRkaW5nUmlnaHQsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==