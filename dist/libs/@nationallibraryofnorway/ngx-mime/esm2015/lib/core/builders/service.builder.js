import { Service } from '../models/manifest';
import { BuilderUtils } from './builder-utils';
import { SizesBuilder } from './sizes.builder';
import { TilesBuilder } from './tiles.builder';
export class ServiceBuilder {
    constructor(service) {
        this.service = service;
    }
    build() {
        if (this.service) {
            return new Service({
                id: BuilderUtils.extractId(this.service),
                context: BuilderUtils.extractContext(this.service),
                protocol: this.service.protocol,
                width: this.service.width,
                height: this.service.height,
                sizes: new SizesBuilder(this.service.sizes).build(),
                tiles: new TilesBuilder(this.service.tiles).build(),
                profile: this.service.profile,
                physicalScale: this.service.physicalScale,
                physicalUnits: this.service.physicalUnits,
                service: new ServiceBuilder(this.service.service).build()
            });
        }
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3Jvbm55bS9UZW1wL25neC1taW1lL2xpYnMvbmd4LW1pbWUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbGRlcnMvc2VydmljZS5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxNQUFNLE9BQU8sY0FBYztJQUN6QixZQUFvQixPQUFZO1FBQVosWUFBTyxHQUFQLE9BQU8sQ0FBSztJQUFHLENBQUM7SUFFcEMsS0FBSztRQUNILElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixPQUFPLElBQUksT0FBTyxDQUFDO2dCQUNqQixFQUFFLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUN4QyxPQUFPLEVBQUUsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNsRCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO2dCQUMvQixLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO2dCQUN6QixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO2dCQUMzQixLQUFLLEVBQUUsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ25ELEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRTtnQkFDbkQsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFDN0IsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYTtnQkFDekMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYTtnQkFDekMsT0FBTyxFQUFFLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFO2FBQzFELENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi4vbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IEJ1aWxkZXJVdGlscyB9IGZyb20gJy4vYnVpbGRlci11dGlscyc7XG5pbXBvcnQgeyBTaXplc0J1aWxkZXIgfSBmcm9tICcuL3NpemVzLmJ1aWxkZXInO1xuaW1wb3J0IHsgVGlsZXNCdWlsZGVyIH0gZnJvbSAnLi90aWxlcy5idWlsZGVyJztcblxuZXhwb3J0IGNsYXNzIFNlcnZpY2VCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBhbnkpIHt9XG5cbiAgYnVpbGQoKTogU2VydmljZSB7XG4gICAgaWYgKHRoaXMuc2VydmljZSkge1xuICAgICAgcmV0dXJuIG5ldyBTZXJ2aWNlKHtcbiAgICAgICAgaWQ6IEJ1aWxkZXJVdGlscy5leHRyYWN0SWQodGhpcy5zZXJ2aWNlKSxcbiAgICAgICAgY29udGV4dDogQnVpbGRlclV0aWxzLmV4dHJhY3RDb250ZXh0KHRoaXMuc2VydmljZSksXG4gICAgICAgIHByb3RvY29sOiB0aGlzLnNlcnZpY2UucHJvdG9jb2wsXG4gICAgICAgIHdpZHRoOiB0aGlzLnNlcnZpY2Uud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5zZXJ2aWNlLmhlaWdodCxcbiAgICAgICAgc2l6ZXM6IG5ldyBTaXplc0J1aWxkZXIodGhpcy5zZXJ2aWNlLnNpemVzKS5idWlsZCgpLFxuICAgICAgICB0aWxlczogbmV3IFRpbGVzQnVpbGRlcih0aGlzLnNlcnZpY2UudGlsZXMpLmJ1aWxkKCksXG4gICAgICAgIHByb2ZpbGU6IHRoaXMuc2VydmljZS5wcm9maWxlLFxuICAgICAgICBwaHlzaWNhbFNjYWxlOiB0aGlzLnNlcnZpY2UucGh5c2ljYWxTY2FsZSxcbiAgICAgICAgcGh5c2ljYWxVbml0czogdGhpcy5zZXJ2aWNlLnBoeXNpY2FsVW5pdHMsXG4gICAgICAgIHNlcnZpY2U6IG5ldyBTZXJ2aWNlQnVpbGRlcih0aGlzLnNlcnZpY2Uuc2VydmljZSkuYnVpbGQoKVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXX0=