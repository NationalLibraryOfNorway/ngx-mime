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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvYnVpbGRlcnMvaWlpZi92My9zZXJ2aWNlLmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE1BQU0sT0FBTyxjQUFjO0lBQ3pCLFlBQW9CLE9BQVk7UUFBWixZQUFPLEdBQVAsT0FBTyxDQUFLO0lBQUcsQ0FBQztJQUVwQyxLQUFLO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzRCxPQUFPLFNBQVMsQ0FBQztTQUNsQjthQUFNO1lBQ0wsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxPQUFPLElBQUksT0FBTyxDQUFDO2dCQUNqQixFQUFFLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxZQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztnQkFDN0MsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2dCQUMxQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7Z0JBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtnQkFDdEIsS0FBSyxFQUFFLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQzlDLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUM5QyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87Z0JBQ3hCLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYTtnQkFDcEMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxhQUFhO2dCQUNwQyxPQUFPLEVBQUUsSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRTthQUNyRCxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgQnVpbGRlclV0aWxzIH0gZnJvbSAnLi9idWlsZGVyLXV0aWxzJztcbmltcG9ydCB7IFNpemVzQnVpbGRlciB9IGZyb20gJy4vc2l6ZXMuYnVpbGRlcic7XG5pbXBvcnQgeyBUaWxlc0J1aWxkZXIgfSBmcm9tICcuL3RpbGVzLmJ1aWxkZXInO1xuXG5leHBvcnQgY2xhc3MgU2VydmljZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IGFueSkge31cblxuICBidWlsZCgpOiBTZXJ2aWNlIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5zZXJ2aWNlKSB8fCB0aGlzLnNlcnZpY2UubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2VydmljZSA9IHRoaXMuc2VydmljZVswXTtcbiAgICAgIHJldHVybiBuZXcgU2VydmljZSh7XG4gICAgICAgIGlkOiBCdWlsZGVyVXRpbHMuZXh0cmFjdElkKHNlcnZpY2UpLFxuICAgICAgICBjb250ZXh0OiBCdWlsZGVyVXRpbHMuZXh0cmFjdENvbnRleHQoc2VydmljZSksXG4gICAgICAgIHByb3RvY29sOiBzZXJ2aWNlLnByb3RvY29sLFxuICAgICAgICB3aWR0aDogc2VydmljZS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBzZXJ2aWNlLmhlaWdodCxcbiAgICAgICAgc2l6ZXM6IG5ldyBTaXplc0J1aWxkZXIoc2VydmljZS5zaXplcykuYnVpbGQoKSxcbiAgICAgICAgdGlsZXM6IG5ldyBUaWxlc0J1aWxkZXIoc2VydmljZS50aWxlcykuYnVpbGQoKSxcbiAgICAgICAgcHJvZmlsZTogc2VydmljZS5wcm9maWxlLFxuICAgICAgICBwaHlzaWNhbFNjYWxlOiBzZXJ2aWNlLnBoeXNpY2FsU2NhbGUsXG4gICAgICAgIHBoeXNpY2FsVW5pdHM6IHNlcnZpY2UucGh5c2ljYWxVbml0cyxcbiAgICAgICAgc2VydmljZTogbmV3IFNlcnZpY2VCdWlsZGVyKHNlcnZpY2Uuc2VydmljZSkuYnVpbGQoKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19