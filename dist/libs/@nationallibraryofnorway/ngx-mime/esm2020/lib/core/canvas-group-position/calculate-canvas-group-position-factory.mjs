import { OnePageCalculatePagePositionStrategy } from './one-page-calculate-page-position-strategy';
import { TwoPageCalculateCanvasGroupPositionStrategy } from './two-page-calculate-page-position-strategy';
import { ViewerLayout } from '../models/viewer-layout';
export class CalculateCanvasGroupPositionFactory {
    static create(viewerLayout, paged, config) {
        if (viewerLayout === ViewerLayout.ONE_PAGE || !paged) {
            return new OnePageCalculatePagePositionStrategy(config);
        }
        else {
            return new TwoPageCalculateCanvasGroupPositionStrategy(config);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRlLWNhbnZhcy1ncm91cC1wb3NpdGlvbi1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvY2FudmFzLWdyb3VwLXBvc2l0aW9uL2NhbGN1bGF0ZS1jYW52YXMtZ3JvdXAtcG9zaXRpb24tZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNuRyxPQUFPLEVBQUUsMkNBQTJDLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMxRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHdkQsTUFBTSxPQUFPLG1DQUFtQztJQUN2QyxNQUFNLENBQUMsTUFBTSxDQUNsQixZQUEwQixFQUMxQixLQUFjLEVBQ2QsTUFBd0I7UUFFeEIsSUFBSSxZQUFZLEtBQUssWUFBWSxDQUFDLFFBQVEsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNwRCxPQUFPLElBQUksb0NBQW9DLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDekQ7YUFBTTtZQUNMLE9BQU8sSUFBSSwyQ0FBMkMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNoRTtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbGN1bGF0ZUNhbnZhc0dyb3VwUG9zaXRpb25TdHJhdGVneSB9IGZyb20gJy4vY2FsY3VsYXRlLWNhbnZhcy1ncm91cC1wb3NpdGlvbi1zdHJhdGVneSc7XG5pbXBvcnQgeyBPbmVQYWdlQ2FsY3VsYXRlUGFnZVBvc2l0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL29uZS1wYWdlLWNhbGN1bGF0ZS1wYWdlLXBvc2l0aW9uLXN0cmF0ZWd5JztcbmltcG9ydCB7IFR3b1BhZ2VDYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3R3by1wYWdlLWNhbGN1bGF0ZS1wYWdlLXBvc2l0aW9uLXN0cmF0ZWd5JztcbmltcG9ydCB7IFZpZXdlckxheW91dCB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItbGF5b3V0JztcbmltcG9ydCB7IE1pbWVWaWV3ZXJDb25maWcgfSBmcm9tICcuLi9taW1lLXZpZXdlci1jb25maWcnO1xuXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvbkZhY3Rvcnkge1xuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShcbiAgICB2aWV3ZXJMYXlvdXQ6IFZpZXdlckxheW91dCxcbiAgICBwYWdlZDogYm9vbGVhbixcbiAgICBjb25maWc6IE1pbWVWaWV3ZXJDb25maWdcbiAgKTogQ2FsY3VsYXRlQ2FudmFzR3JvdXBQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICBpZiAodmlld2VyTGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuT05FX1BBR0UgfHwgIXBhZ2VkKSB7XG4gICAgICByZXR1cm4gbmV3IE9uZVBhZ2VDYWxjdWxhdGVQYWdlUG9zaXRpb25TdHJhdGVneShjb25maWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFR3b1BhZ2VDYWxjdWxhdGVDYW52YXNHcm91cFBvc2l0aW9uU3RyYXRlZ3koY29uZmlnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==