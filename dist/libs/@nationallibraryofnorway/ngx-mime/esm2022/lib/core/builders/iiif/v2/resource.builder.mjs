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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UuYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2J1aWxkZXJzL2lpaWYvdjIvcmVzb3VyY2UuYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRCxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUFvQixRQUFhO1FBQWIsYUFBUSxHQUFSLFFBQVEsQ0FBSztJQUFHLENBQUM7SUFFckMsS0FBSztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQ0QsT0FBTyxJQUFJLFFBQVEsQ0FBQztZQUNsQixFQUFFLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pDLElBQUksRUFBRSxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDNUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTTtZQUM1QixPQUFPLEVBQUUsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDMUQsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTTtZQUM1QixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1NBQzNCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IEJ1aWxkZXJVdGlscyB9IGZyb20gJy4vYnVpbGRlci11dGlscyc7XG5pbXBvcnQgeyBTZXJ2aWNlQnVpbGRlciB9IGZyb20gJy4vc2VydmljZS5idWlsZGVyJztcblxuZXhwb3J0IGNsYXNzIFJlc291cmNlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVzb3VyY2U6IGFueSkge31cblxuICBidWlsZCgpOiBSZXNvdXJjZSB7XG4gICAgaWYgKCF0aGlzLnJlc291cmNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHJlc291cmNlJyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUmVzb3VyY2Uoe1xuICAgICAgaWQ6IEJ1aWxkZXJVdGlscy5leHRyYWN0SWQodGhpcy5yZXNvdXJjZSksXG4gICAgICB0eXBlOiBCdWlsZGVyVXRpbHMuZXh0cmFjVHlwZSh0aGlzLnJlc291cmNlKSxcbiAgICAgIGZvcm1hdDogdGhpcy5yZXNvdXJjZS5mb3JtYXQsXG4gICAgICBzZXJ2aWNlOiBuZXcgU2VydmljZUJ1aWxkZXIodGhpcy5yZXNvdXJjZS5zZXJ2aWNlKS5idWlsZCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLnJlc291cmNlLmhlaWdodCxcbiAgICAgIHdpZHRoOiB0aGlzLnJlc291cmNlLndpZHRoLFxuICAgIH0pO1xuICB9XG59XG4iXX0=