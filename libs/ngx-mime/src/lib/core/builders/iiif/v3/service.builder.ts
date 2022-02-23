import { Service } from '../../../models/manifest';
import { BuilderUtils } from './builder-utils';
import { SizesBuilder } from './sizes.builder';
import { TilesBuilder } from './tiles.builder';

export class ServiceBuilder {
  constructor(private service: any) {}

  build(): Service | undefined {
    if (!Array.isArray(this.service) || this.service.length < 1) {
      return undefined;
    } else {
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
