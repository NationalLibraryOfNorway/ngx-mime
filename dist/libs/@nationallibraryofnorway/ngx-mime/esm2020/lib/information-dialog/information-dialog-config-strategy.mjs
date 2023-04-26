import { Dimensions } from './../core/models/dimensions';
export class MobileInformationDialogConfigStrategy {
    getConfig(elementRef, viewContainerRef) {
        return {
            hasBackdrop: false,
            width: '100%',
            height: '100%',
            maxWidth: '100% !important',
            panelClass: 'information-panel',
            viewContainerRef: viewContainerRef,
        };
    }
}
export class DesktopInformationDialogConfigStrategy {
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
            panelClass: 'information-panel',
            viewContainerRef: viewContainerRef,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tZGlhbG9nLWNvbmZpZy1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9pbmZvcm1hdGlvbi1kaWFsb2cvaW5mb3JtYXRpb24tZGlhbG9nLWNvbmZpZy1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFTekQsTUFBTSxPQUFPLHFDQUFxQztJQUd6QyxTQUFTLENBQ2QsVUFBc0IsRUFDdEIsZ0JBQWtDO1FBRWxDLE9BQU87WUFDTCxXQUFXLEVBQUUsS0FBSztZQUNsQixLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixVQUFVLEVBQUUsbUJBQW1CO1lBQy9CLGdCQUFnQixFQUFFLGdCQUFnQjtTQUNuQyxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLHNDQUFzQztJQU9qRCxZQUFZLGFBQTRCO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxTQUFTLENBQ2QsRUFBYyxFQUNkLGdCQUFrQztRQUVsQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLE9BQU87WUFDTCxXQUFXLEVBQUUsS0FBSztZQUNsQixLQUFLLEVBQUUsR0FBRyxzQ0FBc0MsQ0FBQyxXQUFXLElBQUk7WUFDaEUsUUFBUSxFQUFFO2dCQUNSLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxHQUFHLElBQUk7Z0JBQzFCLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUk7YUFDN0I7WUFDRCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFVBQVUsRUFBRSxtQkFBbUI7WUFDL0IsZ0JBQWdCLEVBQUUsZ0JBQWdCO1NBQ25DLENBQUM7SUFDSixDQUFDO0lBQ08sV0FBVyxDQUFDLEVBQWM7UUFDaEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRSxPQUFPLElBQUksVUFBVSxDQUFDO1lBQ3BCLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxHQUFHLEVBQUU7WUFDeEIsSUFBSSxFQUNGLFVBQVUsQ0FBQyxLQUFLO2dCQUNoQixzQ0FBc0MsQ0FBQyxXQUFXO2dCQUNsRCxzQ0FBc0MsQ0FBQyxZQUFZO1NBQ3RELENBQUMsQ0FBQztJQUNMLENBQUM7O0FBbENzQixrREFBVyxHQUFHLEdBQUcsQ0FBQztBQUNsQixtREFBWSxHQUFHLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ0NvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBNaW1lRG9tSGVscGVyIH0gZnJvbSAnLi4vY29yZS9taW1lLWRvbS1oZWxwZXInO1xuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4vLi4vY29yZS9tb2RlbHMvZGltZW5zaW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneSB7XG4gIGdldENvbmZpZyhcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWZcbiAgKTogTWF0RGlhbG9nQ29uZmlnO1xufVxuXG5leHBvcnQgY2xhc3MgTW9iaWxlSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneVxuICBpbXBsZW1lbnRzIEluZm9ybWF0aW9uRGlhbG9nQ29uZmlnU3RyYXRlZ3lcbntcbiAgcHVibGljIGdldENvbmZpZyhcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWZcbiAgKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgbWF4V2lkdGg6ICcxMDAlICFpbXBvcnRhbnQnLFxuICAgICAgcGFuZWxDbGFzczogJ2luZm9ybWF0aW9uLXBhbmVsJyxcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHZpZXdDb250YWluZXJSZWYsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVza3RvcEluZm9ybWF0aW9uRGlhbG9nQ29uZmlnU3RyYXRlZ3lcbiAgaW1wbGVtZW50cyBJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5XG57XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGlhbG9nV2lkdGggPSAzNTA7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgcGFkZGluZ1JpZ2h0ID0gMjA7XG4gIHByaXZhdGUgbWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlcjtcblxuICBjb25zdHJ1Y3RvcihtaW1lRG9tSGVscGVyOiBNaW1lRG9tSGVscGVyKSB7XG4gICAgdGhpcy5taW1lRG9tSGVscGVyID0gbWltZURvbUhlbHBlcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25maWcoXG4gICAgZWw6IEVsZW1lbnRSZWYsXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZlxuICApOiBNYXREaWFsb2dDb25maWcge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLmdldFBvc2l0aW9uKGVsKTtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgd2lkdGg6IGAke0Rlc2t0b3BJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5LmRpYWxvZ1dpZHRofXB4YCxcbiAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIHRvcDogZGltZW5zaW9ucy50b3AgKyAncHgnLFxuICAgICAgICBsZWZ0OiBkaW1lbnNpb25zLmxlZnQgKyAncHgnLFxuICAgICAgfSxcbiAgICAgIG1heFdpZHRoOiAnMTAwJSAhaW1wb3J0YW50JyxcbiAgICAgIHBhbmVsQ2xhc3M6ICdpbmZvcm1hdGlvbi1wYW5lbCcsXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB2aWV3Q29udGFpbmVyUmVmLFxuICAgIH07XG4gIH1cbiAgcHJpdmF0ZSBnZXRQb3NpdGlvbihlbDogRWxlbWVudFJlZik6IERpbWVuc2lvbnMge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLm1pbWVEb21IZWxwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsKTtcbiAgICByZXR1cm4gbmV3IERpbWVuc2lvbnMoe1xuICAgICAgdG9wOiBkaW1lbnNpb25zLnRvcCArIDY0LFxuICAgICAgbGVmdDpcbiAgICAgICAgZGltZW5zaW9ucy5yaWdodCAtXG4gICAgICAgIERlc2t0b3BJbmZvcm1hdGlvbkRpYWxvZ0NvbmZpZ1N0cmF0ZWd5LmRpYWxvZ1dpZHRoIC1cbiAgICAgICAgRGVza3RvcEluZm9ybWF0aW9uRGlhbG9nQ29uZmlnU3RyYXRlZ3kucGFkZGluZ1JpZ2h0LFxuICAgIH0pO1xuICB9XG59XG4iXX0=