import { Service } from '../models/manifest';
import { BuilderUtils } from './builder-utils';
import { SizesBuilder } from './sizes.builder';
import { TilesBuilder } from './tiles.builder';

export class ServiceBuilder {
  constructor(private service: any) {}

  build(): Service | undefined {
    if (!this.service) {
      return undefined;
    } else {
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
