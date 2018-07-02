import { Service } from '../models/manifest';
import { IiifTileSourceStrategy } from './iiif-tile-source-strategy';
import { StaticImageTileSourceStrategy } from './static-image-tile-source-strategy';
import { TileSourceStrategy } from './tile-source-strategy';

export class TileSourceStrategyFactory {
  public static create(resource: Service): TileSourceStrategy {
    if (resource.service) {
      return new IiifTileSourceStrategy();
    } else {
      return new StaticImageTileSourceStrategy();
    }
  }
}
