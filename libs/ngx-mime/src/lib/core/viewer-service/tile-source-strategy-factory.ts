import { Resource } from '../models/manifest';
import { IiifTileSourceStrategy } from './iiif-tile-source-strategy';
import { IiifV3TileSourceStrategy } from './iiif-v3-tile-source-strategy';
import { StaticImageTileSourceStrategy } from './static-image-tile-source-strategy';
import { TileSourceStrategy } from './tile-source-strategy';

export class TileSourceStrategyFactory {
  public static create(resource: Resource): TileSourceStrategy {
    if (resource.service) {
      if (resource.type === 'Image') {
        return new IiifV3TileSourceStrategy();
      } else {
        return new IiifTileSourceStrategy();
      }
    } else {
      return new StaticImageTileSourceStrategy();
    }
  }
}
