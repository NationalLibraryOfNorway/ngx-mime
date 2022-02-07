import { TileSourceStrategy } from './tile-source-strategy';

export class IiifV3TileSourceStrategy implements TileSourceStrategy {
  public getTileSource(resource: any): any {
    return resource.service[0].id;
  }
}
