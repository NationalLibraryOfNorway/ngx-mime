import { Dimensions } from './../core/models/dimensions';
export class MobileContentSearchDialogConfigStrategy {
    getConfig(elementRef, viewContainerRef) {
        return {
            hasBackdrop: false,
            autoFocus: false,
            width: '100%',
            height: '100%',
            maxWidth: '100% !important',
            panelClass: 'content-search-panel',
            viewContainerRef: viewContainerRef,
        };
    }
}
export class DesktopContentSearchDialogConfigStrategy {
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
    }
    getConfig(el, viewContainerRef) {
        const dimensions = this.getPosition(el);
        return {
            hasBackdrop: false,
            autoFocus: false,
            width: `${DesktopContentSearchDialogConfigStrategy.dialogWidth}px`,
            position: {
                top: dimensions.top + 'px',
                left: dimensions.left + 'px',
            },
            maxWidth: '100% !important',
            panelClass: 'content-search-panel',
            viewContainerRef: viewContainerRef,
        };
    }
    getPosition(el) {
        const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
        return new Dimensions({
            top: dimensions.top + 64,
            left: dimensions.right -
                DesktopContentSearchDialogConfigStrategy.dialogWidth -
                DesktopContentSearchDialogConfigStrategy.paddingRight,
        });
    }
}
DesktopContentSearchDialogConfigStrategy.dialogWidth = 350;
DesktopContentSearchDialogConfigStrategy.paddingRight = 20;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFTekQsTUFBTSxPQUFPLHVDQUF1QztJQUczQyxTQUFTLENBQ2QsVUFBc0IsRUFDdEIsZ0JBQWtDO1FBRWxDLE9BQU87WUFDTCxXQUFXLEVBQUUsS0FBSztZQUNsQixTQUFTLEVBQUUsS0FBSztZQUNoQixLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixVQUFVLEVBQUUsc0JBQXNCO1lBQ2xDLGdCQUFnQixFQUFFLGdCQUFnQjtTQUNuQyxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLHdDQUF3QztJQU9uRCxZQUFZLGFBQTRCO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxTQUFTLENBQ2QsRUFBYyxFQUNkLGdCQUFrQztRQUVsQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLE9BQU87WUFDTCxXQUFXLEVBQUUsS0FBSztZQUNsQixTQUFTLEVBQUUsS0FBSztZQUNoQixLQUFLLEVBQUUsR0FBRyx3Q0FBd0MsQ0FBQyxXQUFXLElBQUk7WUFDbEUsUUFBUSxFQUFFO2dCQUNSLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxHQUFHLElBQUk7Z0JBQzFCLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUk7YUFDN0I7WUFDRCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFVBQVUsRUFBRSxzQkFBc0I7WUFDbEMsZ0JBQWdCLEVBQUUsZ0JBQWdCO1NBQ25DLENBQUM7SUFDSixDQUFDO0lBRU8sV0FBVyxDQUFDLEVBQWM7UUFDaEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRSxPQUFPLElBQUksVUFBVSxDQUFDO1lBQ3BCLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxHQUFHLEVBQUU7WUFDeEIsSUFBSSxFQUNGLFVBQVUsQ0FBQyxLQUFLO2dCQUNoQix3Q0FBd0MsQ0FBQyxXQUFXO2dCQUNwRCx3Q0FBd0MsQ0FBQyxZQUFZO1NBQ3hELENBQUMsQ0FBQztJQUNMLENBQUM7O0FBcENzQixvREFBVyxHQUFHLEdBQUcsQ0FBQztBQUNsQixxREFBWSxHQUFHLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ0NvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBNaW1lRG9tSGVscGVyIH0gZnJvbSAnLi8uLi9jb3JlL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQgeyBEaW1lbnNpb25zIH0gZnJvbSAnLi8uLi9jb3JlL21vZGVscy9kaW1lbnNpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3kge1xuICBnZXRDb25maWcoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZiB8IG51bGwsXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZlxuICApOiBNYXREaWFsb2dDb25maWc7XG59XG5cbmV4cG9ydCBjbGFzcyBNb2JpbGVDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3lcbiAgaW1wbGVtZW50cyBDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3lcbntcbiAgcHVibGljIGdldENvbmZpZyhcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWZcbiAgKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIG1heFdpZHRoOiAnMTAwJSAhaW1wb3J0YW50JyxcbiAgICAgIHBhbmVsQ2xhc3M6ICdjb250ZW50LXNlYXJjaC1wYW5lbCcsXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB2aWV3Q29udGFpbmVyUmVmLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlc2t0b3BDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3lcbiAgaW1wbGVtZW50cyBDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3lcbntcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBkaWFsb2dXaWR0aCA9IDM1MDtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBwYWRkaW5nUmlnaHQgPSAyMDtcbiAgcHJpdmF0ZSBtaW1lRG9tSGVscGVyOiBNaW1lRG9tSGVscGVyO1xuXG4gIGNvbnN0cnVjdG9yKG1pbWVEb21IZWxwZXI6IE1pbWVEb21IZWxwZXIpIHtcbiAgICB0aGlzLm1pbWVEb21IZWxwZXIgPSBtaW1lRG9tSGVscGVyO1xuICB9XG5cbiAgcHVibGljIGdldENvbmZpZyhcbiAgICBlbDogRWxlbWVudFJlZixcbiAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmXG4gICk6IE1hdERpYWxvZ0NvbmZpZyB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMuZ2V0UG9zaXRpb24oZWwpO1xuICAgIHJldHVybiB7XG4gICAgICBoYXNCYWNrZHJvcDogZmFsc2UsXG4gICAgICBhdXRvRm9jdXM6IGZhbHNlLFxuICAgICAgd2lkdGg6IGAke0Rlc2t0b3BDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3kuZGlhbG9nV2lkdGh9cHhgLFxuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgdG9wOiBkaW1lbnNpb25zLnRvcCArICdweCcsXG4gICAgICAgIGxlZnQ6IGRpbWVuc2lvbnMubGVmdCArICdweCcsXG4gICAgICB9LFxuICAgICAgbWF4V2lkdGg6ICcxMDAlICFpbXBvcnRhbnQnLFxuICAgICAgcGFuZWxDbGFzczogJ2NvbnRlbnQtc2VhcmNoLXBhbmVsJyxcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHZpZXdDb250YWluZXJSZWYsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UG9zaXRpb24oZWw6IEVsZW1lbnRSZWYpOiBEaW1lbnNpb25zIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5taW1lRG9tSGVscGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdChlbCk7XG4gICAgcmV0dXJuIG5ldyBEaW1lbnNpb25zKHtcbiAgICAgIHRvcDogZGltZW5zaW9ucy50b3AgKyA2NCxcbiAgICAgIGxlZnQ6XG4gICAgICAgIGRpbWVuc2lvbnMucmlnaHQgLVxuICAgICAgICBEZXNrdG9wQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5LmRpYWxvZ1dpZHRoIC1cbiAgICAgICAgRGVza3RvcENvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneS5wYWRkaW5nUmlnaHQsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==