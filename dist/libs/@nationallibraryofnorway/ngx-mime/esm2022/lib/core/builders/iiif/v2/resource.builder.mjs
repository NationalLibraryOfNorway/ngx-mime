import { Resource } from '../../../models/manifest';
import { BuilderUtils } from './builder-utils';
import { ServiceBuilder } from './service.builder';
export class ResourceBuilder {
    constructor(resource) {
        this.resource = resource;
    }
    build() {
        if (!this.resource) {
            throw new Error('No resource');
        }
        return new Resource({
            id: BuilderUtils.extractId(this.resource),
            type: BuilderUtils.extracType(this.resource),
            format: this.resource.format,
            service: new ServiceBuilder(this.resource.service).build(),
            height: this.resource.height,
            width: this.resource.width,
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UuYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2J1aWxkZXJzL2lpaWYvdjIvcmVzb3VyY2UuYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRCxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUFvQixRQUFhO1FBQWIsYUFBUSxHQUFSLFFBQVEsQ0FBSztJQUFHLENBQUM7SUFFckMsS0FBSztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDaEM7UUFDRCxPQUFPLElBQUksUUFBUSxDQUFDO1lBQ2xCLEVBQUUsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDekMsSUFBSSxFQUFFLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM1QyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNO1lBQzVCLE9BQU8sRUFBRSxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUMxRCxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNO1lBQzVCLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgQnVpbGRlclV0aWxzIH0gZnJvbSAnLi9idWlsZGVyLXV0aWxzJztcbmltcG9ydCB7IFNlcnZpY2VCdWlsZGVyIH0gZnJvbSAnLi9zZXJ2aWNlLmJ1aWxkZXInO1xuXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXNvdXJjZTogYW55KSB7fVxuXG4gIGJ1aWxkKCk6IFJlc291cmNlIHtcbiAgICBpZiAoIXRoaXMucmVzb3VyY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gcmVzb3VyY2UnKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSZXNvdXJjZSh7XG4gICAgICBpZDogQnVpbGRlclV0aWxzLmV4dHJhY3RJZCh0aGlzLnJlc291cmNlKSxcbiAgICAgIHR5cGU6IEJ1aWxkZXJVdGlscy5leHRyYWNUeXBlKHRoaXMucmVzb3VyY2UpLFxuICAgICAgZm9ybWF0OiB0aGlzLnJlc291cmNlLmZvcm1hdCxcbiAgICAgIHNlcnZpY2U6IG5ldyBTZXJ2aWNlQnVpbGRlcih0aGlzLnJlc291cmNlLnNlcnZpY2UpLmJ1aWxkKCksXG4gICAgICBoZWlnaHQ6IHRoaXMucmVzb3VyY2UuaGVpZ2h0LFxuICAgICAgd2lkdGg6IHRoaXMucmVzb3VyY2Uud2lkdGgsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==