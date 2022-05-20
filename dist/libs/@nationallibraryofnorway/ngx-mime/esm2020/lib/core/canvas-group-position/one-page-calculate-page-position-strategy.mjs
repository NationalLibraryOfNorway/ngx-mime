import { ViewerOptions } from '../models/viewer-options';
import { ViewingDirection } from '../models/viewing-direction';
import { canvasRectFromCriteria } from './calculate-canvas-group-position-utils';
export class OnePageCalculatePagePositionStrategy {
    constructor(config) {
        this.config = config;
    }
    calculateCanvasGroupPosition(criteria, rotation = 0) {
        let x;
        if (!criteria.canvasGroupIndex) {
            if (rotation === 90 || rotation === 270) {
                x = (criteria.canvasSource.height / 2) * -1;
            }
            else {
                x = (criteria.canvasSource.width / 2) * -1;
            }
        }
        else {
            x =
                criteria.viewingDirection === ViewingDirection.LTR
                    ? this.calculateLtrX(criteria)
                    : this.calculateRtlX(criteria);
        }
        return canvasRectFromCriteria(rotation, criteria, x, this.config.ignorePhysicalScale);
    }
    calculateLtrX(criteria) {
        return (criteria.previousCanvasGroupPosition.x +
            criteria.previousCanvasGroupPosition.width +
            ViewerOptions.overlays.canvasGroupMarginInDashboardView);
    }
    calculateRtlX(criteria) {
        return (criteria.previousCanvasGroupPosition.x -
            criteria.previousCanvasGroupPosition.width -
            ViewerOptions.overlays.canvasGroupMarginInDashboardView);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25lLXBhZ2UtY2FsY3VsYXRlLXBhZ2UtcG9zaXRpb24tc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9jYW52YXMtZ3JvdXAtcG9zaXRpb24vb25lLXBhZ2UtY2FsY3VsYXRlLXBhZ2UtcG9zaXRpb24tc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSy9ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRWpGLE1BQU0sT0FBTyxvQ0FBb0M7SUFHL0MsWUFBb0IsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBRyxDQUFDO0lBRWhELDRCQUE0QixDQUMxQixRQUFxQyxFQUNyQyxXQUFtQixDQUFDO1FBRXBCLElBQUksQ0FBUyxDQUFDO1FBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUM5QixJQUFJLFFBQVEsS0FBSyxFQUFFLElBQUksUUFBUSxLQUFLLEdBQUcsRUFBRTtnQkFDdkMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDN0M7aUJBQU07Z0JBQ0wsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDNUM7U0FDRjthQUFNO1lBQ0wsQ0FBQztnQkFDQyxRQUFRLENBQUMsZ0JBQWdCLEtBQUssZ0JBQWdCLENBQUMsR0FBRztvQkFDaEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO29CQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQztRQUNELE9BQU8sc0JBQXNCLENBQzNCLFFBQVEsRUFDUixRQUFRLEVBQ1IsQ0FBQyxFQUNELElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQ2hDLENBQUM7SUFDSixDQUFDO0lBRU8sYUFBYSxDQUFDLFFBQXFDO1FBQ3pELE9BQU8sQ0FDTCxRQUFRLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUN0QyxRQUFRLENBQUMsMkJBQTJCLENBQUMsS0FBSztZQUMxQyxhQUFhLENBQUMsUUFBUSxDQUFDLGdDQUFnQyxDQUN4RCxDQUFDO0lBQ0osQ0FBQztJQUVPLGFBQWEsQ0FBQyxRQUFxQztRQUN6RCxPQUFPLENBQ0wsUUFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDdEMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLEtBQUs7WUFDMUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxnQ0FBZ0MsQ0FDeEQsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1pbWVWaWV3ZXJDb25maWcgfSBmcm9tICcuLi9taW1lLXZpZXdlci1jb25maWcnO1xuaW1wb3J0IHsgUmVjdCB9IGZyb20gJy4uL21vZGVscy9yZWN0JztcbmltcG9ydCB7IFZpZXdlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvdmlld2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgVmlld2luZ0RpcmVjdGlvbiB9IGZyb20gJy4uL21vZGVscy92aWV3aW5nLWRpcmVjdGlvbic7XG5pbXBvcnQge1xuICBDYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uU3RyYXRlZ3ksXG4gIENhbnZhc0dyb3VwUG9zaXRpb25Dcml0ZXJpYSxcbn0gZnJvbSAnLi9jYWxjdWxhdGUtY2FudmFzLWdyb3VwLXBvc2l0aW9uLXN0cmF0ZWd5JztcbmltcG9ydCB7IGNhbnZhc1JlY3RGcm9tQ3JpdGVyaWEgfSBmcm9tICcuL2NhbGN1bGF0ZS1jYW52YXMtZ3JvdXAtcG9zaXRpb24tdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgT25lUGFnZUNhbGN1bGF0ZVBhZ2VQb3NpdGlvblN0cmF0ZWd5XG4gIGltcGxlbWVudHMgQ2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvblN0cmF0ZWd5XG57XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBNaW1lVmlld2VyQ29uZmlnKSB7fVxuXG4gIGNhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb24oXG4gICAgY3JpdGVyaWE6IENhbnZhc0dyb3VwUG9zaXRpb25Dcml0ZXJpYSxcbiAgICByb3RhdGlvbjogbnVtYmVyID0gMFxuICApOiBSZWN0IHtcbiAgICBsZXQgeDogbnVtYmVyO1xuICAgIGlmICghY3JpdGVyaWEuY2FudmFzR3JvdXBJbmRleCkge1xuICAgICAgaWYgKHJvdGF0aW9uID09PSA5MCB8fCByb3RhdGlvbiA9PT0gMjcwKSB7XG4gICAgICAgIHggPSAoY3JpdGVyaWEuY2FudmFzU291cmNlLmhlaWdodCAvIDIpICogLTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB4ID0gKGNyaXRlcmlhLmNhbnZhc1NvdXJjZS53aWR0aCAvIDIpICogLTE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPVxuICAgICAgICBjcml0ZXJpYS52aWV3aW5nRGlyZWN0aW9uID09PSBWaWV3aW5nRGlyZWN0aW9uLkxUUlxuICAgICAgICAgID8gdGhpcy5jYWxjdWxhdGVMdHJYKGNyaXRlcmlhKVxuICAgICAgICAgIDogdGhpcy5jYWxjdWxhdGVSdGxYKGNyaXRlcmlhKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhbnZhc1JlY3RGcm9tQ3JpdGVyaWEoXG4gICAgICByb3RhdGlvbixcbiAgICAgIGNyaXRlcmlhLFxuICAgICAgeCxcbiAgICAgIHRoaXMuY29uZmlnLmlnbm9yZVBoeXNpY2FsU2NhbGVcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVMdHJYKGNyaXRlcmlhOiBDYW52YXNHcm91cFBvc2l0aW9uQ3JpdGVyaWEpIHtcbiAgICByZXR1cm4gKFxuICAgICAgY3JpdGVyaWEucHJldmlvdXNDYW52YXNHcm91cFBvc2l0aW9uLnggK1xuICAgICAgY3JpdGVyaWEucHJldmlvdXNDYW52YXNHcm91cFBvc2l0aW9uLndpZHRoICtcbiAgICAgIFZpZXdlck9wdGlvbnMub3ZlcmxheXMuY2FudmFzR3JvdXBNYXJnaW5JbkRhc2hib2FyZFZpZXdcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVSdGxYKGNyaXRlcmlhOiBDYW52YXNHcm91cFBvc2l0aW9uQ3JpdGVyaWEpIHtcbiAgICByZXR1cm4gKFxuICAgICAgY3JpdGVyaWEucHJldmlvdXNDYW52YXNHcm91cFBvc2l0aW9uLnggLVxuICAgICAgY3JpdGVyaWEucHJldmlvdXNDYW52YXNHcm91cFBvc2l0aW9uLndpZHRoIC1cbiAgICAgIFZpZXdlck9wdGlvbnMub3ZlcmxheXMuY2FudmFzR3JvdXBNYXJnaW5JbkRhc2hib2FyZFZpZXdcbiAgICApO1xuICB9XG59XG4iXX0=