import { Service } from '../models/manifest';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvYnVpbGRlcnMvc2VydmljZS5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxNQUFNLE9BQU8sY0FBYztJQUN6QixZQUFvQixPQUFZO1FBQVosWUFBTyxHQUFQLE9BQU8sQ0FBSztJQUFHLENBQUM7SUFFcEMsS0FBSztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO2FBQU07WUFDTCxPQUFPLElBQUksT0FBTyxDQUFDO2dCQUNqQixFQUFFLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUN4QyxPQUFPLEVBQUUsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNsRCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO2dCQUMvQixLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO2dCQUN6QixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO2dCQUMzQixLQUFLLEVBQUUsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ25ELEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRTtnQkFDbkQsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFDN0IsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYTtnQkFDekMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYTtnQkFDekMsT0FBTyxFQUFFLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFO2FBQzFELENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBCdWlsZGVyVXRpbHMgfSBmcm9tICcuL2J1aWxkZXItdXRpbHMnO1xuaW1wb3J0IHsgU2l6ZXNCdWlsZGVyIH0gZnJvbSAnLi9zaXplcy5idWlsZGVyJztcbmltcG9ydCB7IFRpbGVzQnVpbGRlciB9IGZyb20gJy4vdGlsZXMuYnVpbGRlcic7XG5cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogYW55KSB7fVxuXG4gIGJ1aWxkKCk6IFNlcnZpY2UgfCB1bmRlZmluZWQge1xuICAgIGlmICghdGhpcy5zZXJ2aWNlKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFNlcnZpY2Uoe1xuICAgICAgICBpZDogQnVpbGRlclV0aWxzLmV4dHJhY3RJZCh0aGlzLnNlcnZpY2UpLFxuICAgICAgICBjb250ZXh0OiBCdWlsZGVyVXRpbHMuZXh0cmFjdENvbnRleHQodGhpcy5zZXJ2aWNlKSxcbiAgICAgICAgcHJvdG9jb2w6IHRoaXMuc2VydmljZS5wcm90b2NvbCxcbiAgICAgICAgd2lkdGg6IHRoaXMuc2VydmljZS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnNlcnZpY2UuaGVpZ2h0LFxuICAgICAgICBzaXplczogbmV3IFNpemVzQnVpbGRlcih0aGlzLnNlcnZpY2Uuc2l6ZXMpLmJ1aWxkKCksXG4gICAgICAgIHRpbGVzOiBuZXcgVGlsZXNCdWlsZGVyKHRoaXMuc2VydmljZS50aWxlcykuYnVpbGQoKSxcbiAgICAgICAgcHJvZmlsZTogdGhpcy5zZXJ2aWNlLnByb2ZpbGUsXG4gICAgICAgIHBoeXNpY2FsU2NhbGU6IHRoaXMuc2VydmljZS5waHlzaWNhbFNjYWxlLFxuICAgICAgICBwaHlzaWNhbFVuaXRzOiB0aGlzLnNlcnZpY2UucGh5c2ljYWxVbml0cyxcbiAgICAgICAgc2VydmljZTogbmV3IFNlcnZpY2VCdWlsZGVyKHRoaXMuc2VydmljZS5zZXJ2aWNlKS5idWlsZCgpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=