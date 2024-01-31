import { Service } from '../../../models/manifest';
import { BuilderUtils } from './builder-utils';
import { SizesBuilder } from './sizes.builder';
import { TilesBuilder } from './tiles.builder';
export class ServiceBuilder {
    constructor(service) {
        this.service = service;
    }
    build() {
        if (!Array.isArray(this.service) || this.service.length < 1) {
            return undefined;
        }
        else {
            const service = this.service[0];
            return new Service({
                id: BuilderUtils.extractId(service),
                context: BuilderUtils.extractContext(service),
                protocol: service.protocol,
                width: service.width,
                height: service.height,
                sizes: new SizesBuilder(service.sizes).build(),
                tiles: new TilesBuilder(service.tiles).build(),
                profile: service.profile,
                physicalScale: service.physicalScale,
                physicalUnits: service.physicalUnits,
                service: new ServiceBuilder(service.service).build(),
            });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvYnVpbGRlcnMvaWlpZi92My9zZXJ2aWNlLmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE1BQU0sT0FBTyxjQUFjO0lBQ3pCLFlBQW9CLE9BQVk7UUFBWixZQUFPLEdBQVAsT0FBTyxDQUFLO0lBQUcsQ0FBQztJQUVwQyxLQUFLO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzVELE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxPQUFPLElBQUksT0FBTyxDQUFDO2dCQUNqQixFQUFFLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxZQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztnQkFDN0MsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2dCQUMxQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7Z0JBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtnQkFDdEIsS0FBSyxFQUFFLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQzlDLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUM5QyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87Z0JBQ3hCLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYTtnQkFDcEMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxhQUFhO2dCQUNwQyxPQUFPLEVBQUUsSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRTthQUNyRCxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBCdWlsZGVyVXRpbHMgfSBmcm9tICcuL2J1aWxkZXItdXRpbHMnO1xuaW1wb3J0IHsgU2l6ZXNCdWlsZGVyIH0gZnJvbSAnLi9zaXplcy5idWlsZGVyJztcbmltcG9ydCB7IFRpbGVzQnVpbGRlciB9IGZyb20gJy4vdGlsZXMuYnVpbGRlcic7XG5cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogYW55KSB7fVxuXG4gIGJ1aWxkKCk6IFNlcnZpY2UgfCB1bmRlZmluZWQge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnNlcnZpY2UpIHx8IHRoaXMuc2VydmljZS5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZXJ2aWNlID0gdGhpcy5zZXJ2aWNlWzBdO1xuICAgICAgcmV0dXJuIG5ldyBTZXJ2aWNlKHtcbiAgICAgICAgaWQ6IEJ1aWxkZXJVdGlscy5leHRyYWN0SWQoc2VydmljZSksXG4gICAgICAgIGNvbnRleHQ6IEJ1aWxkZXJVdGlscy5leHRyYWN0Q29udGV4dChzZXJ2aWNlKSxcbiAgICAgICAgcHJvdG9jb2w6IHNlcnZpY2UucHJvdG9jb2wsXG4gICAgICAgIHdpZHRoOiBzZXJ2aWNlLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHNlcnZpY2UuaGVpZ2h0LFxuICAgICAgICBzaXplczogbmV3IFNpemVzQnVpbGRlcihzZXJ2aWNlLnNpemVzKS5idWlsZCgpLFxuICAgICAgICB0aWxlczogbmV3IFRpbGVzQnVpbGRlcihzZXJ2aWNlLnRpbGVzKS5idWlsZCgpLFxuICAgICAgICBwcm9maWxlOiBzZXJ2aWNlLnByb2ZpbGUsXG4gICAgICAgIHBoeXNpY2FsU2NhbGU6IHNlcnZpY2UucGh5c2ljYWxTY2FsZSxcbiAgICAgICAgcGh5c2ljYWxVbml0czogc2VydmljZS5waHlzaWNhbFVuaXRzLFxuICAgICAgICBzZXJ2aWNlOiBuZXcgU2VydmljZUJ1aWxkZXIoc2VydmljZS5zZXJ2aWNlKS5idWlsZCgpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=