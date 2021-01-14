import { Dimensions } from './../core/models/dimensions';
export class MobileContentSearchDialogConfigStrategy {
    getConfig(elementRef) {
        return {
            hasBackdrop: false,
            disableClose: false,
            autoFocus: false,
            width: '100%',
            height: '100%',
            panelClass: 'content-search-panel'
        };
    }
}
export class DesktopContentSearchDialogConfigStrategy {
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
    }
    getConfig(el) {
        const dimensions = this.getPosition(el);
        return {
            hasBackdrop: false,
            disableClose: false,
            autoFocus: false,
            width: `${DesktopContentSearchDialogConfigStrategy.dialogWidth}px`,
            position: {
                top: dimensions.top + 'px',
                left: dimensions.left + 'px'
            },
            panelClass: 'content-search-panel'
        };
    }
    getPosition(el) {
        const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
        return new Dimensions({
            top: dimensions.top + 64,
            left: dimensions.right -
                DesktopContentSearchDialogConfigStrategy.dialogWidth -
                DesktopContentSearchDialogConfigStrategy.paddingRight
        });
    }
}
DesktopContentSearchDialogConfigStrategy.dialogWidth = 350;
DesktopContentSearchDialogConfigStrategy.paddingRight = 20;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFNekQsTUFBTSxPQUFPLHVDQUF1QztJQUUzQyxTQUFTLENBQUMsVUFBc0I7UUFDckMsT0FBTztZQUNMLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFlBQVksRUFBRSxLQUFLO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLE1BQU07WUFDZCxVQUFVLEVBQUUsc0JBQXNCO1NBQ25DLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sd0NBQXdDO0lBTW5ELFlBQVksYUFBNEI7UUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDckMsQ0FBQztJQUVNLFNBQVMsQ0FBQyxFQUFjO1FBQzdCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsT0FBTztZQUNMLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFlBQVksRUFBRSxLQUFLO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLEtBQUssRUFBRSxHQUFHLHdDQUF3QyxDQUFDLFdBQVcsSUFBSTtZQUNsRSxRQUFRLEVBQUU7Z0JBQ1IsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSTtnQkFDMUIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSTthQUM3QjtZQUNELFVBQVUsRUFBRSxzQkFBc0I7U0FDbkMsQ0FBQztJQUNKLENBQUM7SUFFTyxXQUFXLENBQUMsRUFBYztRQUNoQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sSUFBSSxVQUFVLENBQUM7WUFDcEIsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEdBQUcsRUFBRTtZQUN4QixJQUFJLEVBQ0YsVUFBVSxDQUFDLEtBQUs7Z0JBQ2hCLHdDQUF3QyxDQUFDLFdBQVc7Z0JBQ3BELHdDQUF3QyxDQUFDLFlBQVk7U0FDeEQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFoQ3NCLG9EQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLHFEQUFZLEdBQUcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4vLi4vY29yZS9taW1lLWRvbS1oZWxwZXInO1xuaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4vLi4vY29yZS9tb2RlbHMvZGltZW5zaW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5IHtcbiAgZ2V0Q29uZmlnKGVsZW1lbnRSZWY/OiBFbGVtZW50UmVmKTogTWF0RGlhbG9nQ29uZmlnO1xufVxuXG5leHBvcnQgY2xhc3MgTW9iaWxlQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5XG4gIGltcGxlbWVudHMgQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5IHtcbiAgcHVibGljIGdldENvbmZpZyhlbGVtZW50UmVmOiBFbGVtZW50UmVmKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgZGlzYWJsZUNsb3NlOiBmYWxzZSxcbiAgICAgIGF1dG9Gb2N1czogZmFsc2UsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBwYW5lbENsYXNzOiAnY29udGVudC1zZWFyY2gtcGFuZWwnXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVza3RvcENvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneVxuICBpbXBsZW1lbnRzIENvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneSB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGlhbG9nV2lkdGggPSAzNTA7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgcGFkZGluZ1JpZ2h0ID0gMjA7XG4gIHByaXZhdGUgbWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlcjtcblxuICBjb25zdHJ1Y3RvcihtaW1lRG9tSGVscGVyOiBNaW1lRG9tSGVscGVyKSB7XG4gICAgdGhpcy5taW1lRG9tSGVscGVyID0gbWltZURvbUhlbHBlcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25maWcoZWw6IEVsZW1lbnRSZWYpOiBNYXREaWFsb2dDb25maWcge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLmdldFBvc2l0aW9uKGVsKTtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgZGlzYWJsZUNsb3NlOiBmYWxzZSxcbiAgICAgIGF1dG9Gb2N1czogZmFsc2UsXG4gICAgICB3aWR0aDogYCR7RGVza3RvcENvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneS5kaWFsb2dXaWR0aH1weGAsXG4gICAgICBwb3NpdGlvbjoge1xuICAgICAgICB0b3A6IGRpbWVuc2lvbnMudG9wICsgJ3B4JyxcbiAgICAgICAgbGVmdDogZGltZW5zaW9ucy5sZWZ0ICsgJ3B4J1xuICAgICAgfSxcbiAgICAgIHBhbmVsQ2xhc3M6ICdjb250ZW50LXNlYXJjaC1wYW5lbCdcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQb3NpdGlvbihlbDogRWxlbWVudFJlZik6IERpbWVuc2lvbnMge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLm1pbWVEb21IZWxwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsKTtcbiAgICByZXR1cm4gbmV3IERpbWVuc2lvbnMoe1xuICAgICAgdG9wOiBkaW1lbnNpb25zLnRvcCArIDY0LFxuICAgICAgbGVmdDpcbiAgICAgICAgZGltZW5zaW9ucy5yaWdodCAtXG4gICAgICAgIERlc2t0b3BDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3kuZGlhbG9nV2lkdGggLVxuICAgICAgICBEZXNrdG9wQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5LnBhZGRpbmdSaWdodFxuICAgIH0pO1xuICB9XG59XG4iXX0=