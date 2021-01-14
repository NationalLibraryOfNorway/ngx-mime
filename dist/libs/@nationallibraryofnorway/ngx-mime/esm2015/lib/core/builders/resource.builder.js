import { Resource } from '../models/manifest';
import { BuilderUtils } from './builder-utils';
import { ServiceBuilder } from './service.builder';
export class ResourceBuilder {
    constructor(resource) {
        this.resource = resource;
    }
    build() {
        if (this.resource) {
            return new Resource({
                id: BuilderUtils.extractId(this.resource),
                type: BuilderUtils.extracType(this.resource),
                format: this.resource.format,
                service: new ServiceBuilder(this.resource.service).build(),
                height: this.resource.height,
                width: this.resource.width
            });
        }
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UuYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2J1aWxkZXJzL3Jlc291cmNlLmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFBb0IsUUFBYTtRQUFiLGFBQVEsR0FBUixRQUFRLENBQUs7SUFBRyxDQUFDO0lBRXJDLEtBQUs7UUFDSCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTyxJQUFJLFFBQVEsQ0FBQztnQkFDbEIsRUFBRSxFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDekMsSUFBSSxFQUFFLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDNUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTTtnQkFDNUIsT0FBTyxFQUFFLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUMxRCxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNO2dCQUM1QixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO2FBQzNCLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNvdXJjZSB9IGZyb20gJy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBCdWlsZGVyVXRpbHMgfSBmcm9tICcuL2J1aWxkZXItdXRpbHMnO1xuaW1wb3J0IHsgU2VydmljZUJ1aWxkZXIgfSBmcm9tICcuL3NlcnZpY2UuYnVpbGRlcic7XG5cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlc291cmNlOiBhbnkpIHt9XG5cbiAgYnVpbGQoKTogUmVzb3VyY2Uge1xuICAgIGlmICh0aGlzLnJlc291cmNlKSB7XG4gICAgICByZXR1cm4gbmV3IFJlc291cmNlKHtcbiAgICAgICAgaWQ6IEJ1aWxkZXJVdGlscy5leHRyYWN0SWQodGhpcy5yZXNvdXJjZSksXG4gICAgICAgIHR5cGU6IEJ1aWxkZXJVdGlscy5leHRyYWNUeXBlKHRoaXMucmVzb3VyY2UpLFxuICAgICAgICBmb3JtYXQ6IHRoaXMucmVzb3VyY2UuZm9ybWF0LFxuICAgICAgICBzZXJ2aWNlOiBuZXcgU2VydmljZUJ1aWxkZXIodGhpcy5yZXNvdXJjZS5zZXJ2aWNlKS5idWlsZCgpLFxuICAgICAgICBoZWlnaHQ6IHRoaXMucmVzb3VyY2UuaGVpZ2h0LFxuICAgICAgICB3aWR0aDogdGhpcy5yZXNvdXJjZS53aWR0aFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXX0=