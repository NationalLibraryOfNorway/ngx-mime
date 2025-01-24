import { Dimensions } from '../core/models/dimensions';
export class MobileViewDialogConfigStrategy {
    getConfig(elementRef, viewContainerRef) {
        return {
            hasBackdrop: false,
            autoFocus: false,
            width: '100%',
            height: '100%',
            maxWidth: '100% !important',
            panelClass: ['mime-mobile-dialog', 'mime-dialog', 'view-panel'],
            viewContainerRef: viewContainerRef,
        };
    }
}
export class DesktopViewDialogConfigStrategy {
    static { this.dialogWidth = 350; }
    static { this.paddingRight = 16; }
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
            panelClass: ['mime-dialog', 'view-panel'],
            maxWidth: '100% !important',
            viewContainerRef: viewContainerRef,
        };
    }
    getPosition(el) {
        const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
        return new Dimensions({
            top: dimensions.top + 80,
            left: dimensions.right -
                DesktopViewDialogConfigStrategy.dialogWidth -
                DesktopViewDialogConfigStrategy.paddingRight,
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXctZGlhbG9nL3ZpZXctZGlhbG9nLWNvbmZpZy1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFTdkQsTUFBTSxPQUFPLDhCQUE4QjtJQUdsQyxTQUFTLENBQ2QsVUFBc0IsRUFDdEIsZ0JBQWtDO1FBRWxDLE9BQU87WUFDTCxXQUFXLEVBQUUsS0FBSztZQUNsQixTQUFTLEVBQUUsS0FBSztZQUNoQixLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixVQUFVLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDO1lBQy9ELGdCQUFnQixFQUFFLGdCQUFnQjtTQUNuQyxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLCtCQUErQjthQUduQixnQkFBVyxHQUFHLEdBQUcsQ0FBQzthQUNsQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztJQUd6QyxZQUFZLGFBQTRCO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxTQUFTLENBQ2QsRUFBYyxFQUNkLGdCQUFrQztRQUVsQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLE9BQU87WUFDTCxXQUFXLEVBQUUsS0FBSztZQUNsQixTQUFTLEVBQUUsSUFBSTtZQUNmLEtBQUssRUFBRSxHQUFHLCtCQUErQixDQUFDLFdBQVcsSUFBSTtZQUN6RCxRQUFRLEVBQUU7Z0JBQ1IsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSTtnQkFDMUIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSTthQUM3QjtZQUNELFVBQVUsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUM7WUFDekMsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixnQkFBZ0IsRUFBRSxnQkFBZ0I7U0FDbkMsQ0FBQztJQUNKLENBQUM7SUFFTyxXQUFXLENBQUMsRUFBYztRQUNoQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sSUFBSSxVQUFVLENBQUM7WUFDcEIsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEdBQUcsRUFBRTtZQUN4QixJQUFJLEVBQ0YsVUFBVSxDQUFDLEtBQUs7Z0JBQ2hCLCtCQUErQixDQUFDLFdBQVc7Z0JBQzNDLCtCQUErQixDQUFDLFlBQVk7U0FDL0MsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ0NvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBNaW1lRG9tSGVscGVyIH0gZnJvbSAnLi4vY29yZS9taW1lLWRvbS1oZWxwZXInO1xuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL2RpbWVuc2lvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZpZXdEaWFsb2dDb25maWdTdHJhdGVneSB7XG4gIGdldENvbmZpZyhcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmIHwgbnVsbCxcbiAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICApOiBNYXREaWFsb2dDb25maWc7XG59XG5cbmV4cG9ydCBjbGFzcyBNb2JpbGVWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3lcbiAgaW1wbGVtZW50cyBWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3lcbntcbiAgcHVibGljIGdldENvbmZpZyhcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICk6IE1hdERpYWxvZ0NvbmZpZyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgICAgIGF1dG9Gb2N1czogZmFsc2UsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBtYXhXaWR0aDogJzEwMCUgIWltcG9ydGFudCcsXG4gICAgICBwYW5lbENsYXNzOiBbJ21pbWUtbW9iaWxlLWRpYWxvZycsICdtaW1lLWRpYWxvZycsICd2aWV3LXBhbmVsJ10sXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB2aWV3Q29udGFpbmVyUmVmLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlc2t0b3BWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3lcbiAgaW1wbGVtZW50cyBWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3lcbntcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBkaWFsb2dXaWR0aCA9IDM1MDtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBwYWRkaW5nUmlnaHQgPSAxNjtcbiAgcHJpdmF0ZSBtaW1lRG9tSGVscGVyOiBNaW1lRG9tSGVscGVyO1xuXG4gIGNvbnN0cnVjdG9yKG1pbWVEb21IZWxwZXI6IE1pbWVEb21IZWxwZXIpIHtcbiAgICB0aGlzLm1pbWVEb21IZWxwZXIgPSBtaW1lRG9tSGVscGVyO1xuICB9XG5cbiAgcHVibGljIGdldENvbmZpZyhcbiAgICBlbDogRWxlbWVudFJlZixcbiAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICApOiBNYXREaWFsb2dDb25maWcge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLmdldFBvc2l0aW9uKGVsKTtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxuICAgICAgd2lkdGg6IGAke0Rlc2t0b3BWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3kuZGlhbG9nV2lkdGh9cHhgLFxuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgdG9wOiBkaW1lbnNpb25zLnRvcCArICdweCcsXG4gICAgICAgIGxlZnQ6IGRpbWVuc2lvbnMubGVmdCArICdweCcsXG4gICAgICB9LFxuICAgICAgcGFuZWxDbGFzczogWydtaW1lLWRpYWxvZycsICd2aWV3LXBhbmVsJ10sXG4gICAgICBtYXhXaWR0aDogJzEwMCUgIWltcG9ydGFudCcsXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB2aWV3Q29udGFpbmVyUmVmLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldFBvc2l0aW9uKGVsOiBFbGVtZW50UmVmKTogRGltZW5zaW9ucyB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMubWltZURvbUhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoZWwpO1xuICAgIHJldHVybiBuZXcgRGltZW5zaW9ucyh7XG4gICAgICB0b3A6IGRpbWVuc2lvbnMudG9wICsgODAsXG4gICAgICBsZWZ0OlxuICAgICAgICBkaW1lbnNpb25zLnJpZ2h0IC1cbiAgICAgICAgRGVza3RvcFZpZXdEaWFsb2dDb25maWdTdHJhdGVneS5kaWFsb2dXaWR0aCAtXG4gICAgICAgIERlc2t0b3BWaWV3RGlhbG9nQ29uZmlnU3RyYXRlZ3kucGFkZGluZ1JpZ2h0LFxuICAgIH0pO1xuICB9XG59XG4iXX0=