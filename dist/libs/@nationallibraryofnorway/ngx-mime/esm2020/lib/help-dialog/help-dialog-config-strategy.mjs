import { Dimensions } from '../core/models/dimensions';
export class MobileHelpDialogConfigStrategy {
    getConfig(elementRef) {
        return {
            hasBackdrop: false,
            disableClose: false,
            autoFocus: false,
            width: '100%',
            height: '100%',
            panelClass: 'help-panel',
        };
    }
}
export class DesktopHelpDialogConfigStrategy {
    constructor(mimeDomHelper) {
        this.mimeDomHelper = mimeDomHelper;
    }
    getConfig(el) {
        const dimensions = this.getPosition(el);
        return {
            hasBackdrop: false,
            disableClose: false,
            autoFocus: false,
            width: `${DesktopHelpDialogConfigStrategy.dialogWidth}px`,
            position: {
                top: dimensions.top + 'px',
                left: dimensions.left + 'px',
            },
            panelClass: 'help-panel',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2hlbHAtZGlhbG9nL2hlbHAtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFPdkQsTUFBTSxPQUFPLDhCQUE4QjtJQUdsQyxTQUFTLENBQUMsVUFBc0I7UUFDckMsT0FBTztZQUNMLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFlBQVksRUFBRSxLQUFLO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLE1BQU07WUFDZCxVQUFVLEVBQUUsWUFBWTtTQUN6QixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLCtCQUErQjtJQU8xQyxZQUFZLGFBQTRCO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxTQUFTLENBQUMsRUFBYztRQUM3QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLE9BQU87WUFDTCxXQUFXLEVBQUUsS0FBSztZQUNsQixZQUFZLEVBQUUsS0FBSztZQUNuQixTQUFTLEVBQUUsS0FBSztZQUNoQixLQUFLLEVBQUUsR0FBRywrQkFBK0IsQ0FBQyxXQUFXLElBQUk7WUFDekQsUUFBUSxFQUFFO2dCQUNSLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxHQUFHLElBQUk7Z0JBQzFCLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUk7YUFDN0I7WUFDRCxVQUFVLEVBQUUsWUFBWTtTQUN6QixDQUFDO0lBQ0osQ0FBQztJQUVPLFdBQVcsQ0FBQyxFQUFjO1FBQ2hDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLFVBQVUsQ0FBQztZQUNwQixHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUcsR0FBRyxFQUFFO1lBQ3hCLElBQUksRUFDRixVQUFVLENBQUMsS0FBSztnQkFDaEIsK0JBQStCLENBQUMsV0FBVztnQkFDM0MsK0JBQStCLENBQUMsWUFBWTtTQUMvQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQWhDc0IsMkNBQVcsR0FBRyxHQUFHLENBQUM7QUFDbEIsNENBQVksR0FBRyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dDb25maWcgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL2RpbWVuc2lvbnMnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL2NvcmUvbWltZS1kb20taGVscGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBIZWxwRGlhbG9nQ29uZmlnU3RyYXRlZ3kge1xuICBnZXRDb25maWcoZWxlbWVudFJlZj86IEVsZW1lbnRSZWYpOiBNYXREaWFsb2dDb25maWc7XG59XG5cbmV4cG9ydCBjbGFzcyBNb2JpbGVIZWxwRGlhbG9nQ29uZmlnU3RyYXRlZ3lcbiAgaW1wbGVtZW50cyBIZWxwRGlhbG9nQ29uZmlnU3RyYXRlZ3lcbntcbiAgcHVibGljIGdldENvbmZpZyhlbGVtZW50UmVmOiBFbGVtZW50UmVmKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgZGlzYWJsZUNsb3NlOiBmYWxzZSxcbiAgICAgIGF1dG9Gb2N1czogZmFsc2UsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBwYW5lbENsYXNzOiAnaGVscC1wYW5lbCcsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVza3RvcEhlbHBEaWFsb2dDb25maWdTdHJhdGVneVxuICBpbXBsZW1lbnRzIEhlbHBEaWFsb2dDb25maWdTdHJhdGVneVxue1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRpYWxvZ1dpZHRoID0gMzUwO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHBhZGRpbmdSaWdodCA9IDIwO1xuICBwcml2YXRlIG1pbWVEb21IZWxwZXI6IE1pbWVEb21IZWxwZXI7XG5cbiAgY29uc3RydWN0b3IobWltZURvbUhlbHBlcjogTWltZURvbUhlbHBlcikge1xuICAgIHRoaXMubWltZURvbUhlbHBlciA9IG1pbWVEb21IZWxwZXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29uZmlnKGVsOiBFbGVtZW50UmVmKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5nZXRQb3NpdGlvbihlbCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgICAgIGRpc2FibGVDbG9zZTogZmFsc2UsXG4gICAgICBhdXRvRm9jdXM6IGZhbHNlLFxuICAgICAgd2lkdGg6IGAke0Rlc2t0b3BIZWxwRGlhbG9nQ29uZmlnU3RyYXRlZ3kuZGlhbG9nV2lkdGh9cHhgLFxuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgdG9wOiBkaW1lbnNpb25zLnRvcCArICdweCcsXG4gICAgICAgIGxlZnQ6IGRpbWVuc2lvbnMubGVmdCArICdweCcsXG4gICAgICB9LFxuICAgICAgcGFuZWxDbGFzczogJ2hlbHAtcGFuZWwnLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldFBvc2l0aW9uKGVsOiBFbGVtZW50UmVmKTogRGltZW5zaW9ucyB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMubWltZURvbUhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoZWwpO1xuICAgIHJldHVybiBuZXcgRGltZW5zaW9ucyh7XG4gICAgICB0b3A6IGRpbWVuc2lvbnMudG9wICsgNjQsXG4gICAgICBsZWZ0OlxuICAgICAgICBkaW1lbnNpb25zLnJpZ2h0IC1cbiAgICAgICAgRGVza3RvcEhlbHBEaWFsb2dDb25maWdTdHJhdGVneS5kaWFsb2dXaWR0aCAtXG4gICAgICAgIERlc2t0b3BIZWxwRGlhbG9nQ29uZmlnU3RyYXRlZ3kucGFkZGluZ1JpZ2h0LFxuICAgIH0pO1xuICB9XG59XG4iXX0=