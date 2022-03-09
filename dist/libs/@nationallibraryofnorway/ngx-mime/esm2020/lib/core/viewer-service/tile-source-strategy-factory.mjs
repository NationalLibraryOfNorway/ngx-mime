import { IiifTileSourceStrategy } from './iiif-tile-source-strategy';
import { IiifV3TileSourceStrategy } from './iiif-v3-tile-source-strategy';
import { StaticImageTileSourceStrategy } from './static-image-tile-source-strategy';
export class TileSourceStrategyFactory {
    static create(resource) {
        if (resource.service) {
            if (resource.type === 'Image') {
                return new IiifV3TileSourceStrategy();
            }
            else {
                return new IiifTileSourceStrategy();
            }
        }
        else {
            return new StaticImageTileSourceStrategy();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZS1zb3VyY2Utc3RyYXRlZ3ktZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL3ZpZXdlci1zZXJ2aWNlL3RpbGUtc291cmNlLXN0cmF0ZWd5LWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFHcEYsTUFBTSxPQUFPLHlCQUF5QjtJQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQWtCO1FBQ3JDLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNwQixJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO2dCQUM3QixPQUFPLElBQUksd0JBQXdCLEVBQUUsQ0FBQzthQUN2QztpQkFBTTtnQkFDTCxPQUFPLElBQUksc0JBQXNCLEVBQUUsQ0FBQzthQUNyQztTQUNGO2FBQU07WUFDTCxPQUFPLElBQUksNkJBQTZCLEVBQUUsQ0FBQztTQUM1QztJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnLi4vbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IElpaWZUaWxlU291cmNlU3RyYXRlZ3kgfSBmcm9tICcuL2lpaWYtdGlsZS1zb3VyY2Utc3RyYXRlZ3knO1xuaW1wb3J0IHsgSWlpZlYzVGlsZVNvdXJjZVN0cmF0ZWd5IH0gZnJvbSAnLi9paWlmLXYzLXRpbGUtc291cmNlLXN0cmF0ZWd5JztcbmltcG9ydCB7IFN0YXRpY0ltYWdlVGlsZVNvdXJjZVN0cmF0ZWd5IH0gZnJvbSAnLi9zdGF0aWMtaW1hZ2UtdGlsZS1zb3VyY2Utc3RyYXRlZ3knO1xuaW1wb3J0IHsgVGlsZVNvdXJjZVN0cmF0ZWd5IH0gZnJvbSAnLi90aWxlLXNvdXJjZS1zdHJhdGVneSc7XG5cbmV4cG9ydCBjbGFzcyBUaWxlU291cmNlU3RyYXRlZ3lGYWN0b3J5IHtcbiAgcHVibGljIHN0YXRpYyBjcmVhdGUocmVzb3VyY2U6IFJlc291cmNlKTogVGlsZVNvdXJjZVN0cmF0ZWd5IHtcbiAgICBpZiAocmVzb3VyY2Uuc2VydmljZSkge1xuICAgICAgaWYgKHJlc291cmNlLnR5cGUgPT09ICdJbWFnZScpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJaWlmVjNUaWxlU291cmNlU3RyYXRlZ3koKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgSWlpZlRpbGVTb3VyY2VTdHJhdGVneSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFN0YXRpY0ltYWdlVGlsZVNvdXJjZVN0cmF0ZWd5KCk7XG4gICAgfVxuICB9XG59XG4iXX0=