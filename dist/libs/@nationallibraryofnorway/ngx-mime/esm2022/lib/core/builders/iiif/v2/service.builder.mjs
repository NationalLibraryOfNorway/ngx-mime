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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvYnVpbGRlcnMvaWlpZi92Mi9zZXJ2aWNlLmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE1BQU0sT0FBTyxjQUFjO0lBQ3pCLFlBQW9CLE9BQVk7UUFBWixZQUFPLEdBQVAsT0FBTyxDQUFLO0lBQUcsQ0FBQztJQUVwQyxLQUFLO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQixPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sSUFBSSxPQUFPLENBQUM7Z0JBQ2pCLEVBQUUsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ3hDLE9BQU8sRUFBRSxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ2xELFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7Z0JBQy9CLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0JBQ3pCLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07Z0JBQzNCLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRTtnQkFDbkQsS0FBSyxFQUFFLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUNuRCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPO2dCQUM3QixhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhO2dCQUN6QyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhO2dCQUN6QyxPQUFPLEVBQUUsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUU7YUFDMUQsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgQnVpbGRlclV0aWxzIH0gZnJvbSAnLi9idWlsZGVyLXV0aWxzJztcbmltcG9ydCB7IFNpemVzQnVpbGRlciB9IGZyb20gJy4vc2l6ZXMuYnVpbGRlcic7XG5pbXBvcnQgeyBUaWxlc0J1aWxkZXIgfSBmcm9tICcuL3RpbGVzLmJ1aWxkZXInO1xuXG5leHBvcnQgY2xhc3MgU2VydmljZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IGFueSkge31cblxuICBidWlsZCgpOiBTZXJ2aWNlIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXRoaXMuc2VydmljZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBTZXJ2aWNlKHtcbiAgICAgICAgaWQ6IEJ1aWxkZXJVdGlscy5leHRyYWN0SWQodGhpcy5zZXJ2aWNlKSxcbiAgICAgICAgY29udGV4dDogQnVpbGRlclV0aWxzLmV4dHJhY3RDb250ZXh0KHRoaXMuc2VydmljZSksXG4gICAgICAgIHByb3RvY29sOiB0aGlzLnNlcnZpY2UucHJvdG9jb2wsXG4gICAgICAgIHdpZHRoOiB0aGlzLnNlcnZpY2Uud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5zZXJ2aWNlLmhlaWdodCxcbiAgICAgICAgc2l6ZXM6IG5ldyBTaXplc0J1aWxkZXIodGhpcy5zZXJ2aWNlLnNpemVzKS5idWlsZCgpLFxuICAgICAgICB0aWxlczogbmV3IFRpbGVzQnVpbGRlcih0aGlzLnNlcnZpY2UudGlsZXMpLmJ1aWxkKCksXG4gICAgICAgIHByb2ZpbGU6IHRoaXMuc2VydmljZS5wcm9maWxlLFxuICAgICAgICBwaHlzaWNhbFNjYWxlOiB0aGlzLnNlcnZpY2UucGh5c2ljYWxTY2FsZSxcbiAgICAgICAgcGh5c2ljYWxVbml0czogdGhpcy5zZXJ2aWNlLnBoeXNpY2FsVW5pdHMsXG4gICAgICAgIHNlcnZpY2U6IG5ldyBTZXJ2aWNlQnVpbGRlcih0aGlzLnNlcnZpY2Uuc2VydmljZSkuYnVpbGQoKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19