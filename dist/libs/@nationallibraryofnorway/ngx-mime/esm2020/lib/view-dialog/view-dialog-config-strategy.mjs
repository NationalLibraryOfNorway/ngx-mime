import { Dimensions } from '../core/models/dimensions';
export class MobileViewDialogConfigStrategy {
    getConfig(elementRef) {
        return {
            hasBackdrop: false,
            disableClose: false,
            autoFocus: false,
            width: '100%',
            height: '100%',
            panelClass: 'view-panel',
        };
    }
}
export class DesktopViewDialogConfigStrategy {
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
    }
    getConfig(el) {
        const dimensions = this.getPosition(el);
        return {
            hasBackdrop: false,
            disableClose: false,
            autoFocus: true,
            width: `${DesktopViewDialogConfigStrategy.dialogWidth}px`,
            position: {
                top: dimensions.top + 'px',
                left: dimensions.left + 'px',
            },
            panelClass: 'view-panel',
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
DesktopViewDialogConfigStrategy.dialogWidth = 350;
DesktopViewDialogConfigStrategy.paddingRight = 20;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXctZGlhbG9nL3ZpZXctZGlhbG9nLWNvbmZpZy1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFNdkQsTUFBTSxPQUFPLDhCQUE4QjtJQUdsQyxTQUFTLENBQUMsVUFBc0I7UUFDckMsT0FBTztZQUNMLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFlBQVksRUFBRSxLQUFLO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLE1BQU07WUFDZCxVQUFVLEVBQUUsWUFBWTtTQUN6QixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLCtCQUErQjtJQU8xQyxZQUFZLGFBQTRCO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxTQUFTLENBQUMsRUFBYztRQUM3QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLE9BQU87WUFDTCxXQUFXLEVBQUUsS0FBSztZQUNsQixZQUFZLEVBQUUsS0FBSztZQUNuQixTQUFTLEVBQUUsSUFBSTtZQUNmLEtBQUssRUFBRSxHQUFHLCtCQUErQixDQUFDLFdBQVcsSUFBSTtZQUN6RCxRQUFRLEVBQUU7Z0JBQ1IsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSTtnQkFDMUIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSTthQUM3QjtZQUNELFVBQVUsRUFBRSxZQUFZO1NBQ3pCLENBQUM7SUFDSixDQUFDO0lBRU8sV0FBVyxDQUFDLEVBQWM7UUFDaEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRSxPQUFPLElBQUksVUFBVSxDQUFDO1lBQ3BCLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxHQUFHLEVBQUU7WUFDeEIsSUFBSSxFQUNGLFVBQVUsQ0FBQyxLQUFLO2dCQUNoQiwrQkFBK0IsQ0FBQyxXQUFXO2dCQUMzQywrQkFBK0IsQ0FBQyxZQUFZO1NBQy9DLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBaENzQiwyQ0FBVyxHQUFHLEdBQUcsQ0FBQztBQUNsQiw0Q0FBWSxHQUFHLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1pbWVEb21IZWxwZXIgfSBmcm9tICcuLi9jb3JlL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dDb25maWcgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL2RpbWVuc2lvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZpZXdEaWFsb2dDb25maWdTdHJhdGVneSB7XG4gIGdldENvbmZpZyhlbGVtZW50UmVmPzogRWxlbWVudFJlZiB8IG51bGwpOiBNYXREaWFsb2dDb25maWc7XG59XG5cbmV4cG9ydCBjbGFzcyBNb2JpbGVWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3lcbiAgaW1wbGVtZW50cyBWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3lcbntcbiAgcHVibGljIGdldENvbmZpZyhlbGVtZW50UmVmOiBFbGVtZW50UmVmKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgZGlzYWJsZUNsb3NlOiBmYWxzZSxcbiAgICAgIGF1dG9Gb2N1czogZmFsc2UsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBwYW5lbENsYXNzOiAndmlldy1wYW5lbCcsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVza3RvcFZpZXdEaWFsb2dDb25maWdTdHJhdGVneVxuICBpbXBsZW1lbnRzIFZpZXdEaWFsb2dDb25maWdTdHJhdGVneVxue1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRpYWxvZ1dpZHRoID0gMzUwO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHBhZGRpbmdSaWdodCA9IDIwO1xuICBwcml2YXRlIG1pbWVEb21IZWxwZXI6IE1pbWVEb21IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IobWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlcikge1xuICAgIHRoaXMubWltZURvbUhlbHBlciA9IG1pbWVEb21IZWxwZXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29uZmlnKGVsOiBFbGVtZW50UmVmKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5nZXRQb3NpdGlvbihlbCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgICAgIGRpc2FibGVDbG9zZTogZmFsc2UsXG4gICAgICBhdXRvRm9jdXM6IHRydWUsXG4gICAgICB3aWR0aDogYCR7RGVza3RvcFZpZXdEaWFsb2dDb25maWdTdHJhdGVneS5kaWFsb2dXaWR0aH1weGAsXG4gICAgICBwb3NpdGlvbjoge1xuICAgICAgICB0b3A6IGRpbWVuc2lvbnMudG9wICsgJ3B4JyxcbiAgICAgICAgbGVmdDogZGltZW5zaW9ucy5sZWZ0ICsgJ3B4JyxcbiAgICAgIH0sXG4gICAgICBwYW5lbENsYXNzOiAndmlldy1wYW5lbCcsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UG9zaXRpb24oZWw6IEVsZW1lbnRSZWYpOiBEaW1lbnNpb25zIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5taW1lRG9tSGVscGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdChlbCk7XG4gICAgcmV0dXJuIG5ldyBEaW1lbnNpb25zKHtcbiAgICAgIHRvcDogZGltZW5zaW9ucy50b3AgKyA2NCxcbiAgICAgIGxlZnQ6XG4gICAgICAgIGRpbWVuc2lvbnMucmlnaHQgLVxuICAgICAgICBEZXNrdG9wVmlld0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5LmRpYWxvZ1dpZHRoIC1cbiAgICAgICAgRGVza3RvcFZpZXdEaWFsb2dDb25maWdTdHJhdGVneS5wYWRkaW5nUmlnaHQsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==