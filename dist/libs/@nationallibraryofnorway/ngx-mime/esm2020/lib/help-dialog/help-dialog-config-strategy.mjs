import { Dimensions } from '../core/models/dimensions';
export class MobileHelpDialogConfigStrategy {
    getConfig(elementRef, viewContainerRef) {
        return {
            hasBackdrop: false,
            width: '100%',
            height: '100%',
            maxWidth: '100% !important',
            panelClass: 'help-panel',
            viewContainerRef: viewContainerRef,
        };
    }
}
export class DesktopHelpDialogConfigStrategy {
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
    }
    getConfig(el, viewContainerRef) {
        const dimensions = this.getPosition(el);
        return {
            hasBackdrop: false,
            width: `${DesktopHelpDialogConfigStrategy.dialogWidth}px`,
            position: {
                top: dimensions.top + 'px',
                left: dimensions.left + 'px',
            },
            panelClass: 'help-panel',
            maxWidth: '100% !important',
            viewContainerRef: viewContainerRef,
        };
    }
    getPosition(el) {
        const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
        return new Dimensions({
            top: dimensions.top + 64,
            left: dimensions.right -
                DesktopHelpDialogConfigStrategy.dialogWidth -
                DesktopHelpDialogConfigStrategy.paddingRight,
        });
    }
}
DesktopHelpDialogConfigStrategy.dialogWidth = 350;
DesktopHelpDialogConfigStrategy.paddingRight = 20;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2hlbHAtZGlhbG9nL2hlbHAtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFTdkQsTUFBTSxPQUFPLDhCQUE4QjtJQUdsQyxTQUFTLENBQ2QsVUFBc0IsRUFDdEIsZ0JBQWtDO1FBRWxDLE9BQU87WUFDTCxXQUFXLEVBQUUsS0FBSztZQUNsQixLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixVQUFVLEVBQUUsWUFBWTtZQUN4QixnQkFBZ0IsRUFBRSxnQkFBZ0I7U0FDbkMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTywrQkFBK0I7SUFPMUMsWUFBWSxhQUE0QjtRQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBRU0sU0FBUyxDQUNkLEVBQWMsRUFDZCxnQkFBa0M7UUFFbEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QyxPQUFPO1lBQ0wsV0FBVyxFQUFFLEtBQUs7WUFDbEIsS0FBSyxFQUFFLEdBQUcsK0JBQStCLENBQUMsV0FBVyxJQUFJO1lBQ3pELFFBQVEsRUFBRTtnQkFDUixHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUcsR0FBRyxJQUFJO2dCQUMxQixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJO2FBQzdCO1lBQ0QsVUFBVSxFQUFFLFlBQVk7WUFDeEIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixnQkFBZ0IsRUFBRSxnQkFBZ0I7U0FDbkMsQ0FBQztJQUNKLENBQUM7SUFFTyxXQUFXLENBQUMsRUFBYztRQUNoQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sSUFBSSxVQUFVLENBQUM7WUFDcEIsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEdBQUcsRUFBRTtZQUN4QixJQUFJLEVBQ0YsVUFBVSxDQUFDLEtBQUs7Z0JBQ2hCLCtCQUErQixDQUFDLFdBQVc7Z0JBQzNDLCtCQUErQixDQUFDLFlBQVk7U0FDL0MsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFuQ3NCLDJDQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLDRDQUFZLEdBQUcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IE1pbWVEb21IZWxwZXIgfSBmcm9tICcuLi9jb3JlL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQgeyBEaW1lbnNpb25zIH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvZGltZW5zaW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGVscERpYWxvZ0NvbmZpZ1N0cmF0ZWd5IHtcbiAgZ2V0Q29uZmlnKFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZlxuICApOiBNYXREaWFsb2dDb25maWc7XG59XG5cbmV4cG9ydCBjbGFzcyBNb2JpbGVIZWxwRGlhbG9nQ29uZmlnU3RyYXRlZ3lcbiAgaW1wbGVtZW50cyBIZWxwRGlhbG9nQ29uZmlnU3RyYXRlZ3lcbntcbiAgcHVibGljIGdldENvbmZpZyhcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWZcbiAgKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgbWF4V2lkdGg6ICcxMDAlICFpbXBvcnRhbnQnLFxuICAgICAgcGFuZWxDbGFzczogJ2hlbHAtcGFuZWwnLFxuICAgICAgdmlld0NvbnRhaW5lclJlZjogdmlld0NvbnRhaW5lclJlZixcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZXNrdG9wSGVscERpYWxvZ0NvbmZpZ1N0cmF0ZWd5XG4gIGltcGxlbWVudHMgSGVscERpYWxvZ0NvbmZpZ1N0cmF0ZWd5XG57XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGlhbG9nV2lkdGggPSAzNTA7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgcGFkZGluZ1JpZ2h0ID0gMjA7XG4gIHByaXZhdGUgbWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlcjtcblxuICBjb25zdHJ1Y3RvcihtaW1lRG9tSGVscGVyOiBNaW1lRG9tSGVscGVyKSB7XG4gICAgdGhpcy5taW1lRG9tSGVscGVyID0gbWltZURvbUhlbHBlcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25maWcoXG4gICAgZWw6IEVsZW1lbnRSZWYsXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZlxuICApOiBNYXREaWFsb2dDb25maWcge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLmdldFBvc2l0aW9uKGVsKTtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgd2lkdGg6IGAke0Rlc2t0b3BIZWxwRGlhbG9nQ29uZmlnU3RyYXRlZ3kuZGlhbG9nV2lkdGh9cHhgLFxuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgdG9wOiBkaW1lbnNpb25zLnRvcCArICdweCcsXG4gICAgICAgIGxlZnQ6IGRpbWVuc2lvbnMubGVmdCArICdweCcsXG4gICAgICB9LFxuICAgICAgcGFuZWxDbGFzczogJ2hlbHAtcGFuZWwnLFxuICAgICAgbWF4V2lkdGg6ICcxMDAlICFpbXBvcnRhbnQnLFxuICAgICAgdmlld0NvbnRhaW5lclJlZjogdmlld0NvbnRhaW5lclJlZixcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQb3NpdGlvbihlbDogRWxlbWVudFJlZik6IERpbWVuc2lvbnMge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLm1pbWVEb21IZWxwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsKTtcbiAgICByZXR1cm4gbmV3IERpbWVuc2lvbnMoe1xuICAgICAgdG9wOiBkaW1lbnNpb25zLnRvcCArIDY0LFxuICAgICAgbGVmdDpcbiAgICAgICAgZGltZW5zaW9ucy5yaWdodCAtXG4gICAgICAgIERlc2t0b3BIZWxwRGlhbG9nQ29uZmlnU3RyYXRlZ3kuZGlhbG9nV2lkdGggLVxuICAgICAgICBEZXNrdG9wSGVscERpYWxvZ0NvbmZpZ1N0cmF0ZWd5LnBhZGRpbmdSaWdodCxcbiAgICB9KTtcbiAgfVxufVxuIl19