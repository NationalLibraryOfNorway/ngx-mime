import { Dimensions } from './../core/models/dimensions';
export class MobileInformationDialogConfigStrategy {
    getConfig(elementRef, viewContainerRef) {
        return {
            hasBackdrop: false,
            width: '100%',
            height: '100%',
            maxWidth: '100% !important',
            panelClass: ['mime-mobile-dialog', 'mime-dialog', 'information-panel'],
            viewContainerRef: viewContainerRef,
        };
    }
}
export class DesktopInformationDialogConfigStrategy {
    static { this.dialogWidth = 350; }
    static { this.paddingRight = 16; }
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
    }
    getConfig(el, viewContainerRef) {
        const dimensions = this.getPosition(el);
        return {
            hasBackdrop: false,
            width: `${DesktopInformationDialogConfigStrategy.dialogWidth}px`,
            position: {
                top: dimensions.top + 'px',
                left: dimensions.left + 'px',
            },
            maxWidth: '100% !important',
            panelClass: ['mime-dialog', 'information-panel'],
            viewContainerRef: viewContainerRef,
        };
    }
    getPosition(el) {
        const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
        return new Dimensions({
            top: dimensions.top + 80,
            left: dimensions.right -
                DesktopInformationDialogConfigStrategy.dialogWidth -
                DesktopInformationDialogConfigStrategy.paddingRight,
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tZGlhbG9nLWNvbmZpZy1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9pbmZvcm1hdGlvbi1kaWFsb2cvaW5mb3JtYXRpb24tZGlhbG9nLWNvbmZpZy1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFTekQsTUFBTSxPQUFPLHFDQUFxQztJQUd6QyxTQUFTLENBQ2QsVUFBc0IsRUFDdEIsZ0JBQWtDO1FBRWxDLE9BQU87WUFDTCxXQUFXLEVBQUUsS0FBSztZQUNsQixLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixVQUFVLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLENBQUM7WUFDdEUsZ0JBQWdCLEVBQUUsZ0JBQWdCO1NBQ25DLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sc0NBQXNDO2FBRzFCLGdCQUFXLEdBQUcsR0FBRyxDQUFDO2FBQ2xCLGlCQUFZLEdBQUcsRUFBRSxDQUFDO0lBR3pDLFlBQVksYUFBNEI7UUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDckMsQ0FBQztJQUVNLFNBQVMsQ0FDZCxFQUFjLEVBQ2QsZ0JBQWtDO1FBRWxDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsT0FBTztZQUNMLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLEtBQUssRUFBRSxHQUFHLHNDQUFzQyxDQUFDLFdBQVcsSUFBSTtZQUNoRSxRQUFRLEVBQUU7Z0JBQ1IsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSTtnQkFDMUIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSTthQUM3QjtZQUNELFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsVUFBVSxFQUFFLENBQUMsYUFBYSxFQUFFLG1CQUFtQixDQUFDO1lBQ2hELGdCQUFnQixFQUFFLGdCQUFnQjtTQUNuQyxDQUFDO0lBQ0osQ0FBQztJQUNPLFdBQVcsQ0FBQyxFQUFjO1FBQ2hDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLFVBQVUsQ0FBQztZQUNwQixHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUcsR0FBRyxFQUFFO1lBQ3hCLElBQUksRUFDRixVQUFVLENBQUMsS0FBSztnQkFDaEIsc0NBQXNDLENBQUMsV0FBVztnQkFDbEQsc0NBQXNDLENBQUMsWUFBWTtTQUN0RCxDQUFDLENBQUM7SUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IE1pbWVEb21IZWxwZXIgfSBmcm9tICcuLi9jb3JlL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQgeyBEaW1lbnNpb25zIH0gZnJvbSAnLi8uLi9jb3JlL21vZGVscy9kaW1lbnNpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5IHtcbiAgZ2V0Q29uZmlnKFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgKTogTWF0RGlhbG9nQ29uZmlnO1xufVxuXG5leHBvcnQgY2xhc3MgTW9iaWxlSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneVxuICBpbXBsZW1lbnRzIEluZm9ybWF0aW9uRGlhbG9nQ29uZmlnU3RyYXRlZ3lcbntcbiAgcHVibGljIGdldENvbmZpZyhcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICk6IE1hdERpYWxvZ0NvbmZpZyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIG1heFdpZHRoOiAnMTAwJSAhaW1wb3J0YW50JyxcbiAgICAgIHBhbmVsQ2xhc3M6IFsnbWltZS1tb2JpbGUtZGlhbG9nJywgJ21pbWUtZGlhbG9nJywgJ2luZm9ybWF0aW9uLXBhbmVsJ10sXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB2aWV3Q29udGFpbmVyUmVmLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlc2t0b3BJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5XG4gIGltcGxlbWVudHMgSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneVxue1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRpYWxvZ1dpZHRoID0gMzUwO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHBhZGRpbmdSaWdodCA9IDE2O1xuICBwcml2YXRlIG1pbWVEb21IZWxwZXI6IE1pbWVEb21IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IobWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlcikge1xuICAgIHRoaXMubWltZURvbUhlbHBlciA9IG1pbWVEb21IZWxwZXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29uZmlnKFxuICAgIGVsOiBFbGVtZW50UmVmLFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICk6IE1hdERpYWxvZ0NvbmZpZyB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMuZ2V0UG9zaXRpb24oZWwpO1xuICAgIHJldHVybiB7XG4gICAgICBoYXNCYWNrZHJvcDogZmFsc2UsXG4gICAgICB3aWR0aDogYCR7RGVza3RvcEluZm9ybWF0aW9uRGlhbG9nQ29uZmlnU3RyYXRlZ3kuZGlhbG9nV2lkdGh9cHhgLFxuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgdG9wOiBkaW1lbnNpb25zLnRvcCArICdweCcsXG4gICAgICAgIGxlZnQ6IGRpbWVuc2lvbnMubGVmdCArICdweCcsXG4gICAgICB9LFxuICAgICAgbWF4V2lkdGg6ICcxMDAlICFpbXBvcnRhbnQnLFxuICAgICAgcGFuZWxDbGFzczogWydtaW1lLWRpYWxvZycsICdpbmZvcm1hdGlvbi1wYW5lbCddLFxuICAgICAgdmlld0NvbnRhaW5lclJlZjogdmlld0NvbnRhaW5lclJlZixcbiAgICB9O1xuICB9XG4gIHByaXZhdGUgZ2V0UG9zaXRpb24oZWw6IEVsZW1lbnRSZWYpOiBEaW1lbnNpb25zIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5taW1lRG9tSGVscGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdChlbCk7XG4gICAgcmV0dXJuIG5ldyBEaW1lbnNpb25zKHtcbiAgICAgIHRvcDogZGltZW5zaW9ucy50b3AgKyA4MCxcbiAgICAgIGxlZnQ6XG4gICAgICAgIGRpbWVuc2lvbnMucmlnaHQgLVxuICAgICAgICBEZXNrdG9wSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneS5kaWFsb2dXaWR0aCAtXG4gICAgICAgIERlc2t0b3BJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5LnBhZGRpbmdSaWdodCxcbiAgICB9KTtcbiAgfVxufVxuIl19