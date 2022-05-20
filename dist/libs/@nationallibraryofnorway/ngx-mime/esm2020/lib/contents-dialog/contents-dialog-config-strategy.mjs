import { Dimensions } from './../core/models/dimensions';
export class MobileContentsDialogConfigStrategy {
    getConfig(elementRef) {
        return {
            hasBackdrop: false,
            disableClose: false,
            width: '100%',
            height: '100%',
            panelClass: 'contents-panel',
        };
    }
}
export class DesktopContentsDialogConfigStrategy {
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
    }
    getConfig(el) {
        const dimensions = this.getPosition(el);
        return {
            hasBackdrop: false,
            disableClose: false,
            width: `${DesktopContentsDialogConfigStrategy.dialogWidth}px`,
            position: {
                top: dimensions.top + 'px',
                left: dimensions.left + 'px',
            },
            panelClass: 'contents-panel',
        };
    }
    getPosition(el) {
        const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
        return new Dimensions({
            top: dimensions.top + 64,
            left: dimensions.right -
                DesktopContentsDialogConfigStrategy.dialogWidth -
                DesktopContentsDialogConfigStrategy.paddingRight,
        });
    }
}
DesktopContentsDialogConfigStrategy.dialogWidth = 350;
DesktopContentsDialogConfigStrategy.paddingRight = 20;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudHMtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb250ZW50cy1kaWFsb2cvY29udGVudHMtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFNekQsTUFBTSxPQUFPLGtDQUFrQztJQUd0QyxTQUFTLENBQUMsVUFBc0I7UUFDckMsT0FBTztZQUNMLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFlBQVksRUFBRSxLQUFLO1lBQ25CLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLE1BQU07WUFDZCxVQUFVLEVBQUUsZ0JBQWdCO1NBQzdCLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sbUNBQW1DO0lBTzlDLFlBQVksYUFBNEI7UUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDckMsQ0FBQztJQUVNLFNBQVMsQ0FBQyxFQUFjO1FBQzdCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsT0FBTztZQUNMLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFlBQVksRUFBRSxLQUFLO1lBQ25CLEtBQUssRUFBRSxHQUFHLG1DQUFtQyxDQUFDLFdBQVcsSUFBSTtZQUM3RCxRQUFRLEVBQUU7Z0JBQ1IsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSTtnQkFDMUIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSTthQUM3QjtZQUNELFVBQVUsRUFBRSxnQkFBZ0I7U0FDN0IsQ0FBQztJQUNKLENBQUM7SUFFTyxXQUFXLENBQUMsRUFBYztRQUNoQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sSUFBSSxVQUFVLENBQUM7WUFDcEIsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEdBQUcsRUFBRTtZQUN4QixJQUFJLEVBQ0YsVUFBVSxDQUFDLEtBQUs7Z0JBQ2hCLG1DQUFtQyxDQUFDLFdBQVc7Z0JBQy9DLG1DQUFtQyxDQUFDLFlBQVk7U0FDbkQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUEvQnNCLCtDQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLGdEQUFZLEdBQUcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4vLi4vY29yZS9taW1lLWRvbS1oZWxwZXInO1xuaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4vLi4vY29yZS9tb2RlbHMvZGltZW5zaW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGVudHNEaWFsb2dDb25maWdTdHJhdGVneSB7XG4gIGdldENvbmZpZyhlbGVtZW50UmVmPzogRWxlbWVudFJlZik6IE1hdERpYWxvZ0NvbmZpZztcbn1cblxuZXhwb3J0IGNsYXNzIE1vYmlsZUNvbnRlbnRzRGlhbG9nQ29uZmlnU3RyYXRlZ3lcbiAgaW1wbGVtZW50cyBDb250ZW50c0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5XG57XG4gIHB1YmxpYyBnZXRDb25maWcoZWxlbWVudFJlZjogRWxlbWVudFJlZik6IE1hdERpYWxvZ0NvbmZpZyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgICAgIGRpc2FibGVDbG9zZTogZmFsc2UsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBwYW5lbENsYXNzOiAnY29udGVudHMtcGFuZWwnLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlc2t0b3BDb250ZW50c0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5XG4gIGltcGxlbWVudHMgQ29udGVudHNEaWFsb2dDb25maWdTdHJhdGVneVxue1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRpYWxvZ1dpZHRoID0gMzUwO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHBhZGRpbmdSaWdodCA9IDIwO1xuICBwcml2YXRlIG1pbWVEb21IZWxwZXI6IE1pbWVEb21IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IobWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlcikge1xuICAgIHRoaXMubWltZURvbUhlbHBlciA9IG1pbWVEb21IZWxwZXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29uZmlnKGVsOiBFbGVtZW50UmVmKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5nZXRQb3NpdGlvbihlbCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgICAgIGRpc2FibGVDbG9zZTogZmFsc2UsXG4gICAgICB3aWR0aDogYCR7RGVza3RvcENvbnRlbnRzRGlhbG9nQ29uZmlnU3RyYXRlZ3kuZGlhbG9nV2lkdGh9cHhgLFxuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgdG9wOiBkaW1lbnNpb25zLnRvcCArICdweCcsXG4gICAgICAgIGxlZnQ6IGRpbWVuc2lvbnMubGVmdCArICdweCcsXG4gICAgICB9LFxuICAgICAgcGFuZWxDbGFzczogJ2NvbnRlbnRzLXBhbmVsJyxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQb3NpdGlvbihlbDogRWxlbWVudFJlZik6IERpbWVuc2lvbnMge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLm1pbWVEb21IZWxwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsKTtcbiAgICByZXR1cm4gbmV3IERpbWVuc2lvbnMoe1xuICAgICAgdG9wOiBkaW1lbnNpb25zLnRvcCArIDY0LFxuICAgICAgbGVmdDpcbiAgICAgICAgZGltZW5zaW9ucy5yaWdodCAtXG4gICAgICAgIERlc2t0b3BDb250ZW50c0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5LmRpYWxvZ1dpZHRoIC1cbiAgICAgICAgRGVza3RvcENvbnRlbnRzRGlhbG9nQ29uZmlnU3RyYXRlZ3kucGFkZGluZ1JpZ2h0LFxuICAgIH0pO1xuICB9XG59XG4iXX0=