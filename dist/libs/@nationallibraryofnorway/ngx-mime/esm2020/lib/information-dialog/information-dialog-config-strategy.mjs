import { Dimensions } from './../core/models/dimensions';
export class MobileInformationDialogConfigStrategy {
    getConfig(elementRef) {
        return {
            hasBackdrop: false,
            disableClose: false,
            width: '100%',
            height: '100%',
            maxWidth: '100% !important',
            panelClass: 'information-panel',
        };
    }
}
export class DesktopInformationDialogConfigStrategy {
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
    }
    getConfig(el) {
        const dimensions = this.getPosition(el);
        return {
            hasBackdrop: false,
            disableClose: false,
            width: `${DesktopInformationDialogConfigStrategy.dialogWidth}px`,
            position: {
                top: dimensions.top + 'px',
                left: dimensions.left + 'px',
            },
            maxWidth: '100% !important',
            panelClass: 'information-panel',
        };
    }
    getPosition(el) {
        const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
        return new Dimensions({
            top: dimensions.top + 64,
            left: dimensions.right -
                DesktopInformationDialogConfigStrategy.dialogWidth -
                DesktopInformationDialogConfigStrategy.paddingRight,
        });
    }
}
DesktopInformationDialogConfigStrategy.dialogWidth = 350;
DesktopInformationDialogConfigStrategy.paddingRight = 20;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tZGlhbG9nLWNvbmZpZy1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9pbmZvcm1hdGlvbi1kaWFsb2cvaW5mb3JtYXRpb24tZGlhbG9nLWNvbmZpZy1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFNekQsTUFBTSxPQUFPLHFDQUFxQztJQUd6QyxTQUFTLENBQUMsVUFBc0I7UUFDckMsT0FBTztZQUNMLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFlBQVksRUFBRSxLQUFLO1lBQ25CLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFVBQVUsRUFBRSxtQkFBbUI7U0FDaEMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxzQ0FBc0M7SUFPakQsWUFBWSxhQUE0QjtRQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBRU0sU0FBUyxDQUFDLEVBQWM7UUFDN0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QyxPQUFPO1lBQ0wsV0FBVyxFQUFFLEtBQUs7WUFDbEIsWUFBWSxFQUFFLEtBQUs7WUFDbkIsS0FBSyxFQUFFLEdBQUcsc0NBQXNDLENBQUMsV0FBVyxJQUFJO1lBQ2hFLFFBQVEsRUFBRTtnQkFDUixHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUcsR0FBRyxJQUFJO2dCQUMxQixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJO2FBQzdCO1lBQ0QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixVQUFVLEVBQUUsbUJBQW1CO1NBQ2hDLENBQUM7SUFDSixDQUFDO0lBRU8sV0FBVyxDQUFDLEVBQWM7UUFDaEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRSxPQUFPLElBQUksVUFBVSxDQUFDO1lBQ3BCLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxHQUFHLEVBQUU7WUFDeEIsSUFBSSxFQUNGLFVBQVUsQ0FBQyxLQUFLO2dCQUNoQixzQ0FBc0MsQ0FBQyxXQUFXO2dCQUNsRCxzQ0FBc0MsQ0FBQyxZQUFZO1NBQ3RELENBQUMsQ0FBQztJQUNMLENBQUM7O0FBaENzQixrREFBVyxHQUFHLEdBQUcsQ0FBQztBQUNsQixtREFBWSxHQUFHLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ0NvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBNaW1lRG9tSGVscGVyIH0gZnJvbSAnLi8uLi9jb3JlL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQgeyBEaW1lbnNpb25zIH0gZnJvbSAnLi8uLi9jb3JlL21vZGVscy9kaW1lbnNpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5IHtcbiAgZ2V0Q29uZmlnKGVsZW1lbnRSZWY/OiBFbGVtZW50UmVmKTogTWF0RGlhbG9nQ29uZmlnO1xufVxuXG5leHBvcnQgY2xhc3MgTW9iaWxlSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneVxuICBpbXBsZW1lbnRzIEluZm9ybWF0aW9uRGlhbG9nQ29uZmlnU3RyYXRlZ3lcbntcbiAgcHVibGljIGdldENvbmZpZyhlbGVtZW50UmVmOiBFbGVtZW50UmVmKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgZGlzYWJsZUNsb3NlOiBmYWxzZSxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIG1heFdpZHRoOiAnMTAwJSAhaW1wb3J0YW50JyxcbiAgICAgIHBhbmVsQ2xhc3M6ICdpbmZvcm1hdGlvbi1wYW5lbCcsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVza3RvcEluZm9ybWF0aW9uRGlhbG9nQ29uZmlnU3RyYXRlZ3lcbiAgaW1wbGVtZW50cyBJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5XG57XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGlhbG9nV2lkdGggPSAzNTA7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgcGFkZGluZ1JpZ2h0ID0gMjA7XG4gIHByaXZhdGUgbWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlcjtcblxuICBjb25zdHJ1Y3RvcihtaW1lRG9tSGVscGVyOiBNaW1lRG9tSGVscGVyKSB7XG4gICAgdGhpcy5taW1lRG9tSGVscGVyID0gbWltZURvbUhlbHBlcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25maWcoZWw6IEVsZW1lbnRSZWYpOiBNYXREaWFsb2dDb25maWcge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLmdldFBvc2l0aW9uKGVsKTtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgZGlzYWJsZUNsb3NlOiBmYWxzZSxcbiAgICAgIHdpZHRoOiBgJHtEZXNrdG9wSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneS5kaWFsb2dXaWR0aH1weGAsXG4gICAgICBwb3NpdGlvbjoge1xuICAgICAgICB0b3A6IGRpbWVuc2lvbnMudG9wICsgJ3B4JyxcbiAgICAgICAgbGVmdDogZGltZW5zaW9ucy5sZWZ0ICsgJ3B4JyxcbiAgICAgIH0sXG4gICAgICBtYXhXaWR0aDogJzEwMCUgIWltcG9ydGFudCcsXG4gICAgICBwYW5lbENsYXNzOiAnaW5mb3JtYXRpb24tcGFuZWwnLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldFBvc2l0aW9uKGVsOiBFbGVtZW50UmVmKTogRGltZW5zaW9ucyB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMubWltZURvbUhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoZWwpO1xuICAgIHJldHVybiBuZXcgRGltZW5zaW9ucyh7XG4gICAgICB0b3A6IGRpbWVuc2lvbnMudG9wICsgNjQsXG4gICAgICBsZWZ0OlxuICAgICAgICBkaW1lbnNpb25zLnJpZ2h0IC1cbiAgICAgICAgRGVza3RvcEluZm9ybWF0aW9uRGlhbG9nQ29uZmlnU3RyYXRlZ3kuZGlhbG9nV2lkdGggLVxuICAgICAgICBEZXNrdG9wSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneS5wYWRkaW5nUmlnaHQsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==