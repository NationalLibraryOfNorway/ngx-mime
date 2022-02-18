import { Service } from '../models/manifest';
import { TileSourceStrategy } from './tile-source-strategy';

export class StaticImageTileSourceStrategy implements TileSourceStrategy {
  public getTileSource(resource: Service | any): any {
    return {
      type: 'image',
      url: resource['@id'],
    };
  }
}
