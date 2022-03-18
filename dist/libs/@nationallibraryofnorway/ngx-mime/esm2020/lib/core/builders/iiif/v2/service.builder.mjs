import { Service } from '../../../models/manifest';
import { BuilderUtils } from './builder-utils';
import { SizesBuilder } from './sizes.builder';
import { TilesBuilder } from './tiles.builder';
export class ServiceBuilder {
    constructor(service) {
        this.service = service;
    }
    build() {
        if (!this.service) {
            return undefined;
        }
        else {
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
                service: new ServiceBuilder(this.service.service).build(),
            });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvYnVpbGRlcnMvaWlpZi92Mi9zZXJ2aWNlLmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE1BQU0sT0FBTyxjQUFjO0lBQ3pCLFlBQW9CLE9BQVk7UUFBWixZQUFPLEdBQVAsT0FBTyxDQUFLO0lBQUcsQ0FBQztJQUVwQyxLQUFLO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTyxTQUFTLENBQUM7U0FDbEI7YUFBTTtZQUNMLE9BQU8sSUFBSSxPQUFPLENBQUM7Z0JBQ2pCLEVBQUUsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ3hDLE9BQU8sRUFBRSxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ2xELFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7Z0JBQy9CLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0JBQ3pCLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07Z0JBQzNCLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRTtnQkFDbkQsS0FBSyxFQUFFLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUNuRCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPO2dCQUM3QixhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhO2dCQUN6QyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhO2dCQUN6QyxPQUFPLEVBQUUsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUU7YUFDMUQsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IEJ1aWxkZXJVdGlscyB9IGZyb20gJy4vYnVpbGRlci11dGlscyc7XG5pbXBvcnQgeyBTaXplc0J1aWxkZXIgfSBmcm9tICcuL3NpemVzLmJ1aWxkZXInO1xuaW1wb3J0IHsgVGlsZXNCdWlsZGVyIH0gZnJvbSAnLi90aWxlcy5idWlsZGVyJztcblxuZXhwb3J0IGNsYXNzIFNlcnZpY2VCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBhbnkpIHt9XG5cbiAgYnVpbGQoKTogU2VydmljZSB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCF0aGlzLnNlcnZpY2UpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgU2VydmljZSh7XG4gICAgICAgIGlkOiBCdWlsZGVyVXRpbHMuZXh0cmFjdElkKHRoaXMuc2VydmljZSksXG4gICAgICAgIGNvbnRleHQ6IEJ1aWxkZXJVdGlscy5leHRyYWN0Q29udGV4dCh0aGlzLnNlcnZpY2UpLFxuICAgICAgICBwcm90b2NvbDogdGhpcy5zZXJ2aWNlLnByb3RvY29sLFxuICAgICAgICB3aWR0aDogdGhpcy5zZXJ2aWNlLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuc2VydmljZS5oZWlnaHQsXG4gICAgICAgIHNpemVzOiBuZXcgU2l6ZXNCdWlsZGVyKHRoaXMuc2VydmljZS5zaXplcykuYnVpbGQoKSxcbiAgICAgICAgdGlsZXM6IG5ldyBUaWxlc0J1aWxkZXIodGhpcy5zZXJ2aWNlLnRpbGVzKS5idWlsZCgpLFxuICAgICAgICBwcm9maWxlOiB0aGlzLnNlcnZpY2UucHJvZmlsZSxcbiAgICAgICAgcGh5c2ljYWxTY2FsZTogdGhpcy5zZXJ2aWNlLnBoeXNpY2FsU2NhbGUsXG4gICAgICAgIHBoeXNpY2FsVW5pdHM6IHRoaXMuc2VydmljZS5waHlzaWNhbFVuaXRzLFxuICAgICAgICBzZXJ2aWNlOiBuZXcgU2VydmljZUJ1aWxkZXIodGhpcy5zZXJ2aWNlLnNlcnZpY2UpLmJ1aWxkKCksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==